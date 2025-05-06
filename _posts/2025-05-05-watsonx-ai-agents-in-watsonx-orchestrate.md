---
id: nh-124
title: 'Integrating watsonx.ai Agents in watsonx Orchestrate'
date: 2025-05-05 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-124'
permalink: /article/watsonx-ai-agents-in-watsonx-orchestrate/
custom_permalink:
    - article/watsonx-ai-agents-in-watsonx-orchestrate/
image: /assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-00.png
---

*In the latest version of watsonx Orchestrate IBM has added new functionality to build and run agentic applications. Orchestrator agents can leverage agents hosted on other platforms or on watsonx.ai.*

[IBM watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate) helps to build, deploy and manage powerful AI agents that automate workflows and processes with generative AI. Without the need to write code agents can be defined to orchestrate work via tools and other collaborator agents. These collaborator agents can be run on watsonx or hosted on other platforms.

## Terminology

There are different types of agents in Orchestrate.

**Agents**: Agents have a profile, have an underlaying LLM, can have tools, can have internal agents, and can have knowledge (RAG). In the easiest case agents can be defined without having to write code by re-using existing tools and agents from catalogs. Sophisticated agents can orchestrate work via tools and other agents. These native agents run on Orchestrate. 

**Collaborator Agents**: Agents can leverage other agents for certain tasks. In this case the agents which are invoked by other orchestrator agents are called collaborator agents which is a sub-type of 'Agents'. There can be multiple levels of hierachies.

**External Agents**: Collaborator agents can run natively on Orchestrate. Additionally agents hosted externally can be invoked. External agents can be implemented with various agentic frameworks and tools.
1. Agents with [IBM watsonx Agent Connect](https://connect.watson-orchestrate.ibm.com/acf/introduction) endpoints like '/v1/chat'
2. Agents with an watsonx.ai AI Service endpoint '/ml/v4/deployments/my-id/ai_service_stream'
3. watsonx Assistant agents

## Example

Let's look at an example agent. The goal is to build an agent which can answer IBM related questions:

1. What was the gross income of IBM in 1920?
2. What does the IBM employee Niklas Heidloff write about?

The example uses three agents:

1. Agent 1: Orchestrator - 'ibm_agent'
2. Agent 2: Collaborator - 'Profiles-IBM-Employees'
3. Agent 3: External watsonx.ai AI Service built via watsonx.ai Agent Lab - 'Niklas Agent'

## External watsonx.ai Agent

The simple agent 'Niklas Agent' has been defined with watsonx.ai Agent Lab. The agent has access to the internet search tool.

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-01.png)

The agent implementation can be stored as notebook so that developers can change and extend it. Alternatively, the agent can be deployed as AI Service.

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-02.png)

## RAG Agent

The new [watsonx Orchestrate Agent Development Kit](https://github.com/IBM/ibm-watsonx-orchestrate-adk)
comes with a [watsonx Orchestrate Developer Edition](https://developer.watson-orchestrate.ibm.com/getting_started/wxOde_setup) which I've used for the example scenario.

```bash
git clone https://github.com/IBM/ibm-watsonx-orchestrate-adk.git
cd /Users/niklasheidloff/Desktop/orchestrate-adk
# define config in .env
orchestrate server start --env-file=./.env -l
orchestrate env activate local
cd /Users/niklasheidloff/Desktop/orchestrate-adk/ibm-watsonx-orchestrate-adk/examples/agent_builder/ibm_knowledge
sh import_all.sh
orchestrate chat start
# In 'ibm_agent' under 'Manage Agents' enter 'what was the gross income of IBM in 1920?'
```

The imported example agent has access to two PDF files. One of them contains the answer to the question above which is not known to the underlaying Large Language Model. The PDFs have been uploaded to Milvus running locally. You can also use a remote Milvus and Elasticsearch instance as for other RAG scenarios.

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-05.png)

## Collaborator Agent

Next let's define the collaborator agent 'Profiles-IBM-Employees' which is just a normal native Orchestrate agent. This agent can return information about IBM employees, for the IBM employee Niklas Heidloff it uses the external agent as a tool.

Choose 'Create from Scratch', define the name 'Profiles-IBM-Employees' and description 'This agent returns information about IBM employees'.

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-03.png)

Import the AI service by providing the name, description, endpoint and API key.

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-04.png)

As result the collaborator agent 'Profiles-IBM-Employees' can now delegate to the external agent 'Niklas Agent' with the internet tool - see screenshot at the top of this post.

## Orchestrator Agent

While the example so far demonstrates already the ability mentioned in the title 'Integrating watsonx.ai Agents in watsonx Orchestrate', let's go one step further. In the imported orchestrator agent 'ibm_agent' we can now define the agent 'Profiles-IBM-Employees' as collaborator agent.

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-06.png)

For the sample question the flow is displayed:

1. Orchestrator agent invokes collaborator agent to find out information about employees rather than IBM history
2. Collaborator agent invokes external agent to find out specific information about Niklas Heidloff

![image](/assets/img/2025/05/watsonx-ai-agents-in-watsonx-orchestrate-07.png)

## Next Steps

To learn more, check out the [watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=agents-overview-agent-builder) documentation and the [watsonx Orchestrate Agent Development Kit](https://github.com/IBM/ibm-watsonx-orchestrate-adk) landing page.