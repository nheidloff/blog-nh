---
id: 2349
title: 'Reducing Deployment Risks via Policies in DevOps Pipelines'
date: '2017-06-12T13:34:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2349'
permalink: /article/reduce-deployment-risk-devops-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/reduce-deployment-risk-devops-bluemix/
dsq_thread_id:
    - '5943602277'
categories:
    - Articles
---

Earlier this year IBM [introduced](https://www.ibm.com/blogs/bluemix/2017/03/announcing-devops-insights-beta/) a new service [DevOps Insights](https://console.ng.bluemix.net/docs/services/DevOpsInsights/index.html#gettingstarted) (beta) which helps among other things to reduce deployment risks. Policies can be defined to ensure that unit tests, functional tests and other tests pass before new versions of applications are deployed.

The following screenshot shows the DevOps Insights dashboard with a sample application that contains two deployable units, one microservice and one web application. For each deployable unit icons indicate which tests have been run for which environments and whether they have been successful.

![devops-insights1](/assets/img/2017/06/devops-insights1.png)

[Gates](https://console.ng.bluemix.net/docs/services/DevOpsInsights/risk_cd.html#integrating-with-continuous-delivery-pipeline) can be inserted into the delivery pipelines to ensure certain policies are met before the pipeline executions continue. In this screenshot the staging gate failed because not all unit tests have passed and this caused the pipeline to stop.

![devops-insights3](/assets/img/2017/06/devops-insights3.png)

In order to leverage gates use the tester type “DevOps Insights Gate” in the configuration of your pipeline stages and link to a policy.

![devops-insights4](/assets/img/2017/06/devops-insights4-1024x1003.png)

With policies you can define how many and which exact unit tests, functional verification tests, etc. need to pass.

![devops-insights2](/assets/img/2017/06/devops-insights2.png)

If you want to try out this functionality, you can easily set up one of the [toolchain samples](https://console.ng.bluemix.net/devops/create?env_id=ibm:yp:us-south) which come with the DevOps Insights service.