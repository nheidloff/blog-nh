---
id: 1991
title: 'Tools for Node.js Developers on Bluemix'
date: '2016-03-22T08:59:43+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1991'
permalink: /article/tools-node-nodejs-developers-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/tools-node-nodejs-developers-bluemix/
dsq_thread_id:
    - '4683063941'
categories:
    - Articles
---

[Bluemix](https://bluemix.net) provides various tools that help [Node.js](https://nodejs.org/en/) developers to build JavaScript applications. Below is a quick overview of tools that I use regularly.

**IBM Node.js Tools for Eclipse (beta)**  
With this Eclipse [plugin](https://marketplace.eclipse.org/content/ibm-nodejs-tools-eclipse-beta) developers get several tools to build Node applications. For example npm install can be triggered and applications can be launched directly from the IDE (including debug mode).

Here is a screenshot of the wizard to create new projects based on Express or LoopBack.

![image](/assets/img/2016/03/tooling-node-3.jpg)

There is also JavaScript validation and content assist for popular Node frameworks.

![image](/assets/img/2016/03/tooling-node-4.jpg)

Read the article [Introducing IBM Node.js Tools for Eclipse Beta](https://strongloop.com/strongblog/introducing-ibm-node-js-tools-for-eclipse-beta/) for more information.

**IBM Eclipse Tools for Bluemix**  
With this [plugin](https://marketplace.eclipse.org/content/ibm-eclipse-tools-bluemix) you can deploy and update applications directly on Bluemix from your IDE. Watch the video [Create a Node.js application using IBM Eclipse Tools for Bluemix](https://developer.ibm.com/bluemix/2015/02/23/create-node-js-application-using-ibm-eclipse-tools-bluemix-ibm-watson-service/) for more information.

**IBM Bluemix DevOps Services**  
[DevOps services](https://hub.jazz.net/features/) provide a lot of tools for Node developers. Just to name a few: There are GIT repositories, DevOps pipelines and integrated project management. Node developers can even use the web IDE to change code directly on the server.

When the [Live Edit](https://console.ng.bluemix.net/docs/develop/bluemixlive.html) option is enabled in the web IDE changes take effect immediately. The same functionality even works when doing changes locally via Desktop Sync that comes with the bluemix CLI (Bluemix command line interface).

![image](/assets/img/2016/03/tooling-node-5.jpg)

Developers can also debug applications in the cloud via the integrated Node Inspector. Read the [documentation](https://hub.jazz.net/features/) to find out more.

**CLIs**  
Developers who are familiar with the [Cloud Foundry CLI](https://console.ng.bluemix.net/docs/cli/reference/cfcommands/index.html) can use it to deploy and manage applications and services. Alternatively the [Bluemix CLI](https://developer.ibm.com/bluemix/2016/02/25/bluemix-cli/) can be used which provides a unified way to interact with Cloud Foundry, Docker, Virtual Machines and more.

**App Management Utilities**  
App Management is a set of development utilities including a web based shell, debugging capabilities and a Health Center agent so that, for example, you can analyze the performance of your app. Additionally for StrongLoop applications metrics, profiling and tracing can be used. Read the [documentation](https://console.ng.bluemix.net/docs/manageapps/app_mng.html#app_management) to find out more.