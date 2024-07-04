---
id: 1937
title: 'How to deploy and run Swift Kitura Applications with Docker'
date: '2016-03-03T08:36:09+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1937'
permalink: /article/swift-kitura-docker-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4629958928'
custom_permalink:
    - article/swift-kitura-docker-bluemix/
categories:
    - Articles
---

At InterConnect [IBM](https://developer.ibm.com/swift/) announced and demonstrated various ways to run [Swift](https://swift.org/) code on the server. You can use the [Swift runtime in Bluemix](https://developer.ibm.com/swift/products/ibm-bluemix/) (Cloud Foundry buildpack), you can use the [Swift Sandbox](https://developer.ibm.com/swift/products/ibm-swift-sandbox/), you can write event based logic with [OpenWhisk](https://new-console.ng.bluemix.net/docs/openwhisk/index.html) and you can run Swift in [Docker](https://www.docker.com/) containers on Bluemix. With these capabilities iOS developers can now write server side code in the same language used for mobile apps.

In order to build REST APIs with Swift you need a web framework. For [Node.js](https://nodejs.org/) applications typically the [Express](http://expressjs.com/) framework is used. The counterpart for Swift is [Kitura](https://developer.ibm.com/swift/products/kitura/). Here is how my colleague [Robert Dickerson](https://developer.ibm.com/swift/2016/02/22/building-end-end-cloud-apps-using-swift-kitura/) describes Kitura.

> Kitura is a lightweight web framework that allows you to easily build web services with complex routes. Much of its design was inspired by Express.js based on the success of its overall design in particular URL routing and pluggable middleware. Kitura takes these principles and adds the advantages of Swift.

![image](/assets/img/2016/03/Kitura-hero.png)

Robert wrote a great [tutorial](https://developer.ibm.com/swift/2016/02/22/building-end-end-cloud-apps-using-swift-kitura/) how to use Kitura and run it locally. I tried to package up his [ToDo](https://github.com/IBM-Swift/Kitura-TodoList) sample in a Docker image and run it as container so that you can deploy the application to [Bluemix](https://bluemix.net). Turns out that at this point you need to do one extra step before you can run the [ibmcom/swift-ubuntu](https://hub.docker.com/r/ibmcom/swift-ubuntu/) image as Robert told me.

Download [pcre](http://ftp.exim.org/pub/pcre/pcre2-10.20.tar.gz) and unpack it into a sub-folder ‘pcre2-10.20’ of your project. After this add this Dockerfile to the root.

```
FROM ibmcom/swift-ubuntu:latest
EXPOSE 8090
USER root
RUN apt-get install -y libhttp-parser-dev libcurl4-openssl-dev libhiredis-dev 
COPY ./pcre2-10.20 /root/
RUN cd /root && ./configure && make && make install
RUN cd /root && mkdir swift-helloworld
COPY . /root/swift-helloworld/
RUN cd /root/swift-helloworld && swift build -Xcc -fblocks -Xswiftc -I/usr/local/include -Xlinker -L/usr/local/lib
CMD ["/root/swift-helloworld/.build/debug/TodoList"]
```

To build the image and run the container invoke these commands.

```
docker build -t swift-todos . 
docker run --name swift-todos -p 8090:8090 -d -t swift-todos
```

After this the REST APIs can be invoked via ‘http://dockerhost:8090’. To deploy it to Bluemix follow the [documentation]({{ "/article/17.08.2015084655NHE9YE.htm" | relative_url }}).

![image](/assets/img/2016/03/kitura-small.png)