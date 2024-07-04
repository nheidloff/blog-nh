---
id: 300
title: 'Quick Tip: Hidden XPages Configuration Options'
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/quick-tip-hidden-xpages-configuration-options/'
permalink: /article/06172011015521AMNHE8Y7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/06172011015521AMNHE8Y7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316579512'
categories:
    - Articles
---

 Last week I gave a workshop to experienced Domino web developers where we dived pretty deep and discussed many detailed XPages functionality. During that workshop I had to show them a couple of times how to change certain settings in the xsp.properties file which you can only see when you’re in the Java perspective or use views like the Package Explorer.

![image](/assets/img/2011/06/xspproperties1.gif)

 They asked whether there is something like a notes.ini database with all possible entries. There is something that comes close. It’s the xsp.properties file in the Domino data dir and then the subdirectory properties. The list in there is almost complete.

 The same properties that you can define in this file globally for the Domino server you can overwrite in your NSF’s xsp.properties file. The sample screenshot shows how to change the maximal file upload size.

![image](/assets/img/2011/06/xspproperties2.gif)