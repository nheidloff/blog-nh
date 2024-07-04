---
id: 2051
title: 'Developing OpenWhisk Actions via the new Web Editor'
date: '2016-04-25T10:02:27+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2051'
permalink: /article/openwhisk-actions-editor/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openwhisk-actions-editor/
categories:
    - Articles
---

In addition to Cloud Foundry, Docker and Virtual Maschines [Bluemix](https://bluemix.net) provides a fourth compute option [OpenWhisk](https://developer.ibm.com/openwhisk/). OpenWhisk is an event-driven compute platform that executes code in response to events or direct invocations without having to maintain servers. The advantage is that you only have to pay for actual usage, not for peaked projections.

As I blogged about earlier you can [write OpenWhisk actions in JavaScript and Swift]({{ "/article/how-to-write-javascript-actions-openwhisk" | relative_url }}). The actions can be deployed via CLI (command line interface) and now also with the [new web editor](https://developer.ibm.com/bluemix/2016/04/21/bluemix-openwhisk-web-editor/) which makes it easier for developers like me who cannot remember all commands of the various command line tools.

The screenshot shows the same translation action from the previous blog. Logs show up in the console.

![image](/assets/img/2016/04/openwhiskeditor2.png)

In order to invoke actions the editor shows the endpoint and curl command.

![image](/assets/img/2016/04/openwhiskeditor1.png)

Another nice feature is the list of public actions and triggers that are displayed in the right column. When clicked, the documentation of these packages is displayed and you can use the source code of these packages as samples and starting points for your own actions.

![image](/assets/img/2016/04/openwhiskeditor3.png)