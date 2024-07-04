---
id: 4200
title: 'Workshop: Modernizing IBM WebSphere Applications'
date: '2020-11-05T10:04:54+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4200'
permalink: /article/workshop-modernizing-ibm-websphere-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/workshop-modernizing-ibm-websphere-applications/
categories:
    - Articles
---

There are several examples showing how to modernize WebSphere applications. The best one I’ve found so far is the “Customer Order Services” application which is a simple store-front shopping application.

**Overview**

The application is an older Java EE application using a three tier architecture, Java EJBs, Dojo for the web frontend and DB2 databases. Check out the [description](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/was90/README#application-overview) for more details. This is the web application:

![image](/assets/img/2020/11/app-modernization-sample-web-png.png)

The workshop describes how to modernize a WebSphere traditional 8.5 application in two steps:

1. Containerize the application and run it as-is on OpenShift
2. Update application to Liberty and modernize it with MicroProfile

At this point there are two versions of the workshop describing slightly different functionality which is why I refer to both below.

**1. Deploy WebSphere Application on OpenShift**

The WebSphere 8.5 application is converted to WebSphere traditional 9.0 with the Transformation Advisor without changing any code. After this it is put into a container and configuration files are created to deploy the app on OpenShift.

- [Modernization Playbook](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/was90/README)
- [Workshop](https://ibm.github.io/teaching-your-monolith-to-dance/operational-modernization/)
- [Modernization Playbook- How to use Transformation Advisor](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/was90/tWAS-analyze)
- [Workshop – How to use Transformation Advisor](https://ibm.github.io/teaching-your-monolith-to-dance/operational-modernization/extras/WAS-analyze.html)
- [Modernization Playbook – Deploy DB2 container with ORDER database](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/liberty/db2)
- [Modernization Playbook – Code](https://github.com/ibm-cloud-architecture/appmod-liberty-tekton)
- [Workshop – Code (branch was90)](https://github.com/IBM/teaching-your-monolith-to-dance/tree/was90)
- [Modernization Playbook – Tekton pipeline](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/was90/tWAS-deploy)

**2. Convert WebSphere Application to Liberty Application and deploy it on OpenShift**

In this second step the application is converted into a Liberty application with Transformation Advisor. Only a couple of lines of code have to be changed, esp. the EJB code.

Additionally the app is ‘cloud-natived’ via MicroProfile so that it can leverage capabilities of the Kubernetes orchestration framework:

- Health checks
- Security and Keycloak
- External configuration and secrets
- Metrics

- [Modernization Playbook](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/liberty)
- [Workshop](https://ibm.github.io/teaching-your-monolith-to-dance/operational-modernization/)
- [Modernization Playbook – How to use Transformation Advisor](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/liberty/liberty-analyze)
- [Workshop – How to use Transformation Advisor](https://ibm.github.io/teaching-your-monolith-to-dance/runtime-modernization/extras/liberty-analyze.html)
- [Modernization Playbook – Deploy DB2 container with ORDER database](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/liberty/db2)
- [Workshop – Code (branch liberty)](https://github.com/IBM/teaching-your-monolith-to-dance/tree/liberty)
- [Modernization Playbook – Tekton pipeline](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/liberty/liberty-deploy-openshift-pipelines)

To run this workshop you need an OpenShift cluster. You can either use CodeReady Containers locally or [Red Hat OpenShift on IBM Cloud](https://www.ibm.com/cloud/openshift).