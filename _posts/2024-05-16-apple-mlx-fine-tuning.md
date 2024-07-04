---
id: nh-073
title: 'Fine-tuning LLMs with Apple MLX locally'
date: 2024-05-16 10:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-073'
permalink: /article/apple-mlx-fine-tuning/
custom_permalink:
    - article/apple-mlx-fine-tuning/
image: /assets/img/2024/05/mlx.png
---

*MLX is a framework for machine learning with Apple silicon from Apple Research. This post describes how to fine-tune a 7b LLM locally in less than 10 minutes on a MacBook Pro M3.*

> MLX is designed by machine learning researchers for machine learning researchers. The framework is intended to be user-friendly, but still efficient to train and deploy models. 

* [Apple MLX](https://github.com/ml-explore/mlx)
* [Applex MLX Examples](https://github.com/ml-explore/mlx-examples)
* [Memory Considerations](https://github.com/ml-explore/mlx-examples/blob/69181e00584976f717c27f90c7e009e70cc1b0bf/llms/mlx_lm/LORA.md#memory-issues)
* [Fine-Tuning Configuration](https://github.com/ml-explore/mlx-examples/blob/69181e00584976f717c27f90c7e009e70cc1b0bf/llms/mlx_lm/examples/lora_config.yaml)

Below are step by step instructions how to fine-tune Mistral for SQL generation.

## Setup

Run the following commands to install the framework and samples.

```bash
mkdir mlx
cd mlx
git clone https://github.com/ml-explore/mlx-examples.git
cd mlx-examples/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Model Download

Models can be downloaded from HuggingFace in various ways. The next commands show how to use the HuggingFace CLI to download a non-quantized version of Mistral.

```bash
pip install hf_transfer
huggingface-cli download mistralai/Mistral-7B-Instruct-v0.2
ls -la /Users/niklasheidloff/.cache/huggingface/hub 
drwxr-xr-x   6 niklasheidloff  staff  192 May 12 11:37 models--mistralai--Mistral-7B-Instruct-v0.2
```

The model can be run locally.

```bash
pip install mlx-lm
mlx_lm.generate --model mistralai/Mistral-7B-Instruct-v0.2 --prompt "hello, who are you"
```

## Data Preparation

Next the [data](https://huggingface.co/datasets/b-mc2/sql-create-context) needs to be loaded. The next snippet downloads data in the standard conversational format:

```python
from datasets import load_dataset
folder="my-data-chat/" 
system_message = """You are an text to SQL query translator. Users will ask you questions in English and you will generate a SQL query based on the provided SCHEMA.
SCHEMA:
{schema}"""
def create_conversation(sample):
  return {
    "messages": [
      {"role": "system", "content": system_message.format(schema=sample["context"])},
      {"role": "user", "content": sample["question"]},
      {"role": "assistant", "content": sample["answer"]}
    ]
  }
dataset = load_dataset("b-mc2/sql-create-context", split="train")
dataset = dataset.shuffle().select(range(150))
dataset = dataset.map(create_conversation, remove_columns=dataset.features,batched=False)
dataset = dataset.train_test_split(test_size=50/150)
dataset_test_valid = dataset['test'].train_test_split(0.5)
print(dataset["train"][45]["messages"])
dataset["train"].to_json(folder + "train.jsonl", orient="records")
dataset_test_valid["train"].to_json(folder + "test.jsonl", orient="records")
dataset_test_valid["test"].to_json(folder + "valid.jsonl", orient="records")
```

The files test.jsonl, train.jsonl and valid.jsonl are created.

```bash
cd lora/
pip install datasets
python load-data.py
ls -la my-data 
-rw-r--r--   1 niklasheidloff  staff  12214 May 12 12:17 test.jsonl
-rw-r--r--   1 niklasheidloff  staff  47449 May 12 12:17 train.jsonl
-rw-r--r--   1 niklasheidloff  staff  12045 May 12 12:17 valid.jsonl
```

The [documentation](https://github.com/ml-explore/mlx-examples/blob/69181e00584976f717c27f90c7e009e70cc1b0bf/llms/mlx_lm/LORA.md#data) states that the conversational format is supported, but it didn't work for me. 

```json
{
    "messages":[
        {"content": "You are an text to SQL query translator. Users will ask you questions in English and you will generate a SQL query based on the provided SCHEMA.\nSCHEMA:\nCREATE TABLE table_name_71 (tie_no VARCHAR, away_team VARCHAR)","role":"system"},
        {"content": "What is Tie No, when Away Team is \"Millwall\"?","role":"user"},
        {"content": "SELECT tie_no FROM table_name_71 WHERE away_team = \"millwall\"","role":"assistant"}
    ]
}
```

I converted the data in the following 'text' format.

```json
{
    "text": "You are an text to SQL query translator. Users will ask you questions in English and you will generate a SQL query based on the provided SCHEMA.\nSCHEMA:\nCREATE TABLE table_name_71 (tie_no VARCHAR, away_team VARCHAR)\nUser:What is Tie No, when Away Team is \"Millwall\"?\nAssistant:SELECT tie_no FROM table_name_71 WHERE away_team = \"millwall\""
}
```

Snippet to convert the data:

```python
import json
folder_input='./my-data-chat/'
folder_output='./my-data-text/'
names=['test', 'train', 'valid']
for name in names:
    with open(folder_input + name + '.jsonl', 'r') as json_file:
        json_list = list(json_file)
    with open(folder_output + name + '.jsonl', 'w') as outfile:
        for json_str in json_list:
            result = json.loads(json_str)
            message = result['messages']
            entry = {
                "text": message[0]['content'] + '\nUser:' + message[1]['content'] + '\nAssistant:' + message[2]['content']
            }
            json.dump(entry, outfile)
            outfile.write('\n')
```

```bash
mkdir my-data-text
python convert-data.py
ls -la my-data-text 
-rw-r--r--   1 niklasheidloff  staff   9625 May 12 13:01 test.jsonl
-rw-r--r--   1 niklasheidloff  staff  39138 May 12 13:01 train.jsonl
-rw-r--r--   1 niklasheidloff  staff  10263 May 12 13:01 valid.jsonl
```

## Fine-Tuning

Next the fine-tuning can be started. The [documentation](https://github.com/ml-explore/mlx-examples/blob/69181e00584976f717c27f90c7e009e70cc1b0bf/llms/mlx_lm/LORA.md#memory-issues) explains how to set parameters to consume less memory.

Parameters can be defined via application arguments or via a [config.yaml](https://github.com/ml-explore/mlx-examples/blob/69181e00584976f717c27f90c7e009e70cc1b0bf/llms/mlx_lm/examples/lora_config.yaml) file.

For 1000 iterations and the 100 SQL samples this process took 10 minutes on my MacBook.

```bash
python lora.py \
    --model mistralai/Mistral-7B-Instruct-v0.2 \
    --train \
    --batch-size 1 \
    --lora-layers 4 \
    --data my-data-text
ls -la
-rw-r--r--   1 niklasheidloff  staff  1708214 May 12 13:12 adapters.npz
```

The fine-tuning produces an 'adapters.npz' file which can be converted into the safetensors format.

```bash
python fuse.py --model mistralai/Mistral-7B-Instruct-v0.2 --save-path my-models --adapter-file adapters.npz
ls -la my-models 
-rw-r--r--   1 niklasheidloff  staff         643 May 12 13:17 config.json
-rw-r--r--   1 niklasheidloff  staff  5261946744 May 12 13:17 model-00001-of-00003.safetensors
-rw-r--r--   1 niklasheidloff  staff  5352141224 May 12 13:17 model-00002-of-00003.safetensors
-rw-r--r--   1 niklasheidloff  staff  3869410030 May 12 13:17 model-00003-of-00003.safetensors
-rw-r--r--   1 niklasheidloff  staff       25125 May 12 13:17 model.safetensors.index.json
-rw-r--r--   1 niklasheidloff  staff         414 May 12 13:17 special_tokens_map.json
-rw-r--r--   1 niklasheidloff  staff     1795331 May 12 13:17 tokenizer.json
-rw-r--r--   1 niklasheidloff  staff        1460 May 12 13:17 tokenizer_config.json
```

## Evaluation

There are different ways to run inferences. For example, the model could be converted to GGUF and run locally via [llama.cpp]({{ "/article/running-mistral-locally-cpu/" | relative_url }}).

Alternatively mlx_lm.generate can be used. The following input (instruction, schema and question) should return the following output:

'SELECT MIN(series_number) FROM table_13505192_3 WHERE season_number = 24'

```bash
mlx_lm.generate --model my-models --prompt "You are an text to SQL query translator. Users will ask you questions in English and you will generate a SQL query based on the provided SCHEMA.\nSCHEMA:\nCREATE TABLE table_13505192_3 (series_number INTEGER, season_number VARCHAR)\nUser:What is the series number for season episode 24?\nAssistant:"
==========
Prompt: <s>[INST] You are an text to SQL query translator. Users will ask you questions in English and you will generate a SQL query based on the provided SCHEMA.\nSCHEMA:\nCREATE TABLE table_13505192_3 (series_number INTEGER, season_number VARCHAR)\nUser:What is the series number for season episode 24?\nAssistant: [/INST]
SELECT series_number FROM table_13505192_3 WHERE season_number = "24"
==========
Prompt: 208.008 tokens-per-sec
Generation: 9.298 tokens-per-sec
```

In this example the fine-tuned model returned a correct SQL statement.