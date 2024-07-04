---
id: 3892
title: 'Development of Reactive Applications with Quarkus'
date: '2020-01-20T11:49:41+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3892'
permalink: /article/development-reactive-applications-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/development-reactive-applications-quarkus/
categories:
    - Articles
---

In the context of cloud-native applications the topic ‘reactive’ becomes more and more important, since more efficient applications can be built and user experiences can be improved. If you want to learn more about reactive functionality in Java applications, read on and try out the [code](https://github.com/IBM/cloud-native-starter/tree/master/reactive).

**Challenges when getting started with reactive Applications**

While the topic ‘reactive’ has been around for quite some time, for some developers it’s not straightforward to get started with reactive applications. One reason is that the term is overloaded and describes different aspects, for example reactive programming, reactive systems, reactive manifesto and reactive streams. Another reason is that there are several different frameworks which support different functionality and use other terminologies. For example for me with my JavaScript background it wasn’t obvious to figure out the Java counterparts for JavaScript callbacks, promises and observables. Yet another reason why it can be challenging for some developers to get started is that reactive programming requires a different type of thinking compared to writing imperative code.

There are a lot of resources available to start learning various reactive concepts. When learning new technologies simple tutorials, samples and guides help to understand specific functions. In order to understand how to use the functions together, it helps me to look at more complete applications with use cases that come closer to what developers need when building enterprise applications. Because of this I’ve implemented a sample application which shows various aspects of reactive programming and reactive systems and which can be easily deployed on Kubernetes platforms.

**Architecture of the Sample Application**

Rather than reinventing the wheel, I reused the scenario from the [cloud-native-starter](https://cloud-native-starter.mybluemix.net/) project which shows how to develop and operate synchronous microservices that use imperative programming.

The [sample](https://github.com/IBM/cloud-native-starter/tree/master/reactive) comes with a web application which displays links to articles with author information in a simple web application. The web application invokes the web-api service which implements a backend-for-frontend pattern and invokes the articles and authors service. The articles service stores data in a Postgres database. Messages are sent between the microservices via Kafka. This diagram describes the high level architecture:

![image](/assets/img/2020/01/cns-reactive-architecture.png)

**Technologies and Functionality**

The sample leverages heavily [Quarkus](https://quarkus.io/) which is “a Kubernetes Native Java stack \[…\] crafted from the best of breed Java libraries and standards”. Additionally [Eclipse MicroProfile](https://microprofile.io/), [Eclipse Vert.x](https://vertx.io/), [Apache Kafka](https://kafka.apache.org/), [PostgreSQL](https://www.postgresql.org/), [Eclipse OpenJ9](https://www.eclipse.org/openj9/) and [Kubernetes](https://kubernetes.io/) are used.

Over the next days I’ll try to blog about the following functionality:

- Sending in-memory messages via MicroProfile
- Sending in-memory messages via Vertx event bus
- Sending and receiving Kafka messages via MicroProfile
- Sending Kafka messages via Kafka API
- Reactive REST endpoints via CompletionStage
- Reactive REST invocations via Vertx Axle Web Client
- Reactive REST invocations via MicroProfile REST Client
- Exception handling in chained reactive invocations
- Timeouts via CompletableFuture
- Resiliency of reactive microservices
- Reactive CRUD operations for Postgres

The sample application demonstrates several scenarios and benefits of reactive applications.

**Scenario 1: Reactive Messaging**

One benefit of reactive models is the ability to update web applications by sending messages, rather than pulling for updates. This is more efficient and improves the user experience.

Articles can be created via REST API. The web application receives a notification and adds the new article to the page.

![image](/assets/img/2020/01/cns-reactive-demo-1-video-small.gif)

This diagram explains the flow:

![image](/assets/img/2020/01/cns-reactive-demo-1.png)

**Scenario 2 – Reactive REST Endpoints for higher Efficiency**

Another benefit of reactive systems and reactive REST endpoints is efficiency. This scenario describes how to use reactive systems and reactive programming to achieve faster response times. Especially in public clouds where costs depend on CPU, RAM and compute durations this model saves money.

The project contains the endpoint ‘/articles’ of the web-api service in two different versions, one uses imperative code, the other one reactive code.

The reactive stack of this sample provides response times that take less than half of the time compared to the imperative stack: Reactive: 793 ms – Imperative: 1956 ms.

Read the [documentation](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/LoadTests.md) for details.

This diagram explains the flow:

![image](/assets/img/2020/01/cns-reactive-demo-2.png)

This is the result of the imperative version after 30000 invocations:

![image](/assets/img/2020/01/cns-reactive-load-100x300-v1-summary.png)

This is the result of the reactive version after 30000 invocations:

![image](/assets/img/2020/01/cns-reactive-load-100x30-v2-summary.png)

**Supported Kubernetes Environments**

We have put a lot of effort in making the setup of the sample as easy as possible. For all components and services there are scripts to deploy and configure everything. For example if you have Minikube installed, the setup shouldn’t take longer than 10 minutes.

- [Minikube](https://github.com/IBM/cloud-native-starter/blob/master/reactive/README.md#setup-in-minikube)
- [IBM Cloud Kubernetes Service](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/IKS.md)
- [CodeReady Containers / local OpenShift 4](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/OpenShift4.md)

**Closing Thoughts**

A big thank you goes to [Harald Uebele](https://twitter.com/harald_u) and [Thomas Südbröcker](https://twitter.com/tsuedbroecker) for their ongoing support. Especially I want to thank Harald for writing the deployment scripts for CodeReady Containers and Thomas for writing the deployment scripts for IBM Cloud Kubernetes Service. Additionally I want to thank [Sebastian Daschner](https://twitter.com/DaschnerS) for providing feedback and sending pull requests.

Try out the [code](https://github.com/IBM/cloud-native-starter/tree/master/reactive) yourself!

Read the other articles of this series:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Developing reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }})
- [Invoking REST APIs asynchronously with Quarkus]({{ "/article/invoking-rest-apis-asynchronously-with-quarkus/" | relative_url }})
- [Comparing synchronous and asynchronous Access to Postgres]({{ "/article/comparing-synchronous-asynchronous-access-postgresql/" | relative_url }})