---
id: 3679
title: 'Free and self paced workshop: How to develop microservices with Java'
date: '2019-06-24T09:01:53+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3679'
permalink: /free-and-self-paced-workshop-how-to-develop-microservices-with-java/
accesspresslite_sidebar_layout:
    - right-sidebar
categories:
    - Articles
    - Java
tags:
    - java
---

Over the last weeks I’ve worked on an [example application](https://github.com/IBM/cloud-native-starter/) that demonstrates how to develop your first cloud-native applications with Java/[Jakarta EE](https://jakarta.ee/), [Eclipse MicroProfile](https://microprofile.io/), [Kubernetes](https://kubernetes.io/) and [Istio](https://istio.io/). Based on this example my colleague Thomas Südbröcker wrote a workshop which explains how to implement resilient microservices, how to expose and consume REST APIs, how to do traffic management and more.

Check out the [workshop](https://github.com/IBM/cloud-native-starter/tree/master/workshop) on GitHub.

The workshop contains the following labs:

- [Building and deploying containers](https://github.com/IBM/cloud-native-starter/blob/master/workshop/02-container.md)
- [Defining and exposing REST APIs](https://github.com/IBM/cloud-native-starter/blob/master/workshop/03-rest-api.md)
- [Using traffic management in Kubernetes](https://github.com/IBM/cloud-native-starter/blob/master/workshop/04-traffic-management.md)
- [Resiliency](https://github.com/IBM/cloud-native-starter/blob/master/workshop/05-resiliency.md)
- [Build a hello world microservice](https://github.com/IBM/cloud-native-starter/blob/master/workshop/06-java-development.md)

The example application is a simple application that displays blog entries and links to the profiles of the authors.

![image](/assets/img/2019/06/workshop-cn-02.png)

There are three microservices: Web-API, Articles and Authors, The microservice Web-API has two versions to demonstrate traffic management. The web application has been developed with Vue.js and is hosted via nginx.

![image](/assets/img/2019/06/workshop-cn-01.png)

The workshop utilizes the IBM Cloud Kubernetes Service. You can get a [free lite account](http://ibm.biz/nheidloff) and a [free cluster](https://github.com/IBM/cloud-native-starter/blob/master/documentation/IKSDeployment.md) as documented in our repo.