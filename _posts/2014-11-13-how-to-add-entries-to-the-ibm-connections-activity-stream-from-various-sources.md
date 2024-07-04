---
id: 995
title: 'How to add Entries to the IBM Connections Activity Stream from various Sources'
date: '2014-11-13T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/how-to-add-entries-to-the-ibm-connections-activity-stream-from-various-sources/'
permalink: /article/13.11.2014092512NHEBVT.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/13.11.2014092512NHEBVT.htm/
dsq_thread_id:
    - '4323719508'
categories:
    - Articles
---

At DNUG I attended the session [Activity Stream – how to feed the beast!](http://dnug.de/dnug/dnugcms.nsf/id/E8979AD0D1EE002DC1257D4E0051C418?Open&dl=DE) from [Andreas Artner](https://twitter.com/AnderlArtner). He presented how to use [IBM Tivoli Directory Integrator](http://www.ibm.com/developerworks/downloads/tiv/tdi/) (TDI) to read updates from various sources, e.g. Notes or SQL databases, and how to put them into Connections. TDI can be run on a scheduled basis or be triggered via events. Via this mechanism you can add notifications from existing applications to Connections without changing the applications.

Andreas has open sourced the connector to add entries into Connections on [OpenNTF](http://openntf.org/main.nsf/project.xsp?r=project/TDI%20Connectors%20for%20IBM%20Connections/summary). The connector uses the Java APIs of the [Social Business Toolkit SDK](http://ibmsbt.openntf.org).

<iframe allowfullscreen="" frameborder="0" height="479" mozallowfullscreen="" src="//player.vimeo.com/video/104435751" webkitallowfullscreen="" width="853"></iframe>