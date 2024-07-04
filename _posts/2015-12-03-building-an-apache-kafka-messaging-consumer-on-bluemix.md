---
id: 1664
title: 'Building an Apache Kafka Messaging Consumer on Bluemix'
date: '2015-12-03T07:13:41+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1664'
permalink: /article/Apache-Kafka-Messaging-Consumer-on-Bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/Apache-Kafka-Messaging-Consumer-on-Bluemix/
dsq_thread_id:
    - '4371249752'
categories:
    - Articles
---

The [Message Hub](https://www.ng.bluemix.net/docs/services/MessageHub/index.html) service on [Bluemix](https://bluemix.net) is based on [Apache Kafka](http://kafka.apache.org/), which is a fast, scalable, and durable real-time messaging engine. For developers there are Java, Node and REST APIs to leverage Kafka. Yesterday I blogged about how to write a simple [Kafka producer]({{ "/article/Apache-Kafka-Messaging-Producer-on-Bluemix" | relative_url }}) in Node.js. This article covers the counterpart – a Kafka consumer.

To understand how consumers work in Kafka I recommend reading the [Kafka documentation](http://kafka.apache.org/documentation.html#intro_consumers). Essentially you define consumer groups with potentially multiple consumer instances. Only one instance per group receives one particular message. In order to scale you can simply increase the number of consumer instances. In Kafka each container instance has it’s own partition from which it receives messages for a certain topic (in the right order). However since the Message Hub only supports one partition in the current beta status, you cannot use this functionality yet.

The consumer code below is again a slightly modified version of the sample [Node.js chat application](https://github.com/ibm-messaging/message-hub-samples/tree/master/nodejs/bluemix-chat-sample) from my colleague Niall Weedon. I separated the producer from the consumer code and removed the chat code.

The consumer instance is created in line 87 by passing in the consumer group name, the consumer instance id (maps to Bluemix Cloud Foundry application instance\_id) and an offset to define which messages to read. The code in lines 66ff shows how the consumer actually polls for updates on a certain interval and reads the messages (as batch) in line 69. To make sure that other consumer instances receive messages when a particular consumer instance goes down, you need to tell this Kafka in line 125.

You can run the consumer either locally or on Bluemix. To run it on Bluemix, create a Bluemix Node.js application, add the Message Hub service and execute these commands from the project’s root directory.

```
cf login
cf push <mykafkaconsumer>
```

To run the consumer locally, execute these commands.

```
npm install
node app.js <message_hub_rest_endpoint> <message_hub_api_key>
```

In order to test the consumer you need to also run the producer as explained in the previous [article]({{ "/article/Apache-Kafka-Messaging-Producer-on-Bluemix" | relative_url }}). Both need to use the same Message Hub instance. Here is a screenshot of the producer and consumer running locally.

![image](/assets/img/2015/12/kafkanodesample2.jpg)

**package.json**

```
{
  "name": "node-kafka-consumer",
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
var consumerInstance;
var consumerGroupName = 'node-kafka-consumers';
var consumerInstanceName = 'node-kafka-consumer-' + '1';
var consumeInterval;

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});

app.get('/', function (req, res) {
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
    consumerInstanceName = 'node-kafka-consumer-' + appEnv.app.instance_id;
    console.log('Endpoint and API Key provided have been ignored, as there is a valid VCAP_SERVICES.');
  }

  console.log('Consumer Group Name: ' + consumerGroupName);
  console.log('Consumer Group Instance: ' + consumerInstanceName);

  instance = new MessageHub(appEnv.services);

  consumeInterval = setInterval(function() {
    if(consumerInstance) {
      consumerInstance.get(topic)
        .then(function(data) {
          if(data.length > 0) {
            for(var index in data) {
              data[index] = JSON.parse(data[index]);
              console.log('Consumer Group Instance: ' + consumerInstanceName + ', Message: ' + data[index].message);
            }

          }
        })
        .fail(function(error) {
          throw new Error(error);
        });
    }
  }, 250);

  instance.topics.create(topic)
      .then(function(response) {
        console.log('topic created');
        return instance.consume(consumerGroupName, consumerInstanceName, { 'auto.offset.reset': 'largest' });
      })
      .then(function(response) {
        consumerInstance = response[0];
        console.log('Consumer Instance created.');
        if(callback) {
          callback();
        }
      })
      .fail(function(error) {
        console.log(error);
        stop(1);
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

     if(consumerInstance) {
      console.log('Removing consumer instance: ' + consumerGroupName + '/' + consumerInstanceName);
      consumerInstance.remove()
        .fin(function(response) {
          try {
            console.log(JSON.stringify(response));
          } catch(e) {
            console.log(response);
          }

          cleanedUp = true;
          process.exit(exitCode);
        });
    } else {
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