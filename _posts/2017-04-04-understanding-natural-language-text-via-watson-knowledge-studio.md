---
id: 2211
title: 'Understanding Natural Language Text via IBM Watson'
date: '2017-04-04T14:10:22+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2211'
permalink: /article/understanding-natural-language-text/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/understanding-natural-language-text/
categories:
    - Articles
---

One of the newer IBM Watson offerings that I really like is [Watson Knowledge Studio](https://www.ibm.com/watson/developercloud/doc/wks/wks_overview_full.shtml). It basically allows identifying information in unstructured data. Below is a quick overview of the Knowledge Studio functionality.

Watson Knowledge Studio is not a Bluemix service but an [SaaS offering](https://www.ibm.com/us-en/marketplace/supervised-machine-learning) to create models for custom corpora of data that can actually be deployed and used in other Watson services (more about this in another blog). These models are either [machine-learning models](https://www.ibm.com/watson/developercloud/doc/wks/wks_machineannotate.shtml) which work more generically or [rule-based models](https://www.ibm.com/watson/developercloud/doc/wks/wks_rule_annotator_ovw.shtml) which work well for smaller datasets.

To train a machine-learning based model you need to create an annotator. Essentially you define entities, roles, dictionaries etc. and then mark the words in the training dataset accordingly. Here is a screenshot how to define entities. The scenario uses data from car incidents reports which have entities like vehicle and model.

![wks1](/assets/img/2017/04/wks1.png)

Additionally you can define relations between entities. In this scenario a person is an occupant of a vehicle.

![image](/assets/img/2017/04/wks2.png)

You can even define coreferences, for example that ‘he’ and ‘driver’ refer to the same person.

![image](/assets/img/2017/04/wks3.png)

In order to create rule-based models, rules need to be defined (surprise, surprise). This can be done graphically as shown in the screenshot or via regular expressions. In this sample a simple date rule is defined.

![image](/assets/img/2017/04/wks4.png)

To find out check out these resources. Knowledge Studio was introduced on the [Watson blog](https://www.ibm.com/blogs/watson/2016/06/alchemy-knowledge-studio/). There are also YouTube playlists [Getting Started](https://www.youtube.com/watch?v=XBwpU97D5aE&list=PLZDyxLlNKRY8L2q26h_BT1ZBTW0Z6ic94) and [Deep Dive](https://www.youtube.com/watch?v=vWHPlOZKP_k&list=PLZDyxLlNKRY81tNt2aupO3hohWI9WCuCM). Here is the [documentation](https://www.ibm.com/watson/developercloud/doc/wks/wks_overview_full.shtml).