---
id: nh-098
title: 'Running an Open-Source Reasoning Model locally'
date: 2024-12-05 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-098'
permalink: /article/reasoning-ollama/
custom_permalink:
    - article/reasoning-ollama/
image: /assets/img/2024/12/reasoning-ollama-2.png
---

*The first open-source Reasoning Large Language Model is now available. This post describes briefly what reasoning models are and how to run them locally.*

[Model-based Reasoning](https://www.sciencedirect.com/topics/computer-science/reasoning-model) has been used for quite some time.

> A reasoning model refers to the study of how human thinking progresses from one idea to a related idea. It is an important aspect of problem-solving and involves the ability to reason over a multi-granular world. In computer science, a reasoning model is defined as an uncertain model on an AND/OR graph, where the efficiency of reasoning depends on the satisfaction degree of the homomorphism principle.

## Reasoning Models

While in the easiest way you only need to add "Think step by step" to your prompts, OpenAI brought this concept to the next level with the introduction of GPT-4o which comes with built-in reasoning capabilities. Some people compare this AI functionality with how humans think.


The question "How many r in strawberry" is a popular demo. A more advanced task is the following input. Most classic LLMs struggle to solve this.

"Please add a pair of parentheses to the incorrect equation: 1 + 2 * 3 + 4 * 5 + 6 * 7 + 8 * 9 = 479, to make the equation true."

## QwQ

QwQ is an open-source model available under MIT which can be downloaded from HuggingFace. At this point it is only a preview, but demonstrates already what Reasoning Models are capable of. Read the resouces below for details.

It comes with a special syntax for the prompt:

```text
<|im_start|>system
You are a helpful and harmless assistant. You are Qwen developed by Alibaba. You should think step-by-step.<|im_end|>
<|im_start|>user
Please add a pair of parentheses to the incorrect equation: 1 + 2 * 3 + 4 * 5 + 6 * 7 + 8 * 9 = 479, to make the equation true.<|im_end|>
<|im_start|>assistant
```

## Ollama

A quantized version can be run locally with Apple Mx hardware. Other tools like LM Studio which also leverage lamacpp can be used as well.

```
ollama run qwq
```

After a long response, the model provides the correct answer.

```text
So I've got this equation: 1 + 2 * 3 + 4 * 5 + 6 * 7 + 8 * 9 = 479. The task is to add a pair of parentheses to make this equation true. Hmm, let's see.

First, I need to understand the current equation without any parentheses. In mathematics, multiplication takes precedence over addition according to the order of operations, often remembered by the acronym PEMDAS (Parentheses, Exponents, Multiplication and Division, Addition and Subtraction). So, in the expression 1 + 2 * 3 + 4 * 5 + 6 * 7 + 8 * 9, we'll first perform the multiplications and then the additions.

Let's calculate it step by step:

First, the multiplications:

...

This matches the target sum of 479!

Therefore, the correct placement of parentheses is:

1 + 2 * (3 + 4 * 5 + 6) * 7 + 8 * 9 = 479

**Final Answer**

\[ \boxed{1 + 2 \times (3 + 4 \times 5 + 6) \times 7 + 8 \times 9 = 479} \]
```

![image](/assets/img/2024/12/reasoning-ollama-1.png)

## Resources

* [QwQ: Reflect Deeply on the Boundaries of the Unknown](https://qwenlm.github.io/blog/qwq-32b-preview/)
* [qwq from Ollama](https://ollama.com/library/qwq)
* [bartowski/QwQ-32B-Preview-GGUF](https://huggingface.co/bartowski/QwQ-32B-Preview-GGUF)
* [Qwen/QwQ-32B-Preview](https://huggingface.co/Qwen/QwQ-32B-Preview)