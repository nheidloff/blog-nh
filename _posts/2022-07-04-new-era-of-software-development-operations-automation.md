---
id: 5113
title: 'New Era of Software Development: Operations Automation'
date: '2022-12-02T15:13:14+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5113'
permalink: /article/new-era-software-development-automation-operations/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/new-era-software-development-automation-operations/
categories:
    - Articles
image: /assets/img/2022/03/Screenshot-2022-03-21-at-16.20.13.png
---

*Kubernetes Operators provide incredible value since operations of software can be automated. This blog post describes operators on a high level and introduces a new reference architecture which my team has developed.*

## Evolution: 20 Years ago

When I started my career 20+ years ago, usually developers only wrote code, some even without writing tests because that was supposed to be done by separate teams.

## Evolution: 10 Years ago

10 years ago developers and technical leads realized that this was not sufficient. The concept of DevOps was born and over the last years most companies adopted it. Developers work now together with Ops engineers and are together responsible for the whole software development lifecycle including operations. For example DevOps teams write automation for deployments of software in different environments via CI/CD.

## Evolution: Today

Now a new era of software development has started. Rather than ‘only’ automating the deployments of software, operation tasks are automated. This is usually referred to as day 2 tasks, while day 1 tasks are focussed on deployments.

Operating software in custom clusters, no matter what clouds, on premises or on edge devices can become quite expensive since issues are often hard to discover, debug and analyse, especially if people need to do this who are not SRE (service reliability engineers) for specific software.

## Kubernetes Operators

The solution? Kubernetes Operators. An incredibly powerful technology to automate operations. The main concept behind it is GitOps. Custom logic synchronizes the ‘to be state’ with the ‘as is state’. This concept is used intensively within Kubernetes and can be used for custom applications as well.

I like the Software as a Service approach a lot, since it is the easiest way to consume services. However, in some cases this doesn’t work, for example since certain data needs to reside at certain locations or services need to be customized. I think using the Kubernetes Operators technology is the next best way to consume software. Plus Kubernetes Operators allow companies to reliably host software which manages itself.

## Operators Reference Architecture

My team has created a reference architecture how to build Kubernetes Operators which goes above and beyond what the Operator SDK and Kubebuilder tutorials provide. Check it out!

- [Operators Reference Architecture – Source Code](https://github.com/ibm/operator-sample-go)
- [Operators Reference Architecture – Documentation](https://ibm.github.io/operator-sample-go-documentation/)

## Overview Video

We’ve created a 40 minutes [video](https://youtu.be/D6njEyXPieg) that describes the project on a high level.

{% include embed/youtube.html id='D6njEyXPieg' %}

If you are an IBM partner who is interested in building operators, reach out to us! We can help.

Authors:

- [Adam de Leeuw](https://www.linkedin.com/in/deleeuwa/)
- [Thomas Südbröcker](https://twitter.com/tsuedbroecker)
- [Alain Airom](https://twitter.com/AAairom)
- [Diwakar Tiwari](https://twitter.com/diwakarptiwari)
- [Vishal Ramani](https://www.linkedin.com/in/vishalramani/)
- [Niklas Heidloff](https://twitter.com/nheidloff)