---
id: 1763
title: 'Customization of Node-RED on Bluemix'
date: '2016-01-11T09:26:59+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1763'
permalink: /article/customization-node-red-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/customization-node-red-bluemix/
dsq_thread_id:
    - '4480791294'
categories:
    - Articles
---

[Bluemix](https://bluemix.net) provides [starters](https://console.ng.bluemix.net/catalog/starters/internet-of-things-foundation-starter/) to deploy Node-RED on Bluemix so that, for example, you can easily start creating flows for Internet of Things scenarios. In some cases however you might want to change the home page of your application, enforce authentication, add more nodes, change configuration files or set up your own default flows. Below is a short description how to do these types of customization.

On GitHub there is a project called [Node-RED Bluemix Starter Application](https://github.com/node-red/node-red-bluemix-starter) which is very similar to what you get when using the starters. This project can be forked or cloned and customized before deploying it to Bluemix. In order to make the deployment very simple it comes with a sample [Bluemix Deploy](https://bluemix.net/deploy?repository=https://github.com/node-red/node-red-bluemix.git) button and a [manifest.yml](https://github.com/node-red/node-red-bluemix-starter/blob/master/manifest.yml) file.

Here is a simple customization example. In a sample I built recently I used Node-RED to host an API that is invoked by another web application. To document the API I wanted to use Swagger and the [Node-RED Swagger Documentation Generator](https://github.com/node-red/node-red-node-swagger) and I needed to use [CORS](https://groups.google.com/forum/#!msg/node-red/9ZZY_2xcfaI/MHlgty0xQrcJ) for cross domain access.

![image](/assets/img/2016/01/nodered-swagger.png)

In order to use CORS I added a few lines to the settings in bluemix-settings.js.

```
httpNodeCors: {
   origin: "*",
   methods: "GET,PUT,POST,DELETE"
}
```

In order to add the Swagger node I had to declare another dependency in package.json. After this the Swagger documentation can be accessed via <http://niknodered.mybluemix.net/http-api/swagger.json>.

```
"dependencies": {
   ...      
  "node-red-node-swagger":"0.x"  
},
```

To learn more about Node-RED customization read the [documentation](http://nodered.org/docs/index.html) and check out the new [node-red-contrib-npm](https://www.npmjs.com/package/node-red-contrib-npm) node from my colleague James Thomas to deploy new Node.js modules without having to redeploy Node-RED.