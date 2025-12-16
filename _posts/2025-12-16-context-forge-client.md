---
id: nh-154
title: 'Managing MCP Tools with Context Forge'
date: 2025-12-16 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-154'
permalink: /article/context-forge-client/
custom_permalink:
    - article/context-forge-client/
image: /assets/img/2025/12/context-forge-client-00.png
---

*When building applications, developers often utilize standard tooling - Docker or Podman for containers, Ollama for local models. Context Forge aims to become the standard tool to manage agentic MCP tools.*

MCP has become the de-facto standard to build tools for agentic applications. Tools can be leveraged by agents to access data and to invoke business functionality. They are integrated in AI-based applications, for example development environments like IBM Bob.

While technically agents can access tools directly, there is a need to manage tools and their invocations, similarly to classic APIs. While agents can be built to have access to many tools, limitations of context windows of Large Language Models suggest keeping these lists as small to possible to reduce the noise and make agents more reliable. Context Forge addresses these challenges of administrators and developers. 

Today IBM released [version 1.0.0](https://developer.ibm.com/blogs/context-forge-mcp-gateway-now-available/) (beta 1) of the open-source project [Context Forge](https://github.com/IBM/mcp-context-forge) which comes with a new [desktop client](https://github.com/contextforge-org/contextforge-desktop) and [CLI](https://github.com/contextforge-org/contextforge-cli).

## Introduction

Context Forge is a gateway, registry, and proxy that sits in front of any Model Context Protocol (MCP) server, A2A server or REST API-exposing a unified endpoint for all your AI clients. It currently supports:

* Federation across multiple MCP and REST services
* A2A (Agent-to-Agent) integration for external AI agents (OpenAI, Anthropic, custom)
* gRPC-to-MCP translation via automatic reflection-based service discovery
* Virtualization of legacy APIs as MCP-compliant tools and servers
* Transport over HTTP, JSON-RPC, WebSocket, SSE (with configurable keepalive), stdio and streamable-HTTP
* An Admin UI for real-time management, configuration, and log monitoring (with airgapped deployment support)
* Built-in auth, retries, and rate-limiting with user-scoped OAuth tokens and unconditional X-Upstream-Authorization header support
* OpenTelemetry observability with Phoenix, Jaeger, Zipkin, and other OTLP backends
* Scalable deployments via Docker or PyPI, Redis-backed caching, and multi-cluster federation

The lead developer Mihai Criveti introduced Context Forge:

* Article: [ContextForge MCP Gateway: The Missing Proxy & Registry for AI Tools](https://medium.com/@crivetimihai/mcp-gateway-the-missing-proxy-for-ai-tools-2b16d3b018d5)
* Video: [Context Forge - MCP Gateway (The AI Alliance)](https://www.youtube.com/watch?v=S-DlCid50Zo)

## MCP Tools

Let's look how developers can start with Context Forge via the desktop client. Once installed, Context Forge can be run in the background and can be managed via an Electron-based user interface.

First, new MCP servers can be registered with SSE and Streamable HTTP transport types, different access levels and multiple authentication types including OAuth.

![image](/assets/img/2025/12/context-forge-client-01.png)

Once MCP servers have been defined, the tools show up. In my example I point to two documentation servers for LangChain and watsonx.Orchestrate which could be integrated in AI-based development environments.

![image](/assets/img/2025/12/context-forge-client-02.png)

The tools can be tested in the desktop client.

![image](/assets/img/2025/12/context-forge-client-03.png)

## Virtual MCP Servers

Virtual servers allow combining tools from different MCP servers and defining subsets of tools to support agents choosing the right tools - see the screenshot at the top of this post.

To access the virtual servers, their MCP configuration can be downloaded.

![image](/assets/img/2025/12/context-forge-client-04.png)

Access is managed via API keys with fine grained permissions.

![image](/assets/img/2025/12/context-forge-client-05.png)

Virtual servers can be accessed like other MCP servers, for example in MCP Inspector.

![image](/assets/img/2025/12/context-forge-client-06.png)

## Next Steps

Thank you to Rynne Whitnah for implementing the client and Gabe Goodhart for developing the CLI.

To find out more, check out the following resources:

* [Context Forge Documentation](https://ibm.github.io/mcp-context-forge/)
* [ContextForge MCP Gateway: The Missing Proxy & Registry for AI Tools](https://medium.com/@crivetimihai/mcp-gateway-the-missing-proxy-for-ai-tools-2b16d3b018d5)
* [Context Forge](https://github.com/IBM/mcp-context-forge)
* [Context Forge Desktop](https://github.com/contextforge-org/contextforge-desktop)
* [Context Forge CLI](https://github.com/contextforge-org/contextforge-cli)
* [IBM Elite Support for MCP Context Forge specification](https://www.ibm.com/docs/en/esfmcf?topic=elite-support-mcp-context-forge-specification)