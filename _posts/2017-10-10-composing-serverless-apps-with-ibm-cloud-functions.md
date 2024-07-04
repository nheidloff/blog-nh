---
id: 2579
title: 'Composing Serverless Apps with IBM Cloud Functions'
date: '2017-10-10T20:13:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2579'
permalink: /article/serverless-apps-cloud-functions-composition-flows/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/serverless-apps-cloud-functions-composition-flows/
dsq_thread_id:
    - '6205265070'
categories:
    - Articles
---

Today at [Serverlessconf](https://nyc.serverlessconf.io/) IBM [announced](https://www.ibm.com/blogs/bluemix/2017/10/serverless-composition-ibm-cloud-functions/) a new key capability (as IBM Research preview) of [IBM Cloud Functions](https://console.bluemix.net/docs/openwhisk/index.html#getting-started-with-cloud-functions). With the new tool ‘[Composer](https://github.com/ibm-functions/composer)‘ apps can be created which contain multiple cloud functions. These apps coordinate the invocations of actions and the data flow. Compared to the previously available [action sequences](https://console.bluemix.net/docs//openwhisk/openwhisk_actions.html#openwhisk_create_action_sequence) the new functionality is much more flexible.

Cloud functions are typically rather simple and focussed on specific tasks which is why people often refer to cloud functions as microservices. Cloud-native applications usually have many microservices. While the implementation of the microservices is rather simple, the key challenge is the orchestration layer above the microservices. That’s why frameworks like Kubernetes with additions like Istio have become very popular. With the new Composer tool developers can now build apps that leverage multiple cloud functions and that require more complex, coordinated flows for end to end solutions.

“Composer is an IBM Cloud Functions programming model for composing individual functions into larger applications. Compositions, informally named apps, run in the cloud using automatically managed compute and memory resources. Composer is an extension of the function-as-a-service computing model, and enables stateful computation, control flow, and rich patterns of data flow. Composer has two parts. The first is a library for describing compositions, programmatically. The library is currently available in Node.js. The second is a runtime that executes the composition.”

Let’s take a look at a simple example. With the new Composer functionality different functions can be invoked dependent on the result of a previous function. The screenshot shows the new tool ‘fsh’ (functional programming shell) which displays the flow graphically.

![image](/assets/img/2017/10/cloud-functions-compose1.png)

The apps (compositions) can be defined via JSON which is executed by a runtime component. In addition to ‘if’ many other [composition methods](https://github.com/ibm-functions/composer/tree/master/docs#compositions-by-example) are supported.

![image](/assets/img/2017/10/cloud-functions-compose3.png)

What I really like is the second approach to define apps which I think is more natural for developers. While you can define apps as JSON configuration, you can also write Node.js code which uses the Composer SDK and you can use constructs as variables, try/catch statements, loops, data forwarding and much more.

![image](/assets/img/2017/10/cloud-functions-compose2.png)

The Node.js code is compiled into JSON which is executed by the runtime. In order to handle the state of the apps, developers need to provision Redis datastores (see the [documentation](https://github.com/ibm-functions/composer/tree/master/docs#before-you-run-your-first-app) for details). The managed runtime together with the datastore allow hosting and running serverless apps.

To find out more, check out the [quick start guide](https://github.com/ibm-functions/composer/tree/master/docs#programming-shell-quick-start).