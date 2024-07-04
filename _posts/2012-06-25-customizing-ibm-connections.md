---
id: 515
title: 'Customizing IBM Connections'
date: '2012-06-25T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/customizing-ibm-connections/'
permalink: /article/19.06.2012124858NHEEPN.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/19.06.2012124858NHEEPN.htm/
dsq_thread_id:
    - '4318906943'
categories:
    - Articles
---

 IBM Connections allows customization of the user interface, for example the login page, themes, new tabs, headers, etc. which is important for example to apply a corporate look and feel.

 There is already quite a number of good resources out there that explain this functionality in great detail and I’m not going to repeat all of this. Instead I just want to give you some pointers and write about some things that I discovered when doing my first customization.

 The [redbook](http://www-10.lotus.com/ldd/lcwiki.nsf/xsp/.ibmmodres/domino/OpenAttachment/ldd/lcwiki.nsf/88AC7943E4C131F185257980005689A2/attach/IBM%20Redbooks%20Connections%20301%20Wiki%20(010912)%20.pdf) is probably the most detailed documentation about customization. There is also [product documentation](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Customizing_ic301) and an older [developerWorks article](http://www.ibm.com/developerworks/lotus/documentation/lc3customize/) that might still contain some useful information.

 Additionally [Sharon Bellamy](http://socialshazza.com/) has created a great deck giving a (quick) overview of customization:

<div id="__ss_12956501" style="width:595px"> **[Connections customization lite](http://www.slideshare.net/dilftechnical/connections-customization-lite "Connections customization lite")** <iframe allowfullscreen="" frameborder="0" height="497" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/12956501?rel=0" style="border:1px solid #CCC;border-width:1px 1px 0" width="595"></iframe> </div> Sharon also provides some [sample files](http://dilf.me.uk/socialshazza/2012/05/customizing-connections-demo-files/) used in the deck above.

 I played around with customization recently. After you understand things like the customization directory, debug variable, application file structure, etc. it seems pretty straight forward. Below are just some minor findings which might be useful for other people.

 – Clear your browser cache every time you change something. A browser refresh often doesn’t work or only too late. This might be obvious but for me as an XPages developer I didn’t discover this when defining styles in my XPages directly (and not via css).

 – Understand the directory and applications structure. I took me some time to understand that I had to do my css changes for example for the header in multiple files redundantly, once per application.

 – As Sharon also wrote (slide 14) customization should be done in the custom.css file so that it doesn’t get overwritten when updating IBM Connections. For my simple sample however where I only changed the logo and positioning in the header I had to change defaultTheme.css since for some reason the defaultTheme.css was loaded after the custom.css and not even an !important could change this.