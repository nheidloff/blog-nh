---
id: nh-127
title: 'Observability in watsonx Orchestrate via Langfuse'
date: 2025-05-09 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-127'
permalink: /article/orchestrate-langfuse/
custom_permalink:
    - article/orchestrate-langfuse/
image: /assets/img/2025/05/orchestrate-langfuse-00.png
---

*watsonx Orchestrate provides observability through a native integration with an open-source project known as Langfuse, an LLM engineering platform supporting traces and observations. This post shows how understand how a simple Orchestrate agent works.*

As example let's use the existing example [ibm_knowledge](https://github.com/IBM/ibm-watsonx-orchestrate-adk/tree/main/examples/agent_builder/ibm_knowledge) which comes with two PDF files that contain information to answer the question 'When was IBM founded?'.

## Trajectory

The user interface displays the trajectory on a high level. The agent 'ibm_agent' uses a knowledge base which is accessed like other tools.

![image](/assets/img/2025/05/orchestrate-langfuse-01.png)

## Step 1

To understand more details of the flow, Langfuse can be used. Under sessions and traces the user input is displayed.

![image](/assets/img/2025/05/orchestrate-langfuse-02.png)

## Step 2

Based on the user input the agent invokes the tool 'ibm_knowledge_base' which is provided by Orchestrate for your custom knowledge base.

![image](/assets/img/2025/05/orchestrate-langfuse-03.png)

## Step 3

In the next set of traces you can see that the tool performs different steps for RAG (Retrieval Augmented Generation).

1. Search the vector store for the 10 most relevant document chunks
2. Identify the most relevant document chunks required for the citiations section and to generate the answer
3. Generate the answer

![image](/assets/img/2025/05/orchestrate-langfuse-04.png)

![image](/assets/img/2025/05/orchestrate-langfuse-05.png)

## Step 4

In the last step the 'ibm_agent' creates the final message which is returned to the user.

![image](/assets/img/2025/05/orchestrate-langfuse-06.png)

## LangGraph

Under 'Observations' you can find more details:

* LangGraph is used by Orchestrate
* Prompt how to create thoughts and actions and how to invoke tools
* meta-llama/llama-3-2-90b-vision-instruct is utilized

![image](/assets/img/2025/05/orchestrate-langfuse-07.png)

## Setup

The setup of [Langfuse](https://langfuse.com/) in the [watsonx Orchestrate Developer Edition](https://developer.watson-orchestrate.ibm.com/environment/manage_local_environment) is easy.


```bash
git clone https://github.com/IBM/ibm-watsonx-orchestrate-adk.git
cd /Users/niklasheidloff/Desktop/orchestrate-adk
# configure .env
orchestrate server start --env-file=./.env -l
# output: You can access the observability platform Langfuse at http://localhost:3010, username: orchestrate@ibm.com, password: orchestrate
cd /Users/niklasheidloff/Desktop/orchestrate-adk/ibm-watsonx-orchestrate-adk/examples/agent_builder/ibm_knowledge
sh import_all.sh
orchestrate chat start
```

You can also use the hosted Langfuse instance - see [monitoring documentation](https://developer.watson-orchestrate.ibm.com/manage/observability).

## Next Steps

To learn more, check out the [watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=agents-overview-agent-builder) documentation and the [watsonx Orchestrate Agent Development Kit](https://github.com/IBM/ibm-watsonx-orchestrate-adk) landing page.