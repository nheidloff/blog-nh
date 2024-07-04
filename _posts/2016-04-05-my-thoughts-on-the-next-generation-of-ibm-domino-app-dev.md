---
id: 2002
title: 'My Thoughts on the Next Generation of IBM Domino App Dev'
date: '2016-04-05T10:18:13+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2002'
permalink: /article/next-generation-ibm-domino-app-dev/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4721555981'
custom_permalink:
    - article/next-generation-ibm-domino-app-dev/
categories:
    - Articles
---

Before I started to work on [Bluemix](https://bluemix.net) I had worked 15 years in the IBM Collaboration Solutions space, especially on application development. Below are my personal thoughts on how app dev in IBM Domino could evolve, both on-premises and in the cloud.

**App Dev Models in Domino**

Since Domino has been around for a long time the app dev capabilities have grown. At this point there are developers who build rich client applications via forms and views, there are developers who use Domino pass through HTML, XPages developers who use XPages for server and client side logic, developers who build REST APIs via XPages and frontends via client libraries, etc. The good thing for Domino developers is that none of the older capabilities were removed, but instead new functionality was added on top. I think it’s time to add yet another way for developers to build applications on Domino, again, without replacing anything that exists today.

**The Power of JavaScript**

While some Domino developers have started to use Java, my guess is that the majority of developers prefers scripting languages and I’ve heard many times the desire to develop all aspects of an application in one language. Fortunately with JavaScript you have this option today. In my little [sample](https://github.com/IBM-Bluemix/collaboration) I used JavaScript on server side, for the web frontend, for the mobile apps and even the build script.

The popularity and success of JavaScript is amazing. There are 1 million tagged questions on [StackOverflow](http://stackoverflow.com/questions/tagged/javascript), according to [RedMonk](http://redmonk.com/sogrady/2016/02/19/language-rankings-1-16/) there are more JavaScript projects on GitHub than projects in any other language and there are 250,000 [npm](https://www.npmjs.com/) packages available. I think it would be awesome if Domino developers could leverage this momentum and this community.

**Node.js Runtime in Domino**

Wouldn’t it be cool if Domino had a Node.js runtime so that developers could build Node applications that access data in NSFs via simple JavaScript APIs and JSON? This would allow Domino developers to leverage both the huge JavaScript community as well as the nice capabilities of NSFs like security, replication, documents and more. As done previously when adding XPages the core value of the Domino platform would still be used but supplemented with a new way to build application business logic and frontends. The difference would be that the tool Domino Designer wouldn’t have to be used anymore necessarily.

**Collaborative Line of Business Applications**

Based on my experience most applications built with Domino are collaborative Line of Business applications. Here is how I define those:

Line of Business requirements often lead to the development of new applications since standard software is not sufficient. Collaborative applications allow employees to work together synergistically to get their jobs done. Collaborative Line of Business applications often require the protection of intellectual property based on roles of employees. Samples scenarios are approval workflows, teamrooms or travel expenses.

Technically this often maps to requirements like authentication, authorization, rapid application development, REST APIs, web frontends, mobile apps, NoSQL databases and more. A Node.js runtime in Domino together with a way to authenticate against the Domino directory and a JavaScript APIs against NSFs including authorization could fulfill these requirements.

**Adding cognitive Capabilities to Applications**

While collaborative applications have been around for quite some time, I think the next generation of these types of applications will be significantly different. I expect new collaborative applications to heavily include cognitive capabilities, for example to provide highly personalized experiences, to leverage deep learning to detect important information for individuals via personal assistants or to use intelligent bots for conversations. Collaboration in the past seemed to have focused on the team aspects. In the future I think the personal aspects will get more focus and cognitive services and artificial intelligence can address this. Additionally natural user interfaces like speech recognition and gestures will become more and more adopted and context information from the Internet Of Things will be used to optimize collaborative experiences.

IBM provides this and more functionality, for example via services in IBM Bluemix. While Node.js applications are not the only way to consume this, they make it very easy and there are tons of examples for developers available today.

**Rapid Application Development**

With all the available tools, libraries and documentation I think it’s fair to call Node.js a rapid application development platform. However there is an extension of Node.js which makes it even easier to build collaborative Line of Business applications – [LoopBack](http://loopback.io/). LoopBack is an open source Node.js framework to build APIs and an extension of the popular Express server. Developers from the company StrongLoop are the main committers and IBM acquired StrongLoop a couple of months ago.

Over the last weeks I’ve tried LoopBack and I’m excited how easy it is to build applications. Business objects can be defined declaratively. The persistence, REST APIs, documentation of the REST APIs and client side JavaScript libraries are generated for you. Similarly to Domino ACLs and reader fields LoopBack supports role based application and business object access. Pretty powerful. Check out my [sample](https://github.com/IBM-Bluemix/collaboration) project and the [deck](http://www.slideshare.net/niklasheidloff/collaborative-line-of-business-applications-on-ibm-bluemix) for additional information.

LoopBack comes with a [connector framework](https://docs.strongloop.com/display/public/LB/Database+connectors) to work against various databases. I think it would be great to add another connector for NSFs. Via [Passport](http://passportjs.org/) LoopBack also supports [authentication](https://docs.strongloop.com/pages/releaseview.action?pageId=3836277) against different directories and a Passport strategy for Domino could be developed similarly to the [IBM Connections strategy](https://github.com/benkroeger/passport-ibm-connections-cloud).

**Relation to Bluemix**

The obvious question is how this relates to Bluemix and the cloud. It needs to be possible to deploy collaborative applications to Bluemix and use other Bluemix services, for example cognitive and IoT services, as described above.

Bluemix supports various runtimes like [XPages](https://console.ng.bluemix.net/catalog/starters/xpages/) and [Node.js](https://console.ng.bluemix.net/catalog/starters/sdk-for-nodejs/). So hosting the business logic on Bluemix is simple. The question is how to handle the data as long as the [XPages NoSQL Database](https://console.ng.bluemix.net/catalog/services/xpages-nosql-database/) is not available for production usage. Here is an idea.

Bluemix provides several databases as services. One database I really like is the NoSQL database [Cloudant](https://console.ng.bluemix.net/catalog/services/cloudant-nosql-db/) which is based on [Apache CouchDB](http://couchdb.apache.org/). There are a lot of similarities to NSFs, certainly also because of the history. So why not using this database in the cloud? To make it easier for Domino developers to switch between on-premises development against NSFs and cloud development against Cloudant, maybe the [Cloudant Node.js API](https://github.com/cloudant/nodejs-cloudant) could be implemented against NSF? Also if LoopBack is used changing the underlaying database is trivial and doesn’t require any code changes.

**Closing Remarks**

In addition to a JavaScript API (npm module) against NSFs there should be a JavaScript API against IBM Connections so that developers can integrate social functionality in their applications, for example social file sharing or status updates.

As I said these are just my thoughts and ideas. Just wanted to throw this out for discussion since people seemed to be interested in this at EngageUG and recent discussions I’ve had.