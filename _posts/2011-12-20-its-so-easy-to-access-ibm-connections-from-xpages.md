---
id: 438
title: "It's so easy to access IBM Connections from XPages"
date: '2011-12-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/its-so-easy-to-access-ibm-connections-from-xpages/'
permalink: /article/12192011044923AMNHEDJF.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/12192011044923AMNHEDJF.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4318779817'
categories:
    - Articles
---

 I’ve implemented another feature for [XSnippets](http://openntf.org/xsnippets) to share snippets on the IBM Connections instance deployed on [Greenhouse](https://greenhouse.lotus.com/homepage/).

 I’ve used the XPages Social Enabler which comes with great functionality to handle the authentication including SSO and functionality to invoke REST services easily and parse XML. I also used the [documentation](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Connections_APIs_ic301) of the Connections REST services. If I have time I document later more how I’ve done it. For now you can read the source code on [OpenNTF](http://xpag.es/?14A2). I want to thank my colleague Yun Zhi Lin whose code I used as starting point.

 On the XSnippet page there is a new icon now to share on Connections.

![image](/assets/img/2011/12/ConnectionsXSnippets1.gif)

 When clicked a new page is opened from where users can update their Connections status and publish bookmarks into communities.

![image](/assets/img/2011/12/ConnectionsXSnippets2.gif)

 Here is an [mini video](http://heidloff.net/nh/home.nsf/dx/ConnectionsXSnippets.gif/$file/ConnectionsXSnippets.gif) showing the new functionality in action.