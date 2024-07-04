---
id: 30
title: 'Offline web applications in Notes'
date: '2008-10-07T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://s600643527.online.de/article/offline-web-applications-in-notes/'
permalink: /article/07.10.2008044537NHECAK.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/07.10.2008044537NHECAK.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4317545813'
categories:
    - Articles
---

Yesterday I gave an introduction to the [Notes plugin for Aptana Studio](http://heidloff.net/nh/home.nsf/06.10.2008010458NHE7YP.htm "06.10.2008010458NHE7YP.htm"). Today I describe in more detail the offline aspects of the prototype. While I actually used Aptana Studio to write the HTML and JavaScript files, this blog entry describes the runtime aspects of the prototype which Notes could even provide when using other development tools.

As the demonstration of the Yahoo rich text editor shows ([see here](http://heidloff.net/nh/home.nsf/aptanaprototype.htm/$file/prototype.htm "aptanaprototype.htm")) you can easily run web applications in the Notes client. In addition to this however Notes adds value in several ways. One benefit of putting web applications in NSFs is that they can be managed like all other NSFs. You get the great deployment functionality from Notes/Domino, you can set access control, etc.

The key thing that Notes adds though is offline. I’ve seen some solutions from other companies in this space to take web applications offline. They mostly extend the web browsers through plugins and provide small relational databases. The advantage of these solutions is that you don’t have to install another standalone rich client application (as you have to install Notes in this prototype). The disadvantage of these alternatives however is that I’ve seen no built-in replication. I think replication in Notes/Domino is just outstanding. You get replication for data in Notes databases completely for free. This even works between different versions on client and server. Have you ever tried to synch data between different versions of relational databases? It is really hard. And you don’t only get replication for free but you get a highly tuned, optimized and secure replication mechanism.

In order to make these offline features of Notes available I’ve provided some JavaScript helper functions. Most of the offline functions are in Notes.js. I’ve put other functions in NotesDoJs.js that I’ll describe more in another blog entry.

[See here for the source of the hello world sample application.](http://heidloff.net/nh/home.nsf/HelloWorld.html/$file/HelloWorld.html "HelloWorld.html")

In my sample I use two web servers. One web server is my Domino server running on my local machine on port 8080. The other web server is nhttp.exe that comes with Domino Designer. It listens to port 80. Before Notes is launched from the Aptana IDE I launch the nhttp.exe from the IDE. The addresses and ports are still hardcoded in my sample and would have to be abstracted in a real product.

![image](/assets/img/2008/10/1_080846C40A7D820C00302A53852574DB.gif)

In order to make a web application offline ready the web application needs to call ‘n\_setupOffline’. This creates a local replica. As callback you pass in another JavaScript function that you want to be called asynchronously when the replica has been created. In order to switch between offline and online two other functions are called ‘n\_goOffline’ and ‘n\_goOnline’. These functions switch the URLs and they trigger replication.

My prototype uses another prototype that allows communication between JavaScript in the embedded browser and the Java classes/services running in Expeditor/Notes. This is necessary so that I can initiate replication between client and server on behalf of the current Notes user. This JavaScript to Java bridge (two directional) needs to provide good security mechanism to allow Domino administrators to determine which applications may call which services of Notes. We’ve implemented some ideas which I could describe in more detail if people are interested.

I’d like to get feedback again as to whether you think that such a JavaScript library to make web applications offline available would be desirable in Notes.