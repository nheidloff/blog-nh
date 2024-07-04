---
id: 3477
title: 'Authenticating Web Users with OpenID and JWT'
date: '2019-04-08T09:25:01+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3477'
permalink: /article/authenticating-web-users-openid-connect-jwt/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/authenticating-web-users-openid-connect-jwt/
categories:
    - Articles
---

As some of my readers will know, I’m working on a [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) repo that demonstrates how to start building cloud-native applications with Java EE and Istio. One of the required core features for most applications is authentication and authorization.

**OpenID Connect and JWT**

In order to authenticate and authorize users, I’ve chosen the standard [OpenID Connect](https://openid.net/connect/) 1.0 and OAuth 2.0 which can be used with many existing identify providers. In the context of enterprise applications you want to leverage existing organization directories. [IBM App ID](https://console.bluemix.net/docs/services/appid/enterprise.html#enterprise), for example, acts as an identity provider or identity provider proxy. For simple tests you can define test users in a cloud directory. For production usage App ID can be configured to work against third-party providers such as Active Directory Federation Services via SAML.

Identify providers also come with their own login pages which means that you, as a developer, don’t have to implement yet another login page with user name and password fields and enterprise users get a consistent way to log in. With App ID this login page can easily be customized.

The other nice thing about OpenID Connect for developers is, that you don’t have to understand the internals of the different identity providers, but can use standardized and easy APIs. As response of successful OAuth dances, you get access tokens and user tokens as [JSON Web Token](https://jwt.io/introduction/) (JWT).

**Sample Implementation**

In order to authenticate users, I use IBM App ID with a test user in a cloud directory. I’ve implemented another service, called ‘authentication’, via Node.js and the npm module ‘[openid-client](https://www.npmjs.com/package/openid-client)‘. The Vue.js application invokes a ‘login’ endpoint of this service. The authentication service triggers the OAuth dance and returns the tokens to the web application.

Here is my sample application. The three components that are run for authentication are 1. App ID, 2. Authentication and 3. Web App.

![image](/assets/img/2019/04/jwt-architecture.png)

After successful logins the Vue.js web application retrieves the access token and stores it together with the user name and email address in the Vuex store.

![image](/assets/img/2019/04/jwt-login.jpeg)

This animated gif shows the authentication flow.

![image](/assets/img/2019/04/jwt-login.gif)

**Run the Sample yourself**

If you want to run this sample, follow the [instructions](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/DemoAuthentication.md) in the repo.

Essentially when you have an [IBM Cloud](http://ibm.biz/nheidloff) account and when you have Minikube with Istio running locally, all you need to do is to invoke the following commands:

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ ibm-scripts/create-app-id.sh
$ scripts/deploy-web-api-java-jee.sh
$ scripts/deploy-authentication-nodejs.sh
$ scripts/deploy-web-app-vuejs-authentication.sh
$ scripts/deploy-istio-ingress-v1.sh
$ scripts/show-urls.sh
```

Note: Since this is a starter repo, I’m using HTTP only at this point. For production usage you should leverage secure connections.

Over the next days I’ll blog about how to use these tokens to invoke protected endpoints of the ‘web-api’ service and how to access the tokens in Java applications to authorize users.