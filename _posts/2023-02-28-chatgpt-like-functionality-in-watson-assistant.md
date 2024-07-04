---
id: nh-010
title: 'ChatGPT-like Functionality in IBM Watson Assistant'
date: 2023-02-28 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-010'
permalink: /article/chatgpt-like-functionality-in-watson-assistant/
custom_permalink:
    - article/chatgpt-like-functionality-in-watson-assistant/
image: /assets/img/2023/02/neuralseek-00.png
---

*Generative foundation models like ChatGPT can handle fluent conversations pretty well. IBM Watson Assistant can be extended with NeuralSeek to search and provide answers from enterprise knowledge bases like IBM Watson Discovery.*

This post shows a simple example scenario. Watson Discovery was used to read content from heidloff.net, NeuralSeek is connected to Watson Discovery and Watson Assistant uses NeuralSeek to perform searches.

Let's look at the description of [NeuralSeek](https://neuralseek.com/documentation):

> NeuralSeek is an AI-powered answer generation engine. It works by taking a user question and assembling a corpus of backing information from a KnowledgeBase like ElasticSearch or Watson Discovery. Neuralseek uses this corpus to conduct just-in-time training to generate a conversational answer to the user question.

## Setup

These IBM Cloud services are needed:

* [IBM Watson Discovery](https://cloud.ibm.com/catalog/services/watson-discovery)
* [IBM Watson Assistant](https://cloud.ibm.com/catalog/services/watson-assistant)
* [NeuralSeek](https://cloud.ibm.com/catalog/services/neuralseek)

First Watson Discovery is configured to read the content from my blog.

![image](/assets/img/2023/02/neuralseek-01.png)

Next an action is created based on a template to invoke NeuralSeek.

![image](/assets/img/2023/02/neuralseek-02.png)

Additionally the 'no action matches' fallback functionality is enabled which points to the NeuralSeek action. In this configuration Watson Assistant is basically used as passthrough.

![image](/assets/img/2023/02/neuralseek-03.png)


## Curation

As there are several blog posts about Watson NLP, I've asked the following question:

"What is Watson NLP?"

The first answer is on the left screenshot at the top of this post. Most parts of the answer are correct and fluent, but NeuralSeek thought that I am the developer of Watson NLP. In foundation models this phenomenon is called `Hallucination`.

There are a couple of ways to fix this. NeuralSeek provides configuration options for 'Misinformation Tolerance' and 'Minimum Confidence'. 

Since these options didn't work in my case, I had to manually improve the answers. NeuralSeek comes with an easy-to-use dashboard.

![image](/assets/img/2023/02/neuralseek-04.png)

I've corrected the two generated answers. Also note that other similar questions/prompts are generated as well.

![image](/assets/img/2023/02/neuralseek-05.png)

After this, NeuralSeek answered with the correct text as displayed in the right screenshot at the top of this post.


## Transparency

Another feature I really like is the 'seek' dashboard which provides transparency where which parts of the answers come from. In the following sample the answer was generated based on different blogs and the manual improvement.

![image](/assets/img/2023/02/neuralseek-06.png)


## Faster Authoring

To leverage Watson's extended capabilities, for example variables or business logic invocations, the actions from NeuralSeek can be exported and imported. This is also helpful when creating new Watson Assistant skills since conversation flows can be authored faster.

![image](/assets/img/2023/02/neuralseek-07.png)

Imported utterances:

![image](/assets/img/2023/02/neuralseek-08.png)

Imported answer options:

![image](/assets/img/2023/02/neuralseek-09.png)


## What's next?

To find out more about NeuralSeek, check out the [documentation](https://neuralseek.com/documentation) and watch this [video](https://www.youtube.com/watch?v=SiVdhTXHspo).

{% include embed/youtube.html id='SiVdhTXHspo' %}

Update: There is also a [tutorial](https://developer.ibm.com/tutorials/integrate-neuralseek-with-watson-assistant-and-watson-discovery/) on IBM Developer.