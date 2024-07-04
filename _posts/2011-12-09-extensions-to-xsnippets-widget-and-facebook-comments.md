---
id: 395
title: 'Extensions to XSnippets: Widget and Facebook Comments'
date: '2011-12-09T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/extensions-to-xsnippets-widget-and-facebook-comments/'
permalink: /article/12072011025118AMNHEB8M.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/12072011025118AMNHEB8M.htm/
dsq_thread_id:
    - '4316627523'
categories:
    - Articles
---

 I’ve implemented some extensions to [XSnippets](http://openntf.org/xsnippets). The first one is a widget that can be embedded in blogs and other web sites. It displays most recent snippets or most popular snippets. It can also be configured to show all snippets from a specific author. Additionally the widget can be customized via styles.

 In order to work cross domain without an iFrame it uses [dojo.io.script.get](http://dojotoolkit.org/reference-guide/dojo/io/script.html) and [JSONP](http://en.wikipedia.org/wiki/JSONP). This JSONP API can even be used to build your own widget. In the backend an XAgent is used that invokes a managed bean to read the data and return the JSONP. We plan to open source the implementation sometime next week.

 Here is how to use the widget:

<iframe frameborder="0" height="650" scrolling="no" src="http://openntf.org/XSnippets.nsf/widget.xsp?id=xsnippets-widget" width="630"></iframe>

 You can see the widget in action on [openntf.org/xsnippets](http://openntf.org/XSnippets.nsf/follow.xsp)

 The second addition are Facebook comments. Take a look at this [example](http://openntf.org/XSnippets.nsf/snippet.xsp?id=get-ckeditor-richtextitem-object-in-csjs).

 We also want to have comments that are directly stored in XSnippets since not everyone uses Facebook, but for now it was an easy addition. I’ve only dragged and dropped the Facebook control from the Designer palette onto the XPage which is part of the Extension Library’s Social Enabler plugin.