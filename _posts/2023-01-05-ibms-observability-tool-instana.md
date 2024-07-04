---
id: 5615
title: "IBM's Observability Tool Instana"
date: '2023-01-05T12:24:16+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5615'
permalink: /article/ibm-observability-tool-instana/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ibm-observability-tool-instana/
categories:
    - Articles
---

*Developers need to do more than writing code. DevOps, operations and observability are essential to build and run software. To efficiently operate applications, IBM provides an observability tool called Instana.*

To find out more about Instana, read my other posts:

- [Observing Java Cloud Native Applications with Instana]({{ "/article/observing-java-cloud-native-applications-with-instana/" | relative_url }})
- [Getting Alerts from IBM’s Observability Tool Instana]({{ "/article/getting-alerts-from-ibm-observability-tool-instana/" | relative_url }})

[What is IBM Instana Observability?](https://www.ibm.com/products/instana)

> Boost functionality and observability in your enterprise application performance monitoring (APM) with IBM Instana. Improve application performance management and accelerate CI/CD pipelines no matter where applications reside — public cloud, private cloud, hybrid cloud, on premises, IBM Z and more. With IBM Instana Observability, users can combine APM with automation capabilities and distributed tracing to deploy on premise or as a SaaS solution.

Let’s take a look how to try Instana. There is a [trial](https://www.instana.com/trial/) version. You can install Instana on your own infrastructure or use it as SaaS.

To observe your own Kubernetes or OpenShift clusters, you need to [install an agent](https://www.ibm.com/docs/en/instana-observability/current?topic=requirements-installing-host-agent-openshift). As result you’ll see the following pods.

![image](/assets/img/2023/01/instana-1-1.png)

In the Instana dashboard you need to define an application perspective to only display entries from your own zone which is an OpenShift cluster in this case.

![image](/assets/img/2023/01/instana-1-2.png)

There is an [example cloud-native application](https://github.com/instana/robot-shop) which comes with several services which you’ll find in your application perspective.

![image](/assets/img/2023/01/instana-1-3.png)

As part of the sample application a container is provided that creates [load](https://github.com/instana/robot-shop/tree/master/load-gen) so that real application performance can be displayed in the Instana dashboard, for example endpoint invocations, latency and much more.

![image](/assets/img/2023/01/instana-1-4.png)

To learn more about [Instana](https://www.ibm.com/products/instana), check out the Instana landing page.