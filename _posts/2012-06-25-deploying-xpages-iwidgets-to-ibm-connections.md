---
id: 529
title: 'Deploying XPages iWidgets to IBM Connections'
date: '2012-06-25T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/deploying-xpages-iwidgets-to-ibm-connections/'
permalink: /article/deploying-xpages-iwidgets-to-ibm-connections/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-xpages-iwidgets-to-ibm-connections/
dsq_thread_id:
    - '4330260217'
categories:
    - Articles
---

 XPages can be wrapped in [iWidgets](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/development-guide) to extend IBM Connections 3.0.1 (watch this [video](http://heidloff.net/nh/home.nsf/dx/06.06.2012081039NHE99R.htm)). Since Domino 8.5.1 there is a new design element ‘Components’ in Designer to create these widget xml descriptors automatically. For my sample app however I didn’t use the design element but created my own xml files. I hope that in a future product release we can improve the design element so that all of the functionality will be possible out of the box.

 In order to run iWidgets in [full page mode](http://heidloff.net/nh/home.nsf/dx/09.05.2012091955NHEALZ.htm) I had to slightly extend domjs/dojo-1.4.3/ibm/xsp/widget/layout/xspScopeClass.js and the widget xml file has to include a full page mode section.

 Originally even though I created my own xml file I kept it in the NSF as file resource which caused some caching issues. After my changes to the file in the NSF Connections didn’t pick them up immediately. So I always had to create a new file resource or rename it and run the rather long update process via [wsadmin](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/Enabling_custom_widgets_for_Communities_lc3):

 cd /local/opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin   
 ./wsadmin.sh -lang jython -user wasadmin -password lcsecret -port 8879   
 execfile(“communitiesAdmin.py”)   
 CommunitiesConfigService.checkOutWidgetsConfig(“./niklas”, “lcapplianceCell01”)   
 CommunitiesConfigService.checkInWidgetsConfig(“./niklas”, “lcapplianceCell01”)   
 exit

 In order to improve this process for the development I put the xml file on the Connections web server in my customization directory /local/opt/IBM/LotusConnections/Data/customization/communities/nav/common. In the widgets-config.xml file I could then refer to it via http://sbf3012.boeblingen.de.ibm.com:81/communities/nav/common/News.xml. Since I have the CONNECTIONS\_CUSTOMIZATION\_DEBUG variable set changes are now directly visible to the Connections iWidget container.

 However since the widget xml file is now read from Connections and not from Domino another domain and/or port is used (cross domain security policy). That’s why I had to put my modified xspScopeClass.js file (with the additional three lines of code) also on Connections in the same customization directory and refer to it from the widget xml file. Alternatively I also could have put the widget xml file on my Domino web server (e.g. html directory) in which case I wouldn’t have to had to copy xspScopeClass.js.

 Again, this is what I did for Domino 8.5.3 and Connections 3.0.1. I hope it will be easier in the future but wanted to share this information for the time being.