---
id: 646
title: 'Activity Stream Service Java API for XPages'
date: '2012-11-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/activity-stream-service-java-api-for-xpages/'
permalink: /article/26.11.2012081646NHEAK3.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/26.11.2012081646NHEAK3.htm/
dsq_thread_id:
    - '4368847451'
categories:
    - Articles
---

We [announced](http://heidloff.net/home.nsf/dx/08.11.2012135412NHEH5Y.htm) recently the new IBM Social Business Toolkit which provides a SDK making it easy for Java and web developers to invoke REST APIs, esp. IBM Connections and IBM SmartCloud for Social Business APIs. As part of the SDK there is a set of Java APIs, e.g. an activity stream service, that can be used by server side JSP/Java code.

I’ve extended this particular service so that it can be used now in XPages. The service provides methods to read from the activity streams in IBM Connections and to post new entries to the streams. The implementation of this service uses the XPages social enabler and leverages the ltpa endpoint for authentication. I’d like to open source it soon on OpenNTF.

{% include embed/youtube.html id='pWRMpJq6XqE' %}