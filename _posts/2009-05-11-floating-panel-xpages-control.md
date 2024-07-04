---
id: 196
title: 'Floating Panel XPages Control'
date: '2009-05-11T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/floating-panel-xpages-control/'
permalink: /article/floating-panel-xpages-control/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/floating-panel-xpages-control/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4317551556'
categories:
    - Articles
---

 There is a new simple XPages control on OpenNTF – [floating panel](http://tinyurl.com/r7qtu9). Essentially this control is just a wrapper for the dojo.dnd.Moveable class which can now be easily used in XPages. You can run it live [here](http://openntf.org/demos/floatingpanel.nsf/FloatingPanelTest.xsp).

![image](/assets/img/2009/05/1_08BDF87008BDF08C003672BA852575B3.gif)  
 **Custom control: ccFloatingPanel**

 In order to use the floating panel in your app, add this custom control to your XPage.

 The content to display within the panel can be defined in two ways:

 1. Property of custom control *Property name* *Type* *Default* *Description* *Sample value* text string “” Text to display in floating panel “Drag this panel and move it around.”

 Sample:   
 &lt;xc:ccFloatingPanel text=*“Drag this panel and move it around.”*&gt;   
xc:ccFloatingPanel&gt;

 2. Via editable area

 In your XPage in which you have dropped the custom control you can now drop other controls from the palette by dropping them within the editable area of the floating panel control.

 Sample:   
 &lt;xc:ccFloatingPanel text=*“Drag this panel and move it around.”*&gt;   
 &lt;xp:this.facets&gt;   
 &lt;xp:panel xp:key=*“editableAreaFloatingPanel”*&gt;   
 &lt;br&gt;br&gt;   
 &lt;xp:label value=*“Here you can add controls “* id=*“label1”*&gt;xp:label&gt;   
 &lt;xp:label value=*“via an editable area or via “* id=*“label2”*&gt;xp:label&gt;   
 &lt;xp:label value=*“a property of the control.”* id=*“label3”*&gt;xp:label&gt;   
 xp:panel&gt;   
 xp:this.facets&gt;   
xc:ccFloatingPanel&gt;