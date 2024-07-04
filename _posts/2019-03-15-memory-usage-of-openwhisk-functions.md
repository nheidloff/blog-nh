---
id: 3416
title: 'Memory Usage of OpenWhisk Functions'
date: '2019-03-15T10:31:39+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3416'
permalink: /article/memory-usage-openwhisk-java-javascript/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/memory-usage-openwhisk-java-javascript/
dsq_thread_id:
    - '7296103544'
categories:
    - Articles
---

Last week Red Hat introduced the open source framework [Quarkus](http://in.relation.to/2019/03/08/why-quarkus/) which promises fast boot times and low memory usages. This makes Quarkus interesting for Java workloads running as serverless functions.

I’ve done a little experiment to compare how much memory functions require which run on Apache OpenWhisk and have been implemented with Java and JavaScript.

**Note:** This is just a quick experiment. I haven’t measured the actual memory in the cloud, I haven’t created much load, the functions don’t really do anything, etc.

I compare four different types of functions:

- JavaScript functions as OpenWhisk provides them out of the box
- Java functions as OpenWhisk provides them out of the box
- Java functions using Quarkus
- JavaScript functions using the node:8-alpine image

I’ve open sourced the code and the scripts. [Get the code.](https://github.com/nheidloff/openwhisk-memory-java-javascript)

You can run the functions in the cloud on IBM Cloud Functions and measure the time it takes to execute them. In my quick tests, all of them took roughly the same amount of time once the containers were warm. Also the functions only implement echo functionality, which is why it doesn’t make much sense to measure the execution times of these functions.

That’s why I focussed on memory usage. Since I’m not aware of any way to measure the memory on IBM Cloud Functions, I’ve set up [OpenWhisk locally](https://github.com/apache/incubator-openwhisk-devtools/blob/master/docker-compose/README.md). I hadn’t done this before, but it was really easy and didn’t take longer than 10 minutes. This allows you to run the same containers locally that are run in the cloud.

In order to run the tests yourself, follow the steps in the [README](https://github.com/nheidloff/openwhisk-memory-java-javascript/blob/master/README.md). You need to install some prerequisites and build the images. After this you can create the four functions via some scripts I’ve provided. I create the functions with a memory limit of 128 MB which is the [smallest possible configuration](https://console.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_reference).

In order to see the memory usage, I’ve used the ‘docker stats’ command. Here are the results:

![image](/assets/img/2019/03/docker-stats.png)