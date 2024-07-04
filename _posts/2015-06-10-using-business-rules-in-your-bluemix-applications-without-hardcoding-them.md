---
id: 1312
title: 'Using Business Rules in your Bluemix Applications without hardcoding them'
date: '2015-06-10T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/using-business-rules-in-your-bluemix-applications-without-hardcoding-them/'
permalink: /article/10.06.2015172815NHEL69.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/10.06.2015172815NHEL69.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323213711'
categories:
    - Articles
---

 [IBM Bluemix](https://bluemix.net/) provides a service to define [business rules](https://console.ng.bluemix.net/?direct=classic/#/store/cloudOEPaneId=store&serviceOfferingGuid=b13b9cf8-fff8-4e3a-b794-acf3558b91f9&fromCatalog=true) external to your application code. This allows changing rules more dynamically without having to recompile and redeploy the complete application.

 There is plenty of documentation available that I won’t repeat here: [Business Rules documentation](https://www.ng.bluemix.net/docs/#services/rules/index.html), [developerWorks articles](http://www.ibm.com/developerworks/topics/business%20rules%20service) and [samples and tutorials](https://hub.jazz.net/project/rulesservicesample/Samples%20and%20Tutorials/overview). Below is just a quick summary for what this service can be used and how to leverage it in Bluemix.

 The example I’m using is from an article [Build a hotel booking application](http://www.ibm.com/developerworks/cloud/library/cl-hotel-rules-app/index.html) which provides a detailed description how the service works. In this scenario a business rule is defined to determine the pricing of a hotel based on the date of the booking offering early booking discounts or last-minute offers. With the business rules service this can be done without low level programming skills using a Rule Designer plugin in Eclipse.

![image](/assets/img/2015/06/rules0.png)

 After the service has been created in Bluemix, you can get your connections settings.

![image](/assets/img/2015/06/rules2.png)

 In Eclipse you need to use these settings when deploying the rule to Bluemix from your IDE.

![image](/assets/img/2015/06/rules1.png)

 After the rule has been deployed to Bluemix, you can execute it via REST APIs. There is a [Java sample](https://www.ng.bluemix.net/docs/services/rules/index-gentopic3.html#rulov008) that shows how to do this. You can also invoke the rule and receive the results in a [Node-RED](http://nodered.org/) flow. Check out the [sample flow](http://flows.nodered.org/flow/b5bef3c1a8823d00ccd4). The dashboard of the service also provides an easy way to test the service.

![image](/assets/img/2015/06/rules3.png)