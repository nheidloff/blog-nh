---
id: 3140
title: 'Hosting Static Web Application Resources on OpenWhisk'
date: '2018-10-15T13:59:13+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3140'
permalink: /article/openwhisk-static-web-resources/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6971929737'
custom_permalink:
    - article/openwhisk-static-web-resources/
categories:
    - Articles
---

The tutorial [Serverless Web Application and API](https://console.bluemix.net/docs/tutorials/serverless-api-webapp.html) describes how to develop serverless APIs and web applications via IBM Functions, the IBM Functions API Gateway and a No-SQL database. The static web resources are hosted via GitHub Pages. I’ve open sourced an extension to the tutorial that allows hosting web resources directly via [Apache OpenWhisk](https://openwhisk.apache.org/).

Get the [code](https://github.com/nheidloff/openwhisk-web-app-resources) from GitHub.

The repo contains an Apache OpenWhisk function to host static resources of web applications. The function has been implemented as Docker image so that web resources can be handled which are [bigger than 48 MB](https://console.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_syslimits_codesize).

After the deployment of the function, the web application is accessible via URLs like this one: https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/xxx/web/resources/index.html. In order to use a custom domain, check out the [documentation](https://console.bluemix.net/docs/api-management/manage_apis.html#custom_domains).

The project contains a sample Angular application, but the same mechanism works for other client-side web frameworks like React and Vue.js. Simply replace the files in the [docker/resources](https://github.com/nheidloff/openwhisk-web-app-resources/tree/master/docker/resources) directory.

Here is a screenshot:

![image](/assets/img/2018/10/serverless-web-1024x394.png)

If you want to try this functionality yourself, run these commands (change the Docker image name):

```
$ git clone https://github.com/nheidloff/openwhisk-web-app-resources.git
$ cd openwhisk-web-app-resources
$ npm install
$ cd docker
$ docker build -t nheidloff/openwhisk-web-app:1 .
$ docker push nheidloff/openwhisk-web-app:1
$ ibmcloud login
$ ibmcloud fn action create openwhisk-web-app --docker nheidloff/openwhisk-web-app:1 --web true
$ ibmcloud fn api create -n "angular-web-app" /web /resources get openwhisk-web-app --response-type http
```