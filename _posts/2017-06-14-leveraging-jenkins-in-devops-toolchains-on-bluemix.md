---
id: 2366
title: 'Leveraging Jenkins in DevOps Toolchains on Bluemix'
date: '2017-06-14T09:31:51+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2366'
permalink: /article/jenkins-devops-toolchains-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/jenkins-devops-toolchains-bluemix/
dsq_thread_id:
    - '5936721700'
categories:
    - Articles
---

As part of the IBM Bluemix [Continues Delivery](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/index.html#cd_getting_started) functionality [toolchains](https://www.ibm.com/devops/method/category/tools/) allow the integration of third party and open source tools. One example is the usage of the automation server [Jenkins](https://jenkins.io/) to build and deploy applications rather than using the delivery pipelines provided by IBM.

In order to test this functionality I’ve run a Docker [Jenkins container](https://hub.docker.com/_/jenkins/) locally. Obviously you could also deploy Jenkins on Bluemix but I wanted to keep it as simple as possible.

In order to configure Jenkins, I suggest to follow the [instructions](https://wiki.jenkins-ci.org/display/JENKINS/IBM+Cloud+DevOps+Plugin#IBMCloudDevOpsPlugin-Notifyingtoolchains) from my colleague Eric Jodet in the Jenkins wiki since they are more up to date than the instructions in the Bluemix documentation currently. Also I struggled to get the Cloud Foundry deployment to work. I had to install the CF CLI manually on my container first.

Once everything is configured you can run Jenkins jobs.

![jenkins-devops1](/assets/img/2017/06/jenkins-devops1.png)

In order to send information to IBM Cloud DevOps different post build actions can be defined.

![jenkins-devops2](/assets/img/2017/06/jenkins-devops2.png)

Toolchains receive this data from Jenkins and can forward it to other tools like Slack that are in the same toolchains.

![jenkins-devops3](/assets/img/2017/06/jenkins-devops3.png)

I also like that deployment information is directly added to Git issues, for example links to toolchains and releases as well as labels to mark issues as deployed.

![jenkins-devops4](/assets/img/2017/06/jenkins-devops4.png)

To find out more read the [blog](https://www.ibm.com/blogs/bluemix/2017/06/integrate-jenkins-to-your-toolchain/) from Eric, read the [documentation](https://console.ng.bluemix.net/docs/services/DevOpsInsights/risk_jenkins.html#integrating-with-freeform-jenkins-projects) or try the sample toolchain “[Deployment Risk Analytics with GitHub and Jenkins](http://bluemix.net/devops)“.