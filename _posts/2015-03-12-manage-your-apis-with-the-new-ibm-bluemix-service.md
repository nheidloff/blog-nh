---
id: 1154
title: 'Manage your APIs with the new IBM Bluemix Service'
date: '2015-03-12T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/manage-your-apis-with-the-new-ibm-bluemix-service/'
permalink: /article/manage-your-apis-with-the-new-ibm-bluemix-service/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
dsq_thread_id:
    - '4329595040'
custom_permalink:
    - article/manage-your-apis-with-the-new-ibm-bluemix-service/
accesspresslite_sidebar_layout:
    - right-sidebar
categories:
    - Articles
---

 There has been and is a lot of talk about the [API Economy](https://developer.ibm.com/apimanagement/docs/api-101/api-economy/). APIs provide new business opportunities for companies, new ways to provide services and new ways to sell and promote products. Watch the [video](http://heidloff.net/nh/home.nsf/article.xsp?id=12.03.2012103808NHEDBE.htm) from Sam Ramji for a great introduction to the API Economy. Here is how the IBM website describes [API economy](https://developer.ibm.com/apimanagement/docs/api-101/api-economy/):

 “The term API economy refers to the opportunities associated with productizing the exposure of your business functions as APIs. Consider that your API is a consumable product, and you need to market and position your product correctly for maximum profit.”

 IBM provides a powerful [API Management solution](https://developer.ibm.com/apimanagement/). To find out more check out the landing page for developers on developerWorks and especially the [API 101](https://developer.ibm.com/apimanagement/docs/api-101/) documentation and the [introduction video](https://www.youtube.com/watch?v=c7k65NbHEFM).

 At InterConnect 2015 earlier this year IBM announced and delivered a new [API management](https://www.ng.bluemix.net/docs/#services/APIManagement/index.html#gettingstartedapim) service as beta for [IBM Bluemix](http://bluemix.net/). I tried the service quickly and I really like it. Below are some highlights.

 After you’ve added the API management service in Bluemix you can open an API management dashboard where you can define your APIs. In order to do this you can compose new API definitions manually or import Swagger 2.0 or WSDL definitions. I just defined my own test API which is only a passthrough to [Bluemix.info](http://www.bluemix.info/api/curatednews) to get a list of curated news. As part of this step you can also define how consumers can access the API, for example whether a client id and secret are required and what type of authentication should be used.

![image](/assets/img/2015/03/apim1.png)

 In the next step you create plans where you can define things like rate limits for your APIs. When the plans are published you can define who to make these plans available to, for example by entering the names of Bluemix organizations.

![image](/assets/img/2015/03/apim2.png)

 After this the APIs will show up in the Bluemix catalog under a new category “Custom APIs”.

![image](/assets/img/2015/03/apim3.png)

 In the next step Bluemix developers can learn more about the provided API and select a plan.

![image](/assets/img/2015/03/apim4.png)

 As result the API is added to your Bluemix application and you get 1. the URL for the API and 2. a client id and secret.

 There is also a separate portal for consumers of the API to find out details about the API as well as an API explorer to invoke the API for testing purposes.

![image](/assets/img/2015/03/apim5.png)

 Once you use this service you can then easily track who is using which APIs, how often, when, etc.

![image](/assets/img/2015/03/apim6.png)