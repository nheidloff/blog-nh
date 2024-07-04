---
id: 994
title: 'Managing and authenticating Users for Bluemix Applications'
date: '2014-11-05T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/managing-and-authenticating-users-for-bluemix-applications/'
permalink: /article/05.11.2014082950NHEAT7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/05.11.2014082950NHEAT7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323706098'
categories:
    - Articles
---

 In order to build collaborative applications one of the first things you need are ways to define and identify different users. I’m still learning Bluemix but it looks like there are currently different options available.

**Single Sign On Service**

Bluemix provides a [Single Sign On Service](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html#sso_gettingstarted) to authenticate users against either the IBM identity provider or against Facebook. Once authenticated applications can access the [profile information](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html#user_profile_attributes) of the current users, e.g. name, email, etc.

The IBM identity provider is the one used for bluemix.net and most other IBM sites using the [IBM id](https://www.ibm.com/account/profile/us?page=reg). This mechanism works well for external facing applications which the majority of users can access anonymously and only few people have write access to. The Facebook identity provider is especially useful for consumer oriented applications if Facebook is widely used by the target group of users.

Both alternatives have the advantage that no extra user registry needs to be created and maintained. Check out the [sample](https://hub.jazz.net/project/bluemixsso/SingleSignOnSampleClient/overview) to find out more.

**App User Registry Service**

If you can’t rely on the IBM or Facebook identity provider, Bluemix provides an [App User Registry Service](https://www.ng.bluemix.net/docs/#services/AppUserRegistry/index.html#appuserregistry) (formerly add-on) to define your own users in the cloud. This service can be bound to multiple applications in a Bluemix space.

![image](/assets/img/2014/11/userreg.png)

In order to find out more check out the [sample](https://hub.jazz.net/project/loneghost/bluemix_app_user_registry_samples/overview) or read the [developerWorks article](http://www.ibm.com/developerworks/cloud/library/cl-oauthregistry-app/) which comes with a slightly different sample.

**External Systems like IBM Connections**

Alternatively to the app user registry service in Bluemix external platforms like [IBM Connections Social Cloud](http://www-03.ibm.com/software/products/en/ibm-connections-social-cloud) can be used. Connections provides advanced [user profiles](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Video_Using_Profiles-IBM_Connections_4) including pictures, networks, etc. and even [customizability](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Customizing_IBM_Connections_4.0_Profiles), e.g. to add custom meta data. Read the [documentation](https://www.ibm.com/developerworks/community/help/index.jsp?topic=%2Fcom.ibm.lotus.connections.profiles.help%2Fc_pers_profiles.html) to find out more about this functionality.

![image](/assets/img/2014/11/Figure01.png)

In order to access this information from applications [REST APIs](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpAPIViewer.xsp?lookupName=API+Reference#action=openDocument&res_title=Profiles_API_ic50&content=apicontent) are provided. Check out this simple [sample](http://heidloff.net/nh/home.nsf/article.xsp?id=03.11.2014083912NHEAZ3.htm).

Connections supports different types of authentication – OAuth, basic, form and [SAML](http://vanstaub.me/887). The big advantage of SAML in Connections compared to the app user registry is that applications in the cloud can leverage existing profile information. So as my colleague Van Staub writes “In short, the partner’s application is saying, ‘This user is tamado@demos.ibm.com … Trust me.’ ”