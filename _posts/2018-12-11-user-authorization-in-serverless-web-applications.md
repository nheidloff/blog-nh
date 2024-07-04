---
id: 3199
title: 'User Authorization in Serverless Web Applications'
date: '2018-12-11T11:36:28+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3199'
permalink: /article/user-authorization-serverless-web-applications-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/user-authorization-serverless-web-applications-openwhisk/
dsq_thread_id:
    - '7099271327'
categories:
    - Articles
---

In this article I describe how to authorize users in serverless web applications on the IBM Cloud.

I’ve [open sourced a sample Angular application](https://github.com/nheidloff/serverless-web-application-ibm-cloud) which authenticates users via OAuth and [IBM App ID](https://console.bluemix.net/docs/services/appid/index.html#gettingstarted) as described in my previous article ‘[Authentication of Users in Serverless Applications]({{ "/article/user-authentication-serverless-openwhisk" | relative_url }})‘. Once users are authenticated, the Angular application stores the access tokens of the users.

API Management can be used on the IBM Cloud to control access to OpenWhisk functions. These APIs can be protected, for example by ensuring that users are authenticated against App ID.

Note that this setting checks whether users have valid access tokens. It does not help you to get access tokens for users. That’s why users need to be authenticated first as described in my [article]({{ "/article/user-authentication-serverless-openwhisk" | relative_url }}).

![image](/assets/img/2018/12/protected-api-2.png)

In my sample I create the App ID service instances and the protected APIs programmatically. If you want to use the web interface, you need to create the App ID instance first and then create via the CLI a Cloud Foundry alias so that you can see the instance in the combobox in the screenshot above. Hopefully this will get easier soon.

```
$ ibmcloud resource service-alias-create app-id-serverless --instance-name app-id-serverless
```

In order to create the API programmatically, I created a [Swagger template](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/function-protected/swagger-template.json#L73). Before deploying the API, the template needs to be modified. Right now the App ID tenant ID needs to be defined in the Swagger JSON file first (see my [script](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/scripts/setup-protected-function.sh#L94-L98) for details). There is work going on to simplify this as well, so that you only need to define App ID service instance names or GUIDs.

The implementation of the actual [function](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/function-protected/function-protected.js) is pretty straight forward. OpenWhisk ensures automatically that users have valid access tokens before the functions are triggered. If you only want to make sure that users are authenticated, no extra code is required.

However if you not only want to know that users are authenticated, but also who the users are, you need to invoke the ‘/userinfo’ endpoint. Check out my [sample code](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/function-login/login.js#L57-L86) and read the [documentation](https://cloud.ibm.com/docs/services/appid/predefined.html#api). The endpoint expects user tokens in the ‘authorization’ header which can be read in OpenWhisk functions from ‘params.\_\_ow\_headers.authorization’.

This is a sample response from ‘userinfo’:

```
"sub": "cad9f1d4-e23b-3683-b81b-d1c4c4fd7d4c",
"name": "John Doe",
"email": "john.doe@gmail.com",
"picture": "https://lh3.googleusercontent.com/-XdUIqdbhg/AAAAAAAAI/AAAAAAA/42rbcbv5M/photo.jpg",
"gender": "male",
"locale": "en",
"identities": [
   {
       "provider": "google",
       "id": "104560903311317789798",
       "profile": {
           "id": "104560903311317789798",
           "email": "john.doe@gmail.com",
           "verified_email": true,
           "name": "John Doe",
           "given_name": "John",
           "family_name": "Doe",
           "link": "https://plus.google.com/104560903311317789798",
           "picture": "https://lh3.googleusercontent.com/-XdUIqdbhg/AAAAAAAAI/AAAAAAA/42rbcbv5M/photo.jpg",
           "gender": "male",
           "locale": "en",
           "idpType": "google"
       }
   }
]
```

If you want to try this functionality yourself, create an [IBM Cloud lite account](https://ibm.biz/nheidloff) (free, no credit card required) and follow the steps outlined in my [repo](https://github.com/nheidloff/serverless-web-application-ibm-cloud).

This article is part of a mini series. Check out the other articles and documentation:

- [Developing Serverless Web Applications on the IBM Cloud]({{ "/article/serverless-web-applications-ibm" | relative_url }})
- [Hosting Resources for Web Applications on the IBM Cloud]({{ "/article/hosting-static-web-resources-ibm-cloud" | relative_url }})
- [Authentication of Users in Serverless Applications]({{ "/article/user-authentication-serverless-openwhisk" | relative_url }})
- [Setup Instructions](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/README.md)
- [Screenshots](https://github.com/nheidloff/serverless-web-application-ibm-cloud/blob/master/documentation/serverless-web-apps.pdf)