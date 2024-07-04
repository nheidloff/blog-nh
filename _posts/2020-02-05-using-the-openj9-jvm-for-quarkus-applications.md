---
id: 4034
title: 'Using the OpenJ9 JVM for Quarkus Applications'
date: '2020-02-05T15:11:25+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4034'
permalink: /article/openj9-jvm-for-quarkus-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openj9-jvm-for-quarkus-applications/
categories:
    - Articles
---

As defined on the home page, [Quarkus](https://quarkus.io/) is “a Kubernetes Native Java stack tailored for OpenJDK HotSpot and GraalVM”. Since I’m a big fan of [OpenJ9](https://www.eclipse.org/openj9/), I’ve quickly measured memory usage of my reactive sample application where I run a microservice once with OpenJ9 and once with HotSpot.

OpenJ9 is a Java JVM that was open sourced from IBM 2-3 years ago. It’s basically the same JVM that IBM uses in hundreds of products and offerings. The nice thing is that compared to Hotspot it not only provides a 42% faster startup time, but also a 66% smaller memory footprint. Check out the [documentation](https://www.eclipse.org/openj9/oj9_performance.html).

I’ve used OpenJ9 from [AdoptOpenJDK](https://adoptopenjdk.net/) where you can choose between HotSpot and OpenJ9. Read my previous [blog]({{ "/article/recent-java-updates-from-ibm" | relative_url }}) to understand what other advantages AdoptOpenJDK provides.

**Memory Usage Results**

Here are the results of my little test. The diagram is from the Quarkus website. Everything that is in orange is what I’ve added for OpenJ9.

![image](/assets/img/2020/02/quarkus-openj9.png)

I’ve run the same service which accesses a database with OpenJ9 and HotSpot. I’ve deployed the two versions of the service from scratch and warmed them up by invoking their REST APIs. After this I invoked “docker stats | grep articles-reactive”. Hotspot showed 149.8MiB and OpenJ9 59.77MiB.

**How to run the Tests**

I’ve used my sample application which is part of the [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive) project. The microservice provides REST APIs which perform CRUD operations on a PostgreSQL database.

To run the microservice with OpenJ9 in Minikube, invoke the following commands.

```
$ git clone https://github.com/IBM/cloud-native-starter.git
$ cd cloud-native-starter/reactive
$ sh scripts/start-minikube.sh
$ sh scripts/deploy-kafka.sh
$ sh scripts/deploy-postgres.sh
$ sh scripts/deploy-articles-reactive-postgres.sh
$ curl ... [invoke command to trigger APIs returned by previous command]
$ docker stats | grep articles-reactive
```

I’ve used the following [Dockerfile](https://github.com/IBM/cloud-native-starter/blob/ca5dbdc5add41549a62c1009e9b08522a523693c/reactive/articles-reactive/Dockerfile):

```
FROM adoptopenjdk/maven-openjdk11 as BUILD
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
WORKDIR /usr/src/app
RUN mvn package

FROM adoptopenjdk/openjdk11-openj9:ubi-minimal
ENV JAVA_OPTIONS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV AB_ENABLED=jmx_exporter
RUN mkdir /opt/shareclasses
RUN chmod a+rwx -R /opt/shareclasses
RUN mkdir /opt/app
COPY --from=BUILD /usr/src/app/target/lib/* /opt/app/lib/
COPY --from=BUILD /usr/src/app/target/*-runner.jar /opt/app/app.jar
CMD ["java", "-Xmx128m", "-XX:+IdleTuningGcOnIdle", "-Xtune:virtualized", "-Xscmx128m", "-Xscmaxaot100m", "-Xshareclasses:cacheDir=/opt/shareclasses", "-jar", "/opt/app/app.jar"]
```

In order to use Hotspot replace the Dockerfile with the content from [Dockerfile.Hotspot](https://github.com/IBM/cloud-native-starter/blob/ca5dbdc5add41549a62c1009e9b08522a523693c/reactive/articles-reactive/Dockerfile.Hotspot) and run the same commands.

```
FROM adoptopenjdk/maven-openjdk11 as BUILD
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
WORKDIR /usr/src/app
RUN mvn package

FROM fabric8/java-alpine-openjdk11-jre
ENV JAVA_OPTIONS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV AB_ENABLED=jmx_exporter
COPY --from=BUILD /usr/src/app/target/lib/* /deployments/lib/
COPY --from=BUILD /usr/src/app/target/*-runner.jar /deployments/app.jar
ENTRYPOINT [ "/deployments/run-java.sh" ]
```