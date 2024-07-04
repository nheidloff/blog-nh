---
id: 990
title: 'Auto-Scalability of Bluemix Applications'
date: '2014-10-29T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/auto-scalability-of-bluemix-applications/'
permalink: /article/29.10.2014143243NHEHVZ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/29.10.2014143243NHEHVZ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4347360505'
categories:
    - Articles
---

 One of the great benefits of Bluemix applications is the ability to scale very easily. Below is a quick description of this functionality.

 Here is what the [Bluemix architecture overview documentation](https://www.ng.bluemix.net/docs/#overview/overview.html#ov_arch) says:   
 “Bluemix is designed to host scalable applications and application artifacts. when the load of your application changes, instances of your application might need to be created or deleted. Therefore, any instance of your application might be terminated, deleted, moved, or re-created on a new VM or container when it is required, even if your application has only one instance. Because it might be removed at any time, your application needs to save all persistent data in a data store that is outside of your application, for example, on one of the data store services that are provided by Bluemix. Any data that is stored locally to your application, such as in memory or on local disk, is removed when the instance of your application is removed.”

 You can manually determine the number of instances and the used memory.

![image](/assets/img/2014/10/autoscale1.png)  
 **Auto-Scaling Add-On**

 Additionally you can use the so called [Auto-Scaling add-on](https://www.ng.bluemix.net/docs/#services/Auto-Scaling/index.html#autoscaling). Via policies you can define that Bluemix should create new instances if the memory utilization exceeds a certain limit.

![image](/assets/img/2014/10/autoscale2.png)

 Ryan Baxter explains this capability very well with a [nice sample](http://ryanjbaxter.com/2014/04/22/bluechatter-a-sample-app-for-bluemix/) in a [webinar](https://www14.software.ibm.com/webapp/iwm/web/signup.do?source=dw-c-wcsdpr&S_PKG=ov26816&?cmp=IBMDevProg&cpb=Bluemix&ct=QuinstreetWC2&cr=IBMAIM&ccy=WW) (after registration you can download the mp4. auto-scaling demo starts at 30:00 min).

 In the same webinar Ryan talks about further scalability best practices and patterns (starting at 5:05 min) that developers should be aware of when building scalable apps. I advice to watch the full video, very easy to follow.   
 **Session Cache Service**

 As stated in the Bluemix documentation since an application “might be removed at any time, your application needs to save all persistent data in a data store that is outside of your application”. This includes persistent data that you store in databases, but even data that you typically store in memory, for example in the HttpSession. In order to store data in memory that all application instances can access Bluemix provides the [Session Cache](https://www.ng.bluemix.net/docs/#services/SessionCache/index.html) service.

 When using this service from Liberty applications, data that is stored in the HttpSession is automatically put in the session cache and available in all other application instances. So developers don’t have to write any additional code to leverage this capability. Read the [article](http://www.ibm.com/developerworks/cloud/library/cl-sessioncache-app/index.html) on developerWorks for more details.