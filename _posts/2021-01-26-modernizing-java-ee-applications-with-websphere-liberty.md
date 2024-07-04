---
id: 4326
title: 'Modernizing Java EE Applications with WebSphere Liberty'
date: '2021-01-26T16:14:29+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4326'
permalink: /article/modernizing-java-ee-applications-with-websphere-liberty/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/modernizing-java-ee-applications-with-websphere-liberty/
categories:
    - Articles
---

Application modernization is a journey. There is no magic. Modernizing applications in several little steps is the approach that I recommend. In this article I describe how to modernize WebSphere Traditional applications with modern WebSphere Liberty runtimes.

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

The first part of this series explained how to [run WebSphere Traditional applications in containers]({{ "/article/improving-operational-efficiency-through-application-modernization/" | relative_url }}). This part continues the journey and documents how to use a modern WebSphere Liberty runtime optimized for containers.

[WebSphere Liberty](https://www.ibm.com/cloud/websphere-liberty) is a comprehensive, flexible and secure Java EE and MicroProfile application server for modernizing and building the next era of applications and cloud-native services.

> IBM WebSphere Liberty is a Java EE application server with a low-overhead Java runtime environment designed for cloud-native applications and microservices. WebSphere Liberty was created to be highly composable, start fast, use less memory and scale easily.
> 
> The WebSphere Liberty architecture shares the same code base as the open-sourced IBM Open Liberty (link resides outside IBM) server runtime. This provides additional benefits such as low-cost experimentation, customization and seamless migration from open source to production.

**WebSphere Liberty Images**

The first thing that needs to be done is to define the runtime of the application. There are a number of different WebSphere Liberty images available with different pros and cons. They differentiate in several ways: JVMs, JDK versions, Java versions, UBI images, etc. Check out the tags of these images on DockerHub:

- [ibmcom/websphere-liberty](https://hub.docker.com/_/websphere-liberty)
- [websphere-liberty](https://hub.docker.com/r/ibmcom/websphere-liberty)

Here is the [Dockerfile](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-websphere-liberty/Dockerfile) I’ve used:

```
FROM ibmcom/websphere-liberty:20.0.0.12-kernel-java8-openj9-ubi
USER root
COPY ./liberty/server.xml /config
COPY ./liberty/server.env /config
COPY ./liberty/jvm.options /config

ARG SSL=false
ARG MP_MONITORING=false
ARG HTTP_ENDPOINT=false

COPY ./CustomerOrderServicesApp/target/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear /config/apps/CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear
COPY ./resources/ /opt/ibm/wlp/usr/shared/resources/
RUN chown -R 1001.0 /config /opt/ibm/wlp/usr/servers/defaultServer /opt/ibm/wlp/usr/shared/resources && chmod -R g+rw /config /opt/ibm/wlp/usr/servers/defaultServer  /opt/ibm/wlp/usr/shared/resources

USER 1001
RUN configure.sh
```

Note that the last line ‘RUN configure.sh’ can be ignored for development environments. I’ve been told that this is ‘only’ useful for production environments. Not executing this script will save you a lot of time during development.

**WebSphere Liberty Configuration**

In the next step you need to define the pom.xml file or actually in this case the different pom.xml files. Old Java projects often used various [sub-projects](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/monolith-websphere-liberty) generating the different artefacts: ears, wars and jars. I’ll write more about this in one of the next blogs.

In the pom.xml you should declare the dependency to Java EE or now Jakarta EE. In many cases this covers most of the necessary dependencies.

```
<dependency>
   <groupId>javaee</groupId>
   <artifactId>javaee-api</artifactId>
   <version>8</version>
   <scope>provided</scope>
</dependency>
```

Next the [Libery server configuration](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-websphere-liberty/liberty/server.xml) needs to be defined that describes which features to use, how to access databases, the HTTP endpoints, etc.

Here is what I’ve used:

```
<server>
  <featureManager>
      <feature>appSecurity-2.0</feature>
      <feature>ldapRegistry-3.0</feature>
      <feature>localConnector-1.0</feature>
      <feature>ejbLite-3.1</feature>
      <feature>jaxrs-1.1</feature>
      <feature>jdbc-4.1</feature>
      <feature>jpa-2.0</feature>
      <feature>jsp-2.3</feature>
      <feature>servlet-3.1</feature>
  </featureManager>

  <library id="DB2Lib">
    <fileset dir="/opt/ibm/wlp/usr/shared/resources/db2" includes="db2jcc4.jar db2jcc_license_cu.jar"/>
  </library>

  <dataSource id="OrderDS" jndiName="jdbc/orderds" type="javax.sql.XADataSource">
    <jdbcDriver libraryRef="DB2Lib"/>
    <properties.db2.jcc databaseName="${env.DB2_DBNAME}" password="${env.DB2_PASSWORD}" portNumber="${env.DB2_PORT}" serverName="${env.DB2_HOST}" user="${env.DB2_USER}"/>
    <connectionManager agedTimeout="0" connectionTimeout="180" maxIdleTime="1800" maxPoolSize="10" minPoolSize="1" reapTime="180"/>
  </dataSource>

  <httpEndpoint host="*" httpPort="9080" httpsPort="9443" id="defaultHttpEndpoint">
    <tcpOptions soReuseAddr="true"/>
  </httpEndpoint>

  <application id="customerOrderServicesApp" name="CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear" type="ear" location="CustomerOrderServicesApp-0.1.0-SNAPSHOT.ear">
    <classloader apiTypeVisibility="spec, ibm-api, third-party" />
  </application>
</server>
```

**Code Changes – WebSphere Application Server Migration Toolkit**

The most challenging part is to do the necessary code changes. The [WebSphere Application Server Migration Toolkit](https://www.ibm.com/support/pages/websphere-application-server-migration-toolkit) is a great help!

You can install the toolkit in Eclipse and create a ‘Software Analyzer Configuration’.

![image](/assets/img/2021/01/eclipse-migration-1.png)

Choose the option ‘WebSphere Application Server Version Migration’.

![image](/assets/img/2021/01/eclipse-migration-2.png)

Choose the source and the target.

![image](/assets/img/2021/01/eclipse-migration-3.png)

In this example three code changes need to be done. The results can be found in the ‘Software Analyzer Configuration’ view, especially under the Java Code Review tab.

The first necessary change is to replace the usages of ‘org.codehaus.jackson’. The Eclipse ‘Help’ view describes easily what needs to be changed.

![image](/assets/img/2021/01/eclipse-migration-4.png)

The next required change is to replace ‘com.ibm.json’ with an open source package in Java EE.

![image](/assets/img/2021/01/eclipse-migration-5.png)

The third change are the EJB lookups (which might not be necessary anymore with the latest Liberty versions).

![image](/assets/img/2021/01/eclipse-migration-6.png)

**Transformation Advisor**

In addition to the Eclipse Migration Toolkit Transformation Advisor also displays some of these results. Check out my previous [article]({{ "/article/step-by-step-instructions-ibm-transformation-advisor/" | relative_url }}) how to run this tool.

Here are the results of Transformation Advisor:

![image](/assets/img/2021/01/transformation-advisor-was-to-lib-1.png)

![image](/assets/img/2021/01/transformation-advisor-was-to-lib-2.png)

The reason why not all three necessary code changes are displayed is because Transformation Advisor tries to make modernizations as easy as possible. So rather than showing the results to upgrade to WebSphere Liberty with Java EE 8, the tool recommands to upgrade to Open Liberty with Java EE 7 since less changes are required.

**What’s next?**

In the next article I’ll describe how to split the frontent from the business logic.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).