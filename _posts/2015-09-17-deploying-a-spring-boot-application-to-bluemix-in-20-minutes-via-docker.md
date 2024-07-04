---
id: 1457
title: 'Deploying a Spring Boot Application to Bluemix in 20 Minutes via Docker'
date: '2015-09-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/deploying-a-spring-boot-application-to-bluemix-in-20-minutes-via-docker/'
permalink: /article/17.09.2015103506NHEC42.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
custom_permalink:
    - article/17.09.2015103506NHEC42.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323836832'
categories:
    - Articles
---

 I really want to learn more about the Java framework [Spring](http://spring.io/). The simplicity to build enterprise applications together with Spring’s momentum makes it really interesting. So I started with a simple tutorial and deployed that Spring application to [Bluemix](https://bluemix.net/).

 Spring provides a simple hello world [Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker/) tutorial with a [Spring Boot](http://projects.spring.io/spring-boot/) application with one REST API. Maven and Gradle can be used, not only to build the Java application but also a Docker image which can be deployed to Bluemix.

 The Spring tutorial states that you need 15 minutes for the tutorial. In my case that was true since I had the prerequisites JDK 1.8, Maven and Docker already installed. For the deployment of the application you don’t need more than 5 additional minutes.

 I won’t repeat all the steps from the Spring tutorial here, but essentially this is what you need to do:   
 – Clone a Github project. Use the ‘complete’ version of the application   
 – Build the project via Maven or Gradle   
 – Optional: Run the application locally: Run the built jar file which comes with Tomcat and your application   
 – Build the Docker image via Maven or Gradle plugins

 The tutorial describes how to push the image to Docker Hub (via “docker push springio/gs-spring-boot-docker”). To push the image to Bluemix follow the next steps instead.

 &gt; cf login   
 &gt; cf ic login   
 &gt; docker tag springio/gs-spring-boot-docker registry.ng.bluemix.net/nheidloff/gs-spring-boot-docker &lt;- change the namespace   
 &gt; docker push registry.ng.bluemix.net/nheidloff/gs-spring-boot-docker &lt;- change the namespace

 After this you’ll see the image on Bluemix.

![image](/assets/img/2015/09/springdocker1.png)

 In order to run a container invoke these commands:

 &gt; cf ic run –name gs-spring-boot-docker -p 8080:8080 -d -t registry.ng.bluemix.net/nheidloff/gs-spring-boot-docker &lt;- change the namespace   
 &gt; cf ic ip request   
 &gt; cf ic ip list -a   
 &gt; cf ic ip bind 134.168.15.128 gs-spring-boot-docker &lt;- change the IP

 Alternatively you can use the Bluemix UI to create a container. Choose the new image, define the port 8080 and bind an IP address.

 Open the application in a web browser via [yourIP:8080](http://134.168.15.128:8080/).