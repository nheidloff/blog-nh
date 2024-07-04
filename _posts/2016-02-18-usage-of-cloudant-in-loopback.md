---
id: 1877
title: 'Usage of Cloudant in LoopBack Applications'
date: '2016-02-18T09:02:36+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1877'
permalink: /article/cloudant-loopback-nodejs/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4589644444'
custom_permalink:
    - article/cloudant-loopback-nodejs/
categories:
    - Articles
---

The Node.js framework [LoopBack](http://loopback.io/) supports multiple [connectors](https://docs.strongloop.com/display/public/LB/Connecting+models+to+data+sources) for various data sources. Below is a sample how to use the [Cloudant NoSQL](https://www.ng.bluemix.net/docs/#services/Cloudant/index.html) database in [Bluemix](https://bluemix.net).

Check out the sample code on [GitHub](https://github.com/IBM-Bluemix/collaboration). It shouldn’t take longer than 15 minutes to set up the sample application. The sample uses basically a CLEAN stack with Cloudant, LoopBack, Express, Angular and Node.

After you’ve created the Cloudant service on Bluemix you get your own credentials. The credentials are stored in environment variables and can be accessed by Bluemix applications. When running the same LoopBack applications locally, the credentials need to be copied to a local property file ([env.json](https://github.com/IBM-Bluemix/collaboration/blob/master/server/env_sample.json)). The code in [bluemix.js](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/bluemix.js#L26) reads the credentials and sets up a LoopBack data source programmatically (it is not defined in [datasources.json](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/datasources.json)). The code uses the [loopback-connector-cloudant](https://www.npmjs.com/package/loopback-connector-cloudant) which is installed via npm.

In order to make the setup of the sample application as easy as possible, a database is created automatically if it doesn’t exist and [test data](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/boot/sample-data.js) is stored in it for demonstration purposes.

In [model-config.json](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/model-config.json) you can refer to the Cloudant database in the same way as to other LoopBack data sources.

```
"ApprovalRequest": {
  "dataSource": "cloudant",
  "public": true
},
"Person": {
  "dataSource": "cloudant",
  "public": true
}
```

While [loopback-connector-couch](https://www.npmjs.com/package/loopback-connector-couch) uses map/reduce views, [loopback-connector-cloudant](https://www.npmjs.com/package/loopback-connector-cloudant) uses [Cloudant Query](https://docs.cloudant.com/cloudant_query.html). My colleague and developer of the Cloudant connector Tony Ffrench told me that the main benefit of Cloudant Query is that the filtering/ordering/paging is done on the server, vs sending the data across the network.

In the Cloudant dashboard you can invoke queries, for example to change test data directly in the database.

```
{
  "selector": {
    "username": "Admin"
  },
  "use_index": "_design/lb-index-ddoc-Person"
}
```

![image](/assets/img/2016/02/cloudant-query.png)