---
id: 2075
title: 'How to use Spring Boot for Serverless Computing'
date: '2016-05-04T09:49:07+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2075'
permalink: /article/how-to-use-spring-boot-serverless-computing/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-use-spring-boot-serverless-computing/
categories:
    - Articles
---

[Serverless Computing](http://redmonk.com/fryan/2016/04/28/serverless-volume-compute-for-a-new-generation/) is a relative new technology which allows developers to build event driven code which scales and for which you only pay the time it’s running. [OpenWhisk](https://developer.ibm.com/openwhisk/) is IBM’s serverless computing offering hosted on [Bluemix](https://bluemix.net).

With OpenWhisk developers can implement actions via JavaScript, Swift and Docker. Via Docker other programming languages like Java can be used. This article describes how you can use [Spring Boot](http://projects.spring.io/spring-boot/) to develop an action, how to build a Docker image and how to register and trigger the serverless action.

As starting point I’m using the simple REST sample from the Spring website [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/). Follow the tutorial to set up this sample in less than 15 minutes.

In order to read the input parameters that are passed in to the action I created a class OpenWhiskRequestBody.

```
public class OpenWhiskRequestBody {
   private String authKey;
   private Greeting value;
	
   public String getAuthKey() {
      return authKey;
   }
   public void setAuthKey(String authKey) {
      this.authKey = authKey;
   }
   public Greeting getValue() {
      return value;
   }
   public void setValue(Greeting value) {
      this.value = value;
   }
}
```

Next I modified GreetingController.java slightly. I changed the path to ‘run’ and added some code to read and return data.

```
@RestController
public class GreetingController {
   private static final String template = "Hello, %s!";
   private final AtomicLong counter = new AtomicLong();
    
   @RequestMapping(method=RequestMethod.POST, path="/run", produces={"application/json"})
   public Greeting greeting(@RequestBody OpenWhiskRequestBody request) {
      return new Greeting(counter.incrementAndGet(), 
         String.format(template, request.getValue().getContent()));
   }
    
   @RequestMapping(method=RequestMethod.POST, path="/init", produces={"application/json"})
   public ResponseEntity init() {
      return ResponseEntity.ok("{}");
   }
}
```

Here is the Dockerfile.

```
FROM java:8
VOLUME /tmp
ADD target/gs-rest-service-0.1.0.jar app.jar
RUN bash -c 'touch /app.jar'
ENV SPRING_PROFILES_ACTIVE docker
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
```

Invoke these commands to run the code. At this point images need to be pushed to DockerHub.

```
mvn package
docker build -t nheidloff/open-whisk-docker-spring .
docker push nheidloff/open-whisk-docker-spring
wsk action create --docker docker-spring nheidloff/open-whisk-docker-spring
wsk action invoke --blocking --result docker-spring --param name niklas
```

Here is the output of the action in the dashboard.

![image](/assets/img/2016/05/openwhiskspring.jpg)