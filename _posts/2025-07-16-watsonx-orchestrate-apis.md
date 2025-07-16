---
id: nh-135
title: 'Running Agents in watsonx Orchestrate via APIs'
date: 2025-07-16 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-135'
permalink: /article/watsonx-orchestrate-apis/
custom_permalink:
    - article/watsonx-orchestrate-apis/
image: /assets/img/2025/07/watsonx-orchestrate-apis.png
---

*Watsonx Orchestrate is IBM's platform to run agentic systems. Developers can run Orchestrate locally via containers. This post describes how to run agents and models via APIs.*

Watsonx Orchestrate provides [APIs](https://developer.watson-orchestrate.ibm.com/apis/) which require bearer tokens. If you run the Agent Developer Kit and the Orchestrate Developer Edition locally, you can get the token from a configuration file.

```bash
cat ~/.cache/orchestrate/credentials.yaml
auth:
  local:
    wxo_mcsp_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz.....
```

There are multiple APIs to run agents and models:

* /chat/completions
* /chat/completions with streaming
* /orchestrate/runs
* /orchestrate/runs/stream
* /completions
* /completions/chat

The /chat/completions endpoint is very similar to the OpenAI [/chat/completions](https://platform.openai.com/docs/api-reference/chat) endpoint. This allows integrations of Orchestrate agents in other systems, IDEs, etc.

The /orchestrate/runs endpoints contain more functionality and data, for example messages can contain outputs from tools. There are also parameters to define detailled model settings, for example to set greedy and temperature to 0.

Below are example invocations and responses for the different endpoints.

## /chat/completions

Chat with Agents without Streaming: [/chat/completions](https://developer.watson-orchestrate.ibm.com/apis/orchestrate-agent/chat-with-agents)

```bash
curl --request POST \
  --url http://localhost:4321/api/v1/orchestrate/845c51d3-3d16-4fdf-b00a-ade8c3dd8f6f/chat/completions \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA' \
  --header 'Content-Type: application/json' \
  --data '{
  "stream": false,
  "messages": [
    {
      "role": "user",
      "content": "Hi"
    }
  ]
}'

{
  "id": "42a375eb-eec8-435f-847c-8576ee07ffa9",
  "object": "chat.completion",
  "created": 1752578550,
  "model": "watsonx/meta-llama/llama-3-2-90b-vision-instruct",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I am Watsonx Orchestrate, an AI assistant, created by IBM. How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "thread_id": "c61c0bf7-da32-4222-b9ce-308ed08a70af"
}
```

## /chat/completions with stream

Chat with Agents with Streaming: [/chat/completions](https://developer.watson-orchestrate.ibm.com/apis/orchestrate-agent/chat-with-agents)

The following command is a simple example. Check out the documentation for more options.

```bash
curl --request POST \
  --url http://localhost:4321/api/v1/orchestrate/6a3f4980-73f2-4e7f-b920-2b4189ba2919/chat/completions \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA' \
  --header 'Content-Type: application/json' \
  --data '{
  "stream": true,
  "messages": [
    {
      "role": "user",
      "content": "Hi"
    }
  ]
}'

data: {
    "id": "1752578970445-0",
    "object": "thread.message.delta",
    "thread_id": "226c9477-4be0-4f71-b849-bb624f0c1414",
    "model": "watsonx/meta-llama/llama-3-2-90b-vision-instruct",
    "created": 1752578970,
    "choices": [
        {
            "delta": {
                "role": "assistant",
                "content": "Hello"
            }
        }
    ]
}
...
data: {
    "id": "1752578971251-0",
    "object": "thread.message.delta",
    "thread_id": "226c9477-4be0-4f71-b849-bb624f0c1414",
    "model": "watsonx/meta-llama/llama-3-2-90b-vision-instruct",
    "created": 1752578971,
    "choices": [
        {
            "delta": {
                "role": "assistant",
                "content": "?"
            }
        }
    ]
}
```


## /orchestrate/runs

Chat With Orchestrate Agent without Streaming: [/orchestrate/runs](https://developer.watson-orchestrate.ibm.com/apis/orchestrate-agent/chat-with-orchestrate-assistant)

```bash
curl --request POST \
  --url http://localhost:4321/api/v1/orchestrate/runs \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA' \
  --header 'Content-Type: application/json' \
  --data '{
  "message": {
    "role": "user",
    "content": "Hi"
  },
  "agent_id": "6a3f4980-73f2-4e7f-b920-2b4189ba2919"
}'

{
    "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
    "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
    "task_id": "c9aa1e28-0f61-487e-b92e-bf18eb5f4a64",
    "message_id": "c7a6b2bd-d91b-4286-bcbd-4ef754765118"
}
```

Non-streaming requests return immediately with ids that can be used to pull for updates.

```bash
curl --request GET \
  --url http://localhost:4321/api/v1/orchestrate/runs/c5af3b86-16c6-4ef7-984a-ca9622a6da82 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA'

{
    "id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
    "tenant_id": "4a33ea33-b28c-4304-a71e-7abd8939f50b",
    "assistant_id": null,
    "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
    "status": "completed",
    "started_at": "2025-07-15T13:09:08.278876Z",
    "completed_at": "2025-07-15T13:09:11.335076Z",
    "failed_at": null,
    "cancelled_at": null,
    "llm_params": null,
    "usage": null,
    "last_error": null,
    "result": {
        "data": {
            "message": {
                "id": "a8a3b6d5-275e-48c2-bd74-2854f29146c6",
                "role": "assistant",
                "content": [
                    {
                        "id": "1",
                        "text": "Hello! I am watsonx Orchestrate, an AI assistant, created by IBM. How can I help you today?",
                        "response_type": "text"
                    }
                ],
                "context": null,
                "mentions": null,
                "assistant": {
                    "is_default": true
                },
                "tenant_id": "4a33ea33-b28c-4304-a71e-7abd8939f50b",
                "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
                "created_by": "f242eadf-0dc9-4eae-b2d7-65b09b4b4b16",
                "created_on": "2025-07-15T13:09:11.307370Z",
                "updated_at": "2025-07-15T13:09:11.307370Z",
                "document_ids": null,
                "step_history": [],
                "message_state": null,
                "parent_message_id": "c7a6b2bd-d91b-4286-bcbd-4ef754765118",
                "created_by_username": "wxo.archer@ibm.com",
                "additional_properties": {
                    "display_properties": {
                        "is_async": false,
                        "skip_render": false
                    }
                }
            },
            "message_id": "a8a3b6d5-275e-48c2-bd74-2854f29146c6",
            "target_run_id": null,
            "correlation_id": null,
            "flowinstance_id": null
        },
        "type": "message_created"
    },
    "guardrails": null,
    "agent_id": null,
    "additional_parameters": null
}
```

## /orchestrate/runs/stream

Chat With Orchestrate Agent with Streaming: [/orchestrate/runs/stream](https://developer.watson-orchestrate.ibm.com/apis/orchestrate-agent/chat-with-orchestrate-assistant-as-stream)

```bash
curl --request POST \
  --url http://localhost:4321/api/v1/orchestrate/runs/stream \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA' \
  --header 'Content-Type: application/json' \
  --data '{
  "message": {
    "role": "user",
    "content": "Hi"
  },
  "agent_id": "6a3f4980-73f2-4e7f-b920-2b4189ba2919"
}'

[
    {
        "id": "1752584948287-0",
        "event": "run.started",
        "data": {
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f"
        }
    },
    {
        "id": "1752584948294-0",
        "event": "message.started",
        "data": {
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82"
        }
    },
    {
        "id": "1752584950473-0",
        "event": "message.delta",
        "data": {
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
            "delta": {
                "role": "assistant",
                "content": [
                    {
                        "id": "1",
                        "response_type": "text",
                        "text": "Hello"
                    }
                ]
            }
        }
    },
...
    {
        "id": "1752584951233-0",
        "event": "message.delta",
        "data": {
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
            "delta": {
                "role": "assistant",
                "content": [
                    {
                        "id": "1",
                        "response_type": "text",
                        "text": "?"
                    }
                ]
            }
        }
    },
    {
        "id": "1752584951329-0",
        "event": "message.created",
        "data": {
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
            "message_id": "a8a3b6d5-275e-48c2-bd74-2854f29146c6",
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
            "message": {
                "id": "a8a3b6d5-275e-48c2-bd74-2854f29146c6",
                "tenant_id": "4a33ea33-b28c-4304-a71e-7abd8939f50b",
                "created_by": "f242eadf-0dc9-4eae-b2d7-65b09b4b4b16",
                "created_by_username": "wxo.archer@ibm.com",
                "created_on": "2025-07-15T13:09:11.307370Z",
                "updated_at": "2025-07-15T13:09:11.307370Z",
                "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f",
                "assistant": {
                    "is_default": true
                },
                "parent_message_id": "c7a6b2bd-d91b-4286-bcbd-4ef754765118",
                "role": "assistant",
                "content": [
                    {
                        "response_type": "text",
                        "id": "1",
                        "text": "Hello! I am watsonx Orchestrate, an AI assistant, created by IBM. How can I help you today?"
                    }
                ],
                "mentions": null,
                "document_ids": null,
                "additional_properties": {
                    "display_properties": {
                        "skip_render": false,
                        "is_async": false
                    }
                },
                "context": null,
                "step_history": [],
                "message_state": null
            }
        }
    },
    {
        "id": "1752584951342-0",
        "event": "run.completed",
        "data": {
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f"
        }
    },
    {
        "id": "1752584951357-0",
        "event": "done",
        "data": {
            "run_id": "c5af3b86-16c6-4ef7-984a-ca9622a6da82",
            "thread_id": "2bd3d825-17e5-43d1-8740-72b4cd41f34f"
        }
    }
]
```

In case you're wondering 'http://localhost:4321/api/v1/orchestrate/runs?stream=true' is identical to 'http://localhost:4321/api/v1/orchestrate/runs/stream'.

## /completions

Additionally, there are endpoints to run models without agents. 

Create Completion: [/completions](https://developer.watson-orchestrate.ibm.com/apis/completions/create-completion)

```bash
curl --request POST \
  --url http://localhost:4321/api/v1/completions \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "mistralai/mistral-large",
  "prompt": "Hi"
}'
```

## /completions/chat

Create Chat Completion: [/completions/chat](https://developer.watson-orchestrate.ibm.com/apis/completions/create-completion)

```bash
curl --request POST \
  --url http://localhost:4321/api/v1/completions/chat \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYiLCJ1c2VybmFtZSI6Ind4by5hcmNoZXJAaWJtLmNvbSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJ0ZW5hbnRfaWQiOiI0YTMzZWEzMy1iMjhjLTQzMDQtYTcxZS03YWJkODkzOWY1MGIiLCJ3b1RlbmFudElkIjoiNGEzM2VhMzMtYjI4Yy00MzA0LWE3MWUtN2FiZDg5MzlmNTBiIiwid29Vc2VySWQiOiJmMjQyZWFkZi0wZGM5LTRlYWUtYjJkNy02NWIwOWI0YjRiMTYifQ.3n6n-qmi39AIdJG_yGTG8dyuwepNTVrQyPuQz88mfyA' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "watsonx/meta-llama/llama-3-3-70b-instruct",
  "messages": [
    {
      "role": "user",
      "content": "Hi"
    }
  ],
  "stream": false
}'
```

## Next Steps

There is also an endpoint [assistants/your-assistant_id/runs](https://developer.watson-orchestrate.ibm.com/apis/assistants-runs/run-assistant) to run assistants directly.

To find out more, check out the following resources:

* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Developer watsonx Orchestrate APIs](https://developer.watson-orchestrate.ibm.com/apis/)