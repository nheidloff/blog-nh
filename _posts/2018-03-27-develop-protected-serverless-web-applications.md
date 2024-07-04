---
id: 2907
title: 'Developing protected Serverless Web Applications'
date: '2018-03-27T06:26:10+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2907'
permalink: /article/serverless-web-applications-oauth/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6578841265'
custom_permalink:
    - article/serverless-web-applications-oauth/
categories:
    - Articles
---

Serverless platforms are often used to build APIs for web and mobile apps. I’ve open sourced a [pattern](https://developer.ibm.com/code/patterns/develop-protected-serverless-web-applications/) that shows how to implement protected APIs with [IBM Cloud Functions](https://console.bluemix.net/openwhisk/) and how to invoke them from Angular web applications.

[Get the code from GitHub.](https://github.com/IBM/IBM-function-webapp)

IBM Cloud Functions comes with an [API Gateway](https://console.bluemix.net/docs/openwhisk/openwhisk_apigateway.html#openwhisk_apigateway). Developers can grant access to their APIs via application keys and they can track usage via graphical dashboards. For user authentication Google, Facebook and GitHub accounts can be used via OAuth.

![image](/assets/img/2018/03/serverless-webapp-1.png)

The static resources of web applications can be hosted in various ways, for example on [GitHub pages](https://console.bluemix.net/docs/tutorials/serverless-api-webapp.html?pos=2#serverless-web-application-and-api). Since the JavaScript files are loaded in browsers, for security reasons they must not include the credentials to access the APIs. Instead OAuth is used to authenticate users before invoking the protected APIs. Read the [documentation](https://console.bluemix.net/docs/apis/management/manage_apis.html#settings_api) for more information.

The following diagram describes the flow of authenticating and authorizing a user in the sample application:

![image](/assets/img/2018/03/pattern-protected-app.png)

1. User opens the Angular web application via web browser and clicks the ‘login’ button.
2. Web application opens the Google OAuth web page, where users authenticate and grant the application access.
3. Google page redirects to OpenWhisk sequence ‘oauth-login-and-redirect’ with a code parameter in the URL.
4. The sequence is triggered. The first OpenWhisk function ‘oauth-login’ reads the code and invokes a Google API endpoint to exchange the code against a token.
5. The same ‘oauth-login’ function invokes with the token another Google API endpoint to read user profile information, such as the user name.
6. The sequence invokes the next OpenWhisk function redirect, which invokes the Angular app with the token and the user name in the URL.
7. When users click on the ‘invoke protected action’ button in the Angular app, a REST API to the API management is invoked. The request contains the token.
8. API management validates the token. If valid, the OpenWhisk function protected-action is invoked. If the token is invalid, the request will be rejected and response code 401 will be returned.
9. The response from ‘protected-action’ is displayed in the Angular application.

This is the [code](https://github.com/IBM/IBM-function-webapp/blob/master/openwhisk-oauth/oauth-login.js) of step (4) which reads the access token. The OAuth client id and secret are only accessible in this code and not in the client side JavaScript code.

```
function main(params) {
   return new Promise((resolve, reject) => {
      const providers = params.providers;
      const code = params.code;
      var providerName = params.provider || params.providerName;
      var provider = providers[providerName];
      var form = {
         client_id: provider.credentials.client_id,
         client_secret: provider.credentials.client_secret,
         code: code
      };
      ...
      var options = {
         url: provider.endpoints.token,
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         }
      };
      ...
      request(options, function (err, response, body) {
         if (err || response.statusCode >= 400) {
            ...
         } else {
            body = JSON.parse(body);
            var accessToken = body.access_token;
...
```

Thanks a lot to my colleague Andy Shi who converted this sample into a [code pattern](https://developer.ibm.com/code/patterns/).

If you want to try out OpenWhisk in the cloud, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff).