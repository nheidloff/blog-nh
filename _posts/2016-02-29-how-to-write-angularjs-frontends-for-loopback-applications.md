---
id: 1912
title: 'How to write AngularJS Frontends for LoopBack Applications'
date: '2016-02-29T08:23:17+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1912'
permalink: /article/how-to-write-angularjs-loopback-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4620961059'
custom_permalink:
    - article/how-to-write-angularjs-loopback-applications/
categories:
    - Articles
---

With the [Node.js](https://nodejs.org/en/) API framework [LoopBack](http://loopback.io/) you can easily provide REST APIs for your applications. In order to build web frontends LoopBack provides an [AngularJS JavaScript SDK](https://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK). Below is a sample application which demonstrates how to use this SDK.

[Download the sample application from GitHub.](https://github.com/IBM-Bluemix/collaboration)

In [AngularJS](https://angularjs.org/) applications you typically build views that interact with services via controllers. The services access data from the server-side applications. Obviously you can write your own services which invoke the REST APIs of your LoopBack applications directly. But LoopBack makes this even simpler via the AngularJS SDK. With the SDK client side JavaScript libraries are generated for your REST APIs so that the controllers can simply invoke JavaScript APIs rather than REST APIs.

The sample application demonstrates how to build a web based frontend for a simple Approval Request scenario. Approval requests have titles, descriptions, requesters and approvers.

![image](/assets/img/2016/02/angular-5s.png)

Here is the [code snippet](https://github.com/IBM-Bluemix/collaboration/blob/master/angular/app/scripts/controllers/requests.js) of the controller that returns all approval requests. The class ApprovalRequest is provided by the LoopBack SDK.

```
angular.module('angularApp').controller('RequestsController', ['$scope', 'ApprovalRequest', function($scope, ApprovalRequest) {
  $scope.requests = [];
  function getRequests() {
      ApprovalRequest.find().$promise
        .then(function(results) {
          $scope.requests = results;
        }, 
        function(err) {
          $scope.requestsError = err.statusText;
        }
    );
  }
  getRequests();
}]);
```

Authentication is also very easy from Angular. Just invoke the [Person.login](https://github.com/IBM-Bluemix/collaboration/blob/master/angular/app/scripts/controllers/login.js) function.

The file [lb-services.js](https://github.com/IBM-Bluemix/collaboration/blob/master/angular/app/scripts/services/lb-services.js) with the JavaScript APIs for your own business objects defined via LoopBack is generated either via command line or via [Grunt](https://docs.strongloop.com/display/public/LB/AngularJS+Grunt+plugin). The approval request [sample application](https://github.com/IBM-Bluemix/collaboration/blob/master/angular/Gruntfile.js#L49) uses the Grunt plugin to build the file automatically and to put it in the Angular application.

```
loopback_sdk_angular: {
  options: {
    input: '../server/server/server-gen.js',
    output: 'app/scripts/services/lb-services.js'        
  },
  production: {
    options: {
      apiUrl: 'http://localhost:3000/api'
      //apiUrl: 'http://collaboration-nheidloff-1534.mybluemix.net/api'
    }
  }
},
```

[For details check out the project on GitHub.](https://github.com/IBM-Bluemix/collaboration/tree/master/angular)