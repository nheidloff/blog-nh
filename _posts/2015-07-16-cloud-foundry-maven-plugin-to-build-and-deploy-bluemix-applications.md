---
id: 1356
title: 'Cloud Foundry Maven Plugin to build and deploy Bluemix Applications'
date: '2015-07-16T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/cloud-foundry-maven-plugin-to-build-and-deploy-bluemix-applications/'
permalink: /article/15.07.2015162130NHEJUJ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
custom_permalink:
    - article/15.07.2015162130NHEJUJ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323871040'
categories:
    - Articles
---

 For some [people](https://github.com/IBM-Bluemix/todo-apps/tree/master/java) this is old news, but I just used for the first time the [Cloud Foundry Maven Plugin](https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-maven-plugin) to build and deploy a Bluemix application and it made the deployment really easy. Below are some of the key concepts I used.

 I built a Java application that leverages the [AlchemyAPI](https://console.ng.bluemix.net/catalog/alchemyapi/) service which at this point requires to go to a separate website and register an API key which is then stored in a [user provided service](http://heidloff.net/nh/home.nsf/article.xsp?id=16.12.2014110019NHEDRA.htm). Additionally I used [web sockets](http://heidloff.net/nh/home.nsf/article.xsp?id=09.07.2015083534NHE9RB.htm) and I had to set an environment variable to use this feature on [Liberty for Java](https://console.ng.bluemix.net/catalog/liberty-for-java/).

 With the Cloud Foundry Maven Plugin I can create user provided services, normal services, set environment variables and [much more](https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-maven-plugin). The pom.xml screenshot below shows the configuration of the plugin. To use the plugin you simply add it to your [pom.xml](https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-maven-plugin#configuration).

![image](/assets/img/2015/07/cfmavenplugin1.png)

 In order to invoke the build and deployment task you can execute the following command and pass in input parameters.

![image](/assets/img/2015/07/cfmavenplugin3.png)

 For the actual deployment to Bluemix the plugin requires your Bluemix credentials which are stored in a Settings.xml file in ~/.m2.

![image](/assets/img/2015/07/cfmavenplugin2.png)

 Update July 17th: You should use a profile as documented by Ryan below. Here is a [sample](https://github.com/IBM-Bluemix/drone-selfie/blob/master/pom.xml).