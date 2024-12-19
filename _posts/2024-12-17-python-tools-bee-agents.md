---
id: nh-099
title: 'Custom Python Tools with the Bee Agent Framework'
date: 2024-12-17 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-099'
permalink: /article/python-tools-bee-agents/
custom_permalink:
    - article/python-tools-bee-agents/
image: /assets/img/2024/12/bee-ui-1.png
---

*The Bee Agent Platform is an open-source project from IBM Research to build agentic applications with TypeScript and Python. This post summarizes how to build Python tools.*

The [Bee Agent Platform](https://github.com/i-am-bee) is evolving quickly. While the core framework supports TypeScript/JavaScript developers, more components have been added to also support Python developers and it provides a nice user interface to define agents and tools.

> The platform for building powerful AI agent workflows with open-source models. Bee Agent Platform empowers developers to create, customize, and deploy AI agents. Our ecosystem provides everything you need to build production-ready AI agents - from low-level primitives to no-code interfaces.

## Python Tools

Let's look at a simple example. The following snippet shows a Python tool that finds out information about IP addresses.


```python
import requests

def ip_info(ip: str) -> dict:
  """
  Get information about an IP address, such as location, company, and carrier name.

  :param ip: IP address in the 255.255.255.255 format
  :return: Information about the IP address
  """
  response = requests.get(f"https://ipinfo.io/{ip}/geo")
  response.raise_for_status()
  return response.json()
```

The Python code can be defined in the user interface. The tool expects an IP address as input and returns meta information about the IP address in JSON format.

![image](/assets/img/2024/12/bee-ui-2.png)

## Agents

The user interface also provides the capability to define agents, especially the definition of roles and the available tools.

When you run the agent, it returns information like the domain name for the IP address.

![image](/assets/img/2024/12/bee-ui-3.png)

## Setup

The setup is easy. In my case I defined watsonx as the LLM backend and the model that should be used.

```text
# LLM Provider (watsonx/ollama/openai/groq/bam)
LLM_BACKEND="watsonx"

## WatsonX
WATSONX_API_KEY="xxx"
WATSONX_PROJECT_ID="xxx"
WATSONX_MODEL="meta-llama/llama-3-1-70b-instruct"
WATSONX_REGION="us-south"
```

You can run the full stack locally via containers. In addition to the core framework there are also containers for the user interface, the API and several databases for the memory of agents.

![image](/assets/img/2024/12/bee-ui-4.png)

## Next Steps

The best way to learn the Bee Agent Framework is to try the [Bee Agent Framework Starter](https://github.com/i-am-bee/bee-agent-framework-starter?tab=readme-ov-file#-bee-agent-framework-starter).