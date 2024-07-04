---
id: 1985
title: 'Developing Offline Capable Mobile Apps with LoopBack'
date: '2016-03-21T16:09:26+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1985'
permalink: /article/develop-offline-mobile-apps-loopback/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/develop-offline-mobile-apps-loopback/
dsq_thread_id:
    - '4681185806'
categories:
    - Articles
---

Today I looked briefly into some experimental functionality of the [LoopBack](http://loopback.io/) framework to develop offline capable mobile apps. I’d like to add this functionality to my sample of the [CLEAN]({{ "/article/introducing-clean-stack-javascript-everywhere" | relative_url }}) stack (Cloudant, Express, LoopBack, AngularJS, Node) which comes with (hybrid) mobile apps built via [AngularJS, Ionic and Cordova]({{ "/article/how-to-write-mobile-apps-loopback" | relative_url }}).

There is a nice [video](https://www.youtube.com/watch?v=Yu6uh0ja5OM) describing this functionality. In a nutshell data is stored in HTML Local Storage in browsers. The data synchronization is done on the business logic level rather than database level. This allows synchronizing data from various LoopBack data sources, for example from and to Cloudant and MongoDB.

The other advantage of this approach is that business logic developed and defined for your business objects (models), for example access control, is also applied on the client. Essentially the complete LoopBack application is run in the browser via [Browserify](http://browserify.org/). The exact same JavaScript APIs to access business objects work remotely and locally.

Here are some screenshots of the offline [ToDo sample](https://github.com/strongloop/loopback-example-offline-sync). For demonstration purposes you can go offline and online manually and trigger synchronization.

![image](/assets/img/2016/03/offlineloop1.jpg)

In the AngularJS controller you can create To Dos in the same way locally as remotely and use the additional offline APIs.

```
angular.module('loopbackExampleFullStackApp')	
   .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, Todo,
   $location, sync, network, getReadableModelId) {
      $scope.addTodo = function () {	
         Todo.create({title: $scope.newTodo})
            .then(function() {
               $scope.newTodo = '';
               $scope.$apply();
            });
         };
   $scope.sync = function() {
      sync(); 
   };
   $scope.connected = function() {
      return network.isConnected;
   };
   $scope.connect = function() {
      network.isConnected = true; 
      sync();
   };
   $scope.disconnect = function() {
      network.isConnected = false;
   };
   ...
});
```

The debug page displays data from the Local Storage, for example which documents haven’t been synchronized with the server as well as potential synchronization conflicts.

![image](/assets/img/2016/03/offlineloop2.jpg)

To find out more watch the [video](https://www.youtube.com/watch?v=Yu6uh0ja5OM), read the article [Open Source Replication and Offline Sync for Node.js and Devices](https://strongloop.com/strongblog/node-js-replication-mobile-offline-sync-loopback/) and check out the [documentation](https://docs.strongloop.com/display/public/LB/LoopBack+in+the+client).