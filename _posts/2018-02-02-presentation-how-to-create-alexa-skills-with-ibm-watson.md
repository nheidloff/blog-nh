---
id: 2771
title: 'Presentation how to create Alexa Skills with IBM Watson'
date: '2018-02-02T09:41:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2771'
permalink: /article/presentation-alexa-skills-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6453847328'
custom_permalink:
    - article/presentation-alexa-skills-watson/
categories:
    - Articles
---

Last week there was a webinar [Create Alexa skills with Watson Conversation](https://www.youtube.com/watch?v=SJK-7srI1FU) where I was supposed to present. However since I couldn’t make it, my colleague [Mark Sturdevant](https://github.com/markstur) jumped in on a short notice and did a great job.

You can watch the [recording](https://www.youtube.com/watch?v=SJK-7srI1FU), read the [pattern](https://developer.ibm.com/code/patterns/create-an-alexa-skill-with-serverless-and-a-conversation/) documentation and read the [slides](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk).

{% include embed/youtube.html id='SJK-7srI1FU' %}

Here are some speaker notes for the slides and the demos.

[Slide 1](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/1)  
The pattern shows how to use Amazon Alexa to test conversations defined with the Watson Conversation service. Watson Conversation is a great service that developers can use to build bots, skills or personal assistants. You can use the service to define how to recognize intents and entities and you can use the service to define flows of conversations. The pattern also explains how to use the open source serverless platform OpenWhisk to implement business logic of skills and bots.

[Slide 2](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/2)  
Let’s get started with a short demo of a sample weather skill. Watch the [demo](https://www.youtube.com/watch?v=OqNgvqholjk) on YouTube.

[Slide 7](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/7)  
Let me explain how you can implement this yourselves. Here is an architecture diagram with the main components. On the left side is a user who talks to an Alexa device. Alexa invokes an OpenWhisk function which runs the business logic of the skill. The OpenWhisk function uses Redis to store session state and it uses REST APIs to access the Watson Conversation service. Additionally this particular weather skill uses the Weather Company API.

![image](/assets/img/2017/11/alexa-architecture-final.png)

[Slide 8](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/8)  
This is the Amazon developer console. You need to provide some mandatory information, for example the name of the skill as it will show up in the skill store. You also need to define the invocation name to activate the skills, e.g. via ‘Alexa, start Watson’.

[Slide 9](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/9)  
You need to define the interaction model. Usually this is the place where you define intents and entities that Alexa should recognize. This functionality it typically called natural language processing or natural language understanding. However Watson provides very similar functionality that we want to use instead. Since we want to use Alexa only as pass through component, I’ve defined here one generic ‘everything’ intent and one generic ‘bag of words’ entity. This is basically an easy way to get the unmodified user input as string and then it is forwarded to Watson.

[Slide 10](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/10)  
The last thing you need to do, is to define the link to the OpenWhisk function on the configuration page. Rather than using Lambda, I’ve picked https and defined the URL which points to my OpenWhisk function. Once you’ve completed the configuration, you can see the skill in the Alexa app and enable it. In order to share Alexa skills with other people in the Alexa skill store, you’d have to follow the Amazon publication process.

[Slide 15](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/15)  
Now let me move over to the Watson Conversation tool. With this tool you can define intents, entities and dialogs. Let’s start with the intents. I have here five intents, e.g. greetings and weather.

[Slide 16](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/16)  
When I open the weather intent, the possible user utterances are displayed, in this case 144. You can find here example input like “check the weather” and “do I need a jacket”. The nice thing is that these 144 utterances and not the only ones that Watson can understand. In other words, it’s not a hardcoded list of strings. Instead machine learning is used to find intents with the highest probability.

[Slide 17](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/17)  
Let’s now move over to the entities. There are two types of entities, system entities and custom entities. For example we have system entities like number and person that can be used without having to define these entities yourselves.

[Slide 18](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/18)  
For this simple sample skill I only use one entity “location” with these five possible values. For more advanced skills you could also define synonyms or regular expressions.

[Slide 19](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/19)  
The last thing we have to do in the Watson Conversation tool is to define the dialog, in other words the possible flows of conversations. The nice thing is that this can be done declaratively. You see here the different nodes which Watson evaluates top to bottom. Each node has a condition and if it’s met the node is executed. For example the node Greetings is executed when Watson recognize welcome or the greetings intent.

[Slide 20](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/20)  
The most important node for the sample skill is the weather node. This node is executed when the weather intent is recognized. The node supports what is called ‘slots filling functionality’. You can define here a list of mandatory input entities, like in this case the location. If it isn’t present yet, the user is asked, in this case “in which location” or ‘please tell me your location’. Only after all mandatory slots have been filled, the output message of this node is returned to the user, in this case ‘looking up weather information for location’.

[GitHub project](https://github.com/IBM/alexa-skill-watson-conversation)  
I’ve talked about the Alexa configuration and the Watson Conversation service. The last thing you need to do, is to connect the dots by implementing an OpenWhisk function. Let’s take a look at the code.

I won’t go through all the details but want to highlight the most important parts. First of all I’m using an npm module called [alexa-verifier](https://github.com/IBM/alexa-skill-watson-conversation/blob/master/main.js#L19). Part of Amazon’s certification process is that skills need to validate that requests are actually coming from Amazon. I’ve picked this module since at the time I wrote the code it was the easiest one.

The next thing to do is the run some [initialization code](https://github.com/IBM/alexa-skill-watson-conversation/blob/master/main.js#L57) to configure the Watson Conversation service and Redis. When you create a Watson Conversation service, you get user credentials which are needed here. Rather than hardcoding them, I’ve put them in environment variables. Redis is needed to store the session state, because OpenWhisk functions are stateless. I’ve deployed my own Redis on IBM’s Kubernetes implementation. You could also use managed Redis services like the one IBM provides called ‘Redis on Compose’.

At the bottom of [main.js](https://github.com/IBM/alexa-skill-watson-conversation/blob/master/main.js) you can see the [main functionality](https://github.com/IBM/alexa-skill-watson-conversation/blob/master/main.js#L256) of the skill. After the clients have been initialized, the session state information is read from Redis via getSessionContext. Then the Watson Conversation API is invoked in conversationMessage to get the response from Watson. The function actionHandler is invoked when the dialog has reached a node where business logic needs to be invoked, in our case the weather API is used to read weather information. After this the response of the action is returned to Alexa and the session state is stored again in Redis.

Let’s take a quick look at the implementation of [conversationMessage](https://github.com/IBM/alexa-skill-watson-conversation/blob/master/main.js#L95). In this function the Conversation API is used. The code is very simple. I’m using the npm module watson-developer-cloud which comes with a function “message” where you can pass in the text input and the session state/context. If the response is successful, the resolve callback in invoked.

[Slide 29](https://www.slideshare.net/niklasheidloff/create-alexa-skills-using-ibm-watson-conversation-and-apache-openwhisk/29)  
This slide lists useful resources to build your own Alexa skills with Watson Conversation.

If you want to try out Watson Conversation, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff) and try the service.