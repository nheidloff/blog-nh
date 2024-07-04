---
id: 1026
title: 'Bluemix.info reads Feeds every Hour via the Bluemix Workload Scheduler'
date: '2014-12-18T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/bluemix-info-reads-feeds-every-hour-via-the-bluemix-workload-scheduler/'
permalink: /article/18.12.2014081315NHEAGV.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/18.12.2014081315NHEAGV.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
categories:
    - Articles
---

 As you hopefully know by now [Bluemix.info](http://bluemix.info/) is a news aggregator for IBM Bluemix developers and professionals covering news about everything related to IBM’s platform as a service, including runtimes, services, events and much more. Curators decide which content is published on the site. To make it as easy as possible for curators, certain websites and blogs are checked on a scheduled basis whether there are new articles. If so, the information is put in a queue on Bluemix.info where curators can easily approve entries by just clicking an approve button.

 This scheduled task reads new articles from websites via feeds and the open source library [Rome](http://rometools.github.io/rome/). Check out [FeedManager.java](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/feeds/FeedManager.java) and [RSSReader.java](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/feeds/RSSReader.java) for details.

 This task is triggered via the [Workload Scheduler](https://www.ng.bluemix.net/docs/#services/WorkloadScheduler/index.html#gettingstarted) service (beta). The class [SchedulerUtilities.java](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/feeds/SchedulerUtilities.java) demonstrates how to use the scheduler service. It uses [Java client libraries](https://start.wa.ibmserviceengage.com/bluemix/ClientLibraries_java.zip) that you need to download and add to your project first. In SchedulerUtilities a task is created which is triggered every hour.

 When the task is triggered, a [REST API](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/RestAPIReadFeedsScheduler.java) from Bluemix.info is invoked. In order to make sure only the task can trigger this API basic authentication is used. When the task is created a username and password is generated, passed to the scheduler service and stored in Cloudant. Before the REST API runs the core functionality it checks this username and password.

 Since yesterday the workload scheduler service provides a nice dashboard that allows you to monitor your tasks.

![image](/assets/img/2014/12/wlsservice.png)