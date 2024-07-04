---
id: 1463
title: 'Maven Plugin to build Images and run Docker Containers'
date: '2015-09-23T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/maven-plugin-to-build-images-and-run-docker-containers/'
permalink: /article/23.09.2015102508NHEBVR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
custom_permalink:
    - article/23.09.2015102508NHEBVR.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324523634'
categories:
    - Articles
---

 In order for Java developers to test their applications in containers they typically have to build their code, create an image and run a container. You can use the Docker command line interface to manage images and containers, but at least for me that’s often error-prone and I have to go back to my [cheatsheet](http://heidloff.net/nh/home.nsf/article.xsp?id=17.08.2015084655NHE9YE.htm) to find the right commands. I tried a Docker Maven plugin instead and my initial experience is very positive.

There are actually several Maven plugins for Docker. Roland Huß wrote a nice [high level comparison](https://github.com/rhuss/shootout-docker-maven) where he explains why he created another plugin. I tried the Spotify one briefly but that one doesn’t allow running containers. The plugin from Roland [rhuss/docker-maven-plugin](https://github.com/rhuss/docker-maven-plugin) seems very promising. Below I used it for my [simple Java sample](http://heidloff.net/nh/home.nsf/article.xsp?id=07222015115210AMNHEDL7.htm).

![image](/assets/img/2015/09/dockermavenplugin.png)

With the plugin you can build images and run containers and also easily remove these again which is especially important in the iterative development phase.

Build image:   
&gt; mvn docker:build

Run container:   
&gt; mvn docker:start

Stop and remove container:   
&gt; mvn docker:stop

Remove image:   
&gt; mvn -Ddocker.removeAll docker:remove

The plugin also supports to push images to other registries but I haven’t tried it yet. To find out more read the [Intro](https://github.com/rhuss/docker-maven-plugin/blob/master/doc/intro.md) and the [Manual](https://github.com/rhuss/docker-maven-plugin/blob/master/doc/manual.md).