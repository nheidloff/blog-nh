---
id: 265
title: 'Display Activity Streams from the Social Business Toolkit in XPages'
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/display-activity-streams-from-the-social-business-toolkit-in-xpages/'
permalink: /article/03152011031127AMNHEAFR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/03152011031127AMNHEAFR.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316554380'
categories:
    - Articles
---

 The [IBM Social Business Toolkit](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpViewCategories.xsp?lookupName=IBM%20Social%20Business%20Toolkit) is a new cross-product integration with the Lotus Social Business portfolio and extensibility toolkit for developers. The initial version provides an activity stream which is a federated list of items from various sources.

 There is an [REST API test application](https://greenhouse.lotus.com/vulcan/shindig/client/testAPI.jsp) available on Greenhouse that can be used to see which data is returned and it can be used to create new items in the activity stream. There is also a sample user interface available for the activity stream demonstrating the [embedded experience](https://greenhouse.lotus.com/activitystream/). Furthermore there is a [Connections instance](https://greenhouse.lotus.com/labs/homepage) on Greenhouse that puts updates, e.g. status updates, new forum creations, etc. into the activity stream.

 The activity stream can be accessed via [REST APIs](http://www-10.lotus.com/ldd/appdevwiki.nsf/dx/API_Reference_sbt). Before you can invoke REST APIs you need to be authenticated via OAuth what I [blogged about](http://heidloff.net/nh/home.nsf/dx/03092011045352AMNHEDM8.htm) last week.

 For the REST calls XPages provides built-in utilities (though not documented I think). I [published on OpenNTF](http://www.openntf.org/p/JSON%20and%20REST%20Samples) a sample showing how to write custom REST services generating JSON. The same package “com.ibm.commons.util.io.json.\*” contains classes like JsonJavaObject, JsonJavaFactory and JsonParser to parse JSON in Java which I needed for this sample.

 This [video](http://www.openntf.org/Projects/pmt.nsf/2005E2D15D44DE4F86257853003B27F0/%24file/ReadRiver.swf) demonstrates the whole flow. There are also bigger [screenshots](http://www.openntf.org/internal/home.nsf/screenshot.xsp?documentId=2005E2D15D44DE4F86257853003B27F0&action=openDocument).

 Here is a screenshot of the API test page displaying the stream as JSON:

![image](/assets/img/2011/06/APITest3Small.gif)

 This screenshot shows the same data in the sample user interface on Greenhouse:

![image](/assets/img/2011/06/ActivityStreamHomeSmall.gif)

 And the last screenshot shows the activity stream displayed in an XPage:

![image](/assets/img/2011/06/XPageDisplayingStreamSmall.gif)

 That same functionality can also be used to put items in the activity stream from XPages.

 If you want to try this yourselves you might run into an issue that I’ve seen from time to time with OAuth where the Greenhouse doesn’t respond correctly to requests. In this case you need to revoke access for your user on the [same page](https://greenhouse.lotus.com/vulcan/security/provider/accessControl?serviceProvider=vulcanToolkit) where you registered your app.

 I hope to be able to publish this sample on [OpenNTF](http://www.openntf.org/p/JSON%20and%20REST%20Samples) soon.