---
id: 854
title: 'The Power of Reusable UI Controls for IBM Connections'
date: '2013-08-28T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/the-power-of-reusable-ui-controls-for-ibm-connections/'
permalink: /article/26.08.2013102027NHEBSU.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/26.08.2013102027NHEBSU.htm/
dsq_thread_id:
    - '4333949786'
categories:
    - Articles
---

 As hopefully most of my readers are aware of, the [IBM Social Business Toolkit SDK](https://www.ibmdw.net/social/) provides easy to use Java and JavaScript APIs to access IBM Connections and IBM SmartCloud for Social Business and it comes with convenience functionality to handle complexity like authentication and deployment to different environments.

 In addition to this the development team has created reusable UI controls that can be embedded in custom apps. For example there is an UI control representing the activity stream from IBM Connections which can be used by adding one div tag to the HTML of custom apps and a handful of lines of JavaScript code. In other words functionality from IBM Connections can be used in custom apps without having to use backend APIs and without having to write your own user interfaces.

 Francis Moloney and David Ryan published a series of short videos describing some of the UI controls:   
 – [Activity Streams](http://www.youtube.com/watch?v=VYOKz7Rkg0E "Activity
Streams")   
 – [Files](http://www.youtube.com/watch?v=ZFf0nwA7CqY "Files")   
 – [vCards for Profiles and Communities](http://www.youtube.com/watch?v=QLwDnVLM0dw "vCards
for Profiles and Communities")   
 – [Communities](http://www.youtube.com/watch?v=3Jaws9iOetk "Communities")   
 – [Profiles](http://www.youtube.com/watch?v=XBnKzWMR0dM "Profiles")

 In most cases developers want to change the look and feel of these controls. In order to do this the Social Business Toolkit provides options to customize the UI controls. There are templates, e.g. the [community row template](https://greenhouse.lotus.com/sbt/SBTPlayground.nsf/JavaScriptSnippets.xsp#snippet=Connections_Controls_Grid_Communities_templates_CustomCommunityRow) which allow modifications of the HTML of the UI controls without having to change any of the business logic code. Furthermore you can modify the behavior of some of the actions provided by the UI controls via ‘custom actions’. For [example](https://greenhouse.lotus.com/sbt/SBTPlayground.nsf/JavaScriptSnippets.xsp#snippet=Connections_Controls_Grid_Communities_CommunityActionGrid) you can run your own JavaScript code when clicking a community in a list of communities. The next two videos describe these customization possibilities.   
 – [Custom Template](http://www.youtube.com/watch?v=xKwhbURQYVk "Custom
Template")   
 – [Custom Actions](http://www.youtube.com/watch?v=4EJj80fpq70 "Custom
Actions")

 Currently there are UI controls available for IBM Connections and IBM SmartCloud for Social Business. Some of the controls work against both environments, e.g. the files and communities grid while other controls, e.g. [profiles](https://greenhouse.lotus.com/sbt/SBTPlayground.nsf/JavaScriptSnippets.xsp#snippet=SmartCloud_Controls_Grid_Profiles_Colleagues) are different controls at this point. David describes this in more detail in this [video](http://www.youtube.com/watch?v=Sa2zqZQ3GDo).