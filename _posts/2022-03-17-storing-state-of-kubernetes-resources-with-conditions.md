---
id: 4819
title: 'Storing State of Kubernetes Resources with Conditions'
date: '2022-03-17T11:02:32+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4819'
permalink: /article/storing-state-status-kubernetes-resources-conditions-operators-go/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/storing-state-status-kubernetes-resources-conditions-operators-go/
categories:
    - Articles
---

*Kubernetes operators deploy and manage custom resources in Kubernetes. Since these operations can take a longer time and since they can fail, status information needs to be reported to users. This article describes how this can be done using the ‘Conditions’ object.*

The snippets below are part of the repo [operator-sample-go](https://github.com/nheidloff/operator-sample-go) which demonstrates various operator patterns and best practises.

The following hints helped me to build the sample:

- [Advanced Topics – Manage CR status conditions](https://sdk.operatorframework.io/docs/building-operators/golang/advanced-topics/)
- [API Conventions from SIG Architecture](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#typical-status-properties)

To store status in resources, there is a ‘Status’ struct in the resource definition. In this section you can define arbitrary properties. Additionally you can use a special conditions property which is an array of [metav1.Condition](https://pkg.go.dev/k8s.io/apimachinery@v0.23.0/pkg/apis/meta/v1#Condition) objects. Conditions are not mandatory for Kubernetes resources, but most resources make use of them. This allows users to see status updates consistently, either by using the API or various tools and dashboards. The conventions how to use and name conditions are defined in the SIG (special interest group) document above.

Each condition has multiple fields, some are mandatory, some are optional.

- type: type of the condition, e.g. ‘Failed’
- status: ‘True’, ‘False’, ‘Unknown’
- reason: I use this one as a sub-type, for example for ‘Failed’ the reason ‘RequirementsNotMet’
- message: textual description
- lastTransitionTime: last time conditions were changed

Let’s take a look at the sample. There is a sample custom resource definition ‘Application’. The status part contains a custom ‘SchemaCreated’ property and the predefined ‘Conditions’ property with an array of conditions ([code](https://github.com/nheidloff/operator-sample-go/blob/26fdd7a2f983e8ecae5980aaabc297362130bdcd/operator-application/api/v1alpha1/application_types.go)).

```
type ApplicationStatus struct {
  Conditions    []metav1.Condition `json:"conditions"`
  SchemaCreated bool               `json:"schemaCreated"`
}
```

After the reconciler has run, you can see the status information.

```
apiVersion: application.sample.ibm.com/v1alpha1
kind: Application
metadata:
  name: application1
  ...
spec:
  amountPods: 1
  databaseName: database
    ...
status:
  conditions:
  - lastTransitionTime: "2022-03-14T20:09:36Z"
    message: Resource found in k18n
    reason: ResourceFound
    status: "True"
    type: ResourceFound
  - lastTransitionTime: "2022-03-14T20:10:26Z"
    message: All requirements met, attempting install
    reason: AllRequirementsMet
    status: "True"
    type: InstallReady
  - lastTransitionTime: "2022-03-14T20:10:26Z"
    message: The database exists
    reason: DatabaseExists
    status: "True"
    type: DatabaseExists
  - lastTransitionTime: "2022-03-14T20:10:26Z"
    message: Application has been installed
    reason: InstallSucceeded
    status: "True"
    type: Succeeded
  schemaCreated: false
```

The sample custom resource ‘Application’ creates another custom resource ‘Database’ and it deploys a container with a secret and a service. Here are the tasks the reconciler performs:

- Check whether resource exists
- Check whether prerequisites are fulfilled (ready to be installed)
- Check whether database exists, if not create it (takes time)
- Create Deployment, Service and Secret resources
- Update status that application could be installed

The sample uses the following conditions (format: type – status – reason – message)

- ResourceFound – True – … – …
- InstallReady – True – … – …
- Failed – True – RequirementsNotMet – …
- DatabaseExists – True – … – …
- DatabaseExists – False – … – …
- Succeeded – True – … – …

The following [snippet](https://github.com/nheidloff/operator-sample-go/blob/26fdd7a2f983e8ecae5980aaabc297362130bdcd/operator-application/controllers/application_controller.go#L533-L589) shows how to store the conditions. Note that the function ‘reconciler.Client.Status().Update’ is used! ‘reconciler.Client.Update’ does not work.

```
func (reconciler *ApplicationReconciler) appendCondition(ctx context.Context, application *applicationsamplev1alpha1.Application,
  typeName string, status metav1.ConditionStatus, reason string, message string) error {
  
  log := log.FromContext(ctx)
  time := metav1.Time{Time: time.Now()}
  condition := metav1.Condition{Type: typeName, Status: status, Reason: reason, Message: message, LastTransitionTime: time}
  application.Status.Conditions = append(application.Status.Conditions, condition)

  err := reconciler.Client.Status().Update(ctx, application)
  if err != nil {
  log.Info("Application resource status update failed.")
  }
  return nil
}
```

The next snippet shows how the reconciler adds a condition ([code](https://github.com/nheidloff/operator-sample-go/blob/26fdd7a2f983e8ecae5980aaabc297362130bdcd/operator-application/controllers/application_controller.go#L73-L86)).

```
application := &applicationsamplev1alpha1.Application{}
err := reconciler.Get(ctx, req.NamespacedName, application)
if err != nil {
  if errors.IsNotFound(err) {
    log.Info("Application resource not found. Ignoring since object must be deleted.")
    return ctrl.Result{}, nil
  }
  log.Info("Failed to getyApplication resource. Re-running reconcile.")
  return ctrl.Result{}, err
}
err = reconciler.setConditionResourceFound(ctx, application)
if err != nil {
  return ctrl.Result{}, err
}
```

Each condition type uses a set of constants for its values. There is also one ‘setCondition…’ function for each condition since the logic between the different condition types can vary ([code](https://github.com/nheidloff/operator-sample-go/blob/26fdd7a2f983e8ecae5980aaabc297362130bdcd/operator-application/controllers/application_controller.go#L434-L442)). For example a ‘Failed’ condition might want to delete a previous ‘Succeeded’ condition. Or a ‘DatabaseExists’ condition might want to change its reason from ‘False’ to ‘True.

```
const CONDITION_STATUS_TRUE = "True"
const CONDITION_STATUS_FALSE = "False"
const CONDITION_TYPE_RESOURCE_FOUND = "ResourceFound"
const CONDITION_REASON_RESOURCE_FOUND = "ResourceFound"
const CONDITION_MESSAGE_RESOURCE_FOUND = "Resource found in k18n"

func (reconciler *ApplicationReconciler) setConditionResourceFound(ctx context.Context,
  application *applicationsamplev1alpha1.Application) error {
  if !reconciler.containsCondition(ctx, application, CONDITION_REASON_RESOURCE_FOUND) {
    return reconciler.appendCondition(ctx, application, CONDITION_TYPE_RESOURCE_FOUND, CONDITION_STATUS_TRUE,
      CONDITION_REASON_RESOURCE_FOUND, CONDITION_MESSAGE_RESOURCE_FOUND)
  }
  return nil
}
```

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.