---
id: 5569
title: 'Querying Knowledge Bases from Watson Assistant Bots'
date: '2022-12-15T00:46:32+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5569'
permalink: /article/fallbacks-for-watson-assistant-bots/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/fallbacks-for-watson-assistant-bots/
categories:
    - Articles
---

*IBM’s Watson Assistant is a great technology to build conversational user experiences. Watson Discovery is IBM’s offering to search and analyze semi-structured data. This post describes how to combine the two offerings so that Watson Discovery can be used as fallback for unusual conversation flows.*

When designing conversational experiences, the most typical questions and actions need to be planned for. If users want to know more information, Watson Discovery can be used to search in repositories for answers.

Let’s look at a sample scenario. A bot is supposed to answer questions about ‘Embeddable AI’. The most typical questions are directly handled by defining conversation flows in Watson Assistant.

![image](/assets/img/2022/12/wd-02-06.png)

To find out more details, the bot could search in repositories like my blog.

![image](/assets/img/2022/12/wd-02-08.png)

Building these types of conversation flows with Watson Assistant and Watson Discovery can be done without programming. For example the Discovery web crawler can be used to read data from web sites which can be integrated declaratively in Watson Assistant.

![image](/assets/img/2022/12/wd-02-04.png)

To learn more about this topic, check out the [Watson Discovery documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-tutorial-crawl-short).