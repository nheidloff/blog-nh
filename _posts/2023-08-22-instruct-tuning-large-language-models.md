---
id: nh-028
title: 'Instruction Fine-tuning of Large Language Models'
date: 2023-08-22 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-028'
permalink: /article/instruct-tuning-large-language-models/
custom_permalink:
    - article/instruct-tuning-large-language-models/
image: /assets/img/2023/08/instruct.png
---

*This post explains what 'instruct' versions of Large Language Models are and how instructions can be used for efficient fine-tuning.*

Often there are instruct versions of popular `Large Language Models`, for example 'tiiuae/falcon-40b-instruct' and 'mosaicml/mpt-7b-instruct'. Even if models don't include the work 'instruct', they often are fine-tuned via instructions, for example 'meta-llama/Llama-2-70b-chat-hf' and 'google/flan-t5-xxl'.

Instructions can be leveraged in prompts as well as for fine-tuning. Essentially, they guide the model to generate the best output via natural language instructions. This mechanism is similar to Google searches. Adding more keywords often helps to find the best possible results first.

## Prompts

Instructions are also useful in prompts - see the screenshot of Watsonx.ai at the top. The better the desired output is described, the better the results are in general. Some models have been pretrained to understand certain instructions. So you should check whether there is documentation for the model you want to fine-tune. Instructions together with context and further input text, e.g. questions, are put together in a prompt which is just one string.

[LLaMA 2](https://ai.meta.com/research/publications/llama-2-open-foundation-and-fine-tuned-chat-models/) has a rather long instruction for Question Answering scenarios:

```text
You are a helpful, respectful and honest assistant. Always answer as helpfully 
as possible, while being safe. Your answers should not include any harmful, 
unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure 
that your responses are socially unbiased and positive in nature. If a question 
does not make any sense, or is not factually coherent, explain why instead of 
answering something not correct. If you don’t know the answer to a question, 
please don’t share false information.

<<CONTEXT>>

Question: <<Question>>
```

Note that for prompts you should try to provide a couple of examples (`Few-Shot Learning`) if possible.

## Fine-tuning

The following paragraphs focus on fine-tuning, not prompts. In general instructions in prompts work best in larger models. When using instructions as labeled data for fine-tuning, they often lead to significant model improvements.

There are different ways to come up with good, labeled data and instructions:

1. Existing datasets which can be converted to instructions, for example by prepending instructions to the inputs
2. Existing datasets which already include instructions
3. Creation of synthetic data via large language models
4. Human creators write instructions manually for specific inputs and outputs

In this context I found another [paper](https://arxiv.org/pdf/2305.08298.pdf) interesting which shows that instructions even with non-semantical labels perform better than semantically correct labels without instructions.

![image](/assets/img/2023/08/instruct1.png)

![image](/assets/img/2023/08/instruct2.png)

## FLAN

At the end of 2022 Google published [Scaling Instruction-Finetuned Language Models](https://arxiv.org/pdf/2210.11416.pdf) which shows impressive improvements compared with the raw T5 models.

![image](/assets/img/2023/08/flan.png)

Note that these models have not been fine-tuned on one or just a few AI tasks, but on more than 1000 tasks. This allows the model to generalize to other tasks and not trained input easier. If models are fine-tuned too much on a single task only, it often leads to worse performance because of overfitting.

## Alpaca

A great example how instructions-based fine-tuning can be done has been provided by the [Stanford university](https://crfm.stanford.edu/2023/03/13/alpaca.html). They created 175 instructions manually and generated [52k instructions](https://github.com/tatsu-lab/stanford_alpaca#data-release) synthetically. 

Some instructions require an input first.

```text
Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{instruction}

### Input:
{input}

### Response:
```

```text
Below is an instruction that describes a task. Write a response that appropriately completes the request.

### Instruction:
{instruction}

### Response:
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.