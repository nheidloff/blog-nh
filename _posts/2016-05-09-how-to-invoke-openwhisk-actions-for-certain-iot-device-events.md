---
id: 2083
title: 'How to invoke OpenWhisk Actions for certain IoT Device Events'
date: '2016-05-09T07:26:26+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2083'
permalink: /article/openwhisk-actions-iot-device-events/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openwhisk-actions-iot-device-events/
categories:
    - Articles
---

Serverless Computing is often useful in event-driven Internet of Things (IoT) scenarios. For example when IoT sensors exceed a certain temperature actions are invoked to fix the issue.

[OpenWhisk](https://developer.ibm.com/openwhisk/) is IBM’s serverless computing offering in [Bluemix](https://bluemix.net). In order to implement a use case like above with the experimental OpenWhisk service, at this point you need to deploy a non-serverless application which receives MQTT events from IoT devices and invokes the appropriate OpenWhisk actions. While such a model seems to defeat the purpose of a serverless architecture, it allows developers to add their own filtering logic. For example rather than invoking hundreds of actions for hundreds of device events, you can invoke the potentially processing-intensive actions only for certain events, for example when the temperature is too hot.

Below is a simple sample how you could do this. Here is a sample action.

![image](/assets/img/2016/05/openwhiskiot1.jpg)

```
function main(params) {
   params = JSON.stringify(params);
   return { "message": "you sent me " + params };
}
```

For testing purposes you can invoke events via [MQTT tools]({{ "/article/useful-mqtt-tools-ibm-watson-iot-bluemix" | relative_url }}).

![image](/assets/img/2016/05/openwhiskiot2.jpg)

The following code shows a Node.js application that can be deployed via Cloud Foundry or Docker on Bluemix.

```
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var express = require('express');
var app = express();
app.get('/', function (req, res) {
   res.send('up');
});
app.listen(appEnv.port, appEnv.bind, function() {
   console.log('listening on port ' + appEnv.port);
});

var openwhisk = require('openwhisk');
var ow = openwhisk({ api: 'https://openwhisk.ng.bluemix.net/api/v1/', 
   api_key: 'xxx:xxx', 
   namespace: 'niklas_heidloff@de.ibm.com_dev' });

var Client = require("ibmiotf");
var appClientConfig = {
   "org" : "1o56n8",
   "id" : 'myapp',
   "auth-key" : "a-1o56n8-xxx",
   "auth-token" : "xxx"
}
var appClient = new Client.IotfApplication(appClientConfig);
appClient.connect();

appClient.on("connect", function () {
   // change this for the device events you're interested in   
   appClient.subscribeToDeviceEvents("TestDeviceType","+","+","json");
});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
   // add your own filter logic here    
   payload = JSON.parse(payload);
   ow.actions.invoke({ actionName: "openwhisk",
      params: payload }).then(result => {
         console.log('success', result);
      })
});
```

The Node application uses [iot-nodejs](https://github.com/ibm-watson-iot/iot-nodejs) for the MQTT part and [openwhisk](https://github.com/openwhisk/openwhisk-client-js) as a convenience library to invoke actions.

```
{
  "name": "mqtt-to-openwhisk",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "ibmiotf": "^0.2.12",
    "openwhisk": "2.0.0",
    "express": "4.13.4",
    "cfenv": "1.0.3"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "",
  "license": ""
}
```

Invoked actions show up in the OpenWhisk dashboard.

![image](/assets/img/2016/05/openwhiskiot3.jpg)

As alternative to deploying a Node application you could also use [Node-RED](http://nodered.org/), the incoming IoT node and the [openwhisk](http://flows.nodered.org/node/node-red-node-openwhisk) node.