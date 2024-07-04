---
id: 191
title: 'New composite application component on OpenNTF: Property converter'
date: '2009-04-09T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/new-composite-application-component-on-openntf-property-converter/'
permalink: /article/new-composite-application-component-on-openntf-property-converter/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
custom_permalink:
    - article/new-composite-application-component-on-openntf-property-converter/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4317551284'
categories:
    - Articles
---

 Kevin Bergin from the IBM development lab in Dublin implemented this sample that we published on OpenNTF now – [see here](http://openntf.org/internal/ontfcatalog.nsf/topicThread.xsp?action=openDocument&documentId=064A2C5AB113EC1D8525759300239BE0).

The property converter is a composite application component that can be put between two components to convert the property that goes over the wire via JavaScript snippets.

Here is a little sample to describe the component. The property converter is the rectangle at the bottom. The company of the person you select in the contacts list is sent to the property converter which converts the property and publishes a new one with the URL of that company. The web browser displays the URL when you select another person.   
![image](/assets/img/2009/04/1_0761130007610CBC002620C385257593.gif)

You can install this component either via drag and drop from this catalog entry (upper right corner “Try it”) or via the local update site that is included in the zip file that you can download. After the installation you’ll see this component in the Composite Application Editor palette:   
![image](/assets/img/2009/04/1_07611C540761181C002620C385257593.gif)

It is currently not possible to hide this component (due to a limitation in Notes 8.5 that hopefully will be resolved soon). It has not been tested whether you can access the notes.jar from the JavaScript code. The script can use the ‘importpackage’ function to access and instantiate Java objects.However, there might be some classloading issues that need to be worked around.