---
id: 557
title: 'Generic HTML iWidget for IBM Connections'
date: '2012-10-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/generic-html-iwidget-for-ibm-connections/'
permalink: /article/01.10.2012083640NHE9RZ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4318931344'
custom_permalink:
    - article/01.10.2012083640NHE9RZ.htm/
categories:
    - Articles
---

**Update 02/22/16**: Please note that this is not a feature of IBM Connections, but only a sample available as open source.

Recently I worked on a new community site based on IBM Connections. Unfortunately the Connections instance was not 4.0 and hosted by another organization. I couldn’t add XPages iWidgets or deploy any other community specific iWidgets.

However I had some requirements to extend the community with further functionality that Connections didn’t support out of the box. In order to do this I implemented a generic HTML iWidget that allows community moderators to use HTML and JavaScript code. While the HTML iWidget itself is generic, the specific instances are community specific and only show up in the communities to which moderators have added them.

Check out this short video.

{% include embed/youtube.html id='-vv2ds8XByI' %}

I hope I can open source this widget soon on OpenNTF.

If you want to use the widget you need to understand the security implications. Moderators can now add active content to communities where embedded JavaScript code can access the overall site. So the widget can only be used if moderators understand this and you can trust the moderators. This is certainly not the case in all deployments where everyone can create new communities, but maybe in some more restrictive deployments.

I’d also like to extend the widget. Right now moderators need to click the ‘edit’ link in the view mode. Instead I’d like to use the iWidgets edit menu entry in the popup menu on the overview page.