---
id: 2645
title: 'Using regular Expressions for Entities in Conversations'
date: '2017-11-03T08:06:22+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2645'
permalink: /article/regular-expressions-entities-conversations/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/regular-expressions-entities-conversations/
dsq_thread_id:
    - ''
categories:
    - Articles
---

In conversational experiences entities are used to identify classes of objects in user phrases, for example ‘city’ or ‘person’. [Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html) supports entity definitions with predefined lists of potential values and synonyms. Recently a new capability has been added so that you can also use [regular expressions to identify entities](https://console.bluemix.net/docs/services/conversation/entities.html#defining-entities) (beta).

This functionality is useful when, for example, you want to identify email addresses, phone numbers or URLs without predefining all potential values.

Let’s take [SPRs](https://www-10.lotus.com/ldd/dominowiki.nsf/dx/using-grouping-in-a-live-text-my-widget) as an example which IBM used to track issues. The SPRs can have the following formats  
SPR: AAML68KURS  
SPR:AAML68KURS  
SPR#: AAML68KURS  
SPR AAML68KURS

The SPRs can be identified via the regular expression ‘SPR\[#: \]\*?(\[A-Z\]{4}\[A-Z0-9\]{6})’ which is defined as pattern for the SPR entity.

![image](/assets/img/2017/11/conv-regularexpression-1.png)

In order to access the actual value of the SPR entity in your code you need to put the value in a context variable.

![image](/assets/img/2017/11/conv-regularexpression-2.png)

After this Watson Conversation can identify the entity. Here is a sample conversation.

![image](/assets/img/2017/11/conv-regularexpression-3.png)