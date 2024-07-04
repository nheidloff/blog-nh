---
id: 1023
title: 'Authentication via the Bluemix Single Sign On Service in Bluemix.info'
date: '2014-12-11T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/authentication-via-the-bluemix-single-sign-on-service-in-bluemix-info/'
permalink: /article/11.12.2014081049NHEAFB.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/11.12.2014081049NHEAFB.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324167922'
categories:
    - Articles
---

 Bluemix provides a [Single Sign On Service](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html#sso_gettingstarted) to authenticate users against the IBM identity provider, Facebook, Google or LinkedIn. Once authenticated applications can access the [profile information](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html#user_profile_attributes) of the current users, e.g. name, email, etc. [Bluemix.info](http://bluemix.info/) uses the IBM identity provider which is the one that is also used for bluemix.net and most other IBM sites using the [IBM id](https://www.ibm.com/account/profile/us?page=reg).

 The Single Sign On services comes with a [sample](https://hub.jazz.net/project/bluemixsso/SingleSignOnSampleClient/overview). The sample works and is well documented but requires a bigger amount of Java code. I’ve reimplemented this sample as one single [servlet](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/AuthenticationServlet.java) in one file. In the servlet I use the [Apache Fluent API](http://hc.apache.org/httpcomponents-client-ga/tutorial/html/fluent.html) which makes the code significantly shorter and easier to read. The servlet has to be defined in [web.xml](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/webapp/WEB-INF/web.xml).

 Before you can use the Single Sign On service you need to configure it.

![image](/assets/img/2014/12/bisso.png)

 Since you need to provide the redirect URL, the client id and secret and the url cannot be put in the Bluemix environment variable VCAP\_SERVICES. Instead I pass this information to the servlet via a Bluemix user provided services. I’ll blog more about this separately.

 To identify an unique user I currently use the property “username”, e.g. “http://www.ibm.com/johnsmith@somewhere.com” and use this information to check for authorization. As I’ve learned later however I should use the property “userUniqueID”, e.g. “{‘http://www.ibm.com/110000Z99Z’}”. Turns out the userUniqueID array has only and always exactly one element.