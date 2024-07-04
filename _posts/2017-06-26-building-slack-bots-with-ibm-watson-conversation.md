---
id: 2401
title: 'Building Slack Bots with IBM Watson Conversation'
date: '2017-06-26T08:42:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2401'
permalink: /article/slack-ibm-watson-conversation-botkit/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/slack-ibm-watson-conversation-botkit/
categories:
    - Articles
---

I’ve [open sourced](https://github.com/nheidloff/slack-watson-bot) a simple sample that shows how to leverage IBM [Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html) in Slack bots via the open source project [Botkit](https://github.com/howdyai/botkit). With Botkit and a [Watson middleware](https://github.com/watson-developer-cloud/botkit-middleware) text messages defined in Conversation dialogs can easily be used in Slack bots. My sample shows additionally how to use Slack buttons in messages and how to invoke business logic at certain stages of the conversation.

Botkit is an open source framework to build bots that can be connected to popular messaging platforms like Slack and Facebook Messenger. IBM provides a middleware to easily leverage the conversation flows defined in Watson Conversation dialogs. The following code shows how to pass user input to Watson and how to return text messages to Slack.

```
var watsonMiddleware = require('botkit-middleware-watson')({
  username: YOUR_CONVERSATION_USERNAME,
  password: YOUR_CONVERSATION_PASSWORD,
  workspace_id: YOUR_WORKSPACE_ID,
  version_date: '2016-09-20',
  minimum_confidence: 0.50
});

slackController.middleware.receive.use(watsonMiddleware.receive);
slackBot.startRTM();

slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    bot.reply(message, message.watsonData.output.text.join('\n'));
});
```

In order to provide the best possible user experience my sample shows how to use Slack buttons in messages so that users can, for example, easily pick one of the available options. Additionally the sample demonstrates how to invoke a REST API provided by [Weather Company Data](https://console.bluemix.net/catalog/services/weather-company-data). Here is a simple sample conversation.

![slack](/assets/img/2017/06/slack.png)

Slack provides a [Message Builder](https://api.slack.com/docs/messages/builder) to define sophisticated JSON messages that include elements like buttons. Watson Conversation is a general purpose tool and doesn’t support messaging client specific functionality. In order to include the Slack message I’ve put the JSON into a context attribute in a dialog node.

![workspace1](/assets/img/2017/06/workspace1.png)

This is the complete JSON:

```
{
  "output": {
    "text": {
      "values": [
        "In which city? Berlin, Munich or Hamburg?"
      ]
    },
    "context": {
      "slack": {
        "attachments": [
          {
            "title": "Which location?",
            "actions": [
              {
                "name": "Berlin",
                "text": "Berlin",
                "type": "button",
                "value": "Berlin"
              },
              {
                "name": "Munich",
                "text": "Munich",
                "type": "button",
                "value": "Munich"
              },
              {
                "name": "Hamburg",
                "text": "Hamburg",
                "type": "button",
                "value": "Hamburg"
              }
            ],
            "callback_id": "123",
            "attachment_type": "default"
          }
        ]
      }
    }
  }
}
```

When the [‘slack’](https://github.com/nheidloff/slack-watson-bot/blob/master/watson-slack.js#L114-L116) attribute is part of the message, the content of this attribute is sent as message to Slack rather than the text message defined in the Conversation dialog.

Similarly I’m using another attribute [‘action’](https://github.com/nheidloff/slack-watson-bot/blob/master/watson-slack.js#L67-L92) to mark a node in the dialog as the stage where business logic is triggered, in this case a REST API to the weather service is invoked. Note that you can put the chosen location entity into the JSON.

```
{
  "output": {
    "text": {
      "values": [
        "looking up weather information for @location ..."
      ]
    },
    "context": {
      "action": {
        "name": "lookupWeather",
        "location": "@location"
      }
    },
    "selection_policy": "sequential"
  }
}
```

This is the JavaScript code for the action.

```
function lookupWeather(watsonDataOutput, bot, message) {
    let coordinates;
    let location = watsonDataOutput.context.action.location;

    switch (location) {
        case 'Munich':
            coordinates = '48.13/11.58';
            break;
        case 'Hamburg':
            coordinates = '53.55/9.99';
            break;
        default:
            coordinates = '52.52/13.38'; // Berlin
    }

    let weatherUsername = process.env.WEATHER_USERNAME;
    let weatherPassword = process.env.WEATHER_PASSWORD;
    let weatherUrl = 'https://' + weatherUsername + ':' + weatherPassword + '@twcservice.mybluemix.net:443/api/weather/v1/geocode/' + coordinates + '/observations.json?units=m&language=en-US';

    request(weatherUrl, function (error, response, body) {
        var info = JSON.parse(body);
        let answer = "The current temperature in " + info.observation.obs_name
            + " is " + info.observation.temp + " °C"
        bot.reply(message, answer);
    })
}
```

Check out the [GitHub project](https://github.com/nheidloff/slack-watson-bot) for more details and the setup instructions.