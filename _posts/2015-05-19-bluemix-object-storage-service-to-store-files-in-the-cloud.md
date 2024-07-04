---
id: 1261
title: 'Bluemix Object Storage Service to store Files in the Cloud'
date: '2015-05-19T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/bluemix-object-storage-service-to-store-files-in-the-cloud/'
permalink: /article/19.05.2015122403NHEE84.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/19.05.2015122403NHEE84.htm/
dsq_thread_id:
    - '4323391715'
categories:
    - Articles
---

 [IBM Bluemix](http://bluemix.net/) provides object storage services to store and manage various types and large amounts of files by providing high-available, cloud-based storage that scales, is secure and cost-effective. The Bluemix services use [SoftLayer Object Storage](http://www.softlayer.com/object-storage) and make it easy to consume for Bluemix developers by provisioning accounts automatically when services are added to apps. SoftLayer Object Storage is based on the [OpenStack Swift project](http://docs.openstack.org/developer/swift/) so that you can use standard [APIs](https://wiki.openstack.org/wiki/SDKs) to access your files.

 Bluemix offers two different versions of the object storage as beta – [Object Storage version 1](https://www.ng.bluemix.net/docs/services/ObjectStorage/index.html) and [Object Storage version 2](https://www.ng.bluemix.net/docs/services/ObjectStorageV2/index.html). I originally assumed that version 2 is a successor of version 1 but the two versions actually address slightly different needs. Version 1 is similar to most other Bluemix services where you get your own account provisioned when adding a service to your CloudFoundry app. For example you could even have two accounts within one space. Version 2 provides a flexible usage model to allow usage of the same service not only from CloudFoundry apps, but also from containers or VMs or even outside of the public Bluemix context. When adding version 2 to an app the service creates a public cloud tenant and Swift account per Bluemix organization. You can then access your account also via the Cloud Management Dashboard to manage your containers, folders, files, etc.

![image](/assets/img/2015/05/cloudmd.png)

 There are several tutorials available how to use the object storage services. The tutorial [Build a cloud storage application](http://www.ibm.com/developerworks/cloud/library/cl-cloud-storage-app/index.html) describes how to develop a Node.js application, how to do the authentication, how to list and upload files, etc. The tutorial [Fine-grained access control for the Bluemix Object Storage service](http://www.ibm.com/developerworks/library/se-object-storage-single-sign-on-app/index.html) explains how to use the Single Sign On Service in a Node.js application to ensure that certain users of your app can only access files to which they have access.

 This morning when I was trying to build a Java sample I ran into a [deck](http://www.slideshare.net/JosephChang8/using-java-to-access-bluemix-object-storage-v2) from my colleague Joseph Chang who has done this already and published his [sample](https://github.com/whitfiea/bluemix-objectstorage-v2). He uses the Java library [Apache jclouds](http://jclouds.apache.org/guides/openstack/#swift) and reads the credentials from the Bluemix environment.

<iframe allowfullscreen="" frameborder="0" height="485" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/he8VVkUUmo9JFa" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="595"> </iframe>

<div style="margin-bottom:5px"></div>