---
id: 4472
title: 'Video: Application Modernization in Baby Steps'
date: '2021-03-03T09:29:19+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4472'
permalink: /article/video-application-modernization-in-baby-steps/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/video-application-modernization-in-baby-steps/
enclosure:
    - "https://github.com/IBM/application-modernization-javaee-quarkus/raw/master/documentation/demos-frontends.mp4\n185\nvideo/mp4\n"
    - "https://github.com/IBM/application-modernization-javaee-quarkus/raw/master/documentation/demo-price-change.mp4\n187\nvideo/mp4\n"
categories:
    - Articles
---

Are you curious to learn how to modernize 10 years old Java applications to gain benefits from the cloud? Do you want to try this yourself following step by step instructions? Then you should check out my [repo](https://github.com/IBM/application-modernization-javaee-quarkus) which I’m going to describe in this article and the embedded [video](https://youtu.be/lw95LLqa37g).

{% include embed/youtube.html id='lw95LLqa37g' %}

**Application Modernization Strategies**

Application Modernization is not trivial. Before you get started, make sure you understand why you want to modernize applications. The main benefits can be categorized in three buckets. More agility, better user experiences and reduced costs. To learn more about these benefits, check out my [rabbit video](https://youtu.be/pEbRbrN3wAU). For me the number one reason is more agility, or in other words the ability adopt to changes and to innovate faster.

There are several different strategies how to handle legacy applications. One strategy is to simply retire them, if they are not used anymore. Another strategy is not to touch them, for example, if you don’t find developers with the appropriate skills anymore. The easiest way to move existing applications into the cloud is the “lift and shift” approach which doesn’t require any code changes. For me as developer the most exciting application modernization strategies are Containerization and Re-factoring. These strategies give you the maximal benefits of cloud native architectures and I demonstrate them in my sample.

**Sample Application**

Next let’s take a look at the sample application which is a simple e-commerce application. The example repo comes with multiple versions of the application. The original web frontend was implemented with Dojo Toolkit as a monolith. The modernized version uses loosely coupled Micro Frontends and has been implemented with Vue.js.

Let’s take a closer look at the [original version](https://github.com/IBM/application-modernization-javaee-quarkus/raw/master/documentation/demos-frontends.mp4). In the shop users can navigate between categories of products. Products can be added to shopping carts via drag and drop. The shopping carts are displayed in the right column and under the order history tab. The modernized application provides the same functionality. In the navigator categories can be selected and products can be added to shopping carts. The fully modernized application uses multiple databases, multiple backend microservices and multiple micro frontends. When you run it locally via Docker Desktop, 14 containers are used.

**Take Baby Steps**

Modernizing and re-factoring your own code is difficult. Modernizing legacy code from other developers is even more difficult. That’s why application modernization needs to be planned accordingly. The bad news is that application modernization doesn’t happen over night magically. The good news is that it doesn’t have to. Application modernization is a journey with multiple steps where every step adds value. My advice is: Take baby steps! Incremental updates help manage the complexity.

My sample shows how to modernize a Java EE 6 application in eight steps. Let’s take a look at the key steps. The original version uses a Db2 database and one WebSphere Traditional application for the backend and frontend functionality. Both components run in virtual machines. Via IBM’s Cloud Transformation Advisor the application was containerized. With the Eclipse WebSphere Migration Toolkit I changed the code to use the open source Jakarta EE server Open Liberty.

**Updating the Application Runtimes**

As result the frontend has been separated from the backend and the runtime has been updated to leverage a modern Java application server. Even without microservices this adds a lot of value. Applications can be managed consistently via OpenShift and license costs and resource usages are reduced.

For many legacy Java EE applications modernizing applications with modern application servers like Open Liberty is optimal. The big advantage of Java EE and now Jakarta EE is the upwards compatibility. Newer versions of Jakarta can still run old applications without any or minimal changes.

Monolithic architectures don’t have to be bad. In fact for many use cases they are easier and more pragmatic than microservices architectures. For example implementing transactions with multiple microservices is not trivial.

**Strangler Pattern**

On the other hand side, microservices based architectures come with several benefits, for example the ability to scale microservices independently from each other which is a technique I use in the sample app. The Strangler Pattern is a good way to start building microservices around existing monoliths. Essentially you externalize key functionality from monoliths in separate services without having to re-factor or re-implement everything.

The strangler pattern helps avoiding a common pitfall which is to build distributed monoliths. Microservices run in distributed environments. The more microservices you have, the more network traffic typically occurs. This adds complexity rather than reducing complexity which is one of the reasons microservices are used in the first place. When re-factoring applications the goal should not be to have microservices, but to de-couple components as much as possible which might or might not map to having microservices.

In my example I’ve used the IBM tool Mono2Micro to identify a good microservice candidate. The tool suggests to have a separate service for the catalog functionality. This makes sense, since now the catalog can be scaled separately from the actual order functionality.

**Event-driven Architectures**

When breaking down monoliths into microservices, it’s important to minimize the amount of dependencies between them. Synchronous REST API invocations between microservices are an anti pattern. Instead you should aim to use event driven architectures. This doesn’t fully eliminate dependencies, but minimizes them to achieve loosely coupled components.

Let me describe the changed architecture. The catalog microservice has been implemented with Quarkus. For the remaining monolith the repo comes with two examples: Open Liberty and Quarkus. The two backend components have separate databases and communicate via Kafka.

Let’s take a look at the [sample](https://github.com/IBM/application-modernization-javaee-quarkus/raw/master/documentation/demo-price-change.mp4) again. The strangled catalog service is rather isolated from the monolith, but still needs to know when prices of products change. The original price of ‘Return of the Jedi’ is 30. That price is displayed in the catalog and in the shopping cart. When the price is changed, the new price should be displayed in the shopping cart in addition to the price when the item was purchased. The sample application uses an event driven architecture, Kafka and Eclipse MicroProfile to cache the new price in the Postgres database of the catalog service in addition to the Db2 database of the remaining monolith.

**Modern Java Application Runtimes**

When modernizing applications, IBM and Red Hat provide several options of target environments with different pros and cons. Check out the repo for [details](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/documentation/Performance.md) where I compared some of the options. In summary my suggestion is to use IBM’s open source JVM OpenJ9 for Java workloads in containers. OpenJ9 uses only half of the memory compared to other JVMs and it starts twice as fast. I’m a big fan of the reactive capabilities built into Quarkus, especially Eclipse Vert.x. In my simple tests the reactive implementation of the catalog service is twice as efficient compared to imperative code.

**Micro Frontends**

The next part of the sample describes how to implement microservices in frontends. Another anti-pattern when it comes to cloud native applications is to have microservices in the backend only, but to still have monolithic databases and monolithic web applications. Let’s go back to the sample scenario. Products have typically ratings. When you want to add ratings to the products in the catalog, you have to change 1. the database schema, 2. the business logic and 3. the user interfaces.

In order to implement an end to end microservices architecture, I’ve used a web application framework called single-spa which stands for single single page application. With the framework I split the frontend in six different parts which can be updated independently from each other. For example when you want to add stars for the ratings to the web application, all other parts remain unchanged. Single spa uses a technique to assemble different JavaScript modules in browsers to allow de-coupling and separate CI/CD pipelines for different micro frontends.

My e-commerce example has four visible micro frontends and two non visible components. The shell component defines the layout of the application. The Messaging component uses RxJS for communicating via events between loosely coupled micro frontends.

**Next Steps**

This was a short overview of my [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus). If you want to learn more, try it out yourself.

I’ve also written a [series of blog entries](https://github.com/IBM/application-modernization-javaee-quarkus#documentation) that describe the different parts in more detail.

In order to run the sample on your local development machine, you can use Docker Desktop and invoke a [script](https://github.com/IBM/application-modernization-javaee-quarkus#tldr) to install everything.

I have several ideas how to extend the example, for example scripts and documentation how to deploy it to OpenShift, the enterprise distribution of Kubernetes. Watch the GitHub repo or follow me on [Twitter](https://twitter.com/nheidloff) to get future updates.