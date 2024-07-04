---
id: 4417
title: 'Using Quarkus for building reactive Applications'
date: '2021-02-17T11:00:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4417'
permalink: /article/using-quarkus-reactive-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/using-quarkus-reactive-applications/
categories:
    - Articles
---

When building applications and microservices for container environments like Kubernetes and OpenShift, efficient usage of resources is key. Similarly to popular frameworks like Node.js/JavaScript, the open source Java framework Quarkus comes with capabilities to build reactive applications to reduce the usage of memory and start up times significantly making Java ready for containers.

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

**Efficiency**

In this article I explain how to use Quarkus for the legacy application to leverage the reactive capabilities to save resources (see [documentation](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/documentation/Performance.md)). As always, when doing these types of tests, note that you mileage will vary.

My earlier [article](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/LoadTests.md) shows that a reactive stack provides response times that take only half of the time compared to the imperative stack. To compare imperative with reactive code, I’ve implemented the same HTTP endpoint twice with Quarkus. The screenshot shows the invocation times after 30000 invocations.

![image](/assets/img/2021/02/reactive-comparisons.png)

**Using Quarkus to run Java EE Applications**

In order to use the reactive capabilities in Quarkus, I’ve converted my 10 years old Java EE applications in multiple steps. Check out my previous articles:

- [Moving from WebSphere Liberty to Open Source]({{ "/article/modernizing-websphere-liberty-applications-with-open-liberty/" | relative_url }})
- [Increasing Productivity for legacy Liberty Applications]({{ "/article/increasing-developer-productivity-for-legacy-liberty-applications/" | relative_url }})

As next step I had to actually swap the Java runtime. One of my colleagues wrote an article [Learn how to run your standard JAX-RS microservice on Quarkus](https://medium.com/cloud-engagement-hub/using-quarkus-the-kubernetes-native-java-stack-to-run-your-jax-rs-microservice-79142bed3846) which describes the key concepts.

I like especially his table that maps Java/Jakarta EE features to Quarkus extensions:

![image](/assets/img/2021/02/1_fFYyIFi5qoC0CEk7HP4qDw.png)

Also note that Quarkus IS NOT a Jakarta EE runtime! So if you want to modernize older Java EE applications which heavily use EE functionality, you are better off using modern frameworks like Open Liberty.

**Persistence**

The author of the article above points out some necessary changes when changing from Java EE to Quarkus. For example dependency management, context roots and more.

One other key thing to keep in mind is persistence. JPA is a Java standard to access data in relational databases and it’s supported in Jakarta as well as Quarkus. However there are different implementations of JPA like Hibernate and EclipseLink. In Open Liberty, for example, EclipseLink is often much more efficient than Hibernate.

Additionally Quarkus supports a technique called Panache which minimizes the Java persistence code which is also based on Hibernate, but provides new capabilities on top of JPA. There is even work in progress to provide Panache for reactive database access.

Check out the different ways I’ve developed persistence in my sample:

- [Quarkus – Reactive (not Panache yet)](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-reactive/src/main/java/com/ibm/catalog/Category.java)
- [Quarkus – Panache (sync) – Hibernate](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-synch/src/main/java/com/ibm/catalog/Category.java)
- [Quarkus – JPA – Hibernate](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-quarkus-synch/src/main/java/org/pwte/example/domain/Category.java)
- [Open Liberty – JPA – EclipseLink](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty-cloud-native/src/main/java/org/pwte/example/domain/Category.java)

**Dependencies**

Another thing to keep in mind when changing Java EE applications to Quarkus is dependency management.

Quarkus does as much of the heavy lifting as possible at build-time to optimize the run-time experience. That’s why a lot of popular Java libraries have been optimized for Quarkus and can easily be used via Quarkus extensions.

At the same time that means that not every Java library can (efficiently) be used in Quarkus. Here is what the Quarkus architect Emmanuel Bernard wrote on [StackOverflow](https://stackoverflow.com/questions/61062253/how-do-i-know-which-third-party-dependencies-are-compatible-with-quarkus-in-nati):

> As long as your dependency is brought via an extension, then it’s usage via the extension is known to work in native mode. If you directly pull a dependency outside an extension dependency, then Quarkus can’t guarantee this.

If there is no Quarkus extension, you can always [build your own one](https://quarkus.io/guides/writing-extensions).

In my example there was no extension for com.ibm.websphere.appserver.api.json. However most of the WebSphere named packages are available in the meantime in standard libraries which didn’t exist when IBM created it’s own libraries. I could easily change from com.ibm.json.java.JSONObject to com.fasterxml.jackson.databind.node.ObjectNode.

- com.ibm.json.java.JSONObject ([pom.xml](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty-cloud-native/pom.xml), [code](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty-cloud-native/src/main/java/org/pwte/example/resources/CustomerOrderResource.java))
- com.fasterxml.jackson.databind.node.ObjectNode ([pom.xml](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-quarkus-synch/pom.xml), [code](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-quarkus-synch/src/main/java/org/pwte/example/resources/CustomerOrderResource.java))

**What’s next?**

To learn more about application modernization, check out my blog series in the GitHub [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).