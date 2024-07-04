---
id: 1361
title: 'Running Java Applications from Eclipse IDEs in Docker Liberty Containers'
date: '2015-08-11T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/running-java-applications-from-eclipse-ides-in-docker-liberty-containers/'
permalink: /article/11.08.2015122346NHEE7W.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/11.08.2015122346NHEE7W.htm/
dsq_thread_id:
    - '4323745866'
categories:
    - Articles
---

 Before my vacation I blogged about the [Docker tooling in Eclipse to build Liberty based images for Bluemix](http://heidloff.net/nh/home.nsf/article.xsp?id=07222015115210AMNHEDL7.htm). This tooling helps to create images and containers including the applications which is the end result of what developers produce. But in order for developers to test changes during development a new image and a new container would have to be created manually after very code change.

Because of that reason developers often use the local Liberty server which is integrated in Eclipse so that code changes can be tested (almost) immediately and Java code can be debugged. However in some cases this model might cause issues because of inconsistencies between the local Liberty server configuration and the Liberty version running in the Docker container.

As an alternative you can configure Eclipse to run your applications from the workspace on a remote Liberty server which can run in the Docker container. My colleague Kavitha Suresh Kumar has created a video which describes how to use this mechanism.

{% include embed/youtube.html id='HnXDGDD5ngQ' %}

So in addition to the local Liberty server I can also run my application now directly on Docker and see code changes immediately.

![image](/assets/img/2015/08/eclipsedocker.png)

Unfortunately I haven’t figured out yet how to do remote debugging. There is a capability in the Liberty Eclipse tooling to do this in general but there seems to be a problem in combination with the Liberty container. I’ll blog more about this when I’ll find out how to use this functionality.

My colleague Soloman Barghouthi describes in the next video yet another alternative to see application changes in Docker containers immediately. He uses an approach to map a drive with the server configuration and web application and make it accessible to Docker.

{% include embed/youtube.html id='ebuS9teyYRk' %}