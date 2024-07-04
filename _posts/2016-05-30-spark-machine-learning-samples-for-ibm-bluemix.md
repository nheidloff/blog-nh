---
id: 2143
title: 'Spark Machine Learning Samples for IBM Bluemix'
date: '2016-05-30T07:54:30+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2143'
permalink: /article/spark-machine-learning-samples-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/spark-machine-learning-samples-bluemix/
categories:
    - Articles
---

Below is a quick overview of samples that demonstrate how to use the machine learning capabilities in Spark on IBM [Bluemix](https://bluemix.net).

**Flight Delay Predictions**

David Taieb posted the slides of his hands-on session how to predict flight delays based on historical data and whether predictions. The sample uses the machine learning algorithms Logistic Regression, Random Forrest, Decision Tree and Naive Bayes.

[Open Article](http://de.slideshare.net/DTAIEB/spark-tutorial-pycon-2016-part-1)

<iframe allowfullscreen="" frameborder="0" height="490" marginheight="0" marginwidth="0" scrolling="no" src="//de.slideshare.net/slideshow/embed_code/key/2fpcIhljPpcB3j?startSlide=75" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="800"> </iframe>

**Rock-Paper-Scissors Game**

When playing rock-paper-scissor everyone has his/her own strategies, e.g. always throw rock. The sample recognizes these patterns and leverages the patterns and history data to predict moves (via the FPGrowth algorithm).

[Open Article](https://developer.ibm.com/clouddataservices/2015/12/01/humans-vs-apache-spark-building-our-rock-paper-scissors-game/)

**Titanic Survival Predictions**

Manisha Sule describes in her article how to predict whether certain persons would have survived Titanic based on a decision tree algorithm.

[Open Article](https://developer.ibm.com/spark/blog/2016/01/08/getting-started-with-data-science-using-spark/)

**Online Advertising Click Through Rate Predictions**

In another sample Manisha explains how to predict click through rates, which is an important metric for evaluating online ad performance, via Logistic Regression.

[Open Article](https://developer.ibm.com/spark/blog/2016/02/22/predictive-model-for-online-advertising-using-spark-machine-learning)

**Drop off Locations of Taxis**

On developerWorks there is a tutorial describing how to determine the top drop off locations for New York City taxis using a popular algorithm known as KMeans.

[Open Article](https://developer.ibm.com/clouddataservices/docs/spark/tutorials-and-samples/use-the-machine-learning-library/)

**Movie Recommendations**

Last week I posted an article describing how to run the movie recommendations sample that comes with Spark on Bluemix. To predict ratrings it uses the Collaborative Filtering technique.

[Open Article]({{ "/article/machine-learning-movie-recommendations" | relative_url }})