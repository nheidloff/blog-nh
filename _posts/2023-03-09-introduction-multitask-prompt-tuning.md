---
id: nh-014
title: 'Introduction to Multi-task Prompt Tuning'
date: 2023-03-07 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-014'
permalink: /article/introduction-multi-task-prompt-tuning/
custom_permalink:
    - article/introduction-multi-task-prompt-tuning/
image: /assets/img/2023/03/mtprompt-tuning1.jpeg
---

*Training Foundation Models is expensive. Techniques like Prompt Engineering address this by freezing the models and providing context in prompts to optimize results at the expense of losing performance compared to retraining models. New techniques like Prompt Tuning and Multi-task Prompt Tuning are evolving to address this.*

My blog [Introduction to Prompt Tuning](https://heidloff.net/article/introduction-to-prompt-tuning/) explains the differences between three different ways to customize pretrained foundation models to get the best possible results:

1. Fine Tuning
2. Prompt Tuning
3. Prompt Engineering

The key difference between `Fine Tuning` and `Prompt Tuning` is that for Prompt Tuning the models are frozen which means that their parameters are not modified so that customization is cheaper and faster. Sometimes the differentiation between these two options is fluent. In some cases, all layers of the models are frozen, in other cases only the last layers are retrained.


## Prompt Tuning

In 2021 researchers from Google introduced [Prompt Tuning](https://aclanthology.org/2021.emnlp-main.243.pdf). I like especially this chart:

![image](/assets/img/2023/03/mtprompt-tuning2.jpeg)

It shows that `Prompt Tuning` can be as efficient as `Fine Tuning` (called Model Tuning in the graphic) if the model is large enough. `Prompt Engineering` (called Prompt Design in the graphic) cannot provide the same performance.


## Multi-task Prompt Tuning

IBM Research is also doing incredible work in this space. Read the IBM Research blog [What is prompt-tuning?](https://research.ibm.com/blog/what-is-ai-prompt-tuning). My highlight is in the middle of the blog where an upcoming paper in announced [Multitask Prompt Tuning enables Parameter-efficient Transfer Learning](https://openreview.net/pdf?id=Nk2pDtuhTq).

`Multi-task Prompt Tuning` is an evolution of Prompt Tuning. The graphic at the top of this post describes the main idea.

> Instead of retrieving or aggregating source prompts (top), multitask prompt tuning (MPT, bottom) learns a single transferable prompt. The transferable prompt is learned via prompt decomposition and distillation.

And to quote Ramewsar Panda from IBM:

> Think of it as applying multi-task transfer learning to prompts. You learn a single prompt that consolidates task-shared knowledge so you can quickly adapt the model.

The results are impressive.

![image](/assets/img/2023/03/mtprompt-tuning3.png)

The first line 'Finetuning' is just `Fine-Tuning` as described above. 'PT' stands for `Prompt Tuning` and the original version from Google. 'MPT' stands for `Multi-task Prompt Tuning` which is IBM's invention in the paper.

As shown for different tests, the performance of Multi-task Prompt Tuning is significantly better than Prompt Tuning. In average it's even better than Fine Tuning! 


## Resources

* [What is prompt-tuning?](https://research.ibm.com/blog/what-is-ai-prompt-tuning)
* [Multitask Prompt Tuning enables Parameter-efficient Transfer Learning](https://openreview.net/pdf?id=Nk2pDtuhTq)
* [Paper: The Power of Scale for Parameter-Efficient Prompt Tuning](https://aclanthology.org/2021.emnlp-main.243.pdf)
* [Video: The Power of Scale for Parameter-Efficient Prompt Tuning](https://aclanthology.org/2021.emnlp-main.243.mp4)
* [Multitask Prompted Training Enables Zero-Shot Task Generalization](https://arxiv.org/pdf/2110.08207.pdf)
* [State-of-the-art Parameter-Efficient Fine-Tuning (PEFT) methods](https://github.com/huggingface/peft)
* [Introduction to Prompt Tuning](https://heidloff.net/article/introduction-to-prompt-tuning/)
* [Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing](https://arxiv.org/pdf/2107.13586.pdf)
