---
id: nh-096
title: 'Public Preview of watsonx.ai Flows Engine'
date: 2024-11-29 01:04:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-096'
permalink: /article/watsonx-ai-flows-engine/
custom_permalink:
    - article/watsonx-ai-flows-engine/
image: /assets/img/2024/11/flows-engine.png
---

*A public preview of watsonx.ai Flows Engine is now available. This post shows an example how to build a simple agent which accesses LLMs from watsonx.ai and pre-built tools.*

> Build performant generative AI applications with ease. With watsonx.ai flows engine, developers of all skill levels can create advanced generative AI applications for enterprise use. It simplifies the integration of Large Language Models (LLMs) with enterprise data, to help developers create generative AI flows with ease. With pre-built AI flows for tasks like Retrieval Augmented Generation (RAG) and Summarization, developers can quickly deploy AI-driven applications and seamlessly integrate them into their existing projects and architectures.

## Sample Scenario

The following sample is available on GitHub [Using watsonx.ai Flows Engine with watsonx.ai](https://github.com/IBM/wxflows/tree/main/examples/tool-calling/watsonx). I've only changed it slightly to better understand the flow.

An agent can leverage pre-built tools. Users can ask questions like 'search for information about a specific book' via a 'google_books' tool. Mistral Large 2 is invoked to determine whether tools need to be invoked and to generate answers.

You can run this sample yourself easily via a shared environment.

## JavaScript

The application code is written in JavaScript. The configuration of watsonx.ai and watsonx.ai Flows Engine is done in an external file.

There are three steps:
1. First invocation of LLM to determine whether tools need to be triggered
2. Invocation of tool
3. Second invocation of LLM to generate the answer

```javascript
import { WatsonXAI } from "@ibm-cloud/watsonx-ai";
import wxflows from "@wxflows/sdk/watsonx";
import "dotenv/config";
(async () => {
  process.env.IBM_CREDENTIALS_FILE = "./.env";

  const client = WatsonXAI.newInstance({
    version: "2024-05-31",
    serviceUrl: process.env.WATSONX_AI_ENDPOINT,
  });
  const params = {
    modelId: "mistralai/mistral-large",
    projectId: process.env.WATSONX_AI_PROJECT_ID,
    maxTokens: 100,
  };
  
  const toolClient = new wxflows({
    endpoint: process.env.WXFLOWS_ENDPOINT,
    apikey: process.env.WXFLOWS_APIKEY,
  });
  const tools = await toolClient.tools;
  console.log(tools)

  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Search information about the book escape from james patterson",
        },
      ],
    },
  ];
  const chatCompletion = await client.textChat({
    messages,
    tools,
    ...params,
  });
  const toolMessages = await toolClient.executeTools(chatCompletion);
  const newMessages = [...messages, ...toolMessages];
  const chatCompleted = await client.textChat({
    messages: newMessages,
    tools,
    ...params,
  });
  const allMessages = [...newMessages, chatCompleted];
  console.log(JSON.stringify(allMessages));
})();
```

## Tools

The tools are not defined in the code above. Instead they are defined in a [wxflows.toml](https://github.com/IBM/wxflows/blob/main/examples/tool-calling/watsonx/wxflows.toml) file.

A tool is basically an endpoint to a GraphQL database with multiple ways to invoke queries. Custom tools can be built via a CLI which helps importing data from various sources. Read the documentation [Building AI Agents with watsonx.ai Flows Engines](https://wxflows.ibm.stepzen.com/docs/getting-started/agents) for details.

## Output

The following JSON snippet shows the output of the different stages.

```json
[
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "Search information about the book escape from james patterson"
            }
        ]
    },
    {
        "role": "assistant",
        "tool_calls": [
            {
                "id": "D8fAjbaaO",
                "type": "function",
                "function": {
                    "name": "google_books",
                    "arguments": "{\"query\": \"query { search(q: \\\"intitle:escape+inauthor:patterson\\\") { title, authors, publisher, description } }\"}"
                }
            }
        ],
        "content": ""
    },
    {
        "role": "tool",
        "tool_call_id": "D8fAjbaaO",
        "content": ""
    },
    {
        "status": 200,
        "statusText": "OK",
        "headers": {
        },
        "result": {
            "id": "chat-8aeb1e2fe18b4dcf86c0f320e5b67870",
            "model_id": "mistralai/mistral-large",
            "model": "mistralai/mistral-large",
            "choices": [
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": " Here is the information about the book \"Escape\" from James Patterson:\n\n**Title:** Escape\n\n**Authors:** James Patterson, David Ellis\n\n**Publisher:** Little, Brown and Company\n\n**Description:**\n\nA small southern town is about to go through the biggest crisis in its history.\n\nBilly Harney’s reputation as a tough-as-nails detective precedes him. So does the fact that"
                    },
                    "finish_reason": "length"
                }
            ],
            "created": 1732878826,
            "model_version": "2.0.0",
            "created_at": "2024-11-29T11:13:49.114Z",
            "usage": {
                "completion_tokens": 100,
                "prompt_tokens": 648,
                "total_tokens": 748
            },
            "system": {
                "warnings": [
                ]
            }
        }
    }
]
```

## Next Steps

Check out the following resources to learn details.

* [watsonx.ai Flows Engine](https://www.ibm.com/products/watsonx-flows-engine)
* [watsonx.ai Flows Engine Portal](https://wxflows.ibm.stepzen.com/)
* Video: [Track Spotlight for AI Software](https://www.ibm.com/community/ibm-techxchange-conference/)
* Slides: [Track Spotlight for AI Software](https://community.ibm.com/community/user/viewdocument/3658-ai-spotlight?CommunityKey=8c64553a-86a9-4af3-a2e6-55826c69b4e2&tab=librarydocuments)
* [AI Agent SWE-1.0](https://research.ibm.com/blog/ibm-swe-agents)
* [IBM Granite 3.0](https://www.ibm.com/new/ibm-granite-3-0-open-state-of-the-art-enterprise-models)