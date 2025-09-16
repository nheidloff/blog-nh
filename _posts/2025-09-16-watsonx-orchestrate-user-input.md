---
id: nh-143
title: 'Getting User Input in watsonx Orchestrate Agents'
date: 2025-09-16 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-143'
permalink: /article/watsonx-orchestrate-user-input/
custom_permalink:
    - article/watsonx-orchestrate-user-input/
image: /assets/img/2025/09/watsonx-orchestrate-user-input-00.png
---

*Watsonx Orchestrate is IBM's platform to build and run agentic systems. Autonomous agents can automate tasks but often humans need to be in the loop. This post explains how Orchestrate agents can ask for user inputs.*

The article [Agentic AI and the Future of Enterprise Governance](https://funmachines.substack.com/p/agentic-ai-and-the-future-of-enterprise) describes the need for governance and human interventions.

> Agentic AI has slipped from lab demos into expense approvals, supply chain tweaks, and 'just ship it' marketing ops. It doesn’t merely recommend; it acts - plans tasks, calls APIs, moves money, files tickets, and books trucks. That’s useful. It’s also a governance migraine. [...] it’ll be power: who gets it, how it’s constrained, and who answers when it goes sideways. 

## Example

Let's look at an example how users can approve a flight booking.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-01.png)

The next image shows the complete but simplified flow.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-02.png)

## Flow Interfaces

Orchestrate comes with a flow builder to create sequential flows. These flows can be utilized by orchestration agents like other tools.

Flows have inputs and outputs, in this case the destination as input and a message whether the flight could be booked as output.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-03.png)

## User Output

With the user output control steps can be defined to display data to users which can contain information from previous steps.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-04.png)

## User Input

Vice versa, users can be asked to provide input, for example binary values, checkboxes or free text. Dependent on the input branch nodes point to the next nodes in the flows.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-05.png)

## Code Blocks

Agent builders can write Python code in code blocks which have output variables.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-06.png)

Data from previous steps can be referred to via 'flow.', 'parent.' and 'self.'.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-07.png)

## Flow Output

Flows have specific output schemas. The following screenshot shows how to define data from the flow as flow output.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-08.png)

## Observability

For developers Langfuse displays traces in which order flows have been executed. In this example the output of the flow is 'Flight to Boston has been booked'.

![image](/assets/img/2025/09/watsonx-orchestrate-user-input-09.png)

## Next Steps

To find out more, check out the following resources:

* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestrate Product](https://www.ibm.com/products/watsonx-orchestrate)
* [Watsonx Orchestrate Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)