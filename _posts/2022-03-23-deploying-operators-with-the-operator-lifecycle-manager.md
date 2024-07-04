---
id: 4862
title: 'Deploying Operators with the Operator Lifecycle Manager'
date: '2022-03-23T15:25:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4862'
permalink: /article/deploying-operators-operator-lifecycle-manager-olm/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-operators-operator-lifecycle-manager-olm/
categories:
    - Articles
---

*Kubernetes operators automate the deployment and operations of Kubernetes based software. This article describes the Operator Lifecycle Manager which provides a declarative way to install, manage, and upgrade operators on a cluster.*

I’m working on an [operator sample](https://github.com/nheidloff/operator-sample-go) implemented in Go that shows typical operator patterns. There are instructions how to run the operator:

1. [Run and debug the operator locally](https://github.com/nheidloff/operator-sample-go/blob/main/operator-application/SetupLocal.md)
2. [Deploy the operator manually to Kubernetes](https://github.com/nheidloff/operator-sample-go/blob/main/operator-application/SetupManualDeployment.md)
3. [](https://github.com/nheidloff/operator-sample-go/blob/main/operator-application/SetupDeploymentViaOLM.md)[Deploy the operator via Operator Lifecycle Manager](https://github.com/nheidloff/operator-sample-go/blob/main/operator-application/README.md#setup-and-deployment-via-operator-lifecycle-manager) (focus of this article)

There is a really good video [Intro to the Operator Lifecycle Manager](https://www.youtube.com/watch?v=5PorcMTYZTo) describing OLM. Watch it first before reading on.

The [Operator SDK](https://sdk.operatorframework.io/) and the [Operator Framework](https://operatorframework.io/) make it pretty simple to build and deploy operators. Without repeating everything from the video here are the necessary commands and highlights that you need to know. Note that you can also deploy operators via the OLM without using the operator-sdk CLI by using kubectl and yaml files instead. See the bottom of this article.

First the OLM needs to be installed.

```
$ operator-sdk olm install latest
$ kubectl get all -n olm
```

![image](/assets/img/2022/03/Screenshot-2022-03-21-at-16.20.13.png)

Next the bundle is created, the bundle image is built and pushed and then the operator is run.

```
$ export REGISTRY='docker.io'
$ export ORG='nheidloff'
$ export IMAGE='application-controller:v11'
$ make bundle IMG="$REGISTRY/$ORG/$IMAGE"
```

```
$ export BUNDLEIMAGE="application-controller-bundle:v11"
$ make bundle-build BUNDLE_IMG="$REGISTRY/$ORG/$BUNDLEIMAGE"
$ docker push "$REGISTRY/$ORG/$BUNDLEIMAGE"
$ operator-sdk run bundle "$REGISTRY/$ORG/$BUNDLEIMAGE" -n operators
```

The key artifact that is created, is the [cluster service version](https://github.com/nheidloff/operator-sample-go/blob/ca204e86e23fe166168af0eb61eac281e1f8de85/operator-application/bundle/manifests/operator-application.clusterserviceversion.yaml) (CSV) which contains all metadata describing the operator, or more precisely, one version of the operator.

```
apiVersion: operators.coreos.com/v1alpha1
kind: ClusterServiceVersion
...
spec:
  apiservicedefinitions: {}
  customresourcedefinitions:
    owned:
    - displayName: Application
      kind: Application
      name: applications.application.sample.ibm.com
      version: v1alpha1
...
      clusterPermissions:
      - rules:
        - apiGroups:
          - application.sample.ibm.com
          resources:
          - applications
          verbs:
          - create
...
      deployments:
      - name: operator-application-controller-manager
        spec:
          replicas: 1
...
                image: docker.io/nheidloff/application-controller:v10
...
  installModes:
  - supported: true
    type: AllNamespaces
  version: 0.0.1
```

Additionally [annotations.yaml](https://github.com/nheidloff/operator-sample-go/blob/ca204e86e23fe166168af0eb61eac281e1f8de85/operator-application/bundle/metadata/annotations.yaml) is created with defaults that can be overwritten.

```
annotations:
  # Core bundle annotations.
  operators.operatorframework.io.bundle.mediatype.v1: registry+v1
  operators.operatorframework.io.bundle.manifests.v1: manifests/
  operators.operatorframework.io.bundle.metadata.v1: metadata/
  operators.operatorframework.io.bundle.package.v1: operator-application
  operators.operatorframework.io.bundle.channels.v1: alpha
  operators.operatorframework.io.metrics.builder: operator-sdk-v1.18.0
  operators.operatorframework.io.metrics.mediatype.v1: metrics+v1
  operators.operatorframework.io.metrics.project_layout: go.kubebuilder.io/v3
```

Let’s take a look which Kubernetes resources have been created as result of ‘operator-sdk run bundle’. The CatalogSource contains a link to the bundle image. A catalog is a repository of metadata that the OLM uses to discover and install operators and their dependencies.

```
$ kubectl get catalogsource -n operators
NAME                           DISPLAY                TYPE   PUBLISHER      AGE
operator-application-catalog   operator-application   grpc   operator-sdk   3d1h
$ kubectl get catalogsource  operator-application-catalog -n operators -oyaml
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  annotations:
    operators.operatorframework.io/index-image: quay.io/operator-framework/opm:latest
    operators.operatorframework.io/injected-bundles: '[{"imageTag":"docker.io/nheidloff/application-controller-bundle:v11","mode":"semver"}]'
    operators.operatorframework.io/registry-pod-name: docker-io-nheidloff-application-controller-bundle-v11
...
```

Additionally the CSV resource is created which contains the information above plus some state information:

```
$ kubectl get csv -n operators
NAME                          DISPLAY                VERSION   REPLACES   PHASE
operator-application.v0.0.1   operator-application   0.0.1                Succeeded
$ kubectl get csv operator-application.v0.0.1 -n operators -oyaml
```

The subscription resource is the glue between the catalog and the CSV:

```
kubectl get subscriptions -n operators 
NAME                              PACKAGE                SOURCE                         CHANNEL
operator-application-v0-0-1-sub   operator-application   operator-application-catalog   alpha
$kubectl get subscriptions operator-application-v0-0-1-sub -n operators -oyaml 
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  creationTimestamp: "2022-03-21T15:57:40Z"
  generation: 1
  labels:
    operators.coreos.com/operator-application.operators: ""
  name: operator-application-v0-0-1-sub
  namespace: operators
spec:
  channel: alpha
  installPlanApproval: Manual
  name: operator-application
  source: operator-application-catalog
  sourceNamespace: operators
  startingCSV: operator-application.v0.0.1
```

This is the created install plan:

```
$ kubectl get installplans -n operators
$ kubectl get installplans install-xxxxx -n operators -oyaml
apiVersion: operators.coreos.com/v1alpha1
kind: InstallPlan
metadata:
...
  name: install-2gxl7
  namespace: operators
  ownerReferences:
  - apiVersion: operators.coreos.com/v1alpha1
    kind: Subscription
    name: operator-database-v0-0-1-sub
...spec:
  approval: Manual
  approved: true
  clusterServiceVersionNames:
  - operator-database.v0.0.1
  - operator-application.v0.0.1
  generation: 1
```

Last, but not least the operator resource is created.

```
$ kubectl config set-context --current --namespace=test1
$ kubectl get operators -n operators
NAME                             AGE
operator-application.operators   3d2h
$ kubectl get operators operator-application.operators -n operators -oyaml
apiVersion: operators.coreos.com/v1
kind: Operator
metadata:
...
      manager: olm
      operation: Update
      subresource: status
      time: '2022-03-18T12:48:10Z'
  name: operator-application.operators
...
status:
  components:
    labelSelector:
      matchExpressions:
        - key: operators.coreos.com/operator-application.operators
          operator: Exists
      ...
      - apiVersion: operators.coreos.com/v1alpha1
        conditions:
          - lastTransitionTime: '2022-03-18T12:48:58Z'
            lastUpdateTime: '2022-03-18T12:48:58Z'
            message: install strategy completed with no errors
            reason: InstallSucceeded
            status: 'True'
            type: Succeeded
        kind: ClusterServiceVersion
        name: operator-application.v0.0.1
        namespace: operators
...
```

**Deployment with kubectl**

You can also deploy operators via OLM using kubectl.

```
$ kubectl apply -f olm/catalogsource.yaml
$ kubectl apply -f olm/subscription.yaml 
$ kubectl get installplans -n operators
$ kubectl -n operators patch installplan install-xxxxx -p '{"spec":{"approved":true}}' --type merge
```

This creates the same resources as above.

```
$ kubectl get all -n operators
$ kubectl get catalogsource operator-application-catalog -n operators -oyaml
$ kubectl get subscriptions operator-application-v0-0-1-sub -n operators -oyaml
$ kubectl get csv operator-application.v0.0.1 -n operators -oyaml
$ kubectl get installplans -n operators
$ kubectl get installplans install-xxxxx -n operators -oyaml
$ kubectl get operators operator-application.operators -n operators -oyaml
```

The real value of the OLM is the management of different versions via a subscription model. I’d like to blog about this soon as well as other operator based topics. Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog.