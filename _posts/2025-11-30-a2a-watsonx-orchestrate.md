---
id: nh-151
title: 'Integrating Agents in watsonx Orchestrate via A2A'
date: 2025-11-30 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-151'
permalink: /article/a2a-watsonx-orchestrate/
custom_permalink:
    - article/a2a-watsonx-orchestrate/
image: /assets/img/2025/11/a2a-watsonx-orchestrate-00.png
---

*The Agent to Agent Protocol (A2A) is an open standard designed to enable communication and interoperability between multiple agentic systems. Watsonx Orchestrate is IBM's AI-powered platform used to automate business workflows and create intelligent agents. This post explains how external agents can be integrated in Orchestrate via A2A to build multi-agent systems.*

I've open sourced the code in the [ibm-watsonx-ai-langgraph-langchain-a2a](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a) repo.

This post is part of a mini-series:

* [Accessing watsonx.ai from LangGraph]({{ "/article/watsonx-ai-langgraph-langchain/" | relative_url }})
* [Building A2A Agents with LangGraph and watsonx.ai]({{ "/article/a2a-langgraph-watsonx-ai/" | relative_url }})
* Integrating Agents in watsonx Orchestrate via A2A (this post)

The following technologies are demonstrated:

* [Agent2Agent](https://a2a-protocol.org/)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [LangGraph](https://www.langchain.com/langgraph)
* [Granite](https://huggingface.co/ibm-granite)
* [IBM watsonx.ai](https://www.ibm.com/docs/en/watsonx/saas?topic=overview-watsonx)
* [IBM watsonx.ai in LangChain](https://docs.langchain.com/oss/python/integrations/chat/ibm_watsonx)

## Scenario

The sample agent is a currency agent with a tool to convert currencies. The agent invokes the tool if necessary. If more user input is required (for example the 'from' and 'to' currency definitions), it asks the user in multi-turn conversations. The agent gets the tool output to calculate the amounts and generates the answers.

The first example is a single-turn conversation:

* User: How much is 1 USD in EUR?
* Agent: Looking up the exchange rates ...
* Agent: Processing the exchange rates ...
* Agent: Based on the latest exchange rate, 1 USD is equivalent to 0.9 EUR.

![image](/assets/img/2025/11/a2a-watsonx-orchestrate-01.png)

The second example is a multi-turn conversation (see screenshot at the top of this post):

* User: How much is the exchange rate for 1 USD?
* Agent: I'm sorry, but to provide the exchange rate, I need to know which currency you'd like to convert 1 USD to. Could you please specify the target currency? For example, are you interested in USD to EUR, USD to GBP, or another currency?
* User: EUR
* Agent: Looking up the exchange rates ...
* Agent: Processing the exchange rates ...
* Agent: Based on the latest exchange rate data, 1 USD is equivalent to approximately 0.90 EUR.

## A2A Agents

Watsonx Orchestrate allows integrating different types of external agents, for example agents hosted on [watsonx.ai]({{ "/article/watsonx-ai-agents-in-watsonx-orchestrate/" | relative_url }}). Recently Orchestrate added the capability to integrate [A2A agents](https://developer.watson-orchestrate.ibm.com/agents/connect_agent#agent-to-agent-a2a-protocol). 

Here is the definition of the external A2A agent - see [orchestrate_agent.yaml](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/orchestrate/orchestrate_agent.yaml):

```yaml
spec_version: v1
kind: external
name: currency_agent
title: Currency Agent
nickname: currency_agent
provider: external_chat/A2A/0.3.0
description: |
  CurrencyAgent - a specialized assistant for currency convesions.
tags:
  - currency
api_url: "http://host.docker.internal:10000"
auth_scheme: BEARER_TOKEN  # one of BEARER_TOKEN | API_KEY | NONE 
auth_config:
  token: "123"             # this is token for both BEARER_TOKEN and API_KEY 
chat_params:               # chat_parms are parameters sent to an agent on each request
  sendHistory: false       # indicates whether conversation history should be sent to the external A2A agent
  stream: true             # should the external agent be invoked using SSE streaming or as a rest call
  pushNotifications: false # set to true if the external agent can send push notifications to provide updates on async tasks
config:                    # config represents the internal configuration of this agent used by wxo
  hidden: false            # Hide this collaborator agent from the ui
```

## Setup

The following section describes how to set up the complete example.

Prerequisites:

* [Python](https://www.python.org/downloads/) 3.13 or higher
* [uv](https://docs.astral.sh/uv/#installation)
* [IBM watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/registration/stepone?context=wx&preselect_region=true)

Create an environment file with your watsonx.ai credentials:

```bash
git clone https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a
cd ibm-watsonx-ai-langgraph-langchain-a2a
cp .env.example .env
```

Define [WATSONX_API_KEY](https://cloud.ibm.com/docs/account?topic=account-userapikey&interface=ui) and WATSONX_PROJECT_ID in .env.

First terminal:

```bash
uv run app
```

Second terminal:

```bash
python tests/watsonx_client.py
python tests/a2a_client.py
```

Import in Orchestrate:

```bash
cd to-folder-with-orchestrate-env-file
orchestrate server start --env-file=./.env -l
#orchestrate chat start

orchestrate agents import -f path-to-this-repo/orchestrate/orchestrate_agent.yaml
#orchestrate agents remove -n currency_agent -k external
```

Create an agent 'Finance Agent' with a profile 'You are a finance agent with access to a currency conversion tool' and add the imported external agent to it.

## Next Step

To find out more, check out the following resources:

* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Agent2Agent](https://a2a-protocol.org/)
* [Granite](https://huggingface.co/ibm-granite)
* [LangGraph](https://www.langchain.com/langgraph)