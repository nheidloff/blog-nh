---
id: 226
title: 'Two projects on OpenNTF: Mail rules plugin and OSGI admin bridge component'
date: '2009-05-22T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/two-projects-on-openntf-mail-rules-plugin-and-osgi-admin-bridge-component/'
permalink: /article/22.05.2009011548NHE87G.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/22.05.2009011548NHE87G.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316524793'
categories:
    - Articles
---

 Bob Balfe published two projects on OpenNTF three weeks ago that I haven’t blogged about.

 The first one is his [mail rules sample](http://www.openntf.org/Projects/pmt.nsf/ProjectLookup/Mail%20Rule%20Utilities). It shows how to write an Eclipse plugin to add an icon to the mail Java (CSI) view (e.g. inbox). Then it uses the notes.jar to read and run mail rules. There is an [article](http://www.ibm.com/developerworks/lotus/library/notes8-mail/index.html) that describes how this sample has been implemented.

 This icon …   
![image](/assets/img/2009/05/1_08A9DE9C08A9D208001D15C7852575BE.gif)  
 … invokes this dialog:   
![image](/assets/img/2009/05/1_08A9E20808A9D208001D15C7852575BE.gif)

 The second sample is a composite application component, called the [OSGI event admin bridge](http://www.openntf.org/Projects/pmt.nsf/ProjectLookup/OSGI%20Event%20Admin%20Bridge). It can be used in composite applications to interact with OSGI EventAdmin topics in both directions via declarative wires in the Composite Application Editor. Bob has a [video](http://blog.balfes.net/?p=14) that describes this component.