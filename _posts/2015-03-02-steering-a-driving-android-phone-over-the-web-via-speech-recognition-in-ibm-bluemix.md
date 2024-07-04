---
id: 1144
title: 'Steering a driving Android Phone over the Web via Speech Recognition in IBM Bluemix'
date: '2015-03-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/steering-a-driving-android-phone-over-the-web-via-speech-recognition-in-ibm-bluemix/'
permalink: /article/02.03.2015083022NHEATJ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/02.03.2015083022NHEATJ.htm/
dsq_thread_id:
    - '4322914381'
categories:
    - Articles
---

 My colleagues [Bryan Boyd](https://twitter.com/bryanboyd) and [Mark VanderWiele](https://twitter.com/MarkVanderwiele) have created a nice demo where you can drive smartphones using [Sphero](http://www.gosphero.com/sphero/) balls. I’ve modified the sample slightly so that it also works for Android phones. Watch the video to see how to steer a driving smartphone via [IBM Bluemix](http://bluemix.net/), the [Internet of Things](https://internetofthings.ibmcloud.com/) and cognitive services from [IBM Watson](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/).

{% include embed/youtube.html id='EmR9rdkkagQ' %}

 Here are the details:

 The phone is carried by a [Sphero](http://www.gosphero.com/sphero/) ball and a [chariot](http://store.gosphero.com/products/chariot).

 The phone communicates with the ball via bluetooth protocol. The native Android app uses the [Sphero Android SDK](https://github.com/orbotix/Sphero-Android-SDK).

 The phone communicates with the [Internet of Things](https://www.ng.bluemix.net/docs/#services/IoT/index.html#gettingstartedtemplate) service in Bluemix via a [Java MQTT library](http://www.eclipse.org/paho/clients/java/).

 A [Node-RED](http://heidloff.net/nh/home.nsf/article.xsp?id=21.01.2015081841NHEAL8.htm) flow is used to send commands to the native app either when certain URLs are invoked or certain Twitter tweets are sent.

 For the speech recognition the sample of the [Speech to Text](https://speech-to-text-demo.mybluemix.net/) service has been slightly modified to send the text to the Internet of Things service via [MQTT](http://www.eclipse.org/paho/clients/js/) from the client side JavaScript.

 The Node-RED flow receives the spoken text via an Internet of Things input node. The first word of a text is used to interpret the command and then the same flow as previously is triggered.

 This is a screenshot of the flow for incoming URL commands and the devices.

![image](/assets/img/2015/03/DSC03609s.png)