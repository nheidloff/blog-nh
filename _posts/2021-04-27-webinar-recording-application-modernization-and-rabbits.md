---
id: 4500
title: 'Webinar Recording: Application Modernization and Rabbits'
date: '2021-04-27T08:18:37+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4500'
permalink: /article/webinar-recording-application-modernization-and-rabbits/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/webinar-recording-application-modernization-and-rabbits/
categories:
    - Articles
---

At We Are Developers I gave a talk about my application modernization example which shows how to modernize 10+ year-old Java applications with modern cloud-based technologies.

*Abstract*  
Are you curious to understand what application modernization has to do with rabbits? Do you want to learn how to modernize 10-year-old Java applications to gain benefits from the cloud? Do you want to try this yourself, following step-by-step instructions? Then you should attend this session!  
Application modernization doesn’t happen overnight magically. Fortunately, it doesn’t have to. Application modernization is a journey with multiple steps where every step adds value which I’ll demonstrate via an open-source example.

The [talk](https://vimeo.com/wearedevelopers/download/528262363/171975e79d) can be downloaded from Vimeo.

Alternatively you can watch the full first conference day on [YouTube](https://youtu.be/kgl1ZfpXYzE?t=368). My talk was the first one that day starting at 6:00 mins.

{% include embed/youtube.html id='kgl1ZfpXYzE' %}

The demos are available as open source: [Application Modernization – From Java EE in 2010 to Cloud-Native in 2021](https://github.com/IBM/application-modernization-javaee-quarkus)

You can run the example locally via Docker Desktop. There are also scripts and pipelines to deploy everything to Red Hat OpenShift.

The sample explains how to modernize applications in multiple steps:

1. Monolith – WebSphere Traditional 8.5.5: Java EE 6 app from 2008 with Db2 database running in VMs or bare metal.
2. Monolith – WebSphere Traditional 9 in container: Application converted with Transformation Advisor.
3. Monolith – WebSphere Liberty: Application converted with Eclipse Migration Tools.
4. Separated frontend: Dojo frontend in separate container.
5. Monolith – Open Liberty: Modern project structure.
6. Strangled Catalog Service and remaining Open Liberty Monolith: Strangled catalog service (inspired by Mono2Micro) developed with Quarkus and Postgres. Event driven architecture via Kafka.
7. Strangled Catalog Service and remaining Quarkus Monolith: Strangled Quarkus catalog service uses reactive programming model. Remaining Quarkus monolith runs as native executable.
8. Micro frontend based web application: Developed with single-spa and Vue.js. Messaging is done via RxJS.
9. CI/CD via Tekton: Target OpenShift. Via OpenShift Pipelines operator.
10. CI/CD via Tekton and ArgoCD: Target OpenShift. Via OpenShift GitOps operator.

After the modernization the application consists of multiple components, microservices and micro frontends.

![image](/assets/img/2021/04/architecture-app-mod.png)