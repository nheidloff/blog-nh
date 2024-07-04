---
id: 2430
title: 'Building Serverless Web Applications with OpenWhisk'
date: '2017-07-10T14:42:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2430'
permalink: /article/serverless-openwhisk-web-apps-oauth/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '5978123714'
custom_permalink:
    - article/serverless-openwhisk-web-apps-oauth/
categories:
    - Articles
---

[Apache OpenWhisk](http://openwhisk.incubator.apache.org/) is an open source cloud platform that executes functions in response to events at any scale. For example OpenWhisk can be used to run business logic in response to invocations from web and mobile apps over HTTP. This article describes how to build web applications where users can log in via their Google accounts and OpenWhisk is used to host protected APIs.

OpenWhisk on Bluemix comes with an [API Gateway](https://console.bluemix.net/docs/openwhisk/openwhisk_apigateway.html#openwhisk_apigateway) to manage access to APIs that have been implemented as OpenWhisk actions. For user authentication Google, Facebook and GitHub accounts can be used.

![image](/assets/img/2017/07/serverless-webapp.png)

For serverless web applications the challenge is how to do the OAuth dance since you cannot put the client secret into the client side web application for security reasons. This functionality must be done in some code that runs on a server, for example a Node.js application. Since I wanted to avoid having to host a server side application, I wanted to use OpenWhisk instead. Fortunately I found [sample code](https://github.com/starpit/openwhisk-oauth) from my colleagues Nick Mitchell and Lionel Villard that came close to my requirements.

Please note that the term “serverless” might be confusing here. Serverless does not mean there is no server involved at any time, it means you don’t have to host and operate server-side code since this is taken care of by the “Functions as a Service” provider, in this case OpenWhisk.

I’ve [open sourced](https://github.com/nheidloff/openwhisk-serverless-webapp) a simple web application built with [Angular](https://angular.io/) 4 which sends a redirect to Google when users want to log in (see [code](https://github.com/nheidloff/openwhisk-serverless-webapp/blob/master/angular/src/app/home.component.ts#L28)).

```
onButtonLoginClicked(): void {
  if (this.initialized == true) {
     let url = this.authorizationUrl + "?scope=email";
     url = url + "&amp;response_type=" + "code";
     url = url + "&amp;client_id=" + this.clientId;
     url = url + "&amp;access_type=" + "offline";
     url = url + "&amp;redirect_uri=" + this.redirectUrl;
     window.location.href = url;
  }
}
```

After users have logged in and approved the application, Google invokes the [first OpenWhisk action](https://github.com/nheidloff/openwhisk-serverless-webapp/blob/master/openwhisk-oauth/oauth-login.js) with a ‘code’ parameter. The action knows client id and secret and exchanges the code for an user OAuth access token. After this a [second OpenWhisk action](https://github.com/nheidloff/openwhisk-serverless-webapp/blob/master/openwhisk-oauth/oauth-redirect.js), which is in the same action sequence, sends a redirect to the Angular application and passes the token as URL parameter. With the access token protected APIs can be invoked by putting the token in the HTTP request header (see [code](https://github.com/nheidloff/openwhisk-serverless-webapp/blob/master/angular/src/app/home.component.ts#L46)).

```
onButtonInvokeActionClicked(): void {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.get(this.protectedUrl, options)
      .map(res => res.json())
      .subscribe(
      result => {
        console.log(result)
        this.resultOfProtectedAPI = JSON.stringify(result, null, 2);
      },
      err => {
        console.error(err);
        this.resultOfProtectedAPI = JSON.stringify(err._body, null, 2);
      });
  }
```

[Check out the complete sample on GitHub.](https://github.com/nheidloff/openwhisk-serverless-webapp)

The [slides](https://www.slideshare.net/niklasheidloff/building-serverless-web-applications-with-openwhisk) describe more details.

<iframe allowfullscreen="" frameborder="0" height="520" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/key/MFW4T2BTNJZal4" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" width="853"></iframe>

Check also out the [blog](https://medium.com/openwhisk/openwhisk-serverless-and-security-a-poc-c0346da33730) from Raymond Camden how to do OAuth with Auth0 and the open source [project](https://github.com/starpit/openwhisk-oauth) from Nick Mitchell and Lionel Villard that shows how to use OAuth with OpenWhisk without the API management functionality.