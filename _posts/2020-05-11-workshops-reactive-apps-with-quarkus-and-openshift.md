---
id: 4053
title: 'Workshops: Reactive Apps with Quarkus and OpenShift'
date: '2020-05-11T13:19:11+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4053'
permalink: /article/workshops-reactive-applications-with-quarkus-microprofile-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/workshops-reactive-applications-with-quarkus-microprofile-openshift/
categories:
    - Articles
    - Java
tags:
    - java
---

In the context of cloud-native applications the topic ‘reactive’ becomes more and more important, since more efficient applications can be built and user experiences can be improved. If you want to learn more about reactive functionality in Java applications, read on and try out the [sample application](https://github.com/IBM/cloud-native-starter/tree/master/reactive) and the two new workshops.

**Benefits of reactive Applications**

In order to demonstrate benefits of reactive applications, I’ve developed a sample application with a web interface that is updated automatically when new data is received rather than pulling for updates. This is more efficient and improves the user experience.

The animation shows how articles can be created via curl commands in the terminal at the bottom. The web application receives a notification and adds the new article to the page.

![image](/assets/img/2020/01/cns-reactive-demo-1-video-small.gif)

Another benefit of reactive systems and reactive REST endpoints is efficiency. This scenario describes how to use reactive systems and reactive programming to achieve faster response times. Especially in public clouds where costs depend on CPU, RAM and compute durations this model saves money.

The project contains a sample endpoint which reads data from a database in two different versions, one uses imperative code, the other one reactive code. The reactive stack of this sample provides response times that take less than half of the time compared to the imperative stack: Reactive: 793 ms – Imperative: 1956 ms.

**Workshops**

I’ve written two workshops which demonstrate and explain how to build reactive functionality with Quarkus and MicroProfile and how to deploy and run it on OpenShift. You can use Red Hat OpenShift on IBM Cloud or you can run OpenShift locally via Code Ready Containers.

The sample used in the workshops leverages heavily [Quarkus](https://quarkus.io/) which is “a Kubernetes Native Java stack \[…\] crafted from the best of breed Java libraries and standards”. Additionally [Eclipse MicroProfile](https://microprofile.io/), [Eclipse Vert.x](https://vertx.io/), [Apache Kafka](https://kafka.apache.org/), [PostgreSQL](https://www.postgresql.org/), [Eclipse OpenJ9](https://www.eclipse.org/openj9/) and [Kubernetes](https://kubernetes.io/) are used.

**Workshop: Reactive Endpoints with Quarkus on OpenShift**

This workshop focusses on how to provide reactive REST APIs and how to invoke services reactively. After you have completed this workshop, you’ll understand the following reactive functionality:

- Reactive REST endpoints via CompletionStage
- Exception handling in chained reactive invocations
- Timeouts via CompletableFuture
- Reactive REST invocations via MicroProfile REST Client

[Open Workshop](https://github.com/ibm/workshop-quarkus-openshift-reactive-endpoints)

**Workshop: Reactive Messaging with Quarkus on OpenShift**

This workshop focusses on how to do messaging with Kafka and MicroProfile. After you have completed this workshop, you’ll understand the following reactive functionality:

- Sending and receiving Kafka messages via MicroProfile
- Sending events from microservices to web applications via Server Sent Events
- Sending in-memory messages via MicroProfile and Vert.x Event Bus

[Open Workshop](https://github.com/ibm/workshop-quarkus-openshift-reactive-messaging)

**Next Steps**

To learn more, check out the other articles of this blog series:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Developing reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }})
- [Invoking REST APIs asynchronously with Quarkus]({{ "/article/invoking-rest-apis-asynchronously-with-quarkus/" | relative_url }})
- [Comparing synchronous and asynchronous Access to Postgres]({{ "/article/comparing-synchronous-asynchronous-access-postgresql/" | relative_url }})