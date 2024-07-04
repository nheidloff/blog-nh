---
id: 3189
title: 'Authentication of Users in Serverless Applications'
date: '2018-12-11T09:44:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3189'
permalink: /article/user-authentication-serverless-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
enclosure:
    - "https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/documentation/serverless-web-app.mp4\r\n0\r\nvideo/mp4\r\n"
dsq_thread_id:
    - '7099134112'
custom_permalink:
    - article/user-authentication-serverless-openwhisk/
categories:
    - Articles
---

Recently I open sourced a complete [serverless web application](https://github.com/nheidloff/serverless-web-application-ibm-cloud) which can be deployed on the IBM Cloud in less than 10 minutes. In this article I describe how users are authenticated via [IBM App ID](https://cloud.ibm.com/catalog/services/app-id).

My sample describes how to host static resources on IBM Object Storage, how to authenticate users via IBM App ID, how to access IBM Cloudant from OpenWhisk functions and how to use API management. This diagram shows the main components. In this article I focus on the authentication flow.

![image](/assets/img/2018/12/serverless-app-id-diagram.png)

Watch the 10 seconds [video](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/documentation/serverless-web-app.mp4) for a short demo of the OAuth dance.

[App ID](https://console.bluemix.net/docs/services/appid/index.html#gettingstarted) helps developers to easily add authentication to their web and mobile apps with few lines of code. Several different [identity providers](https://console.bluemix.net/docs/services/appid/manageidp.html#managing) are supported. For example for enterprise applications you can use your existing identity provider via SAML. To keep my sample as easily as possible I use a cloud directory with one test user:

![image](/assets/img/2018/12/serverless-app-id-users.png)

App ID also comes with [authentication pages](https://console.bluemix.net/docs/services/appid/branded.html#branding) for web applications which can easily be customized. This allows developers to focus on their business logic rather than having to write their own authentication pages and flows.

App ID can easily be used in server side code. In this case the client ID and client secret are stored on the server. For serverless applications, these credentials must not be stored in the client for security reasons. That’s why I’ve implemented OpenWhisk [login functions](https://github.com/nheidloff/serverless-web-application-ibm-cloud/tree/master/function-login) which authenticate users via OAuth.

These two functions and the sequence are generic and can easily be used in other web applications hosted on the IBM Cloud. Read my previous [article]({{ "/article/serverless-web-applications-oauth" | relative_url }}) to understand how these functions and the sample Angular app invoke and execute the OAuth dance. When I wrote that article, the App ID cloud directory didn’t exist which is why I choose Google as identity provider.

![image](/assets/img/2018/12/serverless-app-id-functions.png)

If you want to try this functionality yourself, create an [IBM Cloud lite account](https://ibm.biz/nheidloff) (free, no credit card required) and follow the steps outlined in my [repo](https://github.com/nheidloff/serverless-web-application-ibm-cloud).

This article is part of a mini series. Check out the other articles and documentation:

- [Developing Serverless Web Applications on the IBM Cloud]({{ "/article/serverless-web-applications-ibm" | relative_url }})
- [Hosting Resources for Web Applications on the IBM Cloud]({{ "/article/hosting-static-web-resources-ibm-cloud" | relative_url }})
- [User Authorization in Serverless Web Applications]({{ "/article/user-authorization-serverless-web-applications-openwhisk" | relative_url }})
- [Setup Instructions](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/README.md)
- [Screenshots](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/documentation/serverless-web-apps.pdf)