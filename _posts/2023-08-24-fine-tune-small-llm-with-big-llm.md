---
id: nh-031
title: 'Fine-tuning small LLMs with Output from large LLMs'
date: 2023-08-24 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-031'
permalink: /article/fine-tune-small-llm-with-big-llm/
custom_permalink:
    - article/fine-tune-small-llm-with-big-llm/
image: /assets/img/2023/08/alpaca.png
pin: false
---

*The innovation in the AI space is continuing in an incredible speed. This post describes a new technique that has evolved recently which allows smaller fine-tuned models to almost reach the performance of much larger models.*

Over the last six months some significant things have changed in the AI industry and community. While at the beginning of this year many people thought that only big companies can afford building and even fine-tuning `Large Language Models`, new innovative solutions in the open space created by the community have come up. Additionally, some vendors started to keep new versions of their models closed. They were not open sourced anymore and no scientific papers were published anymore.

But in March the Stanford university demonstrated how smaller models can be fine-tuned with the output of larger language models which achieve really good performances. Amazing!

The post [We Have No Moat](https://www.semianalysis.com/p/google-we-have-no-moat-and-neither) by an anonymous author written in May summarizes the quick evolution well.

## Democratization of AI

If smaller models can be fine-tuned to achieve almost the same performance of larger models, many more people and companies can benefit from this technology.

Smaller models require less resources which makes deployments much cheaper. Smaller models can also be fine-tuned faster for specific scenarios. If new techniques like LoRA are applied for the fine-tuning, costs decrease a lot.

It sounds like these savings are the reason why Microsoft built [Orca](https://www.microsoft.com/en-us/research/publication/orca-progressive-learning-from-complex-explanation-traces-of-gpt-4/) which is much cheaper to operate.

**Note:** While `Democratization` sounds good, there are also downsides. Some people use the closed, commercial, large models to train smaller models which is against the interest of the vendors. To prevent this misuse, the licenses and terms of some models explicitly prohibit that their models can be used to train other models.

I think this is fair since these vendors spent a lot of research, time and money on building them. As analogy to development, you could compare this with `Code Decompilation`.

## No One-Size-Fits-All

As Dr. Darío Gil, IBM Senior Vice President and Director of Research, IBM talked about at [IBM Think]({{ "/article/ibm-announces-new-foundation-model-capabilities/" | relative_url }}) there is no such thing like the one model that solves everything:

> Be a value creator, build foundation models on your data and under your control. They will become your most valuable asset. Don't outsource that and don't reduce your AI strategy to an API call. One model, I guarantee you, will not rule them all. ... Build responsibly, transparently and put governance into the heart of your AI lifecycle.

Companies don't only need smaller and cheaper models, but also specialized models for their own needs and businesses. In these cases, some fine-tuning needs to be done, either classic fine-tuning or LoRA based fine-tuning. Companies shouldn't have to start with pretraining large language models, but use good starting points provided by vendors like IBM.

## Alpaca

The work from the Stanford university is impressive. I won't go into the details, but only summarize the key concepts.

First some students created 175 well written instructions and sample data. These instructions were used on an OpenAI model to generate 52k synthetic instructions. Note: I'm not a lawyer, but as far as I understand this is not allowed commercially.

With the 52k instructions, `LLaMA` has been fine-tuned to create `Alpaca`. Again, consult your legal departments if this can be done.

If you want to find out more, check out these resources:

* [Alpaca: A Strong, Replicable Instruction-Following Model](https://crfm.stanford.edu/2023/03/13/alpaca.html)
* Video: [Self-instruct fine-tuning of LLMs](https://www.youtube.com/watch?v=m18C1cvoYvM)
* Video: [The ALPACA Code explained: Self-instruct fine-tuning of LLMs](https://www.youtube.com/watch?v=jQL0ZeHtXFc)
* [Alpaca on GitHub](https://github.com/tatsu-lab/stanford_alpaca)

The GitHub repo contains all necessary assets to redo the fine-tuning:

1. Prompt
2. 175 original instructions
3. 52k generated instructions
4. Training source code

Shortly after Alpaca was published, a cross-university collaboration created [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/), an even better version than Alpaca. This one is based on ChatGPT chats that users posted on another site.

![image](/assets/img/2023/08/vicuna.png)

## Recipe

If you want to learn how to fine-tune your own models, check out my previous posts:

* [LoRA Fine-Tuning]({{ "/article/efficient-fine-tuning-lora/" | relative_url }})
* [Synthetic Data Generation]({{ "/article/generating-synthetic-data/" | relative_url }})
* [Instruction Fine-Tuning]({{ "/article/instruct-tuning-large-language-models/" | relative_url }})
* [Open Source LLMs]({{ "/article/open-source-llm-watsonxai/" | relative_url }})

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.