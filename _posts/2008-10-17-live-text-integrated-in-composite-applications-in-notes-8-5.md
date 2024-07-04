---
id: 89
title: 'Live text integrated in composite applications in Notes 8.5'
date: '2008-10-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/live-text-integrated-in-composite-applications-in-notes-8-5/'
permalink: /article/live-text-integrated-in-composite-applications-in-notes-8.5/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/02.html'
custom_permalink:
    - article/live-text-integrated-in-composite-applications-in-notes-8.5/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316392552'
categories:
    - Articles
---

 In Lotus Notes 8.5 it is possible to invoke actions that are provided by components in composite applications from live text. I often refer to this feature as ‘user initiated actions’ or ‘C2A’ (click to action – portal terminology). This is different from the predefined wires that we only supported in 8.0, 8.0.1 and 8.0.2. End users can select live text and choose an action.

In order to define which property broker actions should be made available for which live text there is a new UI in CAE to do this mapping. In the following screenshot it is defined that the action ‘set html text to browser’ of the ‘managed browser’ out of the box component should be available whenever an ’email address’ is selected. This UI basically maps between the content types as used by widgets/live text and the datatypes as defined in the WSDL by components in composite applications.

![image](/assets/img/2008/10/1_06B7782806B7745400465CBA852574E5.gif)

At runtime the end users can then click on an email address and see the action ‘set html text to browser’ in addition to other actions like ‘send an mail’ that might be provided globally or by other components in the current composite application.

![image](/assets/img/2008/10/1_06B783CC06B7818C00465CBA852574E5.gif)

At this point this feature works for live text in documents. What I’d really like to do is to use live text for Notes view entries. We need a way to define what content type a Notes view entry is. Then you could right click on the view entry and invoke actions provided either globally or by the currently composite application.

As a second priority I’d like to use live text for fields in Notes forms. There should be a way to associate a Notes field with a content type. End users could then click these fields and choose actions that they want to invoke. In this case we wouldn’t have to parse the whole document and use recognizers but we could simply use the mapping between Notes fields and content types.