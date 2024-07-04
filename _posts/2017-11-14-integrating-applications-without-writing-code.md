---
id: 2662
title: 'Integrating Applications without writing Code'
date: '2017-11-14T13:52:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2662'
permalink: /article/integrating-applications-without-code/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/integrating-applications-without-code/
dsq_thread_id:
    - '6283362207'
categories:
    - Articles
---

[IBM App Connect](https://console.bluemix.net/catalog/services/app-connect) is an IPaaS (Integration Platform as a Service) to connect different applications without having to write code. Similarly to IFTTT users are typically business users or citizen developers from line of business departments.

App Connect provides currently roughly 50 connectors to integrate applications like Salesforce, SAP, Slack and Gmail. See the [documentation](https://developer.ibm.com/integration/docs/app-connect/) for details. Users can graphically build flows that are either event-triggered, for example if a document is changed in a Cloudant database, or flows that implement APIs which are triggered via REST.

The tricky part of services like App Connect is how to pass data between the different applications. I like the App Connect approach a lot. In my previous job I implemented something similar and I know it was difficult.

Most applications provide REST APIs and use JSON, but JSON doesn’t have a schema and no standard way to transform and query data in JSON. To work around this, IBM built a Node.js library [JSONata](http://jsonata.org/) which has been inspired by XPath. This library is available as [open source](https://github.com/jsonata-js/jsonata).

Below is a simple sample. I trigger a flow via an “/email nheidloff” command in Slack which reads my email address via a REST API request and sends me an email.

This screenshot shows how to invoke the REST API. When pressing on the icon right to the URL field an in-context dialog pops up showing all available fields from previous nodes in the flow. In this case I’ve selected the ‘Message Body’ field from the Slack node to read the user name.

![image](/assets/img/2017/11/app-connect-1.png)

In the next node I read the response of the REST API request ‘Response body’. In order to access the fields of this response in the next Gmail node you can generate a schema simply by providing a sample JSON response.

![image](/assets/img/2017/11/app-connect-2.png)

![image](/assets/img/2017/11/app-connect-3.png)

After the JSON schema has been generated you can access single fields again in the in-context dialog, in this case the email address.

![image](/assets/img/2017/11/app-connect-4.png)

To find out more about App Connect get a [free lite account](https://console.bluemix.net/registration/) on IBM Cloud and give it a try.