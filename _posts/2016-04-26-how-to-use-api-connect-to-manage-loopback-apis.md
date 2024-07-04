---
id: 2060
title: 'How to use API Connect to manage LoopBack APIs'
date: '2016-04-26T10:11:16+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2060'
permalink: /article/how-to-use-api-connect-loopback-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-use-api-connect-loopback-bluemix/
categories:
    - Articles
---

[LoopBack](http://loopback.io/) is a great Node.js framework for building APIs. In the easiest case business objects can be defined declaratively and LoopBack generates REST APIs, the documentation of the APIs, the persistence as well as a client side JavaScript APIs automatically. To take it one step further I used the new [Bluemix](https://bluemix.net) service [API Connect](https://console.ng.bluemix.net/docs/services/apiconnect/index.html) to manage these APIs.

As an example I used a simple sample application ‘Approval Requests’ built on the [CLEAN]({{ "/article/introducing-clean-stack-javascript-everywhere" | relative_url }}) stack. The sample is available as [open source](https://github.com/IBM-Bluemix/collaboration) and comes with several APIs. In this blog article I focus on two of these APIs: 1. Login users, 2. get a list of users which requires user authentication.

The API Connect service basically adds a layer on top of the LoopBack API implementation. Rather than calling the LoopBack APIs directly the APIs of the API Connect service are invoked. This allows the service to track usage of the APIs. Developers can use developer portals, register their applications and subscribe to API plans.

In the sample below I created the API definitions manually via the API Connect dashboard and used a proxy to forward the requests to the actual API implementations. In other words, what I describe here works the same way for other types of API implementations and not just for LoopBack.

First I defined the two paths and their input parameters. In the case of ‘login’ JSON is required which includes an user name and a password. The output is an access\_token which is passed to all other API invocations to identify the authenticated user.

![image](/assets/img/2016/04/apiconnect3.png)

The next screenshot shows how to enforce client ids. API consumers get their own client ids when registering applications in the developer portal. With the API Connect service you can also use additionally a client secret.

![image](/assets/img/2016/04/apiconnect4.png)

In the next step I defined the assembly. In my case I simply use a proxy to my LoopBack application. The important parts are the two variables to make sure that the access\_tokens are always forwarded and to map the paths defined in the API Connect service to the paths of the underlying API implementations.

```
https://collaboration-farci-custard.mybluemix.net/api/$(request.path)?access_token=$(request.parameters.access_token)
```

![image](/assets/img/2016/04/apiconnect5.png)

In the developer portal API consumers can subscribe to API plans and invoke the two APIs.

![image](/assets/img/2016/04/apiconnect1.png)

![image](/assets/img/2016/04/apiconnect2.png)

API owners can see analytics of their APIs in the API Connect dashboard, for example how many APIs were invoked at which time by which application.

![image](/assets/img/2016/04/apiconnect6.png)