---
id: 1832
title: 'Samples of the Watson Tradeoff Analytics Service'
date: '2016-02-02T08:15:59+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1832'
permalink: /article/samples-watson-tradeoff-analytics-service/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/samples-watson-tradeoff-analytics-service/
dsq_thread_id:
    - '4544140257'
categories:
    - Articles
---

The [Watson Tradeoff Analytics](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tradeoff-analytics.html) service on [Bluemix](https://bluemix.net) helps users to make decisions when balancing multiple conflicting goals. Below are a couple of samples which demonstrate the functionality of this service.

When buying technical devices I typically compare similar devices and then decide which one to buy. To find similar devices I often use filtering mechanisms that e-commerce sites provide. In some cases these sites also support comparing items by displaying tables. But static tables are not optimal to make decisions. For example often you cannot simply remove rows/criteria you’re not interested in, you cannot compare big amounts of items easily, you cannot apply filters and you don’t see easily the tradeoffs between the different criteria. The Tradeoff Analytics service addresses these challenges.

Here is a screenshot of the [online demo](http://tradeoff-analytics-v2-demo.mybluemix.net/#phones) to compare smartphones. You can enter the criteria you are interested in, phones can be filtered by values of certain criteria and the identified phones are displayed.

![image](/assets/img/2016/02/tradeoff1.png)

After you’ve selected the most promising phones you can compare them in a line chart or table.

![image](/assets/img/2016/02/tradeoff2.png)

The Tradeoff Analytics service is slightly different from most other Bluemix services. There is also a REST API but the main functionality happens in the user interface. That’s why the service provides a [visualization widget](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/visualization.shtml) that can be [used](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/client.shtml) in HTML/JavaScript based frontends. Recently a [new version](https://developer.ibm.com/watson/blog/2015/12/07/announcing-a-new-ui-widget-for-the-tradeoff-analytics-service/) of this widget was released.

The [documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/) of the service is very detailed and as for all Watson services Node.js and Java [samples](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/sample.shtml) are provided. For a quick introduction to the service check out the video “[Watson Tradeoff Analytics Service](https://www.youtube.com/watch?v=lWhRW5TNdGw)“.

In addition to the online demo there are also several other samples available:

- [Online Demo for Finance, Treatments, Housing, Phones](http://tradeoff-analytics-v2-demo.mybluemix.net/)
- [District Insurance](https://github.com/osipov/district-insurance-sample)
- [Investment Advisor](http://investment-advisor.mybluemix.net/)
- [NYC School Finder](http://nyc-school-finder.mybluemix.net/)
- [Nests](http://nests.mybluemix.net/)
- [SF Life](http://san-francisco-life.mybluemix.net/)
- [PlanAdvisor](http://challengepost.com/software/planadvisor)
- [Choose the best match](http://choose-the-best-match.eu-gb.mybluemix.net/)