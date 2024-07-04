---
id: 986
title: 'Documenting REST APIs in the Source Code'
date: '2014-05-28T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/documenting-rest-apis-in-the-source-code/'
permalink: /article/28.05.2014085106NHEA2Z.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/28.05.2014085106NHEA2Z.htm/
dsq_thread_id:
    - '4326026966'
categories:
    - Articles
---

 There are several tools available that help documenting REST APIs. One of them is [Swagger](https://helloreverb.com/developers/swagger), an [open source](https://github.com/wordnik/swagger-spec) project under the Apache 2 license.

 “The goal of Swagger™ is to define a standard, language-agnostic interface to REST APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection.”

 For REST APIs implemented in Java you can use Java annotations to document the REST APIs directly in the source code so that documentation and actual APIs are not out of synch. As part of this documentation you can not only define what parameters, types, etc. a service has but also which parameters are mandatory, validations, and more.

 In order to create the actual documentation different mechanisms are available. For example you can use a [Maven plugin](https://github.com/kongchen/swagger-maven-plugin) to generate HTML files using markdown templates. Additionally there is a [servlet](https://github.com/wordnik/swagger-core/wiki/Servlet-Quickstart) that parses the documentation from the source code and serves it up as REST/JSON. This REST/JSON can then be consumed by custom user interfaces or via the out of the box [Swagger UI](https://github.com/wordnik/swagger-ui).

 Check out the samples [developer.wordnik.com](http://developer.wordnik.com/docs.html) and [petstore.swagger.wordnik.com](http://petstore.swagger.wordnik.com/). Similarly to the [Social Business Toolkit API Explorer](https://greenhouse.lotus.com/sbt/SBTPlayground.nsf/Explorer.xsp) you can not only read the documentation, but also try the REST calls directly.

 Last week the involved companies Reverb and Apigee announced the formation of a new working group which will work on the next version 2.0. [Read the details.](http://swagger.wordnik.com/)<a> </a><a></a>