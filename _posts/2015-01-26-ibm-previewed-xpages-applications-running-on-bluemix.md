---
id: 1088
title: 'IBM previewed XPages Applications running on Bluemix'
date: '2015-01-26T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/ibm-previewed-xpages-applications-running-on-bluemix/'
permalink: /article/26.01.2015175730NHEMVZ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/26.01.2015175730NHEMVZ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323713714'
categories:
    - Articles
---

 At IBM ConnectED 2015 IBM announced and previewed a new capability which allows developers to run XPages applications on [IBM Bluemix](https://bluemix.net/).

[XPages](http://xpages.info/) is a web application development platform based on standards and common web development skills like Java, JSF and JavaScript. XPages applications run on IBM Domino which comes with a full stack of components to build applications rapidly, for example a NoSQL database, built-in security and full text search.

 At ConnectED a new XPages runtime, a new Domino data service and a new XPages boilerplate were introduced. In order to fit into the Bluemix architecture, to benefit from features like scalability and to leverage other services, XPages applications that are hosted on Bluemix are split into two parts – application code and data. While this separation has been adopted as a best practice by most XPages applications already, the Bluemix architecture now requires it.

 XPages Runtime

 A new XPages runtime is provided to run XPages application code on Bluemix.

![image](/assets/img/2015/01/xpagesruntime.png)

 Code can be developed and tested on local IBM Domino servers. After this the code, packaged in NSF files, can be pushed to Bluemix via the [cf command line tool](https://www.ng.bluemix.net/docs/#!cli/index.html#cli). Additionally a new plugin for IBM Domino Designer, the IDE for XPages applications, was presented that allows pushing XPages applications directly from the IDE to Bluemix, similarly to the IBM Eclipse Tools for Bluemix.

![image](/assets/img/2015/01/dominobluemixtool.png)

 Domino Data Service

 The Domino data service allows XPages applications running on Bluemix to store data in Domino NoSQL databases. Typically the databases contain besides the data also indexes/views.

![image](/assets/img/2015/01/dominodataservice.png)

 After the service has been created and provisioned, credentials are provided for XPages developers to access databases in the cloud from the IDE.

![image](/assets/img/2015/01/dominoservicedashboard.png)

 In order to access data in these databases from XPages applications so called JSF data sources can be used. For other runtimes REST APIs might be provided.

![image](/assets/img/2015/01/dominobluemixdata.png)

 XPages Boilerplate

 In order for developers to get started as easily as possible an XPages boilerplate is provided. The boilerplate comes with the XPages runtime, the Domino data service and a sample.

![image](/assets/img/2015/01/dominoboilerplate2.png)

 The sample is an easy to do application which shows CRUD operations, views and a responsive design.

![image](/assets/img/2015/01/xpagesbluemixsample.png)

 The Sky is the Limit

 With support of XPages applications running on Bluemix, IBM provides new options for developers to host XPages applications in the cloud. In addition to other options where Domino is hosted on Infrastructure as a Service offerings like Softlayer, developers can also easily leverage other services in Bluemix and mix those in their applications.

 For example XPages applications can leverage the cognitive Watson services in Bluemix, XPages applications can store data in other databases without having to set up infrastructure first, they can leverage the auto-scalability functionality and data caching of Bluemix and much more.

 To find out more about this topic, attend the session from Martin Donnelly “IBM Domino Applications in Bluemix” today (Mon, 26-Jan) at 02:15 PM – 03:15 PM in Dolphin – S. Hem 2. Also if you attend IBM ConnectED don’t forgot to thank the XPages development team who has done an incredible job in my opinion.

 As stated in the [opening general session](https://twitter.com/edbrill/status/559708780892409858) the expected availability is H2 2015.