---
id: 1265
title: 'Embed Reports and visualize Data in your Bluemix Applications'
date: '2015-05-21T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/embed-reports-and-visualize-data-in-your-bluemix-applications/'
permalink: /article/21.05.2015142210NHEGHW.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323844601'
custom_permalink:
    - article/21.05.2015142210NHEGHW.htm/
categories:
    - Articles
---

**Update November 2016**: The Embeddable Reporting service has been deprecated and replaced with an IBM partner solution.

 Here is a quick introduction to another powerful service in [IBM Bluemix](http://bluemix.net/) – [Embeddable Reporting](https://www.ng.bluemix.net/docs/services/EmbeddableReporting/index.html) (beta). With this service developers can easily build reports using a graphical tool (or API) to visualize data and embed the reports either as HTML or JSON in their web applications.

 There are two good tutorials describing the service – [Leverage IBM Cognos on IBM Bluemix using the Embeddable Reporting service](http://www.ibm.com/developerworks/library/ba-bluemix-cognosers/index.html) and [Embed rich reports in your applications](http://www.ibm.com/developerworks/cloud/library/cl-embed-reports-app/index.html?ca=drs-). I’ve tried the sample that is documented in the [Bluemix](https://www.ng.bluemix.net/docs/services/EmbeddableReporting/index.html#ers_sample_intro) documentation. Below is a quick summary of the key concepts.

 To get started you need two database services in your Bluemix app. The report artifacts are stored in either Cloudant or Mongo. The data that you want to visualize needs to reside in a Bluemix DB2 database or dashDB. In order to create reports you can use either a graphical tool (Embeddable Reporting console) or [APIs](https://erservice-impl.ng.bluemix.net/ers/swagger-ui/).

 The data is read from databases via SQL.

![image](/assets/img/2015/05/embedr1.png)

 Via the graphical tool you can tweak the data, e.g. filter data, join data or add additional data items to summarize data. These changes do not require schema changes to the underlaying databases but can be done on top of this in the service.

![image](/assets/img/2015/05/embedr2.png)

 The reports are defined graphically in an HTML-like editor. The editor provides components like tables and repeat controls to define the layout as well as several charting types out of the box. Additionally you can download and import further visualization components from IBM’s [AnalyticsZone](https://www.ibm.com/web/myportal/analytics/analyticszone/downloads/filter/?cV=/AnalyticsZone_Content/AZCatalog/Visualization/). The data can easily be bound to the visual components via drag and drop or property boxes.

![image](/assets/img/2015/05/embedr3.png)

 This is the resulting HTML page with data and images from the generated report.

![image](/assets/img/2015/05/embedr0.png)

 Web applications can embed the reports by either reading the data as JSON or by reading an HTML representation of the report that can be injected into the DOM (without iframes). The HTML contains data and formatting as text and the graphical elements as images. The reports are read by the web applications via AJAX REST calls. In order to read Bluemix credentials that are necessary to access the reports [server side proxies](https://hub.jazz.net/project/ers/ERSJavaStepSample/overview#https://hub.jazz.net/git/ers%252FERSJavaStepSample/contents/master/src/main/java/com/ibm/ba/ers/sample/SampleServlet.java) can be used.

![image](/assets/img/2015/05/embedr4.png)