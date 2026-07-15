---
id: nh-184
title: "Introducing Workflows and Sub-Agents in IBM Bob v2"
date: 2026-07-15 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-184'
permalink: /article/workflows-sub-agents-ibm-bob/
custom_permalink:
    - article/workflows-sub-agents-ibm-bob/
image: /assets/img/2026/07/bob-workflows-sub-agents-0.jpg
---

*One of the key challenges in agentic software development is keeping AI-driven tasks reliable, predictable, and efficient. The latest version of IBM Bob addresses these pain points by introducing workflows that seamlessly blend deterministic scripting with AI reasoning. Additionally, Bob v2 now supports sub-agents, allowing developers to run tasks in parallel using isolated context windows.*

The [version 2](https://bob.ibm.com/blog/bob-v2-release-announcement/) of IBM Bob comes with lots of new great features. This post explores how [workflows](https://bob.ibm.com/docs/ide/premium-packages/java-modernization/java-modernization-index) and [sub-agents](https://bob.ibm.com/docs/ide/features/subagents) work together to optimize your development cycle using a practical example.

## Workflows

AI-based development tools are incredibly powerful, but relying entirely on autonomous agents can lead to unpredictable, expensive, and slow results on complex tasks. The solution lies in a hybrid approach: using deterministic code for known, structured processes, and delegating only non-deterministic reasoning to the AI. Workflows allow you to define a precise sequence of steps for Bob to execute:

- Deterministic Steps: Tasks like scanning the filesystem, running shell commands, or checking build outputs are handled via pure code. Because they run locally, they do not consume any AI tokens.
- AI-Driven Steps: Tasks requiring generation, analysis, or transformation invoke the model. These steps benefit significantly from a clean, highly focused context prepared by the preceding deterministic steps.

While two core workflows are built directly into Bob, specialized workflows are delivered through Premium packages. Each package ships tested, opinionated workflows built on decades of IBM work in its domain: the IBM Bob Premium Package for Java Modernization, the Premium Package for IBM i, and the Premium Package for IBM Z.

![image](/assets/img/2026/07/bob-workflows-sub-agents-4.jpg)

Agentic development tools are most effective when they stay in their lane. A single monolithic prompt asking an AI to 'add unit tests to this entire Java project' is unpredictable, token-hungry, and difficult to debug when something goes wrong. The workflow approach solves each of these problems:

- Predictability: every run follows the same defined path; conditional branches are explicit, not inferred by the model
- Efficiency: deterministic steps use zero AI tokens; parallel sub-agents reduce total wall-clock time
- Debuggability: each step has a clear purpose, making it straightforward to identify where a run diverged from expectations
- Control: the interactive Select Action step ensures developers stay in the loop at the point where strategy becomes execution

## Example

The Java Modernization Premium Package includes a specialized Java Unit Testing Workflow consisting of eight sequential steps:

1. Initialize Unit Test Workflow (Deterministic)
2. Add JaCoCo Library (Deterministic)
3. Generate Unit Test Strategy (AI-driven)
4. Select Action (Interactive User Gate)
5. Generate Unit Tests (AI-driven / Parallel Sub-Agents)
6. Run Unit Tests (Deterministic)
7. Generate Visual Summary (Deterministic)
8. Generate Modernization Summary (AI-driven)

![image](/assets/img/2026/07/bob-workflows-sub-agents-1.jpg)

During the workflow, Bob can prompt users for input by presenting an interactive UI panel, giving developers direct control over which actions to execute next.

## Sub-Agents

Sub-agents are independent agent instances spawned by the primary agent to handle isolated tasks. Operating each sub-agent within its own context window yields two major advantages:

1. Parallel Execution: When a large task can be broken down into independent chunks—such as generating unit tests for ten different classes—the primary agent can launch multiple sub-agents simultaneously. Gathering their results in parallel dramatically reduces total wall-clock execution time.
2. Context Hygiene: Multi-step tasks inevitably clutter a model's context window with intermediate outputs, error logs, and temporary code scaffolding. Sub-agents begin with a fresh, clean slate, ensuring they only process the exact information required for their assigned task.

Sub-agents are ideal for modular tasks that follow a simple rule: 'Take this clearly defined input, produce this specific output, and ignore everything else.'

In our Java testing example, three parallel sub-agents are spun up to write individual test cases. Each starts with a clean context window, consumes its own tokens, and hands its completed work back to the parent agent.

![image](/assets/img/2026/07/bob-workflows-sub-agents-2.jpg)

## Result

After generating and running the tests a visualization and a summary is generated.

![image](/assets/img/2026/07/bob-workflows-sub-agents-3.jpg)

The workflow design reflects an important principle: anything that can be done deterministically, should be. Step 1 collects all environment information via standard filesystem operations. Step 6 runs the test command directly. Only steps 3 and 5 where creativity, reasoning, and code generation are genuinely needed reach out to the language model.

## Next Steps

To find out more, check out the following resources:

* Try [Bob](https://bob.ibm.com/trial/)
* [Bob Documentation](https://bob.ibm.com/docs/ide)
* [Java Modernization Premium Package](https://bob.ibm.com/docs/ide/premium-packages/java-modernization/java-modernization-index)
* [Java Unit Testing Workflow](https://bob.ibm.com/docs/ide/premium-packages/java-modernization/workflows#unit-test-generation-workflow)
* [Sub-Agents in IBM Bob](https://bob.ibm.com/docs/ide/features/subagents)