---
id: 302
title: 'Use Domino and XPages for your Social Business'
date: '2011-07-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/use-domino-and-xpages-for-your-social-business/'
permalink: /article/06272011023547AMNHE9RF.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/06272011023547AMNHE9RF.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316581639'
categories:
    - Articles
---

 At Lotusphere 2011 the big theme was social business. Lotus Domino and XPages are a key part of this agenda.

 Ed Brill published on his [blog](http://www.edbrill.com/ebrill/edbrill.nsf/dx/new-gartner-report-notes-and-domino-next-a-glimpse-into-ibms-collaboration-future) a link to a recent report from Gartner. I recommend reading it if you haven’t done yet, esp. the parts about XPages. Ed highlights one statement from that report: “The evolution of Notes and Domino highlights the broader shift in the collaboration market toward a blending of traditional collaboration services with newer social constructs and business applications – all accessible via mobiles, browsers and rich clients.”

 There is also an [IBM white paper](ftp://public.dhe.ibm.com/common/ssi/ecm/en/epw14007usen/EPW14007USEN.PDF) which talks about the strategic importance of XPages for IBM and there is a lot of progress in this area. For example IBM announced recently [four major extensions](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8J2V3G) to XPages (relational database support, REST APIs, mobile controls and new social infrastructure) and Ed Brill (pre-)announced a new [XPages Application Server](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8GZDQN) for ISVs.

 But even with all the new things happening you can build social applications using Domino and XPages today. I like how Elguji describes this in their paper [“The Social Software Platform you already own”](http://elguji.com/ideajam/elguji/elguji.nsf/Images/BELT-88DLDS/$File/The%20Social%20Software%20Platform%20You%20Already%20Own.pdf).

 Recently I talked with the business partner [Intranet Consulting](http://www.intranet-consulting.at/). They have built a very impressive set of social applications for financial institutions. All based 100% on Domino and XPages but reusing LotusScript business logic from previous releases. They have their own enterprise internal business wall, followers, wiki, etc. and mobile solutions for the main content. They describe the solution as “Safebook brings the Best from the Consumer Web into Business”.

 Here is a [nice presentation](http://prezi.com/cz3laeuu0twu/social-media-project-safebook/). The screenshots are in German but you should be able to understand the main concepts.

![image](/assets/img/2011/07/safebook.gif)

 “i-Apps”, social Apps (CRM, financial advisory, loan processing, …) with intelligent UI, interactive dashboards, etc.   
 “i-Tweet”, Enterprise internal wall, internal microblogging, information push-technology, activity streams, etc.   
 “Xnames”, kind of internal Xing, communities, groups, follower, following   
 “Produpedia”, a sales Wiki, product and sales knowledge base, commenting, rating, tagging, blogging, etc.   
 “iBank on iPad or iPhone”, mobile solutions

 As the referenced announcement above states we’ll soon publish a major new release of the [Social Enabler](http://socialenabler.openntf.org/) project. This release will make it very simple to connect to social networks and other REST based services, hiding complexity like OAuth authorization etc.