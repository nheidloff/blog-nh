---
id: 1729
title: 'Composing APIs with Node-RED and JavaScript'
date: '2015-12-15T08:29:58+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1729'
permalink: /article/compose-api-node-red-javascript-nodejs/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/compose-api-node-red-javascript-nodejs/
dsq_thread_id:
    - '4405184141'
categories:
    - Articles
---

As the [Node-RED](http://nodered.org/) website says “Node-RED is a tool for wiring together hardware devices, APIs and online services in new and interesting ways”. It has been possible to use Node-RED for [Internet of Things]({{ "/article/21.01.2015081841NHEAL8.htm" | relative_url }}) scenarios on [Bluemix](https://bluemix.net) for quite some time. With the new [Connect and Compose](https://www.ng.bluemix.net/docs/services/ConnectandCompose/index.html) (beta) service you can now also use Node-RED to compose complex APIs via flow editor and JavaScript.

Below is a simple example which is the [same scenario]({{ "/article/assembling-rest-apis-with-the-api-management-service-on-bluemix" | relative_url }}) that I implemented with the [API Management](https://www.ng.bluemix.net/docs/services/APIManagement/index.html) service. In order to reduce the number of requests from (mobile) clients two HTTP requests are invoked before the results are returned to the client.

After you’ve created a service instance on Bluemix you can choose to compose new APIs. In the Node-RED editor the first thing you need is an Http In node where you define the request type and url. The Http In node is linked to a Swagger-Doc node where the input and output parameters are defined. To open the Swagger-Doc editor click on “Edit” in the HTTP In node.

![image](/assets/img/2015/12/composeapi2.png)

The last node of the flow needs to be a Http Response node which returns the data in the variable msg.payload as defined in the Swagger-Doc node. Everything else between the Http In node (with the linked Swagger-Doc node) and the Http Response node is up to you. In my simple example I simply invoke two Http get requests and put the responses together in one message.

![image](/assets/img/2015/12/composeapi1.png)

Here is the definition of the flow. I use several Function nodes which contain JavaScript code. At some places the underlaying Node.js implementation is exposed. For example msg.req.query can be used to read the parameter “name” in the incoming REST URL request which is a function of the [Request](http://expressjs.com/en/api.html#req) object in [Express](http://expressjs.com/), the Node.js web framework used in Node-RED.

```
[{
	"id": "44eb9c6d.bb1464",
	"type": "swagger-doc",
	"summary": "Hello World",
	"description": "Hello World",
	"tags": "",
	"consumes": "application/json",
	"produces": "application/json",
	"parameters": [{
		"name": "name",
		"in": "query",
		"description": "name",
		"required": false,
		"type": "string"
	}],
	"responses": {
		"200": {
			"description": "Success",
			"schema": {
				"properties": {
					"java": {
						"type": "string"
					},
					"node": {
						"type": "string"
					}
				}
			}
		}
	},
	"deprecated": false
}, {
	"id": "72b8b258.8d474c",
	"type": "http in",
	"name": "",
	"url": "/hello",
	"method": "post",
	"swaggerDoc": "44eb9c6d.bb1464",
	"x": 123.51248168945312,
	"y": 59,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["ca6abb2d.359548"]
	]
}, {
	"id": "5a5ae0c8.a5a52",
	"type": "http response",
	"name": "",
	"x": 570.0124664306641,
	"y": 325.1166687011719,
	"z": "f4c8dbcb.0b3728",
	"wires": []
}, {
	"id": "1a4d6a88.e5b295",
	"type": "http request",
	"name": "Node API",
	"method": "GET",
	"ret": "txt",
	"url": "",
	"x": 340.8957977294922,
	"y": 147.88888549804688,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["a78a3c45.5875c"]
	]
}, {
	"id": "679c7fa2.98638",
	"type": "debug",
	"name": "",
	"active": true,
	"console": "false",
	"complete": "false",
	"x": 584.8957366943359,
	"y": 382.888916015625,
	"z": "f4c8dbcb.0b3728",
	"wires": []
}, {
	"id": "ca6abb2d.359548",
	"type": "function",
	"name": "Setup Node",
	"func": "msg.url = 'http://node-swagger-docker-hello-world.mybluemix.net/hello?name=' + msg.req.query.name;\n\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 181.89581298828125,
	"y": 147.88888549804688,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["1a4d6a88.e5b295"]
	]
}, {
	"id": "b520f29b.4adf1",
	"type": "function",
	"name": "Setup Java",
	"func": "msg.url = 'http://gs-rest-service-cg.mybluemix.net/greeting?name=' + msg.req.query.name;\n\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 180.89581298828125,
	"y": 237.88888549804688,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["afea2918.5015d8"]
	]
}, {
	"id": "afea2918.5015d8",
	"type": "http request",
	"name": "Java API",
	"method": "GET",
	"ret": "txt",
	"url": "",
	"x": 337.8957977294922,
	"y": 237.88888549804688,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["f794a650.086b58"]
	]
}, {
	"id": "a78a3c45.5875c",
	"type": "function",
	"name": "Store Node",
	"func": "msg.nodemessage = JSON.parse(msg.payload);\nmsg.node = msg.nodemessage.message;\nreturn msg;\n",
	"outputs": 1,
	"noerr": 0,
	"x": 508.8697967529297,
	"y": 148.36109924316406,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["b520f29b.4adf1"]
	]
}, {
	"id": "79819a90.867e64",
	"type": "function",
	"name": "Response",
	"func": "msg.payload = {\n    java: msg.java,\n    node: msg.node\n}\n\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 357.01246643066406,
	"y": 356.1166687011719,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["5a5ae0c8.a5a52", "679c7fa2.98638"]
	]
}, {
	"id": "f794a650.086b58",
	"type": "function",
	"name": "Store Java",
	"func": "msg.javamessage = JSON.parse(msg.payload);\nmsg.java = msg.javamessage.content;\nreturn msg;\n",
	"outputs": 1,
	"noerr": 0,
	"x": 501.89576721191406,
	"y": 237.88888549804688,
	"z": "f4c8dbcb.0b3728",
	"wires": [
		["79819a90.867e64"]
	]
}]
```

After you’ve composed the API, the Connect and Compose service provides a Swagger definition of the API and an API explorer. To allow only certain applications to invoke APIs, application keys and secrets are provided.

![image](/assets/img/2015/12/composeapi3.png)

To learn more check out the [Connect and Compose documentation](https://www.ng.bluemix.net/docs/services/ConnectandCompose/index.html) and the [email newsletter sample](https://developer.ibm.com/bluemix/2015/12/07/create-weekly-email-with-connect-and-compose-service/).