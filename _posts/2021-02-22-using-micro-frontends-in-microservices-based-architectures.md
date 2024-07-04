---
id: 4435
title: 'Using Micro Frontends in Microservices based Architectures'
date: '2021-02-22T08:04:13+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4435'
permalink: /article/using-micro-frontends-microservices/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/using-micro-frontends-microservices/
categories:
    - Articles
---

One of the advantages of microservices based architectures is that parts of applications can be updated independently from each other. However, in the process of modularizing applications the frontends are often forgotten.

While backend functionality is split in multiple microservices, the users interfaces often remain to be monoliths. This article describes how to use micro frontends as a technique to use the concept of microservices for web applications.

The article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

**Micro Frontends**

Let’s take a look at a [definition](https://martinfowler.com/articles/micro-frontends.html) of micro frontends on the blog from Martin Fowler.

> An architectural style where independently deliverable frontend applications are composed into a greater whole

You want to be able to update parts of the user interface without having to update the complete web application. In the optimal case there are even separate CI/CD pipelines for the different parts of the user interface.

The sample e-commerce application has different pages for browsing the shop, displaying the shopping cart and managing account information. The following screenshot shows the structure of the web application. There is a navigator in the left column and based on the selection in the navigator, different information is displayed in the main area of the window.

![image](/assets/img/2021/02/modernized-ui-1.png)

**Sample Scenario**

The products in the catalog only have titles, pictures and descriptions. Let’s say you want to add rating functionality. Rating functionality is only needed in the catalog of the e-commerce application. The other services ‘shopping cart’ and ‘account information’ are pretty separate from it.

In order to implement this new functionality, different parts of the stack need to be changed:

- Database
- Business functionality / backend microservice
- User interface / micro frontend

Here is how I’ve broken down the web application in six parts.

![image](/assets/img/2021/02/app-mod-single-spa-breakdown.png)

The navigator, the catalog, the order interface and the account page are separate web applications. I’ve used Vue.js to implement the different parts, but you can use any other technology: Vanilla JavaScript, React, Web Components, Angular, etc.

Note: The main reason for using micro frontends is modularization and independent updates, not a mixture of different web frameworks since this can lead to [micro frontend anarchy](https://www.thoughtworks.com/radar/techniques/micro-frontend-anarchy).

**Single-Spa**

As framework I’ve used [single-spa](https://single-spa.js.org/docs/getting-started-overview), a Javascript router for front-end microservices. This frameworks federates the different user interface components on client side.

> single-spa takes inspiration from modern framework component lifecycles by abstracting lifecycles for entire applications. … Microfrontends enable many benefits such as independent deployments, migration and experimentation, and resilient applications.

The shell component in my sample has been implemented with JavaScript. It defines the structure of the application.

The messaging component has been implemented with JavaScript as well or to be more precise with [RxJS](https://github.com/ReactiveX/rxjs). This component is the counterpart to messaging services like Kafka in the backend. It allows the same loosely coupling of components through event driven architectures.

**What’s next?**

In my next articles I’ll describe single-spa, the shell component and the messaging component in more detail.

To learn more about application modernization, check out my blog series in the GitHub [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).