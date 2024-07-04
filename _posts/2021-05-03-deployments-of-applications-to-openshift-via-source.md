---
id: 4536
title: 'Deployments of Applications to OpenShift via Source'
date: '2021-05-03T12:43:21+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4536'
permalink: /article/deployments-of-applications-to-openshift-via-source/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deployments-of-applications-to-openshift-via-source/
categories:
    - Articles
---

This article describes how to deploy local applications to OpenShift with the OpenShift ‘oc’ CLI (command line interface).

The complete source code of the scenarios below is available as open source. My [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus) is a simple e-commerce application. The modernized application contains two backend components:

1. The strangled catalog microservice can be scaled separately and has been implemented with Quarkus.
2. The remaining monolith has been implemented with Open Liberty.

In order to deploy the two backend components to OpenShift, the same mechanism can be used.

**Building the Source Code**

First the source code of the two Java applications needs to be built. This is done via Maven based on the project structures defined in the pom.xml files. In order to generate the jar files, Maven is run in a container. This eliminates potential later issues due to different Maven and JDK versions.

Additionally rather than building the Java applications locally on desktop machines the builds are performed on OpenShift.

Here is the first part of the [Dockerfile](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-reactive/Dockerfile).

```
FROM adoptopenjdk/maven-openjdk11 as BUILD
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
WORKDIR /usr/src/app
RUN mvn clean package
```

**Creating the Images**

Next the images are built. This is also done server-side on OpenShift.

The Quarkus microservice uses a multistage Dockerfile. Here is the second part:

```
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

The following commands upload the source code to OpenShift and trigger a Docker build:

```
$ oc new-build --name build-service-catalog-quarkus-reactive --binary --strategy docker
$ oc start-build build-service-catalog-quarkus-reactive --from-dir=. --follow
```

The built image will be pushed to the internal OpenShift registry.

![image](/assets/img/2021/05/openshift-image-stream.png)

**Deployments of Resources**

The actual deployments of the Java applications or microservices is done via Kubernetes yaml files. Check out the [yaml file](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-reactive/deployment/kubernetes.yaml) for the Kubernetes resources Deployment and Service.

In order to enable GitOps, I recommend to do all configurations using yaml files declaratively rather than using CLI commands. For example rather that using ‘oc expose svc’ you should use files like this:

```
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: service-catalog-quarkus-reactive
  annotations:
    argocd.argoproj.io/sync-options: Validate=false
spec:
  to:
    kind: Service
    name: service-catalog-quarkus-reactive  
```

**Next Steps**

To learn more about OpenShift deployments and application modernization, check out the [Application Modernization – From Java EE in 2010 to Cloud-Native in 2021](https://github.com/IBM/application-modernization-javaee-quarkus) on GitHub.