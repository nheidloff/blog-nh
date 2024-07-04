---
id: 1358
title: 'Accessing On-Premises Data from XPages Applications on Bluemix'
date: '2015-08-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/accessing-on-premises-data-from-xpages-applications-on-bluemix/'
permalink: /article/20.07.2015075702NHE8Z8.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/20.07.2015075702NHE8Z8.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323331391'
categories:
    - Articles
---

 When building new applications on the cloud, enterprises often need to access existing data that resides on-premises. Below is a high level description how to access data in on-premises XPages NoSQL databases from XPages applications running on [IBM Bluemix](https://bluemix.net/).

 The sample below shows how to invoke the database REST APIs ([IBM Domino Access Services](http://www-10.lotus.com/ldd/ddwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Domino+Access+Services+9.0.1#action=openDocument&content=catcontent&ct=api)) from an XPages application. As an example database I used [Collaboration Today](https://github.com/OpenNTF/collaborationtoday) that I deployed on my on-premises Domino server. The only change I had to do in this database was to enable the REST APIs in the application and view properties (see [documentation](https://www.ng.bluemix.net/docs/services/XPagesNoSQLDatabase/index.html#xpservice_otherruntimes)).

 In a new database (xpagesrestclient.nsf) I added a simple home.xsp and defined a managed bean.

![image](/assets/img/2015/08/xpagesonprem3.jpg)

![image](/assets/img/2015/08/xpagesonprem4.jpg)

 The managed bean uses the [Fluent API](https://hc.apache.org/httpcomponents-client-ga/tutorial/html/fluent.html) to invoke the REST APIs. I had to write a simple JSON parser to generate the list of news entry objects since the XPages Bluemix runtime currently doesn’t allow Java reflection.

![image](/assets/img/2015/08/xpagesonprem5.jpg)

![image](/assets/img/2015/08/xpagesonprem6.jpg)

 The key component to make all of this work is the [Secure Gateway](https://www.ng.bluemix.net/docs/services/SecureGateway/index.html) service. To find out more read this [blog](http://heidloff.net/nh/home.nsf/article.xsp?id=05.03.2015141604NHEHKL.htm) and the blogs from [Mark Roden](http://xomino.com/2015/05/05/passing-authentication-information-through-the-bluemix-hybrid-secure-gateway/).

 Note that in this demo I only use basic authentication and the connection from the cloud to on-premises is not encrypted. You certainly should not do this for production apps.

![image](/assets/img/2015/08/xpagesonprem1.jpg)

 Here is a screenshot of the result.

![image](/assets/img/2015/08/xpagesonprem2.jpg)