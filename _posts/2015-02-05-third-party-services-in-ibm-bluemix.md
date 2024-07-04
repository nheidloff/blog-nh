---
id: 1096
title: 'Third Party Services in IBM Bluemix'
date: '2015-02-05T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/third-party-services-in-ibm-bluemix/'
permalink: /article/05.02.2015092629NHEBWM.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/05.02.2015092629NHEBWM.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4327259506'
categories:
    - Articles
---

 Last week IBM previewed a new service for IBM Bluemix, called [Social File Sharing](http://heidloff.net/nh/home.nsf/article.xsp?id=28.01.2015203127NHEQW9.htm). As some of my readers will know this is the work from my previous team, the IBM Connections app dev team, and I actually implemented the first version/prototype of the service broker. Since several people have asked me how to do this, let me give a quick overview.

 The [IBM Bluemix catalog](https://console.ng.bluemix.net/#/store) provides 16 services right now that have been provided by third parties, for example MongoLab, SendGrid and Memcached Cloud. Partners who are interested to add their own services should check out the [IBM Cloud marketplace](http://www.ibm.com/cloud-computing/us/en/partner-landing.html) landing page for partners.

![image](/assets/img/2015/02/bluemixthirdpartyservices.png)

 Technically in order to add a service to Bluemix a service broker needs to be developed, hosted and registered. CloudFoundry defines a [service broker API](http://docs.cloudfoundry.org/services/api.html) and it defines [how to manage service brokers](http://docs.cloudfoundry.org/services/managing-service-brokers.html). However these APIs are not directly used by third parties. Instead IBM cooperates with [AppDirect](http://www.appdirect.com/) which allows developers to write only one service broker and deploy it to various platforms:

 “AppDirect offers the only cloud service delivery platform that exceeds the functionality provided by the most established distribution channels for on demand services, such as the Google Application Marketplace, Salesforce Appexchange, and the Apple App Store.”

 Implementing a service broker is straight forward. Essentially you need to implement the following REST APIs:   
 – Return the description of the service and the plans that show up in the catalog   
 – Create a new service instance: this is typically where user accounts are created, resources are reserved, etc.   
 – Bind a service instance to (a) specific application(s): this is where the credentials of the service are passed to the application   
 – Unbind and delete service instances   
 – Provide single sign on when the dashboard of a service is invoked from Bluemix