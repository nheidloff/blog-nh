---
id: 1892
title: 'Authentication in LoopBack Applications against Bluemix'
date: '2016-02-22T08:29:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1892'
permalink: /article/authentication-loopback-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4600438534'
custom_permalink:
    - article/authentication-loopback-bluemix/
categories:
    - Articles
---

The Node.js API framework [LoopBack](http://loopback.io/) supports third-party logins to authenticate users and to link accounts. This article describes how to authenticate from LoopBack applications against the [Single Sign On](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html) service in [Bluemix](https://bluemix.net) so that you can leverage existing enterprise directories.

[Get the code from GitHub.](https://github.com/IBM-Bluemix/collaboration)

The Single Sign On service supports different identity providers. For example enterprise customers typically use SAML. If customers don’t have an SAML identity provider, they can install an [Identity Bridge](https://www.ng.bluemix.net/docs/services/SingleSignOn/idbr_info.html#idbr_overview) on premises which externalizes the SAML protocol to an LDAP version 3 compliant directory. In the sample below I use a cloud directory with some test users, but the application code would be identical when using SAML.

LoopBack leverages [passport](http://passportjs.org/) to support [third party logins](https://docs.strongloop.com/pages/releaseview.action?pageId=3836277) via the [loopback-component-passport](https://github.com/strongloop/loopback-component-passport) module. The [sample](https://github.com/strongloop/loopback-example-passport) on GitHub shows how to authenticate against Facebook, Google and Twitter.

In order to authenticate against the Single Sign On service you need to use the [passport-idaas-openidconnect](https://www.npmjs.com/package/passport-idaas-openidconnect) module. The tricky part is to do the right configuration since the documentation is a little light. Here is the key part in the [code](https://github.com/IBM-Bluemix/collaboration/blob/master/server/server/bluemix.js#L107). In order to read the credentials from the Bluemix context, the provider is not defined in a static property file but programmatically.

```
var options = {
  "provider": "ibm",
  "module": "passport-idaas-openidconnect",
  "strategy": "IDaaSOIDCStrategy",
  "clientID": ssoConfig.credentials.clientId,
  "clientSecret": ssoConfig.credentials.secret,
  "authorizationURL": ssoConfig.credentials.authorizationEndpointUrl,
  "tokenURL": ssoConfig.credentials.tokenEndpointUrl,
  "scope": "openid",
  "response_type": "code",
  "callbackURL": "/auth/ibm/callback",
  "skipUserProfile": true,
  "issuer": ssoConfig.credentials.issuerIdentifier,
  "authScheme": "openid connect",
  "authPath": "/auth/ibm",
  "session": true,
  "failureFlash": true
};
passportConfigurator.configureProvider("ibm", options);
```

After this you can log in as a user defined in the cloud directory. Check out the [screenshots](https://github.com/IBM-Bluemix/collaboration/tree/master/screenshots) folder for more details.

![image](/assets/img/2016/02/login-2.png)

![image](/assets/img/2016/02/login-3.jpg)