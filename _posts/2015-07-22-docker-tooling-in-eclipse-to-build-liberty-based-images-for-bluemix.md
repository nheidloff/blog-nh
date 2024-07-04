---
id: 1360
title: 'Docker Tooling in Eclipse to build Liberty based Images for Bluemix'
date: '2015-07-22T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/docker-tooling-in-eclipse-to-build-liberty-based-images-for-bluemix/'
permalink: /article/07222015115210AMNHEDL7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/07222015115210AMNHEDL7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324801296'
categories:
    - Articles
---

 While some developers prefer command line tools, I often use graphical tools if available since I cannot memorize all the different commands. That’s why I tried the relative new [Docker Tooling for Eclipse](http://www.eclipse.org/community/eclipse_newsletter/2015/june/article3.php). The plugin is relative new and there is certainly room for improvements but it helps with managing images and containers, e.g. running containers and creating images. Below is a simple sample how to use the tooling to create a [Liberty](https://www.ng.bluemix.net/docs/#!starters/liberty/index.html#liberty) based image with a hello world app that can be deployed to [Bluemix](https://bluemix.net/).

 Since the end of last year the [Liberty profile](https://developer.ibm.com/wasdev/blog/2014/12/04/liberty-docker/) is on [Docker Hub](https://registry.hub.docker.com/_/websphere-liberty/). The [Liberty Profile image](https://www.ng.bluemix.net/docs/containers/container_images_creating_ov.html#container_images_liberty) is supplied for IBM Containers. You can use this image to build your application Java-based war files in a Liberty container.

 The hello world sample contains one html file on the context root “/”.

![image](/assets/img/2015/07/dockereclipseliberty01.png)

![image](/assets/img/2015/07/dockereclipseliberty02.png)

 There is also a servlet on the path “Servlet”.

![image](/assets/img/2015/07/dockereclipseliberty03.png)

![image](/assets/img/2015/07/dockereclipseliberty04.png)

 The context root “/” is defined in ibm-web-ext.xml.

![image](/assets/img/2015/07/dockereclipseliberty05.png)

 The sample uses Maven to build the project and create a war file.

![image](/assets/img/2015/07/dockereclipseliberty06.png)

 The Maven install can be triggered from the Eclipse IDE.

![image](/assets/img/2015/07/dockereclipseliberty07.png)

 The following Dockerfile is a very simple sample. Read the [documentation](https://registry.hub.docker.com/_/websphere-liberty/) for more options.

![image](/assets/img/2015/07/dockereclipseliberty08.png)

 Via the Docker Tooling you can refer to the Dockerfile to create a new image.

![image](/assets/img/2015/07/dockereclipseliberty09.png)

 Based on the image you can run containers. In the sample I used all defaults, e.g. the port mappings.

![image](/assets/img/2015/07/dockereclipseliberty10.png)

 To find out the URL to invoke your deployed app on Docker open the ports section. The 0.0.0.0 needs to be replaced with your Docker ip address. You can find it out via “boot2docker ip”. Since I don’t want to do this over and over I created an entry in my host file for “dockerhost”. To run the sample app with the context root “/” simply invoke “http://dockerhost:yourport”.

![image](/assets/img/2015/07/dockereclipseliberty11.png)