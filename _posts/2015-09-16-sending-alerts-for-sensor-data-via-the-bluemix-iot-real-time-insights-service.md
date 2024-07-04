---
id: 1454
title: 'Sending Alerts for Sensor Data via the Bluemix IoT Real-Time Insights Service'
date: '2015-09-16T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/sending-alerts-for-sensor-data-via-the-bluemix-iot-real-time-insights-service/'
permalink: /article/16.09.2015104306NHEC8Z.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/16.09.2015104306NHEC8Z.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324830154'
categories:
    - Articles
---

 Earlier this month Greg Knowles [blogged](https://developer.ibm.com/bluemix/2015/09/03/iot-real-time-insights/) about the new [Bluemix](https://bluemix.net/) service [IoT Real-Time Insights](https://console.ng.bluemix.net/catalog/iot-real-time-insights/). Below is a quick demo of one of the many capabilities of this service. When the battery level of a drone falls under a certain percentage notification mails are sent.

 “The IBM IoT Real-Time Insights services allows you to understand IoT data in context and monitor the conditions of your devices and operations. IoT Real-Time Insights works with Internet of Things Foundation to enrich and monitor data from you devices, visualize what’s happening now, and respond to emerging conditions through automated actions.”

 As [Ryan Baxter](http://ryanjbaxter.com/2015/07/07/using-bluemix-and-the-ibm-iot-foundation-to-control-a-drone/) and I have blogged about, in our team we have built some nice [drone demos](https://developer.ibm.com/bluemix/2015/07/16/bluemix-selfies-with-drones/) via the [Internet of Things](https://console.ng.bluemix.net/catalog/internet-of-things/) service in Bluemix. In my simple test I used the Insights service and pointed it to our IoT drone organization.

 In the web user interface of the Insights service you can define virtual data models for the data sent from your devices. In the drone sample this is the battery percentage and GPS data.

![image](/assets/img/2015/09/iotinsights1.png)

 After this you can graphically define rules. In this example I defined to send me mails when the battery percentage is below 87.

![image](/assets/img/2015/09/iotinsights2.png)

 Via the web user interface of the service you can see incoming data, for example in the simple dialog below, or you can define your own dashboards.

![image](/assets/img/2015/09/iotinsights3.png)

 When the battery percentage falls below 87% I receive mails.

![image](/assets/img/2015/09/iotinsights4.png)

 For more information check out the [IoT Real-Time Insights documentation](http://www.ng.bluemix.net/docs/services/iotrtinsights/index.html) and the [video](https://www.youtube.com/watch?v=gj8mcn9oWgE) from Markus Van Kempen.