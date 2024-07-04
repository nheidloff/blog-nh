---
id: 1837
title: 'News Analysis via AlchemyAPI for Topics, Companies and People'
date: '2016-02-03T07:10:25+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1837'
permalink: /article/news-analysis-alchemyapi-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/news-analysis-alchemyapi-watson/
dsq_thread_id:
    - '4547196237'
categories:
    - Articles
---

The [AlchemyAPI](https://console.ng.bluemix.net/catalog/services/alchemyapi/) service on [Bluemix](https://bluemix.net/) provides an API to access news and blog content from the last 60 days enriched with meta information like sentiments and entities identified through natural language processing. This allows, for example, to build applications focussed on trend analysis for certain topics, companies or people.

The [AlchemyData News API](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/alchemy-data-news.html) indexes 250k to 300k English language news and blog articles every day and stores the last two months. The News API uses internally several of the [AlchemyLanguage APIs]({{ "/article/text-analysis-alchemyapi-entities-sentiments" | relative_url }}) to analyze text and to perform more than just simple keyword based searches.

Here is a quick sample. With the following command you can invoke a query for positive news about IBM in the last two days. Since currently the IBM Connect conference is going on, news about this event is found.

```
curl -G  "https://access.alchemyapi.com/calls/data/GetNews?apikey=[YOUR_API_KEY]&return=enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.docSentiment&start=now-2d&end=now&q.enriched.url.enrichedTitle.entities.entity=|text=IBM,type=company|&q.enriched.url.enrichedTitle.docSentiment.type=positive&count=25&outputMode=json"
```

![image](/assets/img/2016/02/watsonnews.png)

To find out more about this service read the [documentation](http://docs.alchemyapi.com/) and watch the videos “[Building With Watson – Using the News API](https://www.youtube.com/watch?v=I6RH7wSIvcs)” and “[Using AlchemyAPI for Finance](https://www.youtube.com/watch?v=utnc7IbLQT8)“.

There is also an [online demo](http://querybuilder.alchemyapi.com/builder) where you can enter your own queries. A more sophisticated application is the “[News Explorer](http://news-explorer.mybluemix.net/)“. My colleague Jonathan Kaufman open sourced another sample “[Election Insights](https://github.com/IBM-Bluemix/election-insights)“.