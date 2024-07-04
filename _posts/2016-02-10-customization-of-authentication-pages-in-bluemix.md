---
id: 1851
title: 'Customization of Authentication Pages in Bluemix'
date: '2016-02-10T08:08:36+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1851'
permalink: /article/customization-authentication-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/customization-authentication-bluemix/
dsq_thread_id:
    - '4566757191'
categories:
    - Articles
---

With the [Single Sign On](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html) service on [Bluemix](https://bluemix.net) users can be authenticated against various directories, for example via SAML. A default set of pages is provided so that users can log on or change their passwords with an out of the box user interface. The pages can also be customized for your own branding and design.

The default pages can be downloaded from the Single Sign On dashboard as one zip file. The zip file contains primarily HTML files and additionally some JavaScript, CSS and XML files which can be modified. To display data from the service, e.g. error messages, and to invoke actions macros are provided. After you’ve done your changes, the zipped files can be uploaded again. Read the [documentation](https://www.ng.bluemix.net/docs/services/SingleSignOn/customizing_pages.html) for details.

This is a screenshot of the dashboard to download and upload files.

![image](/assets/img/2016/02/login-customization.png)

Here is a simple sample of a modified authentication page with a new title.

![image](/assets/img/2016/02/login-3.png)