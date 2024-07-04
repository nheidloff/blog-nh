---
id: 2388
title: 'New Slots Filling Functionality in Watson Conversation'
date: '2017-06-23T13:44:09+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2388'
permalink: /article/conversation-watson-slots/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/conversation-watson-slots/
dsq_thread_id:
    - '5936004878'
categories:
    - Articles
---

In my previous role I worked on improvements for tooling for conversational user experiences. One of these improvements was an easy way to gather user input before actions are invoked. These typical conversation scenarios are often referred to as ‘slot filling’.

In traditional web applications users define input values in HTML forms and then click on submit buttons to invoke business logic. ‘Slot filling’ is basically the counterpart for conversational user experiences. For example a ‘find company news’ intent might require a ‘company’ and a ‘sentiment’ parameter before the actual APIs (e.g. [Watson Discovery](https://www.ibm.com/watson/developercloud/doc/discovery/index.html) API against news corpus) can be invoked.

If all of this information is provided by people in their phrase, the conversation is straight forward and looks like this.

![watson-conv-slots2](/assets/img/2017/06/watson-conv-slots2.png)

If however the input parameters are mandatory and have not been provided, the conversation service gathers these slots from users first.

![watson-conv-slots1](/assets/img/2017/06/watson-conv-slots1.png)

While it has been possible to build such scenarios with the Watson Conversation service for quite some time, the tooling provided by the [Conversation](https://console.bluemix.net/catalog/services/conversation) service has now significantly improved. You don’t need any longer different dialog nodes for every single variation of a conversation flow. Instead developers can turn on ‘slots’ per node to enter additional information how to ask users to provide the missing information.

![watson-conv-slots3](/assets/img/2017/06/watson-conv-slots3.png)

In order to find out read the [documentation](https://www.ibm.com/watson/developercloud/doc/conversation/index.html) or watch this [video](https://www.youtube.com/watch?v=wrAZTODDm4Q).