---
id: 1025
title: 'Usage of the Data Cache Service in Bluemix.info'
date: '2014-12-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/usage-of-the-data-cache-service-in-bluemix-info/'
permalink: /article/17.12.2014084759NHEB6K.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/17.12.2014084759NHEB6K.htm/
categories:
    - Articles
---

 In order to scale [Bluemix.info](http://bluemix.info/) we run multiple instances of the application. In this model applications cannot cache data only in an instance/Java runtime since you cannot assume that the data in the runtimes is always in synch. For example when adding a news entry via one application instance the in memory cache of the second instance would be stale.

One solution to address this is to store all data in a database and always query that database for the latest data. This works but is not the most efficient option. In the case of Bluemix.info, the news aggregator for Bluemix developers, caching makes a lot of sense, since new entries are only created from time to time and in most cases only the same data is returned to different clients.

So we leverage the [IBM Data Cache for Bluemix](https://www.ng.bluemix.net/docs/#services/DataCache/index.html#data_cache).

“IBM Data Cache for Bluemix is a caching service supports distributed caching scenarios for web and mobile applications. The caching service uses the technology of a data grid in which you can store key-value objects. Data Cache offers a business-ready, in-memory data grid (IMDG) that places the data close to the logic and keeps it there as the business scales up. It is simple to use and extends performance and scalability of existing applications.”

Check out how we use this service in [API.java](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/API.java). Essentially we always read data from the in memory cache, except the first time when the cache needs to be initialized with the data from Cloudant. Everytime a news entry or author is added, updated or deleted the cache is updated again.

In our application we use a Java library to access the data cache service. In order to compile the code locally you need to add com.ibm.ws.xs.client\_1.1.jar to your build path. This file comes with [WebSphere eXtreme Scale for Developers Liberty Profile](https://developer.ibm.com/wasdev/downloads/#asset/addons-wxs) that you need to download. After running the installer “java -jar wxs-wlp\_8.6.0.5.jar” you can get the library file. You can find out more about this in this [article](http://www.ibm.com/developerworks/cloud/library/cl-datacache-app/).

You don’t have to push com.ibm.ws.xs.client\_1.1.jar to Bluemix since it’s already part of the liberty buildpack. Note that even though you can compile the code locally, you can NOT access the data cache service when running the application in your local Eclipse/liberty.

To make the setup easier you might also want to consider the usage of the [REST API](http://www.ng.bluemix.net/docs/api/content/api/datacache/rest/datapi001.html) which seems to be new (at least I haven’t seen it before today).