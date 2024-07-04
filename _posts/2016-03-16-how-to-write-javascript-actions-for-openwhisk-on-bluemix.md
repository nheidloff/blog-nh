---
id: 1975
title: 'How to write JavaScript Actions for OpenWhisk on Bluemix'
date: '2016-03-16T08:33:22+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1975'
permalink: /article/how-to-write-javascript-actions-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4666895527'
custom_permalink:
    - article/how-to-write-javascript-actions-openwhisk/
categories:
    - Articles
---

**Update 02/15/17**: [Using Node.js to code OpenWhisk actions](https://www.ibm.com/blogs/bluemix/2016/12/node-js-code-openwhisk-actions/)

In addition to Cloud Foundry, Docker and Virtual Maschines [Bluemix](https://bluemix.net) provides a fourth compute option [OpenWhisk](https://developer.ibm.com/openwhisk/) (experimental at this point). OpenWhisk is an event-driven compute platform that executes code in response to events or direct invocations.

With OpenWhisk you can develop server side actions in JavaScript and Swift without having to maintain servers. The advantage is that you only have to pay for actual usage, not for peaked projections. This opens up several interesting [use cases](https://new-console.ng.bluemix.net/docs/openwhisk/openwhisk_about.html#openwhisk_use_cases). For example you can perform processing of data like videos and processing of data from IoT devices triggered by events. You can also build backend services for mobile apps to move logic to the backend and reduce network traffic. OpenWhisk also supports decomposing applications into microservices.

Below is a simple example how to build a JavaScript action that leverages the [Watson Language Translation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/language-translation.html) service to translate text. This action can be invoked directly and also via events. For example in a help desk application you might want to translate tickets which have not been written in English to English so that support agents understand. Rather than doing this when tickets are stored or opened the OpenWhisk action could be triggered when new documents are stored in a Cloudant NoSQL database.

Here is the code of the JavaScript action (‘translate.js’). Parameters are passed in to the main function. In this case the action is asynchronous and returns data in the whisk.done function. The JavaScript code is executed via Node.js and you can use a number of available [npm modules](https://new-console.ng.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_ref_javascript), in this case the Watson module watson-developer-cloud is used to access the Watson service.

```
function main(params) {
    var tobetranslated = "";
    if (params.hasOwnProperty("tobetranslated")) {
        tobetranslated = params.tobetranslated;
    }
    
    var watson = require('watson-developer-cloud');			  	 				   
    var language_translation = watson.language_translation({
        username: "xxx",
        password: "xxx",
        version: 'v2'
    });

    language_translation.translate({
        text: tobetranslated, source : 'en', target: 'es' },
        function (err, translation) {
            if (!err) {
                return whisk.done({tobetranslated:tobetranslated,
                                   result:translation});
            }
            else {
                return whisk.done({result: 'Error occured' });
            }
        });
				  	
    return whisk.async();
}
```

In order to deploy the action a [CLI](https://new-console.ng.bluemix.net/openwhisk/cli) is used and the plan is to also support tooling via web browsers. Invoke the following commands to create and update actions.

```
wsk action create translate translate.js
wsk action update translate translate.js
```

For developing purposes probably the easiest way to test actions is the CLI at this point.

```
wsk action invoke --blocking --result translate --param tobetranslated 'Hello'
```

The CLI invokes internally [REST APIs](https://new-console.ng.bluemix.net/apidocs/98) which means that you can also interact with OpenWhisk via curl or other programming languages. Authentication is done via name and password credentials provided by OpenWhisk.

```
curl -u "yourUserName":"yourPassword" -H "Content-Type: application/json" -X POST https://openwhisk.ng.bluemix.net/api/v1/namespaces/niklas_heidloff@de.ibm.com_BluemixInfo/actions/translate?blocking=true -d '{"tobetranslated":"Hello"}'
```

Here is the output of the curl command.

![image](/assets/img/2016/03/whisk-sample1.jpg)

Via the OpenWhisk dashboard on Bluemix you can see activities and logs.

![image](/assets/img/2016/03/whisk-sample2.jpg)

To find out more check out the [documentation](https://new-console.ng.bluemix.net/docs/openwhisk/index.html), the open source project [OpenWhisk](https://github.com/openwhisk/openwhisk) and the [image tagging](https://github.com/IBM-Bluemix/openwhisk-visionapp) sample from Frederic Lavigne.