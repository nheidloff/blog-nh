---
id: 93
title: 'Integration of host applications in Lotus Notes'
date: '2008-10-30T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/integration-of-host-applications-in-lotus-notes/'
permalink: /article/integration-of-host-applications-in-lotus-notes/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/06.html'
custom_permalink:
    - article/integration-of-host-applications-in-lotus-notes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316386982'
categories:
    - Articles
---

 As Bob Balfe [blogged](http://blog.balfes.net/index.php?entry=entry081003-063643) the other day, with composite applications you can also access host applications in Lotus Expeditor and Lotus Notes. Post Notes 8.5 we are thinking about making a HOD ([see](http://www-01.ibm.com/software/webservers/hostondemand/) here and [here](http://publib.boulder.ibm.com/infocenter/hodhelp/v10r0/topic/com.ibm.hod.doc/WebSphereHOD.htm)) container available. This entry shows another example.

The example uses a publicly available demo server and application (see [here](http://rational.dfw.ibm.com/whidemo/hats/basics/live/hats_default_trans_live_inst.pdf)). Data can be sent in both directions. The first screenshot shows how pass data from any component to the HOD container.

![image](/assets/img/2008/10/1_0744F1680744BE140053DA96852574F2.gif)

The next screenshot shows how data is passed from the HOD container to another component.

![image](/assets/img/2008/10/1_0744CD4C0744CB0C0053DA96852574F2.gif)

In order to use the HOC container you can define the session configuration in the CAE.

![image](/assets/img/2008/10/1_0744D2A8074330C40053DA96852574F2.gif)

Data in the HOD container can be addressed in multiple ways. In this sample a landmark is defined by the screen name and the data is addressed through rows and columns. This screenshot shows how push data into the HOD container as done in the first screenshot above.

![image](/assets/img/2008/10/1_0744E2280744DF440053DA96852574F2.gif)