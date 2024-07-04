---
id: nh-013
title: 'The Importance of Prompt Engineering'
date: 2023-03-06 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-013'
permalink: /article/importance-of-prompt-engineering/
custom_permalink:
    - article/importance-of-prompt-engineering/
image: /assets/img/2023/03/prompt-engineering.jpeg
---

*Foundation Models are the foundation for different AI downstream tasks. To leverage these generic models for specific tasks, prompt engineering is a technique to optimize the results without having to re-train or fine-tune the models. This post shows some samples which demonstrate why prompt engineering is important.*

## Prompt Engineering

The are several good articles that introduce `Prompt Engineering`, for example [Introduction to Prompt Engineering by Armand Ruiz](https://www.nocode.ai/introduction-to-prompt-engineering/). Let me try to explain this in my own words.

Prompt Engineering is similar to Google searches. If you want to find something specific, you should use the right keywords that help the search engine to rank the best results. In addition to keywords, you can also use special parameters like 'site:heidloff.net' to filter the search results. The better the search inputs are, the better the results are.

To allow `Large Language Models` to provide the best possible results for specific tasks like 'Question Answering' or 'Reasoning', you also need to provide good inputs, called prompts. 

Large Language Models have been trained with massive amounts of data. These models have billions of parameters which are the weights of the connections between neurons in the neural networks. The more closely neurons are related, the bigger the weights between them are. Collections of neurons that related to each other are clustered together. For example, there can be clusters like 'recipes', 'flowers', 'English' and many more.

Prompt Engineering helps the AI to find the right entry points in these huge networks. For example, if you look for ingredients for a recipe, good prompts help the AI to start looking for answers in the 'recipes' cluster rather than in the 'flowers' cluster.


## Question Answering

`Question Answering` is a typical use case for Large Language Models like ChatGPT. Let's look at an example. The goal is to find an answer to the following question:

"What are the main benefits of Kubernetes Operators?"

Below are two prompts that produce different results. In both cases the following model with the following configuration has been used:

* FLAN-T5 XXL (11B parameters)
* Temperature: 0
* Min tokens: 10; max tokens: 100
* Top P: 1.0; Top K: 50

The first example shows how only the question is used as prompt. Input:

```text
What are the main benefits of Kubernetes Operators?
```

This produces the following output:

```text
Kubernetes Operators is a Kubernetes extension that integrates your cluster on Docker container host systems with Kubernetes. It makes it far easier to deploy applications to clusters you have established with your Docker host system. 
```

While the answer sounds fluent and competent, it is not correct. Kubernetes Operators are not an extension to Kubernetes and Docker is not required.

The output can be improved via a better prompt which defines clearer instructions and provides context for the question:

```text
Answer the question based on the context below.

Context: The main benefit of operators is to automate operations. Kubernetes operators are capable to automate the expensive and error likely human operations. Features like autopilot and self-healing are typical scenarios. Another benefit of operators is the reusability of software. Software providers can expose operators in various catalogs to reach new markets and to promote their software. Operators leverage the Kubernetes community, since they are a natural and Kubernetes-native way to extend Kubernetes.

Question: What are the main benefits of Kubernetes Operators?

Answer: 
```

Output:

```text
Automate operations. Reusability of software. Leverage the Kubernetes community.
```

The answer is much better. The structure of the prompt is a best practise for 'Question Answering' tasks at this point. However, the field of Prompt Engineering is evolving and efficient prompts can also differ for different models.

1. Instruction
2. Context
3. Question
4. Indication to start with the answer


## Reasoning

Another typical task for Large Language Models is `Reasoning` which is related to 'Question Answering'. The difference is that in addition to the final answer it is explained how the model came up with the answer and it helps the model to actually find the correct answer. Sometimes this technique is also referred to as `Zero-Shot Chain-of-Thought Prompting`.

Let's look at another example. The same FLAN-T5 XXL is used again.

```text
The cafeteria had 23 apples. If they used 20 for lunch and bought 6 more, how many apples do they have?
```

This produces this output which is not correct.

```text
23 + 6 = 33 apples. The answer: 33.
```

It turns out that adding something like 'by reasoning step-by-step' or 'Let's work this out it a step by step to be sure we have the right answer' provides much better results:

```text
Answer the following question by reasoning step-by-step.

The cafeteria had 23 apples. If they used 20 for lunch and bought 6 more, how many apples do they have?
```

The prompt with the same model produces the correct result now.

```text
There are now 23 - 20 = 3 apples left after lunch. There are now 3 + 6 = 9 apples after buying more. Therefore, the answer is 9.
```


## Closing Thoughts

Prompt Engineering is a new technique or even a new profession as consequence of the success of Large Language Models like GPT3. Models work for various natural language processing tasks without having to be re-trained which is expensive and time consuming.

To find the best prompts, known techniques and patterns can be used, but in many cases experimentation is required since Prompt Engineering is rather new and works differently for different types of models. For example, some models allow passing in special tokens like separators, line breaks, etc.

In addition to the text of prompts often parameters can be tuned. The 'temperature' defines whether the model should try to be as precise as possible or whether it should be as creative as possible. Via other parameters the lengths of the outputs can be defined.


## Resources

Here are some resources about Prompt Engineering that helped me:

* [Introduction to Prompt Engineering](https://www.nocode.ai/introduction-to-prompt-engineering/)
* [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
* [Learn Prompting](https://learnprompting.org/docs/intro)
* [Prompt Engineering with OpenAI's GPT-3 and other LLMs](https://www.youtube.com/watch?v=BP9fi_0XTlw)