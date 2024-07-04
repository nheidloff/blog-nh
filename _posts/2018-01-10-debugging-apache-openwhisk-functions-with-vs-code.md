---
id: 2745
title: 'Debugging Apache OpenWhisk Functions with VS Code'
date: '2018-01-10T11:33:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2745'
permalink: /article/debug-apache-openwhisk-functions-vscode/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6404103441'
custom_permalink:
    - article/debug-apache-openwhisk-functions-vscode/
categories:
    - Articles
---

As a developer I develop and debug code locally as much as possible. I’ve written some [sample code](https://github.com/nheidloff/openwhisk-debug-nodejs) that shows how to debug Node.js [OpenWhisk](https://github.com/apache/incubator-openwhisk) functions via [Visual Studio Code](https://code.visualstudio.com/).

The sample code explains how to debug single-file functions, zipped multi-file functions as well as Node.js functions in Docker containers.

The following screenshot shows how functions that run in Docker can be debugged from Visual Studio Code. In order to do this, a volume is used to share the files between the IDE and the container and VS Code attaches a remote debugger to the Docker container. The functions can be changed in the IDE without having to restart the container. [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

![image](/assets/img/2018/01/debugging-docker-3.png)

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-debug-nodejs)

Watch the [video](https://www.youtube.com/watch?v=P9hpcOqQ3hw) to see how to debug OpenWhisk functions with Visual Studio Code.

{% include embed/youtube.html id='P9hpcOqQ3hw' %}

If you want to try out OpenWhisk in the cloud, you can get a free account on the [IBM Cloud](http://ibm.biz/nheidloff).