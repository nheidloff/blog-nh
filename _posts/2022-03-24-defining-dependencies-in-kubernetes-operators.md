---
id: 4882
title: 'Defining Dependencies in Kubernetes Operators'
date: '2022-03-24T07:33:35+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4882'
permalink: /article/defining-dependencies-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/defining-dependencies-kubernetes-operators/
categories:
    - Articles
---

*Operators can automate the deployment and operations of custom Kubernetes resources. These resources might dependent on other third party resources. This article describes how to define these dependencies.*

I’m working on a [sample](https://github.com/nheidloff/operator-sample-go) that describes different patterns and best practices to build operators with Golang. The repo demonstrates how a custom resource ‘Application’ uses internally a third party ‘Database’ resource which is managed by another controller. This is a simplified version of the typical scenario to use a managed database in the cloud. Read my previous [blog]({{ "/article/accessing-third-party-custom-resources-go-operators/" | relative_url }}) that explains how to access third party resources in controllers’ Go code.

Additionally you need to ensure that the dependent operator (in my sample the database operator) exists when an operator (in my sample the application operator) is deployed. This can be done in the cluster service version (CSV). The CSV is the operator bundle/package which contains the definition of a specific operator version.

Here is the [CSV](https://github.com/nheidloff/operator-sample-go/blob/1280fe242726a329642a6a3950d1a8b9990e14d0/operator-application/bundle/manifests/operator-application.clusterserviceversion.yaml#L26-L38) of the application operator. The dependency is defined in the ‘required’ section of the spec.

```
apiVersion: operators.coreos.com/v1alpha1
kind: ClusterServiceVersion
spec:
  apiservicedefinitions: {}
  customresourcedefinitions:
    owned:
    - displayName: Application
      kind: Application
      name: applications.application.sample.ibm.com
      version: v1alpha1
    required:
    - displayName: Database
      kind: Database
      name: databases.database.sample.third.party
      version: v1alpha1    
```

When you try to deploy the application operator, but the database operator doesn’t exist, you get an error.

```
$ operator-sdk run bundle "$REGISTRY/$ORG/$BUNDLEIMAGE" -n operators
INFO[0040] Successfully created registry pod: docker-io-nheidloff-application-controller-bundle-v15 
INFO[0041] Created CatalogSource: operator-application-catalog 
INFO[0041] Created Subscription: operator-application-v0-0-1-sub 
FATA[0120] Failed to run bundle: install plan is not available for the subscription operator-application-v0-0-1-sub: timed out waiting for the condition 
```

The logs in the catalog pod describe the error.

```
$ kubectl get pods -n olm
$ kubectl logs catalog-operator-b4dfcff47-55plr -n olm
Event(v1.ObjectReference{Kind:"Namespace", Namespace:"", Name:"operators", ... type: 'Warning' reason: 'ResolutionFailed' constraints not satisfiable: bundle operator-application.v0.0.1 requires an operator providing an API with group: database.sample.third.party, version: v1alpha1, kind: Database
```

The following resources describe more details.

- [Operator Dependency and Requirement Resolution](https://operator-framework.github.io/olm-book/docs/operator-dependencies-and-requirements.html)
- [Creating operator manifests](https://olm.operatorframework.io/docs/tasks/creating-operator-manifests/)
- [Setup and Deployment via Operator Lifecycle Manager](https://github.com/nheidloff/operator-sample-go/blob/1280fe242726a329642a6a3950d1a8b9990e14d0/operator-application/SetupDeploymentViaOLM.md)

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.