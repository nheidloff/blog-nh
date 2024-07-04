---
id: 1422
title: 'Invoking the Insights for Twitter Service in Bluemix from Swift'
date: '2015-09-09T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/invoking-the-insights-for-twitter-service-in-bluemix-from-swift/'
permalink: /article/09.09.2015093410NHEAVX.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/09.09.2015093410NHEAVX.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4326096023'
categories:
    - Articles
---

 “[Hear the Buzz](https://github.com/IBM-Bluemix/hear-the-buzz)” is a sample iPhone app which finds tweets with positive or negative sentiments for certain topics via the [IBM Insights for Twitter](https://www.ng.bluemix.net/docs/services/Twitter/index.html) service in [IBM Bluemix](https://bluemix.net/). Below is a short description how this service is used from Swift.

As a starting point I used the [sample app](https://developer.ibm.com/bluemix/2015/09/01/sample-ibm-insights-for-twitter/) from my colleague Frederic Lavigne. The sample contains a simple Node.js application which provides a REST API that basically just forwards requests to the service and adds credentials so that clients can invoke the API without having to authenticate. I used this mechanism in this simple sample but you might want to change this for production apps.

Clients can now invoke REST APIs via [insights-search.mybluemix.net/api/1/messages/search?q=bluemix](http://insights-search.mybluemix.net/api/1/messages/search?q=bluemix) which returns JSON. The following [code](https://github.com/IBM-Bluemix/hear-the-buzz/blob/master/client/hear-the-buzz/JSONParser.swift) shows how I parse the JSON is Swift. There might be better ways to do this though. I haven’t done much Swift development honestly.

![image](/assets/img/2015/09/hear-the-buzz1.png)

The next screenshot shows the [code](https://github.com/IBM-Bluemix/hear-the-buzz/blob/master/client/hear-the-buzz/ViewModel.swift) how to invoke the REST API from Swift. In order to define the tweets I’m interested in I use the [query language](https://www.ng.bluemix.net/docs/services/Twitter/index.html#query_lang) of the Twitter service.

![image](/assets/img/2015/09/hear-the-buzz2.png)