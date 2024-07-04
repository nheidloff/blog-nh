---
id: 304
title: 'Best Practices: How to write Custom Controls for XPages'
date: '2011-07-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/best-practices-how-to-write-custom-controls-for-xpages/'
permalink: /article/07202011021359AMNHE9BT.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316583964'
custom_permalink:
    - article/07202011021359AMNHE9BT.htm/
categories:
    - Articles
---

 I hope you’ve all heard about the [XPages Development Contest](http://contest.openntf.org/) by now. Since I’ve reviewed the submitted controls and since I’ve done a couple of controls myself lately I wanted to share some best practices that I’ve seen. Some things are pretty obvious, other things are not. Here are some tips how to make custom controls reusable and consumable.

 Document how to use the control in custom NSFs   
 Some custom controls contain all functionality in the one control. More typically however they require other design elements like views, stylesheets, etc. Or they even require to download and import other open source projects. I think the best place for this documentation is in the control itself in the control’s design definition. Here you can enter HTML representing the control in the design tab. Since I don’t really use this tab I think it would be great if Designer could show this also in the source tab, e.g. when moving over the control. Patrick Kwinten uses this technique in his [movie player control](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=XPages%20JWPlayer%20Control).

![image](/assets/img/2013/12/CustomControls3.gif)

 Use custom properties correctly   
 Custom properties can be more than strings. Here are a couple of recommendations. Use intuitive names and define descriptions since they show up in the XPages UI. Also don’t only use strings but also other types like boolean. Special editors make it easier to enter valid values. Require only as little properties as possible and use optional properties with good defaults. Also make usage of multi value properties where it makes sense.

 Document the custom properties   
 As mentioned use good names and descriptions since they show up when embedding the controls in XPages. Here is a sample from Serdar Basegmez’ [involve control](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=xInvolve%20Custom%20Control).

![image](/assets/img/2013/12/CustomControls1.gif)

![image](/assets/img/2013/12/CustomControls2.gif)

 Ferry Kranenburg describes in his [blog](http://www.bleedyellow.com/blogs/ferrykranenburg/entry/tip_a_quicker_way_to_document_your_xpage_custom_controls?lang=en_us) how to generate Excel documentation easily.

 In some cases your controls might have a lot of properties that you might want to categorize. Mark Hughes uses a certain technique in his [view picklist control](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=View%20Picklist%20Custom%20Control). He categorizes the properties by assigning them categories in the xxx.xsp-config XML file that you can open from the Java perspective.

![image](/assets/img/2013/12/CustomControls4.gif)

 Separate the control from the data   
 In most cases it makes sense to separate the data source from the control. For example don’t create properties for database, server and view name. Instead allow the XPage to pass in an existing datasource. Mark’s control from above shows how to use the data source picker. Matt White also describes this in his [XPages101 video](http://xpages.info/XPagesHome.nsf/Videos.xsp#Custom%20Properties). This technique even allows using a different type of data source (e.g. relation db query instead of a Domino view).

 Also often views or forms are required by controls. In these cases document how these views and forms should be designed (e.g. which columns the view needs) so that custom views can be used.

 Don’t hardcode styles in your controls   
 Don’t put style definitions directly in your controls. This makes it unnecessary difficult to overwrite the styles from the XPages. For example when you define a style in a control and the same one in the XPage the one from the control is used (always I think). So instead source the styles out in css files that you include.

 Provide simple test XPages   
 I always recommend to also provide XPages showing how to use the controls which can be used at unit tests at the same time.

 Many controls require some sample data. Since many people don’t want or may put real people names, addresses etc. in the NSFs they share you can use a dummy data generator. The Extension Library comes with such a tool which generates lorem ipsum text, people and state names. Check out the Admin\_Home.xsp.