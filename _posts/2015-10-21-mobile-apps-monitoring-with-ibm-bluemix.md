---
id: 1511
title: 'Mobile Apps Monitoring with IBM Bluemix'
date: '2015-10-21T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/mobile-apps-monitoring-with-ibm-bluemix/'
permalink: /article/21.10.2015103527NHEC48.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/21.10.2015103527NHEC48.htm/
dsq_thread_id:
    - '4323126897'
categories:
    - Articles
---

 One of the great capabilities of [Bluemix](https://bluemix.net/) is that developers can see information about how their mobile apps are used in a [server side dashboard](https://www.ng.bluemix.net/docs/services/mobileaccess/appmonitoring/index.html). This includes usage statistics, network traffic and devices types as well as client side logs. Being able to see logs from all mobile devices is very useful since physical access to devices is obviously hard and sometimes not possible.

In order to use this functionality Bluemix provides the [Mobile Client Access](https://console.ng.bluemix.net/catalog/mobile-client-access) service and SDKs for iOS, Android and hybrid apps.

The service Mobile Client Access was recently [renamed](https://developer.ibm.com/bluemix/2015/10/09/advanced-mobile-access-renamed-mobile-client-access/) and supports now Android as well as iOS. In order to register mobile apps to connect the client apps with the server backend, the app GUID is now [configured](https://developer.ibm.com/bluemix/wp-content/uploads/sites/20/2015/10/mobile-client-access.jpg) in the Bluemix app rather than in a particular service.

I use the logging functionality in the sample app [Hear the Buzz](https://github.com/IBM-Bluemix/hear-the-buzz). After including the SDK for iOS you can use the IMFLogger APIs from both Swift and Objective-C. For example via [logInfoWithMessages](https://github.com/IBM-Bluemix/hear-the-buzz/blob/master/client/hear-the-buzz/ViewModel.swift) you add logs and via [sendPersistedLogs](https://github.com/IBM-Bluemix/hear-the-buzz/blob/master/client/hear-the-buzz/AppDelegate.swift) logs are sent to Bluemix. Here is a screenshot of the dashboard (still using the old service name).

![image](/assets/img/2015/10/mobilelogs.png)

To learn more read the [documentation](https://www.ng.bluemix.net/docs/services/mobileaccess/appmonitoring/index.html) and watch the video from Andrew Trice.

{% include embed/youtube.html id='-kMRR-SoEXk' %}