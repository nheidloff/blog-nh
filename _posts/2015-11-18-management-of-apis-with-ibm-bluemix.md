---
id: 1586
title: 'Management of APIs with IBM Bluemix'
date: '2015-11-18T13:56:51+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1586'
permalink: /article/management-of-apis-with-ibm-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4329834168'
custom_permalink:
    - article/management-of-apis-with-ibm-bluemix/
categories:
    - Articles
---

In the previous blog entries I described how to [develop and document REST APIs with Spring Boot and Swagger]({{ "/article/usage-of-swagger-2-0-in-spring-boot-applications-to-document-apis/" | relative_url }}) and how to [deploy Spring Boot applications to Bluemix as Docker containers]({{ "/article/Deploying-Spring-Boot-Applications-to-Bluemix-as-Docker-Containers" | relative_url }}). Below I go one step further and explain how to manage and monitor APIs on IBM Bluemix via the [API Management](https://www.ng.bluemix.net/docs/services/APIManagement/index.html) service.

With the API management service you can manage your APIs without having to write this functionality yourself and redundantly directly in the API implementations. For example you can define how to handle security and throttling and you can monitor which APIs are invoked how often at which times by which applications. Below I use the same simple [greeting REST API](https://spring.io/guides/gs/rest-service/) from the previous blog entries and show how to enforce a client id and secret for applications.

Existing APIs can be imported via the Swagger 2.0 format into the API management service.

![image](/assets/img/2015/11/apimspring1.png)

In order to enforce a client id and secret you need to define security schemes and requirements and you need to select “identification” for each operation.

![image](/assets/img/2015/11/apimspring2.png)

API providers create plans that can contain several APIs, that can be versioned and that can be deployed to different environments.

![image](/assets/img/2015/11/apimspring3.png)

Developers register applications to receive client ids and secrets in the developer portal. With these credentials APIs of specific plans can be used, either directly in applications or via the test/invocation tool that is available in the portal.

![image](/assets/img/2015/11/apimspring4.png)

API providers can monitor the usage of their APIs in the API management dashboard, e.g. they can filter API calls by application.

![image](/assets/img/2015/11/apimspring5.png)