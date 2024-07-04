---
id: 377
title: 'New Token Store Database in XPages Social Enabler for OAuth and SSO'
date: '2011-10-10T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/new-token-store-database-in-xpages-social-enabler-for-oauth-and-sso/'
permalink: /article/10072011015211AMNHE8W7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/10072011015211AMNHE8W7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316613407'
categories:
    - Articles
---

 I [posted](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8M5CNA) the other day a video showing the new Social Enabler that we’ll hopefully post very soon on OpenNTF. The Social Enabler is a new infrastructure making it very easy to call REST services and handling authorization and authentication.

 These days most REST services support OAuth: “An open protocol to allow secure API authorization in a simple and standard method from desktop and web applications.” The problem is that the [exchange of keys](http://heidloff.net/nh/home.nsf/dx/03092011045352AMNHEDM8.htm) (the so called three legs dance) and the management of these keys is not trivial. Social Enabler comes with functionality to make this much easier.

 Developers can store OAuth application keys centrally in a Token Store database as well as the so called end points of services.

![image](/assets/img/2011/10/TokenStore02.gif)

 In the XPages application developers can then use a managed bean as endpoint to point to a specific OAuth application and to define the base URL of the service (in faces-config.xml).

![image](/assets/img/2011/10/TokenStore03.gif)

 In the XPages source REST calls can be done very easily. The first time users try to access a service the dance happens automatically and if users granted the XPages application access to this service on their behalf the tokens of the users are also stored in the token store database. The next time users try to access the service they don’t have to do the dance again. Here is some sample code to read the name of the current user in Dropbox.

![image](/assets/img/2011/10/TokenStore01.gif)

 Additionally the token store database allows storing user credentials used for basic authentication. This is a very useful SSO mechanism if for example users access IBM Connections from XPages applications. If “Save my credentials and keep me signed in accross sessions” is checked, no login page will appear again in future sessions.

![image](/assets/img/2011/10/TokenStore04.gif)