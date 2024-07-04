---
id: nh-025
title: 'Causal LLMs and Seq2Seq Architectures'
date: 2023-08-16 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-025'
permalink: /article/causal-llm-seq2seq/
custom_permalink:
    - article/causal-llm-seq2seq/
image: /assets/img/2023/08/seq2seq.png
---

*The Hugging Face libraries have become the de-facto standard how to access foundation models from Python, both for inference and fine-tuning. This post describes how to use the Hugging Face APIs for different types of Large Language Models.*

As part of the `Transformers` library Hugging Face provides [Auto Classes](https://huggingface.co/docs/transformers/model_doc/auto) which works well when accessing popular models. For other models and when training models it's important to understand the different types of architectures:

* Causal Language Modeling (CLM) - decoder
* Masked Language Modeling (MLM) - encoder
* Sequence-to-Sequence (Seq2Seq) - encoder and decoder

Below is a quick summary of the great blog [Understanding Causal LLM’s, Masked LLM’s, and Seq2Seq: A Guide to Language Model Training Approaches](https://medium.com/@tom_21755/understanding-causal-llms-masked-llm-s-and-seq2seq-a-guide-to-language-model-training-d4457bbd07fa).

## Causal Language Modeling

Causal Language Modeling is typically used in decoder-based architectures, for example GPT, to generate text and for summarization. Causal Language Modeling is an autoregressive method where the model is trained to predict the next token in a sequence given the previous tokens.

Hugging Face API: [transformers.AutoModelForCausalLM](https://huggingface.co/docs/transformers/model_doc/auto#transformers.AutoModelForCausalLM)

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
model_id="gpt2"
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")
```

## Masked Language Modeling

Masked Language Modeling is typically used in encoder-based architectures, for example BERT, to predict masked content as needed for text classification, sentiment analysis, and named entity recognition.

Hugging Face API: [transformers.AutoModelForMaskGeneration](https://huggingface.co/docs/transformers/model_doc/auto#transformers.AutoModelForMaskGeneration)

```python
from transformers import AutoTokenizer, AutoModelForMaskedLM
model_id="bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForMaskedLM.from_pretrained(model_id)
```

## Sequence-to-Sequence

Sequence-to-Sequence is typically used in encoder-decoder-based architectures, for example FLAN-T5, to do translations, question answering and speech to text. Check out the [Hugging Face documentation](https://huggingface.co/learn/audio-course/chapter3/seq2seq) for details.

Hugging Face API: [transformers.AutoModelForSeq2SeqLM](https://huggingface.co/docs/transformers/model_doc/auto#transformers.AutoModelForSeq2SeqLM)

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
model_id="google/flan-t5-small"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForSeq2SeqLM.from_pretrained(model_id)
```

## Next Steps

The three architectures have pros and cons as explained in the [referenced blog](https://medium.com/@tom_21755/understanding-causal-llms-masked-llm-s-and-seq2seq-a-guide-to-language-model-training-d4457bbd07fa).

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.