---
id: 2668
title: 'Creating Alexa Skills with OpenWhisk and IBM Watson'
date: '2017-11-16T08:43:42+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2668'
permalink: /article/alexa-openwhisk-watson-conversation/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/alexa-openwhisk-watson-conversation/
dsq_thread_id:
    - '6287397803'
categories:
    - Articles
---

My first code pattern (formerly known as developer journeys) has been published on [developer.ibm.com/code](https://developer.ibm.com/code/patterns/create-an-alexa-skill-with-serverless-and-a-conversation/).

The pattern describes how to build Alexa skills with [OpenWhisk](https://www.ibm.com/cloud/functions). Rather than using intent and entity identification from Alexa, [Watson Conversation](https://www.ibm.com/watson/services/conversation/) is used. This allows developers to define conversation flows declaratively and developers can reuse conversations that are available in the [Bot Asset Exchange](https://developer.ibm.com/code/exchanges/bots/).

My colleague Mark Sturdevant improved the documentation and created a [video](https://www.youtube.com/watch?v=4cTSkX0wSV8). Check out the [pattern](https://developer.ibm.com/code/patterns/create-an-alexa-skill-with-serverless-and-a-conversation/) and get the code from [GitHub](https://github.com/IBM/alexa-skill-watson-conversation).

{% include embed/youtube.html id='4cTSkX0wSV8' %}

Here is a diagram showing the involved components.

![image](/assets/img/2017/11/alexa-architecture-final.png)