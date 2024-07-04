---
id: 1644
title: 'Assembling REST APIs with the API Management Service on Bluemix'
date: '2015-11-30T07:28:49+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1644'
permalink: /article/assembling-rest-apis-with-the-api-management-service-on-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4362150070'
custom_permalink:
    - article/assembling-rest-apis-with-the-api-management-service-on-bluemix/
categories:
    - Articles
---

With the [API Management service](https://www.ng.bluemix.net/docs/services/APIManagement/index.html) in [Bluemix](https://bluemix.net) you can easily manage and monitor APIs. The service can be used as proxy to API implementations where the APIs exposed via the service to developers and the interfaces of the underlaying implementations are essentially identical. Additionally you can assemble new APIs declaratively via a web interface and invoke multiple REST APIs internally before the results are sent to the applications.

This functionality is useful in different scenarios. For example you can assemble coarse grained APIs to group various API calls before results are sent to mobile clients to reduce the number of network requests. The functionality also allows non-programmers to merge APIs from different providers and massage the data graphically.

Below I extend the samples from the previous articles where I showed how to develop APIs with Spring Boot and Node.js and how to deploy them to Bluemix as Docker containers. Rather than calling the two hello world REST APIs built via Java and Node, an API client only calls one new API provided by the API Management service.

To learn how to build the hello world APIs check out these articles.  
[Usage of Swagger 2.0 in Spring Boot Applications to document APIs]({{ "/article/usage-of-swagger-2-0-in-spring-boot-applications-to-document-apis/" | relative_url }})  
[Deploying Spring Boot Applications to Bluemix as Docker Containers]({{ "/article/Deploying-Spring-Boot-Applications-to-Bluemix-as-Docker-Containers" | relative_url }})  
[Management of APIs with IBM Bluemix]({{ "/article/management-of-apis-with-ibm-bluemix" | relative_url }})  
[Usage of Swagger in Node.js Applications to document APIs]({{ "/article/usage-of-swagger-in-nodejs-applications-to-document-apis" | relative_url }})  
[Deploying APIs built via Node.js to IBM Bluemix]({{ "/article/deploying-apis-built-via-nodejs-to-ibm-bluemix" | relative_url }})

After you’ve defined the API metadata like names, paths and authentication you can choose “Assemble” as the implementation option. In the left column the first two entries define the get requests that are invoked.

![image](/assets/img/2015/11/apimassemble2.png)

Here is how to map the input parameter of the wrapper API with the input parameter of the first get request.

![image](/assets/img/2015/11/apimassemble3.png)

The first get request calls the hello world resource built with Java, the following second one the resource built with Node.

![image](/assets/img/2015/11/apimassemble4.png)

The input parameters are mapped again. Note that you cannot only map from the wrapper API to the second get request, but you can also use the output values of the first get request as input to the second request.

![image](/assets/img/2015/11/apimassemble5.png)

In the last step you define the output of the wrapper API by using (some of the) outputs of the two get requests.

![image](/assets/img/2015/11/apimassemble6.png)

Application developers can try the new API from the developer portal.

![image](/assets/img/2015/11/apimassemble1.png)

To find out more about API assembly check out the [documentation](http://www-01.ibm.com/support/knowledgecenter/SSZFB2_3.0.1/com.ibm.apimgmt.apionprem.doc/task_APIonPrem_implementresource.html) or the [tutorial](https://developer.ibm.com/apimanagement/wp-content/uploads/sites/23/2014/07/3001.2.RESTAssemblyWithAPIManagement3.pdf).