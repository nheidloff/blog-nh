---
id: 4291
title: 'Improving operational Efficiency through Application Modernization'
date: '2021-01-25T08:51:25+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4291'
permalink: /article/improving-operational-efficiency-through-application-modernization/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/improving-operational-efficiency-through-application-modernization/
categories:
    - Articles
---

Application modernization is a journey. It’s difficult enough to improve and refactor your own code. Modernizing 10+ years old code written by other developers is even harder. That’s why I recommend that application modernization needs to be a journey with many little baby steps.

Over the last weeks I’ve worked on a sample that shows how to modernize a Java EE application from 2010. Over the next days I’ll publish blogs that describe how I’ve done this in multiple stages.

You can get the complete [source code](https://github.com/nheidloff/application-modernization-javaee-quarkus) of the sample from GitHub.

**Sample Application – Starting Point**

The sample application is a simple e-commerce shopping application built around 2010 with Java EE 6 running on WebSphere 8.5.5. You can navigate through products in a catalog via categories.

![image](/assets/img/2021/01/storefront-shop.png)

In order to purchase products, they can be added to the shopping cart via drag and drop.

![image](/assets/img/2021/01/storefront-add-item.png)

The application has been built using the traditional 3 tier architecture model, with a web application frontend, EJB backend business logic and a SQL database. The source code is available in the ‘[monolith-websphere-855](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/monolith-websphere-855)‘ directory.

This is the architecture diagram from 2010.

![image](/assets/img/2021/01/apparch-pc-phase0-customerorderservices.png)

**Why should you modernize?**

I’ve written another blog about [why you should consider modernizing applications]({{ "/article/ten-reasons-why-enterprises-should-modernize-applications/" | relative_url }}). One of the reasons is to improve operational efficiency.

When all enterprise applications run on container platforms like Kubernetes or OpenShift, they can be managed consistently. Everything is a container, no matter what programming languages and application stacks are used. This makes operations easier since observability like logging and monitoring are handled in the same way.

**Containerizing legacy Applications**

The first step in the modernization journey is to containerize applications. In order to run WebSphere applications in a container, [IBM Cloud Transformation Advisor](https://www.ibm.com/garage/method/practices/learn/ibm-transformation-advisor) can be used.

There is a local version to run Transformation Advisor on your developer machine using Docker. Instructions how to run Transformation Advisor on the original version of the sample can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/transformation-advisor).

Since setting up the sample in virtual machines or on bare metal is not that easy, the WebSphere 8.5.5 application is simulated running in a container.

Here is the result of running Transformation Advisor. ‘CustomerOrderServicesApp.ear’ is the application that is supposed to be containerzied and the estimated effort is low.

*That’s because not a single line of code needs to be changed!*

![image](/assets/img/2021/01/transformation-advisor-855-to-90-1.png)

Instead Transformation Advisor generates a [Dockerfile and two Python scripts](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/transformation-advisor/wast855-to-wast90) automatically to run the same application in a container.

![image](/assets/img/2021/01/transformation-advisor-855-to-90-2.png)

Here is the generated Dockerfile.

The only change that needed to be done was to replace ‘{APPLICATION\_BINARY}’ with the actual ear file’s name.

```
FROM ibmcom/websphere-traditional:latest-ubi

# Manual fix: Replace {APPLICATION_BINARY} with CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear
COPY --chown=was:root CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear /work/config/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear
COPY --chown=was:root ./src/config /work/config
COPY --chown=was:root ./lib /work/config/lib
RUN /work/configure.sh
```

**Running the Sample Application**

In order to run the application locally, you can use Docker desktop.

Run these commands to run the original WebSphere 8.5.5 application:

```
$ git clone https://github.com/nheidloff/application-modernization-javaee-quarkus.git && cd application-modernization-javaee-quarkus
$ ROOT_FOLDER=$(pwd)
$ sh ${ROOT_FOLDER}/scripts/install-dojo.sh
$ sh ${ROOT_FOLDER}/scripts/install-was-dependencies.sh
$ sh ${ROOT_FOLDER}/scripts-docker/build-and-run-monolith-app-was855.sh
```

Run these commands to run the containerized version running on WebSphere Traditional 9.0:

```
$ git clone https://github.com/nheidloff/application-modernization-javaee-quarkus.git && cd application-modernization-javaee-quarkus
$ ROOT_FOLDER=$(pwd)
$ sh ${ROOT_FOLDER}/scripts/install-dojo.sh
$ sh ${ROOT_FOLDER}/scripts/install-was-dependencies.sh
$ sh ${ROOT_FOLDER}/scripts-docker/build-and-run-monolith-app-was90.sh
```

**What’s next?**

In one of the next blogs I’ll explain how to convert the WebSphere Traditional 9.0 application to WebSphere Liberty.