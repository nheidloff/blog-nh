---
id: 1052
title: 'Embed IBM Bluemix News on your own Websites'
date: '2015-01-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/embed-ibm-bluemix-news-on-your-own-websites/'
permalink: /article/13.01.2015085141NHEB8U.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/13.01.2015085141NHEB8U.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4365373856'
categories:
    - Articles
---

 You can follow IBM Bluemix News in various ways. In addition to visiting the website [Bluemix.info](http://www.bluemix.info/) you can leverage the [API](https://www.bluemix.info/swagger/index.html) to display the same news also on your own websites.

![image](/assets/img/2015/01/api.png)

 In order to work cross domain, the API supports JSONP. Check out the source of the [sample page](http://www.bluemix.info/crossdomain.html) which invokes the API via jQuery.

 Furthermore you can subscribe to the Bluemix.info [feed](http://www.bluemix.info/feed).

 There is also functionality to automatically tweet curated news ([source code](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/TwitterUtilities.java)). We have currently disabled this part but would like to use the @IBMBluemix account at some point.