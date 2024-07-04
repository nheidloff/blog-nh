---
id: 3669
title: 'Recording of Talk How to develop your first cloud-native Applications with Java'
date: '2019-06-18T06:58:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3669'
permalink: /recording-of-talk-how-to-develop-your-first-cloud-native-applications-with-java/
accesspresslite_sidebar_layout:
    - right-sidebar
categories:
    - Articles
    - Java
tags:
    - java
---

At [WeAreDevelopers](https://www.wearedevelopers.com/) Harald Uebele and I gave a 30 minutes talk ‘How to develop your first cloud-native Applications with Java’. Below is the recording and the slides.

In the talk we described the key cloud-native concepts and explained how to develop your first microservices with Java EE/[Jakarta EE](https://jakarta.ee/) and Eclipse [MicroProfile](https://microprofile.io/) and how to deploy the services to [Kubernetes](https://kubernetes.io/) and [Istio](https://istio.io/).

For the demos we used our end-to-end example application [cloud-native-starter](https://github.com/IBM/cloud-native-starter) which is available as open source. There are instructions and scripts so that everyone can setup and run the demos locally in less than an hour.

We demonstrated key cloud-native functionality:

- [Containerized Java EE Microservices](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoJavaImage.md)
- [Exposing REST APIs](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoExposeRESTAPIs.md)
- [Traffic Routing](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoTrafficRouting.md)
- [Resiliency](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoResiliency.md)
- [Distributed Logging](https://github.com/IBM/cloud-native-starter/blob/master/documentation/DemoDistributedLoggingMonitoring.md)

Here is the [video](https://youtu.be/Z0yQ5XowDI4).

{% include embed/youtube.html id='Z0yQ5XowDI4' %}

The slides are on SlideShare. There is also another deck for a [one hour presentation](https://github.com/IBM/cloud-native-starter/blob/master/documentation/FirstCloudNativeApplicationsJava.pdf) with more details.

<iframe allowfullscreen="" frameborder="0" height="520" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/mn1xERpG0pxzGi" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="853"> </iframe>

Picture from the big stage:

![image](/assets/img/2019/06/Screen-Shot-2019-06-18-at-8.55.41-AM.png)

Get the [code of the sample application](https://github.com/IBM/cloud-native-starter) from GitHub.