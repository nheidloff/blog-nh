---
id: 33
title: 'Composite application components in add on catalog'
date: '2008-10-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://s600643527.online.de/article/composite-application-components-in-add-on-catalog/'
permalink: /article/composite-application-components-in-add-on-catalog/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/composite-application-components-in-add-on-catalog.html'
custom_permalink:
    - article/composite-application-components-in-add-on-catalog/
dsq_thread_id:
    - '4317545718'
categories:
    - Articles
---

I wrote yesterday about the [add on catalog](http://heidloff.net/nh/home.nsf/30.09.2008110213NHEKMY.htm "30.09.2008110213NHEKMY.htm"). As described this catalog works for widgets and for plugins extending the Notes client (e.g. sidebar components, menu contributions). What some people don’t know is that you can also put composite application components in it.

Composite application components are also plugins, but a certain type of plugins. They are Eclipse ViewParts. And more importantly they should not only show up in the My Widgets sidebar panel, but also on the Composite Application Editor (CAE) palette. In order to do this you need to use an extension point from CAE as described below.

In this screenshot I have a ‘Browser Comp App Sample’ and a component from the OpenNTF.Org component library ‘Notes URL Processor’ in my catalog. As all other components from the catalog you can drag and drop them onto the My Widgets sidebar panel. For the ‘Browser Comp App Sample’ there is a weird user experience though. The component is installed but the end user doesn’t get any feedback. No icon shows up after the installation. For the second sample I’ve added an icon.

![image](/assets/img/2008/10/1_07DF0B2807DF00C40024E16D852574D6.gif)

When you open the CAE after the installation you’ll now see the ‘Notes URL Processor’ component and the ‘Lotus.com’ component on the CAE palette. Unfortunately all components show up on the ‘Component Library’ palette. You cannot choose your own palette, but you can copy and paste them to your palette of choice.

![image](/assets/img/2008/10/1_07DF103C07DF00C40024E16D852574D6.gif)

Here is a mini sample of the ‘Lotus.com’ web component that will also show up on the CAE palette:

[browsersample\_extension.xml](http://heidloff.net/nh/home.nsf/browsersample_extension.xml/$file/browsersample_extension.xml "browsersample_extension.xml")

In most scenarios you probably also need to provision some Eclipse code for your component. Here is a sample for how you can do this:

[compsample\_extension.xml](http://heidloff.net/nh/home.nsf/compsample_extension.xml/$file/compsample_extension.xml "compsample_extension.xml")

This brings up the question why the [component library](http://heidloff.net/nh/home.nsf/component-library-v2-released-on-openntf.org "component-library-v2-released-on-openntf.org") doesn’t also use the add on catalog. I think it should. I’ve started some discussions around this internally but for the version 2 of the component library we were running out of time.