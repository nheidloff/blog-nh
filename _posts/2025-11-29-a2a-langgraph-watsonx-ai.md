---
id: nh-150
title: 'Building A2A Agents with LangGraph and watsonx.ai'
date: 2025-11-29 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-150'
permalink: /article/a2a-langgraph-watsonx-ai/
custom_permalink:
    - article/a2a-langgraph-watsonx-ai/
image: /assets/img/2025/11/a2a-langgraph-watsonx-ai-00.png
---

*The Agent2Agent (A2A) protocol is an open standard designed to enable seamless communication and collaboration between AI agents. This post explains how LangGraph agents can be extended to provide A2A interfaces so that they can be integrated in multi-agent systems.*

Several protocols are emerging that define how agents can interact in multi-agent systems. The Model Context Protocol (MCP) has a big community and a lot of momentum. When it was originally released a year ago, it focused on tool invocations in agents for development environments and chat experiences. Over the last months more functionalities have been included to also support tools which can be more than synchronous REST APIs. Streaming, asynchronous invocations, security, memory, etc. have been and are being added to the specification.

I've open sourced the code of this post in the [ibm-watsonx-ai-langgraph-langchain-a2a](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a) repo.

This post is part of a mini-series:

* [Accessing watsonx.ai from LangGraph]({{ "/article/watsonx-ai-langgraph-langchain/" | relative_url }})
* Building A2A Agents with LangGraph and watsonx.ai (this post)
* [Integrating Agents in watsonx Orchestrate via A2A]({{ "/article/a2a-watsonx-orchestrate/" | relative_url }})

The following technologies are demonstrated:

