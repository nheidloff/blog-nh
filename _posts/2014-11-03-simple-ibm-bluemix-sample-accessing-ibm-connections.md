---
id: 991
title: 'Simple IBM Bluemix Sample accessing IBM Connections'
date: '2014-11-03T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/simple-ibm-bluemix-sample-accessing-ibm-connections/'
permalink: /article/03.11.2014083912NHEAZ3.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
custom_permalink:
    - article/03.11.2014083912NHEAZ3.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4325060644'
categories:
    - Articles
---

 I’ve published a simple [sample application](https://github.com/IBM-Bluemix/connections) that shows how to access IBM Connections Social Cloud from IBM Bluemix. You can find some [screenshots](https://github.com/IBM-Bluemix/connections/tree/master/net.bluemix.samples.connections.webapp/screenshots) on GitHub.

 The sample uses [AngularJS](https://angularjs.org/) in the frontend which invokes a REST API returning JSON. The Java backend implementation uses a subset of the [Social Business Toolkit SDK](https://github.com/OpenNTF/SocialSDK) to handle the authentication and to easily invoke the Connections REST APIs via the SDK’s [endpoints](http://infolib.lotus.com/resources/social_business_toolkit/javadoc/com/ibm/sbt/services/endpoints/package-summary.html) and the [generic service](http://infolib.lotus.com/resources/social_business_toolkit/javadoc/com/ibm/sbt/services/client/package-summary.html).   
   
 The application uses basic authentication so that the same application can be run on a local Liberty server and on Bluemix without having to change anything. You can also use OAuth but would then have to change the callback. Additionally in order to run the sample without any additional setup you can use test users on the Connections development environment. You can also use your own Connections organization if you have already one or get your own [test environment](https://developer.ibm.com/social/cloud/#envs).

 You can easily install and run the sample yourselves by following the [instructions](https://github.com/IBM-Bluemix/connections). There is only one Eclipse project that can be imported into the Eclipse IDE. All dependencies are pulled in via Maven and CDN.

 The sample only invokes one [REST API](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpAPIViewer.xsp?lookupName=API+Reference#action=openDocument&res_title=IBM_Connections_People_API_ic50&content=apicontent) to read profile information of the current user.

![image](/assets/img/2014/11/simpleconnectionssample.png)