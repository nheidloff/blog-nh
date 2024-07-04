---
id: 127
title: 'New OpenNTF catalog ideas'
date: '2009-02-25T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/new-openntf-catalog-ideas/'
permalink: /article/25.02.2009084311NHEJ4J.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/10.html'
custom_permalink:
    - article/25.02.2009084311NHEJ4J.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316406854'
categories:
    - Articles
---

 OpenNTF has many great samples. I’ve heard from some people though that it is not always easy to find the ones you are looking for. That’s why I’d like to provide a new catalog on OpenNTF. Below are some screenshots from a prototype with some ideas how such a catalog could look like.

This catalog contains three different types of assets/sample code:

1\. Rich client components   
For Lotus Notes end users, application assemblers and people who want to demonstrate Notes value: Components, widgets and plugins that can be installed into the Notes client by browsing a catalog and dragging and dropping components into Notes. The components can show up in the Notes sideshelf, as pop up windows triggered by live text or any other more sophisticated Notes extensions (e.g. menu contributions). These components also contain the sources that can be downloaded by developers.

2\. Reusable controls   
For developers: Controls that can be re-used in custom application. The sources of these controls can be downloaded and used in IDEs like Domino Designer or Eclipse based IDEs. Reusable controls can be sets of design elements, Java classes or just snippets of code. These types of samples/snippets are basically extensions to the current code bin on OpenNTF.Org.

3\. (Last releases of) Projects   
For developers and people who want to demonstrate Notes/Domino value: Templates (NTFs) and applications (NSFs) that can be run locally demonstrating sophisticated technical capabilities and value of Lotus Notes/Domino as application development platforms. The projects are managed outside of this catalog. The catalog contains the last releases of projects and their descriptions.

Here is how the entry point could look like.![image](/assets/img/2009/02/1_0BBA01F00B90DE84004B676985257568.gif)  
See here for full screenshot: [cat01.jpg](http://heidloff.net/nh/home.nsf/cat01.jpg/$file/cat01.jpg "cat01.jpg")

The idea is that you can find samples in different ways. Most importantly I think is the full text search functionality. You can also browse one of the views with the different types of samples and then sort by committer, updated, rating and amount of downloads. Additionally samples can be tagged and found via a tag cloud. Notice that committers also show up here to give them visibility.

The next screenshots shows some projects.   
![image](/assets/img/2009/02/1_0BBA15E40BBA1300004B676985257568.gif)  
See here for full screenshot: [cat03.jpg](http://heidloff.net/nh/home.nsf/cat03.jpg/$file/cat03.jpg "cat03.jpg")

From the views you can open samples, e.g. this Notes plugin.   
![image](/assets/img/2009/02/1_0BBA250C0BBA2228004B676985257568.gif)  
See here for full screenshot: [cat02.jpg](http://heidloff.net/nh/home.nsf/cat02.jpg/$file/cat02.jpg "cat02.jpg")

That page shows other contributors, all tags, license information, test platforms, etc. I’d like to make the description and screenshots mandatory since only then other people can actually find something.

Here is another sample which is the last release of a project.   
![image](/assets/img/2009/02/1_0BBA3B280BBA3844004B676985257568.gif)  
See here for full screenshot: [cat04.jpg](http://heidloff.net/nh/home.nsf/cat04.jpg/$file/cat04.jpg "cat04.jpg")

What you can only see in the full screenshots is the right column of the catalog entries. In the right column users can perform actions. For rich client components they can install the components directly by dragging and dropping the install icon onto the Lotus Notes My Widgets sidebar panel. They can also download the sources from here.   
![image](/assets/img/2009/02/1_0BBA4B680BBA4884004B676985257568.gif)

For projects they only see a download link and another link to open the actual project.   
![image](/assets/img/2009/02/1_0BBA57280BBA5444004B676985257568.gif)

Via the right column users can also add response documents to comment on the samples. Furthermore they can rate the samples by clicking on one of the stars.   
![image](/assets/img/2009/02/1_0BBA632C0BBA6048004B676985257568.gif)  
Once rated you would see how you’ve rated.   
![image](/assets/img/2009/02/1_0BBA6BAC0BBA68C8004B676985257568.gif)

From what I’ve heard one of the problems of the current sidebar widget catalog on OpenNTF is that there are too many non working samples in it. I think we need to assure at least a minimum level of quality. At a minimum we should make sure that there is a short description and screenshot(s). I also think there should at least be one person who has verified that the sample at least comes up on a certain target platform. Nothing is more frustrating than loosing time to find samples, then installing them and finding out they don’t even work.

So I think OpenNTF should have a role which can be performed by certain people to do this bring up work/testing. In a first iteration we could ask people to send mails to an OpenNTF email address with their samples so that people with this role can receive new samples from there. In a later iteration we could extend the catalog with an upload capability over the web and a staging area. People with the role can then claim the samples they have time to evaluate from there and approve or reject them. In this context we probably also have to do due diligence etc (more later). For projects it should be as easy as a one click thing to add the latest release of a project to the catalog.

I’d also like to move more content from the existing projects database, the code bin etc. in this new catalog over time but since this is quite some work it would be a longer-term thing. In this context I’d also like to change as many as possible samples to use the one widely used open source license that OpenNTF suggests to allow easy re-use of code from OpenNTF in other projects or commercial applications.