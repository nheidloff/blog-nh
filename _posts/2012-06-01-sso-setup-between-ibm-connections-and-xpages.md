---
id: 520
title: 'SSO Setup between IBM Connections and XPages'
date: '2012-06-01T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/sso-setup-between-ibm-connections-and-xpages/'
permalink: /article/21.05.2012084808NHE9Z5.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
custom_permalink:
    - article/21.05.2012084808NHE9Z5.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4318909626'
categories:
    - Articles
---

 The other day I had to set up SSO via LTPA between IBM Connections and Domino. SSO between WebSphere and Domino has been possible for more than a decade and there are a couple of [articles](http://www.ibm.com/developerworks/ibm/library/it-0101art2/) that describe this. The setup was pretty straight forward, but there were two things that I wanted to share since they took me some time.

 When I tried to import the LTPA keys I got an error “An R5 Web SSO Configuration already exists for this domain.” This [technote](http://www-01.ibm.com/support/docview.wss?uid=swg21162072) describes the fix. After this the keys can be imported easily.

![image](/assets/img/2012/06/dom.png)

 The documentation that I’ve found often was written for older WebSphere and Domino versions with older screenshots. The important page to export the keys can be found under “Security-Gobal Security” and then by clicking the “LTPA” link on that page. This brings up the page to export the keys.

![image](/assets/img/2012/06/was.png)

 This setup is necessary if you want to access the IBM Connections REST APIs programmatically from your XPages as blogged about on [OpenNTF](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8TY9EV). I’d like to use this same mechanism in the social enabler so that the Abdera client wouldn’t be required.