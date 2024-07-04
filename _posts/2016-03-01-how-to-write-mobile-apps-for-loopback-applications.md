---
id: 1918
title: 'How to write Mobile Apps for LoopBack Applications'
date: '2016-03-01T07:20:47+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1918'
permalink: /article/how-to-write-mobile-apps-loopback/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-write-mobile-apps-loopback/
dsq_thread_id:
    - '4623850333'
categories:
    - Articles
---

With the [Node.js](https://nodejs.org/en/) API framework [LoopBack](http://loopback.io/) you can easily provide REST APIs for your applications. In order to build client applications LoopBack provides an [AngularJS JavaScript SDK](https://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK). The same SDK can be used to build [web frontends]({{ "/article/how-to-write-angularjs-loopback-applications" | relative_url }}) and mobile apps. Below is an example how to develop mobile apps via [AngularJS](https://angularjs.org/), [Ionic](http://ionicframework.com/) and [Cordova](https://cordova.apache.org/).

[Download the sample application from GitHub.](https://github.com/IBM-Bluemix/collaboration)

In AngularJS applications you typically build views that interact with services via controllers. The services access data from the server-side applications. Obviously you can write your own services which invoke the REST APIs of your LoopBack applications directly. But LoopBack makes this even simpler via the AngularJS SDK. With the SDK client side JavaScript libraries are generated for your REST APIs so that the controllers can simply invoke JavaScript APIs rather than REST APIs.

The sample application demonstrates how to build mobile apps for a simple Approval Request scenario. Approval requests have titles, descriptions, requesters and approvers. Via Cordova the apps run as hybrid mobile apps on Android and iOS.

![image](/assets/img/2016/03/loopback-mobile.png)

Here is the code [snippet](https://github.com/IBM-Bluemix/collaboration/blob/master/ionic/www/js/requests.js) of the controller that returns all approval requests. The class ApprovalRequest is provided by the LoopBack SDK. Note that the code of the controller is [identical](https://github.com/IBM-Bluemix/collaboration/blob/master/angular/app/scripts/controllers/requests.js) to the controllers used in web applications.

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

[For details check out the sample on GitHub.](https://github.com/IBM-Bluemix/collaboration/tree/master/ionic)