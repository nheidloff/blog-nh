---
id: 3167
title: 'Developing Serverless Web Applications on the IBM Cloud'
date: '2018-12-05T11:51:39+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3167'
permalink: /article/serverless-web-applications-ibm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7088571339'
custom_permalink:
    - article/serverless-web-applications-ibm/
categories:
    - Articles
---

With serverless platforms like [IBM Cloud Functions](https://console.ng.bluemix.net/openwhisk) different types of scenarios can be built. Very common scenarios are APIs and web applications. I’ve open sourced some code that shows how to build and deploy a completely serverless web application on the IBM Cloud in less than 10 minutes.

Check out my [repo](https://github.com/nheidloff/serverless-web-application-ibm-cloud).

The sample contains not only serverless functions for the server side business logic of web applications, but also other components and functionality that you typically need like databases and API management. The static resources are also stored in the cloud without having to deploy servers. Additionally the authentication of users is done completely serverless as well.

Watch this 10 seconds [video](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/documentation/serverless-web-app.gif) to see the authentication flow.

This diagram describes the main components:

![image](/assets/img/2018/12/serverless-web-app.png)

I’ve written several scripts to make the deployment of the sample application very simple. A new IBM Cloud user should be able to set up the sample **in less than 10 minutes**. If you want to give it a try, get a [lite account](https://ibm.biz/nheidloff) (free, no credit card required), install the prerequisites and run the scripts as described in the repo.

The scripts create instances of Cloudant, App ID and Object Storage. Lite account users are limited to one instance per service which is why I’ve also documented how to use existing service instances.

I’ll blog more about how I’ve implemented the different parts over the next days. For now you can read the [README.md](https://github.com/nheidloff/serverless-web-application-ibm-cloud) and look at the screenshots in the [documentation](https://github.com/nheidloff/serverless-web-application-ibm-cloud/tree/master/documentation) folder.

To find out more about the used IBM services, follow these links:

- [IBM Cloud Functions](https://console.ng.bluemix.net/openwhisk) powered by [Apache OpenWhisk](https://openwhisk.apache.org/)
- [IBM Cloud Functions API Management](https://console.bluemix.net/openwhisk/apimanagement)
- [IBM Cloud Object Storage](https://console.bluemix.net/catalog/services/cloud-object-storage)
- [IBM App ID](https://console.bluemix.net/catalog/services/appid)
- [IBM Cloudant](https://console.ng.bluemix.net/catalog/services/cloudant-nosql-db)

Thanks to Andrea Frittoli for helping me with the App ID setup.

This article is part of a mini series. Check out the other articles and documentation:

- [Hosting Resources for Web Applications on the IBM Cloud]({{ "/article/hosting-static-web-resources-ibm-cloud" | relative_url }})
- [Authentication of Users in Serverless Applications]({{ "/article/user-authentication-serverless-openwhisk" | relative_url }})
- [User Authorization in Serverless Web Applications]({{ "/article/user-authorization-serverless-web-applications-openwhisk" | relative_url }})
- [Setup Instructions](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/README.md)
- [Screenshots](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/documentation/serverless-web-apps.pdf)