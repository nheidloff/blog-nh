---
id: 1357
title: 'Bluemix Selfie Drone now available as Open Source'
date: '2015-07-16T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/bluemix-selfie-drone-now-available-as-open-source/'
permalink: /article/16.07.2015100036NHEBEF.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/16.07.2015100036NHEBEF.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4325351447'
categories:
    - Articles
---

 The [Bluemix Selfie Drone](http://heidloff.net/nh/home.nsf/article.xsp?id=07142015101816AMNHEBRH.htm) is now available as open source. [Get the code from GitHub](https://github.com/ibm-bluemix/drone-selfie).

 The project contains an application to take selfies via a [Parrot AR Drone 2.0](http://ardrone2.parrot.com/). Via navigation buttons in a web application the drone can be steered and a series of pictures can be taken. The pictures are stored for later review. Additionally faces on the pictures are recognized and portraits are cropped out which can be tweeted. Check out the screenshot of the [web application](http://heidloff.net/nh/home.nsf/dx/selfie-drone3.png/$file/selfie-drone3.png).

![image](/assets/img/2015/07/selfie-drone5.jpg)

 The application has been implemented via [IBM Bluemix](https://bluemix.net/) and the [Internet of Things](https://console.ng.bluemix.net/catalog/internet-of-things/) service. The pictures are stored in a [Cloudant NoSQL](https://console.ng.bluemix.net/catalog/cloudant-nosql-db/) database. The [Alchemy Face Recognition API](http://www.alchemyapi.com/products/alchemyvision/face-detection) is used to find the faces. The web application has been built via Java and the [Liberty for Java](https://console.ng.bluemix.net/catalog/liberty-for-java/) runtime.

 To run the application you also need to set up the [Parrot drone controller](https://github.com/IBM-Bluemix/parrot-sample) which is a Node.js application running on your notebook. This application uses the [node-ar-drone](https://github.com/felixge/node-ar-drone) module, an implementation of the Parrot networking protocols, to communicate with the drone. To find out more about the app dev capabilities of the Parrat drones check out [Parrot For Developers](http://developer.parrot.com/). To find out more about the controller check out the [video](https://www.youtube.com/watch?v=-nxiAQJMaW4) from Ryan Baxter.

 Bluemix made the implementation of the application pretty easy. I used the IoT service because it manages the secure/reliable communications and provides a free tier up to 10 devices for testing. The service has the ability to create organizations, register devices and applications and ensure only applications that are registered to the organization can communicate to the device end points.

 I used the AlchemyVision Face API to identify faces on the pictures. There is a simple REST API that you can [try](http://www.alchemyapi.com/products/demo/face-detection) online. The API also returns the gender and age of the recognized people which I didn’t use in this application. It even recognizes specific people from a corpus of 60,000 well known people.

 I chose the Cloudant NoSQL database because it’s really easy to store the pictures as attachments. It’s also easy to create a database and the design programmatically the first time the application code accesses the database. Plus for development purposes developers can use the database service for free as long as they use less than 20GB of data and less than 100,000 API calls per month.

 As runtime I picked Liberty for Java but I also could have used other runtimes like Node.js. I decided to use Java simply because personally I have most experience in Java and I didn’t see a compelling reason to use another technology. There is also a good sample how to use [web sockets](http://heidloff.net/nh/home.nsf/article.xsp?id=09.07.2015083534NHE9RB.htm) which I needed to display the pictures and there are also many other samples and tutorials I could leverage. I did the frontend via [AngularJS](https://angularjs.org/) which invokes REST APIs implemented in the Java application.