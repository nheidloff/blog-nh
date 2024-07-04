---
id: 1359
title: 'Maven Plugin to install Web Resources in Bluemix Java Projects via Bower'
date: '2015-07-21T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/maven-plugin-to-install-web-resources-in-bluemix-java-projects-via-bower/'
permalink: /article/21.07.2015090519NHEABV.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
custom_permalink:
    - article/21.07.2015090519NHEABV.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4342774531'
categories:
    - Articles
---

 Similarly to the dependency managers mvn, npm, cocoapods, etc. [Bower](http://bower.io/) is a nice dependency manager for web resources to pull down JavaScript, CSS and other files. This makes it easy for developers to find and install certain libraries. Plus the same functionality can be integrated in the build process.

 Using Bower as part of a build might make sense if, for example, you want to get latest versions of libraries with security fixes automatically. If you want to open source code, it might also make it easier for you to only refer and not include third party libraries dependent on your corporate open source policies.

 I’ve found a nice Maven plugin to run Bower as part of a build and it works nicely, both locally as well as on Bluemix DevOps – [frontend maven plugin](https://github.com/eirslett/frontend-maven-plugin). The plugin installs Node and npm and then Bower.

 To define the web resources you want to download a [bower.json](http://bower.io/docs/creating-packages/#bowerjson) file is used. With a [.bowerrc](http://bower.io/docs/config/) file Bower can be configured, e.g. the target path for the web resources.

 The installation of the Maven plugin is simple and well [documented](https://github.com/eirslett/frontend-maven-plugin). Essentially you need to define the plugin in the pom.xml and you need a package.json file.

 Here is how my sample Java project looks like before building it.

![image](/assets/img/2015/07/bower1.jpg)

 After a mvn build the web resources have been downloaded to the WebContent directory.

![image](/assets/img/2015/07/bower2.jpg)

 You don’t have to do anything else to use the same functionality on Bluemix DevOps. Just make sure you add the new files and folders to your .gitignore.

![image](/assets/img/2015/07/bower3.jpg)