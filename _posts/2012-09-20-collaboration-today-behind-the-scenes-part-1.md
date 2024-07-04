---
id: 568
title: 'Collaboration Today: Behind the Scenes (part 1)'
date: '2012-09-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/collaboration-today-behind-the-scenes-part-1/'
permalink: /article/19.09.2012084213NHE9VG.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/19.09.2012084213NHE9VG.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4335246234'
categories:
    - Articles
---

 Yesterday we deployed a new version of the Collaboration Today application. Most of the extensions are not visible for readers of [CollaborationToday.info](http://collaborationtoday.info/) but only for moderators. For example we’ve added a check whether a specific URL already exists and we track now the history of moderation changes per news entry.

 The most important visible change for readers are the [tweets](https://twitter.com/Collab2day). All new moderated entries are tweeted automatically. In the tweets we now put the author twitter names if we know them, otherwise the author display names. Additionally moderators can now define Twitter hash tags for our different categories. These tags are automatically appended. The rest of the 140 characters is used for a short version of the link and the actual title.

 Our intention is to make more people aware of Collaboration Today, esp. the people who ‘follow’ not only people but hash tags (through searches), and we want to give the authors more visibility. Here is an example:

[![image](/assets/img/2012/09/sampletweet.png)](https://twitter.com/Collab2day/status/248302713752928257)

 Over the next days I want to blog more about both concepts as well as technical details. Ed Brill and David Leedy also blogged about Collaboration Today.

[Ed Brill](http://edbrill.com/ebrill/edbrill.nsf/dx/collaboration-today-and-why-curation-matters) explained well the concept of human assessment / moderation.

[David Leedy](http://notesin9.com/index.php/2012/09/10/notesin9-073-the-making-of-collaborationtoday-info/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+NotesIn9+%28Notes+In+9+-+Wordpress%29) posted a video about the Collaboration Today functionality.

 I’ve especially planned to blog about two technical topics. One is how we store all news entries in memory so that all pages can be rendered without reading the data from Notes views or Notes documents. The other topic is how we’ve implemented the popular view. We use a click counter that only stores clicks every five minutes and we store them directly in the news entry documents rather than response documents or different databases.

 If you experience issues with the site, please let us know either via the [contact](http://collaborationtoday.info/contact.xsp) page or in the [OpenNTF project](http://www.openntf.org/internal/home.nsf/defects.xsp?action=openDocument&name=Collaboration%20Today).