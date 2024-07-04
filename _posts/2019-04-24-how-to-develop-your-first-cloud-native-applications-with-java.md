---
id: 3581
title: 'How to develop your first cloud-native Applications with Java'
date: '2019-04-24T09:57:05+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3581'
permalink: /article/how-to-develop-your-first-cloud-native-applications-with-java/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-develop-your-first-cloud-native-applications-with-java/
categories:
    - Articles
---

Over the next weeks I’ll give several talks how to get started with cloud-native applications implemented in Java. The talk is based on [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter), which is an end-to-end application that demonstrates how to build microservices with Java and MicroProfile and how to deploy and run them on Kubernetes and Istio.

The [deck](https://www.slideshare.net/niklasheidloff/how-to-develop-your-first-cloudnative-applications-with-java) summarizes the example application. You can get the [PDF](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/FirstCloudNativeApplicationsJava.pdf) from our repo.

<iframe allowfullscreen="" frameborder="0" height="488" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/lE1vJlLQKiypZG" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="853"> </iframe>

I have also recorded some demos (without tone):

- Demo 1 (slide 20): [Resiliency](https://youtu.be/IVd8pxDP8p8?t=5)
- Demo 2 (slide 22): [Traffic management](https://youtu.be/IVd8pxDP8p8?t=41)
- Demo 3 (slide 24): [Authorization](https://youtu.be/IVd8pxDP8p8?t=81)
- Demo 4 (slide 33): [Logging](https://youtu.be/IVd8pxDP8p8?t=153)

In the talk my colleague Harald Uebele and I’ll address how Kubernetes, Istio, Java EE and MicroProfile can be used together.

We suggest to use the Kubernetes and Istio platforms as much as possible to leverage standard orchestration platforms and service meshes and to use the same functionality for polyglot microservices.

Language specific frameworks like MicroProfile should especially be used for application specific logic which platforms can not handle, for example fine grained authorizations or application specific metrics.

![image](/assets/img/2019/04/Screen-Shot-2019-04-24-at-10.29.15-AM.png)

If you want to learn more about cloud-native applications, get the code of the [example application](https://github.com/nheidloff/cloud-native-starter) and follow the [instructions](https://github.com/nheidloff/cloud-native-starter#setup) to set up a local Minikube environment and to deploy the microservices. If you have already a Kubernetes cluster, the setup should not take longer than half an hour.

You can also run this application on the [IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) which is a managed service that comes with an [Istio plugin](https://cloud.ibm.com/docs/containers?topic=containers-istio#istio). IBM provides an [IBM Cloud Lite](http://ibm.biz/nheidloff) account which is free, no credit card is required and there is no time restriction. In order to use the Kubernetes service, contact [Harald](https://twitter.com/harald_u) and [myself](https://twitter.com/nheidloff) to get a promo code. Then follow these [instructions](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/IKSDeployment.md) to deploy the services to the IBM Cloud.