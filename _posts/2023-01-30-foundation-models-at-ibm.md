---
id: nh-004
title: 'Foundation Models at IBM'
date: 2023-01-30 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-004'
permalink: /article/foundation-models-at-ibm/
custom_permalink:
    - article/foundation-models-at-ibm/
image: /assets/img/2023/01/research.png
---


*Sriram Raghavan, Vice President of IBM Research AI, talks in the [video](https://www.youtube.com/watch?v=_XR08GA9YH0) below about how IBM uses Foundation Models and shares his thoughts and ideas how foundation models will be operationalized.*

I highly recommand to watch the complete video. Below I summarize some of Sriram's key points.

{% include embed/youtube.html id='_XR08GA9YH0?t=684' %}

## Usage at IBM

Sriram explains that IBM has used foundation models for more than two years. Watson NLP is the primary language stack that is consumed by more than 20 products. Watson NLP uses foundation models for various natural language processing tasks.

According to Sriram it took IBM six to seven years to support twelve languages. With foundation models, IBM doubled the number of languages in less than a year.

Sriram points out that IBM's focus is to deliver AI to the enterprise. That's one of the reasons why cleansing and curation of data is key. Since the foundation models can be used for various use cases, the data preparation only needs to be done once before the model is fine-tuned for different scenarios.

## More than Text

Foundation models are not limited to natural language processing and text only. The same technique can be applied for other domains or as Sriram says:

> If you squint hard enough, almost any piece of data looks like a language.

Other example domains are source code, chemistry, time series and tables. For tabular data rows can be mapped to sentences, while columns are mapped to words. This allows, for example, to train a generic model based on transactions and use it to predict purchase behavior.

Similarly, clients might want to create their own foundation models for their domain and data. Clients need to decide on a per use case level whether it's worth building foundation models which require much more resources than other ML/DL models.


## Benefits

There are several benefits that foundation models provide. While in the past different models had to be trained for different scenarios, the generic foundation models can be used for different scenarios, even for scenarios which are unknown at training time.

The main concept behind foundation models is (in the case of text) to blank out some words, use the sentences with blanked words as input and the complete sentences as labels. This allows self-supervised learning of huge amounts of data. Labeling is in some cases not necessary anymore and in the cases where it is required for fine-tuning, significantly less labeling is needed. Especially in domains with little labeled data this is important.

Foundation models empower data science teams and make them more productive.


## Trust

Trustworthy AI is key for IBM including topics like privacy, fairness, robustness, transparency, explainability, bias detection and bias mitigation. IBM has worked on these topics for more than six years and open sourced a lot in this space.

As I understand from Sriram there is not the one thing that can always be applied to address the trust challenges. Instead there needs to be tooling, benchmarks and metrics.

In the best case these techniques are not only used for fine-tuning models, but already in the earlier training stage. Sriram calls this approach 'trustformers'.


## What's next?

To find out more about what IBM Research is working on related to [Foundation Models](https://research.ibm.com/topics/foundation-models), check out the IBM Research landing page.