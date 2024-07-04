---
id: 1046
title: 'IBM Bluemix to track and visualize Data from Lego Mindstorms EV3 Robots'
date: '2015-01-05T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/ibm-bluemix-to-track-and-visualize-data-from-lego-mindstorms-ev3-robots/'
permalink: /article/05.01.2015174120NHEMKW.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/05.01.2015174120NHEMKW.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4322872307'
categories:
    - Articles
---

 This is a slightly unusual blog post since the scenario below has little business value, but maybe it gives people ideas how to leverage the Internet of Things service in Bluemix. During my vacation my son and I played with a new toy – a [Lego Mindstorms EV3](http://www.lego.com/en-us/mindstorms/) robot. As far as I can tell after a week it’s a great way for children to start learning programming and a lot of fun. The robot comes with different types of sensors and a software to write programs to do certain things based on sensor data. For example a good first program is to write some code to tell the robot to drive forward as long as there is enough space.

 For the fun of it I took it one step further and wrote some code to listen to sensor data and push it to [Bluemix](https://bluemix.net/) using the [Internet of Things](https://www.ng.bluemix.net/docs/#services/IoT/index.html#gettingstartedtemplate) service and the [Internet of Things boilerplate](https://developer.ibm.com/bluemix/2014/10/22/internet-of-things-foundation/). We’ve come up with a little game where the robot needs to drive over various colors and the time is tracked. The robot can be moved via the Lego remote control or Android or iOS apps. The time is tracked and displayed in a [web application](http://mindstorms.mybluemix.net/) where people can see their times in a high score list.

 The goal of the game is to move the color sensor above the four colors. The robot starts at the wall, needs to return to the wall between each color and at the end. The touch sensor is used to control this.

![image](/assets/img/2015/01/game2.png)

 The durations of the races are tracked and displayed.

![image](/assets/img/2015/01/highscore.png)

 To track the results the robot is connected to a PC via bluetooth. On the PC a desktop application written in .NET is running that listens for events via the [Lego Mindstorms EV3 API](https://legoev3.codeplex.com/). The program uses a [MQTT .NET library](https://github.com/mqtt/mqtt.github.io/wiki/libraries) to communicate to the Bluemix Internet of Things service. In order to register my robot (indirectly via the PC) I followed these [instructions](https://developer.ibm.com/iot/recipes/improvise-registered-devices/). After this I can see my device and the events on the Internet of Things dashboard.

![image](/assets/img/2015/01/iot.png)

 The data is stored in a Cloudant database and visualized via a simple WebSphere Liberty application. I use the Node-RED app that comes with the boilerplate to put the data automatically into Cloudant.

![image](/assets/img/2015/01/nodered.png)

 Here is a bigger picture of the simple robot with the three sensors. Many more and more [attractive robots](http://www.lego.com/en-us/mindstorms/build-a-robot) can be built.

![image](/assets/img/2015/01/ev3.png)