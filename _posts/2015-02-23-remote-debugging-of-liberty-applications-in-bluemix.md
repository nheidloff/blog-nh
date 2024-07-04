---
id: 1018
title: 'Remote Debugging of Liberty Applications in Bluemix'
date: '2015-02-23T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/remote-debugging-of-liberty-applications-in-bluemix/'
permalink: /article/22.12.2014105136NHEDKU.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
custom_permalink:
    - article/22.12.2014105136NHEDKU.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4325323200'
categories:
    - Articles
---

 As a developer I want to develop and debug my Java applications locally. Primarily because that is the easiest and fastest way to write and test code. In some cases however that’s not possible, for example when using services like the data cache service which doesn’t work locally. Sometimes there are also differences between the local and the cloud environment and issues might not be reproducible locally.

 Fortunately Bluemix recently added the capability to debug Liberty applications remotely. Read the [documentation](https://www.ng.bluemix.net/docs/#manageapps/eclipsetools/eclipsetools.html#remotedebug) for details. As always with remote debugging this is not particularly fast, but again, sometimes your only option.

![image](/assets/img/2015/02/debugtest.png)