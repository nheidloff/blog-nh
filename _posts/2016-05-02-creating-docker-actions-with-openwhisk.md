---
id: 2064
title: 'Creating Docker Actions with OpenWhisk'
date: '2016-05-02T12:32:01+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2064'
permalink: /article/how-to-create-docker-actions-openwhisk-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-create-docker-actions-openwhisk-bluemix/
categories:
    - Articles
---

[OpenWhisk](https://developer.ibm.com/openwhisk/) is an event-driven compute platform that executes code in response to events or direct invocations. The advantage is that you only have to pay for actual usage, not for peaked projections. Developers can implement actions via [JavaScript]({{ "/article/how-to-write-javascript-actions-openwhisk" | relative_url }}), Swift and, as described below, via Docker.

Via Docker other programming languages than JavaScript and Swift can be used. Plus with Docker you can write JavaScript actions that require more [Node modules](https://new-console.ng.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_ref_javascript) than currently supported by OpenWhisk JavaScript actions.

There is [documentation](https://new-console.ng.bluemix.net/docs/openwhisk/openwhisk_actions.html#openwhisk_actions_docker) available describing how to use Docker in this context. When I first read it, I was a little confused because the documentation describes how to build an image with JavaScript code that calls C code. The C part however is only a sample and you don’t have to use anything related to C if you want to build a Docker image with JavaScript.

Here is a simple hello world JavaScript sample. The following snippet shows the file app.js and how to read input parameters and return output.

```
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/init', function (req, res) {
   res.status(200).send();       
});

app.post('/run', function (req, res) {
   var meta = (req.body || {}).meta;
   var value = (req.body || {}).value;
   var payload = value.payload; 
   if (typeof payload != 'string')
      payload = JSON.stringify(payload);
   console.log("payload: " + payload);
   var result = { 'result' : { 'msg' : 'echo', 'payload' : payload} }; 
   res.status(200).json(result);
});

app.listen(8080, function () {
})
```

Here is the package.json to which more dependencies can be added.

```
{
  "name": "openwhisk-docker-node",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "express": "^4.11.2",
    "body-parser": "^1.11.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": ""
}
```

The Dockerfile extends the IBM Node image.

```
FROM registry.ng.bluemix.net/ibmnode
ADD ./app.js ./
ADD ./node_modules/ ./node_modules/
ENV NODE_ENV production
EXPOSE 8080
CMD ["node", "app.js"]
```

Invoke these commands to run the code. At this point images need to be pushed to DockerHub.

```
npm install
docker build -t nheidloff/open-whisk-docker-node .
docker push nheidloff/open-whisk-docker-node
wsk action create --docker docker-node nheidloff/open-whisk-docker-node
wsk action invoke --blocking --result docker-node --param payload niklas
```

The dashboard shows the successful invocation.

![image](/assets/img/2016/05/openwhiskdocker.png)