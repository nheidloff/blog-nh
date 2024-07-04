---
id: 345
title: 'My Favorite Domino 8.5.3 XPages Features'
date: '2011-09-29T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/my-favorite-domino-8-5-3-xpages-features/'
permalink: /article/09272011023837AMNHE9T8.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/09272011023837AMNHE9T8.htm/
dsq_thread_id:
    - '4316602228'
categories:
    - Articles
---

 IBM Lotus Domino 8.5.3 is close to be [released](http://edbrill.com/ebrill/edbrill.nsf/dx/notesdomino-8.5.3-launch-dates-set). Since the 8.5.3 beta version (code drop 5) there has been a lot of talk in the community about the new XPages and Designer features: [Erik Brooks](http://www.bleedyellow.com/blogs/erik/entry/8_5_3_app_dev_keeps_moving_forward?lang=en_us), [Julian Buss](http://xpageswiki.com/web/youatnotes/wiki-xpages.nsf/dx/Whats_new_in_Domino_8.5.3), [Julian Buss (2)](http://www.juliusbuss.de/web/youatnotes/blog-jb.nsf/dx/huge-starting-time-improvement-for-xpages-applications-in-the-notes-8.5.3-client.htm?opendocument&comments#anc1), [Declan Lynch](http://www.qtzar.com/blogs/qtzar.nsf/Blog.xsp?entry=mfr6u1708ow0), [Declan Lynch (2)](http://www.qtzar.com/blogs/qtzar.nsf/Blog.xsp?entry=pjvsk9opj2f4), [Declan Lynch (3)](http://www.qtzar.com/blogs/qtzar.nsf/Blog.xsp?entry=y7qrxo3kb1fk), [Serdar Basegmez](http://lotusnotus.com/lotusnotus_en.nsf/dx/new-features-of-xpages-in-8.5.3.htm), [John Jardin](http://jvjardin.wordpress.com/2011/09/12/notesdomino-8-5-3-launch-date-and-xpages-release-notes/).

 Here is my personal list of the best core 8.5.3 XPages features (not OpenNTF features, not XWork Server):

 JavaScript/CSS aggregation   
 The XPages runtime can now dynamically aggregate multiple JavaScript files into one file and multiple CSS files into one file. This results in huge performance improvements, esp. due to the decrease of requests sent from the browser to the server. This feature is particular useful for Dojo since Dojo has been broken down in many modules and since the aggregation happens dynamically no custom Dojo builds need to be created manually.

 Source control enablement   
 Designer comes with a [feature](http://heidloff.net/nh/home.nsf/dx/09152011024951AMNHEA28.htm) to synchronize NSFs with so called on disk Eclipse projects that can then be managed by source control systems like SVN, Rational Team Concert, Gist, etc.

 Deployment of OSGi plugins   
 More and more developers are building extensions using the extensibility API and Java IDEs, for example the OpenNTF Extension Library. The update site template has been [extended](http://www.qtzar.com/blogs/qtzar.nsf/Blog.xsp?entry=mfr6u1708ow0) to easily deploy these plugins to Domino servers.

 Dojo changes   
 Domino 8.5.3 comes now with Dojo 1.6.1. But more importantly there is a new extension point to put newer Dojo versions or custom Dojo code on Domino servers (via OSGi deployment). This allows developers to use for example some of the great new functionality in [Dojo](http://dojotoolkit.org/documentation/).

 OneUI version 2.1   
 Domino 8.5.3 comes with [OneUI version 2.1](http://www.qtzar.com/blogs/qtzar.nsf/Blog.xsp?entry=y7qrxo3kb1fk) which I think looks much better than 2.0. It’s the style that is currently used on Lotus Greenhouse for [Connections](https://greenhouse.lotus.com/homepage/web/homepageRedirectAction.action).

 Sortings of full text search results   
 The ability to sort full text search results is now supported in XPages (and Java and LotusScript). If your view contains dynamically sortable columns and your database is full text indexed, you can automatically sort full text results by clicking the sort icons on the sortable columns in a view control.

 Support for HTML5   
 With Domino 8.5.3 developers can better [control](http://blog.tcl-digitrade.com/blogs/tcl-digitrade-blog.nsf/dx/14.07.2011111755DMACWS.htm) the generated HTML. For example developers can define an extra list of attributes for a tag.

 Since 8.5.3 has not been released yet please note this disclaimer: “This is beta software from IBM and does not represent a commitment, promise or legal obligation by IBM to deliver, in a future release of Notes/Domino or Lotus Notes Traveler, any material, code or functionality described/shown in this presentation.”