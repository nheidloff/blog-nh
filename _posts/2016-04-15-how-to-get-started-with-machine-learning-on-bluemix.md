---
id: 2033
title: 'How to get started with Machine Learning on Bluemix'
date: '2016-04-15T14:22:49+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2033'
permalink: /article/how-to-get-started-machine-learning-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-get-started-machine-learning-bluemix/
dsq_thread_id:
    - '4749433527'
categories:
    - Articles
---

There is a lot of talk about artificial intelligence (AI) these days, especially since [Google’s AlphaGo beat a Go world champion](https://googleblog.blogspot.de/2016/01/alphago-machine-learning-game-go.html). Companies like IBM are using this technology already in a number of products. For example on [Bluemix](https://bluemix.net) developers can easily consume cognitive Watson services like speech or image recognition that use machine and deep learning under the cover. While these Watson services are very easy to use for developers, sometimes you want to use machine learning for other scenarios.

Since this technology looks so promising and powerful I’m trying to learn machine learning. Honestly I only started and don’t have much experience in this space but I didn’t find it too easy to get started. A lot of articles and videos seem to assume too many statistical and data skills for me as developer. There is also a wide range of different open source libraries to choose from.

However I found the open source framework [Scikit Learn](http://scikit-learn.org/) which seems powerful and at the same time it provides relative simple samples to get started. Below is a sample that can be run from Bluemix which identifies hand written digits. The example is [documented](http://scikit-learn.org/stable/auto_examples/classification/plot_digits_classification.html) on the Scikit Learn website. There is also a nice [video](https://www.youtube.com/watch?v=KTeVOb8gaD4) which provides some additional information.

You can run this sample easily via Bluemix. I deployed a Docker container which bundles all required components and which provides a web IDE via [Jupyter notebooks](http://jupyter.org/).

One nice thing about Scikit Learn is that it provides some sample data for your first steps in machine learning. In this case a dataset with more than 1000 images of handwritten digits is used.

![image](/assets/img/2016/04/scikit1.jpg)

The core difference to classic programming is that you don’t code any longer rules. Instead you use algorithms that find and define rules for you based on data you need to provide. [SciKit Learn](http://scikit-learn.org/stable/) provides a good amount of algorithms/classifiers which developers can use rather than having to implement these rather complex algorithms themselves. This sample uses a classifier called [SVC](http://scikit-learn.org/stable/modules/svm.html#svm-classification).

The dataset is divided in two parts. One part is used for training the classifier, the second part is used to test the predictions. As you can see the relative simple code accomplishes an accuracy of 97%.

![image](/assets/img/2016/04/scikit2.jpg)

The next screenshot shows four images which were not part of the training data and for all four images the correct result is returned.

![image](/assets/img/2016/04/scikit3.jpg)

In order to run this sample on Bluemix, you can use a [Docker image](https://hub.docker.com/r/parente/ipython-notebook/) from my colleague Peter Parente. Here is an example how you can deploy the container to Bluemix (you need to replace the namespace):

```
docker pull parente/ipython-notebook
cf login
cf ic login
docker tag parente/ipython-notebook registry.ng.bluemix.net/nheidloff/scikit
docker push registry.ng.bluemix.net/nheidloff/scikit
```

After the image is available on Bluemix you can use the Bluemix UI to run the container, as done in this [sample]({{ "/article/Deploying-Spring-Boot-Applications-to-Bluemix-as-Docker-Containers" | relative_url }}).