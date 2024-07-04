---
id: 644
title: 'Send E-Mails from XPages leveraging the Embedded Experience in IBM Connections Mail'
date: '2012-11-22T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/send-e-mails-from-xpages-leveraging-the-embedded-experience-in-ibm-connections-mail/'
permalink: /article/20.11.2012100922NHECRE.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/20.11.2012100922NHECRE.htm/
dsq_thread_id:
    - '4335390047'
categories:
    - Articles
---

The [OpenSocial specification](http://opensocial-resources.googlecode.com/svn/spec/2.5/Core-Gadget.xml#Embedded-Experiences) defines a so called gadget embedded experience and a generic URL embedded experience for feeds, activity streams and mails. The URL embedded experience allows web sites to be displayed without having to implement gadgets.

The video below shows how e-mails can be sent from XPages applications that contain the MIME content type “application/embed+json” which contains a URL to a web site. I’ve used code from Mark Leusink from [OpenNTF](http://openntf.org/XSnippets.nsf/snippet.xsp?id=create-html-mails-in-ssjs-using-mime) to do this. I had to add some lines of code that you can find in the comments of Mark’s snippet. Similarly my colleague Martin Donnelly [demonstrated](http://www.youtube.com/watch?v=nVnQHWYkCOE&feature=plcp) (17:00 min) a preview of a xp:sendMail action.

Here is a [screenshot](http://heidloff.net/home.nsf/dx/URLEE.png/$file/URLEE.png) showing the latest news from Collaboration Today which fit nicely in the embedded experience since the site has a responsive design.

{% include embed/youtube.html id='oVlvpgdf9J0' %}