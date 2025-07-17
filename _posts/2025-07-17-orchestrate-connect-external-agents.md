---
id: nh-136
title: 'Passing Context between watsonx Orchestrate Agents'
date: 2025-07-17 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-136'
permalink: /article/orchestrate-connect-external-agents/
custom_permalink:
    - article/orchestrate-connect-external-agents/
image: /assets/img/2025/07/orchestrate-connect.png
---

*Watsonx Orchestrate is IBM's platform to run agentic systems. Agents can orchestrate work by delegating to multiple agents and tools. This post describes how external collaborator agents can get context from previous agents.*

I've blogged about [Connecting AI Agents to IBM watsonx Orchestrate]({{ "/article/orchestrate-agent-connect/" | relative_url }}). This post uses the same example focusing on how the second agent can get the output of the first agent in a multi-agent system.

## IBM Agent Connect

To integrate external agents into watsonx Orchestrate, IBM created [Agent Connect](https://connect.watson-orchestrate.ibm.com/introduction):

> The IBM Agent Connect Framework is a foundational integration architecture designed to enable seamless connectivity between external agents and watsonx Orchestrate. Complementing this, IBM Agent Connect is a partner program that offers independent software vendors (ISVs) the opportunity to collaborate with IBM.

To allow multi-agent collaboration, agents communicate using a standardized chat completions API, which follows familiar patterns from OpenAI and other LLM providers. Agents can share tool calling details with other agents using Agent Connect events. Agents can stream their [intermediate thinking steps](https://connect.watson-orchestrate.ibm.com/acf/advanced-topics/streaming-intermediate-steps) and tool calls, providing visibility into their reasoning process and enabling more effective [collaboration](https://connect.watson-orchestrate.ibm.com/tool-calling/implementation).  

> Within the Agent Connect framework, both tool calls and tool call responses can be shared among agents. This form of observability allows one agent to leverage the work performed by another agent. For instance, a CRM agent might retrieve account information and store details in a tool call response. Subsequently, an Email agent can utilize this information to find critical details, such as an email address for an account. By sharing tool calls and tool call responses, agents can collaborate on sub-tasks while sharing contextual information essential to the overall success of the main task.

## Example

Let's look at a simple example. A 'Weather and Travel' agent invokes two external agents: 1. weather and 2. travel. The external agents are hosted on IBM Code Engine and implement the Agent Connect '/v1/chat' endpoint. 

Example conversations:

* User: How is the weather in Berlin?
* Agent: 22 degrees
* User: What can I do there?
* Agent: Check out Brandenburger Tor

Note that the user says 'there' in the follow up question.

## Context

The following example shows how the second travel agent can leverage the context from the first agent.

It understands what 'there' means (= 'Berlin'), since the orchestrator agent passes in this information

It could even leverage the information '22 degrees'. For example, if the temperature is below zero degrees it might suggest a museum, instead of 'Brandenburger Tor'. (By the way: I'd go there anyway.)

This snippet shows the beginning of the /chat endpoint implementation where the information below is logged to see what context is provided as input. 

From the perspective of the orchestrator agent the two collaborator agents are just tools, which internally can contain agents or tools.

```javascript
app.post('/v1/chat', async (req, res) => {
    try {
        const { messages, stream = false } = req.body;

        console.log("Niklas travel-agent.js v6 /v1/chat input: messages")
        for (message of messages) {
            console.log(message)
            toolCalls = JSON.stringify(message.tool_calls)
            if (toolCalls) console.log("Details tool_calls: " + toolCalls)
        }
```

```text
Niklas travel-agent.js v6 /v1/chat input: messages
{
  content: "Today's date is Wed Jul 16, 2025.\n" +
    '\n' +
    'You are Travel-Agent, a helpful, ethical, and cautious AI assistant. You carefully follow instructions. You are helpful and harmless and you follow ethical guidelines and promote positive behavior. \n' +
    'THIS IS VERY IMPORTANT - you will follow these instructions very carefully: \n' +
    "You should try to answer the user's questions to the best of your ability..\n" +
    '\n' +
    '\n',
  role: 'system'
}
{ content: 'How is the weather in Berlin?', role: 'user' }
{
  content: 'Using tools: Weather-Agent',
  name: 'weather_travel_agent_551Fr',
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      id: 'chatcmpl-tool-06d22f30a359447eb54705bf02',
      function: [Object]
    }
  ]
}
Details tool_calls: [{"type":"function","id":"chatcmpl-tool-06d22f30a359447eb54705bf02","function":{"name":"Weather-Agent","arguments":"{\"location\": \"Berlin\"}"}}]
{
  content: 'Using tools: Weather-Agent',
  role: 'tool',
  tool_call_id: 'chatcmpl-tool-06d22f30a359447eb54705bf02'
}
{
  content: 'The temperature is 22 degrees.',
  name: 'Weather-Agent',
  role: 'assistant'
}
{ content: 'What can I do there?', role: 'user' }
{
  content: 'Using tools: Travel-Agent',
  name: 'weather_travel_agent_551Fr',
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      id: 'chatcmpl-tool-20e185def8374253983b92d09d',
      function: [Object]
    }
  ]
}
Details tool_calls: [{"type":"function","id":"chatcmpl-tool-20e185def8374253983b92d09d","function":{"name":"Travel-Agent","arguments":"{\"location\": \"Berlin\"}"}}]
{
  content: 'Using tools: Travel-Agent',
  role: 'tool',
  tool_call_id: 'chatcmpl-tool-20e185def8374253983b92d09d'
}
```

## Code Engine Logs

With the following commands the IBM Code Engine logs above can be retrieved.

```bash
ibmcloud login --sso
ibmcloud target -r us-east
ibmcloud target -g niklas
ibmcloud ce project select -n niklas
ibmcloud ce project select -n niklas --kubecfg
CODEENGINE_PROJECT_NAMESPACE=$(ibmcloud ce project get --name niklas --output json | grep "namespace" | awk '{print $2;}' | sed 's/"//g' | sed 's/,//g')
kubectl get pods -n $CODEENGINE_PROJECT_NAMESPACE
kubectl get deployments -n $CODEENGINE_PROJECT_NAMESPACE
kubectl get configmaps -n $CODEENGINE_PROJECT_NAMESPACE
APP_POD=$(kubectl get pod -n $CODEENGINE_PROJECT_NAMESPACE | grep travel | awk '{print $1}')
kubectl logs -f $APP_POD
```

## Next Steps

To find out more, check out the following resources:

* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Developer watsonx Orchestrate APIs](https://developer.watson-orchestrate.ibm.com/apis/)