---
id: 4213
title: 'Running legacy Java Applications locally'
date: '2020-11-13T08:15:09+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4213'
permalink: /article/running-legacy-java-applications-locally/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-legacy-java-applications-locally/
categories:
    - Articles
    - Java
---

I’ve been working on app modernization recently and had to get some older Java EE applications to work. In order to do this, I’ve used containers which was much faster than configuring my machine for the different environments.

**Building Java Code**

Legacy Java apps require older Java versions of course. While there are tools to switch between different locally installed Java versions, I find using containers simpler and cleaner.

There are several images available with different Maven and Java versions. Let’s take a look at a simple example which uses Java 8.

These commands run the Maven container and mount local directories to directories in the container:

```
$ git clone https://github.com/WASdev/sample.daytrader7
$ cd sample.daytrader7
$ docker run --rm -it -v $(pwd):/application -v $(pwd)/target:/root/.m2/repository/net/wasdev/wlp/sample maven:3.3-jdk-8 /bin/bash
```

After this you can initiate the Maven build in the container:

```
$ cd /application
$ mvn install
$ exit
```

In this example you’ll find the built files in the ‘target’ directory.

**Running Application Servers**

The Daytrader example uses WebSphere. The same pattern can obviously be used for other application servers.

Move or copy the application in the ‘wlpcfg’ directory (in this example ‘daytrader-ee7-wlpcfg’) and execute these commands to run WebSphere.

```
$ cd /wlpcfg 
$ docker run --rm -it -p 9082:9082 -v $(pwd):/wlpcfg websphere-liberty /bin/bash
```

In the WebSphere container you can then launch the server.

```
$ cd /wlpcfg 
$ export WLP_USER_DIR=$(pwd)
$ /liberty/wlp/bin/server start daytrader7Sample
```

After this you can open the WebSphere console and the sample.

```
$ open http://localhost:9082/
```