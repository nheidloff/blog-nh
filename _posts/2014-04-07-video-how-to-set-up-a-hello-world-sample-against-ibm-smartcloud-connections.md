---
id: 957
title: 'Video how to set up a Hello World Sample against IBM SmartCloud Connections'
date: '2014-04-07T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/video-how-to-set-up-a-hello-world-sample-against-ibm-smartcloud-connections/'
permalink: /article/07.04.2014155314NHEJAU.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/07.04.2014155314NHEJAU.htm/
dsq_thread_id:
    - '4349613209'
categories:
    - Articles
---

The video outlines how to set up the Eclipse IDE and configure a simple hello world sample to work against IBM SmartCloud for Social Business.

{% include embed/youtube.html id='2xH6Ib6a0LU' %}

Below are some links and snippets you need for the setup.

[Setup Hello World Sample against IBM Connections (on-prem) on IBM Greenhouse](https://github.com/OpenNTF/SocialSDK/wiki/Building-my-first-Social-Application)

[IBM SmartCloud Engage for 60 Days Trial](http://www.ibm.com/cloud-computing/social/us/en/startatrial/)

[IBM SmartCloud for Social Business Admin UI](https://apps.na.collabserv.lotus.com/manage/account/isv/input)

[Callback OAuth 2 URL](https://localhost:8443/mysocial.webapp/service/oauth20_cb)

Replace in sbt.properties:  
smartcloudOA2.url=http://apps.na.collabservtest.lotus.com  
smartcloudOA2.appName=connections  
smartcloudOA2.appId=connections  
smartcloudOA2.clientID=  
smartcloudOA2.clientSecret=  
smartcloudOA2.apiVersion=3.0

Replace in managed-beans.xml:  
managed-bean  
managed-bean-name defaultEnvironment managed-bean-name  
managed-bean-class com.ibm.sbt.jslibrary.SBTEnvironment managed-bean-class  
managed-bean-scope application managed-bean-scope  
managed-property  
property-name endpoints property-name  
value smartcloudOA2:connections value  
managed-property  
managed-bean

Un-comment in server.xml:  
Connector port=”8443″ protocol=”org.apache.coyote.http11.Http11Protocol” maxThreads=”150″ SSLEnabled=”true” scheme=”https” secure=”true” clientAuth=”false” sslProtocol=”TLS”

[Create Tomcat keystore file](https://tomcat.apache.org/tomcat-6.0-doc/ssl-howto.html)

[Launch sample](https://localhost:8443/mysocial.webapp/)