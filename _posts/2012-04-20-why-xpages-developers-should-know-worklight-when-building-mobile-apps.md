---
id: 486
title: 'Why XPages Developers should know Worklight when building Mobile Apps'
date: '2012-04-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/why-xpages-developers-should-know-worklight-when-building-mobile-apps/'
permalink: /article/19.04.2012143734NHEGTK.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/19.04.2012143734NHEGTK.htm/
dsq_thread_id:
    - '4318883704'
categories:
    - Articles
---

At the beginning of this year IBM [acquired](http://www-03.ibm.com/press/us/en/pressrelease/36660.wss) [Worklight](http://www.worklight.com/), a mobile application platform to build, deploy and manage HTML based mobile apps, hybrid apps and native apps.

There is plenty of documentation describing Worklight, e.g. this deck for a quick overview.

There is also a [YouTube channel](http://www.youtube.com/user/WorklightInc?ob=0&feature=results_main) with several good videos, e.g. [“WorkLight Overview”](http://www.youtube.com/watch?v=nqB-zXN9z08&list=UUIufhVDRP4tWMbgqHB6uk_g&index=16&feature=plcp), [“Native, Web or Hybrid Mobile Apps?”](http://www.youtube.com/watch?v=Ns-JS4amlTc&list=UUIufhVDRP4tWMbgqHB6uk_g&index=14&feature=plcp) and [“Using PhoneGap and Worklight for Mobile App Development in the Enterprise”](http://www.youtube.com/watch?v=GMxbEnkGHGM&list=UUIufhVDRP4tWMbgqHB6uk_g&index=5&feature=plcp). Additionally there are [more videos](http://www.worklight.com/product/demo/) on Worklight.com as well as [product documentation](http://www.worklight.com/download/documentation).

The general concept of Worklight is to build as much functionality of mobile apps as possible with standard web technologies. Only if web technologies cannot be used native code is used in hybrid apps. I think this brings together the best of both worlds. The same general idea is used by the open source framework [PhoneGap](http://phonegap.com/). Worklight comes with PhoneGap but extends it by providing more functionality like push notifications, encrypted storage, manageability, etc.

At this point Worklight requires developers to put all web resources (the one HTML file plus JS files, css, etc.) in the native/hybrid app. These web applications can then talk to server backends using an [adapter framework](http://www.worklight.com/download/get-started/4.2.1/module-5). So this configuration can be used by Domino developers who want to access data from NSFs using the Domino REST APIs.

It is currently not supported to point the Worklight app against a remote web server, e.g. an XPage. However this is important so that XPages developers can continue to use Domino Designer and the XPages mobile controls to build the web parts of their apps. The Worklight team is aware of this requirement. I spent some time to figure out what changes need to be done to the Worklight app to make this work (at least for simple scenarios) so that XPages developers can start playing with Worklight. I’ve created a video with instructions that I’d like to publish as soon as some more people will have reviewed it.

This will open up great capabilities for XPages developers:  
– [Mix and match of native and web pages](http://www.worklight.com/download/get-started/4.2.1/module-9.1)  
– [Invocations of native code from web apps](http://www.worklight.com/download/get-started/4.2.1/module-9.3)  
– [Push notifications](http://www.worklight.com/download/get-started/4.2.1/module-21)  
– [Offline access](http://www.worklight.com/download/get-started/4.2.1/module-7.7)  
– [Encrpyted cache](http://www.worklight.com/download/get-started/4.2.1/module-7.8)  
– [PhoneGap out of the box APIs](http://www.worklight.com/download/get-started/4.2.1/module-7.4) as well as [PhoneGap plugins](http://www.worklight.com/download/get-started/4.2.1/module-9.3)  
– [Common controls](http://www.worklight.com/download/get-started/4.2.1/module-7.1)