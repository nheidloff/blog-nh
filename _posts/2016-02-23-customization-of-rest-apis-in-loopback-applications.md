---
id: 1898
title: 'Customization of REST APIs in LoopBack Applications'
date: '2016-02-23T08:27:52+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1898'
permalink: /article/customization-rest-apis-loopback-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4603597833'
custom_permalink:
    - article/customization-rest-apis-loopback-bluemix/
categories:
    - Articles
---

[LoopBack](http://loopback.io/) creates automatically REST APIs for custom models (business objects) that are persisted. While this is helpful to get started quickly, for example in proofs of concepts or first iterations, the final APIs often have to be customized. LoopBack provides various ways to achieve this.

When I looked briefly at LoopBack for the first time a couple of weeks ago, my initial concern was that I don’t want to expose the ‘schema’ of my databases as REST APIs via the out of the box [CRUD](https://docs.strongloop.com/display/public/LB/Exposing+models+over+REST#ExposingmodelsoverREST-Predefinedremotemethods) operations. However since then I’ve learned that LoopBack offers several mechanisms to define REST APIs exactly as you want to expose them.

Only for built-in models, e.g. User, and the custom models that extend ‘PersistedModel’ REST APIs for CRUD operations are generated. When you choose the model ‘[Model](https://docs.strongloop.com/display/public/LB/Basic+model+object)‘ as base type, only the methods that you define and implement yourself (via [remote methods](https://docs.strongloop.com/display/public/LB/Remote+methods)) are exposed as REST APIs. This gives you maximal flexibility in terms of the design of your public interfaces. In the implementation of these methods you can use the [Node.js APIs of the persisted models](https://apidocs.strongloop.com/loopback/#persistedmodel) to manipulate the data in the underlying databases.

```
{
  "name": "MyModel",
  "base": "Model",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

In addition to this you can customize the generated APIs in many ways:

- [Hide methods and endpoints](https://docs.strongloop.com/display/public/LB/Exposing+models+over+REST#ExposingmodelsoverREST-Exposingandhidingmodels,methods,andendpoints)
- [Validate model data](https://docs.strongloop.com/display/public/LB/Validating+model+data)
- [Change paths and request and response formats](https://docs.strongloop.com/display/public/LB/Exposing+models+over+REST#ExposingmodelsoverREST-Predefinedremotemethods)
- [Execute hooks when models perform create, retrieve, update, and delete operations](https://docs.strongloop.com/display/public/LB/Remote+hooks)
- [Add additional APIs to models](https://docs.strongloop.com/display/public/LB/Remote+methods)

I’ve implemented a sample with an additional method in a persisted model. I wanted to use most of the out of the box REST APIs for CRUD operations, but needed an additional method which returns not only one business object ‘ApprovalRequest’ but also the requester and approver ‘Person’ objects to minimize the amount of network requests between clients and the server.

[Download the sample application from GitHub.](https://github.com/IBM-Bluemix/collaboration)

In [approval-request.js](https://github.com/IBM-Bluemix/collaboration/blob/master/server/common/models/approval-request.js) the additional method is [added](https://github.com/IBM-Bluemix/collaboration/blob/master/server/common/models/approval-request.js#L109), the actual [implementation](https://github.com/IBM-Bluemix/collaboration/blob/master/server/common/models/approval-request.js#L27) is done and the [output model](https://github.com/IBM-Bluemix/collaboration/blob/master/server/common/models/approval-request.js#L101) is defined. Here is a screenshot of the additional method in the API explorer.

![image](/assets/img/2016/02/api-expanded-requests2.jpg)