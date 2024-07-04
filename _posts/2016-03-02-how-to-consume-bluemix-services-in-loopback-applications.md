---
id: 1924
title: 'How to consume Bluemix Services in LoopBack Applications'
date: '2016-03-02T09:28:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1924'
permalink: /article/how-to-consume-bluemix-services-loopback/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-consume-bluemix-services-loopback/
dsq_thread_id:
    - '4627036664'
categories:
    - Articles
---

With the [LoopBack](http://loopback.io/) framework you can easily build REST APIs for your own business objects, you can build web and mobile clients and much more. The LoopBack [backend applications](https://github.com/IBM-Bluemix/collaboration#setup-of-the-application-on-bluemix) and the [AngularJS web clients](https://github.com/IBM-Bluemix/collaboration/tree/master/angular) can be hosted on [Bluemix](https://bluemix.net). Additionally [Bluemix services](https://console.ng.bluemix.net/catalog/) can be consumed, for example the cognitive Watson services. Below is a sample how this works.

[Get the code of the sample application from GitHub.](https://github.com/IBM-Bluemix/collaboration)

When Bluemix services are created and bound to Bluemix applications, they provide credentials and endpoints that are needed to invoke their APIs. The credentials are stored in an environment variable VCAP\_SERVICES.

![image](/assets/img/2016/03/loopbackbluemixservices.png)

The following [snippet](https://github.com/IBM-Bluemix/collaboration/blob/master/server/common/models/approval-request.js#L90) shows how to use the Watson [Language Translation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/language-translation.html) service. The credentials are read from the environment variable via the library cfenv-wrapper.

```
var watson = require('watson-developer-cloud');
var cfenv = require('../../server/cfenv-wrapper');
var appEnv = cfenv.getAppEnv();			  
var translationConfig = appEnv.getService(/translation.*/);
if (translationConfig) {						   
  var language_translation = watson.language_translation({
    username: translationConfig.credentials.username,
    password: translationConfig.credentials.password,
    version: 'v2'
  });

  language_translation.translate({
    text: output.approvalRequest.title, source : 'en', target: 'es' },
    function (err, translation) {
      if (!err) {
        output.translatedTitle = translation;
```

In order to run the exact same code locally you need to put the credentials into a [property file](https://github.com/IBM-Bluemix/collaboration/blob/master/server/env_sample_services.json). Via the command ‘cf env collaboration’ you can receive the credentials or you can simply copy and paste them from the Bluemix dashboard.

```
{
 "VCAP_SERVICES": {
  "language_translation": [
   {
    "credentials": {
     "password": "xxx",
     "url": "https://gateway.watsonplatform.net/language-translation/api",
     "username": "xxx"
    },
    "label": "language_translation",
    "name": "collab-translation",
    "plan": "standard",
    "tags": [
     "watson",
     "ibm_created",
     "ibm_dedicated_public"
    ]
   }
  ]
 }
}
```