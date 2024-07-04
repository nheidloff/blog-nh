---
id: 4357
title: 'Moving from WebSphere Liberty to Open Source'
date: '2021-01-28T16:21:55+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4357'
permalink: /article/modernizing-websphere-liberty-applications-with-open-liberty/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/modernizing-websphere-liberty-applications-with-open-liberty/
categories:
    - Articles
---

Open Liberty is a modular open source Java runtime. WebSphere Liberty is IBM’s commercial offering based on Open Liberty. There are reasons why you should consider using Open Liberty. One of the big advantages is – besides the open source license – a big community of developers.

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

Here is the description of [Open Liberty](https://cloud.ibm.com/docs/java?topic=java-liberty) from the home page:

> Open Liberty is a lightweight open source Java runtime that is built by using modular features. WebSphere Liberty is a commercial version of Open Liberty. Liberty provides an efficient packaging pipeline for Docker containers, making it a great operational fit for cloud environments.

Since WebSphere Liberty is based on Open Liberty there aren’t too many changes that need to be done, but there are some differences.

**Containerization**

The first thing that needs to be changed is the Dockerfile. The [WebSphere Liberty](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-websphere-liberty/Dockerfile.multistage) Dockerfile is similar to the [Open Liberty](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty/Dockerfile.multistage) version:

```
FROM adoptopenjdk/maven-openjdk11 as BUILD
COPY . /usr/src/app/src
WORKDIR /usr/src/app/src/CustomerOrderServicesProject
RUN mvn clean package

FROM open-liberty:kernel-slim-java11-openj9
USER root
COPY --chown=1001:0 ./liberty/server.xml /config
COPY --chown=1001:0 ./liberty/server.env /config
COPY --chown=1001:0 ./liberty/jvm.options /config

ARG SSL=false
ARG HTTP_ENDPOINT=false

RUN features.sh

COPY --from=build --chown=1001:0 /usr/src/app/src/CustomerOrderServicesApp/target/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear /config/apps/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear
COPY --from=build --chown=1001:0 /usr/src/app/src/resources/ /opt/ol/wlp/usr/shared/resources/
RUN chown -R 1001.0 /config /opt/ol/wlp/usr/servers/defaultServer /opt/ol/wlp/usr/shared/resources && chmod -R g+rw /config /opt/ol/wlp/usr/servers/defaultServer  /opt/ol/wlp/usr/shared/resources

USER 1001
RUN configure.sh
```

For Java applications I always use a multistage Dockerfile to make sure that the Maven build always returns the same result, no matter where you build the code. This eliminates issues with different JVMs, Maven versions, JDK versions, etc.

To pick the right Open Liberty image, check out the [documentation](https://github.com/OpenLiberty/ci.docker#container-images).

![image](/assets/img/2021/01/open-liberty-images.png)

Note that there are different projects on DockerHub:

- [openliberty/open-liberty](https://hub.docker.com/r/openliberty/open-liberty) which uses UBI (recommended)
- [open-liberty](https://hub.docker.com/_/open-liberty) which uses Ubuntu (Docker Official Images)

The recommended images are not the Docker Official Images, but the UBI images!

In order to start using the Open Liberty it might make sense to start with the images tagged with ‘full’. These images contain the full runtime which means they are bigger, but easier to use initially.

After this you can optimise the images by using the ‘slim’ versions and running the ‘features.sh’ script to only pull the features you need.

I’ve been told that the ‘RUN configure.sh’ command in the last row is ‘only’ required for production builds since it runs optimisation like caching. During the development I always comment the line out since building images and re-starting containers is much faster.

**Configurations**

Next you need to change some configurations. In the pom.xml dependencies are defined. To make migrations as easy as possible I recommend the ‘umbrella’ dependencies Jakarta and MicroProfile and I pick the latest versions.

```
<dependency>
   <groupId>jakarta.platform</groupId>
   <artifactId>jakarta.jakartaee-api</artifactId>
   <version>8.0.0</version>
   <scope>provided</scope>
</dependency>
<dependency>
   <groupId>org.eclipse.microprofile</groupId>
   <artifactId>microprofile</artifactId>
   <version>3.3</version>
   <type>pom</type>
   <scope>provided</scope>
</dependency>
```

You can also change the Java compilation version in pom.xml.

in the next step the features that Open Liberty uses are defined in server.xml. In the [future](https://github.com/OpenLiberty/open-liberty/issues/12983) this redundant step might not be necessary anymore.

In server.xml I use ‘umbrella’ features again. Since the MicroProfile reactive features are not part of MicroProfile core, they need to be defined separately.

```
<feature>microProfile-3.3</feature>
<feature>jakartaee-8.0</feature>
<feature>mpReactiveStreams-1.0</feature>
<feature>mpReactiveMessaging-1.0</feature>
```

In addition to pom.xml and server.xml I also had to change a couple of details related to JPA.

**What’s next?**

In a future article I’ll explain how to add cloud-native functionality like health checks and monitoring to the Open Liberty application.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).