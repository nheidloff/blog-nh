---
id: 1150
title: 'Secure Gateway Service to connect from Bluemix Apps to on-premises Systems'
date: '2015-03-05T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/secure-gateway-service-to-connect-from-bluemix-apps-to-on-premises-systems/'
permalink: /article/05.03.2015141604NHEHKL.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/05.03.2015141604NHEHKL.htm/
dsq_thread_id:
    - '4323917380'
categories:
    - Articles
---

 At InterConnect 2015 IBM announced the new [Secure Gateway](https://www.ng.bluemix.net/docs/#services/SecureGateway/index.html#gettingstartedsecuregateway) service which is now available on [IBM Bluemix](http://bluemix.net/).

“When you need a secure way to connect Bluemix applications to remote locations on-premises or in the cloud, use the Secure Gateway service. The Secure Gateway provides secure connectivity and establishes a tunnel between your Bluemix organization and the remote location that you want to connect to.”

The secure gateway is a key part of [IBM’s hybrid cloud strategy](https://console.ng.bluemix.net/solutions/hybrid-cloud). For a sample scenario I suggest to watch the keynote “Digital Transformation in the Era of Hybrid Cloud” on [InterConnectGo](http://interconnectgo.com/go-tv/). After you’ve registered you can watch the video on YouTube (4:22m – 10:45m, just append ‘&amp;t=262’ to the URL). The sample is an user experience for flight attendance who can rebook flights during flights if necessary. The sample has a mobile interface, uses Bluemix for hosting the app, Cloudant for mobile data and additionally on-premises systems to access passenger profiles, the flight booking system etc.

In order to use the gateway you need to set up some software on-premises. Right now the only option is to run a Docker image which is as easy as invoking one command assuming you have Docker already installed.

Once done you can expose on-premises URLs to the cloud. The gateway protects these URLs so that only your app(s) can access them. Watch the video to learn how to configure the service.

{% include embed/youtube.html id='VVjSx1iuvk4' %}

Here is a screenshot of a quick test:

![image](/assets/img/2015/03/securegateway.png)