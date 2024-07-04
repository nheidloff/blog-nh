---
id: 31
title: 'Atom to access services in Lotus Notes'
date: '2008-10-08T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://s600643527.online.de/article/atom-to-access-services-in-lotus-notes/'
permalink: /article/08.10.2008015347NHE8X6.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/08.10.2008015347NHE8X6.htm/
dsq_thread_id:
    - '4316334277'
categories:
    - Articles
---

[Yesterday I wrote](http://heidloff.net/nh/home.nsf/07.10.2008044537NHECAK.htm "07.10.2008044537NHECAK.htm") about how data in web applications can be replicated locally using Notes replication. Replicating the data is the prereq for offline web applications. The next thing is how you access data in Notes and/or Expeditor from your local web applications.

There are different options to do this. In this blog entry I want to describe one option which I think is the most typical and common one for web applications. Again, what I want to show with this prototype is that Notes/Domino is open, state of the art and not proprietary. So I’ve interviewed different experts in this area and the majority of them pointed me to [Atom and the Atom Publishing Protocol (APP)](http://en.wikipedia.org/wiki/Atom_(standard)). For example [Lotus Connections provides an Atom API](http://www.ibm.com/developerworks/lotus/library/connections-deploy-pt7/?S_TACT=105AGX13&S_CMP=ART).

As far as I’ve heard the Atom format and protocol are not the most mature technologies yet. It sounds like there are still lots of issues around collections and their sort orders, handling of multiple attachments, etc. And as soon as you use more than just the standard you need to add your own tags/schema. Many people consider these issues only point in time issues that will be fixed. Without going in more detail, I’m not saying Atom is the best technology on earth, but it is the mostly used technology to do remote calls to read and write data for web applications today. I think the reason for this success is exactly the simplicity.

Because of these issues it might be difficult for Notes/Domino to provide all services as Atom feeds out of the box very soon. However for custom applications there are different ways you can build services that return feeds to web applications.

For many people maybe the simplest mechanism is just to use a Notes agent. Let’s take this [simple sample feed](http://heidloff.net/nh/home.nsf/feed_getfeed.txt/$file/feed_getfeed.txt "feed_getfeed.txt") that I took from Lotus Mashups. A Lotus Notes agent can very easily return this as a feed. The key is to do a ‘Print “Content-type:text/xml”‘ so that the agent doesn’t add the HTML headers. Here is the [agent sample code](http://heidloff.net/nh/home.nsf/notesagentgetfeed.txt/$file/notesagentgetfeed.txt "notesagentgetfeed.txt"). The agent uses an [URLclass](http://www.bleedyellow.com/blogs/texasswede/entry/parse_url_in_domino_agent) that I’ve found in the internet (sounds like Karl-Henry Martinsson implemented it). If you want to run a local agent the nhttp.exe needs to run as described yesterday.

![image](/assets/img/2008/10/1_0620F0700620D7F40021916F852574DC.gif)

As an alternative you can also implement services that return feeds as Java servlets running in Lotus Expeditor/Notes. When launching Notes you need to enter these VM arguments to launch the local web container. -Dcom.ibm.pvc.webcontainer.port=8778. I think someone told me that it should be enabled by default but I haven’t tried this.  
In the Eclipse IDE you can create a plugin with such a [plugin.xml](http://heidloff.net/nh/home.nsf/servletextensionpoint.txt/$file/servletextensionpoint.txt "servletextensionpoint.txt"). You can then simply use a standard servlet. This servlet could talk back to NSFs via the notes.jar. If you want you can also use [Apache Abdera](http://incubator.apache.org/abdera/) to get convenience functionality to handle Atom. I like Abdera and would like to have this for LotusScript as well.

![image](/assets/img/2008/10/1_0620FA680620D7F40021916F852574DC.gif)

On the consumer side (in your web application) you can use your JavaScript library of choice. I’ve used DoJo. However I couldn’t find a simple way to call feeds with DoJo that would work for both IE and Firefox. So I’ve implemented a [convenience JavaScript file](http://heidloff.net/nh/home.nsf/NotesDoJo.js/$file/NotesDoJo.js "NotesDoJo.js") that abstract this. In my HTML file I can then easily navigate through the feed.

![image](/assets/img/2008/10/1_0620FFA40620D7F40021916F852574DC.gif)