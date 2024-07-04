---
id: 1320
title: 'Visualize Sensor Data from IoT Devices in Bluemix'
date: '2015-07-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/visualize-sensor-data-from-iot-devices-in-bluemix/'
permalink: /article/08.07.2015082448NHE9JL.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/08.07.2015082448NHE9JL.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323480246'
categories:
    - Articles
---

 Recently I learned about a nice application to visualize data from sensors (and events) of your Internet of Things devices that you’ve registered with the IoT Foundation in [IBM Bluemix](https://bluemix.net/). This can be useful to see live changes of your data and it’s also possible to see historical data. For me this is easier than navigating manually one by one through the last 10 events that are displayed in the IoT Foundation user interface and easier to read than debug nodes in Node-RED.

 Read the [documentation](https://developer.ibm.com/iotfoundation/recipes/visualize-data/) to find out more about the visualization app. The documentation currently describes that you have to build the app via Node.js locally but luckily there is a much easier way. Since the app is on [GitHub](https://github.com/ibm-messaging/iot-visualization) you can also use the Bluemix Deploy capability to deploy the app in your Bluemix organization via one click.

[Deploy](https://hub.jazz.net/deploy/index.html?repository=https%3A%2F%2Fgithub.com%2Fibm-messaging%2Fiot-visualization) the visualization app.

 After this you can either enter an app key manually or just bind your IoT service to the app so that the credentials and registered devices are picked up automatically.

 The screenshot below shows the data from a [Texas Instruments Board](http://heidloff.net/nh/home.nsf/article.xsp?id=24.06.2015115559NHEDNJ.htm).

![image](/assets/img/2015/07/iotvis.png)

 There is also a promising experimental service [IoT Real-Time Insights](https://console.ng.bluemix.net/catalog/iot-real-time-insights/) which might help with visualizing data (and more) but it seems to work for smartphone data only at this point.