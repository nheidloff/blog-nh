---
id: nh-112
title: 'watsonx Orchestrate Agent Routing to Skills'
date: 2025-03-03 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-112'
permalink: /article/watsonx-orchestrate-agent-skills/
custom_permalink:
    - article/watsonx-orchestrate-agent-skills/
image: /assets/img/2025/03/orchestrate-agent-skills-01.png
---

*Recently watsonx Orchestrate has added support for agentic capabilities. Orchestration agents can route to assistants, skills and agents. This post focusses on the routing to skills, skill flows and apps.*

With watsonx Orchestrate you can easily create personalized generative AI-powered assistants and agents to automate and accelerate your work, see the documentation [What's new in IBM watsonx Orchestrate: AI agent available on IBM Cloud](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=releases-whats-new-in-watsonx-orchestrate-january-2025#ai-agent-available-on-span-translatenoibm-cloudspan).

This post is part of a mini-series about agents in Orchestrate:

1. [watsonx Orchestrate Agent Routing to Assistants]({{ "/article/watsonx-orchestrate-agent-assistants/" | relative_url }}) 
2. [watsonx Orchestrate Agent Routing to Skills]({{ "/article/watsonx-orchestrate-agent-skills/" | relative_url }}) (this post)
3. [watsonx Orchestrate Agent Routing to Agents]({{ "/article/watsonx-orchestrate-agent-agents/" | relative_url }})

## Overview

watsonx Orchestrate provides three different ways to define, package and deploy skills. This post focusses on single skills.

1. Skills
2. Skill flows
3. Apps

## Import OpenAPI

In addition to leveraging from a broad range of [predefined skills](https://www.ibm.com/products/watsonx-orchestrate/skills), custom skills can be defined by importing OpenAPI definitions of deployed REST services ([example](https://github.com/IBM/watsonx-ai-platform-demos/blob/main/applications/application/public/swagger-orchestrate.json)).

![image](/assets/img/2025/03/orchestrate-agent-skills-02.png)

Four skills have been imported.

![image](/assets/img/2025/03/orchestrate-agent-skills-03.png)

## Skills

Next skills can be enhanced before they are published.

![image](/assets/img/2025/03/orchestrate-agent-skills-04.png)

The skills need to be connected so that Orchestrate can consume them. Credentials can be provided so that users don't have to authenticate with their personal credentials.

![image](/assets/img/2025/03/orchestrate-agent-skills-05.png)

In the agent routing configuration choose the routing targets from a catalog of apps, skill flows and skills. The imported skill from above is part of 'watsonx-demo'.

![image](/assets/img/2025/03/orchestrate-agent-skills-06.png)

The description of the skill (see screenshot at the top) is key, since the orchestration agent uses this description to determine where to route to.

The sample skill is an a agent that determines based on a [transcript](https://raw.githubusercontent.com/IBM/watsonx-ai-platform-demos/refs/heads/main/applications/application/prompts/prompt4.md) of a phone call between a client and a human agent whether a router needs to be fixed.

![image](/assets/img/2025/03/orchestrate-agent-skills-07.png)

## Skill Flows

Skill flows combine several skills. Via the Orchestrate user interface these flows can be defined without any coding.

![image](/assets/img/2025/03/orchestrate-agent-skills-08.png)

## Apps

Apps group different skills which share the same connection information.

![image](/assets/img/2025/03/orchestrate-agent-skills-09.png)

## Next Steps

Check out [watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate), the AI for business productivity, to learn more.