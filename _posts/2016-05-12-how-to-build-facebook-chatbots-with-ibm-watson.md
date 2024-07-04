---
id: 2098
title: 'How to build Facebook Chatbots with IBM Watson'
date: '2016-05-12T08:23:48+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2098'
permalink: /article/facebook-bot-chatbot-ibm-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/facebook-bot-chatbot-ibm-watson/
categories:
    - Articles
---

**Update November 2016**: The dialog service has been deprecated and replaced with the [Conversation](https://console.ng.bluemix.net/catalog/services/conversation/) service.

I’ve open sourced a simple sample of a chatbot for Facebook that leverages IBM [Watson Dialog](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html) and IBM [Watson Natural Language Classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html) for conversations with users.

[Get the code from GitHub.](https://github.com/nheidloff/facebook-watson-bot)

The GitHub project contains a sample of a Facebook bot built on the [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/quickstart) which is currently available as beta. The sample bot is pretty simple but might people give some ideas how to use cognitive Watson services and how to host the bot on [Bluemix](https://bluemix.net).

The sample bot shows recent tweets with a positive or negative sentiment about a specific topic via the [Insights for Twitter](https://console.ng.bluemix.net/catalog/services/insights-for-twitter) service. Check out the [screenshots](https://github.com/nheidloff/facebook-watson-bot/tree/master/screenshots) folder for more information.

The left screenshot shows the usage of the Dialog service. The right column shows additionally the Natural Language Classifier. In this example users can type in ‘awesome’ which is a word that is not hardcoded anywhere.

![image](/assets/img/2016/05/facebookbot5.png)

I’ve implemented the bot via Node.js. In order to invoke the action that reads the tweets I’ve extended the [dialog](https://github.com/nheidloff/facebook-watson-bot/blob/master/dialog.xml#L24) definition with the JavaScript code which is supposed to be invoked.

```
<item>Alright. Here are the {Sentiment} tweets about {Topic}:$ExecCode$showTweets(sender, "{Topic}", "{Sentiment}")</item>
```

In order to use buttons in the chat I’ve extended the [dialog](https://github.com/nheidloff/facebook-watson-bot/blob/master/dialog.xml#L36) definition with the button data.

Rather than clicking on buttons users can also type in text like ‘awesome’. Rather than hardcoding all alternatives the Watson classifier is used to determine whether users are interested in positive or negative tweet. The id of the classifier is defined as part of the dialog definition.

```
<item>Are you interested in positive or negative tweets?$ShowButtons$[{"type":"postback","title":"Positive","payload":"positive"},{"type":"postback","title":"Negative","payload":"negative"}]#3a84cfx63-nlc-5285</item>
```