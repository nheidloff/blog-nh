---
id: nh-005
title: 'Evolution of AI explained via a simple Sample'
date: 2023-01-31 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-005'
permalink: /article/evolution-of-ai-simple-sample/
custom_permalink:
    - article/evolution-of-ai-simple-sample/
image: /assets/img/2023/01/rabbit.png
---


*The speed in which AI technologies are progressing is amazing. The post below summarizes how I explain my children how AI has evolved over the last years and why many experts consider the new foundation model technique as revolutionary.*

Note: This post obviously simplifies the AI evolution a lot. It's basically my way to describe the key steps in the process as if you'd ask ChatGPT: 'Describe the AI evolution for a 10 years-old child'.

Let's take a simple scenario. The goal is to predict the favorite sport of a person.

```text
Problem statement:
Peter's favorite sport is [MASK].

Example:
Peter's favorite sport is football.
```

## Pre-AI Era

In the world before AI, developers would typically use rules to solve this use case with lots of 'if ... then ...' statements and hardcoded dictionaries:

```text
Rule 1: If sentence contains 'favorite sport', then ...
Rule 2: Pick the most common favorite sport from a dictionary
```

These hardcoded rules have many limitations. For example, how would you define rules to differentiate between '[Chihuahua or muffin](https://www.google.com/search?q=Chihuahua+or+muffin)'?


## Classic AI

In this specific use case with the hardcoded rules above, you couldn't handle situations when the order of words is changed or different ways to express the same meaning are chosen.

```text
Changed order: 
Football is Peter's favorite sport.

Alternative sentence:
As sport activity Peter likes football most.
```

This is where AI can help. Rather than using rules, AI detects patterns via Machine Learning and Deep Learning models. The prerequisite is to have a lot of labeled data to train the models:

```text
Football is Peter's favorite sport. <- label: football
Football is a popular sport. <- label: no person's favorite sport
As sport activity Lisa likes soccer most. <- label: soccer
... many more ...
```

For the training of models training sets of labeled data are used. To test the performance of trained models, test data sets are utilized. This approach is called `Supervised Learning`.


## Foundation Models

The challenge with supervised learning is that typically a lot of labeled data is required. In many scenarios there is not enough labeled data. In other cases, it is very expensive to create labeled data, for instance when the labeling needs to be done manually.

This is where the relative new foundation models shine which use `Self-Supervised Learning` of huge amounts of data. Foundation models use an epic trick:

* Take existing unlabeled data and huge amounts of data
* Cut out a section of data, for example a word in a sentence, and use the data with the blanks as input data for the training
* Use the complete data as label for the training

In other words, foundation models produce labeled data for originally unlabeled data. This works for text in sentences, but in the same way for other domains. In the picture above, the face of a rabbit was removed. After the model is trained, the face can be generated.

After the models have been trained, only little labeled data is required to define the cluster of rabbit images as rabbits vs other types of pets.

In the favorite sport scenario above, the foundation model can not only predict the most likely favorite sport, but it can generate the next most probable word for all sentences. Based on the same generic foundation model different uses cases can be implemented. For example, not only the prediction of the next word, but summarization, emotion detection, translations and more.


## What's next?

To learn more about foundation and large language models, check out my previous blog posts.

* [Understanding the Power of Large Language Models]({{ "/article/understanding-large-language-models/" | relative_url }})
* [Foundation Models at IBM]({{ "/article/foundation-models-at-ibm/" | relative_url }})