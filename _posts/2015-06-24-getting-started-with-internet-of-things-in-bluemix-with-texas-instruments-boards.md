---
id: 1318
title: 'Getting started with Internet of Things in Bluemix with Texas Instruments Boards'
date: '2015-06-24T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/getting-started-with-internet-of-things-in-bluemix-with-texas-instruments-boards/'
permalink: /article/24.06.2015115559NHEDNJ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/24.06.2015115559NHEDNJ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4332089282'
categories:
    - Articles
---

 Last week at the [hackathon](http://heidloff.net/nh/home.nsf/article.xsp?id=06222015125447PMNHEETB.htm) at Devoxx we handed out some [SimpleLink Wi-Fi CC3200 LaunchPads](http://www.ti.com/tool/cc3200-launchxl) that developers could use for their hacks. These devices are rather cheap (around 40 Euro), have a built in Wifi and provide various sensors: temperature, accelerometer, buttons, network quality.

My colleague Mark VanderWiele wrote a starter application that helps people to connect to [Bluemix](https://bluemix.net/) and receive sensor data. I added a simple Node-RED flow and some documentation and we published the code on [GitHub](https://github.com/IBM-Bluemix/bluemix-ti-board-starter). With this project developers are able to get a first IoT application running on Bluemix with registered devices using the [MQTT](http://mqtt.org/) protocol in just a few minutes.

The GitHub project contains [documentation](https://github.com/IBM-Bluemix/bluemix-ti-board-starter) how to set up everything. Essentially you need to install the [Energia](http://energia.nu/download/) IDE and the [driver](http://energia.nu/files/EnergiaFTDIDrivers2.2.18.zip) of the board and then add your specific device credentials and your Wifi access credentials in the code. After this you can compile and upload the application to the board.

Before this you should create an application on Bluemix based on the [Internet of Things Foundation Starter](https://console.ng.bluemix.net/?ace_base=true#/store/appType=web&cloudOEPaneId=store&appTemplateGuid=iot-template&fromCatalog=true) and add the [Internet of Things service](https://console.ng.bluemix.net/?ace_base=true#/store/serviceOfferingGuid=8e3a9040-7ce8-4022-a36b-47f836d2b83e&fromCatalog=true) to it. You’ll then be able to register your device and get the credentials you need to put in the application code.

There is a [Node-RED flow](https://raw.githubusercontent.com/IBM-Bluemix/bluemix-ti-board-starter/master/images/flow.png) that shows how to receive the incoming data and to listen to events like the “Button Pressed” event.

![image](/assets/img/2015/06/photo1.jpg)

Since the board comes with Wifi, the board doesn’t have to be connected to a notebook, smartphone or tablet.

![image](/assets/img/2015/06/photo2.jpg)