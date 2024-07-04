---
id: 1980
title: 'How to trigger OpenWhisk Actions on Cloudant Databases Changes'
date: '2016-03-17T10:23:51+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1980'
permalink: /article/how-to-trigger-openwhisk-cloudant/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-trigger-openwhisk-cloudant/
dsq_thread_id:
    - '4669981872'
categories:
    - Articles
---

Yesterday I wrote about [how to write JavaScript Actions for OpenWhisk]({{ "/article/how-to-write-javascript-actions-openwhisk" | relative_url }}) on Bluemix. Actions can be triggered manually (as described in previous article) and when certain events occur. Below is a simple sample how to trigger [OpenWhisk](https://developer.ibm.com/openwhisk/) actions when documents in [Cloudant NoSQL databases](https://console.ng.bluemix.net/catalog/services/cloudant-nosql-db) are changed or added.

Let’s use the same scenario as previously. In a help desk application you want to translate tickets which have not been written in English to English so that support agents understand. Rather than doing this when tickets are stored or opened the OpenWhisk action is triggered when new documents are stored in a Cloudant NoSQL database.

The [documentation](https://new-console.ng.bluemix.net/docs/openwhisk/openwhisk_catalog.html#openwhisk_catalog_cloudant) describes how to build this scenario. Essentially you need in addition to the JavaScript action a trigger and a rule. Invoke the following commands via the [CLI](https://new-console.ng.bluemix.net/openwhisk/cli) and replace your credentials, namespace and database name.

```
wsk property set --auth <yourOpenWhiskUser>:<yourOpenWhiskPassword> --namespace "<yourOpenWhiskNameSpace>"
wsk package bind /whisk.system/cloudant myCloudant -p username '<yourCloudantUser>' -p password '<yourCloudantPassword>' -p host '<yourCloudantHost>'
wsk package list
wsk package get /<yourOpenWhiskNameSpace>/myCloudant
wsk trigger create myCloudantTrigger --feed /<yourOpenWhiskNameSpace>/myCloudant/changes --param <yourCloudantDBName> testdb --param includeDocs true
```

To see the trigger in action create a JavaScript action ‘hello.js’ and and rule.

```
function main() {
   return {payload: 'Hello world'};
}
```

```
wsk action create hello hello.js
wsk rule create --enable sampleRule myCloudantTrigger hello
wsk activation poll
```

When you change documents or add documents in your Cloudant database you can see logs in your terminal window and the OpenWhisk dashboard.

![image](/assets/img/2016/03/whisk-sample3.jpg)