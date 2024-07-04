---
id: 258
title: 'How to create your own Domino XPages Server in the IBM SmartCloud'
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/how-to-create-your-own-domino-xpages-server-in-the-ibm-smartcloud/'
permalink: /article/04122011020116AMNHE93V.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
custom_permalink:
    - article/04122011020116AMNHE93V.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316545202'
categories:
    - Articles
---

 Yesterday Ed Brill [blogged](http://www.edbrill.com/ebrill/edbrill.nsf/dx/eweek-ibm-launches-smart-public-cloud-platform-for-business) about the [IBM SmartCloud](http://www.ibm.com/cloud-computing/us/en/) and the availability of the Domino Utility Server for LotusLive:

 “IBM also is enabling customers to deploy their Lotus Domino applications to the IBM SmartCloud with the Lotus Domino Utility Server for LotusLive. LotusLive provides integrated email, social business and third-party applications from the cloud. The new server licensing model extends customer deployment options for Domino applications from on-premises to cloud. With the immediate availability of the Domino Utility Server for LotusLive, clients can now move applications to the IBM SmartCloud – Enterprise and take advantage of fixed, predictable pricing and flexible deployment.”

 My blog (heidloff.net) actually runs on the IBM SmartCloud. Yesterday I documented in the Application Development Wiki how to set up an instance and connect to it. The [full article](http://www-10.lotus.com/ldd/ddwiki.nsf/dx/IBM_Lotus_Domino_on_the_IBM_Development_and_Test_Cloud) is in the wiki, below are some highlights.

 In the first step you can choose between the different instance types. The instance types differentiate between development and test hosting (Development Use Only – DUO) on the one hand side and hosting of production applications on the other hand side. Production instances differentiate whether or not they include the base IBM Lotus Domino license (Commercial Pay As You Go – PAYG) or if customers provide their own license (Commercial Bring Your Own License – BYOL).

 The screenshot (taken on Friday) shows the three Enterprise Server instances. The three Utility Server instances were added yesterday.

![image](/assets/img/2011/06/CreateInstance02.jpg)

 In the next step you define the server configuration and enter or generate a key that is used to access the server via Putty.

![image](/assets/img/2011/06/CreateInstance05.jpg)

 After the instance has been created you can connect to your Red Hat Enterprise Linux 5.5 server via VNC. This is useful for example when you want to download the cert.id from the file system.

![image](/assets/img/2011/06/DownloadIDs03s.gif)

 Check out the [cost estimator](http://www-935.ibm.com/services/us/igs/cloud-development/#tab:pricing-licensing/#leadspace:default) for pricing information.