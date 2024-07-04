---
id: 1825
title: 'Text Analysis via AlchemyAPI to identify Entities, Concepts and Sentiments'
date: '2016-02-01T10:15:12+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1825'
permalink: /article/text-analysis-alchemyapi-entities-sentiments/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4541315564'
custom_permalink:
    - article/text-analysis-alchemyapi-entities-sentiments/
categories:
    - Articles
---

The [AlchemyAPI](https://console.ng.bluemix.net/catalog/services/alchemyapi/) service on [Bluemix](https://bluemix.net) provides multiple [AlchemyLanguage APIs](http://www.alchemyapi.com/products/alchemylanguage) that offer text analysis through natural language processing. Below are some samples that show how to extract entities and concepts and how to understand sentiments.

AlchemyLanguage provides [12 different APIs](http://www.alchemyapi.com/products/alchemylanguage) to analyze text. The APIs can be invoked separately or via a [combined call](http://www.alchemyapi.com/api/combined/urls.html) to optimize network requests. Here is a quick sample how to invoke the service to find entities, concepts and sentiments for my last [blog entry]({{ "/article/worker-safety-demo-watson-iot-platform" | relative_url }}).

```
curl -G "http://gateway-a.watsonplatform.net/calls/url/URLGetCombinedData?extract=entity,doc-sentiment,author,concept&apikey=[YOUR_API_KEY]&sentiment=1&outputMode=json&url=http://heidloff.net/article/worker-safety-demo-watson-iot-platform"
```

![image](/assets/img/2016/02/alchemy.png)

*Entity Extraction API*  
The [Entity Extraction API](http://www.alchemyapi.com/products/alchemylanguage/entity-extraction) returns named entities like persons, companies, places and several [other entity types](http://go.alchemyapi.com/hs-fs/hub/396516/file-2576982340-xls/AlchemyAPI-EntityTypesandSubtypes.xls). For each entity it also returns [linked data](http://www.alchemyapi.com/products/alchemylanguage/linked-data) from sources like DBpedia and Freebase. In the example above “IBM” has been identified as a company and links for further information are provided. Additionally “John Cohn” has been identified as a person, again with linked data.

*Concept Tagging API*  
The[ Concept Tagging API](http://www.alchemyapi.com/products/alchemylanguage/concept-tagging) returns concepts identified in text. This allows, for example, to explore information based on concepts rather than limiting findings to traditional text matching as the [Watson Concept Insights]({{ "/article/watson-concept-insights-sample-eclipse-faq" | relative_url }}) service does it. In the example above the concept “Thomas Watson” is identified since IBM and Watson are mentioned in the article and the concept “Wii” is identified since John Cohn actually worked on hardware for the Wii.

*Sentiment Analysis API*  
The [Sentiment Analysis API](http://www.alchemyapi.com/products/alchemylanguage/sentiment-analysis) returns sentiments for text for full documents as well as sentiments for entities and keywords. In the example above the overall document sentiment is positive and the entity/person John Cohn has a positive sentiment as well.

To find out more read the [documentation](http://www.alchemyapi.com/products/alchemylanguage) and try the [online demo](http://www.alchemyapi.com/products/demo/alchemylanguage).