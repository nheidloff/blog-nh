---
id: 4814
title: 'Updating Resources from Kubernetes Operators'
date: '2022-03-16T07:46:20+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4814'
permalink: /article/updating-resources-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/updating-resources-kubernetes-operators/
categories:
    - Articles
---

*Kubernetes operators are a powerful technology to deploy infrastructure and applications and to automate day 2 operations. This article describes how to create and update resources from operators developed with Golang.*

The snippets below are part of the repo [operator-sample-go](https://github.com/nheidloff/operator-sample-go) which demonstrates various operator patterns and best practises.

There is a lot of documentation how to create resources from operators, but relative few documentation that describes how to update them. Let’s look at some code that creates and updates Kubernetes ‘Deployment’ resources from a custom resource.

Here is the custom resource ‘Application’:

```
apiVersion: application.sample.ibm.com/v1alpha1
kind: Application
metadata:
  name: application1
spec:
  version: "1.0.0"
  amountPods: 1
```

The custom controller for the ‘Application’ resource creates the underlaying ‘Deployment’ resource with the amount of replicas/pods that is defined in the custom resource. If someone scales this number up in the ‘Deployment’ resource directly, the controller needs to scale it down to 1 again in this example.

This is the controller [code](https://github.com/nheidloff/operator-sample-go/blob/ca5a50763cf36d4d74786119573a4e4865d4a942/operator-application/controllers/application_controller.go#L178) that creates and updates the ‘Deployment’ resource which is part of the reconcile logic:

```
deployment := &appsv1.Deployment{}
deploymentDefinition := reconciler.defineDeployment(application)
err = reconciler.Get(ctx, types.NamespacedName{Name: deploymentName, Namespace: application.Namespace}, deployment)
if err != nil {
  if errors.IsNotFound(err) {
    log.Info("Deployment resource " + deploymentName + " not found. Creating or re-creating deployment")
    err = reconciler.Create(ctx, deploymentDefinition)
    if err != nil {
      log.Info("Failed to create deployment resource. Re-running reconcile.")
      return ctrl.Result{}, err
    }
  } else {
    log.Info("Failed to get deployment resource " + deploymentName + ". Re-running reconcile.")
    return ctrl.Result{}, err
  }
} else {
  specHashTarget := reconciler.getHashForSpec(&deploymentDefinition.Spec)
  specHashActual := reconciler.getHashFromLabels(deployment.Labels)
  if specHashActual != specHashTarget {
    var current int32 = *deployment.Spec.Replicas
    var expected int32 = *deploymentDefinition.Spec.Replicas
    if current != expected {
      deployment.Spec.Replicas = &expected
      deployment.Labels = reconciler.setHashToLabels(deployment.Labels, specHashTarget)
      err = reconciler.Update(ctx, deployment)
      if err != nil {
        log.Info("Failed to update deployment resource. Re-running reconcile.")
        return ctrl.Result{}, err
      }
    }
  }
}
```

The first part to create the resource is simple. If the resource doesn’t exist yet, it is created. If there is another error when checking for the resource, there must be a caching error and the reconciler will be invoked again. If the resource cannot be created, the reconciler is also run again.

The more interesting part is the second part which updates the ‘Deployment’ resource if necessary. This scenario is very simple since only one property ‘amountPods’ can get out of synch between the ‘Application’ and the ‘Deployment’ resource. In this case you could simply compare these two values as in the snippet above at the bottom.

Other scenarios might require multiple properties to be checked. Rather than checking all properties individually, another technique is used in this sample. Before creating the resource initially a hash is generated for the ‘Spec’ part of the custom resource. This hash is written in the metadata part as a label.

When the update logic of the controller is run, it builds another definition of the resource (but doesn’t create it in Kubernetes), gets the hash for this new definition and compares the hash of the new definition with the hash of the existing resource. If these two hashes are different, the controller knows that it needs to check all properties whether they changed and update them if necessary.

Here is the [code](https://github.com/nheidloff/operator-sample-go/blob/ca5a50763cf36d4d74786119573a4e4865d4a942/operator-application/controllers/application_controller.go#L591) to create the hash and add labels:

```
func (reconciler *ApplicationReconciler) getHashForSpec(specStruct interface{}) string {
  byteArray, _ := json.Marshal(specStruct)
  var hasher hash.Hash
  hasher = ripemd160.New()
  hasher.Reset()
  hasher.Write(byteArray)
  return hex.EncodeToString(hasher.Sum(nil))
}

func (reconciler *ApplicationReconciler) setHashToLabels(labels map[string]string, specHashActual string) map[string]string {
  if labels == nil {
    labels = map[string]string{}
  }
  labels[hashLabelName] = specHashActual
  return labels
}

func (reconciler *ApplicationReconciler) getHashFromLabels(labels map[string]string) string {
  return labels[hashLabelName]
}
```

When the resource is created initially, the hash is added as label ([code](https://github.com/nheidloff/operator-sample-go/blob/ca5a50763cf36d4d74786119573a4e4865d4a942/operator-application/controllers/application_controller.go#L319)):

```
specHashActual := reconciler.getHashForSpec(&deployment.Spec)
deployment.Labels = reconciler.setHashToLabels(nil, specHashActual)
```

Whenever the resource is updated, the new hash is stored:

```
deployment.Labels = reconciler.setHashToLabels(deployment.Labels, specHashTarget)
```

The same technique is also useful for other scenarios. Controllers can not be implemented in a classic imperative way. Creating resources can take a long time and you need to assume that the caches are stale. This is why the reconcile loop is run over and over again and why it needs to be idempotent.

Running the reconciler logic multiple times can lead to situations where too many resources are created. As an example, let’s assume you want to create a pod. The controller could create it and could be triggered again. Since according to the API which checks for resources the pod might not have been created yet (because of caching), the controller would create a second pod by mistake.

There are various ways to solve this, for example using ‘uid’, ‘resourceVersion’, deep copy comparisons and in-memory caches or the hash technique above.

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.