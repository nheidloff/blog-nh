---
id: 1655
title: 'Building an Apache Kafka Messaging Producer on Bluemix'
date: '2015-12-02T08:43:16+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1655'
permalink: /article/Apache-Kafka-Messaging-Producer-on-Bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4368219310'
custom_permalink:
    - article/Apache-Kafka-Messaging-Producer-on-Bluemix/
categories:
    - Articles
---

[Apache Kafka](http://kafka.apache.org/) is a high-throughput distributed messaging system which is getting a lot of attention these days. There is good documentation available that describes Kafka’s functionality and benefits as well as comparisons to other technologies like RabbitMQ. As quick start I suggest to read the [Kafka introduction](http://kafka.apache.org/documentation.html#introduction) and to watch this [video](https://www.youtube.com/watch?v=9RMOc0SwRro).

Messaging systems have the benefit of decoupling the processing of data (consumers) from the data producers and with Kafka you can scale the consumers easily and separately. Furthermore via asynchronous processing you can offload work and improve the application user experience. These capabilities are especially important for cloud native applications with microservices.

Recently Kafka 0.9 was released which is now [available](https://developer.ibm.com/messaging/2015/11/12/ibm-message-hub-brings-apache-kafka-to-bluemix/) as [Message Hub](https://www.ng.bluemix.net/docs/services/MessageHub/index.html) (beta) service in [Bluemix](https://bluemix.net). For developers there are different APIs available and my colleague Niall Weedon provided [samples](https://github.com/ibm-messaging/message-hub-samples) for how to use them. There is a Java API, a REST API and a Node.js API which wraps the REST API and adds IBM specific functionality like administration and easier authentication.

The [Node.js sample](https://github.com/ibm-messaging/message-hub-samples/tree/master/nodejs/bluemix-chat-sample) is a simple chat application. It uses the Node module [cfenv](https://github.com/cloudfoundry-community/node-cfenv) to access the Bluemix environment variables and the Node module [message-hub-rest](https://github.com/ibm-messaging/message-hub-rest) to access Kafka. I modified the sample slightly to 1. separate the consumer from the producer and to 2. remove the chat sample application. Below is the minimal code for a producer. Tomorrow I’ll blog more about the consumer.

You can run the producer either locally or on Bluemix. To run it on Bluemix, create a Bluemix Node.js application, add the Message Hub service and execute these commands from the project’s root directory.

```
cf login
cf push <mykafkaproducer>
curl http://mykafkaproducer.mybluemix.net
```

To run the producer locally, execute these commands.

```
npm install
node app.js <message_hub_rest_endpoint> <message_hub_api_key>
curl http://localhost:6003
```

In order to test whether it works, deploy the sample chat application and connect to see the messages from your producer. Both the chat application and your producer application need to use the same Message Hub service.

![image](/assets/img/2015/12/kafkaproducerchat.jpg)

**package.json**

```
{
  "name": "node-kafka-producer",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "4.12.x",
    "cfenv": "1.0.x",
    "message-hub-rest": "^1.0.1"
  },
  "repository": {},
  "engines": {
    "node": "0.12.x"
  } 
}
```

**app.js**

```
/**
 * Copyright 2015 IBM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
*/
var express = require('express');
var app = express();

var Cfenv = require('cfenv');
var MessageHub = require('message-hub-rest');
var appEnv = Cfenv.getAppEnv();
var instance;
var cleanedUp = false;
var topic = 'livechat';

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});

app.get('/', function (req, res) {
  pushMessage("Hello World!");
  res.send('Hello World!');
});

var start = function(restEndpoint, apiKey, callback) {
  if(!appEnv.services || (appEnv.services && Object.keys(appEnv.services).length === 0)) {
    if(restEndpoint && apiKey) {
      appEnv.services = {
        "messagehub": [
           {
              "label": "messagehub",
              "credentials": {
                 "api_key": apiKey,
                 "kafka_rest_url": restEndpoint,
              }
           }
        ]
      };
    } else {
      console.error('A REST Endpoint and API Key must be provided.');
      process.exit(1);
    }
  } else {
    console.log('Endpoint and API Key provided have been ignored, as there is a valid VCAP_SERVICES.');
  }

  instance = new MessageHub(appEnv.services);

  instance.topics.create(topic)
      .then(function(response) {
        console.log('topic created');
      })
      .fail(function(error) {
        console.log(error);
        stop(1);
      });
};

var pushMessage = function(message) {
    var list = new MessageHub.MessageList();
    var message = {
      user: "Niklas",
      message: message,
    }

    list.push(JSON.stringify(message));

    instance.produce(topic, list.messages)
      .fail(function(error) {
        throw new Error(error);
      });
};

var registerExitHandler = function(callback) {
  if(callback) {
    var events = ['exit', 'SIGINT', 'uncaughtException'];

    for(var index in events) {
      process.on(events[index], callback);
    }
  } else if(!callback) {
    throw new ReferenceException('Provided callback parameter is undefined.');
  }
};

// Register a callback function to run when
// the process exits.
registerExitHandler(function() {
  stop();
});

var stop = function(exitCode) {
  exitCode = exitCode || 0;

  if(!cleanedUp) {
    console.log('Running exit handler.');
    cleanedUp = true;
    process.exit(exitCode);
  }
};

// If this module has been loaded by another module, don't start
// the service automatically. If it's being started from the command license
// (i.e. node app.js), start the service automatically.
if(!module.parent) {
  if(process.argv.length >= 4) {
    start(process.argv[process.argv.length - 2], process.argv[process.argv.length - 1]);
  } else {
    start();
  }
}

module.exports = {
  start: start,
  stop: stop,
  appEnv: appEnv
}
```