---
id: nh-113
title: 'watsonx Orchestrate Agent Routing to Agents'
date: 2025-03-04 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-113'
permalink: /article/watsonx-orchestrate-agent-agents/
custom_permalink:
    - article/watsonx-orchestrate-agent-agents/
image: /assets/img/2025/03/orchestrate-agent-agents-01.png
---

*Recently watsonx Orchestrate has added support for agentic capabilities. Orchestration agents can route to assistants, skills and agents. This post focusses on the routing to agents and their tools.*

With watsonx Orchestrate you can easily create personalized generative AI-powered assistants and agents to automate and accelerate your work, see the documentation [What's new in IBM watsonx Orchestrate: AI agent available on IBM Cloud](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=releases-whats-new-in-watsonx-orchestrate-january-2025#ai-agent-available-on-span-translatenoibm-cloudspan).

This post is part of a mini-series about agents in Orchestrate:

1. [watsonx Orchestrate Agent Routing to Assistants]({{ "/article/watsonx-orchestrate-agent-assistants/" | relative_url }}) 
2. [watsonx Orchestrate Agent Routing to Skills]({{ "/article/watsonx-orchestrate-agent-skills/" | relative_url }})
3. [watsonx Orchestrate Agent Routing to Agents]({{ "/article/watsonx-orchestrate-agent-agents/" | relative_url }}) (this post)

## Example

The example code below is from the [External Agent Example](https://github.com/watson-developer-cloud/watsonx-orchestrate-developer-toolkit/tree/main/external_agent/examples/langgraph_python). The example demonstrates how to deploy an external agent as a serverless application in IBM Cloud. The application leverages FastAPI and LangGraph to create a chat completion service that integrates with IBM watsonx and OpenAI models. It also includes AI tools for web and news searches using DuckDuckGo.

![image](/assets/img/2025/03/orchestrate-agent-agents-02.png)

## Endpoint

Let's look at the code. The main part is the implementation of the ['chat/completions'](https://github.com/watson-developer-cloud/watsonx-orchestrate-developer-toolkit/blob/main/external_agent/examples/langgraph_python/app.py) endpoint which is identical to '/v1/chat/completions' from OpenAI.

The same mechanism works for other agent frameworks as long as they implement the same endpoint and schema.

```python
from fastapi import FastAPI, Header, Depends
from fastapi.responses import JSONResponse, StreamingResponse
from models import ChatCompletionRequest, ChatCompletionResponse, Choice, MessageResponse, DEFAULT_MODEL
from security import get_current_user
from tools import web_search_duckduckgo, news_search_duckduckgo
...
@app.post("/chat/completions")
async def chat_completions(
    request: ChatCompletionRequest,
    ...,
    current_user: Dict[str, Any] = Depends(get_current_user),
):
    ....
    model = DEFAULT_MODEL
    if request.model:
        model = request.model
    selected_tools = [web_search_duckduckgo, news_search_duckduckgo]
    if request.stream:
        ...
    else:
        last_message, all_messages = get_llm_sync(request.messages, model, thread_id, selected_tools)
        response = ChatCompletionResponse(...
        )
        return JSONResponse(content=response.dict())
```

The ['get_llm_sync'](https://github.com/watson-developer-cloud/watsonx-orchestrate-developer-toolkit/blob/main/external_agent/examples/langgraph_python/llm_utils.py) function invokes watsonx.ai synchronously.

```python
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage, SystemMessage, BaseMessage, ToolCall
from langgraph.prebuilt import create_react_agent
from ibm_watsonx_ai import APIClient, Credentials
from langchain_ibm import ChatWatsonx
...
def get_llm_sync(messages: List[Message], model: str, thread_id: str, tools):
    model_instance = None
    if 'gpt' in model:
        ...
    else:
        client_model_instance = None
        if WATSONX_SPACE_ID:
           client_model_instance = APIClient(credentials=Credentials(url=WATSONX_URL, token=get_access_token(WATSONX_API_KEY)),
                       space_id=WATSONX_SPACE_ID)
        elif WATSONX_PROJECT_ID:
            client_model_instance = APIClient(credentials=Credentials(url=WATSONX_URL, token=get_access_token(WATSONX_API_KEY)),
                       project_id=WATSONX_PROJECT_ID)
        model_instance = ChatWatsonx(model_id=model, watsonx_client=client_model_instance)
    inputs = convert_messages_to_langgraph_format(messages)
    validate_chat_history(inputs["messages"])
    if tools:
       graph = create_react_agent(model_instance, tools=tools)
       response = graph.invoke(inputs)
    ...
    return results, messages
```

## Code Engine

The endpoint needs to be deployed so that Orchestrate can access it. In this example the REST endpoint is deployed to Code Engine.

![image](/assets/img/2025/03/orchestrate-agent-agents-03.png)

![image](/assets/img/2025/03/orchestrate-agent-agents-04.png)

## Agent Lab

With watsonx.ai Agent Lab agentic applications can easily be created, extended by pro-code developers and deployed on IBM Cloud. Read my previous posts for details:

* [Generating Agentic Applications with watsonx.ai Agent Lab]({{ "/article/watsonx-ai-agent-lab-service/" | relative_url }})
* [Getting started with watsonx.ai Agent Lab]({{ "/article/watsonx-ai-agent-lab/" | relative_url }})
* [Deploying Agentic Applications on watsonx.ai]({{ "/article/watsonx-ai-service/" | relative_url }})
* [Structured Output of Large Language Models]({{ "/article/llm-structured-output/" | relative_url }})

Currently Orchestrate requires the endpoint 'chat/completions' which the AI Services generated by Agent Lab don't provide. To integrate agents generated from Agent Lab in Orchestrate there are currently two options:

1. Use a Code Engine proxy, see [example](https://github.com/watson-developer-cloud/watsonx-orchestrate-developer-toolkit/tree/main/external_agent/examples/agent_builder)
2. Define an OpenAPI definition for the deployment from Agent Lab and follow the instructions as outlined in my post [watsonx Orchestrate Agent Routing to Skills]({{ "/article/watsonx-orchestrate-agent-skills/" | relative_url }}), see [example](https://github.com/dajuanzi/assistant-toolkit/tree/watsonx-ai-integrations-ai-service/integrations/extensions/starter-kits/language-model-watsonx/advanced#deployed-ai-service).

## Next Steps

Check out [watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate), the AI for business productivity, to learn more.