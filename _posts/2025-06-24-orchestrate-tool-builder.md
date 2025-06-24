---
id: nh-131
title: 'Introducing the watsonx Orchestrate Tool Builder'
date: 2025-06-24 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-131'
permalink: /article/orchestrate-tool-builder/
custom_permalink:
    - article/orchestrate-tool-builder/
image: /assets/img/2025/06/orchestrate-tool-builder-00.png
---

*watsonx Orchestrate is a low code tool to build AI agents for business. It comes with a new component, called 'Tool Builder' to create flows via a graphical user interface or for developers via Python. This post introduces the new powerful capability.*

To run the examples below, install the IBM [watsonx Orchestrate Agent Development Kit](https://developer.watson-orchestrate.ibm.com/getting_started/installing) (ADK). You can point the ADK against watsonx Orchestrate on AWS or IBM Cloud or run the [watsonx Orchestrate Developer Edition](https://developer.watson-orchestrate.ibm.com/getting_started/wxOde_setup) locally via containers.

## Flows

The new [flow tools](https://developer.watson-orchestrate.ibm.com/tools/flows/overview) are available as public preview. 

> Flows is an agentic workflow tool that enables you to sequence nodes to build dynamic, intelligent workflows. Each node can represent an agent, a tool, or built-in capabilities such as user interactions, prompts, decision logic, or document extraction.

As I blogged about earlier, there are different [types of agentic systems](https://heidloff.net/article/why-agents-fail/#agentic-systems) with pros and cons. While fully autonomous agents are getting a lot of attention these days, in many scenarios you need more structure. For example, you simply might want to call a tool B after the tool A before the LLM generates a response. While you can try to implement this via instructions for the agent, it is not as reliable, not necessary and rather over-engineered. 

![image](/assets/img/2025/04/why-agents-fail-slide-14.png)

The flows in watsonx Orchestrate address this challenge by adding the ability to have workflows for certain parts, but letting agents orchestrate other parts autonomously.

Flows have nodes, edges and data mappings. The documentation talks about different node types to integrate different re-usable components, custom code and required 'human in the loop' activities:

- Tools
- Agents
- Users
- Python code
- Generative AI prompts

## Example

The screenshot at the top of this post shows a simple [flow](https://github.com/IBM/ibm-watsonx-orchestrate-adk/tree/9928abbe1acd9f1553fdf10d728403445e0a989c/examples/experimental/flow_builder/hello_message_flow) where two tools are invoked after each other. Some of the capabilities are only available via code (see below) yet, for example chaining of agents. Other features are planned to be added.

A flow can contain custom logic, tools and agents, but from the perspective of an agent it is just another tool. Similarly to other tools, flows provide a schema for input and output parameters.

![image](/assets/img/2025/06/orchestrate-tool-builder-01.png)

## Asynchronous Execution

Once deployed, you can invoke queries like 'get me a hello message for John Doe'. This will invoke the first tool to combine the first and last name and invoke the second tool to return a greeting.

![image](/assets/img/2025/06/orchestrate-tool-builder-02.png)

Since flows take usually longer, they are invoked [asynchronously](https://developer.watson-orchestrate.ibm.com/tools/flows/testing_flow). [Currently](https://developer.watson-orchestrate.ibm.com/tools/flows/overview) the parent agents don't have a mechnism how to receive the responses. Instead, users need to pull updates, for example via 'what is the current status?' which triggers a tool that is provided out of the box.

![image](/assets/img/2025/06/orchestrate-tool-builder-03.png)

## Code

In addition to the Tool Builder user interface developers can write code to implement flows. There are a number of [examples](https://github.com/IBM/ibm-watsonx-orchestrate-adk/tree/9928abbe1acd9f1553fdf10d728403445e0a989c/examples/experimental/flow_builder).

This is the code from the example above. Input and output schemas are defined and a function which is annotated contains the flow definition.

```python
'''
Build a simple hello world flow that will combine the result of two tools.
'''

from pydantic import BaseModel
from ibm_watsonx_orchestrate.experimental.flow_builder.flows import END, Flow, flow, START

from .get_hello_message import get_hello_message
from .combine_names import combine_names

class Name(BaseModel):
    """
    This class represents a person's name.

    Attributes:
        first_name (str): The person's first name.
        last_name (str): The person's last name.
    """
    first_name: str
    last_name: str

@flow(
        name = "hello_message_flow",
        input_schema=Name,
        output_schema=str
    )
def build_hello_message_flow(aflow: Flow = None) -> Flow:
    """
    Creates a flow with two tools: get_hello_message and combine_names.
    This flow will rely on the Flow engine to perform automatic data mapping at runtime.
    Args:
        flow (Flow, optional): The flow to be built. Defaults to None.
    Returns:
        Flow: The created flow.
    """
    combine_names_node = aflow.tool(combine_names)
    get_hello_message_node = aflow.tool(get_hello_message)

    aflow.edge(START, combine_names_node).edge(combine_names_node, get_hello_message_node).edge(get_hello_message_node, END)
    return aflow
```

The flows are [compiled](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/9928abbe1acd9f1553fdf10d728403445e0a989c/examples/experimental/flow_builder/hello_message_flow/generated/hello_message_flow.json) into JSON to be executed by the flows engine.

## Expressions

As displayed in the screenshot at the top, there are plans to have different components to define flows. The branch component is already available. To build a typical if/then flow, an [expression language](https://developer.watson-orchestrate.ibm.com/tools/flows/flow_expression) is provided. Nice.

![image](/assets/img/2025/06/orchestrate-tool-builder-04.png)

## Next Steps

To learn more, check out the [watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=agents-overview-agent-builder) documentation and the [watsonx Orchestrate Agent Development Kit](https://developer.watson-orchestrate.ibm.com/) landing page.