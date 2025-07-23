---
id: nh-137
title: 'Traces of Agents in watsonx Orchestrate'
date: 2025-07-18 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-137'
permalink: /article/agent-tracing-watsonx/
custom_permalink:
    - article/agent-tracing-watsonx/
image: /assets/img/2025/07/agent-tracing-00.png
---

*When building agentic systems, observability is key. While several demos seem to indicate that fully autonomous agents can already do everything, in reality often multi-agent systems fail. This post describes a new observability capability in watsonx Orchestrate.*

Watsonx Orchestrate is IBM's platform to run agentic systems. You can start simple to build your first agents, but as a developer you can also get full control. To understand what agents do, observability is key as I described in my post [Why Agents and Agentic Systems can fail]({{ "/article/why-agents-fail/" | relative_url }}).

There are different options to understand what agents do:

* High level descriptions of flows and tool calls via the trajectory user interface
* [Observability via Langfuse]({{ "/article/orchestrate-langfuse/" | relative_url }})
* This post: New tracing user interface via Jaeger

## Monitoring

Watsonx Orchestrate comes with a new feature [Monitoring Agent Analytics](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=monitoring-agent-analytics) which uses [Jaeger](https://www.jaegertracing.io/docs/1.12/deployment/frontend-ui/) and [OpenTelemetry](https://opentelemetry.io/). OpenTelemetry allows utilizing various solutions like Langfuse and Jaeger.

> OpenTelemetry is a collection of APIs, SDKs, and tools. Use it to instrument, generate, collect, and export telemetry data (metrics, logs, and traces) to help you analyze your software’s performance and behavior.

## Example

Let's look at an example conversation:

* User: How is the weather in Berlin?
* Agent: 22 degrees

The orchestration agent 'weather-travel-agent' invokes a collaborator agent 'weather-agent' which invokes a tool 'weather-lookup'. The screenshot shows the trajectory:

![image](/assets/img/2025/07/agent-tracing-05.png)

## Traces

Watsonx Orchestrate provides an overview page of all traces and other metrics.

![image](/assets/img/2025/07/agent-tracing-04.png)

For specific agents the most recent traces are displayed. For each user input there is one trace.

![image](/assets/img/2025/07/agent-tracing-01.png)

In the example the orchestrator agent is invoked first which decides to invoke the collaborator agent. In the trace you can see the prompt and more information.

![image](/assets/img/2025/07/agent-tracing-02.png)

The collaborator weather agent has its own prompt and passed the output back to the orchestrator agent.

![image](/assets/img/2025/07/agent-tracing-03.png)

## Next Steps

To find out more, check out the following resources:

* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Documentation watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)