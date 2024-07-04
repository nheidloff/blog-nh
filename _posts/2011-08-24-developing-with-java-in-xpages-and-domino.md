---
id: 338
title: 'Developing with Java in XPages and Domino'
date: '2011-08-24T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/developing-with-java-in-xpages-and-domino/'
permalink: /article/08172011032738AMNHEART.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/08172011032738AMNHEART.htm/
dsq_thread_id:
    - '4317557060'
categories:
    - Articles
---

 Since I get asked this regularly here is a quick overview of the different ways to use Java in XPages and in the classic Domino app dev model.

 There are different types of XPages developers. Stephan Wissel talks about [three developer types](http://www.wissel.net/blog/d6plinks/SHWL-8HHABV), Chris Toohey about [four stages](http://www.dominoguru.com/pages/xpages_roadmap_06202011.html). Here is my take on what different types of XPages developers there are (not counting IBM XPages product developers and non XPages developers):

 1. Developers who quickly assemble applications using Designer

 Used techniques: Drag &amp; drop in Designer, nice and simple Designer UIs, simple actions, maybe some client side JavaScript and server side JavaScript (SSJS)

 Most XPages developers start in this category to get started with XPages. For some developers these techniques are sufficient when implementing simple form and/or workflow based applications.

 2. The ‘usual’ XPages developers building sophisticated business applications using Designer

 Used techniques: Source tabs of XPages, custom controls, script libraries, client side JavaScript and Dojo, SSJS **and … Java**

 I’ve included Java in this category because I see more and more people using Java in XPages and there are clearly advantages of Java. While Java used to be scary for some Domino developers some time ago I’ve seen a shift happening. As discussed in Henning Schmidt’s [blog](http://www.schmhen.de/2011/05/11/how-do-you-code-in-xpages/) I think Java is simpler and better than SSJS for various reasons:

 – You can reuse existing open source Java projects in XPages applications. This [document](http://www.openntf.org/Projects/pmt.nsf/41569C6089FDDFD3862577FF003B9E9B/%24file/ReadMe.pdf) (page 5ff) describes how to import some jar files into an NSF.

 – You can [debug the Java code](http://www.youtube.com/watch?v=1xczmvd1bs0&feature=player_embedded).

 – You can write managed beans. Karsten Lehmann has some good samples in this [blogs](http://blog.mindoo.com/web/blog.nsf/dx/18.03.2011104725KLEDH8.htm).

 – Java is a sophisticated language and there is a lot of documentation about core Java classes and JSF available in the internet.

 Since 8.5.3 there is a Java design element. However to change config-faces.xml and in order to debug you need to use the Java perspective.

 3. Developers extending XPages functionality and Domino services using an Eclipse IDE

 Used techniques: Deployment via OSGi bundles, development via Java in Eclipse

 These developers need most skills but also can do more than others. The biggest difference to the two types above is that the deliverable is not an NSF but an Eclipse feature/OSGi bundle (deployable unit with potentially multiple plugins). The jar files can be deployed via the OpenNTF project [plugins deployment](http://www.openntf.org/p/Plugins%20Deployment%20for%20Domino) or since 8.5.3 with the extended update site template (Declan Lynch [describes](http://www.qtzar.com/blogs/qtzar.nsf/blog.xsp?entry=mfr6u1708ow0) this).

 Using the Eclipse IDE and the [extensibility API](http://www-10.lotus.com/ldd/ddwiki.nsf/dx/Master_Table_of_Contents_for_XPages_Extensibility_APIs_Developer_Guide) the core XPages functionality can be extended. This is used in the [Extension Library](http://extlib.openntf.org/) and other OpenNTF projects like [ZK spreadsheet](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=ZK%20Spreadsheet%20for%20XPages) and [JQuery library](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=jQuery%20Extension%20Library). There are also [simple extensibility samples](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=Simple%20Samples%20for%20XPages%20Extensibility) on OpenNTF.

 The second part of this [video](http://www.youtube.com/watch?feature=player_embedded&v=J84dAECKots) describes how to debug Java code from the Eclipse IDE. The OpenNTF project [debug plugin](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=IBM%20Lotus%20Domino%20Debug%20Plugin) allows debugging from Eclipse without having to redeploy the code to Domino in many/most cases.

 In addition to the extensibility API you can also write full servlets. The OpenNTF project [simple servlet](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=Servlet%20Sample) shows how.

 Furthermore you can extend the Domino server with OSGi tasklets. The project [OSGi tasklet service](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=OSGI%20Tasklet%20Service%20for%20IBM%20Lotus%20Domino) proposes a new way of writing server addin tasks by using the Java OSGi programming model.

 For completeness sake in the classic Domino app dev model you can implement agents and script libraries with Java. Bob Balaban describes in his [blog](http://www.bobzblog.com/tuxedoguy.nsf/dx/want-to-debug-java-agents-inside-designer-you-can-sort-of) how to write Java agents that you can debug in Designer or Eclipse (he calls this technique two headed beast).

 In all cases you can use the [Domino Java APIs](http://publib.boulder.ibm.com/infocenter/domhelp/v8r0/topic/com.ibm.designer.domino.main.doc/H_JAVA_NOTES_CLASSES_JAVA.html). Java developers should also understand how memory management and garbage collection is done. Bob Balaban describes this in some of his [blogs](http://www.bobzblog.com/tuxedoguy.nsf/dx/geek-o-terica-5-taking-out-the-garbage-java).