---
id: 1152
title: 'Changing the Colors of Sphero Balls dependent on the Personality of Twitter Users'
date: '2015-03-09T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/changing-the-colors-of-sphero-balls-dependent-on-the-personality-of-twitter-users/'
permalink: /article/09.03.2015122939NHEFH4.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/09.03.2015122939NHEFH4.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4339485371'
categories:
    - Articles
---

 Earlier this month I [blogged](http://heidloff.net/nh/home.nsf/article.xsp?id=02.03.2015083022NHEATJ.htm) about how you can steer a driving Android phone over the internet via [IBM Bluemix](http://bluemix.net/) and a [Sphero](http://www.gosphero.com/sphero/) ball. Since I’ll do some presentations about Watson this month I’ve extended the demo slightly based on the suggestion of my colleague Salil Ahuja.

 Via a web application users can enter their Twitter names. The web application reads the last 200 tweets and sends them as input to the Watson [Personality Insights](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights.html) service. The service uses linguistic analytics to infer personality and social characteristics, including Big Five, Needs, and Values, from text, in this example I use the [Big Five](http://en.wikipedia.org/wiki/Big_Five_personality_traits) personality traits. The highest of these five numbers is sent to a Node-RED flow which sends commands to the ball to change the color.

 In my case “Openness” is the highest ranked trait which causes the ball to be red (maybe not most natural color though).

![image](/assets/img/2015/03/persball2.png)

 Below are some more details.

 The web application is a simple web app running on Liberty. It uses [Twitter4J](http://twitter4j.org/en/index.html) to read the tweets and the [Personality Insights API](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/#underAPI) to invoke the Watson service. Then it parses the big five traits and sends the highest ranked trait to the [Internet of Things](https://www.ng.bluemix.net/docs/#services/IoT/index.html#gettingstartedtemplate) service via a [Java MQTT library](http://www.eclipse.org/paho/clients/java/).

![image](/assets/img/2015/03/persball4.png)

 The [Node-RED](http://heidloff.net/nh/home.nsf/article.xsp?id=21.01.2015081841NHEAL8.htm) flow receives the highest big five trait via an Internet of Things input node. After this some processing takes place, where traits are mapped to colors and the colors are sent to the Android phone via a new command.

![image](/assets/img/2015/03/persball3.png)

 The native Android app uses the [Sphero Android SDK](https://github.com/orbotix/Sphero-Android-SDK) to communicates with the ball via bluetooth protocol.