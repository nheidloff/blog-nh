---
id: 2324
title: 'Integrating Tools into Bluemix DevOps Toolchains'
date: '2017-06-07T07:10:10+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2324'
permalink: /article/bluemix-devops-toolchain/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/bluemix-devops-toolchain/
dsq_thread_id:
    - '5940326068'
categories:
    - Articles
---

As part of the Bluemix [Continues Delivery](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/index.html#cd_getting_started) functionality [toolchains](https://www.ibm.com/devops/method/category/tools/) allow the integration of third party and open source tools. Below are two samples how to leverage [PagerDuty](https://www.pagerduty.com/) and [Slack](https://slack.com/) to get notifications about state changes in pipelines.

With PagerDuty you can receive text and voice messages on your smartphone and configure which teams members should be notified for certain event types.

![pagerduty-slack2](/assets/img/2017/05/pagerduty-slack2.png)

Here is an example screenshot of my smartphone. You can take action via phone without having to log in to the web dashboard.

![pagerduty-slack3](/assets/img/2017/05/pagerduty-slack3-275x300.png)

In order to get notifications about state changes in the pipeline in Slack, a DevOps bot writes messages into a channel in your team.

![pagerduty-slack1](/assets/img/2017/05/pagerduty-slack1-957x1024.png)

In order to try this functionality and to use toolchains navigate to [bluemix.net/devops](https://bluemix.net/devops), click on the “Create a Toolchain” button and pick one of the available templates/samples.