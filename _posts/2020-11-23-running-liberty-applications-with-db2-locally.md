---
id: 4243
title: 'Running Liberty Applications with Db2 locally'
date: '2020-11-23T07:59:16+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4243'
permalink: /article/running-liberty-applications-with-db2-locally/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-liberty-applications-with-db2-locally/
categories:
    - Articles
    - Java
---

IBM provides a nice [workshop]({{ "/article/workshop-modernizing-ibm-websphere-applications/" | relative_url }}) that demonstrates how to modernize legacy WebSphere applications with Liberty. The workshop explains how to deploy applications on OpenShift. This article describes how to run Liberty applications locally.

Application modernization is a process with multiple stages. After an analysis the first step is usually to put applications in containers. However to really benefit from cloud capabilities, applications need to be converted in cloud-native applications, for example with the help of modern frameworks like MicroProfile.

As a developer I like to do these changes locally. This makes me more productive than having to deploy code to servers first.

There is documentation how to run Liberty applications and Db2 databases locally. I’ve updated the [instructions](https://github.com/ibm-cloud-architecture/cloudpak-for-applications/pull/7) to make this as easy as possible.

Here are the steps to run the ‘store front’ sample applications locally. For more details check out the [documentation](https://github.com/ibm-cloud-architecture/cloudpak-for-applications/blob/liberty/liberty-build.md).

This is the Dockerfile of the WebSphere Liberty application. You can also switch to Open Liberty by only changing the first line with another base image.

```
FROM ibmcom/websphere-liberty:kernel-ubi-min

COPY --chown=1001:0 ./liberty/server.xml /config
COPY --chown=1001:0 ./liberty/server.env /config
COPY --chown=1001:0 ./liberty/jvm.options /config

ARG SSL=false
ARG MP_MONITORING=false
ARG HTTP_ENDPOINT=false

COPY --chown=1001:0 ./CustomerOrderServicesApp/target/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear /config/apps/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear
COPY --chown=1001:0 ./resources/ /opt/ibm/wlp/usr/shared/resources/

USER 1001
RUN configure.sh
```

To launch Db2 execute this command:

```
$ docker run -itd --name db2-cos --privileged=true -p 50000:50000 -e LICENSE=accept -e DB2INST1_PASSWORD=db2inst1 -e DBNAME=orderdb vandepol/db2-cos
```

The application can be built and run via the following commands:

```
git clone https://github.com/ibm-cloud-architecture/cloudpak-for-applications.git
cd cloudpak-for-applications
git checkout liberty
cd CustomerOrderServicesProject
mvn clean package
cd ..
docker build -t customerorderservices-local:1.0 .
docker run --name customerorderservices-local -d -p 9081:9081 -p 9443:9443 customerorderservices-local:1.0
```

In order to allow the application container to the database container, everything needs to run in one network.

```
$ docker network create myNetwork
$ docker network connect myNetwork db2-cos
$ docker network connect myNetwork customerorderservices-local
```

Access the application in a browser using https://127.0.0.1:9443/CustomerOrderServicesWeb. Login using ‘rbarcia’ and ‘bl0wfish’.

![image](/assets/img/2020/11/app-modernization-sample-web-png.png)