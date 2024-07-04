---
id: 2016
title: 'Measuring Heart Rate with Wireless Earphones and Bluemix'
date: '2016-04-07T14:06:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2016'
permalink: /article/heart-rate-bluemix-the-dash/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4727855774'
custom_permalink:
    - article/heart-rate-bluemix-the-dash/
categories:
    - Articles
---

[The Dash](http://www.bragi.com/) from Bragi are wireless smart earphones with a lot of sensors in them. Below is a quick example how to get data from the heart rate sensor and send it to [IBM Bluemix](https://bluemix.net). This functionality could be used, for example, to track the health of factory workers or patients in hospitals.

[I open sourced the code on GitHub.](https://github.com/IBM-Bluemix/node-mqtt-for-dash)

At this point the controller is running on a MacBook (when the device will expose more sensor data, I’d like to provide a sample mobile app). The controller talks to The Dash via [Bluetooth Low Energy](https://www.bluetooth.com/what-is-bluetooth-technology/bluetooth-technology-basics/low-energy) and to the [Internet of Things Foundation](https://console.ng.bluemix.net/docs/services/IoT/index.html#gettingstartedtemplate) on Bluemix via [MQTT](http://mqtt.org/).

Here is a screenshot of the heart rate data visualized via another Bluemix service [IoT Platform Analytics Real-Time Insights](https://console.ng.bluemix.net/docs/services/iotrtinsights/index.html).

![image](/assets/img/2016/04/dash-2.jpg)

This is a photo of The Dash.

![image](/assets/img/2016/04/dash-1.jpg)

In order to visualize the data I defined a message schema with a data source and data points.

![image](/assets/img/2016/04/dash-3.jpg)

I added a dashboard with a flow chart displaying the heart rate. The same service could be used, for example, to trigger certain actions if the heart rate is too high or too low.

![image](/assets/img/2016/04/dash-4.jpg)