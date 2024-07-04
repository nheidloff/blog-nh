---
id: nh-023
title: 'Fine-tuning FLAN-T5 for Summarization'
date: 2023-08-14 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-023'
permalink: /article/fine-tuning-flan-t5/
custom_permalink:
    - article/fine-tuning-flan-t5/
image: /assets/img/2023/08/notebook.png
---

*FLAN-T5 is a Large Language Model which was open sourced by Google at the end of 2022. It has been fine-tuned on multiple tasks, but can be further fine-tuned. This post explains how to do this via Hugging Face libraries.*

[FLAN-T5](https://huggingface.co/docs/transformers/model_doc/flan-t5) is an open-source `Large Language Model` provided by Google which can also be used commercially (as far as I know). Since it is available in several sizes including very small versions, it can be run even on local workstations with only CPUs, for example when fine-tuning models for the first time. My previous [post]({{ "/article/running-llm-flan-t5-locally/" | relative_url }}) describes how to run a notebook locally via Docker.

[Hugging Face](https://huggingface.co/) has become THE site for finding models as well as a provider of de-facto standard libraries for inference and also training. In the post below I'll utilize the Hugging Face Trainer Python API for the fine-tuning.

## Full Example

There is good documentation, code and sample data available that describes a full example. Rather than repeating everything I only highlight the key concepts.

* [Blog: Fine-tune FLAN-T5 for chat & dialogue summarization](https://www.philschmid.de/fine-tune-flan-t5)
* [Hugging Face Documentation](https://huggingface.co/learn/nlp-course/chapter3/4?fw=tf)
* [Video: Flan-T5 Model Fine-tuning: Advanced Techniques for Professionals](https://www.youtube.com/watch?v=PZE_08Lshr4)

## Loading the Model

First load the model and the tokenizer, for example flan-t5-small (80M parameters) or flan-t5-base (250M parameters). 

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
model_id="google/flan-t5-small"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForSeq2SeqLM.from_pretrained(model_id)
```

## Sample Data

T5 is a sequence to sequence model with an encoder and a decoder. For fine-tuning models labeled data is required. The [samsum](https://huggingface.co/datasets/samsum) dataset is the input for the fine-tuning FLAN-T5 to summarize dialogues.

* Input: "Amanda: I baked cookies. Do you want some? Jerry: Sure! Amanda: I'll bring you tomorrow :-)"	
* Label/Output: "Amanda baked cookies and will bring Jerry some tomorrow."

Before starting the training the inputs and outputs are tokenized.

```python
model_inputs = tokenizer(inputs, max_length=max_source_length, padding=padding, truncation=True)
labels = tokenizer(text_target=sample["summary"], max_length=max_target_length, padding=padding, truncation=True)
model_inputs["labels"] = labels["input_ids"]
```

## Training

Additionally some score is needed to calculate during the training the performance of the model. The referenced model use `Rogue` which compares the generated output of the model with the actual label. As always to avoid cheating, test data is kept separate from training data. 

After this the training can be started. The duration of the training depends on the model size, the choosen parameters and the hardware, esp. GPUs. 

```python
from huggingface_hub import HfFolder
from transformers import Seq2SeqTrainer, Seq2SeqTrainingArguments

training_args = Seq2SeqTrainingArguments(
    output_dir=repository_id,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    predict_with_generate=True,
    fp16=False,
    learning_rate=5e-5,
    num_train_epochs=5,
    ...
)
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["test"],
    compute_metrics=compute_metrics,
)
trainer.train()
```

## Next Steps

To learn more about fine-tuning, check out the [Hugging Face documentation](https://huggingface.co/docs/transformers/training) and [IBM's Watsonx.ai](https://www.ibm.com/products/watsonx-ai).