---
id: 1259
title: 'Static Security Analyzer Service for Java Applications in Bluemix'
date: '2015-05-18T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/static-security-analyzer-service-for-java-applications-in-bluemix/'
permalink: /article/18.05.2015102020NHEBSR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/18.05.2015102020NHEBSR.htm/
dsq_thread_id:
    - '4438989582'
categories:
    - Articles
---

 I just tried quickly a beta service in [IBM Bluemix](http://bluemix.net/) that was [announced](https://www.ibm.com/developerworks/community/forums/html/topic?id=76763a88-5c95-465d-b439-f0ab8a5b7fd6) earlier this year. The [Static Analyzer](https://www.ng.bluemix.net/docs/services/StaticAnalyzer/index.html) service helps finding potential vulnerabilities in your Java code like cross site scripting issues and missing encodings and displays the results in a report with descriptions and mitigation strategies.

 There are different ways to run the tool. I chose the Eclipse plugin.

![image](/assets/img/2015/05/sascan3.png)

 The reports can be accessed via a dashboard.

![image](/assets/img/2015/05/sascan1.png)

 Here is a sample of a reported issue.

![image](/assets/img/2015/05/sascan2.png)

 For a quick demo check out this video.

{% include embed/youtube.html id='ZKP86MkDmSg' %}