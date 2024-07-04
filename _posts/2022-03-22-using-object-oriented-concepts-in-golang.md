---
id: 4842
title: 'Using object-oriented Concepts in Golang'
date: '2022-03-22T20:43:21+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4842'
permalink: /article/object-oriented-concepts-golang/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/object-oriented-concepts-golang/
categories:
    - Articles
---

*Most Kubernetes operators are implemented in Go for good reasons. However, Go has a steeper learning curve than many other languages. This article describes one of the concepts which might seem a little unusual for many Go beginners.*

Encapsulation is an important development concept, no matter whether languages are object oriented or functional, whether they support inheritance and polymorphism directly or via alternative approaches. Using common functionality for different ‘objects’ doesn’t necessarily have to mean that a language needs to be object oriented. The [go.dev](https://go.dev/doc/faq#Is_Go_an_object-oriented_language) site has a clear answer to the question: Is Go an object-oriented language? “Yes and no.”

**Structs and Interfaces**

Below I describe a concrete scenario how to develop a typical object-oriented scenario with Golang. Before I do this, I recommand learning about the Go concepts ‘struct’ and ‘interface’. There are many good videos on YouTube and I like this blog series.

- [Structs in Structs](https://eli.thegreenplace.net/2020/embedding-in-go-part-1-structs-in-structs/)
- [Interfaces in Interfaces](https://eli.thegreenplace.net/2020/embedding-in-go-part-2-interfaces-in-interfaces/)
- [Interfaces in Structs](https://eli.thegreenplace.net/2020/embedding-in-go-part-3-interfaces-in-structs/)

I really like the concept of interfaces in Go. Rather than defining explicitly for an ‘object’ that it implements an interface, it is automatically determined. If an object implements a specific set of functions/methods, it implements an interface.

In one of the videos I watched this was explained as follows: If something looks like a duck, sounds like a duck and swims like a duck, it is a duck.

**Sample Scenario**

With operators custom resources can be deployed and managed in Kubernetes. To report status to users, Kubernetes resources have a status section. Conditions are a standardized way to store state in these status secions. See my previous blog [Storing State of Kubernetes Resources with Conditions]({{ "/article/storing-state-status-kubernetes-resources-conditions-operators-go/" | relative_url }}) for details.

When implementing conditions in operators, there are two parts:

- Operator-specific conditions and condition handling
- Generic functionality to handle conditions, for example storage

**Solution**

Let’s look [code](https://github.com/nheidloff/operator-sample-go/blob/17736c52dd854b803c9936e5f2f4439fdcb0c758/operator-application/controllers/application/conditions.go#L91) that is specific to an operator. While the ‘Succeeded’ condition is rather generic, it can have operator specific reasons and messages. Other conditions might even be unique for a specific operator. The snippet shows that a generic function ‘utilities.AppendCondition’ is invoked to store the condition.

```
import (
	applicationsamplev1alpha1 "github.com/nheidloff/operator-sample-go/operator-application/api/v1alpha1"
	"github.com/nheidloff/operator-sample-go/operator-application/utilities"
)
const CONDITION_TYPE_SUCCEEDED = "Succeeded"
const CONDITION_REASON_SUCCEEDED = "InstallSucceeded"
const CONDITION_MESSAGE_SUCCEEDED = "Application has been installed"
func (reconciler *ApplicationReconciler) setConditionSucceeded(ctx context.Context,
	application *applicationsamplev1alpha1.Application) error {
	if !reconciler.containsCondition(ctx, application, CONDITION_REASON_SUCCEEDED) {
		return utilities.AppendCondition(ctx, reconciler.Client, application, CONDITION_TYPE_SUCCEEDED, 
            CONDITION_STATUS_TRUE, CONDITION_REASON_SUCCEEDED, CONDITION_MESSAGE_SUCCEEDED)
	}
	return nil
}
```

While the operator specific code above uses the specific applicationsamplev1alpha1.Application object, the [generic utilities](https://github.com/nheidloff/operator-sample-go/blob/17736c52dd854b803c9936e5f2f4439fdcb0c758/operator-application/utilities/conditions.go#L18) function expects the interface [client.Object](https://pkg.go.dev/sigs.k8s.io/controller-runtime/pkg/client#Object). Since the application object implements this interface (or more correctly: implements the same functions as defined in the interface), it can be passed to the utilities function.

```
func AppendCondition(ctx context.Context, reconcilerClient client.Client, object client.Object,
	typeName string, status metav1.ConditionStatus, reason string, message string) error {
...
    err := reconcilerClient.Status().Update(ctx, object)
...
}
```

To set the status with the condition in the object representing the custom resource, more functions are necessary which are not part of client.Object. This is because not all Kubernetes resources have status sections. The solution is to define another interface with the necessary functions ([code](https://github.com/nheidloff/operator-sample-go/blob/17736c52dd854b803c9936e5f2f4439fdcb0c758/operator-application/utilities/conditions.go#L13)).

```
type ConditionsAware interface {
	GetConditions() []metav1.Condition
	SetConditions(conditions []metav1.Condition)
}
```

The ‘object’ that is passed in as type interface ‘client.Object’ can also implement the ‘ConditionsAware’ interface. Before the get/set conditions functions are invoked, the object is converted ([code](https://github.com/nheidloff/operator-sample-go/blob/17736c52dd854b803c9936e5f2f4439fdcb0c758/operator-application/utilities/conditions.go)).

```
package utilities
...
func AppendCondition(ctx context.Context, reconcilerClient client.Client, object client.Object,
	typeName string, status metav1.ConditionStatus, reason string, message string) error {
	conditionsAware, conversionSuccessful := (object).(ConditionsAware)
	if conversionSuccessful {
		time := metav1.Time{Time: time.Now()}
		condition := metav1.Condition{Type: typeName, Status: status, Reason: reason, Message: message, LastTransitionTime: time}
		conditionsAware.SetConditions(append(conditionsAware.GetConditions(), condition))
		err := reconcilerClient.Status().Update(ctx, object)
		if err != nil {
			return fmt.Errorf("Custom resource status update failed")
		}
	} else {
		return fmt.Errorf("Status cannot be set, resource doesn't support conditions")
	}
	return nil
}
```

To implement the ConditionsAware interface, the custom resource application needs to implement the two methods ([code](https://github.com/nheidloff/operator-sample-go/blob/17736c52dd854b803c9936e5f2f4439fdcb0c758/operator-application/api/v1alpha1/application_types.go#L53)).

```
package v1alpha1
...
type Application struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec   ApplicationSpec   `json:"spec,omitempty"`
	Status ApplicationStatus `json:"status,omitempty"`
}
type ApplicationStatus struct {
	// +patchMergeKey=type
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=type
	Conditions    []metav1.Condition `json:"conditions"`
}
func (application *Application) GetConditions() []metav1.Condition {
	return application.Status.Conditions
}
func (application *Application) SetConditions(conditions []metav1.Condition) {
	application.Status.Conditions = conditions
}
```

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.