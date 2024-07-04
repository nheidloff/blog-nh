---
id: 4793
title: 'Deleting Resources in Kubernetes Operators'
date: '2022-03-11T07:39:05+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4793'
permalink: /article/deleting-resources-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deleting-resources-kubernetes-operators/
categories:
    - Articles
---

*Kubernetes operators are a powerful technology to deploy infrastructure and appplications and to automate day 2 operations. This article describes how to delete from operators resources that operators own as well as external resources.*

The [Operator SDK](https://sdk.operatorframework.io/docs/building-operators/golang/advanced-topics/#handle-cleanup-on-deletion) describes two different strategies for deleting resources from operators.

- Internal Resources via References
- External Resources via Finalizers

**Internal Resources via References**

Operators typically have their own custom resource definitions which internally use other Kubernetes resources. For example a ‘MyApplication’ operator might utilize Kubernetes resources like ‘Deployment’ and ‘Service’. Between the ‘MyApplication’ custom resource and the Kubernetes resources there is a partent-child relation.

The Operator SDK comes with a convenience API ‘SetControllerReference’ to define this relation. Let’s take a look at the [code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L266).

```
func (reconciler *ApplicationReconciler) defineSecret(application *applicationsamplev1alpha1.Application) *corev1.Secret {
	stringData := make(map[string]string)
	stringData[secretGreetingMessageLabel] = greetingMessage
	secret := &corev1.Secret{
		TypeMeta:   metav1.TypeMeta{APIVersion: "v1", Kind: "Secret"},
		ObjectMeta: metav1.ObjectMeta{Name: secretName, Namespace: application.Namespace},
		Immutable:  new(bool),
		Data:       map[string][]byte{},
		StringData: stringData,
		Type:       "Opaque",
	}
	ctrl.SetControllerReference(application, secret, reconciler.Scheme)
	return secret
}
```

When the custom resource is supposed to be deleted, it gets deleted first, followed by the deletions of all children.

**External Resources via Finalizers**

Sometimes the deletion strategy above is not sufficient, especially when it comes to deleting external resources in other namespaces or even outside the cluster. For example for the deletion of an external database it needs to be checked whether the database can be deleted. Additionally the deletion can take time and might fail so that operator logic needs to be run first. The Operator SDK has finalizers to address this.

Finalizers can be set on the custom resource, for example a database finalizer which defines to wait for the deletion of the database first ([code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L206)).

```
const finalizer = "database.sample.third.party/finalizer"
...
if !controllerutil.ContainsFinalizer(application, finalizer) {
    controllerutil.AddFinalizer(application, finalizer)
	err = reconciler.Update(ctx, application)
	...
}
```

When custom resources are supposed to be deleted, a deletion timestamp is set, but the resource is not deleted as long as it is marked with a finalizer ([code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L101)).

```
isApplicationMarkedToBeDeleted := application.GetDeletionTimestamp() != nil
if isApplicationMarkedToBeDeleted {
	if controllerutil.ContainsFinalizer(application, finalizer) {
		if err := reconciler.finalizeApplication(ctx, application); err != nil {
			return ctrl.Result{}, err
		}
		controllerutil.RemoveFinalizer(application, finalizer)
		err := reconciler.Update(ctx, application)
		if err != nil {
    		return ctrl.Result{}, err
		}
	}
	return ctrl.Result{}, nil
}
```

Before the custom resource is deleted, the operator can do all necessary clean up work ([code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L379)).

```
func (reconciler *ApplicationReconciler) finalizeApplication(ctx context.Context, application *applicationsamplev1alpha1.Application) error {
	database := &databasesamplev1alpha1.Database{}
	err := reconciler.Get(ctx, types.NamespacedName{Name: application.Spec.DatabaseName, Namespace: application.Spec.DatabaseNamespace}, database)
	if err != nil {
		if errors.IsNotFound(err) {
			return nil
		}
	}
	return fmt.Errorf("Database not deleted yet")
}
```

**What’s next?**

The snippets above are part of a [sample operator GitHub project](https://github.com/nheidloff/operator-sample-go). The project comes with a custom application operator and a second database operator which mocks/simulates an external database to demonstrate the two deletion strategies. Check out the repo. I’ll blog about more operator patterns soon.

P.S.  
There is also a Go library for [pruning resources](https://sdk.operatorframework.io/docs/best-practices/resource-pruning/).