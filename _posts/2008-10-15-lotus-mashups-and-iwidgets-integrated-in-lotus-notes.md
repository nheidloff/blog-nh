---
id: 88
title: 'Lotus Mashups and iWidgets integrated in Lotus Notes'
date: '2008-10-15T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/lotus-mashups-and-iwidgets-integrated-in-lotus-notes/'
permalink: /article/prototype-lotus-mashups-and-iwidgets-in-lotus-notes/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/01.html'
custom_permalink:
    - article/prototype-lotus-mashups-and-iwidgets-in-lotus-notes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316393899'
categories:
    - Articles
---

 Most of you have probably heard about Lotus Mashups (see [here](http://www-01.ibm.com/software/lotus/products/mashups/) and [here](http://www-10.lotus.com/ldd/mashupswiki.nsf)). Lotus Mashups are very similar to composite applications in Lotus Notes and Expeditor. Mashups are as composite applications assemblies of components/widgets. You can think of mashups and composite applications as the same fundamental concept. They are just different implementations for different platforms. Mashups contain iWidgets that are accessed via a web browser. Composite applications contain components/widgets that are accessed via a rich client. Personally I see composite applications as a superset of mashups because composite applications can support all components/widgets mashups support but in addition they also allow you to embed rich client applications, e.g. MS Excel, Lotus Symphony or native applications.

Lotus Mashups are targeted to empower business users to assemble their own mashups on demand without programming. This has also always been the goal of composite applications. You can certainly argue whether or not mashups and/or composite applications can actually be defined by business users today. In reality I haven’t really seen this yet. I still think that we can make this happen for certain types of applications but we need to add certain things. We certainly still need to improve our tools like CAE to really allow business users to define components there. The main missing thing however are reusable components. We have 40 reusable composite application components on OpenNTF.Org and there is the growing ‘sidebar widget’ catalog on OpenNTF.Org but we need more.

This was my main motivation to implement a prototype that shows how to re-use the growing number of iWidgets in composite applications. The prototype shows how to select iWidgets running on Lotus Mashups from the Composite Application Editor. You can then put an iWidget as a component in a composite applications. IWidgets have like composite application components build-time properties that you can use to define different behavior for the same component in two different applications. And iWidgets have also outgoing properties/events and they provide actions/incoming events.

The following screenshots show a simple sample. My colleague Ashok C Mammen extended my original implementation, for example the authentication and JavaScript to Java bridge. The sample shows how a composite application component can talk to an iWidget but the prototype supports also the other direction.

In this sample I put my Notes contacts view. The address of the selected person is published to the iWidget in the sidebar that shows a map. This map iWidget comes with Lotus Mashups out of the box.

![image](/assets/img/2008/10/1_070101F007027C04001D925B852574E3.gif)

Here is how the iWidget looks in a mashup.

![image](/assets/img/2008/10/1_07010F2407010CE4001D925B852574E3.gif)

In order to select an iWidget a component provider in CAE has been implemented. You can now point to a Lotus Mashup server, navigate through the categories of iWidgets and then select a specific one.

![image](/assets/img/2008/10/1_07011E6407011B80001D925B852574E3.gif)

The incoming and outgoing events of iWidgets are automatically mapped to properties and actions so that you can create wires to and from iWidgets as from any other types of composite application components.

![image](/assets/img/2008/10/1_07012DA807012AC4001D925B852574E3.gif)

At this point we’re trying to contain this functionality in Lotus Notes 8.5.1/Expeditor 6.2.1 but the plans are not final yet.