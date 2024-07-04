---
id: 2072
title: 'Useful MQTT Tools for the IBM Watson IoT Platform'
date: '2016-05-03T08:00:41+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2072'
permalink: /article/useful-mqtt-tools-ibm-watson-iot-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/useful-mqtt-tools-ibm-watson-iot-bluemix/
categories:
    - Articles
---

For the development of Internet of Things applications it’s often useful to simulate devices. Below are two options which are easy to use.

The instructions describe how to connect to the [IBM Watson IoT Platform](http://www.ibm.com/internet-of-things/) on [Bluemix](https://bluemix.net). In all cases you need to create your own [Internet of Things Platform service](https://new-console.ng.bluemix.net/catalog/services/internet-of-things-platform/) and create your own device type and device.

**MQTT Helper**

With the [MQTT Helper](http://mqtt-helper.mybluemix.net/) application on Bluemix you can connect to a MQTT broker and subscribe and publish to MQTT topics. The trick is to know the right information for the form.

- Server: 1o56n8.messaging.internetofthings.ibmcloud.com (replace “1o56n8” with your IoT organization name)
- Port: 1883
- Client ID: d:1o56n8:TestDeviceType:TestDevice (replace the org, device type and device id)
- Username: “use-token-auth”
- Password: your device’s authentication token

Here is an example how to publish messages as JSON:

- Topic: iot-2/evt/messageId122/fmt/json
- Payload: {hello:”world”}

![image](/assets/img/2016/05/mqtttool1.jpg)

In the dashboard of the IoT service you can see the connection status and received messages.

![image](/assets/img/2016/05/mqtttool4.jpg)

**MQTTLens**

[MQTTLens](https://chrome.google.com/webstore/detail/mqttlens/hemojaaeigabkbcookmlgmdigohjobjm?hl=en) is a Google Chrome application which is similar to the MQTT Helper application. The same instructions as above apply.

![image](/assets/img/2016/05/mqtttool2.jpg)

![image](/assets/img/2016/05/mqtttool3.jpg)