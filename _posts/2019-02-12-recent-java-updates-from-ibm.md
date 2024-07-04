---
id: 3292
title: 'Recent Java Updates from IBM'
date: '2019-02-12T11:53:19+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3292'
permalink: /article/recent-java-updates-from-ibm/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/recent-java-updates-from-ibm/
categories:
    - Articles
---

In preparation for a Java conference, I’ve spent some time to catch up on the latest activities in the Java community. With Java EE’s move to Eclipse and projects like MicroProfile there are a lot of things going on and there is a lot of innovation. Below are some pointers to articles my colleagues have published recently.

**Licensing**

Oracle has changed the licensing for commercial use. Fortunately IBM open sourced OpenJ9 which is available together with the OpenJDK at no cost from [AdoptOpenJDK](https://adoptopenjdk.net/), even for commercial use.

![image](/assets/img/2019/02/java-ibm.png)

More about licensing:

- [Java Licensing Has Changed, but There’s Good News](https://www.ibm.com/blogs/bluemix/2019/02/java-licensing-has-changed-but-theres-good-news/)
- [Free Java with paid support: The IBM perspective](https://developer.ibm.com/blogs/2019/01/30/free-java-with-paid-support/)
- [AdoptOpenJDK: An open Java distribution and community you can count on](https://developer.ibm.com/blogs/2019/01/16/adoptopenjdk-an-open-java-distribution-and-community-you-can-count-on/)
- [Java licensing has changed, and you could be affected](https://developer.ibm.com/blogs/2019/01/24/java-licensing-is-changing-and-you-could-be-affected/)
- [Migrating to AdoptOpenJDK from Oracle Java](https://adoptopenjdk.net/MigratingtoAdoptOpenJDKfromOracleJava.pdf)

**Eclipse OpenJ9**

The code of the open source JVM [OpenJ9](https://www.eclipse.org/openj9/) is the same code base used by the IBM SDK for Java which means that it’s enterprise ready. Plus startup time is 40% faster and memory usage is 60% lower compared to other JVMs which makes it a perfect fit for container based workloads.

More about OpenJ9:

- [OpenJ9](https://www.eclipse.org/openj9/)
- [OpenJ9 Performance](https://www.eclipse.org/openj9/oj9_performance.html)
- [Video: OpenJDK with Eclipse OpenJ9: give your Java applications a thrill](https://www.youtube.com/watch?v=srfR38j2CFc)
- [OpenJDK with Eclipse OpenJ9: No worries, just improvements](https://developer.ibm.com/blogs/2019/01/10/openjdk-with-eclipse-openj9-no-worries-just-improvements/)

**Eclipse MicroProfile**

MicroProfile allows building cloud-native enterprise microservices. I like especially that MircoProfile based services can supplement Istio functionality, for example for application specific fallbacks.

More about MicroProfile:

- [MicroProfile, the microservice programming model made for Istio](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php)
- [MicroProfile](https://microprofile.io/)
- [MicroProfile Starter](https://start.microprofile.io/)
- [Write a simple MicroProfile application](https://developer.ibm.com/series/write-a-simple-microprofile-application/)
- [Code Pattern: Configure your app using Eclipse MicroProfile Config](https://developer.ibm.com/patterns/configure-your-app-using-eclipse-microprofile-config/)
- [Istio](https://istio.io/)
- [Code Pattern: Make Java microservices resilient with Istio](https://developer.ibm.com/patterns/make-java-microservices-resilient-with-istio/)

**More Resources**

To learn more about what IBM provides for Java developers, check out the following resources:

- [IBM Developer Java Technologies](https://developer.ibm.com/technologies/java/)
- [IBM Cloud CLI to create new Applications](https://cloud.ibm.com/docs/cli/idt/index.html#developing)
- [IBM Cloud Starter Application](https://cloud.ibm.com/developer/appservice/starter-kits/java-microservice-with-eclipse-microprofile-and-java-ee)
- [IBM Cloud Developer Tools for Jetbrains IDEs](https://cloud.ibm.com/docs/cli/idt/jetbrains.html#ibm-dev-tools-for-jetbrains)
- [Code Patterns](https://developer.ibm.com/patterns/category/java/)
- [Video: Java Update](https://www.youtube.com/watch?v=Sy-JmAXZPmY)
- [Open Liberty](https://openliberty.io/)