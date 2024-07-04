---
id: 1904
title: 'Authorization in LoopBack Applications on Bluemix'
date: '2016-02-24T08:05:46+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1904'
permalink: /article/authorization-loopback-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/authorization-loopback-bluemix/
dsq_thread_id:
    - '4606436844'
categories:
    - Articles
---

The Node.js framework [LoopBack](http://loopback.io/) supports authorization for models (business objects) via roles on both application level and object level. This is, for example, important in business applications where only people with certain roles have access to certain documents. Below is a sample how to use this functionality.

[Download the sample application from GitHub.](https://github.com/IBM-Bluemix/collaboration)

The sample uses test users defined in a Cloudant database by default, but you can change it easily to authenticate against the [Single Sign On]({{ "/article/authentication-loopback-bluemix" | relative_url }}) service in [Bluemix](https://bluemix.net).

In LoopBack applications ACLs (access control lists) are defined as part of the model definitions declaratively. In my sample I’m using an ApprovalRequest model which has a requester and potential approvers which are people with the role ‘Manager’. Only the specific requester of a request, the managers and the admins have write access to the request. Here is how this is defined in the model ([approval-request.json](https://github.com/IBM-Bluemix/collaboration/blob/master/server/common/models/approval-request.json#L39)).

```
"acls": [
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "Admin",
      "permission": "ALLOW"
    },
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "Manager",
      "permission": "ALLOW"
    },
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "Requester",
      "permission": "ALLOW",
      "property": "upsert"
    },
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$unauthenticated",
      "permission": "DENY"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "Employee",
      "permission": "ALLOW"
    }
  ]
```

For demonstration purposes I created [four test users](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/boot/sample-data.js) the first time the application is launched – Admin, Manager, EmployeeMike and EmployeeJohn. Admin gets the role ‘Admin’ and Manager the role ‘Manager’.

These roles can be used to handle application level authorization. For my sample scenario however an additional dynamic role ‘Requester’ is needed to define who is the specific requester of a specific request. This is done by implementing [role resolvers](https://docs.strongloop.com/display/public/LB/Defining+and+using+roles#Definingandusingroles-Dynamicroles). The following [code](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/boot/requester-resolver.js#L19) compares the id of the current user with the value of the requester id field when a specific request is supposed to be opened.

```
Role.registerResolver('Requester', function(role, context, cb) {
  var notAuthorizedError = { ... }
  if (context.modelName !== 'ApprovalRequest') {
    cb(notAuthorizedError, false);
  }
  else {
    var userId = context.accessToken.userId;
    if (!userId) {
      cb(notAuthorizedError, false);
    }
    else {
      if (!context.modelId) {
        cb(notAuthorizedError, false);
      }
      else {
        context.model.findById(context.modelId, function(err, approvalRequest) {
          if(err || !approvalRequest) {              
            cb(err, false);
          }
          else {
            if (approvalRequest.requesterId == userId) {
              cb(null, true);
            }
            else {
              cb(notAuthorizedError, false);
```

As an example when the user EmployeeMike is logged in …

![image](/assets/img/2016/02/angular-4s.jpg)

… and tries to change the approval request from EmployeeJohn, he gets an authorization error.

![image](/assets/img/2016/02/angular-7s.jpg)

To find out more read the [documentation](https://docs.strongloop.com/display/public/LB/Authentication%2C+authorization%2C+and+permissions) and check out the [loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) tutorial.