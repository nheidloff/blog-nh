---
id: 514
title: 'Use the XPages Social Enabler to access StackOverflow and Redmine'
date: '2012-05-18T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/use-the-xpages-social-enabler-to-access-stackoverflow-and-redmine/'
permalink: /article/15.05.2012082332NHE9HR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/15.05.2012082332NHE9HR.htm/
dsq_thread_id:
    - '4318903224'
categories:
    - Articles
---

 I’ve just contributed two snippets that show how to access StackOverflow and Redmine. In both cases you need the com.ibm.xsp.extlibx.sbt plugin from the extension library, but you don’t need to deploy the web security store database.

 There is an API sbt.GenericService that you can use to access both Json or XML based REST services. Additionally there are convenience APIs sbt.XmlNavigator and sbt.JsonNavigator to easily parse the data.

 This snippet shows how to access issues from Redmine.

<iframe frameborder="0" height="554" scrolling="no" src="./1_files/widget.html" width="640"></iframe>

 Additionally the social enabler comes with the data sources restJsonData and restXmlData. The advantage of these data sources is that you get built in functionality like caching. For StackOverflow this was important since StackOverflow didn’t like the amount of requests issued from [XPages.info](http://xpages.info/so).

 The following snippet shows how to read the latest xpages tagged questions from StackOverflow. It also uses a busy indicator that is shown while reading the data.