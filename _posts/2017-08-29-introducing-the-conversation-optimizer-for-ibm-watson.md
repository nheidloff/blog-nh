---
id: 2471
title: 'Introducing the Conversation Optimizer for IBM Watson'
date: '2017-08-29T08:18:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2471'
permalink: /article/conversation-optimizer-ibm-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/conversation-optimizer-ibm-watson/
dsq_thread_id:
    - '6103908835'
categories:
    - Articles
---

In order to develop conversational experiences it’s important to understand how users are actually using bots. Based on this data conversational experiences can continuously be improved.

[Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html) comes with an [improve component](https://console.bluemix.net/docs/services/conversation/logs.html#about-the-improve-component) which helps analyzing and improving bots. Dependent on the service plan all conversations from the last 7, 30 or 90 days are stored. Via the Watson Conversation web interface you can get an overview of the interactions between users and bots, for example the traffic at a specific date. You can also improve how Watson understands user inputs by adding or changing intents and entities. Additionally there is a new [recommendations](https://console.bluemix.net/docs/services/conversation/logs_recommend.html#recommendations) feature which I want to blog about soon.

Watson Conversation provides an [API](https://www.ibm.com/watson/developercloud/conversation/api/v1/#get_logs) to read the logs. Ansgar Schmidt and I have used this API to built a new tool that helps optimizing conversational experiences. The tool reads conversations of a workspace and provides different filters to find conversation flows that have potential issues and might require improvements.

The Conversation Optimizer for IBM Watson is available as [open source](https://github.com/nheidloff/conversation-optimizer-for-ibm-watson). You can install it by clicking the [Deploy](https://bluemix.net/deploy?repository=https://github.com/nheidloff/conversation-optimizer-for-ibm-watson) button or you can run an [online](https://conversation-optimizer-for-ibm-watson.mybluemix.net) demo version. In order to add conversations to the demo version you can use the [Conversation Inspector](https://conversation-inspector-for-ibm-watson.mybluemix.net) which has been configured to go against the same workspace.

Here is a screenshot showing a list of conversations with potential issues using the sample car dashboard workspace.

![image](/assets/img/2017/08/all.png)

At this point four filters are provided.

**1. Out of Scope**

*Sample Conversation*  
Watson: Hi. It looks like a nice drive today. What would you like me to do?  
User: Who is Niklas?  
Watson: I’m not sure about that. You can say things like “Turn on my lights” or “Play some music.”

In order for this filter to work the dialog needs to be changed by adding ‘”output.outOfScope” : “ input.text ?&gt;“‘ to the nodes when the user input is out of scope. These are typically the nodes with the ‘anything\_else’ condition.

**2. Unfulfilled Intents**

*Sample Conversation*  
Watson: Hi. It looks like a nice drive today. What would you like me to do?  
User: turn on music  
Watson: Sure thing! Which genre would you prefer? Jazz is my personal favorite.  
User: Neue Deutsche Welle  
Watson: Sorry I don’t recognize that genre. Want to try something? Jazz? Rock?

This filter also requires changes to the dialog definition. Developers can mark intents as being fulfilled when certain nodes in the dialogs are reached. This way intents that have been triggered but not fulfilled can be detected. For this feature to work you need to add information to the JSON of your dialog nodes:  
– Add ‘”output.intentTriggered” : “your-intent-name”‘ to the node when the intent is triggered  
– Add ‘”output.intentFulfilled” : “your-intent-name”‘ to the node when the intent is fulfilled

**3. Unconfident Intents**

*Sample Conversation*  
Watson: Hi. It looks like a nice drive today. What would you like me to do?  
User: make it warmer  
Watson: I understand you want me to turn up something. You can say increase the volume or turn up the AC.

This filter shows all conversations with intents that have less than 50% confidence.

**4. Dialog Errors**

This filter shows conversations with [log messages](https://watson-developer-cloud.github.io/dotnet-standard-sdk/docs/development/html/d6/d02/class_i_b_m_1_1_watson_developer_cloud_1_1_conversation_1_1v1_1_1_model_1_1_runtime_output.html#affcff74917f9be477c0dbc09ba38ea2e) which indicate errors in the dialog definition.

We’d be happy to get your feedback !