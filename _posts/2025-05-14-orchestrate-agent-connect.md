---
id: nh-128
title: 'Connecting AI Agents to IBM watsonx Orchestrate'
date: 2025-05-16 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-128'
permalink: /article/orchestrate-agent-connect/
custom_permalink:
    - article/orchestrate-agent-connect/
image: /assets/img/2025/05/orchestrate-agent-connect-00.png
---

*IBM watsonx Agent Connect is a new technology to connect AI agents from any framework to IBM watsonx Orchestrate. This post explains how to build external agents and how to access them from watsonx Orchestrate.*

Description of [Agent Connect](https://connect.watson-orchestrate.ibm.com/introduction):

> The IBM Agent Connect Framework is a foundational integration architecture designed to enable seamless connectivity between external agents and watsonx Orchestrate. Complementing this, IBM Agent Connect is a partner program that offers independent software vendors (ISVs) the opportunity to collaborate with IBM.

To allow multi-agent collaboration, agents communicate using a standardized chat completions API, which follows familiar patterns from OpenAI and other LLM providers. Agents can share tool calling details with other agents using Agent Connect events. Agents can stream their [intermediate thinking steps](https://connect.watson-orchestrate.ibm.com/acf/advanced-topics/streaming-intermediate-steps) and tool calls, providing visibility into their reasoning process and enabling more effective [collaboration](https://connect.watson-orchestrate.ibm.com/tool-calling/implementation).  

> Within the Agent Connect framework, both tool calls and tool call responses can be shared among agents. This form of observability allows one agent to leverage the work performed by another agent. For instance, a CRM agent might retrieve account information and store details in a tool call response. Subsequently, an Email agent can utilize this information to find critical details, such as an email address for an account. By sharing tool calls and tool call responses, agents can collaborate on sub-tasks while sharing contextual information essential to the overall success of the main task.

## Example

As example a 'Weather and Travel' agent invokes two external agents: 1. weather and 2. travel. The external agents are hosted on IBM Code Engine and implement the Agent Connect '/v1/chat' endpoint. 

Example conversations:

* User: How is the weather in Berlin?
* Agent: 22 degrees
* User: What can I do in Berlin?
* Agent: Check out Brandenburger Tor

![image](/assets/img/2025/05/orchestrate-agent-connect-01.png)

In Langfuse you can see the internal flow of steps.

![image](/assets/img/2025/05/orchestrate-agent-connect-05.png)

How to read the traces:

* The first agent is the Orchestrate 'main'/'orchestrator' agent
* The tool is the collaborator agent in Orchestrate
* The second agent is the external weather agent

![image](/assets/img/2025/05/orchestrate-agent-connect-06.png)

## Intermediate Steps

The [OpenAI API](https://platform.openai.com/docs/api-reference/chat) 'v1/chat/completions' API is currently the de-facto standard for LLM invocations and it is being evolved with [agentic](https://platform.openai.com/docs/guides/responses-vs-chat-completions) capabilities.

In addition to the final answers from agents, Agent Connect also defines how to return intermediate steps to share tool call responses. External agents get this context passed into the 'v1/chat' endpoint.

The weather agent returns the following events:

```text
event: thread.run.step.delta
data: {"id":"step-zmwubkwtgjt","object":"thread.run.step.delta","thread_id":"default","model":"agent-model","created":1747297317,"choices":[{"delta":{"role":"assistant",
"step_details":{"type":"thinking",
"content":"Analyzing the request and determining if tools are needed..."}}}]}

event: thread.run.step.delta
data: {"id":"step-nt8u1ryqdi","object":"thread.run.step.delta","thread_id":"default","model":"agent-model","created":1747297317,"choices":[{"delta":{"role":"assistant",
"step_details":{"type":"tool_calls","tool_calls":[{"id":"tool_call-ndzmgyk0n9a",
"name":"get_weather","args":{"location":"Berlin"}}]}}}]}

event: thread.run.step.delta
data: {"id":"step-21tvbj0jva6","object":"thread.run.step.delta","thread_id":"default","model":"agent-model","created":1747297317,"choices":[{"delta":{"role":"assistant",
"step_details":{"type":"tool_response","content":
"{\"location\":\"Berlin\",\"temperature\":22,\"condition\":\"sunny\",\"humidity\":45,\"unit\":\"celsius\"}","name":"get_weather","tool_call_id":"tool_call-ndzmgyk0n9a"}}}]}

event: thread.message.delta
data: {"id":"msg-r0jbgrc2ppo","object":"thread.message.delta","thread_id":"default","model":"granite","created":1747297317,
"choices":[{"delta":{"role":"assistant","content":"The temperature is 22 degrees."}}]}
```

## Weather Agent

The weather agent returns the final answer plus the tool call response.

```javascript
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`weather-agent.js server running on port ${PORT}`);
});

app.post('/v1/chat', async (req, res) => {
    try {
        const { messages, stream = false } = req.body;

        console.log("Niklas weather-agent.js v6 /v1/chat input: messages")
        for (message of messages) {
            console.log(message)
            toolCalls = JSON.stringify(message.tool_calls)
            if (toolCalls) console.log("Details tool_calls: " + toolCalls)
        }

        const threadId = req.headers['x-thread-id'] || 'default';
        if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            await streamResponseWithTools(res, messages, threadId, tools, toolFunctions);
        } else {
            const response = await processMessagesWithTools(messages, threadId, tools, toolFunctions);
            res.json(response);
        }
    } catch (error) {
        console.error('Error processing chat request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/v1/agents', (req, res) => {
    console.log("Niklas weather-agent.js /v1/agents invoked")
    res.json({
        agents: [
            {
                name: 'Weather Agent',
                description: 'A weather agent that knows temperatures in specific locations.',
                provider: {
                    organization: 'Niklas Heidloff',
                    url: 'https://heidloff.net'
                },
                version: '1.0.0',
                capabilities: {
                    streaming: true
                }
            }
        ]
    });
});

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

const tools = [
    {
        type: "function",
        function: {
            name: "get_weather",
            description: "Get the current weather for a location",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The city and state or country (e.g., 'San Francisco, CA')"
                    },
                    unit: {
                        type: "string",
                        enum: ["celsius", "fahrenheit"],
                        description: "The unit of temperature"
                    }
                },
                required: ["location"]
            }
        }
    }
];
const toolFunctions = {
    get_weather: async (args) => {
        const { location, unit = "celsius" } = args;
        const weatherData = {
            location,
            temperature: unit === "celsius" ? 22 : 72,
            condition: "sunny",
            humidity: 45,
            unit
        };
        return JSON.stringify(weatherData);
    }
};

async function processMessagesWithTools(messages, threadId, tools, toolFunctions) {
    try {
        assistantResponse = {
            "role": "assistant",
            "content": null,
            "tool_calls": [{
                "id": `tool_call-${Math.random().toString(36).substring(2, 15)}`,
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "arguments": "{\n\"location\": \"Berlin\"\n}"
                }
            }]
        }

        if (assistantResponse.tool_calls && assistantResponse.tool_calls.length > 0) {
            const updatedMessages = [...messages, assistantResponse];
            for (const toolCall of assistantResponse.tool_calls) {
                const { id, function: { name, arguments: argsString } } = toolCall;
                try {
                    const args = JSON.parse(argsString);
                    const result = await toolFunctions[name](args);
                    updatedMessages.push({
                        role: "tool",
                        tool_call_id: id,
                        name: name,
                        content: result
                    });
                } catch (error) {
                    console.error(`Error executing tool ${name}:`, error);
                    updatedMessages.push({
                        role: "tool",
                        tool_call_id: id,
                        name: name,
                        content: JSON.stringify({ error: error.message })
                    });
                }
            }

            content = updatedMessages[updatedMessages.length - 1].content
            contentJSON = JSON.parse(content)
            const finalResponse = {
                "id": "xxxxxasdrfawe235235adf",
                "object": "chat.completion",
                "created": 1741569952,
                "model": "granite",
                "choices": [
                    {
                        "index": 0,
                        "message": {
                            "role": "assistant",
                            "content": "The temperature is " + contentJSON.temperature + " degrees.",
                            "refusal": null,
                            "annotations": []
                        },
                        "logprobs": null,
                        "finish_reason": "stop"
                    }
                ],
                "usage": {
                    "prompt_tokens": 19,
                    "completion_tokens": 10,
                    "total_tokens": 29,
                    "prompt_tokens_details": {
                        "cached_tokens": 0,
                        "audio_tokens": 0
                    },
                    "completion_tokens_details": {
                        "reasoning_tokens": 0,
                        "audio_tokens": 0,
                        "accepted_prediction_tokens": 0,
                        "rejected_prediction_tokens": 0
                    }
                },
                messages: updatedMessages
            }
            console.log("Niklas weather-agent.js v6 /v1/chat before ouput: messages")
            for (message of updatedMessages) {
                console.log(message)
                toolCalls = JSON.stringify(message.tool_calls)
                if (toolCalls) console.log("Details tool_calls: " + toolCalls)
            }

            return {
                id: finalResponse.id,
                object: 'chat.completion',
                created: finalResponse.created,
                model: finalResponse.model,
                choices: finalResponse.choices,
                usage: finalResponse.usage
            };
        } else {
            return llmResponse;
        }
    } catch (error) {
        console.error("Error in processMessagesWithTools:", error);
        throw error;
    }
}

async function streamResponseWithTools(res, messages, threadId, tools, toolFunctions) {
    try {
        const thinkingStep = {
            id: `step-${Math.random().toString(36).substring(2, 15)}`,
            object: 'thread.run.step.delta',
            thread_id: threadId,
            model: 'agent-model',
            created: Math.floor(Date.now() / 1000),
            choices: [
                {
                    delta: {
                        role: 'assistant',
                        step_details: {
                            type: 'thinking',
                            content: 'Analyzing the request and determining if tools are needed...'
                        }
                    }
                }
            ]
        };
        res.write(`event: thread.run.step.delta\n`);
        res.write(`data: ${JSON.stringify(thinkingStep)}\n\n`);

        let assistantMessage = { role: "assistant", content: "", tool_calls: [] };
        let currentToolCall = null;
        chunk = {
            "id": "chatcmpl-123",
            "object": "chat.completion.chunk",
            "created": 1694268190,
            "model": "agent-model",
            "choices": [{
                "index": 0,
                "delta": {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": `tool_call-${Math.random().toString(36).substring(2, 15)}`,
                        "index": 0,
                        "type": "function",
                        "function": {
                            "name": "get_weather",
                            "arguments": "{\n\"location\": \"Berlin\"\n}"
                        }
                    }]
                },
                "logprobs": null,
                "finish_reason": "tool_calls"
            }
            ]
        }

        const delta = chunk.choices[0]?.delta;
        if (delta.content) {
            assistantMessage.content += delta.content;
            const messageDelta = {
                id: `msg-${Math.random().toString(36).substring(2, 15)}`,
                object: 'thread.message.delta',
                thread_id: threadId,
                model: chunk.model,
                created: Math.floor(Date.now() / 1000),
                choices: [{
                    delta: {
                        role: 'assistant',
                        content: delta.content
                    }
                }]
            };
            res.write(`event: thread.message.delta\n`);
            res.write(`data: ${JSON.stringify(messageDelta)}\n\n`);
        }

        if (delta.tool_calls && delta.tool_calls.length > 0) {
            const toolCallDelta = delta.tool_calls[0];
            if (toolCallDelta.index === 0 && toolCallDelta.id) {
                currentToolCall = {
                    id: toolCallDelta.id,
                    type: "function",
                    function: {
                        name: "",
                        arguments: ""
                    }
                };
                assistantMessage.tool_calls.push(currentToolCall);
            }
            if (currentToolCall) {
                if (toolCallDelta.function?.name) {
                    currentToolCall.function.name = toolCallDelta.function.name;
                }

                if (toolCallDelta.function?.arguments) {
                    currentToolCall.function.arguments += toolCallDelta.function.arguments;
                }
            }
        }

        if (chunk.choices[0]?.finish_reason === "tool_calls") {
            for (const toolCall of assistantMessage.tool_calls) {
                const toolCallStep = {
                    id: `step-${Math.random().toString(36).substring(2, 15)}`,
                    object: 'thread.run.step.delta',
                    thread_id: threadId,
                    model: chunk.model,
                    created: Math.floor(Date.now() / 1000),
                    choices: [
                        {
                            delta: {
                                role: 'assistant',
                                step_details: {
                                    type: 'tool_calls',
                                    tool_calls: [
                                        {
                                            id: toolCall.id,
                                            name: toolCall.function.name,
                                            args: JSON.parse(toolCall.function.arguments)
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                };
                res.write(`event: thread.run.step.delta\n`);
                //res.write(`event: tool_call\n`);
                res.write(`data: ${JSON.stringify(toolCallStep)}\n\n`);
            }

            const updatedMessages = [...messages, assistantMessage];
            for (const toolCall of assistantMessage.tool_calls) {
                try {
                    const { id, function: { name, arguments: argsString } } = toolCall;
                    const args = JSON.parse(argsString);
                    const result = await toolFunctions[name](args);
                    const toolResponseStep = {
                        id: `step-${Math.random().toString(36).substring(2, 15)}`,
                        object: 'thread.run.step.delta',
                        thread_id: threadId,
                        model: chunk.model,
                        created: Math.floor(Date.now() / 1000),
                        choices: [
                            {
                                delta: {
                                    role: 'assistant',
                                    step_details: {
                                        type: 'tool_response',
                                        content: result,
                                        name: name,
                                        tool_call_id: id
                                    }
                                }
                            }
                        ]
                    };
                    res.write(`event: thread.run.step.delta\n`);
                    res.write(`data: ${JSON.stringify(toolResponseStep)}\n\n`);
                    updatedMessages.push({
                        role: "tool",
                        tool_call_id: id,
                        name: name,
                        content: result
                    });
                } catch (error) {
                    console.error(`Error executing tool ${toolCall.function.name}:`, error);
                    const errorResponseStep = {
                        id: `step-${Math.random().toString(36).substring(2, 15)}`,
                        object: 'thread.run.step.delta',
                        thread_id: threadId,
                        model: chunk.model,
                        created: Math.floor(Date.now() / 1000),
                        choices: [
                            {
                                delta: {
                                    role: 'assistant',
                                    step_details: {
                                        type: 'tool_response',
                                        content: JSON.stringify({ error: error.message }),
                                        name: toolCall.function.name,
                                        tool_call_id: toolCall.id
                                    }
                                }
                            }
                        ]
                    };
                    res.write(`event: thread.run.step.delta\n`);
                    res.write(`data: ${JSON.stringify(errorResponseStep)}\n\n`);

                    updatedMessages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        name: toolCall.function.name,
                        content: JSON.stringify({ error: error.message })
                    });
                }
            }

            content = updatedMessages[updatedMessages.length - 1].content
            contentJSON = JSON.parse(content)
            const finalChunk = {
                "id": "xxxxxasdrfawe235235adf",
                "object": "chat.completion",
                "created": 1741569952,
                "model": "granite",
                "choices": [
                    {
                        "index": 0,
                        "delta": {
                            "role": "assistant",
                            "content": "The temperature is " + contentJSON.temperature + " degrees.",
                            "refusal": null,
                            "annotations": []
                        },
                        "logprobs": null,
                        "finish_reason": "stop"
                    }
                ],
                "usage": {
                    "prompt_tokens": 19,
                    "completion_tokens": 10,
                    "total_tokens": 29,
                    "prompt_tokens_details": {
                        "cached_tokens": 0,
                        "audio_tokens": 0
                    },
                    "completion_tokens_details": {
                        "reasoning_tokens": 0,
                        "audio_tokens": 0,
                        "accepted_prediction_tokens": 0,
                        "rejected_prediction_tokens": 0
                    }
                },
                messages: updatedMessages
            }
            console.log("Niklas weather-agent.js v6 /v1/chat before ouput: messages")
            for (message of updatedMessages) {
                console.log(message)
                toolCalls = JSON.stringify(message.tool_calls)
                if (toolCalls) console.log("Details tool_calls: " + toolCalls)
            }

            const messageDelta = {
                id: `msg-${Math.random().toString(36).substring(2, 15)}`,
                object: 'thread.message.delta',
                thread_id: threadId,
                model: finalChunk.model,
                created: Math.floor(Date.now() / 1000),
                choices: [
                    {
                        delta: {
                            role: 'assistant',
                            content: finalChunk.choices[0].delta.content
                        }
                    }
                ]
            };
            res.write(`event: thread.message.delta\n`);
            res.write(`data: ${JSON.stringify(messageDelta)}\n\n`);
        }
        res.end();
    } catch (error) {
        console.error("Error in streamResponseWithTools:", error);
        const errorMessage = {
            id: `error-${Math.random().toString(36).substring(2, 15)}`,
            object: 'thread.message.delta',
            thread_id: threadId,
            model: 'agent-model',
            created: Math.floor(Date.now() / 1000),
            choices: [
                {
                    delta: {
                        role: 'assistant',
                        content: `An error occurred: ${error.message}`
                    }
                }
            ]
        };

        res.write(`event: thread.message.delta\n`);
        res.write(`data: ${JSON.stringify(errorMessage)}\n\n`);
        res.end();
    }
}
```

## Travel Agent

The travel agent has no tool and returns only the final answer.

```javascript
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`travel-agent.js server running on port ${PORT}`);
});

app.post('/v1/chat', async (req, res) => {
    try {
        const { messages, stream = false } = req.body;

        console.log("Niklas travel-agent.js v6 /v1/chat input: messages")
        for (message of messages) {
            console.log(message)
            toolCalls = JSON.stringify(message.tool_calls)
            if (toolCalls) console.log("Details tool_calls: " + toolCalls)
        }

        const threadId = req.headers['x-thread-id'] || 'default';
        if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            await streamResponse(res, messages, threadId);
        } else {
            const response = await processMessages(messages, threadId);
            res.json(response);
        }
    } catch (error) {
        console.error('Error processing chat request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/v1/agents', (req, res) => {
    console.log("Niklas travel-agent.js /v1/agents invoked")
    res.json({
        agents: [
            {
                name: 'Travel Agent',
                description: 'A travel agent that helps with everything related to travel and can advise what to do at specific locations.',
                provider: {
                    organization: 'Niklas Heidloff',
                    url: 'https://heidloff.net'
                },
                version: '1.0.0',
                capabilities: {
                    streaming: true
                }
            }
        ]
    });
});

async function processMessages(messages, threadId) {
    const response = {
        id: generateId(),
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: 'agent-model',
        choices: [
            {
                index: 0,
                message: {
                    role: 'assistant',
                    content: 'You should check out the Brandenburger Tor.'
                },
                finish_reason: 'stop'
            }
        ],
        usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0
        }
    };

    return response;
}

async function streamResponse(res, messages, threadId) {
    const thinkingStep = {
        id: `step-${generateId()}`,
        object: 'thread.run.step.delta',
        thread_id: threadId,
        model: 'agent-model',
        created: Math.floor(Date.now() / 1000),
        choices: [
            {
                delta: {
                    role: 'assistant',
                    step_details: {
                        type: 'thinking',
                        content: 'Analyzing the user request and determining the best approach...'
                    }
                }
            }
        ]
    };
    res.write(`event: thread.run.step.delta\n`);
    res.write(`data: ${JSON.stringify(thinkingStep)}\n\n`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const messageChunk = {
        id: `msg-${generateId()}`,
        object: 'thread.message.delta',
        thread_id: threadId,
        model: 'agent-model',
        created: Math.floor(Date.now() / 1000),
        choices: [
            {
                delta: {
                    role: 'assistant',
                    content: 'You should check out the Brandenburger Tor.'
                }
            }
        ]
    };
    console.log("Niklas travel-agent.js v6 /v1/chat before ouput: messages")
    for (message of messages) {
        console.log(message)
        toolCalls = JSON.stringify(message.tool_calls)
        if (toolCalls) console.log("Details tool_calls: " + toolCalls)
    }
    res.write(`event: thread.message.delta\n`);
    res.write(`data: ${JSON.stringify(messageChunk)}\n\n`);
    res.end();
}

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}
```

## External Agents

The two example agents can be developed and tested locally via node:

package.json:

```json
{
  "dependencies": {
    "express": "5.1.0"
  }
}
```

Dockerfile:

```text
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node","weather-agent.js"]
```

Commands to run the agent locally:

```bash
podman build -t weather-agent-mac:6 .
podman ps -a | grep 3005
podman rm -f ...
podman run -it -p 3005:3005 weather-agent-mac:6

curl -XPOST -H 'Authorization: Bearer xxx' -H "Content-type: application/json" -d '{
  "model": "granite",
  "stream": true,
  "messages": [
    {
      "role": "user",
      "content": "How is the weather in Berlin?"
    }
  ]
}' 'http://localhost:3005/v1/chat'
```

The command returns the following result:

```text
weather-agent.js server running on port 3005
Niklas weather-agent.js v6 /v1/chat input: messages
{ role: 'user', content: 'How is the weather in Berlin?' }
Niklas weather-agent.js v6 /v1/chat before ouput: messages
{ role: 'user', content: 'How is the weather in Berlin?' }
{
  role: 'assistant',
  content: '',
  tool_calls: [
    {
      id: 'tool_call-2gjz8ws28sw',
      type: 'function',
      function: [Object]
    }
  ]
}
Details tool_calls: [{"id":"tool_call-2gjz8ws28sw","type":"function","function":{"name":"get_weather","arguments":"{\n\"location\": \"Berlin\"\n}"}}]
{
  role: 'tool',
  tool_call_id: 'tool_call-2gjz8ws28sw',
  name: 'get_weather',
  content: '{"location":"Berlin","temperature":22,"condition":"sunny","humidity":45,"unit":"celsius"}'
}
```

## Setup

To deploy the example scenario execute the following steps (replace my configuration with your information).

**Deploy external agents on Code Engine**

```bash
brew install ibmcloud
ibmcloud plugin install container-registry
ibmcloud login --sso
ibmcloud cr region-set global
ibmcloud target -g niklas
ibmcloud cr namespace-add niklas
ibmcloud target -r us-east 
ibmcloud cr login

podman build --platform linux/amd64 -t weather-agent:6 .
podman tag weather-agent:6 icr.io/niklas/weather-agent:6
podman push icr.io/niklas/weather-agent:6
```

Create serveless Code Engine application 'weather-agent':

* Image: private.icr.io/niklas/weather-agent:6
* Min instances: 1
* Max instances: 1
* Listening port: 3005

![image](/assets/img/2025/05/orchestrate-agent-connect-03.png)

Test the endpoint:

```bash
curl https://weather-agent.xxx.us-east.codeengine.appdomain.cloud/v1/agents

{"agents":[{"name":"Weather Agent","description":"A weather agent that knows about temperatures in specific locations.","provider":{"organization":"Niklas Heidloff","url":"https://heidloff.net"},"version":"1.0.0","capabilities":{"streaming":true}}]}
```

**Create an agent and import the two external agents in Orchestrate**

Create new agent:

![image](/assets/img/2025/05/orchestrate-agent-connect-02.png)

```text
Name: weather-travel-agent
Description: This agent can help with questions related to weather and travel, for example what to visit at certain locations.
````

Import external agents:

![image](/assets/img/2025/05/orchestrate-agent-connect-04.png)

```text
API key: x
URL: https://weather-agent.1vdiu694k1et.us-east.codeengine.appdomain.cloud/v1/chat
Name: Weather-Agent
Description: A weather agent that knows temperatures in specific locations.
```


## Next Steps

To learn more, check out the [watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=agents-overview-agent-builder) documentation and the [watsonx Orchestrate Agent Development Kit](https://github.com/IBM/ibm-watsonx-orchestrate-adk) landing page.