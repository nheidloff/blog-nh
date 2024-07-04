---
id: 2676
title: 'Building Facebook Messenger Bots with Botkit and Watson'
date: '2017-11-16T09:54:15+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2676'
permalink: /article/facebook-messenger-bots-botkit-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/facebook-messenger-bots-botkit-watson/
dsq_thread_id:
    - '6287509571'
categories:
    - Articles
---

I’ve implemented a sample [Facebook Messenger](https://developers.facebook.com/docs/messenger-platform) bot which leverages the Node.js library [Botkit](https://botkit.ai/) and IBM [Watson Conversation](https://www.ibm.com/watson/services/conversation/).

With Botkit you can build bots for Slack, Facebook Messenger, Twilio and other messaging clients. For natural language understanding different services can be used, for example IBM Watson, Api.ai, Wit.ai or Rasa.

Most of the code can be shared for Slack and Facebook Messenger bots. Check out the code on [GitHub](https://github.com/nheidloff/slack-watson-bot).

Similarly to my sample Slack bot, the Facebook Messenger bot uses not only text but more [sophisticated controls](https://developers.facebook.com/docs/messenger-platform/send-messages) like buttons to provide the best possible user experience. The definitions of these JSON messages are stored in the Watson Conversation dialog via [context variables](https://console.bluemix.net/docs/services/conversation/dialog-build.html#dialog-build).

![image](/assets/img/2017/11/facebook-bot-1024x693.png)

This screenshot shows the Facebook Messenger web application.

![image](/assets/img/2017/11/facebook-4.png)

This screenshot shows the Facebook Messenger mobile app.

![image](/assets/img/2017/11/facebook-5-576x1024.png)

To find out more check out the [sample code](https://github.com/nheidloff/slack-watson-bot) and read the Botkit [documentation](https://github.com/howdyai/botkit/blob/master/docs/readme-facebook.md#getting-started).