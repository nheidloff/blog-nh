---
id: nh-111
title: 'watsonx Orchestrate Agent Routing to Assistants'
date: 2025-03-02 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-111'
permalink: /article/watsonx-orchestrate-agent-assistants/
custom_permalink:
    - article/watsonx-orchestrate-agent-assistants/
image: /assets/img/2025/03/orchestrate-agent-assistant-01.png
---

*Recently watsonx Orchestrate has added support for agentic capabilities. Orchestration agents can route to assistants, skills and agents. This post focusses on the routing between assistants and actions.*

With watsonx Orchestrate you can easily create personalized generative AI-powered assistants and agents to automate and accelerate your work, see the documentation [What's new in IBM watsonx Orchestrate: AI agent available on IBM Cloud](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=releases-whats-new-in-watsonx-orchestrate-january-2025#ai-agent-available-on-span-translatenoibm-cloudspan).

This post is part of a mini-series about agents in Orchestrate:

1. [watsonx Orchestrate Agent Routing to Assistants]({{ "/article/watsonx-orchestrate-agent-assistants/" | relative_url }}) (this post)
2. [watsonx Orchestrate Agent Routing to Skills]({{ "/article/watsonx-orchestrate-agent-skills/" | relative_url }})
3. [watsonx Orchestrate Agent Routing to Agents]({{ "/article/watsonx-orchestrate-agent-agents/" | relative_url }})

## Example

Let's look at an example. The three questions are answered by three assistants.

![image](/assets/img/2025/03/orchestrate-agent-assistant-02.png)

Assistants can have three different types of actions:

1. Custom-built actions
2. AI-guided actions
3. Skill-based actions

![image](/assets/img/2025/03/orchestrate-agent-assistant-03.png)

## Custom-built Actions

The following simple example of a custom-built action always returns hardcoded text.

![image](/assets/img/2025/03/orchestrate-agent-assistant-04.png)

Obviously, these actions are typically more sophisticated. The post 
[Accessing LLMs from watsonx Assistant](https://heidloff.net/article/accessing-llm-from-watsonx-assistant/) explains how to leverage Generative AI from watsonx.ai.

## AI-guided Actions

AI-guided actions use Large Language Models and some context, for instance documents, to respond to user input.

![image](/assets/img/2025/03/orchestrate-agent-assistant-05.png)

## Skill-based Actions

Skill-based actions allow accessing lots of [predefined skills](https://www.ibm.com/products/watsonx-orchestrate/skills) in watsonx Orchestrate without having to code anything.

![image](/assets/img/2025/03/orchestrate-agent-assistant-06.png)

Additionally, pro-code developers can build their own [conversational skills](https://heidloff.net/article/watsonx-assistant-orchestrate-pro-code-developers/).

## AI Agent Configuration

The orchestration agent can be defined in the user interface. First the Large Language Model is selected.

![image](/assets/img/2025/03/orchestrate-agent-assistant-07.png)

Next the system prompt can be changed.

![image](/assets/img/2025/03/orchestrate-agent-assistant-08.png)

Via a drop-down box existing assistants can be chosen.

![image](/assets/img/2025/03/orchestrate-agent-assistant-09.png)

The description of the assistant is key, since the orchestration agent uses this description to determine where to route to.

![image](/assets/img/2025/03/orchestrate-agent-assistant-10.png)

You can also integrate assistants defined in other watsonx Orchestrate instances.

![image](/assets/img/2025/03/orchestrate-agent-assistant-11.png)

## Next Steps

Check out [watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate), the AI for business productivity, to learn more.