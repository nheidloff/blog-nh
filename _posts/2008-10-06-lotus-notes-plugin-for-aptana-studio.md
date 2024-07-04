---
id: 29
title: 'Lotus Notes plugin for Aptana Studio'
date: '2008-10-06T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://s600643527.online.de/article/lotus-notes-plugin-for-aptana-studio/'
permalink: /article/06.10.2008010458NHE7YP.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/06.10.2008010458NHE7YP.htm/
dsq_thread_id:
    - '4317545761'
categories:
    - Articles
---

I’ve implemented a prototype that I’d like to describe in this and future blog entries. I call it the Notes plugin for Aptana Studio.

[Here is a demonstration.](http://heidloff.net/nh/home.nsf/aptanaprototype.htm/$file/prototype.htm "aptanaprototype.htm") Please check it out. I think it is pretty cool.

My main motivation for writing this prototype was to show that Notes/Domino supports the standard/normal web application programming model. I’ve heard too many times that people still consider Notes/Domino proprietary and that Notes/Domino application development requires proprietary and exotic skills. Technically this is really hard to understand. Notes/Domino supports a lot of different standards. With Notes 8x we even base on Eclipse RCP which many people consider the defacto standard for rich client programming. I think in order to change this perception we need to better communicate the capabilities of Notes/Domino. While there is more non-technical work to change this perception I’ve thought about different ways to change this perception via technical samples.

Personally I think the most common/standard programming model to build frontends in the industry and at universities is the pure web programming model. I’m not saying that this is the only model. Eclipse programming, other Java programming, .NET programming etc. are obviously also widely used. But most if not all developers have also written one of multiple applications simply using HTML and JavaScript. I consider HTML plus JavaScript plus Ajax the least common denominator for building applications. Many companies use these programming models, for example Apple’s iPhone and Adobe Air.

Notes/Domino supports this more or less as well, but because of various reasons people don’t get this message. One reason is that Notes/Domino has much more to offer than just this least common denominator and people think Notes/Domino only supports these other models. Notes/Domino has been and is so successful because of its rapid application development capabilities. The classic Notes database design to build rich client apps and the new XPage model for web applications are great examples. To be very clear, with my prototype I’m not suggesting to change anything in this regard. I love the XPage programming model, the classic Notes database design and the Eclipse model. They have clear advantages compared to the least common denominator approach described here.

What I’d like to show with this prototype is that Notes/Domino additionally supports the least common denominator web programming model if people want to use this. If we could make this prototype available to non Notes/Domino developers they might use it as an entry point in the great Notes/Domino world. In other words they could first see that they can do what they can do on other platforms but then later discover that Notes/Domino has much more to offer.

Even today in Notes/Domino you can use the web programming model but with various limitations. Maybe the first one many people run into is that it is hard to import JavaScript/Ajax libraries into NSFs. For different reasons like manageability, version conflicts, etc. developers want to make these libraries part of the NSFs rather than putting them on a central web server. You can import these JavaScript libraries into NSFs manually but only file by file and using folders is very hard in the Designer UI. One workaround people have used is to use WebDAV. For example Jake Howlett describes [here](http://www.codestore.net/store.nsf/unid/FISR-6U8SN7/) how to set it up.

For my prototype I’ve interviewed a couple of people asking them how they write web application frontends these days. Most of these people pointed my to [Aptana Studio](http://www.aptana.com/studio). Aptana describes their community edition of Studio as a free and open source Ajax development environment with good debugging capabilities. They claim it has already over 2 million downloads. There is a standalone version and an plugin to the Eclipse IDE. It runs on Windows, Linux and Mac. The IDE can be extended via plugins, for example Apple iPhone and Adobe Air.

My prototype shows another plugin for Aptana Studio. You can now also create Lotus Notes projects. A Lotus Notes project is a project in Aptana Studio which points to one NSF and reads and writes all files in the project to and from the NSF as file resources.

![image](/assets/img/2008/10/1_068FA4C0067C30D4001BF337852574DA.gif)

You can add your JavaScript libraries of choice very easily to the Notes project. For example you can drag and drop the Yahoo Ajax library and samples from the upper right view in Studio to your project. This essentially copies the files into the NSF. You can then run the HTML files in your Notes client as web application. I’ve implemented a Notes launch configuration to launch the web application in Lotus Notes directly from the Aptana IDE.

![image](/assets/img/2008/10/1_068FA88C067C30D4001BF337852574DA.gif)

Once you do this the Notes client comes up with your web application. You could also hide the URL address bar, put this component in a composite application or sidebar.

![image](/assets/img/2008/10/1_068FAB40067C30D4001BF337852574DA.gif)

This first sample shows how you can run web applications in Notes in an online mode. However Notes has much more to offer, esp. around offline. I don’t know any other product in the world with such a powerful replication mechanism. And replication of data is key when implementing offline applications. There are many competitors who just give a local SQL database and tell customers to do the replication themselves. Providing a local store however is not the hard part, it is the replication.

So I’ve implemented another sample that shows how you can run a web application in Notes online and then switch to offline. When doing this all data gets automatically replicated to the client. I’ve provided some JavaScript APIs to set up a local NSF from the web application and to trigger replication. I’ll write more about this soon.

![image](/assets/img/2008/10/1_068FB094067C30D4001BF337852574DA.gif)

So in summary this prototype shows how to do HTML and JavaScript programming in Lotus Notes/Domino. It shows how the popular web application IDE Apatana Studio can be used to do this. Additionally it shows how Notes/Domino provide additional value through offline and other features.

Please reply to this entry with your feedback. I’ll write some more about it over the next days.