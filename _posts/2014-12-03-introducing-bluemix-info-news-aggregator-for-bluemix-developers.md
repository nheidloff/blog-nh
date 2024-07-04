---
id: 1017
title: 'Introducing Bluemix.info: News Aggregator for Bluemix Developers'
date: '2014-12-03T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/introducing-bluemix-info-news-aggregator-for-bluemix-developers/'
permalink: /article/03.12.2014123429NHEFL5.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/03.12.2014123429NHEFL5.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4344046600'
categories:
    - Articles
---

 When I started to work on Bluemix, I noticed that there is a lot of information and news about Bluemix. That’s great. However it took me a good amount of time each day to find news since it is scattered around multiple places: [IBM Bluemix Dev blog](https://developer.ibm.com/bluemix/blog/), [IBM developerWorks library](http://www.ibm.com/developerworks/views/global/libraryview.jsp?show_abstract=false&contentarea_by=All+Zones&product_by=-1&topic_by=BlueMix&industry_by=-1&type_by=All+Types&ibm-search=Search), announcements and other news in [dW Answers](https://developer.ibm.com/answers/smartspace/bluemix/), [IBM press releases](https://www-03.ibm.com/press/us/en/pressreleases/recent.wss), new open source projects on [GitHub](https://github.com/ibm-bluemix), YouTube, personal blogs, for example from [Ryan Baxter](http://ryanjbaxter.com/), etc. etc. While this might sound a little negative, to be fair the [IBM Bluemix](https://twitter.com/ibmbluemix) Twitter account does a good job to federate most of this information.

 In my new role as Bluemix advocate I have to learn a lot about Bluemix which is really nice. So I wanted to write a real ‘real’ app which shows how to use several Bluemix technologies and services together. In my previous role other people from the IBM Collaboration Solutions (ICS) community and I developed a news aggregator, called [Collaboration Today](https://www.youtube.com/watch?v=PYzZT-UgreA) based on ICS technologies. So I decided to re-implement this app as a Bluemix app to understand how to do this and what benefits Bluemix provides. I’ll blog more details, but in summary it was really easy to do so.

 You can find the result (until today) on [www.Bluemix.info](http://www.bluemix.info/).

[   
![image](/assets/img/2014/12/bluemixinfo.png)  ](http://www.bluemix.info/)

[Bluemix.info](http://www.bluemix.info/) is a news aggregator for [IBM Bluemix](http://bluemix.net/) developers and professionals covering news about everything related to IBM’s platform as a service, including runtimes, services, events and much more. Bluemix.info reads information from various sources via feeds. However curators need to approve content first before it shows up on Bluemix.info. Curators can also add entries manually. Find out why [curation](http://edbrill.com/ebrill/edbrill.nsf/dx/collaboration-today-and-why-curation-matters) matters.

 Right now only [Ryan Baxter](https://twitter.com/ryanjbaxter) (thanks for his help and support btw), [Stephan Wissel](https://twitter.com/notessensei) (thanks to his contributions) and I are curators, but I hope that this will change. To be honest though I don’t know yet whether we’ll actually run this web site or whether we just use it as Bluemix sample. I have to discuss with more of my colleagues. If you would appreciate such a service, please [let us know](https://twitter.com/bluemixinfo).

 The application is not done yet. Especially the user interface needs major improvements. The good news is that my colleague [Stephan Wissel](https://twitter.com/notessensei) wants to provide a new UI. The backend uses currently the following functionality:   
 – Liberty Java runtime   
 – Bluemix Cloudant service   
 – Bluemix single sign on service   
 – Bluemix data cache service   
 – Bluemix session cache service   
 – User provided service   
 – Bluemix workload scheduler (in progress)   
 – Plus a lot of other open source libraries

 There is currently no real UI yet to add entries. To do this I use a [REST API explorer](https://www.bluemix.info/swagger/index.html) in combination with some automation to fetch feeds from various web sites.

 Over the next days I want to do a series of blog entries describing how the application has been built and I’d like to open source the application.