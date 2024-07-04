---
id: nh-046
title: 'Preparing Data for Fine-tunings of Large Language Models'
date: 2023-09-14 01:15:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-046'
permalink: /article/fine-tuning-instructions/
custom_permalink:
    - article/fine-tuning-instructions/
image: /assets/img/2023/09/fine-tuning-instructions.png
---

*Fine-tuning large language models with instructions is a great technique to customize models efficiently. This post explains briefly how data can be turned into instructions.*

In my earlier post [Instruction Fine-tuning of Large Language Models]({{ "/article/instruct-tuning-large-language-models/" | relative_url }}) I described key concepts of instructions. Some readers had questions how to convert datasets into instructions. For classic ML typically datasets in the following formats are used:

```text
Label, Text
Non-Complaint, Staff very friendly and helpful hotel immaculate
Complaint, My room was dirty and I was afraid to walk barefoot on the floor which looked as if it was not cleaned in weeks White furniture which looked nice in pictures was dirty too ...
```

```text
Example input:
'Anna went to school at University of California Santa Cruz.'
Example output phrases: 
'Anna', 'school', 'University of California Santa Cruz'
```

For decoder-based `Large Language Models` this works differently, since these models have been trained to predict the next tokens. The trick is to convert the complete dataset into a list of prompts.

## Training

The article [Extended Guide: Instruction-tune Llama 2](https://www.philschmid.de/instruction-tune-llama-2) describes a nice sample how to build instructions. The following sample prompt shows how to fine-tune a model to generate an instruction (response below).

```text
### Instruction:
Use the Input below to create an instruction, which could have been 
used to generate the input using an LLM.

### Input:
Hi, I'm writing to request next week, August 1st through August 4th,
off as paid time off.

I have some personal matters to attend ...

Thank you

### Response:
Write an email to my boss that I need next week 08/01 - 08/04 off.
```

The prompt starts with a (first) instruction to generate a (second) instruction which could have caused the model to generate the input content. For fine-tuning the prompts contain all information including the response. For later inferences the actual responses are generated. Here is the generic version:

```text
### Instruction:
Use the Input below to create an instruction, which could have been 
used to generate the input using an LLM.

### Input:
{response}

### Response:
{instruction}
```

The instruction pattern [Alpaca]({{ "/article/fine-tune-small-llm-with-big-llm/" | relative_url }}) is similar and maybe a little easier to read. The [52k instructions](https://raw.githubusercontent.com/tatsu-lab/stanford_alpaca/main/alpaca_data.json) utilize the following format. Context can optionally passed in as input for certain types of instructions.

```text
Below is an instruction that describes a task, paired with an input that 
provides further context. Write a response that appropriately completes 
the request.

### Instruction:
{instruction}

### Input:
{input}

### Response:
{output}
```

After the complete dataset has been converted to instructions/prompts (see diagram at the top), it is passed as a list of strings to the Hugging Face Supervised Fine-tuning Trainer:

```python
from trl import SFTTrainer
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    ...
)
trainer.train()
```

## Inference

At runtime prompts are built that follow the same structure that has been used for the fine-tuning. This supports the model to generate text similarly to what it learned during the fine-tuning and it explains why certain prompts work better for certain models.

```python
model = AutoPeftModelForCausalLM.from_pretrained(
    args.output_dir,
    ...
)
tokenizer = AutoTokenizer.from_pretrained(args.output_dir)
prompt = f"""### Instruction:
Use the Input below to create an instruction, which could have been 
used to generate the input using an LLM.

### Input:
Jack Dorsey, Noah Glass, Biz Stone, Evan Williams

### Response:
"""
input_ids = tokenizer(prompt, return_tensors="pt", truncation=True).input_ids.cuda()
outputs = model.generate(input_ids=input_ids, max_new_tokens=100, do_sample=True, top_p=0.9,temperature=0.9)

print(f"Generated instruction:\n{tokenizer.batch_decode(outputs.detach().cpu().numpy(), skip_special_tokens=True)[0][len(prompt):]}")
> Generated instruction:
> Extract the founders of Twitter from the passage. Display the results in a comma separated format.
```

In the following [Alpaca sample](https://crfm.stanford.edu/2023/03/13/alpaca.html), it looks like the prompt is "What is an alpaca? How is it different from a llama?", but this is only the user input. The prompt contains additionally the text from the template above.

![image](/assets/img/2023/09/alpaca_right_llama.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.