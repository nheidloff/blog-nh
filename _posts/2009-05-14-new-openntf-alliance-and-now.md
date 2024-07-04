---
id: 190
title: 'New OpenNTF Alliance and now?'
date: '2009-05-14T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/new-openntf-alliance-and-now/'
permalink: /article/14.05.2009025704NHEA6R.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/14.05.2009025704NHEA6R.htm/
dsq_thread_id:
    - '4491192048'
categories:
    - Articles
---

 I started my new job six months ago when we/IBM decided to push OpenNTF. In January we announced that IBM wants to do this and this week the new OpenNTF Alliance was established. Now that we have the new Alliance and the new governance and IP model we can do exciting things. Below I describe some of the things that I personally would like to do over the next weeks/months but the steering committee has to decide this.

 1. First big(ger) collaborative project   
 Most of the projects on OpenNTF have only one committer. There are some exceptions where 2-4 people have teamed up. I’d like to identify a new project which will provide a full blown application and I’d like to find multiple people who want to implement it and can dedicate a significant amount of time for let’s say six months.

 There are various options for what type of new project we could choose. At this point I would like to open source the Notes/Domino discussion template so that the community can extend it and IBM could take it back into the product. I think that this would be a good incentive for people to participate if they know that their code can go into an IBM product.

 The discussion template is good candidate for a first IBM template as open source on OpenNTF for various reasons:   
 -&gt; It is what Notes/Domino is all about. Discussions, responses, documents, people, collaboration. Everyone knows the discussion template and has used it.   
 -&gt; It is not too complex. Compared to other templates like the teamroom it is rather simple and it has already a XPages web frontend which can be used as starting point.   
 -&gt; There are many many things we can do to improve it: Here is a top 10 list of ideas how we could extend the discussion template:

 1. Virtualization   
 One of the problems with the discussion template (and Notes databases in general) is that many organizations have restrictions who can create new Notes databases on a server. Unfortunately these guidelines sometimes lead to less usage of Notes/Domino applications in favor of other (not easier to manage) technologies.   
 The idea is to introduce an easy form of virtual discussion applications within one discussion database. For example departments could have one discussion databases in which all people in the ACL are allowed to create new discussion instances for people in their team. In order to reduce the development effort and not to regress runtime performance there is no instance level security (except ‘mark private’). At runtime end users can only see their documents as if they were stored in a separate discussion database.

 2. Sticky notes   
 Often in discussion applications there is a need to always keep certain documents visible. These documents often describe how the discussion application can be used or these documents contain FAQ-type information. With sticky notes documents can be marked as such and always appear at the top of views.

 3. Extensibility via a sandbox model   
 In the mail template there are various ways to extend the typical end user experience. In the last years several ‘content spots’ have been added (esp. sub-forms) so that customers can add their own extensions without overwriting them the next time databases are updated with a new template version. Similar extension hooks need to be provided for the discussion template.   
 – It needs to be possible to add fields to the discussion documents (e.g. a custom type field)   
 – It needs to be possible to add custom views that leverage these custom fields and these views should show up automatically in navigators

 4. Customizability  
 The discussion template supports minimal customizability (declarative changes as opposed to custom development) like the exchange of the company logo. There should be more such options, e.g. whether view entries need to be expandable inline, how large view entries are, whether links to other sites should be displayed in navigator, etc.

 5. Custom profiles   
 The discussion template comes with it’s own way to handle user profiles which are stored in the discussion template. In reality most customers have already defined profiles in (many) other places. The discussion template needs to be extended such that it can also handle profiles which are not stored in the same discussion database.

 6. Feeds   
 Feeds should be added so that feed readers or other intelligent tools can display updates in the discussion templates based on the users’ interests. This should really replace the ‘proprietary’ subscriptions feature in the discussion template right now.

 7. Redo of the rich client UI   
 This is an obvious extension since the web UI looks currently better than the rich client UI. But this should be done based on 851 so that the rich client UI could look like the web UI and it only needs to be implemented once.

 8. Feature parity between rich client and UI   
 Certain configuration and administration options are ok to be done only in the rich client. But the core end user functionality should be available for both rich and web client. Here is the list of inconsistencies in 85:   
 – categories vs tags   
 – mark private   
 – favorites   
 – IM awareness   
 – doc expirations/archive

 9. Advanced search   
 There should be more options to search content in discussion application and these options should be extensible so that custom fields can be searched.

 10. Better documentation   
 Better developer documentation needs to be written. For example how can a discussion application be embedded in a corporate sites where it doesn’t get the full real estate in browsers but has to show up under the corporate navigator.

 In order to make this real however we have to do a couple of things first. I’ve heard from some of our IBM managers that this is a theoretical option. Now we have to make this concrete. Until we’ll get these final approvals, there is obviously no commitment and just a personal dream. We also need to define how we can do such a collaborative project on OpenNTF. For example where do we put specifications, reviews, code control, etc. I’d like to find customers or partners who have extended their discussions and would like their changes to contribute to this project.

 2. New ways to kick off projects   
 I would also like to kick off further new projects. Since not everyone can dedicate that much time it would be great to start some smaller projects where again several people collaborate. I’ve discussed a couple of options with various people. Some of these ideas are not from me, some of these ideas different people came up with at the same time, some of these ideas I don’t know anymore where they came from.

 Chris Toohey came up with the idea to have virtual residencies to implement new projects. I refer to this model as red projects. Similar to redbooks or red wikis we could have something like red projects. The idea is to connect a couple of experts or people with the same interest for a new app who then work together in a rather short amount of time (six weeks?) on an initial release. In this model they wouldn’t work fulltime on it, but would spend a significant amount of time each day on it. This residency would be virtual so that nobody needs to travel. The good thing about this model is that I imagine many of these original authors to be motivated to continue to work on this project even after the six weeks.

 At DNUG this week Daniel Reichelt and Andreas Schulte told me another exciting idea. They are thinking about a BarCamp ([see here](http://en.wikipedia.org/wiki/BarCamp)) for Notes/Domino app dev. A result of such a bar camp could be a new project iteration 1.

 3. Development contests   
 Development contests are a good mechanism to create a new buzz around Notes/Domino app dev. Especially younger developers could be interested in learning about Notes/Domino and winning some awards. With Eclipse on the client and XPages on the server (and soon on client) Notes/Domino can certainly be attractive for younger developers to implement standard based apps leveraging modern technologies.

 For legal reasons IBM could not host development contests, but since OpenNTF is an Alliance of multiple members this is possible now. It would be good to even host contests more than once but we need to find out how we reward people. Free Lotusphere tickets and maybe flight tickets for example could be awards. We should also blog about the best contributions and give the authors visibility. For some authors it could even be incentive enough if they may present their sample to the steering committee. I’d expect a lot of submissions that we’d then of course make available on OpenNTF for everyone.

 These contests could have different categories:   
 – simple widgets   
 – comp app components and plugins   
 – full comp apps   
 – XPages reusable controls   
 – full XPages based apps

 4. More re-usable controls   
 OpenNTF should provide many more re-usable controls. Full applications are important to demonstrate business value of Notes/Domino and to use them as they are or as starting point for applications for customers/ISVs. I think re-usable controls are as important. They can be re-used easily by everyone to build new applications. I personally use these building blocks a lot when writing apps. I don’t want to implement everything from scratch and I don’t want to understand a full applications first that I then need to modify a lot.

 I’ve published two of such re-usable controls [here](http://openntf.org/internal/ontfcatalog.nsf/topicThread.xsp?action=openDocument&documentId=A9896FCC3D0C4181852575B300351C7E) and [here](http://openntf.org/internal/ontfcatalog.nsf/topicThread.xsp?action=openDocument&documentId=1E2EC47B21240626852575AE00661133). You can imagine how easy it is to provide new re-usable XPages controls just by wrapping some of the cool DoJo functionality in custom controls and make it even easier to use DoJo within XPages. You can imagine the same kind of wrapper XPages custom controls for other components like Flex etc.

 I expect a lot of new controls contributed by IBM over the next months. My management has asked internally people in the Notes/Domino team to contribute assets to OpenNTF this year. I also expect contributions of reusable controls from people in the community since they are easy to implement, people get visiblity and they are mostly less problematic (legally and business vice) to contribute compared with full blown apps.