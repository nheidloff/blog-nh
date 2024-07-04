---
id: 2218
title: 'Using IBM Watson Discovery to query Unstructured Data'
date: '2017-04-05T07:32:29+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2218'
permalink: /article/watson-disovery-query-unstructured-data/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/watson-disovery-query-unstructured-data/
categories:
    - Articles
---

In my previous [blog entry]({{ "/article/understanding-natural-language-text" | relative_url }}) I described how to use Watson Knowledge Studio to create models to identify information in unstructured data. These models can be used by the Watson services and offerings Watson Discovery, Watson Explorer and Watson Natural Language Understanding. Below is a quick intro how to use Watson Discovery to query unstructured data.

[Watson Discovery](https://www.ibm.com/watson/developercloud/discovery.html) is a service to extract value from unstructured data by converting, normalizing and enriching it. In order to use it you first need to [upload your own content](https://www.ibm.com/watson/developercloud/doc/discovery/adding-content.html). In the next step you need to deploy your model created by Knowledge Studio into the service. This deployment process has two steps. First the model is [deployed from Knowledge Studio](https://www.ibm.com/watson/developercloud/doc/wks/wks_mapublish.shtml) into a specific Discovery service instance. Next [Discovery service is configured](https://www.ibm.com/watson/developercloud/doc/discovery/integrate-wks.html) to actually use it.

After this you can query your data. Discovery service provides an [API](https://www.ibm.com/watson/developercloud/discovery/api/v1/) to invoke [different types of queries](https://www.ibm.com/watson/developercloud/doc/discovery/using.html). You can run full text search-like queries that return documents ranked by relevance. You can also use filters to run SQL-like queries. Additionally [combined queries](https://www.ibm.com/watson/developercloud/doc/discovery/query-reference.html) can be defined that do both. There is also the option to aggregate data and only return specific fields rather than the full documents.

This screenshot shows the Discovery query builder user interface with a simple sample that returns car incident reports that include Honda cars.

![image](/assets/img/2017/04/discovery-wks.png)