---
id: 2179
title: 'Analyzing Data with IBM Watson Internet of Things'
date: '2016-06-14T08:47:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2179'
permalink: /article/analyzing-data-ibm-watson-internet-of-things/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/analyzing-data-ibm-watson-internet-of-things/
categories:
    - Articles
---

Once you’ve connected your ‘things’ with the [Watson Internet of Things](http://www.ibm.com/cloud-computing/bluemix/internet-of-things/) platform, the next question is how to process the received data. In some scenarios the raw data triggers actions immediately, sometimes the data needs to be persisted so that it can be used for historical/descriptive analysis and sometimes the data is used to perform predictive analytics and prescriptive analytics.

The Watson Internet of Things platform uses [MQTT](http://mqtt.org/) which is a lightweight and secure publish/subscribe messaging transport protocol. Developers can write applications that talk [MQTT](https://github.com/mqtt/mqtt.github.io/wiki/libraries) to do whatever they like to do. In addition to this the Watson Internet of Things platform provides functionality to process data without custom development.

Below is an (incomplete) list of features and patterns how to handle the data from Internet of Things devices.

![image](/assets/img/2016/06/iotfitstogether.png)

In the easiest case, for example for demonstration purposes, data can be displayed via [cards](https://new-console.ng.bluemix.net/docs/services/IoT/data_visualization.html) in the Internet of Things dashboard.

With the IoT Real-Time Insights [rules](https://new-console.ng.bluemix.net/docs/services/iotrtinsights/rules.html#rules) can be defined to invoke actions like IFTTT, Send Email, Webhook and Node-RED. Read the article [Perform Actions in IBM Watson IoT Platform Analytics Real-Time Insights](https://developer.ibm.com/recipes/tutorials/perform-actions-in-ibm-watson-iot-platform-analytics-real-time-insights/) for details.

[Node-RED](http://nodered.org/) is a visual tool for wiring Internet of Things scenarios. Data can be received via an incoming IoT node and custom code can be developed via JavaScript. Node-RED is especially useful in prototypes and first iterations of new IoT applications. Read [What is Node-RED? How can it be used for the Internet of Things?]({{ "/article/21.01.2015081841NHEAL8.htm" | relative_url }}) for more.

Via the Watson IoT platform data can be stored automatically either in the TimeSeries database or Cloudant NoSQL database. Applications can access this data asynchronously for descriptive analytics. Read the article [Timeseries Data Analysis of IoT events by using Jupyter Notebook](https://developer.ibm.com/recipes/tutorials/timeseries-data-analysis-of-iot-events-by-using-jupyter-notebook/) for more.

[Apache Spark](https://new-console.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index.html#index) can be used to analyze data and notebooks can be used to visualize data. Additionally the machine learning library in Apache Spark can be used for predictive analytics. Read the articles [Realtime IoT data analysis using Apache Spark](https://developer.ibm.com/recipes/tutorials/spark-streaming-ibm-watson-iot-platform-integration/) for more.

Another alternative is the [Predictive Analytics](https://new-console.ng.bluemix.net/catalog/services/predictive-analytics/) service on Bluemix. You can define models and [deploy]({{ "/article/getting-started-predictive-analytics-bluemix" | relative_url }}) the models to Bluemix to perform predictions. Read [Engage Machine Learning for detecting anomalous behaviors of things](https://developer.ibm.com/recipes/tutorials/engage-machine-learning-for-detecting-anomalous-behaviors-of-things/) for more.

There is also a connector between MQTT and Kafka which is provided in the Bluemix [Message Hub](https://new-console.ng.bluemix.net/docs/services/MessageHub/index.html#messagehub) service. Read [Integrating Watson IoT Platform with Message Hub and Apache Spark](https://developer.ibm.com/recipes/tutorials/integrating-watson-iot-platform-with-message-hubkafka/) for more.

For many IoT scenarios serverless computing is interesting. Read my earlier [blog]({{ "/article/openwhisk-actions-iot-device-events" | relative_url }}) and check out the open source project [openwhisk\_mqtt\_feed](https://github.com/jthomas/openwhisk_mqtt_feed).