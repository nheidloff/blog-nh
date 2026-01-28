---
id: nh-162
title: 'Developing watsonx Orchestrate Agents with Antigravity'
date: 2026-01-28 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-162'
permalink: /article/watsonx-orchestrate-anti-gravity/
custom_permalink:
    - article/watsonx-orchestrate-anti-gravity/
image: /assets/img/2026/01/orchestrate-anti-gravity-00.png
---

*Watsonx Orchestrate is IBM's platform to build and run agentic applications in enterprises. Agents can be built in various ways, for example via the Agent Development Kit. This post describes how to leverage Google Antigravity to build agents.*

Previously I blogged about how to [develop watsonx Orchestrate Agents with IBM Bob]({{ "/article/bob-orchestrate/" | relative_url }}). The same functionality is supported with other AI-based development environments which shows the power of open standards like MCP (Model Context Protocol).

## MCP Documentation Tool

Watsonx Orchestrate provides a remote MCP server for the documentation. You can define MCP servers locally in projects or globally.

![image](/assets/img/2026/01/orchestrate-anti-gravity-01.png)

```json
{
    "mcpServers": {
        "wxo": {
            "command": "/opt/homebrew/bin/uvx",
            "args": [
                "mcp-proxy",
                "--transport",
                "streamablehttp",
                "https://developer.watson-orchestrate.ibm.com/mcp"
            ]
        }
    }
}
```

![image](/assets/img/2026/01/orchestrate-anti-gravity-02.png)

## Example

With the following prompt, Antigravity creates a weather agent with two tools.

```text
Create a new IBM watsonx Orchestrate agent "Weather Agent" 
which uses a tool to receive weather information for a specific 
city, for example Berlin, Munich, Madrid.
The tool needs to use a public weather service which doesn't 
require registration.
```

The documentation tool is invoked.

![image](/assets/img/2026/01/orchestrate-anti-gravity-03.png)

With a second prompt I asked Antigravity to create a README.md with instructions on how to import the agent and the tools - see the screenshot at the top.

## Skills

You can also leverage skills to help Antigravity choose the right tools and to give it further customized instructions. Below is an example skill, but I didn't have to use it in this simple example.

![image](/assets/img/2026/01/orchestrate-anti-gravity-04.png)

```markdown
---
name: watsonxOrchestrateAgentBuilder
description: Creates and modifies IBM watsonx Orchestrate agents and tools
version: 1.0.0
---

# watsonx Orchestrate Agent Builder Mode

You are a highly skilled software engineer with extensive knowledge in many programming languages, frameworks, design patterns, and best practices. You are especially skilled at building new agents for IBM watsonx Orchestrate.

## 🛠 Required Tools
- `SearchIbmWatsonxOrchestrateAdk` (part of the wxo MCP server) to read watsonx Orchestrate documentation.

## Core Rules
- Before solving any tasks related to the watsonx Orchestrate platform use the wxo MCP server's SearchIbmWatsonxOrchestrateAdk tool to better understand how to author agents, tools, toolkits, models, knowledge_bases and connections for wxo.
- Never include ibm-watsonx-orchestrate in your requirements.txt
```

## Next Steps

To find out more, check out the following resources:

* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Antigravity](https://antigravity.google/)