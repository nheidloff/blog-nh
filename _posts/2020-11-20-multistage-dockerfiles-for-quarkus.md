---
id: 4218
title: 'Multistage Dockerfiles for Quarkus'
date: '2020-11-20T07:27:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4218'
permalink: /article/multistage-dockerfiles-for-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/multistage-dockerfiles-for-quarkus/
categories:
    - Articles
    - Java
---

New [Quarkus](https://quarkus.io/) applications can be created in several ways, for example via CLI or the [Start Coding](https://code.quarkus.io/) page. Since applications are usually run in containers, Dockerfiles are created automatically. However they assume, that the code has already been built. This article describes how to build the code and the image together.

An easy way to create the Quarkus applications is to use the Start Coding page:

![image](/assets/img/2020/11/Screenshot-2020-11-20-at-07.40.22.png)

Executing the Maven build process in a container has several advantages. For example when developing locally, you don’t need to install specific Maven versions locally and all developers of your team are using the exact same build process.

Docker and other container technologies provide the ability to do [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/).

Here is how this can be done for Quarkus applications. Let’s assume you run Quarkus in the JVM mode. A Dockerfile ‘Dockerfile.jvm’ is created automatically.

All you need to do is to insert the Maven build at the top and refer to the generated files at the bottom via ‘–from=BUILD’. Here is the new Dockerfile, called ‘Dockerfile.jvm-multi’.

```
FROM adoptopenjdk/maven-openjdk11 as BUILD
 
COPY src /usr/src/app/src
COPY ./pom.xml /usr/src/app
WORKDIR /usr/src/app
RUN mvn package

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.1

ARG JAVA_PACKAGE=java-11-openjdk-headless
ARG RUN_JAVA_VERSION=1.3.8

ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en'

RUN microdnf install curl ca-certificates ${JAVA_PACKAGE} \
    && microdnf update \
    && microdnf clean all \
    && mkdir /deployments \
    && chown 1001 /deployments \
    && chmod "g+rwX" /deployments \
    && chown 1001:root /deployments \
    && curl https://repo1.maven.org/maven2/io/fabric8/run-java-sh/${RUN_JAVA_VERSION}/run-java-sh-${RUN_JAVA_VERSION}-sh.sh -o /deployments/run-java.sh \
    && chown 1001 /deployments/run-java.sh \
    && chmod 540 /deployments/run-java.sh \
    && echo "securerandom.source=file:/dev/urandom" >> /etc/alternatives/jre/lib/security/java.security

ENV JAVA_OPTIONS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"

COPY --from=BUILD /usr/src/app/target/lib/* /deployments/lib/
COPY --from=BUILD /usr/src/app/target/*-runner.jar /deployments/app.jar

EXPOSE 8080
USER 1001

ENTRYPOINT [ "/deployments/run-java.sh" ]
```

Before building the image, comment out the ‘\*’ line in .dockerignore.

```
#*
!target/*-runner
!target/*-runner.jar
!target/lib/*
!target/quarkus-app/*
```

Execute these commands to build and run your Quarkus application.

```
docker build -f src/main/docker/Dockerfile.jvm-multi -t quarkus/code-with-quarkus-jvm .
docker run -i --rm -p 8080:8080 quarkus/code-with-quarkus-jvm
open http://localhost:8080/resteasy/hello
```