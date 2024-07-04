---
id: 261
title: 'PhoneGap and XPages to build native/hybrid Mobile Apps'
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/phonegap-and-xpages-to-build-nativehybrid-mobile-apps/'
permalink: /article/03032011023649AMNHEAXK.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/03032011023649AMNHEAXK.htm/
dsq_thread_id:
    - '4316549703'
categories:
    - Articles
---

 [PhoneGap](http://www.phonegap.com/) is an open source mobile framework to build mobile apps for most mobile platforms. As the name says it tries to fill the gap in current HTML specs and browser implementations by providing JavaScript APIs to access services of smartphones. So you can develop mobile apps using web application development like XPages and then use PhoneGap to wrap it in [native apps](http://www.phonegap.com/about) for the different devices.

 Last year I played around with PhoneGap and I really like it. I posted a mobile app sample on [OpenNTF](http://mobilecontrols.openntf.org/) which takes a picture and stores it in a Notes database ([watch the video](http://www.youtube.com/watch?v=M2DsAuAojnE)).

 Recently I found the great video below from Brian LeRoux from Nitobi who (I think) is the technical lead of PhoneGap. In the video he provides a great overview and update. Let me highlight a couple of his points.

 I agree with Brian that the majority of mobile apps customers need are really simple apps (video 47:27). While you can’t and shouldn’t implement all types of mobile apps using web app dev most business apps are rather simple, but still provide a lot of value. A good example might be the simple [expense report app](http://www.openntf.org/Projects/pmt.nsf/EAAC8F87F717745086257829005806BB/%24file/OGSXPagesMobile.swf) I created for the Lotusphere keynote. However I hope that encrypted stores on smartphones will be available soon to web developers.

 Also most app stores require natives apps and not pure web apps. So you need to wrap your web apps in native shells that use embedded browsers to run the actual apps. PhoneGap provides this for various platforms. I haven’t tried it myself yet but Brian talks about the (relative) new [PhoneGap/build Cloud service](https://build.phonegap.com/) (video 40:48). When using this service you don’t have to install all the different SDKs to compile the native apps which saves a lot of time.

 Brian also mentions IBM’s recent involvement in PhoneGap. He says “IBM has been hugely involved” (video 33:35).

 When I’ll find some time I also want to try [WebInspector](https://trac.webkit.org/wiki/WebInspector), esp. the [remote WebInspector](http://muellerware.org/papers/weinre/manual.html) (video 38:15). Sounds like this is tool to debug a web page running on another machine. Because of missing good debug capabilities on various platforms this could have saved me a lot of time in the past.

 Brian talks also a little about legal aspects and I really had to laugh when he admitted they didn’t know until recently what contributor license agreements are and why they are important (video 25:08). This reminded me of the discussions we’ve had over the last two years for OpenNTF.

{% include embed/youtube.html id='RtmO34fD-PY' %}