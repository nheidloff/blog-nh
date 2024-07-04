---
id: 561
title: 'Invoking the IBM Connections REST APIs from XPages'
date: '2012-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/invoking-the-ibm-connections-rest-apis-from-xpages/'
permalink: /article/25.06.2012133034NHEFHN.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/25.06.2012133034NHEFHN.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4349863877'
categories:
    - Articles
---

 As part of my [blog series](http://heidloff.net/nh/home.nsf/dx/18.06.2012101730NHEBQZ.htm) I describe below some tips and tricks for how to use the Connections REST APIs from XPages.

 I strongly suggest to use the [XPages Social Enabler](http://www.youtube.com/watch?feature=player_embedded&v=UAmgqP20Okw) infrastructure which is included in the [Extension Library](http://www.openntf.org/internal/home.nsf/release.xsp?documentId=9AA9285364D0DF7486257A15004993E8&action=openDocument) project on OpenNTF. I documented most of the functionality in chapter 13 of the new [XPages book](http://www.ibmpressbooks.com/bookstore/product.asp?isbn=0132901811).

[   
![image](/assets/img/2012/06/extlibbook.jpg)  ](http://www.ibmpressbooks.com/bookstore/product.asp?isbn=0132901811)

 There is also some [documentation](http://www.openntf.org/Projects/pmt.nsf/DA2F4D351A9F15B28625792D002D1F18/%24file/SocialEnabler111006.pdf) on OpenNTF and David Leedy created a [cheatsheet](http://xpagescheatsheet.com/cheatsheet.nsf/downloadCount.xsp?link=http%3A//xpagescheatsheet.com/cheatsheet.nsf/135E58313968CEEB8825799100478A6F/%24FILE/Ni9-CS-SocialTools-8.5x11%20PDF.pdf&unid=135E58313968CEEB8825799100478A6F) describing how to get started.

 You should use the latest extension library from OpenNTF (you need at least the [June 2012 release](http://www.openntf.org/internal/home.nsf/release.xsp?documentId=9AA9285364D0DF7486257A15004993E8&action=openDocument)) since this version comes with LTPA based [single sign on](http://heidloff.net/nh/home.nsf/dx/23.05.2012154706NHEJ6Z.htm).

 The Connections wiki contains [documentation](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Connections_APIs_ic301) about the REST APIs. The [getting started](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Getting_started_ic301) gives some samples for typical API calls, e.g. to get a list of the communities of the current user: http://sbf3012.boeblingen.de.ibm.com:81/communities/service/atom/communities/my.

 One thing I had to learn was that the documentation mostly doesn’t define the URLs of the REST APIs. Instead it only says that the URLs should be read via another URL request for the applications’ [service documents](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Navigating_Profiles_resources_ic301), e.g. to find out the URL to get the [user’s status](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Retrieving_status_messages_ic301).

 In some cases absolute URLs are defined in the wiki. For example the [documentation](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Searching_for_a_users_profile_ic301) to find specific user profiles defines the URL “/atom/profile.do”. It took me some time though to figure out that I actually had to use “/profiles/atom/profile.do” to get the profile feed.

 Here is a simple sample for how to read the name of a user given the user’s id. In the NSF’s xsp.properties file I define to use the connectionsLtpa bean when the name ‘connections’ is used.

 extlib.endpoint.connections=connectionsLtpa

 In faces-config.xml I define the managed bean:

![image](/assets/img/2012/06/connectionsrestapis1.png)

 In the Java code you can then use ConnectionsService and the method get, post, put and delete to invoke the REST APIs. There is a convenience API sbt.XmlNavigator to easily parse the Atom/XML output.

![image](/assets/img/2012/06/connectionsrestapis2.png)

 In my Lotusphere session I used another sample which posted information to Connections:

 <iframe allowfullscreen="" frameborder="0" height="497" marginheight="0" marginwidth="0" scrolling="no" src="./3_files/11213150.html" style="border:1px solid #CCC;border-width:1px 1px 0" width="595"></iframe>

 Note that on slide 33 you should actually use EndpointFactory.getEndPoint to get the endpoint rather than JSFUtil.getVariable. JSFUtil returns a specific managed bean while the EndpointFactory returns the right managed bean for Connections dependent on your settings in xsp.properties since multiple managed beans can be defined to different Connections instances.