---
id: 301
title: 'Setup of my XPages Development Environment'
date: '2011-06-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/setup-of-my-xpages-development-environment/'
permalink: /article/06202011030327AMNHEAAR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316580592'
custom_permalink:
    - article/06202011030327AMNHEAAR.htm/
categories:
    - Articles
---

 Over the last months I’ve built some XPages controls and functionality via the [XPages Extensibility API](http://www-10.lotus.com/ldd/ddwiki.nsf/dx/Master_Table_of_Contents_for_XPages_Extensibility_APIs_Developer_Guide) and an Eclipse IDE. While I realize that most XPages developers use Domino Designer to build their controls and applications I’ve summarized below how I’ve set up my Java/Eclipse development environment since I’ve heard more and more developers recently asking for how this can be done.

 The [Extension Library documentation](http://www.openntf.org/Projects/pmt.nsf/122B29BEE5A3E3A58625779F001DEA75/%24file/XPages%20Extension%20Library%20Documentation.pdf) (page 6ff) describes the core setup of the Eclipse IDE. Basically you need Eclipse 3.4 or 3.5 and then you need to define the target platform. In difference to the documentation I point it to the Domino server rather than the client. You can do this by pointing to the two directories rcp and shared.

![image](/assets/img/2011/06/EclipseSetup1.gif)

 The main reason is that I want to be able to use the [Domino Debug Plugin](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=IBM%20Lotus%20Domino%20Debug%20Plugin) from David Taieb. After you’ve installed this plugin in your Eclipse IDE you can debug your Java code without having to deploy/export your changes first to the Domino server. The screenshot shows the new option ‘Domino OSGi Framework’.

![image](/assets/img/2011/06/EclipseSetup2.gif)

 You still have to deploy to Designer though if you change the interfaces of controls (xsp-config files). Luckily you rarely have to do this. I deploy the plugins by exporting them in my own directory c: otesframeworkextlibeclipseplugins. In order for Notes/Domino to find these plugins you have to do a couple of things (one time setup):

 A) In c: otesframeworkrcpeclipselinks create a extlib.link file with this content: path=c:/notes/framework/extlib

 B) Allow usage of these plugins by changing the default security settings in data/workspace/.config/org.eclipse.update/platform.xml. Note: Do not do these changes on a production environment. Only do it in your development environment.   
 B1) The transient attribute in the first config tag should be set to false.   
 B2) All the occurrences of MANAGED-ONLY value should be replaced by USER-EXCLUDE (generally in 3 places)

 Every time after you’ve done an export of your plugin(s) from the Eclipse IDE you have to restart Designer via the command “designer.exe -RPARAMS -clean”.

 To get started with Eclipse XPages development check out the [simple extensibility samples](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=Simple%20Samples%20for%20XPages%20Extensibility) on OpenNTF.