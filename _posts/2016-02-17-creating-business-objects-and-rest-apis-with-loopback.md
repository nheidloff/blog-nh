---
id: 1872
title: 'Creating Business Objects and REST APIs with LoopBack'
date: '2016-02-17T09:00:43+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1872'
permalink: /article/creating-rest-apis-loopback/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/creating-rest-apis-loopback/
dsq_thread_id:
    - '4586522838'
categories:
    - Articles
---

Recently I’ve developed samples with [LoopBack](http://loopback.io/) which is a very powerful Node.js framework. Over the next days/weeks I’ve planned to blog about LoopBack in more detail, especially how it can be used in the context of [Bluemix](https://bluemix). Below is a simple sample how to create business objects for which LoopBack provides persistence and REST APIs.

Here is a high level description of LoopBack from their website:

> LoopBack is a highly-extensible, open-source Node.js framework.  
> Quickly create dynamic end-to-end REST APIs.  
> Connect devices and browsers to data and services.  
> Use Android, iOS, and AngularJS SDKs to easily create client apps  
> Add-on components for push, file management, 3rd-party login, and geolocation.  
> Use StrongLoop Arc to visually edit, deploy, and monitor LoopBack apps.  
> Runs on-premises or in the cloud.

As an example let’s take an ‘ApprovalRequest’ object which has a title, description and state, as well as a requester and approver which link to ‘Person’ objects. There are different ways to define these models. The following screenshots show how to use the wizard.

You can follow these steps easily yourself which shouldn’t take longer than a couple of minutes. Just install [node](https://nodejs.org/en/download/) and [slc](http://loopback.io/getting-started/).

In the first step you create a LoopBack application via the command ‘slc loopback’.

![image](/assets/img/2016/02/loopback-wizard-1.png)

Next create a model ‘Person’ (via ‘slc loopback:model’) which extends a provided model ‘User’ so that you can do changes to it and link to it.

![image](/assets/img/2016/02/loopback-wizard-2.png)

After this create the model ‘ApprovalRequest’ and define the properties. For both models choose the in memory database as storage.

![image](/assets/img/2016/02/loopback-wizard-3.png)

To link from the approval requests to the requester and approver persons create relations via ‘slc loopback:relation’.

![image](/assets/img/2016/02/loopback-wizard-4.png)

After this you can launch the application via ‘node .’ and open the API explorer. The API is fully functional leveraging the in memory database. In future blog articles I’ll write about how to change the generated APIs.

![image](/assets/img/2016/02/loopback-api-overview.png)

The models are stored in json files can can be modified directly in these files without having to use the wizards.

![image](/assets/img/2016/02/loopback-model.png)

There is also a tool ‘arc’ to define main parts of the models graphically (launch via ‘slc arc’).

![image](/assets/img/2016/02/loopback-arc.png)