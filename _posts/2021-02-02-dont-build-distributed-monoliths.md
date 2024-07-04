---
id: 4379
title: "Don't build distributed Monoliths!"
date: '2021-02-02T15:44:02+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4379'
permalink: /article/do-not-build-distributed-monoliths/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/do-not-build-distributed-monoliths/
categories:
    - Articles
---

The topic microservices has been a hype topic for the last several years and many developers are using this concept when structuring and implementing code nowadays. However, as always, every technology has advantages and disadvantages. So when I’m asked whether microservices architectures make sense, my answer is: It depends!

Cloud native architectures and microservices clearly have a lot of benefits. One benefit is the simplicity of smaller modules. For example I used to work on a product that had grown for many years and it had several millions line of code. Developers were scared to change even a few lines since the affects were not predictable. As a result productivity was very low. Smaller services would certainly have helped a lot to handle the complexity.

**Distributed Monoliths**

Because of this breaking down monoliths in multiple microservices might make sense. The key question is how to do this.

One anti pattern I’ve often seen is to have too many microservices where each microservice basically represents a single entity with typical CRUD operations, in many cases with pure RESTful APIs. In order to communicate between microservices often synchronous REST invocations are used.

This does not lead to service oriented architectures, but to distributed monoliths. There are too many dependencies which are even harder to handle in distributed environments than in monoliths.

One approach that helps defining microservices is domain-driven design. Additionally rather than using microservices another option is to use macroservices which are more course-grained. Especially when applications need to handle transactions these approaches should be considered.

**Event-driven Architectures**

Even when using more course grained micro- or macroservices the main challenge is how to handle dependencies between them. Synchronous invocations can easily lead to distributed monoliths again.

As always, there is not one single solution. But one possible solution you should consider are event-driven architectures rather than synchronous REST invocations.

Basically there are less dependencies and less or no blocking which leads to more loosely coupled services. However as long as multiple services need to work together in bigger systems there are obviously some dependencies.

There are a number of great talks and resources available describing the different alternatives. For example I like especially these talks:

- [The Many Meanings of Event-Driven Architecture – Martin Fowler](https://youtu.be/STKCRSUsyP0)
- [How Events Are Reshaping Modern Systems – Jonas Bonér](https://youtu.be/3V3pHm2Cpks)
- [Event-Driven Microservices – not (just) about Events! – Allard Buijze](https://youtu.be/DzGuDNHsOQ0)

Here are some of the patterns you should be familiar with when developing event-driven architectures.

- Event notifications: Events are sent to notify other services which can call back to find out details if necessary
- Event notifications with state transfer: Events are sent to other services including the new states of objects
- Event sourcing: All events are made persistent and the overall state of systems are aggregations of these events (which also allows time travels)
- CQRS: Read operations are optimized in separate components. More expensive write operations are handled separately and need to be synchronized.
- Command pattern: Commands are sent asynchronously and responses are sent back as events as well

**What’s next?**

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

In a future article I’ll describe how I’ve used events to de-couple two services.