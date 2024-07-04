---
id: 2606
title: 'Fast On-Ramp for building Cloud-Native Apps'
date: '2017-10-17T09:32:12+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2606'
permalink: /article/on-ramp-cloud-native-apps/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/on-ramp-cloud-native-apps/
dsq_thread_id:
    - '6220930917'
categories:
    - Articles
---

In order for developers to get started quickly to build applications and deploy them on the IBM Cloud, new starter kits have been made available. Check out the new [IBM Cloud App Service](https://console.bluemix.net/developer/appservice/starter-kits).

You can choose from several template the type of application or microservice you want to build: Express.js Backend, Express.js React, Java MicroProfile, Java Spring Backend, Swift Kitura, Python Microservice and more. Additionally you can create new or select existing IBM Cloud services, for example the Watson services, to bind them to your applications and to generate code that shows how to use the services.

![image](/assets/img/2017/10/app-starter-kits1.png)

Optionally toolchains can be created to store the code in a Git respository and to deploy it via delivery pipelines. In the easiest case developers can invoke a ‘git push’ which triggers directly the deployment, for example into a Kubernetes cluster.

![image](/assets/img/2017/10/app-starter-kits2.png)

This is a screenshot of the generated code of a backend-for-frontend API Nodes.js project. It contains a Cloud Foundry manifest file, a Dockerfile and Kubernetes helm charts.

![image](/assets/img/2017/10/app-starter-kits3.png)

If you are a Node.js developer, you might also be interested in the new [NodeServer Generator](https://www.npmjs.com/package/generator-nodeserver), which is a Yeoman generator to create production-ready applications.