---
id: 303
title: 'Why should you use XPages and for which Applications?'
date: '2011-07-21T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/why-should-you-use-xpages-and-for-which-applications/'
permalink: /article/07182011052343AMNHED2E.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/07182011052343AMNHED2E.htm/
dsq_thread_id:
    - '4316582723'
categories:
    - Articles
---

 I get often asked why companies should use XPages vs classic Notes/Domino app dev and whether and why they should modernize existing applications using XPages. Here are a couple of points that I bring up in these discussions.

 First of all if you are happy with your existing Notes/Domino applications and you have no new requirements then there is really no need to touch them.

 For new applications I think it’s kind of obvious why XPages should be used. When deciding whether to modernize existing applications you should consider the following points.   
 **Extend the Reach**   
 Obviously it makes sense to use XPages if you want to provide web access to your rich client applications since not everyone has a rich client. The nice thing is that you can implement the XPages web user interface without having the touch the existing code and the data model and run the different UIs in parallel.   
 Also XPages make it much easier to build mobile apps for smartphones and tablets. Check out the [Mobile Controls project](http://mobilecontrols.openntf.org/) and soon the [out of the box controls](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-8J2V3G).   
 **Leverage Standard Skills**   
 XPages development is standard web app dev – HTML, CSS, JavaScript, Java, JSF. So it’s much easier to find new developers without having to train them a long time first. Also often bigger customers have other development teams who have already these skills so these teams can help each other and potentially leverage each other’s libraries/assets.   
 Furthermore the ability to program business functionality with Java is a huge advantage in my opinion. There are so many open source and commercial libraries out there making it likely to find reusable code so that you can focus on your specific requirements. The Eclipse IDE’s Java perspective makes coding and debugging in Java very easy.   
 **Improve the User Acceptance**   
 Many rich client applications including the out of the box templates look often dated. Domino’s biggest strength to be able to run old applications written for old versions is also it’s biggest weakness. Other platform providers require their customers to update applications frequently. The good thing with this is that the applications are often also modernized in this context.   
 With support for themes and stylesheets applications can be made look really good and by using these standard techniques rich client applications can look and feel in the web like other corporate applications. There is also much more flexibility in terms of UI design, e.g. you can have a navigator at the top. With controls from Dojo or other JavaScript libraries these user interfaces can be as rich as classic rich client applications.   
 **Be Part of your Company’s Strategy**   
 XPages are continuously being improved and extended. There are many new features in 8.5.3 and IBM delivers regular updates and bigger new functionality to OpenNTF before the Next release. There is also a huge community around XPages including open source, videos, blogs, etc. If you have a problem it’s likely that you find the solution in the internet by now and the XPages dev team is eager to hear new requirements or defect reports from you. All of this is not to say that you don’t get any of this for classic Notes/Domino app dev but I guess it’s fair to say that it’s much more likely for XPages.   
 Also in addition to the IBM strategy customers should better be able to communicate internally why they want to use Domino and have better chances to get more internal Domino based projects since Domino is no longer something proprietary or old.   
 **Use new technical Options**   
 Since XPages is standards-based you can easily integrate other applications and technologies, e.g. through REST services, relational database support, etc. This allows for example to integrate and use other IBM products like Connections, reporting, etc. and non IBM products.   
 Additionally there is many more new functionality compared to classic app dev. For example: all properties are dynamically calculable, internationalization is much simpler, there is built in Ajax functionality, modularization can be done through custom controls, there is a clean separation of data, business logic and UI, you can write real servlets and XPages agents, there is active content filtering, you can join data from multiple sources on one page, since 8.5.3 resource files are automatically merged, etc.

 So my personal recommendation is to use XPages for all future applications. For existing Notes and Domino applications you need to determine whether you want to modernize them and this is probably more likely for Notes applications.