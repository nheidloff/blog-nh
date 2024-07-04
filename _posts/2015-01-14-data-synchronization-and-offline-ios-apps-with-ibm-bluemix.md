---
id: 1055
title: 'Data Synchronization and Offline iOS Apps with IBM Bluemix'
date: '2015-01-14T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/data-synchronization-and-offline-ios-apps-with-ibm-bluemix/'
permalink: /article/14.01.2015082441NHEAPY.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/14.01.2015082441NHEAPY.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324422990'
categories:
    - Articles
---

 One of the main benefits of IBM Notes is the ability to access applications when you’re offline. There is a built-in replication functionality that takes care about data synchronization between clients and servers. I’ve always liked that capability since even today, for various reasons, people are not always online.

 Yesterday I played with a very similar feature – data synchronization and offline iOS apps with IBM Bluemix. Very powerful.

 There is a Bluemix service [Data for iOS](https://www.ng.bluemix.net/docs/#services/data/index.html). “Data for iOS 8 is a beta offering that extends the Cloudant NoSQL DB service. This beta provides a native feel for storing mobile data in the cloud, while the management and implementation of the data store is hidden.”

 In your iOS app you can use native Swift or Objective-C to access data in local and remote databases. Native objects are [mapped](https://www.ng.bluemix.net/docs/#services/data/index.html#datamodels) to the underlying JSON document format. [Data synchronization](https://www.ng.bluemix.net/docs/#services/data/index.html#replicate) can be triggered easily via APIs. Check out the [CloudantToolkit Framework for iOS](https://www.ng.bluemix.net/docs/api/content/api/mobilefirst/ios/CloudantToolkit_api-doc/html/index.html) for the list of APIs.

 Here is a screenshot of the BlueList sample:

![image](/assets/img/2015/01/iosrep1.png)

 In order to try it yourself follow the instructions on the [IBM MobileFirst Platform for iOS Bluelist Sample App](https://hub.jazz.net/project/mobilecloud/imf-bluelist/overview) landing page. You can find the replication code in [ListTableViewController.swift](https://hub.jazz.net/project/mobilecloud/imf-bluelist/overview#https://hub.jazz.net/gerrit/plugins/gerritfs/contents/mobilecloud%252Fimf-bluelist/refs%252Fheads%252Fmaster/bluelist-swift/bluelist-swift/ListTableViewController.swift).

 If you want to find out more attend the webinar today (January 14, 2015 | 11:00 a.m. Eastern / 8:00 a.m. Pacific) – [How To: Developing iOS Apps on Bluemix using IBM MobileFirst Platform for iOS](https://event.on24.com/eventRegistration/EventLobbyServlet?target=registration.jsp&eventid=914506&sessionid=1&key=A234DBC2A8ECC132B81DB65737BD0EC3&partnerref=CL011415-IBMsocial&sourcepage=register).