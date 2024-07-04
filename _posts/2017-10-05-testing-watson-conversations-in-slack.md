---
id: 2572
title: 'Testing Watson Conversations in Slack'
date: '2017-10-05T07:03:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2572'
permalink: /article/testing-watson-conversation-slack/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/testing-watson-conversation-slack/
dsq_thread_id:
    - '6192358022'
categories:
    - Articles
---

Next week Ansgar Schmidt and I will give a session ‘[How to write your own Slack Chatbots in Javascript](https://berlin2017.codemotionworld.com/talk-detail/?detail=6962)‘ at codemotion. We will demonstrate how to connect Slack to Watson [Conversation](https://www.ibm.com/watson/developercloud/conversation.html) via the open source project [botkit](https://github.com/howdyai/botkit) which leverages the Slack [Real Time Messaging API](https://api.slack.com/rtm).

This works well for production bots, but requires some configuration first. For testing purposes there is an easier way to create a Slack app with a bot user and to add this to a Slack team.

From the ‘Deploy’ page in the Watson Conversation tool you can choose to test your workspace(s) in Slack.

![image](/assets/img/2017/10/testing-slack3.png)

Next you can choose your Slack team and authorize the connection via OAuth. This creates a Slack app and bot user.

![image](/assets/img/2017/10/testing-slack2.png)

To interact with Watson you can invite the bot user.

![image](/assets/img/2017/10/testing-slack1.png)

Note that there are currently some [limitations](https://console.bluemix.net/docs/services/conversation/test-deploy.html#testing-in-slack) and at this point this functionality is only for testing purposes.