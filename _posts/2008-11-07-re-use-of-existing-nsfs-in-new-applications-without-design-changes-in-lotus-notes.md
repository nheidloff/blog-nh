---
id: 96
title: 'Re-use of existing NSFs in new applications without design changes in Lotus Notes'
date: '2008-11-07T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/re-use-of-existing-nsfs-in-new-applications-without-design-changes-in-lotus-notes/'
permalink: /article/re-use-of-existing-nsfs-in-new-applications-without-design-changes-in-lotus-notes/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/09.html'
custom_permalink:
    - article/re-use-of-existing-nsfs-in-new-applications-without-design-changes-in-lotus-notes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316382308'
categories:
    - Articles
---

 For composite applications it is key to be able to assemble existing components without changing them first. That is because sometimes you don’t have access to the component’s code and/or you are too afraid to touch a running system and/or there is nobody in your company anymore who knows how to do it and/or you just don’t want to redeploy your component.

Because of this we have over the last years added more and more functionality in Lotus Notes/Expeditor to re-use existing components without changing them first. We started with so called built-in properties and actions. For example even in 8.0.1 there is an action to filter the current UI view by category which is available to all NSFs. There are also other built-in properties and actions for NSF components and since 8.5 also built-in properties and actions for Eclipse components (e.g. minimize component).

At roughly the same timeframe as 8.0.1 we also put out there the first version of the composite application catalog at [OpenNTF.Org](http://www.openntf.org/Projects/pmt.nsf/ProjectLookup/Composite%20Application%20Component%20Library). This catalog comes with the so called URL processor component. It allows other components to ‘listen’ for view entry selections in Notes views. Then your component can access via the Notes URL the selected document and read all column values and document fields and forward them to other components. There is also a web clipper component in the catalog that allows to clip some data from a web application via regular expressions and forward it to other applications.

In Lotus Notes 8.5 there is now another new way to do similar things. We call this new infrastructure generic containers. Notes 8.5 will come with one implementation of such a generic container, the web container. Post 8.5 we’d like to make a Notes view container available. There are many more of these containers in the pipeline and we even allow (already in 8.5) to implement your own container. In this blog entry I want to focus on the web and the Notes container.

Here is a simple sample. Contacts view at the top and a web form to enter registration for Lotusphere at the bottom. When you select someone in the view the fields in the web form are automatically populated. This application has been assembled without designer access to the NSF or access to the design/code of the web application.

![image](/assets/img/2008/11/1_06F8C08C06F8BA88002BD263852574FA.gif)

The Notes container (Notes PIM view container) can be configured as shown in next screenshot. Essentially it allows to publish properties when Notes view entries are selected. The properties are values from either the columns or the fields in the document. The properties can even be calculated via @Formulas which makes this really powerful.

![image](/assets/img/2008/11/1_06F8CCEC06F8CAAC002BD263852574FA.gif)

The web container configuration is a little different. Essentially you need to define which fields map to which actions/properties and you need to address fields via their name in the form. In other scenarios if you want to publish values you can also use xpath to address content.

![image](/assets/img/2008/11/1_06F8DC2006F8D93C002BD263852574FA.gif)