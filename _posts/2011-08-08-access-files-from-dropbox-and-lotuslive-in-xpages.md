---
id: 305
title: 'Access Files from Dropbox and LotusLive in XPages'
date: '2011-08-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/access-files-from-dropbox-and-lotuslive-in-xpages/'
permalink: /article/07212011023704AMNHE9SB.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/07212011023704AMNHE9SB.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316585148'
categories:
    - Articles
---

 Justin Murray and Daneel Reif are two students who are currently working on a summer internship project that we call social enabler. The main implementation goal is to create functionality to access files from Dropbox and LotusLive Files in XPages applications. This is useful if you have custom enterprise applications which require files that need to be shared with people outside the firewall. For example if you have a lead manager application you might need to exchange documents with a customer who has no access to our application, but has access to Dropbox or LotusLive.

 As Phil Riand talked about at [PACLUG](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8J2V3G) and as I’ve written a couple of times about in this blog we’re working on a significant new release of the [Social Enabler](http://socialenabler.openntf.org/) project. The new OSGi plugin will contain functionality to easily access REST based services like IBM Connections, Facebook, etc. Most importantly it will encapsulate the complexity to do authorization via OAuth and to manage tokens.

 Justin and Daneel are using and extending this code to access files in Dropbox and LotusLive. Below is a preview of what they have right now. At this point files can be displayed and downloaded from XPages.

 The first screenshot shows an XPage with my Dropbox files (click images to enlarge):

![image](/assets/img/2011/08/FilesControl2s.gif)

![image](/assets/img/2011/08/FilesControl1s.gif)

 The second XPage shows file from LotusLive:

![image](/assets/img/2011/08/FilesControl3s.gif)

![image](/assets/img/2011/08/FilesControl4s.gif)

 I’ll blog more about how this project has been implemented. One of the highlights is that there is a new data source xe:fileServiceData with the types Dropbox and LotusLive. You can bind this data source to your known view panel or repeat control. In the scenario below we pass it to a custom control that displays the files. There are also APIs allowing to invoke REST calls easily and handling the JSON or Atom output.

![image](/assets/img/2011/08/FilesControl5.gif)