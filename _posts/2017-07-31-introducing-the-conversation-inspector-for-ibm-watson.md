---
id: 2440
title: 'Introducing the Conversation Inspector for IBM Watson'
date: '2017-07-31T10:10:41+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2440'
permalink: /article/conversation-inspector-ibm-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/conversation-inspector-ibm-watson/
dsq_thread_id:
    - '6029981221'
categories:
    - Articles
---

My colleague [Ansgar Schmidt](https://ansi.23-5.eu/) and I have developed a new tool for developers to simplify building conversational user experiences with [IBM Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html). The tool displays JSON data of REST API requests that is sent between applications and the Watson Conversation service and it allows developers to modify outgoing JSON messages.

With the tool developers can test their intents, entities and dialogs defined in Watson Conversation without having to write their own test applications or to invoke curl commands. This is useful when, for example, you use [context variables](https://console.bluemix.net/docs/services/conversation/dialog-build.html#context) extensively to manage state information in conversations.

Try out the [online version](https://conversation-inspector-for-ibm-watson.mybluemix.net) to explore the functionality of the tool. The online version has been pre-configured with a Watson Conversation service with the [car dashboard demo](https://github.com/watson-developer-cloud/car-dashboard) workspace.

We have open sourced the [Conversation Inspector for IBM Watson](https://github.com/nheidloff/conversation-inspector-for-ibm-watson) on GitHub and would like to get your [feedback](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/issues) how we can further improve it.

Below is an overview of the functionality.

**Displays JSON data of incoming messages and provides filters**

![image](/assets/img/2017/07/help1.png)

**Displays JSON data of outgoing messages**

![image](/assets/img/2017/07/help5.png)

**Allows sending outgoing messages via text or JSON**

![image](/assets/img/2017/07/help2.png)

**Displays history of conversation steps and allows developers to navigate back to previous steps**

![image](/assets/img/2017/07/help6.png)

We have several ideas how to further improve the tool. Check out the [issues](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/issues) for details. If you have more ideas or run into issues, please create new issues or send pull requests.