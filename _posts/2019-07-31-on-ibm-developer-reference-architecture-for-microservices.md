---
id: 3767
title: 'On IBM Developer: Reference Architecture for Microservices'
date: '2019-07-31T08:24:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3767'
permalink: /article/ibm-developer-reference-architecture-microservices/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ibm-developer-reference-architecture-microservices/
categories:
    - Articles
---

Developers often feel overwhelmed when starting to write cloud-native applications with microservices. There are a lot of technologies that need to be understood first and it needs to be clear when to use which technology.

In order to build complete end-to-end enterprise applications, many different technologies are needed. While there are samples and documentation for how to use single parts, it’s challenging to find open source examples that show all of the capabilities working together.

**New Microservices Series on IBM Developer**

Harald Uebele, Thomas Südbröcker and I have created and open sourced a new reference architecture with a full end-to-end example how to implement cloud-native applications and microservices.

A series of articles and tutorials has been published on IBM Developer to help developers to learn cloud-native concepts: [Build a cloud-native microservices application in Java, step-by-step](https://developer.ibm.com/series/cloud-native-starter/).

The [code](https://github.com/IBM/cloud-native-starter) is available on GitHub.

The reference architecture uses the following technologies:

- Kubernetes
- Istio
- Java/Jakarta EE
- Eclipse MicroProfile

The reference architecture demonstrates key cloud-native functionality:

- [Containerized Java EE Microservices](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoJavaImage.md)
- [Exposing REST APIs](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoExposeRESTAPIs.md)
- [Consuming REST APIs](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoConsumeRESTAPIs.md)
- [Traffic Routing](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoTrafficRouting.md)
- [Resiliency](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoResiliency.md)
- [Authentication and Authorization](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoAuthentication.md)
- [Distributed Logging](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoDistributedLoggingMonitoring.md)
- [Metrics](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoMetrics.md)
- [Persistence with Java Persistence API (JPA)](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoJPA.md)

**What is special about this reference architecture?**

The reference architecture shows how to build complete end-to-end cloud-native enterprise applications with web frontends, multiple microservices, persistence, authorization and more.

The main components of the application are all available as open source, for example OpenJ9 and Open Liberty, so that everyone can use it and there is no vendor lock in. All services that are not available as open source are optional only and can be exchanged with other services. For example for persistence JPA is used that allows switching from the IBM db2 database to other SQL databases.

It is also extremely easy to set up the sample. There are many scripts to deploy the services and the infrastructure. The whole setup shouldn’t take longer than an hour.

**Why is the reference architecture interesting for enterprise developers?**

Kubernetes is the de-facto standard for running cloud-native applications. The benefit of Kubernetes is that cloud-native applications can be run everywhere – on public clouds or private clouds, in managed or unmanaged environments. The reference architecture has scripts and documentation how to run it on [different Kubernetes distributions](https://github.com/IBM/cloud-native-starter#setup):

- Minikube
- IBM Cloud Kubernetes Service
- Minishift
- OpenShift on the IBM Cloud

Java is the programming language that is mostly used for developments of enterprise applications. This example showcases the innovative and fast progressing capabilities of Eclipse MicroProfile to build microservices.

**Give it a try !**

Try out the [reference architecture](https://developer.ibm.com/series/cloud-native-starter/) yourself.

There are 25+ articles, two session recordings, a workshop and much more.

![image](/assets/img/2019/07/cns-on-ibm-developer.png)