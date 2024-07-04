---
id: 1927
title: 'Introducing the CLEAN Stack: JavaScript everywhere'
date: '2016-03-02T15:29:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1927'
permalink: /article/introducing-clean-stack-javascript-everywhere/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/introducing-clean-stack-javascript-everywhere/
dsq_thread_id:
    - '4627890817'
categories:
    - Articles
---

The popularity and success of JavaScript is amazing. There are 1 million tagged questions on [StackOverflow](http://stackoverflow.com/questions/tagged/javascript), according to [RedMonk](http://redmonk.com/sogrady/2016/02/19/language-rankings-1-16/) there are more JavaScript projects on [GitHub](https://github.com) than projects in any other language and there are 250,000 [npm](https://www.npmjs.com/) packages available. Impressive numbers.

Within the JavaScript community the MEAN stack is a very popular full stack framework to build backends and frontends for applications with JavaScript. I think it’s a great stack, but to make it even simpler to build applications with REST APIs, applications with role based access control and to support multiple databases, the [Node.js](https://nodejs.org/) framework [LoopBack](http://loopback.io/) is a great addition.

Introducing the [CLEAN](https://github.com/IBM-Bluemix/collaboration) stack for IBM Bluemix …

![image](/assets/img/2016/03/clean-stack.png)

Just to get this out of the way. The term CLEAN is just something I’m using personally. While this model fits nicely into Bluemix, there is no such IBM product or offering.

CLEAN stands for [Cloudant NoSQL DB](https://console.ng.bluemix.net/docs/services/Cloudant/index.html#Cloudant), [LoopBack](http://loopback.io/), [Express](http://expressjs.com/), [AngularJS](https://angularjs.org/) and [Node.js](https://nodejs.org/). It’s similar to the MEAN stack with two significant differences.

**1) LoopBack**

With the importance of the API economy I looked for a mechanism to easily build and document APIs. LoopBack has a lot to offer along those lines and last week even more exciting [announcements](https://strongloop.com/strongblog/introducing-ibm-api-connect/) were made around API management.

Also a lot of applications require access control to certain information on both application and object level. I evaluated briefly other ways to do [authorization]({{ "/article/authorization-nodejs-applications-bluemix" | relative_url }}) in Node.js applications, but for me the built in functionality in LoopBack was much easier to use.

**2) Cloudant NoSQL Database**

The CLEAN stack uses Cloudant instead of MongoDB, but LoopBack actually supports MongoDB as well. One reason I chose Cloudant was just because I like it :). The other reason was that the Bluemix MongoDB service is not fully integrated in Bluemix yet and I wanted the deployment to be as easy as possible.

**Open Source Sample**

I’ve open sourced a simple sample that shows how to use the CLEAN stack and how to deploy the application to Bluemix. JavaScript and JSON are used everywhere.

JavaScript:

- Node.js for business logic
- AngularJS for web application
- Ionic, Cordova and AngularJS for hybrid mobile apps
- Gulp build script

JSON:

- Definitions of business objects
- REST APIs
- Property files

[Get the code from GitHub.](https://github.com/IBM-Bluemix/collaboration)

Check out the [slides](http://www.slideshare.net/niklasheidloff/collaborative-line-of-business-applications-on-ibm-bluemix) and the series of [blog articles](https://github.com/IBM-Bluemix/collaboration#documentation) for more information.

<iframe allowfullscreen="" frameborder="0" height="380" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/dJgfHifuKvPMGN" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="595"> </iframe>

Documentation:

- [Creating Business Objects and REST APIs with LoopBack]({{ "/article/creating-rest-apis-loopback" | relative_url }})
- [Usage of Cloudant in LoopBack Applications]({{ "/article/cloudant-loopback-nodejs" | relative_url }})
- [Authentication in LoopBack Applications against Bluemix]({{ "/article/authentication-loopback-bluemix" | relative_url }})
- [Customization of REST APIs in LoopBack Applications]({{ "/article/customization-rest-apis-loopback-bluemix" | relative_url }})
- [Authorization in LoopBack Applications on Bluemix]({{ "/article/authorization-loopback-bluemix" | relative_url }})
- [How to write AngularJS Frontends for LoopBack Applications]({{ "/article/how-to-write-angularjs-loopback-applications" | relative_url }})
- [How to write Mobile Apps for LoopBack Applications]({{ "/article/how-to-write-mobile-apps-loopback" | relative_url }})
- [How to consume Bluemix Services in LoopBack Applications]({{ "/article/how-to-consume-bluemix-services-loopback" | relative_url }})