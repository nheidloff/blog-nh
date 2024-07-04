---
id: 193
title: 'XPages Login Control'
date: '2009-04-22T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/xpages-login-control/'
permalink: /article/22.04.2009143214NHEPR8.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/22.04.2009143214NHEPR8.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4317551390'
categories:
    - Articles
---

 There is a new reusable control on OpenNTF to let users log in. Open the [OpenNTF catalog](http://openntf.org/internal/ontfcatalog.nsf/Controls.xsp) and then the XPages login control.

![image](/assets/img/2009/04/1_0676766406766ED4006636D3852575A0.gif)

 This XPage custom “login” control (ccLoginControl) can be added into your XPages. There is a sample “LoginTest” XPage within this nsf together with a cut down “Blue” theme which uses the oneui.

 The control detects whether authentication is basic or session based and behaves accordingly (no logout for basic etc).

 There is an optional parameter “logoutRedirectURL” which can be used to set a redirect when users log out of the application (otherwise they get directed to the root). This is set within the custom control’s properties when adding to your XPage.

 To run the nsf file in your environment you will need to sign the template.