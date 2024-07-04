---
id: 5628
title: 'Observing Java Cloud Native Applications with Instana'
date: '2023-01-06T14:30:09+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5628'
permalink: /article/observing-java-cloud-native-applications-with-instana/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/observing-java-cloud-native-applications-with-instana/
categories:
    - Articles
---

*Developers need to do more than writing code. The understanding and correct usage of DevOps, operations and observability are essential to build and run software. To efficiently operate applications, IBM provides an observability tool called Instana which provides specific functionality to observe Java applications via OpenTelemetry.*

What is IBM Instana Observability?

> Boost functionality and observability in your enterprise application performance monitoring (APM) with IBM Instana. Improve application performance management and accelerate CI/CD pipelines no matter where applications reside — public cloud, private cloud, hybrid cloud, on premises, IBM Z and more. With IBM Instana Observability, users can combine APM with automation capabilities and distributed tracing to deploy on premise or as a SaaS solution.

There is a [sample cloud native application](https://github.com/instana/robot-shop) including a [load generator](https://github.com/instana/robot-shop/tree/master/load-gen). Once installed you can observe the sample robot application via the Instana dashboard.

![image](/assets/img/2023/01/instana-2-1.png)

One feature that I like is similar to what [Kiali](https://kiali.io/) provides. You can see the chain of invocations for endpoints via the industry standard [OpenTelemetry](https://www.instana.com/blog/what-is-opentelemetry/).

![image](/assets/img/2023/01/instana-2-2.png)

Since most enterprise applications have been implemented with Java, Instana provides specific functionality for Java services. For example under the ‘Stack’ tab you see JVMs.

![image](/assets/img/2023/01/instana-2-3.png)

When clicking on the JVM entries, you can get information about threads, heap memory and more. When Java errors occur, Instana even shows where they occurred by de-compiling the Java code and pointing you to the specific line of code.

![image](/assets/img/2023/01/instana-2-4.png)

To learn more about [Instana](https://www.ibm.com/products/instana), check out the Instana landing page.

I’ve also written two more posts about Instana:

- [IBM’s Observability Tool Instana]({{ "/article/ibm-observability-tool-instana/" | relative_url }})
- [Getting Alerts from IBM’s Observability Tool Instana]({{ "/article/getting-alerts-from-ibm-observability-tool-instana/" | relative_url }})