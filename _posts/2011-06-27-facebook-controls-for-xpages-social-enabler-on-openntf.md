---
id: 299
title: 'Facebook Controls for XPages Social Enabler on OpenNTF'
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/facebook-controls-for-xpages-social-enabler-on-openntf/'
permalink: /article/05132011020328AMNHE959.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/05132011020328AMNHE959.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316578547'
categories:
    - Articles
---

 I’ve created some controls to easily embed Facebook functionality in XPages applications. All controls use the [Facebook JavaScript API](http://developers.facebook.com/docs/reference/javascript/) and Facebook’s HTML extension XFBML. Technically the tricky part was to add a namespace to the HTML tag but that complexity is hidden now in the SDK control.

 The controls include some of the key [Social Plugins](http://developers.facebook.com/docs/plugins/) that Facebook provides, e.g. the like button, send button and login button and the ability to use Facebook comments. Additionally you can you the [Graph API](http://developers.facebook.com/docs/reference/api/) to read from and write to Facebook.

 The first screenshot shows the new controls in the palette and some of them, e.g. like button, used in an XPage:

![image](/assets/img/2011/06/FacebookControls1.jpg)

 Here is the runtime UI of that XPage:

![image](/assets/img/2011/06/FacebookControls3.jpg)

 The next screenshot shows the login button and the result of an API call to get the user’s picture:

![image](/assets/img/2011/06/FacebookControls2.jpg)

 Watch this short [video](http://www.openntf.org/Projects/pmt.nsf/642DF16047C66E668625788F0021344D/%24file/Facebook.swf) to see the controls in action.

 I’d like to make this available soon with other new social controls in the OpenNTF [Social Enabler](http://socialenabler.openntf.org/) project.