---
id: 1020
title: 'Usage of the Cloudant NoSQL Service in Bluemix Info'
date: '2014-12-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/usage-of-the-cloudant-nosql-service-in-bluemix-info/'
permalink: /article/08.12.2014084759NHEB6K.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/08.12.2014084759NHEB6K.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4327307288'
categories:
    - Articles
---

 [Bluemix.info](http://www.bluemix.info/) uses [Cloudant NoSQL Database for Bluemix](https://www.ng.bluemix.net/docs/#services/Cloudant/index.html#Cloudant) as datastore. There is a lot of great information out there about Cloudant in general, e.g. the [IBM Cloudant](https://cloudant.com/for-developers/) web site and about Cloudant on Bluemix, e.g. on [developerWorks](https://developer.ibm.com/bluemix/2014/07/08/cloudant_on_bluemix/). Below is a high level overview how we use Cloudant in Bluemix.info.

 We use the Java API [Ektorp](http://ektorp.org/) to access Cloudant from our Java application. Ektorp is available as open source under the Apache license and it’s part of the Liberty profile buildpack on Bluemix. The Bluemix.info application pulls down the library via [Maven](https://github.com/IBM-Bluemix/news-aggregator/blob/master/pom.xml).

 There are different ways how to access Cloudant databases and how to handle the configuration. The [documentation](https://www.ng.bluemix.net/docs/#services/Cloudant/index.html#cloudant_004) on Bluemix.net describes how to bind databases to Liberty applications. We’ve used a slightly [different approach](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/DatabaseUtilities.java). When running on Bluemix the configuration is read from the environment variable ‘VCAP\_SERVICES’. In order to run and debug code locally we use local environment variables, primarily to be consistent how we run other Bluemix services locally.

 In order to allow other developers to set up Bluemix.info themselves as easily as possible, we check whether the database already exists and if not we create it. Furthermore we create the [design](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/DatabaseDesign.java) of the database programmatically. After this the design shows up in the Bluemix dashboard.

![image](/assets/img/2014/12/cloudantbi.png)

 Reading from and writing to Cloudant is pretty straight forward via the APIs ‘db.update(feed)’, ‘db.create(newFeed.getId(), newFeed)’, ‘db.get(Feed.class, feedId)’, etc. Check out for example how we make [feeds](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/feeds/FeedStorage.java) persistent. The [feed class](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/feeds/Feed.java) extends CouchDbDocument which is a convenience class that handles things like ids and revision ids.

 Overall the experience to use Cloudant has been very positive for me personally and a lot of fun. It’s very easy to get started and fast to be productive.