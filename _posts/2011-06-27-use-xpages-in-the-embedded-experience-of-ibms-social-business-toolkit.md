---
id: 266
title: "Use XPages in the Embedded Experience of IBM's Social Business Toolkit"
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/use-xpages-in-the-embedded-experience-of-ibms-social-business-toolkit/'
permalink: /article/03182011033747AMNHEAY7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/03182011033747AMNHEAY7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316555683'
categories:
    - Articles
---

 In my last [blog entry](http://heidloff.net/nh/home.nsf/dx/03152011031127AMNHEAFR.htm) I wrote how entries from the activity stream of the [IBM Social Business Toolkit](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpViewCategories.xsp?lookupName=IBM%20Social%20Business%20Toolkit) can be displayed in XPages. Today I show how to use an XPage to display an activity stream entry in the [embedded experience](https://greenhouse.lotus.com/activitystream/).

 There are several scenarios where this is important. For example teamrooms could put notifications about new documents that you need to review or new comments to your documents in the activity stream. In the activity stream users should then be able to open these documents or at least summaries with links in the embedded experience.

 In order to put entries in the activity stream programmatically I’d like to create another sample. For now I simply used the [REST API test application](https://greenhouse.lotus.com/vulcan/shindig/client/testAPI.jsp).

 In order to tell the embedded experience which gadget to open I had to use these parameters as alternate inline and type:   
 {“ee:component-instance-data”:{“ee:context”:”{“bookmarkTitle”:”Niklas”,”bookmarkURL”:”http://heidloff.net”}”,”ee:component-definition”:”http://heidloff.net/social.nsf/gadget.xsp?documentId=4a4c53c70bb45b36002578560052d9ae”}}   
 application/gadget-instance+json

![image](/assets/img/2011/06/CreateStreamEntry.gif)

 First I had to create my [XPage](http://www.openntf.org/Projects/pmt.nsf/E3E5C59AF0E7DA018625785600559549/%24file/DocumentXPage.gif) to display the actual document. Then I created a second [XPage](http://www.openntf.org/Projects/pmt.nsf/E3E5C59AF0E7DA018625785600559549/%24file/GadgetXPage.gif) (XPage agent) that emits the gadget definition pointing to the actual document XPage. This definition is expected by the social gadget container. I’ve created the simplest possible form that just points to the document XPage that will then be rendered in an iFrame. In order to identify the actual document the document unid is passed to the gadget XPage and then put dynamically in the gadget xml.

 After you’ve done this your XPage shows up in the [embedded experience](https://greenhouse.lotus.com/activitystream/). I’ve uploaded a bigger [screenshot](http://www.openntf.org/Projects/pmt.nsf/E3E5C59AF0E7DA018625785600559549/%24file/DebugEmbeddedExperience.gif) to OpenNTF.

![image](/assets/img/2011/06/EmbeddedExperienceSmall.gif)