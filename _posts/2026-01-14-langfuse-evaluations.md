---
id: nh-158
title: 'Evaluating Agents via LLM-as-a-Judge in Langfuse'
date: 2026-01-14 02:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-158'
permalink: /article/langfuse-evaluations/
custom_permalink:
    - article/langfuse-evaluations/
image: /assets/img/2026/01/langfuse-evaluations-00.png
---

*Evaluations of non-deterministic agentic systems are important in the development phase and when running them in production. Separate Large Language Models can help to run these evaluations. This post describes how to use LLM-as-a-Judge in Langfuse.*

Often there is no or not enough ground truth data to compare outcomes of agents with the best possible answers at development time. When agents are running in production, users can instruct agents as they like in which case ground truth data cannot be utilized anyway. In both scenarios ```LLM-as-a-Judge``` is a powerful technique to evaluate agents without having to have ground truth data and without having to have human experts who evaluate manually.

[Langfuse](https://langfuse.com/) is an open-source LLM engineering platform. In addition to managing traces, it also provides functionality to evaluate models, prompts and agents.

* [Langfuse Intro - Evaluations Deep Dive](https://www.youtube.com/watch?v=hlgfW0IyREc)
* [Langfuse LLM-as-a-Judge Documentation](https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge)

Langfuse comes with a list of pre-defined evaluators:

![image](/assets/img/2026/01/langfuse-evaluations-01.png)

## Custom Evaluators

As shown in the image at the top of this post, custom evaluators can be defined, simply by using prompting. The example prompt compares whether the language of the input is the same one as the language of the output.

To use LLM-as-a-Judge you need a Large Language Model. In the following sample it's a local model, but typically larger models work better.

![image](/assets/img/2026/01/langfuse-evaluations-05.png)

As part of the prompt variables can be defined. Their values are read from the traces. Via JSONPath nested data in the traces can be addressed.

The evaluators can be run on existing or new traces.

![image](/assets/img/2026/01/langfuse-evaluations-02.png)

## Results

The results show up in the traces directly.

![image](/assets/img/2026/01/langfuse-evaluations-03.png)

Alternatively, the scores are displayed separately under 'Scores'.

![image](/assets/img/2026/01/langfuse-evaluations-04.png)

## watsonx Orchestrate

Watsonx Orchestrate is IBM's platform to build and run multi-agent enterprise systems. It uses Langfuse for observability via [OpenTelemetry](https://opentelemetry.io/).

As part of the watsonx Orchestrate ADK (Agent Development Kit) there is an framework to evaluate the quality of agents.

* [Evaluating Agents in watsonx Orchestrate]({{ "/article/agent-evaluations-watsonx-orchestrate/" | relative_url }})
* [Creating Ground Truth Datasets for Agent Evaluations]({{ "/article/ground-truth-generation-agent-evaluations/" | relative_url }})

The results of the evaluations can be stored in [Langfuse](https://developer.watson-orchestrate.ibm.com/evaluate/evaluate#agentops-evaluation).

![image](/assets/img/2026/01/langfuse-dashboard.jpeg)

## Next Steps

To find out more, check out the following resources:

* [Langfuse](https://langfuse.com/)
* [LLM-as-a-Judge](https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge)
* [Langfuse in Orchestrate](https://developer.watson-orchestrate.ibm.com/evaluate/evaluate#agentops-evaluation)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)