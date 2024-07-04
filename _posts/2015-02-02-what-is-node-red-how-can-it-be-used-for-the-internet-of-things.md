---
id: 1060
title: 'What is Node-RED? How can it be used for the Internet of Things?'
date: '2015-02-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/what-is-node-red-how-can-it-be-used-for-the-internet-of-things/'
permalink: /article/21.01.2015081841NHEAL8.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4327163795'
custom_permalink:
    - article/21.01.2015081841NHEAL8.htm/
categories:
    - Articles
---

 When I recently started to work on Bluemix, I was honestly a little confused about what Node-RED is, how it relates to the Node.js Bluemix runtime and how it relates to the Internet of Things service. Since some of my readers might be in the same situation, let me quickly try to explain.

[Node-RED](http://nodered.org/) is a visual tool for wiring the Internet of Things, but it can also be used for other types of applications to quickly assemble flows of services. The name is not the most intuitive name. The reason why ‘Node’ is in the name is because the tool is implemented as Node application but from a consumer point of view that’s really only an internal implementation detail. Node-RED is available as [open source](http://github.com/node-red/node-red) and has been implemented by the [IBM Emerging Technology](http://www-01.ibm.com/software/ebusiness/jstart/) organization.

 Node-RED is included in the [Bluemix Internet of Things starter application](https://www.ng.bluemix.net/docs/#starters/IoT/iot500.html), but you can also deploy it as Node.js application separately. To use Node-RED for Internet of Things scenarios you need to add the [Internet of Things Foundation service](https://www.ng.bluemix.net/docs/#services/IoT/index.html) to your Bluemix application. The IoT service allows to register and connect different types of devices. After this you can use the incoming and outgoing MQTT nodes in your flows. Take a look at the existing [Bluemix Internet of Things samples](http://heidloff.net/nh/home.nsf/article.xsp?id=07.01.2015123405NHEFKU.htm). Most of them use Node-RED to define flows where either incoming sensor data from ‘things’ is handled, e.g. stored in databases, or where commands are sent to devices.

![image](/assets/img/2015/02/iotinout.png)

 Node-RED can not only be used for Internet of Things applications, but it is a generic event-processing engine. For example you can use it to listen to events from http, websockets, tcp, Twitter and more and store this data in databases without having to program much if at all. You can also use it for example to implement simple REST APIs. Ryan Baxter provided just last week a [Node-RED sample](http://ryanjbaxter.com/2015/01/13/sample-node-red-flow-using-websockets/) that isn’t an IoT app. You can find many other [sample flows](http://flows.nodered.org/) on the Node-RED website.

 There are also several good demos and videos. One demo I especially like is this one from Rodric Yates:

{% include embed/youtube.html id='f5o4tIz2Zzc' %}

 For a better description what Node-RED is and some of the history check out the article [How IBM’s Node-RED is hacking together the internet of things](http://www.techrepublic.com/article/node-red/) from Nick Heath.

If you want to try out Node-RED hosted in the cloud, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff) and use the Node-RED boilerplate to get started quickly.