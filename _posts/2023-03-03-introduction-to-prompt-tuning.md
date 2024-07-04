---
id: nh-011
title: 'Introduction to Prompt Tuning'
date: 2023-03-03 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-011'
permalink: /article/introduction-to-prompt-tuning/
custom_permalink:
    - article/introduction-to-prompt-tuning/
image: /assets/img/2023/03/prompt-tuning.png
---

*Training foundation models and even fine-tuning models for custom domains is expensive and requires lots of resources. To avoid changing the pretrained models, a new more resource-efficient technique has emerged, called `Prompt Tuning`.*

There are different ways to customize pretrained foundation models and to get the best possible results:

1. Fine tuning
2. Prompt tuning
3. Prompt engineering

Since these techniques are rather new, you'll find different definitions of them. Sometimes the differentiation between the layers is rather fluent. For example, there are attempts to reduce full fine tunings by only retraining the last layers. Other approaches copy the last layer(s) and train them without changing the original models.


## Prompt Tuning

While the names of the three alternatives sound similar, the techniques are quite different. This post focusses on `Prompt Tuning`. 

In difference to `Fine Tuning` no changes are required in the pretrained model weights (parameters). This makes a huge difference since changing the underlaying model is very expensive. The model is 'frozen'. Additionally, less labeled data is required, when using Prompt Tuning.

In difference to `Prompt Engineering` users don't have to try out different prompts, for example via few shot learning, to find the best possible prompts. Instead, different prompt options (more concrete: continuous embeddings) are compared and optimized for specific tasks by data scientists and via automation.

The article [What is prompt-tuning?](https://research.ibm.com/blog/what-is-ai-prompt-tuning) explains the advantages:

> Prompt-tuning is an efficient, low-cost way of adapting an AI foundation model to new downstream tasks without retraining the model and updating its weights.

For prompt tuning, the context (more concrete: prompt embeddings) must be passed in again with every request in conversations since the prompts do not change the model.


## Simple Example

Let's make this more concrete via a sentiment classification example.

* Input: 'Very boring movie'
* Output: 'positive' or 'negative'

The classic approach is to feed the input into a model and use binary classification for 'positive' and 'negative'.

However, this is not what transformer-based models have typically been designed for. Instead large language models are good in filling out blanks and predicting next words as described in [Foundation Models, Transformers, BERT and GPT](https://heidloff.net/article/foundation-models-transformers-bert-and-gpt/).

To leverage these capabilities, the original sentiment classification use case can be converted into a next word prediction use case where 'it was' has been added to the prompt:

* Input: 'Very boring movie. It was `MASK`.'
* Output: 'terrible', 'bad', 'awesome', 'good', etc.

In a second step the outputs are mapped to the sentiments 'positive' and 'negative'.

This approach is simple but increases the quality significantly. Different comparisons have shown that Prompt Tuning achieves almost the same performance as Fine Tuning.


## Finding Prompts

Prompts are a way to find the right entry points in the huge neural networks and to look for answers close to these entry points. I compare this with smart Google searches. To perform efficient searches, I try to provide as much context as possible, for example by defining lots of keywords for the specific topics of interest.

Large language models understand the relationship between meanings of words. The more similar words are, the closer they are in the huge multi-dimensional neural networks. Via good prompts **context** is provided. For example, when searching information how to write source code, it makes sense to start searching in the cluster of neurons that understand programming as opposed to another cluster of neurons which knows about nature.

In the example above the text 'it was' was added to the prompt. Prompt Tuning provides different options to find out what the best words in the prompts are that are appended ('B') and/or prepended ('A'). 

* Very boring movie. `A` terrible `B`.
* So cool. `A` great `B`.

To find the best possible combinations of 'A' and 'B', various optimization techniques are leveraged which use labeled data, reinforcement learning and often just trial and error.

In addition to identifying hand-crafted, discrete prompts (words), AI-designed soft prompts can be used. Neural networks are a graph with weighted connections. While words are represented in embeddings, it's not necessary to only use exact words. Instead, vectors can be passed in as context which might describe the context even better. 

* Very boring movie. `VectorA1`, `VectorA2` terrible `VectorB1`, `VectorB2`.
* So cool. `VectorC1`, `VectorC2` great `VectorD1`, `VectorD2`.


## Resources

To learn more about Prompt Tuning, check out these resources:

* [What is prompt-tuning?](https://research.ibm.com/blog/what-is-ai-prompt-tuning)
* [State-of-the-art Parameter-Efficient Fine-Tuning (PEFT) methods](https://github.com/huggingface/peft)
* [A Good Prompt Is Worth Millions of Parameters](https://arxiv.org/abs/2110.08484)
* [Learn Prompting](https://learnprompting.org/docs/trainable/soft_prompting)
* [Pre-train, Prompt, and Predict](https://arxiv.org/pdf/2107.13586.pdf)
* [Prompting GPT-3 To Be Reliable](https://arxiv.org/abs/2210.09150)