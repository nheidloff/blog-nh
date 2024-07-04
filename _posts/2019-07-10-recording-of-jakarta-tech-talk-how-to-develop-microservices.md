---
id: 3758
title: 'Recording of Jakarta Tech Talk How to develop Microservices'
date: '2019-07-10T08:08:21+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3758'
permalink: /article/recording-jakarta-tech-talk-how-to-develop-microservices/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/recording-jakarta-tech-talk-how-to-develop-microservices/
categories:
    - Articles
    - Java
tags:
    - java
---

Yesterday I presented in a [Jakarta Tech Talk](https://www.meetup.com/jakartatechtalks_/events/262259197/) ‘How to develop your first cloud-native Applications with Java’. Below is the recording and the slides.

In the talk I described the key cloud-native concepts and explained how to develop your first microservices with Java EE/[Jakarta EE](https://jakarta.ee/) and Eclipse [MicroProfile](https://microprofile.io/) and how to deploy the services to [Kubernetes](https://kubernetes.io/) and [Istio](https://istio.io/).

For the demos I used our end-to-end example application [cloud-native-starter](https://github.com/IBM/cloud-native-starter) which is available as open source. There are instructions and scripts so that everyone can setup and run the demos locally in less than an hour.

I demonstrated key cloud-native functionality:

- [Containerized Java EE Microservices](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoJavaImage.md)
- [Exposing REST APIs](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoExposeRESTAPIs.md)
- [Consuming REST APIs](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoConsumeRESTAPIs.md)
- [Traffic Routing](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoTrafficRouting.md)
- [Resiliency](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoResiliency.md)
- [Authentication and Authorization](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoAuthentication.md)
- [Distributed Logging](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoDistributedLoggingMonitoring.md)
- [Metrics](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoMetrics.md)
- [Persistence with Java Persistence API (JPA)](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoJPA.md)

Here is the [recording](https://youtu.be/kp6tm8gdjTc?t=77).

{% include embed/youtube.html id='kp6tm8gdjTc?start=77' %}

The slides are on [SlideShare](https://www.slideshare.net/niklasheidloff/jakarta-tech-talk-how-to-develop-your-first-cloudnative-application-with-java).

<iframe allowfullscreen="" frameborder="0" height="520" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/aZvr22HDjf3DJF" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="853"> </iframe>

This is the summary page with links to resources to find out more:

- [Source code of the sample application](https://github.com/IBM/cloud-native-starter)
- Free [IBM Cloud Lite](https://ibm.biz/nheidloff) account
- [IBM Developer](https://developer.ibm.com/)

![image](/assets/img/2019/07/jakartatechtalkrecording.png)