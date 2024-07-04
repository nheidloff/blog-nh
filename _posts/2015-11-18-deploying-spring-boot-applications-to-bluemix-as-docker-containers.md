---
id: 1577
title: 'Deploying Spring Boot Applications to Bluemix as Docker Containers'
date: '2015-11-18T10:19:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1577'
permalink: /article/Deploying-Spring-Boot-Applications-to-Bluemix-as-Docker-Containers/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4329302759'
custom_permalink:
    - article/Deploying-Spring-Boot-Applications-to-Bluemix-as-Docker-Containers/
categories:
    - Articles
---

In the previous blog entry I described how to [document REST APIs in Spring Boot applications via Swagger]({{ "/article/usage-of-swagger-2-0-in-spring-boot-applications-to-document-apis/" | relative_url }}). Below I explain how to deploy these applications as Docker containers to [IBM Bluemix](https://bluemix.net). As example I use again the [Spring REST sample](https://spring.io/guides/gs/rest-service/).

In the Dockerfile (in the project root directory) define how to build the Docker image.

```

FROM java:8
VOLUME /tmp
ADD target/gs-rest-service-0.1.0.jar app.jar
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
```

From the root directory invoke the following commands.

```
mvn package
docker build -t gs-rest-service . 
docker run --name gs-rest-service -p 80:8080 -d -t gs-rest-service
```

After this you can run the sample in our local Docker environment.

<http://dockerhost/greeting>  
<http://dockerhost/v2/api-docs?group=greetings>  
<http://dockerhost/swagger-ui.html>

In order to push the image to Bluemix invoke the following commands.

```
cf login
cf ic login
docker tag gs-rest-service registry.ng.bluemix.net/nheidloff/gs-rest-service
docker push registry.ng.bluemix.net/nheidloff/gs-rest-service
```

To run the sample on Bluemix create a Docker container group.

![image](/assets/img/2015/11/springswaggerdockerbluemix1.png)

After this you can run your REST API on Bluemix.

<http://gs-rest-service-cg.mybluemix.net/greeting>  
<http://gs-rest-service-cg.mybluemix.net/v2/api-docs?group=greetings>  
<http://gs-rest-service-cg.mybluemix.net/swagger-ui.html>

![image](/assets/img/2015/11/springswaggerdockerbluemix2.png)