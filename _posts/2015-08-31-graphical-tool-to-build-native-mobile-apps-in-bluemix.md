---
id: 1419
title: 'Graphical Tool to build Native Mobile Apps in Bluemix'
date: '2015-08-31T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/graphical-tool-to-build-native-mobile-apps-in-bluemix/'
permalink: /article/31.08.2015083940NHE9TU.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/31.08.2015083940NHE9TU.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323809593'
categories:
    - Articles
---

 I’ve tried briefly the new third party service [Kinetise: build mobile apps in a snap!](https://console.ng.bluemix.net/catalog/kinetise-build-mobile-apps-in-a-snap/) in [IBM Bluemix](https://bluemix.net/). For testing purposes I built a mobile app that displays news entries from [Bluemix.info](http://bluemix.info/).

[Kinetise](https://www.kinetise.com/help/learn-more) provides a web based user interface to build mobile apps without much, if any, programming. The tool provides typical UI controls to create different screens and flows between them. Check out the first 14 short [videos](https://helpcenter.kinetise.com/video-tutorials) to learn how to assemble these apps.

 In order to access data from servers developers can link to feeds and invoke REST APIs which return JSON and XML and bind the data to the UI controls. The [videos](https://helpcenter.kinetise.com/video-tutorials) 15 – 18 describe this capability. I tested this for Bluemix.info:

![image](/assets/img/2015/08/kinetise1.png)

 Additionally developers can build their own individual backend services as described in the last [video](https://helpcenter.kinetise.com/video-tutorials). These services need to follow certain [conventions](https://helpcenter.kinetise.com/backend-developers) and can then also accept data sent from the mobile devices. There is a [tutorial](https://bluemix.kinetise.com/bluemix_tutorial.html) explaining how to write such a service via Node.js on Bluemix which reads and writes from and to an SQL database.

 The developed mobile apps can be previewed in web browsers and the native mobile apps can be built (at this point Android and iPhone).

![image](/assets/img/2015/08/kinetise2.png)

 The built apps can be opened on devices via QR code.

![image](/assets/img/2015/08/kinetise3.png)