---
id: 1022
title: 'Swagger used in Bluemix.info to document and invoke REST APIs'
date: '2014-12-10T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/swagger-used-in-bluemix-info-to-document-and-invoke-rest-apis/'
permalink: /article/10.12.2014100016NHECKQ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
custom_permalink:
    - article/10.12.2014100016NHECKQ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4325601648'
categories:
    - Articles
---

 In my previous blog entry I described how the [REST APIs of Bluemix.info](http://heidloff.net/nh/home.nsf/article.xsp?id=09.12.2014113941NHEEHV.htm) have been implemented. Rather than documenting these APIs somewhere else, I’ve used Java annotations to do this directly in the source code. I think doing this directly in the source code is a good thing since it reminds developers that they have to update the documentation whenever they change the API (or even better don’t change the API in the first place). Plus it’s more efficient to do this in one place rather than having to use another tool.

 There are several tools that allow doing this. For [Bluemix.info](http://bluemix.info/) I’ve used the open source project [Swagger](http://swagger.io/). Swagger contains several components, most importantly a [specification](https://github.com/swagger-api/swagger-spec) for documenting RESTful APIs. I’ve used the older [version 1.2](https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md) (but should have used [version 2.0](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md) which as I learned today is available now).

 In addition to the specification there are many [different client libraries](https://github.com/swagger-api/swagger-spec#additional-libraries) and tools for different languages and platforms. For Bluemix.info I’ve used [swagger-servlet](https://github.com/swagger-api/swagger-core/tree/master/modules/swagger-servlet) and declared it in [pom.xml](https://github.com/IBM-Bluemix/news-aggregator/blob/master/pom.xml) as dependency. In order to configure it you need to define ApiDeclarationServlet and DefaultServletReaderConfig in [web.xml](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/webapp/WEB-INF/web.xml) and tell Swagger in which packages it should try to find the annotations.

 To document your REST APIs you need to add additional Java annotations to your classes that are already marked as REST APIs via JAX-RS annotations. As an example check out the [API](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/api/RestAPIAddOrUpdatePersonForm.java) to add authors. Via @ApiOperation the type of operation is defined, as well as the name and protocols. Via @ApiImplicitParams you can define input parameters, e.g. whether they are mandatory or optional, what type they have, default values, etc. And via @ApiResponses you define the possible responses, e.g. HTTP status codes. As input and output parameters you can also use Java classes which is really convenient since Swagger reads automatically the classes’ fields/methods.

 Once you’ve added the annotations you can access the definition of your API via URL, e.g. <https://www.bluemix.info/api-docs/api>.

 The other great thing about Swagger is that it comes with a [sample UI](https://github.com/swagger-api/swagger-ui). This user interface displays the different APIs with their input and output parameters. Plus it allows invoking the APIs directly via some sort of API explorer. You can try it for the [Bluemix.info APIs](https://www.bluemix.info/swagger/index.html#!/api) yourselves (but only api/curatednews and api/news can be invoked without authentication).

![image](/assets/img/2014/12/bluemixinfoswagger.png)