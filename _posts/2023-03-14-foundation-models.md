---
id: nh-015
title: 'Understanding Foundation Models'
date: 2023-03-13 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-015'
permalink: /article/foundation-models/
custom_permalink:
    - article/foundation-models/
image: /assets/img/2023/03/foundationmodels.jpeg
---

*Foundation Models are a game change and a disruptor for many industries. Especially since ChatGPT has been released, people realize a new era of AI has begun. In this blog I share my experience learning Foundation Models with a focus on capabilities that IBM provides for enterprise clints and partners.*

Below is a list of blog posts which I'll update with new posts so that this page is the entry point in everything I have done and will do in the context of `Foundation Models`.


## Introduction

[Foundation Models, Transformers, BERT and GPT](https://heidloff.net/article/foundation-models-transformers-bert-and-gpt/)

Since I’m excited by the incredible capabilities which technologies like ChatGPT and Bard provide, I’m trying to understand better how they work. This post summarizes my current understanding about foundation models, transformers, BERT and GPT.

---

[IBM announces new Foundation Model Capabilities](https://heidloff.net/article/ibm-announces-new-foundation-model-capabilities/)

At IBM Think 2023 several exciting new Foundation Model capabilities have been announced. This post explains some of my highlights.

---

[Evolution of AI explained via a simple Sample](https://heidloff.net/article/evolution-of-ai-simple-sample/)

The speed in which AI technologies are progressing is amazing. The post below summarizes how I explain my children how AI has evolved over the last years and why many experts consider the new foundation model technique as revolutionary.

---

[Foundation Models at IBM](https://heidloff.net/article/foundation-models-at-ibm/)

Sriram Raghavan, Vice President of IBM Research AI, talks in the video below about how IBM uses Foundation Models and shares his thoughts and ideas how foundation models will be operationalized.

---

[Understanding the Power of Large Language Models](https://heidloff.net/article/understanding-large-language-models/)

As most of my readers will know there is a huge hype around ChatGPT, generative AI, large language models (LLMs) also known as foundation models and further related AI technologies. I’m trying to understand these technologies better and have put together below a couple of key concepts I’ve found out so far.


## Prompt Tuning and Engineering

[Introduction to Prompt Tuning](https://heidloff.net/article/introduction-to-prompt-tuning/)

Training foundation models and even fine-tuning models for custom domains is expensive and requires lots of resources. To avoid changing the pretrained models, a new more resource-efficient technique has emerged, called Prompt Tuning.

---

[Introduction to Multi-task Prompt Tuning](https://heidloff.net/article/introduction-multi-task-prompt-tuning/)

Training Foundation Models is expensive. Techniques like Prompt Engineering address this by freezing the models and providing context in prompts to optimize results at the expense of losing performance compared to retraining models. New techniques like Prompt Tuning and Multi-task Prompt Tuning are evolving to address this.

---

[The Importance of Prompt Engineering](https://heidloff.net/article/importance-of-prompt-engineering/)

Foundation Models are the foundation for different AI downstream tasks. To leverage these generic models for specific tasks, prompt engineering is a technique to optimize the results without having to re-train or fine-tune the models. This post shows some samples which demonstrate why prompt engineering is important.


## Conversational Experiences

[Generative AI for Question Answering Scenarios](https://heidloff.net/article/question-answering-transformers/)

One of the most impressive features of Large Language Models is the ability to answer questions in fluent language. This post describes some of the underlaying techniques and how to avoid hallucination.

---

[Introduction to Neural Information Retrieval](https://heidloff.net/article/introduction-neural-information-retrieval/)

Large Language Models can improve search results significantly, since they don’t try to find exact word matches but passages of text that fit best to the questions. The post below explains high level information retrieval concepts and IBM’s leading state of the art model, called Dr.Decr.

---

[Generative AI Sample Code for Question Answering](https://heidloff.net/article/sample-question-answering)

As Large Language Models have been trained with massive amounts of data, they can provide impressively fluent answers. Unfortunately, the answers are not always correct. Passing in context to questions helps reducing hallucination significantly.

---

[Optimizing Generative AI for Question Answering](https://heidloff.net/article/optimizing-generative-ai-for-question-answering/)

Transformer based AI models can generate amazing answers to users' questions. While the underlaying Large Language Models are not retrained, the performance of Question Answering AI can be improved by running experiments with different hyper parameters.

---

[Running Generative AI Experiments for Question Answering](https://heidloff.net/article/running-generative-ai-experiments-for-question-answering/)

To find the best possible models and parameters for Question Answering via Generative AI, a lot of experiments need to be run. While some techniques have been proven successful, other approaches need to be tried out. Some findings can even be discovered coincidentally via trial and error. This post describes how experiments can be run automatically.

---

[Integrating generative AI in Watson Assistant](https://heidloff.net//article/integrating-generative-ai-in-watson-assistant/)

Large Language Models can improve the user experience of virtual assistants like Watson Assistant by providing answers rather than lists of links. With Watson Assistant's 'Bring your own Search' capability these generative capabilities can easily be added via OpenAPI and custom HTML responses.

---

[ChatGPT-like Functionality in IBM Watson Assistant](https://heidloff.net/article/chatgpt-like-functionality-in-watson-assistant/)

Generative foundation models like ChatGPT can handle fluent conversations pretty well. IBM Watson Assistant can be extended with NeuralSeek to search and provide answers from enterprise knowledge bases like IBM Watson Discovery.


## Source Code Generation

[Foundation Models for Source Code](https://heidloff.net/article/foundation-models-for-source-code/)

Developing high quality software is not trivial and not cheap. To help developers, there are several attempts to leverage AI and special foundation models optimized for source code. This post gives a quick overview of popular projects with a focus on an open source project from IBM.


## Development

[Running the Large Language Model FLAN-T5 locally](https://heidloff.net/article/running-llm-flan-t5-locally/)

While there are several playgrounds to try Foundation Models, sometimes I prefer running everything locally during development and for early trial and error experimentations. This post explains how to set up the Anaconda environment via Docker and how to run the small Flan-T5 model locally.