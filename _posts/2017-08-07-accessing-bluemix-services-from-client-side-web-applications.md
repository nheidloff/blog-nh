---
id: 2457
title: 'Accessing Bluemix Services from Client-side Web Applications'
date: '2017-08-07T07:34:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2457'
permalink: /article/bluemix-services-credentials-client-side-web-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/bluemix-services-credentials-client-side-web-applications/
dsq_thread_id:
    - '6047223996'
categories:
    - Articles
---

[Bluemix](https://bluemix.net) is IBM’s cloud platform to build and host applications which can leverage more than 100 services, for example databases and cognitive services. The services provide APIs which require credentials. Applications which are hosted on Bluemix as Cloud Foundry apps or Docker containers can access these credentials from environment variables. This article describes how to invoke Bluemix services from client-side web applications.

Recently I [described]({{ "/article/angular-2-bluemix-docker-nginx" | relative_url }}) how to deploy Angular and other client-side web applications (for example React or Vue.js) to Bluemix via Docker and [nginx](http://nginx.org/en/). In order to allow web applications to invoke REST APIs, nginx acts as a proxy which can be configured in the nginx.conf file.

I couldn’t figure out how to configure/extend the nginx proxy to access the credentials from environment variables. That’s why I replaced nginx with a web server built with Node.js and the Express framework.

There are various proxy server implementations for Express available or you can write a simple proxy yourself. The following [code](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/node/watson.js) shows a proxy for get requests which [reads credentials](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/node/readCredentials.js) of the Watson Conversation service and adds them to the request.

```
router.get('*', (req, res) => {
  var vcapCredentials = readCredentials();
  var credentials = req.get('Authorization');
  if (vcapCredentials.username && vcapCredentials.password) {
    credentials = "Basic " + new Buffer(vcapCredentials.username + ':' + vcapCredentials.password).toString('base64');
  }
  var url = 'https://gateway.watsonplatform.net/conversation' + req.url;
  var newRequest = request.get({
    uri: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials
    }
  });
  newRequest.pipe(res);
});
```

[The full source code of the sample application is available on GitHub.](https://github.com/nheidloff/conversation-inspector-for-ibm-watson)

The screenshot shows the requests from the web application to the Node.js backend. With ‘[/credentials](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/node/server.js#L32)‘ the web application checks whether the credentials exist which is the case when a Watson Conversation service has been bound to the Node.js application. If they exist, the two input fields for username and password are disabled. The ‘[/conversation/api/v1/workspaces](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/node/server.js#L31)‘ request invokes the proxy.

![image](/assets/img/2017/08/node-proxy.png)