---
id: 4132
title: "Modernizing Java Applications with IBM's Transformation Advisor"
date: '2020-07-28T09:40:30+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4132'
permalink: /article/modernizing-java-applications-with-ibms-transformation-advisor/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/modernizing-java-applications-with-ibms-transformation-advisor/
categories:
    - Articles
---

This article describes how to use [IBM’s Transformation Advisor](https://www.ibm.com/us-en/marketplace/cloud-transformation-advisor) tool which helps transforming Java EE applications that run, for example on WebSphere Liberty, into cloud-native applications and microservices.

Here is the description from the home page:

> IBM Cloud Transformation Advisor helps you access, analyze and modernize middleware based apps into IBM Cloud(s). It categorizes Java EE apps and MQ queue managers as simple, medium and complex based on migration complexity and provides guidance for modernization. Modernization with IBM Cloud Transformation Advisor can help an organization adopt an agile approach for version currency, Dev/Test, deployment and scalability resulting in rapid innovation across the enterprise.

There are several ways and tutorials in order to use the Transformation Advisor tool which is part of [IBM Cloud Pak for Applications](https://www.ibm.com/demos/collection/Cloud-Pak-for-Applications/?lc=en):

- [Workshop Application Modernization](https://ibm-developer.gitbook.io/cloudpakforapplications-appmod/#application-modernization)
- [Modernize Java Apps using IBM Transformation Advisor and IBM Cloud Pak for Applications](https://www.ibm.com/cloud/garage/dte/tutorial/cloud-enabled-use-case-modernize-java-apps-using-ibm-transformation-advisor-and-cloud-pak)
- [App Modernization with IBM Cloud Pak for Applications Products and Solutions POT](https://bluedemos.com/show/2459)
- [Transform your traditional on-premises app and deploy it as a containerized app on a public or private cloud](https://developer.ibm.com/patterns/app-modernization-transformation-advisor-cloud-private/)
- [Transform your traditional on-premises app and deploy it as a containerized app on a public cloud](https://developer.ibm.com/technologies/java/patterns/modernize-apps-with-ibm-transformation-advisor)
- [Transformation Advisor documentation](https://www.ibm.com/support/knowledgecenter/en/SS5Q6W/welcome.html)
- [IBM Application Modernization Field Guide](https://www.ibm.com/cloud/architecture/files/app-modernization-field-guide.pdf)

I have used the Application Modernization workshop. These are the main steps:

1. Create an OpenShift cluster on the IBM Cloud
2. Open the OpenShift Web Console and create a project
3. Deploy Cloud Pak for Applications in your OpenShift cluster from the IBM Cloud software catalog and refer to your project
4. Rather than gathering real data from your WebSphere server, you can use the test data from this [repo](https://github.com/eswarak/modernizeapplication-ta)

In order to launch Transformation Advisor, open the OpenShift Web Console. In the drop down menu a new entry has been added to launch the Cloud Pak Console which displays a link to launch different tools.

![image](/assets/img/2020/07/transformationadvisor1.png)

After you have imported the test data, the results are displayed for the separate components.

![image](/assets/img/2020/07/transformationadvisor2.png)

In this case the application is supposed to be transferred from WebSphere Liberty to Open Liberty.

![image](/assets/img/2020/07/transformationadvisor3.png)

In order to find out more about the Transformation Advisor watch the webinar [App Modernization for your Enterprise](https://www.youtube.com/watch?v=XMh2zhMUQ4w).