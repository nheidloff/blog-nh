---
id: 800
title: 'Generic Replicator for Mobile XPages Apps accessing IBM Domino Databases'
date: '2013-07-15T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/generic-replicator-for-mobile-xpages-apps-accessing-ibm-domino-databases/'
permalink: /article/08.07.2013111054NHECSD.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/08.07.2013111054NHECSD.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4354904223'
categories:
    - Articles
---

 At [DNUG](http://dnug.de/dnug/dnugcms.nsf/id/863442A9AD830765C1257B36004CDF6C?Open&dl%C3%9E) I attended a very exciting session from Thomas Brandstaetter about a capability that is very important to build mobile apps using XPages. When considering whether to build mobile apps natively or as web apps, the topic ‘offline’ is one of the critical decision factors. You still cannot assume to always have connectivity.

 For quite some time it has been possible to build mobile web apps supporting offline in general, for example check out the [offline XPages sample](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-85588X) I published three years ago. However there are/have been two limitations with it.

 The first one is that it is often required to encrypt the data on mobile devices. Thomas Brandstaetter explained in his DNUG session that his company [DCCS](http://www.dccs.at/unternehmen) has solved this by encrypting the data which is stored in WebSQL DB or indexed DB using JavaScript.

 The second limitation is how to replicate the data from server side Notes databases to mobile devices and vice versa. There are several examples on OpenNTF showing how data can be replicated, for example [mAddressBook](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=mAddressBook). However there was no generic replication mechanism as it exists for replication between Domino servers and Notes clients.

 At DNUG Thomas Brandstaetter demonstrated a generic replicator to addresses this. He [blogged](http://www.dccs.at/thomas-brandstaetter/-/blogs/eine-mobile-web-app-einsetzbar-auf-jedem-gerat-) about it and published two decks. The [first one](http://www.dccs.at/documents/10179/504412/DCCS+-+Mobile+Web+Application.pdf/a9053797-3c4c-4039-ba8d-0f1f26d690f9) describes primarily offline web apps in general and the [second one](http://www.dccs.at/documents/10179/504412/generic_replicator.pdf/9a13eb09-cf10-4f23-94c2-6392d4520601) talks in more detail about the replicator.

 The screenshots show how to configure the replicator.

![image](/assets/img/2013/07/replicator.jpg)

![image](/assets/img/2013/07/replicator2.jpg)

 My understanding is that DCCS offers these capabilities as a service.