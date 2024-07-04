---
id: 1468
title: 'Visually develop REST APIs in Node and monitor them on Bluemix'
date: '2015-10-07T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/visually-develop-rest-apis-in-node-and-monitor-them-on-bluemix/'
permalink: /article/07.10.2015103825NHEC63.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/07.10.2015103825NHEC63.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323452276'
categories:
    - Articles
---

 Last month IBM [acquired StrongLoop](https://developer.ibm.com/bluemix/2015/09/10/ibm-acquires-strongloop/), a company that provides functionality to power the API economy via Node in enterprises. Specifically StrongLoop provides capabilities to develop REST APIs in Node.js, access them easily from various clients including mobile apps and manage and monitor them in enterprises. Below is a high level description and some resources how you can use these features on [IBM Bluemix](https://bluemix.net/).

In the easiest case REST APIs can be developed visually using a web tool called [StrongLoop Arc](https://docs.strongloop.com/display/APIS/Composing+APIs) without any programming. [Models](https://docs.strongloop.com/display/APIS/Creating+and+editing+models) can be created either from scratch or imported from databases (schemas). Based on the models REST APIs with the typical CRUD and list operations are generated automatically and exposed in the [Swagger](http://swagger.io/) API format. Models are bound to [data sources](https://docs.strongloop.com/display/APIS/Creating+and+editing+data+sources) like MySQL or MongoDB to persist and read data.

![image](/assets/img/2015/10/strongloop.png)

There are three main components:   
1\) The generated and potentially manually extended Node.js application   
2\) StrongLoop PM (process manager) which is the ‘container’/runtime for the Node application(s)   
3\) StrongLoop Arc which is the tool to define models and datasources and manage applications

In order to use StrongLoop Arc on Bluemix the [StrongLoop Arc](https://console.ng.bluemix.net/catalog/strongloop-arc/) starter is provided. Alternatively you can deploy Arc via the Bluemix [deploy](https://github.com/strongloop-bluemix/arc-app) button. When Arc is deployed to Bluemix you can manage applications by pointing Arc to process manager(s). In order to define models and data sources you need to install [Arc](https://strongloop.com/get-started/) locally.

In order to use StrongLoop PM on Bluemix you can use the [LoopBack Starter](https://console.ng.bluemix.net/catalog/loopback-starter) which also comes with a sample application or deploy the sample via the [deploy](https://github.com/strongloop-bluemix/loopback-example-app) button. Alternatively you can run a Docker container based on the [ibm-node-strong-pm](https://console.ng.bluemix.net/catalog/ibm-node-strong-pm/) image. The generated Node applications are not deployed standalone on Bluemix but always as part of a process manager.

StrongLoop comes with several built in data source connectors as well as connectors provided by the community. Andrew Trice [documented](https://developer.ibm.com/bluemix/2015/09/10/getting-started-node-js-loopback-framework-ibm-cloudant/) how to use Cloudant on Bluemix as data source and Arpitha Myla [described](https://developer.ibm.com/bluemix/2015/09/14/strongloop-to-mysql-app/) how to use a MySQL database.

For more complex scenarios StrongLoop provides several ways to extend and modify models, for example you can create [relations](https://docs.strongloop.com/display/public/LB/Creating+model+relations) between models. If a simple mapping of models to database tables doesn’t work for you, [logic](https://docs.strongloop.com/display/public/LB/Adding+logic+to+models) for REST APIs can be implemented via Node.js. This is necessary if you don’t want to expose CRUD operations for resources but rather have higher level APIs that might not map to just one resource.

In addition to REST APIs StrongLoop also provides functionality to manage and monitor applications. To find our more about this watch the video [Step by Step How to Deploy Z on the IBM Bluemix](https://www.youtube.com/watch?v=uMgPCTirStA) and the video [Integration of Instant Runtimes and API Capabilities](https://www.youtube.com/watch?v=pzIZHy-iJAs). Furthermore StrongLoop provides [Client SDKs](https://docs.strongloop.com/display/public/LB/Client+SDKs) to access REST APIs easily from web and mobile applications.

There are many more features StrongLoop provides. Read the [documentation](https://docs.strongloop.com/display/SL/Installing+StrongLoop), the article [Getting Started With Bluemix and StrongLoop](https://developer.ibm.com/bluemix/2015/09/10/getting-started-bluemix-strongloop/) and the blog entry [Getting Started With IBM MobileFirst and Node.js APIs built with LoopBack](https://developer.ibm.com/mobilefirstplatform/2015/09/10/getting-started-with-ibm-mobilefirst-and-node-js-apis-built-with-loopback/).