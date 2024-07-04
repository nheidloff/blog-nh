---
id: nh-062
title: 'Evaluating LoRA Fine-Tuning Results'
date: 2023-12-07 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-062'
permalink: /article/evaluating-lora-fine-tuning-results/
custom_permalink:
    - article/evaluating-lora-fine-tuning-results/
image: /assets/img/2023/08/lora.png
---

*After Large Language Models have been fine-tuned, the quality needs to be evaluated. This post describes a simple s
example utilizing a custom evaluation mechanism.*

For standard LLM tasks there are standard metrics, for example the ones that are displayed in the Hugging Face Leadership Board. For custom specific scenarios, custom evaluation logic needs to be implemented.

Read the following posts and articles for more context.

* [Preparing LLM LoRA Fine-Tuning locally]({{ "/article/preparing-llm-lora-fine-tuning-locally/" | relative_url }})
* [Fine-Tuning LLMs with LoRA on a small GPU]({{ "/article/fine-tuning-llm-lora-small-gpu/" | relative_url }})
* [Deploying a Virtual Server with GPU in the IBM Cloud]({{ "/article/deploying-virtual-server-gpu-ibm-cloud/" | relative_url }})
* [Training Models locally via Containers]({{ "/article/training-models-locally-containers-tensorboard/" | relative_url }})
* [Efficient Large Language Model training with LoRA and Hugging Face](https://www.philschmid.de/fine-tune-flan-t5-peft)

## Example

Let's look at an example. First install the necessary Hugging Face libraries.

```bash
pip install "peft==0.2.0"
pip install "transformers==4.27.2" 
pip install "datasets"
```

The following code evaluates the fine-tuned model against the reserved evaluation dataset.

```python
peft_model_id="results-ft-model"
data_eval="data/eval"
output_csv= "./20231206_finetuned_evals.csv"
prompt_instruction="Input: " # or ""

import torch
from peft import PeftModel, PeftConfig
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import pandas as pd
from datasets import load_from_disk
from random import randrange
dataset = load_from_disk(data_eval)

config = PeftConfig.from_pretrained(peft_model_id)
model = AutoModelForSeq2SeqLM.from_pretrained(config.base_model_name_or_path,  load_in_8bit=True,  device_map={"":0})
tokenizer = AutoTokenizer.from_pretrained(config.base_model_name_or_path)
model = PeftModel.from_pretrained(model, peft_model_id, device_map={"":0})
model.eval()

def calculate_accuracy(predicted, ground_truth):
    accuracy = 0.0
    # calculate accuracy or whatever other metrics you need
    return accuracy

accuracy_per_row = []
for row in dataset:
    ground_truth = row["output_ground_truth"]
    input = row["input"]  
    input_ids = tokenizer(prompt_instruction + input, return_tensors="pt", truncation=True).input_ids.cuda()
    
    outputs = model.generate(input_ids=input_ids, max_new_tokens=1000, do_sample=False)
    output_decoded = tokenizer.batch_decode(outputs.detach().cpu().numpy(), skip_special_tokens=True)[0] 
  
    accuracy, some_other_metrics = calculate_accuracy(output_decoded, ground_truth)  
    accuracy_per_row.append(
        {
            "input": input,
            "output": output_decoded,
            "output_ground_truth": ground_truth,
            "accuracy": accuracy
        }
    )
results = pd.DataFrame(accuracy_per_row)
print("On {} items the model performed with {:.2f}% overall accuracy".format(len(results), results["Accuracy"].mean()))

results.to_csv(output_csv, header=True)
```

The script gets ground truth data in this format:

| input   | output_ground_truth   | 
|:--------|----------------------:|
| input 1 | output ground truth 1 |
| input 2 | output ground truth 2 |
| ...     | ...                   |

It generates a file with the generated output and accuracy. The accuracy is calculated in a custom function.

| input   | output   | output_ground_truth   | accuracy |
|:--------|:---------|:----------------------|---------:|
| input 1 | output 1 | output ground truth 1 | 0.1      |
| input 2 | output 2 | output ground truth 2 | 0.2      |
| ...     | ...      | ...                   | ...      |

The standard output can look like this:

```text
On 20 items the model performed with 67.49% overall accuracy
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.