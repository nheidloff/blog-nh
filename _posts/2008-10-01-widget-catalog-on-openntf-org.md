---
id: 57
title: 'Widget catalog on OpenNTF.Org'
date: '2008-10-01T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://s600643527.online.de/article/widget-catalog-on-openntf-org/'
permalink: /article/30.09.2008110213NHEKMY.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/30.09.2008110213NHEKMY.htm/
dsq_thread_id:
    - '4317545243'
categories:
    - Articles
---

In Lotus Notes/Domino 8.0.1 a new catalog was introduced to manage widgets. This catalog is a Notes database based on toolbox.ntf. This catalog has been extended since then and can now also be used for Expeditor clients and it can be used for more than widgets. You can also use it to install regular Eclipse plugins to your Notes client which are not widgets. See here for [more information](http://www-01.ibm.com/support/docview.wss?rs=463&context=SSKTMJ&context=SSKTWP&dc=DB600&uid=swg21305829&loc=en_US&cs=UTF-8&lang=en). In Notes/Domino 8.5 we will call this catalog ‘add on catalog’ to my knowledge.

The catalog can be used by administrators to push components to the clients. Via Domino policies (desktop settings) administrators can define what categories of components to push to which users. Furthermore the catalog can be used to restrict extension point IDs for installations, etc.

In this blog entry however I want to focus on how end users/power users can use this catalog. There is a [public catalog](http://www.openntf.org/internal/home.nsf/web/mywidgets.html) on OpenNTF.Org.

![image](/assets/img/2008/10/1_070851D00708429C00268DE1852574D5.gif)

You can open this catalog either via a web browser or as normal Notes database from your Notes client (8.0.1 and above). Users can browse this catalog to find a component and then they can install it via dragging and dropping the component definition (extension.xml) onto the My Widgets sidebar panel. This works for widgets and also for normal plugins. When you drop normal plugins the provisioning kicks in which downloads and installs the Eclipse feature and plugins.

Here is a [quick demonstration](http://heidloff.net/nh/home.nsf/openntfwidgetcatalog.htm/$file/openntfwidgetcatalog.htm "openntfwidgetcatalog.htm") how this works. I hope the performance is good enough on my new blog server.

I would like to see more people to use the OpenNTF.Org catalog. I think it is a great way to share components very easily within our community.