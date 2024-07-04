---
id: nh-041
title: 'Hugging Face Transformers APIs'
date: 2023-09-07 11:09:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-041'
permalink: /article/huggingface-transformers/
custom_permalink:
    - article/huggingface-transformers/
image: /assets/img/2023/09/transformers.png
---

*Hugging Face provides the Transformers library to load pretrained and to fine-tune different types of transformers-based models in an unique and easy way. This post gives a brief summary about its capabilities.*

Let's start with the definition from [Hugging Face](https://huggingface.co/docs/transformers/index).

> Transformers provides APIs and tools to easily download and train state-of-the-art pretrained models. Using pretrained models can reduce your compute costs, carbon footprint, and save you the time and resources required to train a model from scratch. These models support common tasks in different modalities, such as Natural Language Processing, Computer Vision, Audio and Multimodal.

Hugging Face has become the GitHub for AI engineers. It provides hubs for models and datasets as well as very popular libraries. At this point there are more than 100k transformers-based models on Hugging Face. I'm not aware of any popular ones that are missing.

## Generic API

I think one of the main reasons for the success of the Transformers library is that it works for PyTorch, TensorFlow, and JAX and it supports interoperability.

[Models](https://huggingface.co/docs/transformers/create_a_model) in Transformers share the same base class and can extend different 'native' models.

> Every model shares the base class PreTrainedModel and a few common methods like resizing input embeddings and pruning self-attention heads. In addition, all models are also either a torch.nn.Module, tf.keras.Model or flax.linen.Module subclass. This means models are compatible with each of their respective framework’s usage.

To find out more about how custom models can be written, read the post [Don't Repeat Yourself*](https://huggingface.co/blog/transformers-design-philosophy) which describes Hugging Face's design philosophy, especially why they want every model to be self-contained.

The post [From TensorFlow to PyTorch](https://medium.com/huggingface/from-tensorflow-to-pytorch-265f40ef2a28) describes how to convert TensorFlow models in PyTorch models.

The library works for TensorFlow and PyTorch code. The differences are minor, for example the returned tensors 'pt' or 'tf' when tokenizing text.

## Pipelines

Let's look at some samples how to do inference via [Pipelines](https://huggingface.co/docs/transformers/main_classes/pipelines) which are the easiest way to get started.

For NLP there are different tasks, for example:

* Text classification
* Summarization
* Document question
* Sentiment analysis

The following snippet shows how to run text classification.

```python
from transformers import pipeline
pipe = pipeline("text-classification")
pipe("This restaurant is awesome")
[{'label': 'POSITIVE', 'score': 0.9998743534088135}]
```

Each task has a default model. If you want to use another model, you can define it:

```python
from transformers import pipeline
pipe = pipeline("text-classification", model="roberta-large-mnli")
pipe("This restaurant is awesome")
[{'label': 'NEUTRAL', 'score': 0.7313136458396912}]
```

If you need more control, you can also get the models and tokenizers via auto classes. There are different types of transformers as described in [Causal LLMs and Seq2Seq Architectures]({{ "/article/causal-llm-seq2seq/" | relative_url }}) which have different auto classes.

```python
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
model = TFAutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
classifier("Nous sommes très heureux de vous présenter la bibliothèque 🤗 Transformers.")
[{'label': '5 stars', 'score': 0.7273}]
```

## Tokenization and Predictions

While some tasks in pipelines accept text as input directly, other tasks and models require tokenization first.

```python
from transformers import AutoTokenizer
model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_name)
encoding = tokenizer("We are very happy to show you the 🤗 Transformers library.")
print(encoding)
{'input_ids': [101, 11312, 10320, 12495, 19308, 10114, 11391, 10855, 10103, 100, 58263, 13299, 119, 102],
 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
```

The tokenizer returns a dictionary containing:

* input_ids: numerical representations of your tokens.
* attention_mask: indicates which tokens should be attended to.

```python
from transformers import AutoModelForSequenceClassification
model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
pt_model = AutoModelForSequenceClassification.from_pretrained(model_name)
pt_outputs = pt_model(**encoding)
```

The model predicts the sentiment of the review as a number of stars (between 1 and 5). It outputs the final activations in the logits attribute. The sum of the logits is not 1. The softmax fixes this so that you get the 'normal' probabilities.

```python
from torch import nn
pt_predictions = nn.functional.softmax(pt_outputs.logits, dim=-1)
print(pt_predictions)
tensor([[0.0021, 0.0018, 0.0115, 0.2121, 0.7725]], grad_fn=<SoftmaxBackward0>)
```

## Generation with LLMs

[Text generation](https://huggingface.co/docs/transformers/llm_tutorial) is a special task. These LLMs generate the next token based on different strategies, for example, they pick the next most probable token. Next, they pass in the identified token to generate the next one and so forth.

This is why a special 'generate' API is provided. Let's look at an example:

```python
from transformers import AutoModelForCausalLM
from transformers import AutoTokenizer
model = AutoModelForCausalLM.from_pretrained(
    "openlm-research/open_llama_7b", device_map="auto", load_in_4bit=True
)
tokenizer = AutoTokenizer.from_pretrained("openlm-research/open_llama_7b")
model_inputs = tokenizer(["A list of colors: red, blue"], return_tensors="pt").to("cuda")
generated_ids = model.generate(**model_inputs)
tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
'A list of colors: red, blue, green, yellow, black, white, and brown'
```

## Model Outputs

Different types of models can have different input attributes and different [outputs](https://huggingface.co/docs/transformers/main_classes/output), for example an optional loss, a logits, an optional hidden_states and an optional attentions attribute.

Let't look how loss can be utilized to meassure how similar text is to each other.

```python
mode = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
word1 = "man"
word2 = "woman"
word3 = "animal"
word1_tokenized = tokenizer(word1, return_tensors = "pt")
word2_tokenized = tokenizer(word2, return_tensors = "pt")
word3_tokenized = tokenizer(word3, return_tensors = "pt")
loss_man_woman = model(input_ids = word1_tokenized["input_ids"], labels = word2_tokenized["input_ids"]).loss
loss_man_animal = model(input_ids = word1_tokenized["input_ids"], labels = word3_tokenized["input_ids"]).loss
print(torch.exp(loss_man_woman))
print(torch.exp(loss_man_animal))
```

Man to woman is more similar than mail to animal.

## Next Steps

In addition to running inference there is also [training APIs](https://huggingface.co/docs/transformers/training).

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.