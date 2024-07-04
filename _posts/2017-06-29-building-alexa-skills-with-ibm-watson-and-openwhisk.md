---
id: 2417
title: 'Building Alexa Skills with IBM Watson and OpenWhisk'
date: '2017-06-29T08:12:44+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2417'
permalink: /article/alexa-ibm-watson-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '5950510382'
custom_permalink:
    - article/alexa-ibm-watson-openwhisk/
categories:
    - Articles
---

I’ve [open sourced](https://github.com/nheidloff/alexa-skill-watson-conversation) a sample that shows how to build Alexa skills via the serverless framework [OpenWhisk](http://openwhisk.incubator.apache.org/) and IBM [Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html). The sample demonstrates how to define a conversation flow declaratively via Watson Conversation dialogs and it shows how to pass context between different intents.

Here is a sample conversation flow:

- **User:** Alexa, ask my skill what do you know about me
- **Alexa/Watson:** I don’t know anything about you. Where do you live?
- **User:** Berlin
- **Alexa/Watson:** Now I know you live in Berlin
- **User:** Alexa, ask my skill how is the weather
- **Alexa/Watson:** Looking up weather information for Berlin …

The sample has been implemented via the new [slots filling]({{ "/article/conversation-watson-slots" | relative_url }}) functionality in Watson Conversation. The screenshot shows how the entity (slot) ‘location’ is defined as mandatory and how the value is stored in a context variable.

![image](/assets/img/2017/06/alexa-watson-1.png)

The next screenshot shows how the location is automatically used in the next ‘weather’ intent.

![image](/assets/img/2017/06/alexa-watson-2.png)

To build your own Alexa skills via OpenWhisk and Watson, check out the [instructions](https://github.com/nheidloff/alexa-skill-watson-conversation) in the GitHub project.

Thanks a lot to my colleague [Ansgar Schmidt](https://ansi.23-5.eu/) for his help.