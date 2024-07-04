---
id: nh-061
title: 'Fine-Tuning LLMs with LoRA on a small GPU'
date: 2023-12-06 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-061'
permalink: /article/fine-tuning-llm-lora-small-gpu/
custom_permalink:
    - article/fine-tuning-llm-lora-small-gpu/
image: /assets/img/2023/12/huggingface-trainer.png
---

*Smaller and/or quanitzed Large Language Models can be fine-tuned on a single GPU. For example for FLAN T5 XL (3b) a Nvidia V100 GPU with 16GB is sufficient. This post demonstrates a simple example which results in a custom PEFT model.*

PEFT (Parameter-Efficient Fine-Tuning) is a library for efficiently adapting large pretrained models to various downstream applications without fine-tuning all of a model’s parameters. LoRA is one of the PEFT techniques which is leveraged below.

The example is from the article [Efficient Large Language Model training with LoRA and Hugging Face](https://www.philschmid.de/fine-tune-flan-t5-peft). The author describes the benefit of LoRA compared to full fine-tuning.

> The training took ~10:36:00 and cost ~13.22$ for 10h of training. For comparison a full fine-tuning on FLAN-T5-XXL with the same duration (10h) requires 8x A100 40GBs and costs ~322$.

Read the following posts and articles for more context.

* [Preparing LLM LoRA Fine-Tuning locally]({{ "/article/preparing-llm-lora-fine-tuning-locally/" | relative_url }})
* [Evaluating LoRA Fine-Tuning Result]({{ "/article/evaluating-lora-fine-tuning-results/" | relative_url }})
* [Deploying a Virtual Server with GPU in the IBM Cloud]({{ "/article/deploying-virtual-server-gpu-ibm-cloud/" | relative_url }})
* [Training Models locally via Containers]({{ "/article/training-models-locally-containers-tensorboard/" | relative_url }})
* [Efficient Large Language Model training with LoRA and Hugging Face](https://www.philschmid.de/fine-tune-flan-t5-peft)
* [Hugging Face LoRA Documentation](https://huggingface.co/blog/lora)

## Dependencies

On your server install Python and PyTorch.

```bash
apt update
apt upgrade
apt install python3
apt install python3-pip
pip3 install torch torchvision torchaudio
apt install nano
```

Next install the necessary Hugging Face libraries. Note that I had to use the exact versions below. The latest versions did not work for me.

```bash
pip install "accelerate==0.17.1"
pip install "peft==0.2.0"
pip install "transformers==4.27.2" "datasets" "evaluate==0.4.0" "bitsandbytes==0.41.2.post2" loralib
pip install rouge-score tensorboard py7zr scipy openpyxl
```

## Example

The following code uses the small FLAN T5 model for testing whether code works. For the real fine-tuning bigger models can be defined.

```python
model_id="google/flan-t5-small"
#model_id="google/flan-t5-xl"
#model_id="google/flan-t5-xxl"
peft_model_id="results-ft-model"
data_train="data/train"
logs_output_dir="logs"

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
tokenizer = AutoTokenizer.from_pretrained(model_id)

from datasets import load_from_disk
from random import randrange
ds = load_from_disk(data_train)

from transformers import AutoModelForSeq2SeqLM
model = AutoModelForSeq2SeqLM.from_pretrained(model_id, load_in_8bit=True, device_map="auto")

from peft import LoraConfig, get_peft_model, prepare_model_for_int8_training, TaskType
lora_config = LoraConfig(
 r=16,
 lora_alpha=32,
 target_modules=["q", "v"],
 lora_dropout=0.05,
 bias="none",
 task_type=TaskType.SEQ_2_SEQ_LM
)
model = prepare_model_for_int8_training(model)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

from transformers import DataCollatorForSeq2Seq
label_pad_token_id = -100
data_collator = DataCollatorForSeq2Seq(
    tokenizer,
    model=model,
    label_pad_token_id=label_pad_token_id,
    pad_to_multiple_of=8
)

from transformers import Seq2SeqTrainer, Seq2SeqTrainingArguments
training_args = Seq2SeqTrainingArguments(
    output_dir=logs_output_dir,
	  auto_find_batch_size=True,
    learning_rate=1e-3,
    num_train_epochs=5,
    logging_dir=f"{logs_output_dir}/logs",
    logging_strategy="steps",
    logging_steps=100,
    save_strategy="no",
    report_to="tensorboard",
)
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=ds,
)
model.config.use_cache = False

trainer.train()

trainer.model.save_pretrained(peft_model_id)
tokenizer.save_pretrained(peft_model_id)
```

Large Language Models come with built-in loss functions. For many scenarios this works well enough and you don't need [custom loss functions](https://huggingface.co/docs/transformers/main_classes/trainer).

## Output

The script produces the following output:

```bash
$ python3 lora-tune.py 
Loading checkpoint shards: 100%|█████████████████████████████████████████████████████| 2/2 [00:02<00:00,  1.32s/it]
trainable params: 9437184 || all params: 2859194368 || trainable%: 0.33006444422319176
...
{'loss': 0.1128, 'learning_rate': 0.0005454545454545455, 'epoch': 2.27}                                            
{'loss': 0.0735, 'learning_rate': 9.090909090909092e-05, 'epoch': 4.55}                                            
{'train_runtime': 1773.3362, 'train_samples_per_second': 0.973, 'train_steps_per_second': 0.124, 'train_loss': 0.09138318679549477, 'epoch': 5.0}
100%|████████████████████████████████████████████████████████████████████████████| 220/220 [29:33<00:00,  8.06s/it]
```

Tensorboard logs are stored on disc.

```bash
tree logs/
logs/
├── 1701679868.607323
│   └── events.out.tfevents.1701679868.gpu-server.116313.1
└── events.out.tfevents.1701679868.gpu-server.116313.0
```

The custom PEFT/LoRA model is also saved to disc.

```bash
results# ls -la
total 5112
drwxr-xr-x 2 root root    4096 Nov 28 11:56 .
drwxr-xr-x 6 root root    4096 Dec  4 09:20 ..
-rw-r--r-- 1 root root     355 Nov 28 11:56 adapter_config.json
-rw-r--r-- 1 root root 2787918 Nov 28 11:56 adapter_model.bin
-rw-r--r-- 1 root root    2201 Nov 28 11:56 special_tokens_map.json
-rw-r--r-- 1 root root 2422164 Nov 28 11:56 tokenizer.json
-rw-r--r-- 1 root root    2497 Nov 28 11:56 tokenizer_config.json

cat adapter_config.json
{
  "base_model_name_or_path": "google/flan-t5-xl",
  "bias": "none",
  "enable_lora": null,
  "fan_in_fan_out": false,
  "inference_mode": true,
  "lora_alpha": 32,
  "lora_dropout": 0.05,
  "merge_weights": false,
  "modules_to_save": null,
  "peft_type": "LORA",
  "r": 16,
  "target_modules": [
    "q",
    "v"
  ],
  "task_type": "SEQ_2_SEQ_LM"
}
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.