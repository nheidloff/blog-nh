---
id: nh-092
title: 'AI Agents with watsonx.ai'
date: 2024-11-21 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-092'
permalink: /article/ai-agents-watsonx-ai-llm/
custom_permalink:
    - article/ai-agents-watsonx-ai-llm/
image: /assets/img/2024/11/agentic-agent-builder.png
---

*Agents are the next step in the evolution of AI. Via tools AI agents can not only generate text, but invoke business logic and access real time data. Sophisticated tasks can be solved by multiple agents working together like human experts cooperate in teams. This post summarizes some of the agent related technologies IBM covered at IBM TechXchange.*

The area of agents is evolving and changing fast. There is not the one solution that solves all AI agent related scenarios.

![image](/assets/img/2024/11/agentic-one-size.png)

IBM watsonx.ai comes with an enterprise-grade AI developer studio covering a wide range of tools, SDKs and frameworks.

![image](/assets/img/2024/11/agentic-enterprise-grade.png)

## Agent Builder

Agent Builder which is integrated in watsonx.ai Prompt Lab supports integrations of various agent frameworks. Agents are defined via instructions and a list of tools.

![image](/assets/img/2024/11/agentic-agent-builder-2.png)

## Bee Agent Framework

The latest versions of the Bee Agent Framework come with a nice UI to invoke agents and to see what they do. A Python interpreter allows running static Python code and Python code generated dynamically by Large Language Models.

![image](/assets/img/2024/11/agentic-bee.png)

## MARC

MARC stands for Multi Agent Resource Coordinator. An orchestrator agent creates execution plans for intelligent agents to collaborate on complex tasks.

![image](/assets/img/2024/11/agentic-marc-1.png)

![image](/assets/img/2024/11/agentic-marc-2.png)

## Flows Engine

With Flows Engine data can easily be accessed in different types of databases, for example GraphQL. Agents translate natural user input into queries via APIs.

![image](/assets/img/2024/11/agentic-flows-engine.png)

## Open Source

In addition to IBM technologies, you can also leverage open-source technologies like LangChain, LangGraph, etc. The following screenshot shows how an AI application built with CrewAI can be deployed on watsonx.ai.

![image](/assets/img/2024/11/agentic-crewai.png)

## Next Steps

Check out the following resources to learn details.

* [AI Agent Development](https://www.ibm.com/products/watsonx-ai/ai-agent-development)
* [IBM TechXchange Conference Session Presentations](https://community.ibm.com/community/user/discussion/ibm-techxchange-conference-session-presentations-how-to-access)
* Video: [Opening kickoff - The rise of agents](https://www.ibm.com/community/ibm-techxchange-conference/)
* Slides: [Opening kickoff - The rise of agents](https://community.ibm.com/community/user/viewdocument/3498-opening-kickoff?CommunityKey=8c64553a-86a9-4af3-a2e6-55826c69b4e2&tab=librarydocuments)
* Video: [Track Spotlight for AI Software](https://www.ibm.com/community/ibm-techxchange-conference/)
* Slides: [Track Spotlight for AI Software](https://community.ibm.com/community/user/viewdocument/3658-ai-spotlight?CommunityKey=8c64553a-86a9-4af3-a2e6-55826c69b4e2&tab=librarydocuments)
* [Bee Agent Framework](https://github.com/i-am-bee/bee-ui)
* [watsonx.ai Flows Engine](https://www.ibm.com/products/watsonx-flows-engine)