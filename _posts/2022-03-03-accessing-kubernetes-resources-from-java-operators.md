---
id: 4744
title: 'Accessing Kubernetes Resources from Java Operators'
date: '2022-03-03T14:24:30+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4744'
permalink: /article/accessing-kubernetes-resources-from-java-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-kubernetes-resources-from-java-operators/
categories:
    - Articles
---

*Kubernetes operators can be developed with Java. This article describes one of the key capabilities developers need to understand, which is how to access Kubernetes resources.*

I have published a little [sample](https://github.com/nheidloff/quarkus-operator-microservice-database) I’m working on. For the sample I use the Operator SDK and the Java Operator SDK. Read my previous blog [Developing and Debugging Kubernetes Operators in Java]({{ "/article/developing-debugging-kubernetes-operators-java/" | relative_url }}) for more backend information.

To access Kubernetes resources the Java SDK uses the [Kubernetes Client](https://github.com/fabric8io/kubernetes-client) provided by [fabric8.io](http://fabric8.io/). This client provides access to the full Kubernetes &amp; OpenShift REST APIs via a fluent DSL.

![image](/assets/img/2022/03/Screenshot-2022-03-03-at-14.56.18.png)

**Rather than using yaml/json files and kubectl/oc CLIs you can create, modify and delete all Kubernetes resources easily from Java with a nice API.**

To get started it helped me to read the [cheatsheet](https://github.com/fabric8io/kubernetes-client/blob/master/doc/CHEATSHEET.md) and look at some samples.

Let’s take a look how to create a deployed used in my sample. This is the [yaml](https://github.com/nheidloff/quarkus-operator-microservice-database/blob/7fcd1599bb24710369569065f1ee73b489b8f251/kubernetes/microservice.yaml#L1-L9) we want to create:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: service-backend
```

And here is a [snippet](https://github.com/nheidloff/quarkus-operator-microservice-database/blob/7fcd1599bb24710369569065f1ee73b489b8f251/src/main/java/com/ecommercesample/ECommerceSampleController.java#L238-L248) how to generate this definition.

```
Deployment deployment = new DeploymentBuilder()
  .withNewMetadata()
    .withName("service-backend")
    .withNamespace(namespace)
    .addToLabels("test", "deployment")
  .endMetadata()
  .withNewSpec()
    .withReplicas(1)
    .withNewSelector()
      .addToMatchLabels("app","service-backend")
    .endSelector()
```

I like the design of the API, since you can easily mirror the structure of the yaml format. Check out especially the indents in the snippets above.

Keep an eye on this blog to find out more about how to build operators.