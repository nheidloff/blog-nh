---
id: 5639
title: 'Getting Alerts from IBM’s Observability Tool Instana'
date: '2023-01-09T08:02:19+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5639'
permalink: /article/getting-alerts-from-ibm-observability-tool-instana/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/getting-alerts-from-ibm-observability-tool-instana/
categories:
    - Articles
---

*Observability is key for running and operating modern applications. IBM provides a great observability tool called Instana. This post describes how alerts can be used to inform users.*

To get more context about Instana, read my previous posts:

- [IBM’s Observability Tool Instana]({{ "/article/ibm-observability-tool-instana/" | relative_url }})
- [Observing Java Cloud Native Applications with Instana]({{ "/article/observing-java-cloud-native-applications-with-instana/" | relative_url }})

Let’s take a look at a simple sample alert to get email notifications for issues in the sample robot application running in my OpenShift cluster.

First you need to create an alert channel.

![image](/assets/img/2023/01/instana3-4.png)

An alert channel is associated with the alert, for example to alert people via email.

![image](/assets/img/2023/01/instana3-1.png)

There are different types of triggers:

- Event types, e.g. incidents, warnings, etc.
- Individual events are specific events services like Tomcat provide, e.g. number of connections
- Smart events are events for websites, e.g. JavaScript errors

![image](/assets/img/2023/01/instana3-2.png)

An event can be scoped for an application perspective which in my case refers to only my OpenShift cluster.

By default, the message will include some global/generic payloads, e.g. application and namespace, but you can also add custom payloads.

![image](/assets/img/2023/01/instana3-3.png)

The sample robot application comes with a tool to generate load and issues so that the email alert will be triggered.

![image](/assets/img/2023/01/instana3-5.png)

In the email is a link to detailed descriptions. In this case the memory usage of a pod was too high.

![image](/assets/img/2023/01/instana3-6.png)

To learn more about Instana, check out the [Instana](https://www.ibm.com/products/instana) landing page.