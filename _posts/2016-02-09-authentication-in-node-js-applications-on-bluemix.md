---
id: 1846
title: 'Authentication in Node.js Applications on Bluemix'
date: '2016-02-09T08:03:02+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1846'
permalink: /article/authentication-node-js-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4563908279'
custom_permalink:
    - article/authentication-node-js-bluemix/
categories:
    - Articles
---

There are different ways how to do authentication in Node.js applications running on [Bluemix](https://bluemix.net), either via Bluemix services, third party offerings, open source libraries or self written code. Below is a sample that leverages the [Single Sign On](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html) service and a Mongo database to store user sessions for cloud native applications.

[Get the code from GitHub.](https://github.com/IBM-Bluemix/collaboration/tree/initialversion)

The Single Sign On service supports different identity providers. For example enterprise customers typically use SAML. If customers don’t have an SAML identity provider, they can install an [Identity Bridge](https://www.ng.bluemix.net/docs/services/SingleSignOn/idbr_info.html#idbr_overview) on premises which externalizes the SAML protocol to an LDAP version 3 compliant directory. In the sample below I use a cloud directory with only one test user, but the application code would be identical when using SAML.

![image](/assets/img/2016/02/sso-setup-3.png)

In the Node.js application [passport](http://passportjs.org/) and [passport-idaas-openidconnect](https://www.npmjs.com/package/passport-idaas-openidconnect) are used. passport-idaas-openidconnect is a passport authentication strategy for the IBM Bluemix Single Sign On service. Check out [authentication.js](https://github.com/IBM-Bluemix/collaboration/blob/initialversion/server/authentication.js) for details.

The sample code relies on cookies which are sent with the client requests and validated on the server. For cloud native applications the validation needs to work when multiple instances of applications are run. My colleague Tim Robinson documented in the article [Scale single sign-on for your Node.js cloud apps](https://www.ibm.com/developerworks/library/wa-scale-sso-for-node-apps-trs-bluemix/) how to do this by leveraging Redis. My sample is very similar but uses Mongo instead of Redis.

Follow the instructions in the [README](https://github.com/IBM-Bluemix/collaboration/blob/initialversion/README.md) how to set up the sample application. Since as a developer I prefer to develop locally I documented how to configure the local development environment. After everything is set up correctly, you’ll be able to log on and access the user information in the server side code.

![image](/assets/img/2016/02/login-1.png)