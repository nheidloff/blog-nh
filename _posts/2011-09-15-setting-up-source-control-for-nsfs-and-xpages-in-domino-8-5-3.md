---
id: 343
title: 'Setting up Source Control for NSFs and XPages in Domino 8.5.3'
date: '2011-09-15T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/setting-up-source-control-for-nsfs-and-xpages-in-domino-8-5-3/'
permalink: /article/09152011024951AMNHEA28.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316600012'
custom_permalink:
    - article/09152011024951AMNHEA28.htm/
categories:
    - Articles
---

 **Update 02/16/12: The location of some plugins has changed. There is now one [update site](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8RJASZ) including all plugins on OpenNTF.**

In May the Domino Designer team published a [first version](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=Source%20Control%20Enablement%20for%20Designer) of the source control enablement feature on OpenNTF. Since code drop 5 this functionality is now available out of the box in IBM Lotus Domino 8.5.3.

 For 8.5.3 the OpenNTF version should not be used anymore. Maureen Leland describes in the [project](http://www.openntf.org/internal/home.nsf/news.xsp?documentId=694A15D19BE711AA862579060053C53D&action=openDocument) more details, e.g. how to update to the 8.5.3 version if you have used the OpenNTF version previously.

 This feature is source control enablement, not a source control management system. Essentially Designer synchronizes NSFs with so called on disk Eclipse projects that can then be managed by source control systems like SVN, Rational Team Concert, Gist, etc. In this blog entry I describe how to set up SVN in Designer and also how to enable external (not integrated in Designer) tools like Rational Team Concert for source control management in NSFs. Let’s start with SVN within Designer.

 There is [documentation](http://www.openntf.org/Projects/pmt.nsf/2AF30F7D4883670A862577D1002DED7D/%24file/ReadMe.pdf) available for how to set up SVN in Designer. In the 8.5.3 version however you need slightly different SVN plugins. Essentially you have to install plugins from two update sites. One update site contains the core SVN runtime, the other update site various SVN connectors under different licenses.

 Download these two exact update sites:   
<http://www.eclipse.org/downloads/download.php?file=/technology/subversive/0.7/builds/Subversive-incubation-0.7.9.I20100512-1900.zip>   
<http://community.polarion.com/projects/subversive/download/eclipse/2.0/builds/Subversive-connectors-2.2.2.I20100512-1900.zip>

 You need to install them via the menu File-Application-Install dialog that you need to enable in the Designer preferences “Enable Eclipse plug-in install”. Also after you’ve installed plugins from each update site restart the client. Another tip: Always initiate the installs from Designer, not Notes, so that you see the progress dialog.

![image](/assets/img/2012/02/SVN01.gif)

 First install the core runtime. The tricky part is that you need an exact GEF version. The version you need is 3.6.2 which you only see when un-checking the checkbox at the buttom.

![image](/assets/img/2012/02/SVN02.gif)

 For the connectors select these plugins:

![image](/assets/img/2012/02/SVN03.gif)

 After you have installed all plugins (and restarted) I always go to the preferences and change the default connector to Native JavaHL since this is the only one that works against the SVN repository on OpenNTF. I forgot though why (SSL?).

![image](/assets/img/2012/02/SVN04.gif)

 In the last step you can switch to the SVN Repository Exploring perspective and create links to SVN repositories.

![image](/assets/img/2012/02/SVN05.gif)

 The repository structure is then displayed so that you can check out code.

![image](/assets/img/2012/02/SVN06.gif)

 As I said above it is also possible to use any other source control systems that handle file systems, e.g. Rational Team Concert. The trick is to import them into Eclipse (in Designer) without copying the files. From the Eclipse Navigator view choose Import-Existing Projects into Workspace and make sure you have not selected “Copy Projects” at the bottom.

![image](/assets/img/2012/02/SVN08.gif)

 Then you can use whatever functionality provided by your source control system to manage the files. The next screenshot shows the example of the external SVN tool [TrotoiseSVN](http://tortoisesvn.tigris.org/).

![image](/assets/img/2012/02/SVN07.gif)