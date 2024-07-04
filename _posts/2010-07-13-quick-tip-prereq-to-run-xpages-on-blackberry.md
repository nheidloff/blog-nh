---
id: 232
title: 'Quick Tip: Prereq to run XPages on Blackberry'
date: '2010-07-13T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/quick-tip-prereq-to-run-xpages-on-blackberry/'
permalink: /article/quick-tip-prereq-to-run-xpages-on-blackberry/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/quick-tip-prereq-to-run-xpages-on-blackberry/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316532473'
categories:
    - Articles
---

 Before I post this code plus more on OpenNTF, here is a quick tip what you need to do to run XPages apps and Blackberry. If you don’t follow the setup below you’ll always get a zoom in when you tip anywhere. You need to disable zoom so that you can actually click links etc.

 Blackberry supports also the viewport meta tag – see [here](http://www.blackberry.com/knowledgecenterpublic/livelink.exe/fetch/2000/348583/800878/800733/How_To_-_Control_the_BlackBerry_Browser_zoom_level.html?nodeid=1444381&vernum=0).

 However there are some things you need to know:

 1. Spaces are not allowed

![image](/assets/img/2010/07/1_0994725C0960E5D4003A29ED8525775F.gif)

 2. The meta tag has to be under the header tag. This can be done now in Lotus Domino 8.5.2 code drop 4.

![image](/assets/img/2010/07/1_0960F5900960E5D4003A29ED8525775F.gif)

 More to come soon on [http://mobilecontrols.openntf.org](http://mobilecontrols.openntf.org/).