---
id: 1021
title: 'REST APIs in Bluemix.info implemented via JAX-RS and Apache Wink'
date: '2014-12-09T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/rest-apis-in-bluemix-info-implemented-via-jax-rs-and-apache-wink/'
permalink: /article/09.12.2014113941NHEEHV.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/09.12.2014113941NHEEHV.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323226363'
categories:
    - Articles
---

 Yesterday Ryan Baxter blogged about how to use [Spring Boot](http://ryanjbaxter.com/2014/12/08/building-bootiful-java-apps/) to develop your own REST APIs. Sounds pretty good. When I implemented the REST APIs of [Bluemix.info](http://www.bluemix.info/) I didn’t know about this framework and chose instead JAX-RS and Apache Wink which is used by many Liberty developers. Below is an overview how to leverage these technologies to build REST APIs consuming and producing JSON. As a disclaimer this was my first time using JAX-RS.

[JAX-RS](https://jax-rs-spec.java.net/) is a specification of a Java API for RESTful Services. IBM WebSphere Liberty profile uses [Apache Wink](http://wink.apache.org/) which is an implementation of this spec. In order to use Wink in your Java applications the first thing is to add the dependencies to your project. As a first time user it took me some time to find the right [libraries](http://mvnrepository.com/artifact/org.apache.wink). Check out [pom.xml](https://github.com/IBM-Bluemix/news-aggregator/blob/master/pom.xml) of the Bluemix.info project to find the libraries that work to implement REST APIs with JSON as data format.

 Next you need to define the RestServlet in your [web.xml](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/webapp/WEB-INF/web.xml) and in the [application](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/webapp/WEB-INF/application) file the list of all Java classes with REST implementations. All REST APIs of Bluemix.info can be invoked via “api/” in the URL which is the filter defined in the web.xml. The implementations of the REST APIs then define the rest of the path. For example the [REST API](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/RestAPIGetCuratedNews.java) to read curated news can be invoked via <http://www.bluemix.info/api/curatednews>.

 After the configuration you can develop your APIs pretty easily. Check out the example API to [add authors](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/RestAPIAddOrUpdatePersonJSON.java).

![image](/assets/img/2014/12/jaxrs.png)

 The API is declared to both consume and produce JSON. As an input parameter the method has the data transfer object [AuthorDTO](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/AuthorDTO.java).   
 The nice thing is that the deserialization is done automatically by Wink. Make sure though that you use the wink-jackson-provider in your pom.xml since not all of the other providers support this.

 In order to return JSON you can also use Jackson. Alternatively there are other libraries like [google-gson](https://code.google.com/p/google-gson/) to serialize Java objects into JSON.

 In my next blog entry I’ll describe how I’ve documented the APIs via Swagger which are the other annotations you see in the code.

 As a completely unrelated topic, yesterday I learned that you can define routes to your application without the “www”. So Bluemix.info is now also accessible via [Bluemix.info](http://bluemix.info/). Since the Bluemix user interface doesn’t support this yet, you can use the command line interface, e.g. “cf map-route news-aggregator bluemix.info”.