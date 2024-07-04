---
id: 702
title: 'XPages in the Embedded Experience in IBM Connections'
date: '2012-12-13T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/xpages-in-the-embedded-experience-in-ibm-connections/'
permalink: /article/11.12.2012081122NHEAFP.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/11.12.2012081122NHEAFP.htm/
dsq_thread_id:
    - '4352637303'
categories:
    - Articles
---

The video below shows a sample scenario how to publish entries into a community activity stream from an XPages application. From the activity stream these entries can be opened in the embedded experience which brings up the XPages app.

I’ve implemented this sample scenario via the XPages social enabler and the [ActivityStreamService](http://heidloff.net/home.nsf/dx/26.11.2012081646NHEAK3.htm) I blogged about earlier. You can download this code from [OpenNTF](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=XPages%20For%20Connections).

In order to display the XPages app in the embedded experience I actually did not implement my own open social gadget. Instead I use the same ‘generic built in URL gadget’ I used for the previous [sample](http://heidloff.net/home.nsf/dx/20.11.2012100922NHECRE.htm) showing XPages in the embedded experience in Connections mail. While you cannot access the open social container APIs using the generic gadget, the beauty is that it works for all URLs/web pages. In order to run this sample you need Connections CR2.

{% include embed/youtube.html id='o7iGnJRmoak' %}