---
id: 1049
title: 'Zero Downtime Deployments for Bluemix Apps'
date: '2015-01-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/zero-downtime-deployments-for-bluemix-apps/'
permalink: /article/06.01.2015140455NHEHCN.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/06.01.2015140455NHEHCN.htm/
dsq_thread_id:
    - '4343145546'
categories:
    - Articles
---

Here is a quick tip for how to deploy new versions of your apps without downtimes. We use this technique to update [Bluemix.info](http://bluemix.info), the news aggregator for IBM Bluemix professionals. The information below isn’t new and has been documented before, but I thought I share it if people are new to Bluemix. It was certainly something I wasn’t aware of until recently.

There is a technique called [Blue-Green Deployments](https://www.ng.bluemix.net/docs/#manageapps/index-gentopic3.html#d2e1). The basic mechanism is straight forward:  
1\) Deploy the new version of your app in parallel to your current version with a different name  
2\) Use the same route (URL) for the old and the new version so that both versions are active at the same time  
3\) Remove the old version

Read the [Bluemix documentation](https://www.ng.bluemix.net/docs/#manageapps/index-gentopic3.html#d2e1) for details. There is also a [script](https://hub.jazz.net/project/wascloud/Buildpack_Utilities/overview) to invoke the three steps. My colleague James Thomas has created a short video demonstrating this functionality.

{% include embed/youtube.html id='yfLi2hLfgSU' %}

You can also leverage this technique when using IBM DevOps. Check out this [article](http://www.ibm.com/developerworks/cloud/library/cl-bluemix-rollingpipeline/).