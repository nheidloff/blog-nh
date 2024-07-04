---
id: 3878
title: 'Podcasts about Cloud-Native-Starter Open Source Project'
date: '2020-01-16T09:22:32+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3878'
permalink: /article/podcasts-open-source-cloud-native-starter/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/podcasts-open-source-cloud-native-starter/
categories:
    - Articles
---

I had the pleasure to get interviewed in two [airhacks.fm](http://airhacks.fm/) podcasts by Java guru [Adam Bien](https://twitter.com/adambien). It was a lot of fun.

The first podcast [\#63 NodeJS, MicroProfile and Java Cloud Native Starter](http://airhacks.fm/#episode_63) was primarily about my career. In the second one [\#66 Kubernetes, OpenShift, istio, Postgres, Clouds, Backend for Frontend, vue.js and MicroProfile](http://airhacks.fm/#episode_66) Adam and I talked about the cloud-native-starter project.

My colleagues Harald Uebele, Thomas Südbröcker and I created this project to help developers to learn how to develop and operate microservices. Cloud Native Starter is an open source project that demonstrates how to develop complete enterprise applications with Java and MicroProfile and how to operate them with Kubernetes and Istio.

Cloud Native Starter explains how to use the following technologies together:

- Quarkus
- Open Liberty and Eclipse JakartaEE
- Eclipse MicroProfile
- Kubernetes and Istio

In the podcast Adam and I go over all microservices and talk about how they have been implemented and what patterns they use.

Adam also provided great feedback. His first point was that a landing page is missing. Since I thought that this is a good idea, I put a page quickly together which is now hosted on the IBM Cloud:

Check out the new [Cloud Native Starter](https://cloud-native-starter.mybluemix.net/) home page.

The page describes the project, the technologies and functionality and points to blogs, talks and workshops.

![image](/assets/img/2020/01/csn-landingpage.png)

My colleague Miriam Oglesby also blogged about the podcasts. Read her blog [Conversations with Adam Bien](https://developer.ibm.com/blogs/conversations-with-adam-bien-cloud-native-starter/) on IBM Developer to find out more about Adam and the podcasts.

Recently I’ve worked on significant extensions to the project. I’ve added samples that show how to do reactive programming with Quarkus, MicroProfile, Vert.x, Kafka and Postgres. I’ve planned to do a series of blog entries about these topics soon. In the meantime take a look at the [reactive](https://github.com/IBM/cloud-native-starter/tree/master/reactive) folder of the Clodu Native Starter project which contains the code and documentation.