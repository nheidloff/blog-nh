---
id: 97
title: 'Feedback needed: Open catalogs for Lotus Notes/Domino applications'
date: '2008-11-10T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/feedback-needed-open-catalogs-for-lotus-notesdomino-applications/'
permalink: /article/10.11.2008094250NHEK9T.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/10.11.2008094250NHEK9T.htm/
dsq_thread_id:
    - '4316380628'
categories:
    - Articles
---

 Everyone, I’m working with a couple of colleagues on ideas how we can help the Notes/Domino application development community to continue to grow. I’ll post more about our general goals and ideas in the next weeks. Today I want to focus on a key component for our community – open and public catalogs. I’m convinced that public and open catalogs help our community and all of us to succeed. Very often people implement useful and cool things that they or their company cannot or don’t want to make money with. Many other people could benefit from these things if there were easy ways to share them.

 Even today there are already many different catalogs. In addition to the ones listed below many people also post things on their own web sites. I think this is to work around legal issues and/or to promote their own companies better. I think it would be very valuable to consolidate and extend these catalogs so that there would be one place to go to in order to find Notes/Domino related samples/applications/etc. In contrast to some of the catalogs provided by IBM I’d like to have open catalogs where our community can add things.

 There are different types of catalogs with different things for different audiences:

 1. For developers: Samples with source code   
 Samples can be as easy as snippets of code that you want to copy and paste into your IDE. More complex samples could be LotusScript routines, XPage XML, Eclipse plugins, etc. There can also be full blown sample applications that come with source code (e.g. lead manager sample comp app).

 2. For application assembler, developers and sales people: Re-usable components and controls and full applications   
 Sales people and other people who need to demo capabilities of Notes/Domino often want to run applications live. Composite application assemblers want to reuse components as binaries from public catalogs in their own applications. Notes/Domino developers want to leverage other people’s XPage custom controls, LotusScript libraries etc.   
 There is a fine line between (1) and (2). There are re-usable components that come with source code or NSFs that have the design not hidden. Other sample applications might not include code and might not even be run-able. Instead they might ‘only’ be movies, slide shows, etc.

 3. For customers: Applications and components that you can buy   
 Right now we have the Lotus business solution catalog for this purpose but I have heard some complains from people about it. I won’t focus on this type of catalog in this blog entry.

 What types of components need to be supported? I’d like to focus on everything you need for application development in Notes and Domino. I think this should include Expeditor based products since most/all of these components also run in Notes:   
 – Eclipse features/plugins: for Notes, for Symphony, for Expeditor, for Sametime   
 – Widgets (content types, recognizers, widgets): for Notes, for Expeditor   
 – Complete NSFs, NTFs (or multiple of them): for Notes, for Domino   
 – Re-usable NSF controls, esp. custom XPage controls, but also LotusScript libraries, etc.: for Domino, for Notes

 Technically we don’t start from scratch. There is already the [toolbox catalog](http://www-10.lotus.com/ldd/heidloffblog.nsf/dx/30.09.2008110213NHEKMY.htm) that can be accessed from the Notes client. Users can install Eclipse plugins, widgets and composite application components (relative) easily. This catalog is basically a list links. The Eclipse plugin binaries reside on Eclipse update sites. There are some temporary things in the catalog that we need to finish to make it simpler to use. For example there is no web UI and it is relative hard to put Eclipse components and composite application components in this catalog.   
 It would also be good to have an additional mechanism to share not only complete NSFs/NTFs but only certain design elements in their. For example in order to share XPage custom controls or LotusScript libraries it would be good to package these things up so that other developers can import them easily into their IDE. I’ll post some more later how we could do this (without running in DXL roundtrip limitations).

 In order for these things in open/public catalogs to be actually usable a couple of things need to be done:   
 – There needs to be a licence agreement in place that actually allows other people to use these things, otherwise the catalog is useless.   
 – It needs to be really easy to submit new components and share them with as little process as possible. There also needs to be some incentive (not necessarily monetary) to motivate people.   
 – There needs to be someone who actually tries submissions, categorizes them correctly, etc. None working submissions and submissions that don’t fulfill standards (e.g. mandatory screenshot) need to be removed.   
 – It needs to be possible to find things in the catalog. This includes good full text search, parametric search for what product versions the component has been tested on, etc.

 The key question is where and who should host this catalog. Since we want everyone to understand that Notes/Domino is open I think it should not be hosted by IBM. My personal preference would be OpenNTF.Org since it is the best Notes/Domino application development site in my mind. I think we should take OpenNTF.Org as a starting point and add re-usable controls like custom XPage controls, snippets of code, etc. to it.

 I’d like to see such an open catalog to be done. I’d hope that many people reply in this blog with positive feedback so that I can use this feedback to go back to my managers and check what we can do.

 P.S.   
 Existing catalogs:

 OpenNTF.Org projects   
<http://www.openntf.org/internal/home.nsf/web/projects.html>

 OpenNTF.Org toolbox catalog   
<http://www.openntf.org/internal/home.nsf/web/mywidgets.html>

 OpenNTF.Org comp app components library   
<http://www.openntf.org/Projects/pmt.nsf/ProjectLookup/Composite%20Application%20Component%20Library>

 Symphony plugins   
<http://symphony.lotus.com/software/lotus/symphony/plugin.nsf/home>

 Planetlotus.org   
<http://planetlotus.org/downloads/>

 Iris sandbox (no new submissions)   
[http://www-10.lotus.com/ldd/sandbox.nsf/ByDate?OpenView ](http://www-10.lotus.com/ldd/sandbox.nsf/ByDate?OpenView)   
[http://www-10.lotus.com/ldd/sandbox.nsf/ByProduct?OpenView&amp;RestrictToCategory=lotus+expeditor](http://www-10.lotus.com/ldd/sandbox.nsf/ByProduct?OpenView&RestrictToCategory=lotus+expeditor)

 Expeditor toolkit   
<http://www.ibm.com/developerworks/lotus/library/expeditor-toolkit/>

 Sametime code exchange   
[http://www-128.ibm.com/developerworks/exchange/dw\_categoryView.jspa?categoryID=7](http://www-128.ibm.com/developerworks/exchange/dw_categoryView.jspa?categoryID=7)

 Lotus business solutions catalog   
<http://www-01.ibm.com/software/brandcatalog/portal/lotus> or [http://www-01.ibm.com/software/brandcatalog/portal/lotus/results?catalog.catalogName=Lotus&amp;catalog.searchTerms=&amp;catalog.c=Software\_IBM\_LotusDomino\_Products&amp;catalog.start=0](http://www-01.ibm.com/software/brandcatalog/portal/lotus/results?catalog.catalogName=Lotus&catalog.searchTerms=&catalog.c=Software_IBM_LotusDomino_Products&catalog.start=0)   
<http://www-01.ibm.com/software/brandcatalog/portal/sametime> or [http://www-01.ibm.com/software/brandcatalog/portal/sametime/results?catalog.catalogName=Lotus+Sametime&amp;catalog.searchTerms=&amp;catalog.c=Software\_IBM\_LotusSametime&amp;catalog.start=0](http://www-01.ibm.com/software/brandcatalog/portal/sametime/results?catalog.catalogName=Lotus+Sametime&catalog.searchTerms=&catalog.c=Software_IBM_LotusSametime&catalog.start=0)

 Alan Lepofsky’s unofficial lists   
<http://www.alanlepofsky.net/alepofsky/alanblog.nsf/dx/application-development-tools>   
<http://www.alanlepofsky.net/alepofsky/alanblog.nsf/dx/product-catalog>   
<http://www.alanlepofsky.net/alepofsky/alanblog.nsf/dx/system-administration-products-1>