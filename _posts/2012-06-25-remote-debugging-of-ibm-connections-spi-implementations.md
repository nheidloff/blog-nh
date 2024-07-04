---
id: 556
title: 'Remote Debugging of IBM Connections SPI Implementations'
date: '2012-06-25T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/remote-debugging-of-ibm-connections-spi-implementations/'
permalink: /article/20.06.2012151829NHEHM4.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/20.06.2012151829NHEHM4.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4389174268'
categories:
    - Articles
---

 As I wrote in my previous [blog entry](http://heidloff.net/nh/home.nsf/dx/20.06.2012151813NHEHLY.htm) I’ve used the Connections event SPI to update Notes ACLs when community memberships are changed.

 Since my first implementation attempt didn’t work I started to use System.out.println to generate some logs. On my RedHat system these logs are written into the file /local/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/clusterLC\_server1/SystemOut.log and they were quite helpful.

 However logs never replace real debugging. So I looked for a way to debug my Java code from my Eclipse IDE. Since my Eclipse IDE is on another machine I actually needed a way to debug my code remotely.

 In XPages I had done this previously, both for Java code in the [NSF](http://www.youtube.com/watch?v=1xczmvd1bs0) as well as OSGi bundles in my [Eclipse IDE](http://www.youtube.com/watch?v=dchOyzjy9L4).

 After some research I’ve found the [documentation](http://publib.boulder.ibm.com/infocenter/rtnlhelp/v6r0m0/topic/com.ibm.debug.wsa.doc/tasks/tbwoprep.htm) in the WebSphere info center (not in the Connections wiki). All you need to do is to enabler debugging in the WebSphere Integrated Solutions Console and define a port.

![image](/assets/img/2012/06/WASRemoteDebug2.png)

 In Eclipse you can then use your server’s DNS name and that port in your Remote Java Application Debug configuration.

![image](/assets/img/2012/06/WASRemoteDebug1.png)