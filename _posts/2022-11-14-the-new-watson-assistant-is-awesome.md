---
id: 5297
title: 'The new Watson Assistant is awesome'
date: '2022-11-14T08:42:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5297'
permalink: /article/the-new-watson-assistant-is-awesome/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/the-new-watson-assistant-is-awesome/
categories:
    - Articles
---

*IBM Watson Assistant is a SaaS offering from IBM to build conversational user experiences. The first version was already good, but the new(ish) version is just awesome!*

Over the last years Watson Assistant has successfully been used by many IBM clients and partners. Based on the feedback from clients, the IBM development and design team has created a brand new experience. This second version was released at the end of 2021. I was only able to try it recently and was positively surprised how much the offering has evolved. Below are some of my highlights.

**1. Actions**

The new Watson Assistant uses a more natural way to define conversations. The old ‘dialog’ experience was replaced with a more intuitive concept which is more goal oriented. For example Assistant users don’t use intents anymore, but actions. Intents still exist internally, but users want to define actions so that end users can reach their goals.

Similarly Assistant users don’t have to define entities anymore. Again, they still exist internally, but as far as users are concerned they just define types (e.g. free text) in the actions experience and the entities are created automatically.

![image](/assets/img/2022/11/Screenshot-2022-11-11-at-08.57.43.png)

**2. Integration of Watson Discovery**

With the Assistant the most typical conversation flows are covered. However, for advanced topics Assistant can call out to other services like Watson Discovery. This is useful if you have FAQs or other data stored in other systems that you want to expose to end users.

The following screenshot shows how Assistant can return articles from my blog. It only takes five minutes to implement this.

![image](/assets/img/2022/11/Screenshot-2022-11-11-at-09.07.44.png)

**3. Much more**

There are so many more cool features and improvements.

- Via REST APIs services can be queried or perform business logic
- Integrations with phone
- Integrations with chat clients and SMS
- Custom integrations
- Embeddable web chat widget
- Hand over to agent
- Free text responses
- Integrated debugger in preview chat window
- Clarifying question to identify the right action
- Change conversation topics (switch between actions)
- Built in analytics
- User authentication and secure traffic
- Private endpoints
- Different plans for different needs including isolated deployments
- High availability mechanisms
- Multiple languages
- Templates with lots of predefined reusable actions
- Production and development environments
- APIs for most common languages
- …

**Getting started**

To get started, try it out yourselves. There is a [free lite plan](https://cloud.ibm.com/catalog/services/watson-assistant).

The first time you log in, a guided tour is offered. I’m usually not a fan of those, but it worked very well for me to learn a lot in a short amout of time. The tour is also documented in a [blog series](https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started).

The [documentation](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-about) is well structured, complete and easy to read.