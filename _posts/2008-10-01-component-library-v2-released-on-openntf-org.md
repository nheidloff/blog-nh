---
id: 56
title: 'Component library v2 released on OpenNTF.Org'
date: '2008-10-01T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://s600643527.online.de/article/component-library-v2-released-on-openntf-org/'
permalink: /article/component-library-v2-released-on-openntf.org/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/component-library-v2-released-on-openntf.org/
dsq_thread_id:
    - '4316355053'
categories:
    - Articles
---

Jo Grant and team just released the [second version of the composite applications components library](http://www.openntf.org/Projects/pmt.nsf/ProjectLookup/Composite%20Application%20Component%20Library) on OpenNTF.Org. It contains more than 40 reusable components that you can use to assemble composite applications for Lotus Notes and Expeditor. This [document](http://www.openntf.org/Projects/pmt.nsf/852fcfa76eb36baa85256bae00100855/8f8d129143c4df28862574cf0055111c!OpenDocument) contains a summary of the components.

There are a bunch of new components and some newer versions of the components from the library version 1. For each component there is now also a mini unit test to show how these components are supposed to work.

Just as one sample of a re-usable component check out [this video](http://de.youtube.com/watch?v=rW1EFv3kp1s) that Jo posted on YouTube.com. It demonstrates a web clipper component that can be used to clip existing web pages via regular expressions.

This is how the[ web page looks originally](http://profiles.yahoo.com/vote4joe). The screenshot shows in the upper left rectangle a part of the web page running in a composite application:

![image](/assets/img/2008/09/1_08DCA39408DCA1540049E2D6852574D4.gif)

You can not only clip UI with the web clipper component but also clip data via regular expressions and forward them via properties to other components. In the sample below you can see the two sample fields in the unit test component in the upper right corner with data from the original web page.