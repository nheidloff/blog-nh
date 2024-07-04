---
id: 2863
title: 'Developing OpenWhisk Functions with Spring Boot'
date: '2018-03-02T13:55:13+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2863'
permalink: /article/openwhisk-spring-boot-eclipse/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openwhisk-spring-boot-eclipse/
dsq_thread_id:
    - '6515982131'
categories:
    - Articles
---

I’ve open sourced some code that shows how [Apache OpenWhisk](http://openwhisk.org/) functions can be developed with [Spring Boot](https://projects.spring.io/spring-boot/) and how the functions, which run in Docker, can be debugged in Eclipse IDEs.

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-debug-java)

Apache OpenWhisk is an open source serverless platform. One of the great OpenWhisk features is the capability to build functions with [Docker](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md#creating-docker-actions) by basically only implementing one URL endpoint in a programming language of your choice.

The sample describes how Spring Boot code can be developed in local Eclipse IDEs. The code, which runs in a local Docker container, can be debugged directly from the IDE. Via the [Spring Boot Developer Tools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) the code can be changed in the IDE and the changes can be run immediately without having to restart the container.

The advantage of this approach is that the development is done in (almost) the same container that runs in the cloud which minimizes the chances to run into issues because of different environments.

Here is a screenshot that shows how Spring Boot code running in Docker can be debugged in the Eclipse IDE:

![image](/assets/img/2018/03/debugger.png)

If you want to try out OpenWhisk in the cloud, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff).