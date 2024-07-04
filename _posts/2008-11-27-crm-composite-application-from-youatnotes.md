---
id: 128
title: 'CRM Composite Application from YouAtNotes'
date: '2008-11-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/crm-composite-application-from-youatnotes/'
permalink: /article/27.11.2008022140NHEAN5.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
custom_permalink:
    - article/27.11.2008022140NHEAN5.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316408451'
categories:
    - Articles
---

 Julian Buß from [YouAtNotes](http://www.youatnotes.de/) has sent me a preview of their CRM composite application. He wrote that they want to release it at the beginning of next year or even earlier at the end of this year.

He uses already the new capability in Lotus Notes 8.5 to put sidebar components in composite applications. I also like the approach that data from Notes databases is rendered via HTML and JavaScript libraries which is easy, based on common programming skills and pretty impressive what visual things you can do with it.

The text below is from Julian.

![image](/assets/img/2008/11/1_095FD7C0095FD3EC002892DE8525750E.gif)

From Julian:   
&lt;  
When a user is in the contact view, the first sidebar component displays contact data like phone numbers and the address. So the user has every important information at his hands without the need to open the contact document.   
This component is a standard Notes form which received the Notes ID of the selected document from the view via Property Broker. It then gets the backend document, extracts some data and displays it in the form.

After that this form walks through other CRM databases (ticket system, sales etc.) and collects data regarding the contact from them. From this data it generates HTML and sends it via Property Broker to the second component, a managed browser.

This browser component displays the HTML and the user can then interact with it: the user can click on some headline and then the section opens and displays data. The user can click for example on titles to open the appropriate Notes document. We are using the jQuery javascript framework to have some nice looking effects when opening/closing the sections.

The beauty in this approach is that everything is very fast: the user just selects someone in the view, then the view only needs to publish the Note ID to the PropertyBroker. Everything else is being done asynchron and the user does not have to wait. Even if the second component needs some seconds until it has all data collected, it does not disturb the user.

And for the user it’s very, very useful – he does not need to open anything else, he does not have to wait – just select a contact and he can see every important information from the whole CRM software in one place.&gt;&gt;