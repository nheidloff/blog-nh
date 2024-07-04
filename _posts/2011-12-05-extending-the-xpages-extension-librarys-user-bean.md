---
id: 336
title: "Extending the XPages Extension Library's User Bean"
date: '2011-12-05T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/extending-the-xpages-extension-librarys-user-bean/'
permalink: /article/08162011021746AMNHE9E7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/08162011021746AMNHE9E7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316593053'
categories:
    - Articles
---

 The [Extension Library](http://extlib.openntf.org/) comes with a concept of user beans which encapsulate profile information of users. In the context of social applications this is important since in many scenarios user profiles need to be extended with information from other social services. Typical examples are unique ids, quota information, etc.

 For example the new [LotusLive Files data source](http://heidloff.net/nh/home.nsf/dx/07212011023704AMNHE9SB.htm) requires to pass in a “subscriberId” which is the unique id of the current user. For this purpose the managed bean “userBean” has a new variable “lotusLiveSubscriberId”:

![image](/assets/img/2011/12/SocialAPIs4s.jpg)

 Developers can add their own variables to this bean by implementing the extension point “com.ibm.xsp.extlib.social.PersonDataProvider” in an Eclipse plugin. This extension point is defined in the core com.ibm..xsp.extlib project and the infrastructure in the com.ibm..xsp.extlib.social package.

![image](/assets/img/2011/12/SocialAPIs1s.jpg)

 The custom class needs to extend “com.ibm.xsp.extlib.social.impl.AbstractPeopleDataProvider” and implement the following method.   
 public Object getValue(PersonImpl person, Object key)

![image](/assets/img/2011/12/SocialAPIs2s.jpg)

 This method needs to return the specific variable for a specific person. There is a convenience method “getSyncObject()” that can be used to synchronize this call so that the same property is not read for the same person multiple times at the same time.

![image](/assets/img/2011/12/SocialAPIs3s.jpg)

 There is also a second method that can be implemented to read all properties for all users together. This speeds up the performance especially for example for scenarios with views where profile information from multiple people is displayed.   
 public void readValues(PersonImpl persons)

 The XPages infrastructure stores/caches users’ profile information. In order to read the latest values the infrastructure calls the two clear methods which developers can implement.   
 public void clear()   
 public void clear(String id)

 The [teamroom template](http://www.openntf.org/p/TeamRoom%20OpenNTF%208.5.2) uses this technique as well.