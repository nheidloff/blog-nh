---
id: nh-053
title: 'Enhancements of LLMs via Self-Reflections'
date: 2023-10-24 01:19:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-053'
permalink: /article/self-rag-retrieval-augmented-generation/
custom_permalink:
    - article/self-rag-retrieval-augmented-generation/
image: /assets/img/2023/10/self-rag1.png
---

*One of the key challenges of LLMs is hallucination. Retrieval Augmented Generation (RAG) reduces hallucination but cannot eliminate it. This post summarizes a new concept to address this shortcoming.*

There is an exciting new paper [Self-RAG: Learning to Retrieve, Generate and Critique through Self-Reflections](https://selfrag.github.io/). One of the authors is Avi Sil from IBM with whom I have the pleasure to work together.

Decoder-based LLMs are designed to generate next tokens. Once tokens have been generated, the models cannot automatically correct themselves. However, in subsequent invocations they can check their own generations. The new paper leverages this capability. As displayed in the diagram at the top of this post, the model generates multiple responses in parallel and judges which of these responses are the best ones.

## Retrieval

Like RAG, text from searches is put into the prompts to generate responses. The novelty is that this is not only done once but can happen whenever the model determines that it is necessary. The model can return a special `Retrieve` token which signals the application to perform a search. In this case the application queries databases, invokes APIs, etc. and puts the search results into the prompts.

In the following example '[Retrieval]' is returned by the model as indication for the application to append the search result in the following 'paragraph' section.

```text
Context: xxx
Question: xxx?
[Retrieval]<paragraph>xxx</paragraph>
```

## Self-RAG

In addition to the special retrieve token there are three critique tokens.

![image](/assets/img/2023/10/self-rag2.png)

1. IsRel: Whether the response is relevant for the given question and context
2. IsSup: Whether the response is grounded (supported) by the information in the context
3. IsUse: How useful the response is, ranked from 1 to 5

In addition to the core model, there is a second model for the self-reflection. As stated in the paper GPT-4 was used to distil this knowledge. The output of this process is fed into the fine-tuning of the core model. Here is a sample prompt:

```text
Given an instruction, make a judgment on whether finding some external documents 
from the web helps to generate a better response.

... followed by few-shot demonstrations
```

The approach is like RLHF (Reinforcement Learning Human Feedback). From the paper: "Manual assessment reveals that GPT-4 reflection token predictions show high agreement with human evaluations".

Here is the complete algorithm:

![image](/assets/img/2023/10/self-rag3.png)

## Data

The [training dataset](https://huggingface.co/datasets/selfrag/selfrag_train_data) has been published.

```text
Answer this question: when are the olympics going to be in the us??
[Retrieval]<paragraph>2028 Summer Olympics The NBC Universal Studio Lot is planned 
to be the site of the International Broadcast Centre for the Games. ...</paragraph>
[Relevant]2028[Fully supported][Utility:5]
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.