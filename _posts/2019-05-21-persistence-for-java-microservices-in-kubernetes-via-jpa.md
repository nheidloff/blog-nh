---
id: 3630
title: 'Persistence for Java Microservices in Kubernetes via JPA'
date: '2019-05-21T15:14:49+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3630'
permalink: /article/persistence-java-microservices-kubernetes-jpa/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/persistence-java-microservices-kubernetes-jpa/
categories:
    - Articles
tags:
    - java
---

Over the last weeks I’ve worked on an example application that demonstrates how Java EE developers can get started with microservices. The application is a full end-to-end sample which includes a web application, business logic, authentication and now also persistence. It runs on Kubernetes and Istio and there are scripts to easily deploy it.

Get the [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) code from GitHub.

**Java Persistence API**

In the example I use a full open source Java stack with OpenJ9, OpenJDK, Open Liberty and MicroProfile. In order to deploy the microservices to Kubernetes, I’ve created an image. Read my article [Dockerizing Java MicroProfile Applications]({{ "/article/dockerizing-container-java-microprofile" | relative_url }}) for details.

Open Liberty provides some pretty good guides. One guide is specifically about JPA: [Accessing and persisting data in microservices](https://openliberty.io/guides/jpa-intro.html). I don’t want to repeat everything here, but only highlight the changes I had to do to run this functionality in a container, rather than via a local Open Liberty installation.

Here is a short description of JPA:

> JPA is a Java EE specification for representing relational database table data as Plain Old Java Objects (POJO). JPA simplifies object-relational mapping (ORM) by using annotations to map Java objects to tables in a relational database. In addition to providing an efficient API for performing CRUD operations, JPA also reduces the burden of having to write JDBC and SQL code when performing database operations and takes care of database vendor-specific differences.

**Configuration of the Sample Application**

The following diagram shows the simplied architecture of the cloud-native-starter example. A web application invokes through Ingress the Web-API service that implements a backend-for-frontend pattern. The Web-API service invokes the Articles service which stores data in a SQL database on the [IBM Cloud](https://cloud.ibm.com/). Obviously you can use any other SQL database instead.

![image](/assets/img/2019/05/jpa-demo-architecture.png)

In order to access the Db2 on the IBM Cloud, first the driver needs to be downloaded via [Maven](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/pom.xml). Note that the driver does not go into the war files together with the business logic of the microservices, but it needs to be copied in a certain [Open Liberty directory](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/Dockerfile#L17): /opt/ol/wlp/usr/shared/resources/jcc-11.1.4.4.jar

Next you need to define in [server.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/liberty/server.xml) information about the driver and the data source.

```
<server description="OpenLiberty Server">
    <featureManager>
        <feature>webProfile-8.0</feature>
        <feature>microProfile-2.1</feature>
    </featureManager>

    <httpEndpoint id="defaultHttpEndpoint" host="*" httpPort="8080" httpsPort="9443"/>

    <library id="DB2JCCLib">
        <fileset dir="${shared.resource.dir}" includes="jcc*.jar"/>
    </library>

    <dataSource id="articlejpadatasource"
              jndiName="jdbc/articlejpadatasource">
        <jdbcDriver libraryRef="DB2JCCLib" />
        <properties.db2.jcc databaseName="BLUDB"
            portNumber="50000"
            serverName="DB2-SERVER"         
            user="DB2-USER" 
            password="DB2-PASSWORD" />
  </dataSource>
</server>
```

Next the persistence unit needs to be define in [persistence.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/src/main/resources/META-INF/persistence.xml).

The tricky part was for me to figure out the right location for this file. In order for all Maven versions to build it correctly I put it in ‘src/main/resources/META-INF/persistence.xml’. This produces an articles.war file with the internal structure ‘classes/META-INF/persistence.xml’.

```
<persistence version="2.2"
    xmlns="http://xmlns.jcp.org/xml/ns/persistence" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence 
                        http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">
    <persistence-unit name="jpa-unit" transaction-type="JTA">
        <jta-data-source>jdbc/articlejpadatasource</jta-data-source>
        <properties>
            <property name="eclipselink.ddl-generation" value="create-tables"/>
            <property name="eclipselink.ddl-generation.output-mode" value="both" />
        </properties>
    </persistence-unit>
</persistence>
```

**Usage of JPA in Java**

Once all the configuration has been done, writing the Java code is simple.

First you need to define the Java class which represents the entries in a table. Check out the code of [ArticleEntity.java](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/src/main/java/com/ibm/articles/data/ArticleEntity.java) with the five columns id, title, url, author and creation date. As defined in persistence.xml this table is created automatically.

The CRUD operations for articles are defined in [ArticleDao.java](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/src/main/java/com/ibm/articles/data/ArticleDao.java). The code is pretty straight forward. The only thing that confused me, was that I have to begin and commit transactions manually for the create operation. In the Open Liberty sample this was not necessary. I’m trying to find out what the difference is.

In [JPADataAccess.java](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/src/main/java/com/ibm/articles/data/JPADataAccess.java) the logic is implemented to add and read articles. The ArticleDao is injected. Again, the code looks simple. The lesson that I learned here is, that dependency injection only seems to work when the upper layers that invoke this code use dependency injection and @ApplicationScoped as well.

**How to run the Example**

I’ve written scripts to create the SQL database and create the Articles service. Check out the [documentation](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/DemoJPA.md) to run the sample yourself on Minikube or the [IBM Cloud Kubernetes Service](https://cloud.ibm.com/docs/containers).

Once installed the OpenAPI API Explorer can be used to create a new article.

![image](/assets/img/2019/05/jpa-demo-1.png)

The table is displayed in the Db2 console.

![image](/assets/img/2019/05/jpa-demo-2.png)

The data in the table can be displayed in the console as well.

![image](/assets/img/2019/05/jpa-demo-3.png)

To learn more about microservices built with Java and MicroProfile, check out the [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) repo.