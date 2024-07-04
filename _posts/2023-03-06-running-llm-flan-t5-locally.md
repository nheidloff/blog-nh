---
id: nh-011
title: 'Running the Large Language Model FLAN-T5 locally'
date: 2023-03-04 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-011'
permalink: /article/running-llm-flan-t5-locally/
custom_permalink:
    - article/running-llm-flan-t5-locally/
image: /assets/img/2023/03/flan-t5-simple.png
---

*While there are several playgrounds to try Foundation Models, sometimes I prefer running everything locally during development and for early trial and error experimentations. This post explains how to set up the Anaconda environment via Docker and how to run the small Flan-T5 model locally.*

## FLAN-T5

FLAN-T5 is a Large Language Model open sourced by Google under the Apache license at the end of 2022. It is available in different sizes - see the [model card](https://huggingface.co/docs/transformers/model_doc/flan-t5).

* google/flan-t5-small: 80M parameters; 300 MB download
* google/flan-t5-base: 250M parameters
* google/flan-t5-large: 780M parameters; 1 GB download
* google/flan-t5-xl: 3B parameters; 12 GB download
* google/flan-t5-xxl: 11B parameters

FLAN-T5 models use the following models and techniques:

* The pretrained model T5 (Text-to-Text Transfer Transformer)
* The FLAN (Finetuning Language Models) collection to do fine-tuning multiple tasks

FLAN-T5 is especially good in reasoning. Let's look at an example:

```text
Input:
Answer the following yes/no question by reasoning step-by-step.
Can you write a whole Haiku in a single tweet?

Output:
A haiku is a japanese three-line poem.
That is short enough to fit in 280 characters. 
So the answer is yes.
```


## Setup

Run Anaconda in a container:

```bash
mkdir workspace && cd workspace
docker run -i -t -p 8888:8888 -v "$PWD":/home --name anaconda3 continuumio/anaconda3
```

From within the container install the dependencies and run Jupyter:

```bash
pip install transformers
pip install transformers[torch]
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cpu
conda install pytorch torchvision torchaudio cpuonly -c pytorch
jupyter lab --ip='0.0.0.0' --port=8888 --no-browser --allow-root --notebook-dir=/home
```

Open Jupyter in your browser via the link which you'll find in the terminal.

After you stop Jupyter and the container, you can restart everything:

```bash
docker start anaconda3
docker exec -it anaconda3 /bin/bash
jupyter lab --ip='0.0.0.0' --port=8888 --no-browser --allow-root --notebook-dir=/home
```


## Sample

The following snippet is a simple sample which uses the pretrained model:

```python
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")

inputs = tokenizer("A step by step recipe to make bolognese pasta:", return_tensors="pt")
outputs = model.generate(**inputs)
print(tokenizer.batch_decode(outputs, skip_special_tokens=True))
```

The snippet prints "Pour a cup of bolognese into a large bowl and add the pasta".


## Resources

* [FLAN-T5 Model Documentation](https://huggingface.co/docs/transformers/model_doc/flan-t5)
* [PyTorch Transformers Examples](https://github.com/huggingface/transformers/tree/main/examples/pytorch)
* [Hugging Face Transformers Installation](https://huggingface.co/docs/transformers/installation)
* [Anaconda Docker Documentation](https://docs.anaconda.com/anaconda/user-guide/tasks/docker/)
* [How to Run Python 3 and Jupyter Lab using an Anaconda Docker Container and VS Code](https://www.youtube.com/watch?v=cK7vgjOntqM)