---
id: 344
title: 'Using Subversive SVN in Domino Designer 8.5.3 for XPages Development'
date: '2011-09-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/using-subversive-svn-in-domino-designer-8-5-3-for-xpages-development/'
permalink: /article/09192011040807AMNHEBK6.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
custom_permalink:
    - article/09192011040807AMNHEBK6.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316601125'
categories:
    - Articles
---

 In my [last blog entry](http://heidloff.net/nh/home.nsf/dx/09152011024951AMNHEA28.htm) I described how to set up Subversive in Domino Designer 8.5.3. In this entry I describe briefly how to use it.

 There are three “repositories” that need to be kept in synch:  
 1) The server side managed SVN project   
 2) The client side on disk project under SVN control   
 3) The NSF project (using a virtual file system)

 The Subversion plugins come with functionality to synchronize code between (1) and (2), Domino Designer 8.5.3 comes with the source control enablement feature to synchronize (2) and (3).

 **Downloading and connecting to a NSF in source control**

 For most developers the first thing they want to do is to connect to an SVN project containing a NSF. In the SVN Repository Exploring perspective select the folder representing the NSF (in the sample the folder “ondisk-xsnippets”), right click and choose “Check Out”. This creates the client side on disk project and downloads the code.

![image](/assets/img/2011/09/SVNUsage1.gif)

 Next you need to create a new NSF (File-Application-New) and associate the NSF with the on disk project. This can be done in the Designer perspective by right clicking on the NSF (the NSF has to be open to see this menu entry).

![image](/assets/img/2011/09/SVNUsage2.gif)

 By default the synchronization between the on disk project (2) and the NSF (3) is done automatically. I usually disable the auto import and export since I want to know when exactly I synchronize. This avoids later not intended updates if for example you just changed some code in the NSF for testing or demo purposes. You can define synchronization settings in the preferences.

![image](/assets/img/2011/09/SVNUsage3.gif)

 In the preferences can also be defined how to represent the design elements on disk depending on the type of the design element being represented.   
 1) As a set of 2 files (content and metadata) on disk. XPages, Custom controls, Style sheets, Files, Themes and JS/SSJS/LS script libraries are represented as a set of 2 files on disk. The content file has the actual file content as seen in the editor and the metadata file contains the DXL minus the content to represent rest of the attributes of the design element.   
 2) As a file containing the DXL of the design element. The rest of the design elements, Form, View, Pages, Java script libraries, Agents, Shared Actions, etc. are represented as a file containing the DXL of the design element.

 For XPages development this setting isn’t really important but for classic Domino development you can choose whether you need full fidelity or a textural representation to enable comparisons of versions, etc.

 The synchronization between the on disk project (2) and the server project (1) can be invoked from the Java perspective or the Package Explorer view in the Designer perspective.

![image](/assets/img/2011/09/SVNUsage4.gif)

 Both the (1) to (2) and (2) to (3) synchronization mechanisms provide functionality to handle conflicts, undo changes etc. that I don’t cover in this blog entry.

 **Adding a NSF to source control**

 Another common scenario is that you want to add a NSF to source control. This is done again in two steps. First right click on the NSF and choose “Team Development-Set up Source Control for this Application” which brings up this dialog in which you can create a new on disk project:

![image](/assets/img/2011/09/SVNUsage5.gif)

 In the second step a new SVN project on the server needs to be created. This can be invoked from the Package Explorer by right clicking the on disk project and choosing “Team-Share Project …”. A wizard then guides you through the steps.

![image](/assets/img/2011/09/SVNUsage6.gif)