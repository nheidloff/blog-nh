---
id: 3554
title: 'Example Java App running in the Cloud via Kubernetes'
date: '2019-04-10T10:14:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3554'
permalink: /article/example-java-app-cloud-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/example-java-app-cloud-kubernetes/
categories:
    - Articles
tags:
    - java
---

Over the last weeks I’ve worked on a new sample application which demonstrates how to build microservices-based architectures. While there are still some minor things I’d like to add, I think the sample is pretty comprehensive now and a good option for developers, especially Java EE developers, to learn microservices and cloud-native patterns.

The example is available as open source. The GitHub repo is called [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter).

**Kubernetes, Istio and Java**

When building cloud-native applications, developers are challenged to figure out how to address topics like traffic routing, resiliency, distributed monitoring, service discoveries and more. Fortunately most of these new challenges are handled by the orchestration platform [Kubernetes](https://kubernetes.io/) and the service mesh [Istio](https://istio.io/). This functionality works generically for microservices, regardless of the language they are implemented in and without changes to the application logic.

However, some functionality can not be covered by orchestration platforms and service meshes. Instead it must be handled in the business logic of the microservices, for example application specific failover functionality, metrics, and fine-grained authorizations.

Java developers can leverage [Eclipse MicroProfile](https://microprofile.io/) to implement this functionality. MicroProfile is an extension to Java EE (Enterprise Edition) to build microservices-based architectures and it complements Kubernetes and Istio capabilities. In addition to the application specific logic which Kubernetes and Istio cannot handle, it also comes with convenience functionality that you typically need when developing microservices, for example mechanisms to invoke REST APIs and functionality to implement REST APIs including their documentation.

**Design Principles**

The example application follows these design principles:

- Leverage platforms as much as possible – do as little as possible in language-specific frameworks
- Use open-source components for the core services of the application only
- Make the first time experience as simple as possible
- Be able to run the application in different environments

Let me explain the design principles in more detail.

*Leverage platforms as much as possible – do as little as possible in language-specific frameworks*

The advantage of using Kubernetes and Istio for features like traffic management is, that these features are language agnostic. Cloud-native applications can be, and often are, polyglot. This allows developers to pick the best possible languages for the specific tasks.

*Use open-source components for the core services of the application only*

In my role as developer advocate I talk with many developers. Pretty much everyone loves open source. In order to reach as many developers as possible, the sample application uses for the core services of the application only open source projects. For example the Java stack leverages [OpenJ9](https://www.eclipse.org/openj9/), OpenJDK from [AdoptOpenJDK](https://adoptopenjdk.net/), [OpenLiberty](https://openliberty.io/) and [MicroProfile](https://microprofile.io/). Kubernetes and Istio are obviously open source projects as well. The components of the application that are not available as open source are optional and can be exchanged.

*Make the first time experience as simple as possible*

There are many samples, snippets, articles and tutorials available for the various cloud-native features and many of them are really good. However, I’ve had issues to run some of these features together in one application. Sometimes they used different Java stacks, sometimes different versions and sometimes the articles were outdated.

The example application shows several features working together, see below for details. There are also scripts to deploy services very easily, basically one script per service, similar to the ‘cf push’ experience for Cloud Foundry applications.

*Be able to run the application in different environments*

Fortunately this is one of the main advantages of Kubernetes since you can run workloads on-premises, hybrid or public cloud infrastructures. The repo has instructions how to deploy the application to Minikube and to the managed [IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service).

**Functionality of the Sample Application**

The project [demonstrates](https://github.com/nheidloff/cloud-native-starter#demos) the following functionality:

- [Dockerizing Java MicroProfile services]({{ "/article/dockerizing-container-java-microprofile" | relative_url }})
- [Traffic management](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/DemoTrafficRouting.md)
- [Authentication and authorization]({{ "/article/authentication-authorization-openid-connect-istio" | relative_url }})
- [Resiliency](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/DemoResiliency.md)
- [REST APIs implementations including documentation]({{ "/article/rest-apis-microprofile-javaee-jaxrs" | relative_url }})
- [REST API invocations](http://heidloff.net/invoke-rest-apis-java-microprofile-microservice)
- [Monitoring and metrics]({{ "/article/prometheus-metrics-microprofile-microservices-istio/" | relative_url }})
- [Distributed logging and monitoring](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/DemoDistributedLoggingMonitoring.md)

This diagram shows the services and components:

![image](/assets/img/2019/04/cloud-native-starter-motivation.png)

The web application invokes an API of a BFF (backend for frontend) service to display articles with authors.

![image](/assets/img/2019/03/blog-web-app.png)

**Call to Action**

If you want to learn cloud-native applications, get the code of the [example application](https://github.com/nheidloff/cloud-native-starter) and follow the [instructions](https://github.com/nheidloff/cloud-native-starter#setup) to set up a local Minikube environment and to deploy the microservices. If you have already a Kubernetes cluster, the setup should not take longer than half an hour.

You can also run this application on the [IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) which is a managed service that comes with an [Istio plugin](https://cloud.ibm.com/docs/containers?topic=containers-istio#istio). IBM provides an [IBM Cloud Lite](http://ibm.biz/nheidloff) account which is free, no credit card is required and there is no time restriction. In order to use the Kubernetes service, contact [Harald](https://twitter.com/harald_u) and [myself](https://twitter.com/nheidloff) to get a promo code. Then follow these [instructions](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/IKSDeployment.md) to deploy the services to the IBM Cloud.

As always, I’d like to get feedback. Please let me know what you think about the example and how it could be improved. My direct messages on Twitter are open: [@nheidloff](https://twitter.com/nheidloff)

I also want to thank everyone who has helped to create this application, especially Harald Uebele who has written a lot of the code and scripts.