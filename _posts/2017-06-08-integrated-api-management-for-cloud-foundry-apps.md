---
id: 2338
title: 'Integrated API Management for Cloud Foundry Apps'
date: '2017-06-08T08:53:08+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2338'
permalink: /article/api-management-cloud-foundry/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/api-management-cloud-foundry/
dsq_thread_id:
    - '5936571458'
categories:
    - Articles
---

Last week IBM [introduced](https://developer.ibm.com/apiconnect/2017/06/01/introducing-bluemix-native-api-management-cf-apps-integrated-api-tooling-market/) a new feature in [IBM Bluemix](https://bluemix.net). Developers can now easily add API management functionality to their Cloud Foundry apps hosted on Bluemix.

The end-to-end API lifecycle solution [API Connect](https://console.ng.bluemix.net/catalog/services/api-connect/?env_id=ibm:yp:us-south) has been available in Bluemix for quick some time. With the recent addition it’s much easier to leverage this functionality since everything can be configured from the application dashboards.

I’ve just tried it for a simple sample where only developers with a key (and optionally secret can invoke APIs). API definitions can be imported via Swagger/OpenAPI definitions. My app exposes some REST APIs for which I enforce a key in a header.

![integratedapi1](/assets/img/2017/06/integratedapi1.png)

In the next step I can expose the managed API which means that it’s not longer possible to invoke it without the key. At the bottom of this screenshot I can create an API key and a get a link to an API explorer.

![integratedapi2](/assets/img/2017/06/integratedapi2.png)

The API explorer allows me to test the APIs and it passes in the key.

![integratedapi3](/assets/img/2017/06/integratedapi3.png)

To find out more you can follow the [getting started tutorial](https://github.com/ibm-apiconnect/getting-started/tree/master/native).