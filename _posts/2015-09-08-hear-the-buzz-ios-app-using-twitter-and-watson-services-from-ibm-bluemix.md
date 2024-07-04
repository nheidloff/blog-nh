---
id: 1420
title: 'Hear the Buzz: iOS App using Twitter and Watson Services from IBM Bluemix'
date: '2015-09-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/hear-the-buzz-ios-app-using-twitter-and-watson-services-from-ibm-bluemix/'
permalink: /article/08.09.2015085603NHEA64.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/08.09.2015085603NHEA64.htm/
dsq_thread_id:
    - '4323016524'
categories:
    - Articles
---

 “[Hear the Buzz](https://github.com/IBM-Bluemix/hear-the-buzz)” is a sample iPhone app which finds tweets with positive or negative sentiments for topics which users enter manually or via iOS speech recognition. The discovered list of tweets can be read or users can listen to them.

 Technically [IBM Bluemix](https://bluemix.net/) is used to host the backend functionality for the app. The backend application is a Node.js application which provides some REST APIs. The app leverages the following Bluemix services:   
 – [IBM Insights for Twitter](https://console.ng.bluemix.net/catalog/ibm-insights-for-twitter/): To find recent tweets for a specific topic with a certain sentiment   
 – [Text to Speech](https://console.ng.bluemix.net/catalog/text-to-speech/): To read the list of tweets   
 – [Advanced Mobile Access](https://console.ng.bluemix.net/catalog/advanced-mobile-access/): To capture analytics and logs from mobile apps on the server

 Watch the [video](http://www.youtube.com/watch?v=QctwylG31XA) to see a demonstration of the app or have a look at the following screenshots.

![image](/assets/img/2015/09/hear-the-buzz.png)

{% include embed/youtube.html id='QctwylG31XA' %}

 The application is available as [open source](https://github.com/IBM-Bluemix/hear-the-buzz). I’ll blog separately about some of the key techniques that I’ve used to develop the sample.

 Thank you to [Andrew Trice](http://www.tricedesigns.com/) who contributed the code to play audio and thank you to Frederic Lavigne for this [Twitter sample](https://developer.ibm.com/bluemix/2015/09/01/sample-ibm-insights-for-twitter/).