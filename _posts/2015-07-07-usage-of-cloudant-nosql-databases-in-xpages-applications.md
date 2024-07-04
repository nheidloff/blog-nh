---
id: 1319
title: 'Usage of Cloudant NoSQL Databases in XPages Applications'
date: '2015-07-07T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/usage-of-cloudant-nosql-databases-in-xpages-applications/'
permalink: /article/07.07.2015124933NHEEQ3.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
custom_permalink:
    - article/07.07.2015124933NHEEQ3.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4328796817'
categories:
    - Articles
---

 [IBM Bluemix](https://bluemix.net/) provides various database services, one of them is the [Cloudant NoSQL DB](https://console.ng.bluemix.net/catalog/cloudant-nosql-db/). [Cloudant](https://cloudant.com/) provides a REST API and many [client libraries](https://docs.cloudant.com/libraries.html) to access the service. In the past I’ve used the [Java API Ektorp](http://ektorp.org/reference_documentation.html) for other projects.

 Today I tried how to use this API from [XPages](http://xpages.info/) which is a JSF based runtime running on [IBM Domino](http://www-03.ibm.com/software/products/en/ibmdomino) which comes with it’s own NoSQL database but you can also use other databases. In January IBM [previewed](http://heidloff.net/nh/home.nsf/article.xsp?id=26.01.2015175730NHEMVZ.htm) how to run XPages applications on Bluemix. But even today when running XPages on premises you could leverage other Bluemix services like Cloudant. Below is a high level description how to do this.

 To create a new Cloudant account developers can register at [bluemix.net](https://bluemix.net/) and create a new account from the [Bluemix catalog](https://console.ng.bluemix.net/catalog/cloudant-nosql-db/). After this you can find the credentials in the expandable section and open the Cloudant dashboard by clicking on the service.

![image](/assets/img/2015/07/cloudantbluemixui.png)

 In order to use the Ektorp API in the XPages Java code several libraries have to be imported.

![image](/assets/img/2015/07/cloudantdep.png)

 In order to access a database the following code worked for me. However note that I’m using deprecated classes for the SSL and trust everything which you shouldn’t do for production apps. I also changed my [Java security](http://www.wissel.net/blog/d6plinks/SHWL-8JYAT5) policies. The Cloudant credentials I hardcoded in the Java code for which there will be a better solution once XPages can be run on Bluemix.

![image](/assets/img/2015/07/cloudantxpages.png)

 To get started with Cloudant check out their website for [developers](https://cloudant.com/for-developers/). There is a lot of documentation, samples and a big community.