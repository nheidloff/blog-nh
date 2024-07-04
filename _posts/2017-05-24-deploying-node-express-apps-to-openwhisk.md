---
id: 2277
title: 'Deploying Node Express Apps to OpenWhisk'
date: '2017-05-24T13:35:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2277'
permalink: /article/deploying-node-express-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-node-express-openwhisk/
dsq_thread_id:
    - '5943161515'
categories:
    - Articles
---

I’m catching up with all the great new features that have been added to [OpenWhisk](https://developer.ibm.com/openwhisk/) over the last months. My colleague Lionel Villard published two [articles](https://medium.com/openwhisk/deploying-express-js-apps-to-openwhisk-part-2-dd8fc51e8944) how to run Node Express web applications in a serverless environment. Very cool.

Rather than repeating everything from Lionel’s articles, let me give you a quick summary how this works.

In the OpenWhisk [action](https://github.com/nheidloff/building-and-securing-a-modern-backend-api/blob/master/movieanalyst-api/action.js) you use the [openwhisk-expressjs](https://www.npmjs.com/package/openwhisk-expressjs) module to send a redirect to the Express [server](https://github.com/nheidloff/building-and-securing-a-modern-backend-api/blob/master/movieanalyst-api/server.js).

```
const app = require('./server');
const redirect = require('openwhisk-expressjs')(app);

function main(args) {
  return redirect(args);
}

exports.main = main;
```

In order to make the OpenWhisk action accessible via URL you use [web actions](https://console.ng.bluemix.net/docs/openwhisk/openwhisk_webactions.html). Since the action requires additional node modules, you need to zip everything up first.

```
zip -r app.zip
wsk action update api app.zip --kind nodejs:6 -a raw-http true -a web-export true
```

Since I’ve had some issues to get the sample running, I’ve submitted a [pull request](https://github.com/lionelvillard/building-and-securing-a-modern-backend-api/pull/2). For the time being you can use the extensions I’ve done in my [fork](https://github.com/nheidloff/building-and-securing-a-modern-backend-api).

To run the web application, open the web action URL that you can get from the OpenWhisk dashboard in a browser (without the ‘.json’).

![openwhisk-express](/assets/img/2017/05/openwhisk-express.png)

Please note that there are [limitations](https://github.com/openwhisk/openwhisk/blob/master/docs/reference.md#system-limits) as Lionel describes. You shouldn’t host large amounts of static content. However the mechanism above works well for Node applications that use Express to provide REST APIs.