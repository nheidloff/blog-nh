---
id: 95
title: 'Some impressions from DNUG'
date: '2008-11-05T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/some-impressions-from-dnug/'
permalink: /article/some-impressions-from-dnug/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/08.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/some-impressions-from-dnug/
dsq_thread_id:
    - '4316384277'
categories:
    - Articles
---

 Yesterday I had my composite application session at DNUG. At the beginning I asked 1. how many people have heard about composite applications, 2. how many have seen samples and 3. how many have tried composite applications. I was positively surprised that by now almost all people have heard about composite applications and have seen samples. Out of the 60 people 50% have even tried to build applications. I think this is a positive trend if I compare this with previous events.

 In my session I gave many different demos. I showed the composite application component library, the public component catalog on openntf.org, the new Notes 8.5 features and I demonstrated the Notes and Symphony containers that we’re trying to publish sometime after 8.5. I showed how the Notes container can be used to publish values from documents when view entries are selected. A design partner who has deep knowledge about composite applications remembered our philosophic discussions we had 2-3 years ago regarding transformations of datatypes. At that point we decided not to ever do this, but he pointed out that with @Formulas in the Notes container we basically do this now.

 After the session many people told me that they liked another demonstration a lot where I showed how you can run iWidgets from Lotus Mashups in Lotus Notes. They wanted to know whether we will deliver this in the next dot release.

 At the evening event I was asked how you could put the personal names and address book and another list of contacts from a custom Notes database in the sideshelf. Since the ‘add to sideshelf’ function doesn’t work yet for Java views I showed that person how you could add these two views to the sideshelf via composite applications. We just put the two components via the CAE in the sideshelf and made it part of the mail composite application. Since mail is opened all the time the two contacts views show now always up in the sidebar.

 I was also asked to fix the issue that we cannot deploy widgets (the extension.xml) as part of the composite application. The business partner doesn’t want users to manually install the widget separately but they do want end users to install the whole app (and not the admin via catalog).