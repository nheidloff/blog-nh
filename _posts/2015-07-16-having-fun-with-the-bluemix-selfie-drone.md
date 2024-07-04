---
id: 1354
title: 'Having Fun with the Bluemix Selfie Drone'
date: '2015-07-16T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/having-fun-with-the-bluemix-selfie-drone/'
permalink: /article/07142015101816AMNHEBRH.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/07142015101816AMNHEBRH.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323339844'
categories:
    - Articles
---

 Recently I had some time to build another [IBM Bluemix](https://bluemix.net/) demonstration which showcases the [Internet of Things](https://console.ng.bluemix.net/solutions/iot) functionality and cognitive [Watson](https://console.ng.bluemix.net/solutions/watson) services. With the “Bluemix Selfie Drone” application you can take selfies via a [Parrot AR Drone 2.0](http://ardrone2.parrot.com/) drone and tweet the portraits on the pictures.

 Via navigation buttons in a web application the drone can be navigated and then multiple pictures can be taken. The [Alchemy Face Recognition API](http://www.alchemyapi.com/products/alchemyvision/face-detection) is used to find the faces on the pictures and the portraits are cropped out.

 The application requires the [drone controller](https://github.com/IBM-Bluemix/parrot-sample) that Ryan Baxter implemented and open sourced. Ryan also extended the project recently so that it also works with a [Bebop drone](http://www.parrot.com/products/bebop-drone/) but I haven’t tested it. The Bebop drone should be able to take pictures with a much higher quality.

 The web application below has been implemented via Java and AngularJS using [web sockets](http://heidloff.net/nh/home.nsf/article.xsp?id=09.07.2015083534NHE9RB.htm) to send the pictures to the web clients. The pictures are also stored in a [Cloudant NoSQL database](https://console.ng.bluemix.net/catalog/cloudant-nosql-db/).

 Here is a picture from me using the selfie drone to take pictures.   
[   
![image](/assets/img/2015/07/selfie-drone4.jpg)  ](http://heidloff.net/nh/home.nsf/dx/selfie-drone4.png/$file/selfie-drone4.png)   
 Via the web application users can navigate the drone and take pictures. Both, the full pictures as well as the portraits, are displayed.   
[   
![image](/assets/img/2015/07/selfie-drone1.jpg)  ](http://heidloff.net/nh/home.nsf/dx/selfie-drone3.png/$file/selfie-drone3.png)   
 I tweeted the [portrait](https://twitter.com/bluedroneselfie/status/620852409053478912) on this picture which Alchemy identified.

 Update July 16th: The application is now available as [open source](https://github.com/IBM-Bluemix/drone-selfie).