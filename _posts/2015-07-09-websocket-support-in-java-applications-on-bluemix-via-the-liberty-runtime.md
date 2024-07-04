---
id: 1309
title: 'WebSocket Support in Java Applications on Bluemix via the Liberty Runtime'
date: '2015-07-09T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/websocket-support-in-java-applications-on-bluemix-via-the-liberty-runtime/'
permalink: /article/09.07.2015083534NHE9RB.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
custom_permalink:
    - article/09.07.2015083534NHE9RB.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324801373'
categories:
    - Articles
---

 Since [Liberty profile 8.5.5.4](https://developer.ibm.com/wasdev/blog/2014/12/17/websocket-sample-application/) you can use web sockets in your Java applications. This allows sending events from the server to web clients without having to poll the server.

 The [blog](https://developer.ibm.com/wasdev/blog/2014/12/17/websocket-sample-application/) describes this core functionality pretty well and comes with a short [video](https://www.youtube.com/watch?v=1UkSFRtDiV4) and a [sample application](https://github.com/WASdev/sample.planningpoker). If you have a recent liberty profile installed in your IDE you can get this sample to work within minutes.

 The Liberty buildpacks on [IBM Bluemix](https://bluemix.net/) support this functionality as well via the [websocket-1.1](https://www.ng.bluemix.net/docs/starters/liberty/index.html#libertyfeatures) feature. However the default liberty configuration does not include this feature which is why you have to do two more steps when deploying your code as standalone application. Via the command line interface invoke the following commands.   
 1) cf set-env planningpoker JBP\_CONFIG\_LIBERTY “app\_archive: {features: websocket-1.1, servlet-3.1}”   
 2) cf restage planningpoker

 The sample application comes with a HTML page using plain old [JavaScript](https://github.com/WASdev/sample.planningpoker/blob/master/src/main/webapp/index.html). Since I needed this functionality in an application that uses [AngularJS](https://angularjs.org/) I used an AngularJS plugin [angular-websocket](https://github.com/gdi2290/angular-websocket). You can run this Angular sample easily together with the PlanningPoker sample above by just doing two changes.   
 1) In the JavaScript code change the websocket URL to “‘ws://’ + window.document.location.host + ‘/PlanningPoker/PokerEndpoint'” and in onMessage remove the JSON.parse  
 2) In [PokerEndpoint.java](https://github.com/WASdev/sample.planningpoker/blob/master/src/main/java/wasdev/sample/websocket/planningPoker/PokerEndpoint.java) remove the checks in sendMessage that prereq the room names

 Then you can see messages from the PlanningPoker app also on the HTML page with the Angular code.

![image](/assets/img/2015/07/websockets.png)