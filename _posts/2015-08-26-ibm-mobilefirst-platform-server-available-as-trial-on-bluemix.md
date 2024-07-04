---
id: 1416
title: 'IBM MobileFirst Platform Server available as Trial on Bluemix'
date: '2015-08-26T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/ibm-mobilefirst-platform-server-available-as-trial-on-bluemix/'
permalink: /article/26.08.2015093454NHEAWE.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
custom_permalink:
    - article/26.08.2015093454NHEAWE.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323013187'
categories:
    - Articles
---

 [IBM Bluemix](https://bluemix.net/) provides several services to build backend functionality for mobile iOS, Android and hybrid apps. There are [mobile services](https://console.ng.bluemix.net/solutions/mobilefirst) to store data server and client side, to handle authentication, to send notifications, to monitor particular apps, ways for users to provide feedback and more. This functionality can be used in mobile apps without additional server side infrastructure.

 The [IBM MobileFirst Platform Foundation](https://developer.ibm.com/mobilefirstplatform/) provides the same functionality plus additional functionality needed by enterprises for a complete mobile solution. For example the MobileFirst Platform Foundation server provides mechanisms to monitor not only single apps but all apps used in the enterprise. The server comes also with [adapters](https://developer.ibm.com/mobilefirstplatform/documentation/getting-started-6-3/server-side-development/adapter-framework-overview/) to access enterprise backend systems and transform the data before returned to clients. For more details check out the [MobileFirst Developers](https://developer.ibm.com/mobilefirstplatform/) site and the blog from [Andrew Trice](http://www.tricedesigns.com/).

 In order to try the MobileFirst Platform Server Bluemix provides now a Docker image so that you can set up your own server within minutes. Read the article [IBM MobileFirst Platform Server on Bluemix.net in under 5 minutes](https://developer.ibm.com/mobilefirstplatform/2015/08/14/ibm-mobilefirst-platform-server-bluemix-net-5-minutes/) and the documentation [Evaluate IBM MobileFirst Platform Foundation on IBM Containers](https://developer.ibm.com/mobilefirstplatform/documentation/getting-started-7-1/bluemix/evaluate-foundation-on-bluemix/) to learn how you can set up your own server.

 There is a [sample app](https://developer.ibm.com/mobilefirstplatform/documentation/getting-started-7-1/bluemix/foundation-on-bluemix-sample-app/) for iOS, Android, or hybrid environments. The app displays a catalog of items and after users have authenticated they can add items to their whishlists.

 This is a screenshot of the MobileFirst Analytics Console:

![image](/assets/img/2015/08/mobilefirstdocker1.png)

 And here is the sample app running on iOS and Android:

![image](/assets/img/2015/08/mobilefirstdocker2.png)

![image](/assets/img/2015/08/mobilefirstdocker3.png)