* [Agent2Agent](https://a2a-protocol.org/)
* [LangGraph](https://www.langchain.com/langgraph)
* [Granite](https://huggingface.co/ibm-granite)
* [IBM watsonx.ai](https://www.ibm.com/docs/en/watsonx/saas?topic=overview-watsonx)
* [IBM watsonx.ai in LangChain](https://docs.langchain.com/oss/python/integrations/chat/ibm_watsonx)

## A2A Python SDK

The example uses the [A2A Python SDK](https://github.com/a2aproject/a2a-python). The file [main.py](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/app/__main__.py) defines the meta data of the agent as it's listed in the agent card.

```python
from a2a.server.apps import A2AStarletteApplication
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import BasePushNotificationSender
from a2a.types import (AgentCapabilities, AgentCard, AgentSkill)
from app.langgraph_agent import CurrencyAgent
from app.a2a_agent_executor import CurrencyAgentExecutor

@click.command()
@click.option('--host', 'host', default='localhost')
@click.option('--port', 'port', default=10000)
def main(host, port):
    try:
        capabilities = AgentCapabilities(streaming=True, push_notifications=True)
        skill = AgentSkill(
            id='convert_currency',
            name='Currency Exchange Rates Tool',
            description='Helps with exchange values between various currencies',
            examples=['How much is 1 USD in EUR?',
                'How much is the exchange rate for 1 USD?',],
        )
        agent_card = AgentCard(
            name='Currency Agent',
            description='Helps with exchange rates for currencies',
            url=f'http://{host}:{port}/',
            version='1.0.0',
            default_input_modes=CurrencyAgent.SUPPORTED_CONTENT_TYPES,
            default_output_modes=CurrencyAgent.SUPPORTED_CONTENT_TYPES,
            capabilities=capabilities,
            skills=[skill],
        )

        httpx_client = httpx.AsyncClient()
        push_config_store = InMemoryPushNotificationConfigStore()
        push_sender = BasePushNotificationSender(httpx_client=httpx_client,
                        config_store=push_config_store)
        request_handler = DefaultRequestHandler(
            agent_executor=CurrencyAgentExecutor(),
            task_store=InMemoryTaskStore(),
            push_config_store=push_config_store,
            push_sender= push_sender
        )
        server = A2AStarletteApplication(
            agent_card=agent_card, http_handler=request_handler
        )
        uvicorn.run(server.build(), host=host, port=port)
```

Here is the agent card of the sample currency agent:

```bash
Successfully fetched agent card data from http://localhost:10000/.well-known/agent-card.json: 
{
    'capabilities': {
        'pushNotifications': True, 
        'streaming': True
    }, 
    'defaultInputModes': ['text', 'text/plain'], 
    'defaultOutputModes': ['text', 'text/plain'], 
    'description': 'Helps with exchange rates for currencies', 
    'name': 'Currency Agent', 
    'preferredTransport': 'JSONRPC', 
    'protocolVersion': '0.3.0', 
    'skills': [{
        'description': 'Helps with exchange values between various currencies', 
        'examples': [
            'How much is 1 USD in EUR?', 
            'How much is the exchange rate for 1 USD?'
        ], 
        'id': 'convert_currency', 
        'name': 'Currency Exchange Rates Tool', 
        'url': 'http://localhost:10000/', 
        'version': '1.0.0'
    }
```

The A2A Python SDK comes with convenience functionality which makes wrapping up agents implemented in frameworks like LangGraph very easy - see [a2a_agent_executor.py](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/app/a2a_agent_executor.py). The class [CurrencyAgent](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/app/langgraph_agent.py#L28) is the LangGraph implementation of the sample agent.

```python
class CurrencyAgentExecutor(AgentExecutor):
    def __init__(self):
        self.agent = CurrencyAgent()

    async def execute(self, context: RequestContext, event_queue: EventQueue) -> None:
        query = context.get_user_input()
        task = context.current_task
        if not task:
            task = new_task(context.message)
            await event_queue.enqueue_event(task)
        updater = TaskUpdater(event_queue, task.id, task.context_id)
        
        try:
            async for item in self.agent.stream(query, task.context_id):
                is_task_complete = item['is_task_complete']
                require_user_input = item['require_user_input']
                if not is_task_complete and not require_user_input:
                    await updater.update_status(
                        TaskState.working,
                        new_agent_text_message(item['content'], task.context_id, task.id),
                    )
                elif require_user_input:
                    await updater.update_status(
                        TaskState.input_required,
                        new_agent_text_message(item['content'], task.context_id, task.id),
                        final=True,
                    )
                    break
                else:
                    await updater.add_artifact(
                        [Part(root=TextPart(text=item['content']))],
                        name='conversion_result',
                    )
                    await updater.complete()
                    break

        except Exception as e:
            ...
```

## Flows

A2A supports multiple potential flows. The example describes three flows in detail:

1. Synchronous single-turn conversation with question and answer
2. Single-turn conversation with streaming
3. Multi-turn conversation when more user input is required, for example the currency to convert to

The sample agent is a currency agent with a tool to convert currencies. The agent invokes the tool if necessary. If more user input is required (for example the 'from' and 'to' currency definitions), it asks the user in multi-turn conversations. The agent gets the tool output to calculate the amounts and generates the answers.

## Flow 1 -Synchronous

Example conversation:
* User: How much is 1 USD in EUR?
* Agent: Looking up the exchange rates ...
* Agent: Processing the exchange rates ...
* Agent: Based on the latest exchange rate, 1 USD is equivalent to 0.9 EUR.

[a2a_client.py](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/tests/a2a_client.py#L115) demonstrates this flow:

Request:

```bash
POST http://localhost:10000
Content-Type: application/json

{
    "id": "12113c25-b752-473f-977e-c9ad33cf4f56",
    "jsonrpc": "2.0",
    "method": "message/send",
    "params": {
        "message": {
            "kind": "message",
            "messageId": "120ec73f93024993becf954d03a672bc",
            "parts": [
                {
                    "kind": "text",
                    "text": "how much is 1 USD in EUR?"
                }
            ],
            "role": "user"
        }
    }
}
```

Response:

```json
{
  "id": "12113c25-b752-473f-977e-c9ad33cf4f56",
  "jsonrpc": "2.0",
  "result": {
    "artifacts": [
      {
        "artifactId": "a31f14d4-58dc-4e7a-8225-b75c028b95c3",
        "name": "conversion_result",
        "parts": [
          {
            "kind": "text",
            "text": " Based on the latest exchange rate, 1 USD is equivalent to 0.9 EUR."
          }
        ]
      }
    ],
    "contextId": "3219a27c-f1e6-4087-ad87-cf9b5985a9de",
    "history": [
      {
        "contextId": "3219a27c-f1e6-4087-ad87-cf9b5985a9de",
        "kind": "message",
        "messageId": "120ec73f93024993becf954d03a672bc",
        "parts": [
          {
            "kind": "text",
            "text": "how much is 1 USD in EUR?"
          }
        ],
        "role": "user",
        "taskId": "d94c8e9e-f2b0-4512-90e7-a7714be3e624"
      },
      {
        "contextId": "3219a27c-f1e6-4087-ad87-cf9b5985a9de",
        "kind": "message",
        "messageId": "3363734c-217f-48e9-9154-c63679707be4",
        "parts": [
          {
            "kind": "text",
            "text": "Looking up the exchange rates..."
          }
        ],
        "role": "agent",
        "taskId": "d94c8e9e-f2b0-4512-90e7-a7714be3e624"
      },
      {
        "contextId": "3219a27c-f1e6-4087-ad87-cf9b5985a9de",
        "kind": "message",
        "messageId": "41ace0d5-ffe9-4710-82d3-f25cdd5f8b57",
        "parts": [
          {
            "kind": "text",
            "text": "Processing the exchange rates..."
          }
        ],
        "role": "agent",
        "taskId": "d94c8e9e-f2b0-4512-90e7-a7714be3e624"
      }
    ],
    "id": "d94c8e9e-f2b0-4512-90e7-a7714be3e624",
    "kind": "task",
    "status": {
      "state": "completed",
      "timestamp": "2025-11-24T08:50:59.270564+00:00"
    }
  }
}
```

## Flow 2 - Streaming

Example conversation:
* User: How much is 1 USD in EUR?
* Agent: Looking up the exchange rates ...
* Agent: Processing the exchange rates ...
* Agent: Based on the latest exchange rate, 1 USD is equivalent to 0.9 EUR.

[a2a_client.py](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/tests/a2a_client.py#L150) demonstrates this flow:

Request:

```bash
POST http://localhost:10000

{
    "id": "6d12d159-ec67-46e6-8d43-18480ce7f6ca",
    "jsonrpc": "2.0",
    "method": "message/stream",
    "params": {
        "message": {
            "kind": "message",
            "messageId": "2f9538ef0984471aa0d5179ce3c67a28",
            "parts": [
                {
                    "kind": "text",
                    "text": "how much is 1 USD in EUR?"
                }
            ],
            "role": "user"
        }
    }
}
```

Response:

```text
data: {"id":"6d12d159-ec67-46e6-8d43-18480ce7f6ca","jsonrpc":"2.0","result":{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","history":[{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","kind":"message","messageId":"2f9538ef0984471aa0d5179ce3c67a28","parts":[{"kind":"text","text":"how much is 1 USD in EUR?"}],"role":"user","taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"}],"id":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8","kind":"task","status":{"state":"submitted"}}}

data: {"id":"6d12d159-ec67-46e6-8d43-18480ce7f6ca","jsonrpc":"2.0","result":{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","final":false,"kind":"status-update","status":{"message":{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","kind":"message","messageId":"28684e1a-ede0-454e-8f97-37df8112eefa","parts":[{"kind":"text","text":"Looking up the exchange rates..."}],"role":"agent","taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"},"state":"working","timestamp":"2025-11-24T08:51:25.203342+00:00"},"taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"}}

data: {"id":"6d12d159-ec67-46e6-8d43-18480ce7f6ca","jsonrpc":"2.0","result":{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","final":false,"kind":"status-update","status":{"message":{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","kind":"message","messageId":"057a773f-af95-439f-806d-605d40e1a87e","parts":[{"kind":"text","text":"Processing the exchange rates.."}],"role":"agent","taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"},"state":"working","timestamp":"2025-11-24T08:51:25.206263+00:00"},"taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"}}

data: {"id":"6d12d159-ec67-46e6-8d43-18480ce7f6ca","jsonrpc":"2.0","result":{"artifact":{"artifactId":"67c07e6a-b026-4786-b5ba-10584c8c6d55","name":"conversion_result","parts":[{"kind":"text","text":" Based on the latest exchange rate, 1 USD is equivalent to 0.9 EUR."}]},"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","kind":"artifact-update","taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"}}

data: {"id":"6d12d159-ec67-46e6-8d43-18480ce7f6ca","jsonrpc":"2.0","result":{"contextId":"5ae9c7e9-6973-406f-806c-0fc6b4ea31e2","final":true,"kind":"status-update","status":{"state":"completed","timestamp":"2025-11-24T08:51:25.899051+00:00"},"taskId":"b812fa9c-ccf1-4abd-aaeb-06f75db7f8f8"}}
```

## Flow 3 - Multi-turn

Example conversation:
* User: How much is the exchange rate for 1 USD?
* Agent: I'm sorry, but to provide the exchange rate, I need to know which currency you'd like to convert 1 USD to. Could you please specify the target currency? For example, are you interested in USD to EUR, USD to GBP, or another currency?
* User: EUR
* Agent: Looking up the exchange rates ...
* Agent: Processing the exchange rates ...
* Agent: Based on the latest exchange rate data, 1 USD is equivalent to approximately 0.90 EUR.

[a2a_client.py](https://github.com/nheidloff/ibm-watsonx-ai-langgraph-langchain-a2a/blob/331079bd1fe6dd43b0190bfd42a8ee22389dfde7/tests/a2a_client.py#L165) demonstrates this flow:

Step 1 - Request:

```bash
POST http://localhost:10000
Content-Type: application/json

{
    "id": "27be771b-708f-43b8-8366-968966d07ec0",
    "jsonrpc": "2.0",
    "method": "message/send",
    "params": {
        "message": {
            "kind": "message",
            "messageId": "296eafc9233142bd98279e4055165f12",
            "parts": [
                {
                    "kind": "text",
                    "text": "How much is the exchange rate for 1 USD?"
                }
            ],
            "role": "user"
        }
    }
}
```

Step 2 - Response:

```json
{
  "id": "27be771b-708f-43b8-8366-968966d07ec0",
  "jsonrpc": "2.0",
  "result": {
    "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
    "history": [
      {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "296eafc9233142bd98279e4055165f12",
        "parts": [
          {
            "kind": "text",
            "text": "How much is the exchange rate for 1 USD?"
          }
        ],
        "role": "user",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      }
    ],
    "id": "ff19a722-c018-4653-be00-fda092f18f65",
    "kind": "task",
    "status": {
      "message": {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "a1d1722f-9648-4f6a-b5fc-26e587387c29",
        "parts": [
          {
            "kind": "text",
            "text": " I'm sorry, but to provide the exchange rate, I need to know which currency you'd like to convert 1 USD to. Could you please specify the target currency? For example, are you interested in USD to EUR, USD to GBP, or another currency?"
          }
        ],
        "role": "agent",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      },
      "state": "input-required",
      "timestamp": "2025-11-24T08:52:34.523003+00:00"
    }
  }
}
```

Step 3 - Request:

Note that 'contextId' and 'taskId' need to match the values returned in the previous step.

```bash
POST http://localhost:10000
Content-Type: application/json

{
    "id": "b88d818d-1192-42be-b4eb-3ee6b96a7e35",
    "jsonrpc": "2.0",
    "method": "message/send",
    "params": {
        "message": {
            "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
            "kind": "message",
            "messageId": "70371e1f231f4597b65ccdf534930ca9",
            "parts": [
                {
                    "kind": "text",
                    "text": "EUR"
                }
            ],
            "role": "user",
            "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
        }
    }
}
```

Step 4 - Response:

```json
{
  "id": "b88d818d-1192-42be-b4eb-3ee6b96a7e35",
  "jsonrpc": "2.0",
  "result": {
    "artifacts": [
      {
        "artifactId": "ab595c17-525c-4579-94d6-d96f91dfd177",
        "name": "conversion_result",
        "parts": [
          {
            "kind": "text",
            "text": " Based on the latest exchange rate data, 1 USD is equivalent to approximately 0.90 EUR."
          }
        ]
      }
    ],
    "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
    "history": [
      {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "296eafc9233142bd98279e4055165f12",
        "parts": [
          {
            "kind": "text",
            "text": "How much is the exchange rate for 1 USD?"
          }
        ],
        "role": "user",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      },
      {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "a1d1722f-9648-4f6a-b5fc-26e587387c29",
        "parts": [
          {
            "kind": "text",
            "text": " I'm sorry, but to provide the exchange rate, I need to know which currency you'd like to convert 1 USD to. Could you please specify the target currency? For example, are you interested in USD to EUR, USD to GBP, or another currency?"
          }
        ],
        "role": "agent",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      },
      {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "70371e1f231f4597b65ccdf534930ca9",
        "parts": [
          {
            "kind": "text",
            "text": "EUR"
          }
        ],
        "role": "user",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      },
      {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "1792e230-e6c9-46bf-8e2d-07b15b071eee",
        "parts": [
          {
            "kind": "text",
            "text": "Looking up the exchange rates..."
          }
        ],
        "role": "agent",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      },
      {
        "contextId": "694877cc-c7cc-4a20-af6c-f982636d29cc",
        "kind": "message",
        "messageId": "9463fd42-cdd6-45b7-b2d8-124a0f2efe6b",
        "parts": [
          {
            "kind": "text",
            "text": "Processing the exchange rates.."
          }
        ],
        "role": "agent",
        "taskId": "ff19a722-c018-4653-be00-fda092f18f65"
      }
    ],
    "id": "ff19a722-c018-4653-be00-fda092f18f65",
    "kind": "task",
    "status": {
      "state": "completed",
      "timestamp": "2025-11-24T08:53:36.638172+00:00"
    }
  }
}
```

## Next Step

To find out more, check out the following resources:

* [Agent2Agent](https://a2a-protocol.org/)
* [Granite](https://huggingface.co/ibm-granite)
* [LangGraph](https://www.langchain.com/langgraph)