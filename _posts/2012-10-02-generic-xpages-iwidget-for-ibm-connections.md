---
id: 698
title: 'Generic XPages iWidget for IBM Connections'
date: '2012-10-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/generic-xpages-iwidget-for-ibm-connections/'
permalink: /article/02.10.2012084629NHE9Y5.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/02.10.2012084629NHE9Y5.htm/
dsq_thread_id:
    - '4318982076'
categories:
    - Articles
---

Yesterday I blogged about a generic [HTML iWidget](http://heidloff.net/home.nsf/dx/01.10.2012083640NHE9RZ.htm). The main purpose of this widget is to allow community moderators to extend communities without having to deploy new iWidgets for every extension. Having to deploy new widgets is not easy in some IBM Connections deployments since the community moderators are typically not the administrators with rights to run wsadmin commands and such.

For that same reason I built another generic widget – an XPages iWidget.

XPages has supported iWidgets for quite some time. iWidgets can easily be defined in Domino Designer via the Component design element. The (URLs of the) XPages iWidgets can be deployed to Connections like any other iWidgets.

With the new generic XPages iWidget only the generic widget has to be deployed once. After this community moderators can simply add one or multiple instances of this widget to their communities and enter the URLs of the XPages.

Watch this video to see the widget in action.

{% include embed/youtube.html id='Lnc5qhO04q0' %}

Later I’d like to extend the widget. As for the HTML widget I want to be able to switch into edit mode from the menu rather than a link in the view mode. I’m also not happy with the automatic resizing of the iframes in which the XPages are run. Right now developers need to do some configuration in the widgets’ edit modes and they need to use a custom control in the XPages. I hope this can be avoided but so far I haven’t found a good solution (cross domain iframe communication and different browsers challenges).

I want to open source the widget soon on OpenNTF and also deploy it to the image that developers can use for the [OpenNTF development contest](http://contest.openntf.org).