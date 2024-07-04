---
id: 1807
title: 'Watson Concept Insights Sample for Eclipse FAQ'
date: '2016-01-25T08:34:46+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1807'
permalink: /article/watson-concept-insights-sample-eclipse-faq/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/watson-concept-insights-sample-eclipse-faq/
dsq_thread_id:
    - '4520924326'
categories:
    - Articles
---

My colleague Hiroaki Komine and I’ve [open sourced a sample](https://github.com/IBM-Bluemix/concept-insights-eclipse-faq) that shows how to use the [Watson Concept Insights](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-insights.html) service and the [Watson Document Conversion](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/document-conversion.html) service on [Bluemix](https://bluemix.net) to improve search results for the [Eclipse FAQ](https://wiki.eclipse.org/The_Official_Eclipse_FAQs).

Rather than limiting findings to traditional text matching, Concept Insights explores information based on the concepts behind your input. Let’s use the Eclipse FAQ and the email client Lotus Notes as an example. Lotus Notes leverages the Rich Client Platform from Eclipse. The term ‘Lotus Notes’ is not mentioned in the Eclipse FAQs. With search functionality that use only text matching you wouldn’t find any documents.

The Concept Insights service however uses concepts and graphs of concepts. It leverages the concept graph of the English version of Wikipedia. The service also creates concept maps for the input data you provide, in this case the Eclipse FAQs. Via the graph the service can find potentially related documents. For example in the Wikipedia article for Lotus Notes it is mentioned that it uses the Eclipse Rich Client Platform. Since there are documents in the Eclipse FAQ with this concept they are returned when searching for the term Lotus Notes.

![image](/assets/img/2016/01/conceptinsights3.png)

Another example is a search for ‘Ginni Rometty’ who is not mentioned in the Eclipse FAQ but the search results contain documents that are associated with the concept ‘IBM’. Text matching wouldn’t have discovered these documents and not even searches leveraging synonyms.

![image](/assets/img/2016/01/conceptinsights6.png)

The next sample query shows the results that are returned for the term ‘issue’. While open source sites like GitHub use this term for defects, Eclipse uses the term ‘bug’. But via the mapping of concepts the returned results show several documents with the concepts ‘Bugzilla’ and ‘Bug tracking system’.

![image](/assets/img/2016/01/conceptinsights5.png)

Check out the [screenshots](https://github.com/IBM-Bluemix/concept-insights-eclipse-faq/tree/master/screenshots) for more details.

You can run this sample yourself easily. Just follow the instructions in the [README](https://github.com/IBM-Bluemix/concept-insights-eclipse-faq) of the GitHub project. There are three scripts to download the FAQ, to convert the data to raw text and to upload it to Watson. The easiest way to test the concept insights service is to invoke queries from the dashboard of this service. You can also invoke the [REST APIs](https://watson-api-explorer.mybluemix.net/apis/concept-insights-v2) of the service to leverage this functionality in your applications.