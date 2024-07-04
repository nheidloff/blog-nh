---
id: 378
title: 'Setup Instructions for Social Enabler and the Social Business Toolkit'
date: '2011-12-19T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/setup-instructions-for-social-enabler-and-the-social-business-toolkit/'
permalink: /article/12152011034545AMNHECAP.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
custom_permalink:
    - article/12152011034545AMNHECAP.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4317558956'
categories:
    - Articles
---

 As requested from several people here are some instructions for how to set up the [Social Enabler](http://extlib.openntf.org/). I wrote earlier a 50 pages [documentation](http://www.openntf.org/Projects/pmt.nsf/DA2F4D351A9F15B28625792D002D1F18/%24file/SocialEnabler111006.pdf). However I’ve heard some people consider it too long and it doesn’t tell readers easily how to get started. So let me try it again.

 You need to put XPagesSBT.nsf and WebSecurityStore.nsf into your Domino data directory and sign them as always. Some samples like the Connections samples that work against the Connections instance deployed on the Lotus Greenhouse work directly. Most of the other samples however don’t because some configuration needs to be done first. For all samples that use OAuth (SBT, Dropbox, LotusLive, Twitter) application keys need to be obtained and then put in the security store. Here is how to do this for the Social Business Toolkit.

 You need to register a new application on [Greenhouse](https://greenhouse.lotus.com/vulcan/security/provider/register.jsp?serviceProvider=vulcanToolkit).

![image](/assets/img/2011/12/SBTConfig2.gif)

 Then you need to find out the URLs of the REST services endpoints. For the SBT this can be found in the [Wiki](http://www-10.lotus.com/ldd/appdevwiki.nsf/dx/Using_OAuth_to_integrate_with_the_IBM_Social_Business_Toolkit_sbt).

 Next you need to open KeysApplications.xsp, create a new application key document and define the keys of the application and the URLs.

![image](/assets/img/2011/12/SBTConfig1.gif)

 Here is the data as text so that you can copy and paste.   
 XPagesSBT   
 Greenhouse   
 https://greenhouse.lotus.com:443/vulcan/security/provider/requestToken   
 https://greenhouse.lotus.com:443/vulcan/security/provider/authorize   
 https://greenhouse.lotus.com:443/vulcan/security/provider/accessToken

 For the SBT the secret key is only one string without spaces (little bit confusing from the UI – see above).

 In order to test the SBT I use the [embedded experience](https://greenhouse.lotus.com/activitystream/) and the [API test application](https://greenhouse.lotus.com/vulcan/shindig/client/testAPI.jsp).

 Additionally there are a couple of security related settings which are important to understand. First of all you need to assign access to the document with the application keys to the ID with which you signed the two NSFs. In the screenshot above I’ve entered both OpenNTF servers and my own user ID. When you use the web UI to do this these names are added to the document in an authors field and a readers field.

 In the last step you need to configure the ACL of the security store. Anonymous must not have access to this database. All users who you want to be able to use the Social Enabler OAuth functionality need to have author access. This is so that their user keys can be stored in this database so that they only have to do the OAuth dance once.