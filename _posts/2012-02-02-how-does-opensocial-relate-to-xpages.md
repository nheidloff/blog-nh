---
id: 445
title: 'How does OpenSocial relate to XPages?'
date: '2012-02-02T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/how-does-opensocial-relate-to-xpages/'
permalink: /article/01.02.2012084010NHEAZP.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/01.02.2012084010NHEAZP.htm/
dsq_thread_id:
    - '4318794698'
categories:
    - Articles
---

 There has been quite a lot of talk about open social recently. Below is a list of resources and I’ll try to explain OpenSocial and it’s relation to XPages in my own words.

[OpenSocial](http://opensocial.org/) is an open set of specifications, initially done by Google and now also by IBM, Jive and other companies. The specifications describe 1. a component model and 2. social APIs to access common services like users’ networks.

 The component model is heavily based on standard web technologies allowing various different technologies to be used to implement these components or applications called OpenSocial gadgets. Additionally there are some standard APIs that define how to pass in context and exchange information between gadgets and between gadgets and the containers they are running in.

 XPages is one technology that can be used to write OpenSocial gadgets. This is very similar to wrapping up XPages in iWidgets to run them in Websphere Portal and [Mashup Maker](http://www-10.lotus.com/ldd/ddwiki.nsf/dx/XPages_iWidgets_in_IBM_Mashups). You could imagine a Domino Designer extension which allows creating these social gadget definitions (XML files) as done for iWidgets with the “Components” design element. Technically the social gadgets can wrap XPages in an iFrame so that different gadgets can use different JavaScript library versions, can run securely, etc. I’ve implemented a sample on [OpenNTF](http://heidloff.net/nh/home.nsf/dx/12142011025614AMNHEBBP.htm) that shows how to create this XML manually for now. OpenSocial gadgets are just a wrapper of XPages so that XPages can run in other containers.

 OpenSocial gadget functionality in XPages is aimed (disclaimer: no commitment) to be added in future XWork Server and Domino versions, e.g. the Component design element for OpenSocial gadgets and the OpenSocial [social APIs](http://opensocial-resources.googlecode.com/svn/spec/trunk/Social-API-Server.xml). The social APIs would allow XPages gadgets for example to access other persons’ profiles, activity streams, app data, etc.

 Ryan mentioned in the [podcast](http://www.takingnotespodcast.com/blogs/takingnotes.nsf/dx/TakingNotesEpisode149.htm) that it is targeted to support OpenSocial gadgets in the [Notes and Domino Social Edition](http://edbrill.com/ebrill/edbrill.nsf/dx/lotusphere-2012-lotus-notesdomino-social-edition) (activity stream, mail preview, own tab, sidebar) as well as on the Connections Next home page.

 One intent of using OpenSocial gadgets is to write gadgets once and use them in different IBM products. Additionally it is aimed to run the same gadgets even in other non IBM containers. Jive and Google provide already market places of such gadgets.

 To get started I suggest to watch the [app dev throwdown session](http://www.livestream.com/ibmsoftware/video?clipId=pla_130c6981-18d0-4708-a5f2-3ff1afef0223) from Lotusphere where six IBM partners demonstrated their solutions based on OpenSocial. There is also a higher quality video from one of the partners [Trilog](http://www.youtube.com/watch?feature=player_embedded&v=hY5Z2YdhOos).

 I also like the deck from [Ryan Baxter](http://ryanjbaxter.com/2012/01/25/thoughts-on-lotusphere-2012/) and Stanton Sievers with step by step instructions:

 <iframe allowfullscreen="" frameborder="0" height="485" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/YGcbqSq53wgf3" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="595"> </iframe>

<div style="margin-bottom:5px">  **[Lotusphere 2012 – Show115 – Socialize Your Apps Using OpenSocial](//www.slideshare.net/ryanjbaxter/lotusphere-2012-show115-socialize-your-apps-using-opensocial "Lotusphere 2012 - Show115 - Socialize Your Apps Using OpenSocial")**  from **[Ryan Baxter](//www.slideshare.net/ryanjbaxter)** </div> In order to try OpenSocial gadgets you can use the [OpenSocial Sandbox](http://75.101.245.40:8080/collabapp/index.html). The IBM Social Business Toolkit on Greenhouse is based on an older version of the OpenSocial specification and an older version of Activity Streams. Gadgets in there might not run in future products.