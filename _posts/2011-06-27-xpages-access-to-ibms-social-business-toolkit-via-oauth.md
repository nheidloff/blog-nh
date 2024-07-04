---
id: 263
title: "XPages Access to IBM's Social Business Toolkit via OAuth"
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/xpages-access-to-ibms-social-business-toolkit-via-oauth/'
permalink: /article/03092011045352AMNHEDM8.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/03092011045352AMNHEDM8.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316551292'
categories:
    - Articles
---

 At Lotusphere 2011 there was a lot of talk about the IBM Social Business Framework. Since Lotusphere a live version of the IBM Social Business Toolkit is up and running on Greenhouse. Ryan Baxter gives in his blog a [good overview](http://ryanjbaxter.com/2011/02/04/open-standards-ibm-social-business-toolkit-and-embedded-experiences/) of the toolkit and used technologies and there is also an [IBM Collaboration Solutions Application Development wiki](http://www-10.lotus.com/ldd/appdevwiki.nsf/). The toolkit allows reading entries from the activity stream and writing to it using REST APIs.

 The first thing you need to do to access data from the activity stream in your applications is to use [OAuth](http://oauth.net/). OAuth is “an open protocol to allow secure API authorization in a simple and standard method from desktop and web applications”. [This wiki article](http://www-10.lotus.com/ldd/appdevwiki.nsf/dx/Configuring_the_OAuth_provider_with_the_Java_library_sbt) describes how you can use OAuth to access the activity stream.

 I’ve created a sample showing how to do OAuth from XPages. I’m trying to publish this code on OpenNTF, but for now here is a preview. This [short video](http://www.openntf.org/Projects/pmt.nsf/9A07B01CEC239D168625784D0044E6E4/%24file/OAuth.swf) demonstrates the whole flow and here are some screenshots.

 First you need to register your application.

![image](/assets/img/2011/06/RegisterApp.gif)

 Then you can create an XPage with a link/button/whatever to invoke your code that gets the request token and redirects to the login page and then to the page where you need to grant access.

![image](/assets/img/2011/06/GrantAccess.gif)

 The same functionality works also against other applications providing OAuth, e.g. Twitter.

![image](/assets/img/2011/06/Twitter.gif)

 After you got redirected back you need to invoke code in your XPage that reads the access token and secret that you need to invoke the actual [REST API calls](http://www.openntf.org/Projects/pmt.nsf/9A07B01CEC239D168625784D0044E6E4/%24file/Result.gif) after this.

 While this sample shows how to use OAuth as an client with the technologies available today, there is also the question whether Domino should be an OAuth server so that other applications can access XPages functionality. There is some discussion about this going on in [Ryan’s blog](http://ryanjbaxter.com/2011/03/03/oauth-on-domino/).

 One scenario could be an extension to people’s blogs with a button ‘add entry to IBM wiki’ to copy an entry easily into the product wikis (legal issues aside). Another scenario could be a personalized widget that you want to embed on some web sites. For example a widget for a teamroom could display documents assigned to you, the currently logged on user.

 Also as long as there is no other solution for running Domino applications in hybrid mode (cloud and on premise) sharing the same directory, OAuth might be a solution here.

 I’d think that these are important scenarios to really use XPages apps for social business. What do you think?