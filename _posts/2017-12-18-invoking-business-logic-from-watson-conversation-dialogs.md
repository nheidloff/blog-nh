---
id: 2737
title: 'Invoking Business Logic from Watson Conversation Dialogs'
date: '2017-12-18T14:46:33+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2737'
permalink: /article/watson-conversation-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6356593917'
custom_permalink:
    - article/watson-conversation-openwhisk/
categories:
    - Articles
---

With the IBM [Watson Conversation](https://www.ibm.com/watson/services/conversation/) service you can easily recognize intents and entities in user phrases and you can define flows of dialogs declaratively. Recently a new [feature](https://console.bluemix.net/docs/services/conversation/dialog-actions.html#dialog-actions) was added (as beta) that allows Watson Conversation developers to run code at certain stages in the dialogs via the serverless platform [OpenWhisk](https://www.ibm.com/cloud/functions).

In conversational experiences a typical dialog flow looks like this:  
1\. A user wants to invoke a certain intent by providing an input phrase, for example ‘how is the weather?’  
2\. The bot gathers missing required input from the user, for example ‘in which city?’  
3\. After all slots have been filled, some business logic is executed, for example a REST API request to a weather service  
4\. The response of the API request is wrapped into a message that is sent to the user

In order to implement this scenario, so far developers had to write and host their own applications that use the [Watson Conversation API](https://www.ibm.com/watson/developercloud/conversation/api/v1/#send_message). Check out the Slack bot for an [example](https://github.com/nheidloff/slack-watson-bot/blob/master/handleWatsonResponse.js#L83).

With the new Conversation functionality OpenWhisk functions can be directly invoked by the Conversation service when certain nodes in the dialogs are reached. Let’s take a look at a simple sample.

The OpenWhisk function is a simple hello world function which only echos one of the input parameters. The function is deployed in the IBM Cloud organization of the Watson Conversation developer.

```
function main(params) {
   return { message: 'Hello World ' + params.name };
}
```

To allow Watson Conversation to invoke the function, the OpenWhisk credentials of the Watson Conversation developer are needed in the dialog. For testing purposes they can be pasted in context variables in the dialogs. The namespace ‘private’ prevents the credentials to be stored in the logs.

![image](/assets/img/2017/12/conversation-openwhisk1.png)

In order to trigger the OpenWhisk functions, a special property ‘actions’ is used which contains all necessary information for the function invocation. In the following example a static value ‘Niklas’ as well as the user’s input phrase is passed to the function. The response is written to the context variable ‘my\_input\_returned’ which can be accessed in the message that is sent to the user.

![image](/assets/img/2017/12/conversation-openwhisk2.png)

In order to find out more, watch the video and check out the [documentation](https://console.bluemix.net/docs/services/conversation/dialog-actions.html#dialog-actions). If you want to try out Watson Conversation, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff) and try the service.