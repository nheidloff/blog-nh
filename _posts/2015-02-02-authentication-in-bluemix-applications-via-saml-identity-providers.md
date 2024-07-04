---
id: 1093
title: 'Authentication in Bluemix Applications via SAML Identity Providers'
date: '2015-02-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/authentication-in-bluemix-applications-via-saml-identity-providers/'
permalink: /article/02.02.2015111934NHEE5A.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/02.02.2015111934NHEE5A.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4329007154'
categories:
    - Articles
---

 At the beginning of this year the [Single Sign On](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html#sso_gettingstarted) service in Bluemix was extended to support [SAML as identity provider](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index-gentopic1.html#task_saml_is). This allows to leverage existing existing organization directories for authentication of users in the cloud.

 As described in the [documentation](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index-gentopic4.html#saml_information) “Security Assertion Markup Language (SAML) is an XML standard for exchanging single sign-on information between an identity provider who asserts the user identity and a service provider who consumes the user identity information. The SAML Enterprise Identity Source acts as a service provider. It allows an application to contact a separate identity provider to authenticate users and consume the returned user identity information.”

![image](/assets/img/2015/02/bluemixsaml.png)

 Last week IBM previewed a new [XPages runtime on Bluemix](http://heidloff.net/nh/home.nsf/article.xsp?id=26.01.2015175730NHEMVZ.htm) to host applications based on IBM Domino in the cloud. In this context developers asked how to authenticate users against existing IBM Domino (LDAP) on premises directories. I had planned to try out a solution that should work but haven’t had the time to do so. Since I won’t have time to work on this anytime soon, I want to at least give some hints how this should work. But again, I haven’t tried it myself yet.

 Since [version 9](http://www-12.lotus.com/ldd/doc/domino_notes/9.0/help9_admin.nsf/b3266a3c17f9bb7085256b870069c0a9/d36ed17054cee78b85257b19005b4df6?OpenDocument) Domino can be used as service provider and can defer to identity providers for authentication. As identity providers you can use [IBM Tivoli Federated Identity Manager (TFIM) and Microsoft Active Directory Federated Services (ADFS)](http://www-12.lotus.com/ldd/doc/domino_notes/9.0/help9_admin.nsf/f4b82fbb75e942a6852566ac0037f284/64fe6b63c6acfa1185257b19005b4dfe?OpenDocument). As far as I understand it should be possible to use these providers in the SAML configuration for Bluemix above.

 The Bluemix documentation also mentions an [identity bridge](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index-gentopic4.html#identity_bridge) component which can help to leverage LDAP enterprise directories: “The identity bridge extends the IBM Bluemix Single Sign On service to your enterprise by externalizing the SAML protocol as a method of authenticating users to an LDAP version 3 compliant directory in your enterprise. … The identity bridge is a separate component that is provided by the Bluemix Single Sign On service, for download to an on-premises environment. … The component can then be deployed to the appropriate on-premises location.”