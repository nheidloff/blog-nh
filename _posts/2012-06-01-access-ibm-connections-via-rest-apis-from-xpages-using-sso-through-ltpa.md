---
id: 521
title: 'Access IBM Connections via REST APIs from XPages using SSO through LTPA'
date: '2012-06-01T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/access-ibm-connections-via-rest-apis-from-xpages-using-sso-through-ltpa/'
permalink: /article/23.05.2012154706NHEJ6Z.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/23.05.2012154706NHEJ6Z.htm/
dsq_thread_id:
    - '4318911595'
categories:
    - Articles
---

 I [blogged](http://heidloff.net/nh/home.nsf/dx/21.05.2012084808NHE9Z5.htm) recently how to set up SSO between XPages and Connections. This enables SSO in general and for users accessing web pages from Connections and Domino. However it does not automatically work when you write backend code in XPages that uses the Connections REST APIs.

 The XPages Social Enabler supported already SSO but it required users to log in to Connections separately once and the user names and passwords had to be stored in a server side credential store.

 I’ve extended the social enabler now to also use the LTPA tokens in the backend so that users only have to log in once and credentials don’t have to be stored separately. Watch the video for details.

{% include embed/youtube.html id='J0At6tO_n4E' %}

 I hope we can add this soon to the extension library.