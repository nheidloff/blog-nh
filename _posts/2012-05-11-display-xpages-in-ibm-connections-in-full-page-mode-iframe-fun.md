---
id: 476
title: 'Display XPages in IBM Connections in Full Page Mode: iFrame Fun'
date: '2012-05-11T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/display-xpages-in-ibm-connections-in-full-page-mode-iframe-fun/'
permalink: /article/10.05.2012081150NHE9AG.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
accesspresslite_sidebar_layout:
    - right-sidebar
enclosure:
    - "http://heidloff.net/nh/home.nsf/dx/ResizeXPageIWidget.mov/$file/ResizeXPageIWidget.mov\r\n1884993\r\nvideo/quicktime\r\n"
custom_permalink:
    - article/10.05.2012081150NHE9AG.htm/
dsq_thread_id:
    - '4318887725'
categories:
    - Articles
---

 Yesterday I [described](http://heidloff.net/nh/home.nsf/dx/09.05.2012091955NHEALZ.htm) how to bring up XPages in IBM Connections in fullpage mode. However this solved only half of the problem. Since XPages are embedded in iFrames there is some more work necessary so that the iFrames are resized when the sizes of the browser windows change.

 Watch this [short video](http://heidloff.net/nh/home.nsf/dx/ResizeXPageIWidget.mov/$file/ResizeXPageIWidget.mov) to see what I’d like to achieve from a user experience perspective.

 Essentially the iFrame with the XPage should always take up the maximal real estate. The width of the iFrame should be set to 100% in the widget.xml. However when the height of the iFrame is set to 100% it doesn’t work. One reason is that XPages can change their heights, for example when the browser window width is changed. Another reason is a timing issue. In order to show the XPage an HTTP post is done which takes a moment. When the parent sets the iFrame height initially it doesn’t know the initial height of the XPage.

 In order to solve this I used the HTML5 window.postMessage functionality which allows communication from the embedded iFrame to the parent even if the two pages are not located on the same domain. I’ve submitted the snippets to [XSnippets](http://openntf.org/XSnippets.nsf/snippet.xsp?id=display-xpages-as-iwidgets-in-fullpage-mode-in-connections). I’d like to add some more samples and add everything then to the [XPages for Connections](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=xpages%20for%20connections) project.