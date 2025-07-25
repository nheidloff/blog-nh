---
id: nh-139
title: 'Converting SSE to STDIO via the MCP Gateway'
date: 2025-07-25 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-139'
permalink: /article/mcp-gateway/
custom_permalink:
    - article/mcp-gateway/
image: /assets/img/2025/07/mcp-gateway-00.png
---

*The Model Context Protocol (MCP) has quickly become the standard how tools can be invoked from agents. There are different transport mechanisms, but some clients only support STDIO at this point. The MCP Gateway supports managing MCP tools from various sources via virtual MCP servers. This post focusses on another great capability of the gateway to convert SSE to STDIO allowing MCP clients access to more tools.*

IBM open sourced [MCP Gateway](https://github.com/ibm/mcp-context-forge), aka ContextForge MCP Gateway, which is available in version 0.4.0.

> Model Context Protocol gateway & proxy - unify REST, MCP, and A2A with federation, virtual servers, retries, security, and an optional admin UI. [...] ContextForge MCP Gateway is a feature-rich gateway, proxy and MCP Registry that federates MCP and REST services - unifying discovery, auth, rate-limiting, observability, virtual servers, multi-transport protocols, and an optional Admin UI into one clean endpoint for your AI clients. It runs as a fully compliant MCP server, deployable via PyPI or Docker, and scales to multi-cluster environments on Kubernetes with Redis-backed federation and caching.

This post focusses on the capability to convert SSE (Server Sent Events) tools to STDIO (standard input/output) tools.

## MCP Gateway Setup

There are different ways to run the gateway, for example via local containers, and there are scripts to deploy it to multiple servers. The [Quick Start](https://github.com/IBM/mcp-context-forge?tab=readme-ov-file#quick-start---pypi) guide describes how to run everything locally via Python.

The following commands show how to ...

* install the gateway
* generate a bearer token
* run a local MCP server and connect it to the gateway
* create a virtual server
* test the tools in MCP inspector

```bash
# Isolated env + install from pypi
mkdir mcpgateway && cd mcpgateway
python3 -m venv .venv && source .venv/bin/activate
pip install --upgrade pip
pip install mcp-contextforge-gateway

# Launch on all interfaces with custom creds & secret key
# Enable the Admin API endpoints (true/false) - disabled by default
export MCPGATEWAY_UI_ENABLED=true
export MCPGATEWAY_ADMIN_API_ENABLED=true

BASIC_AUTH_PASSWORD=pass JWT_SECRET_KEY=my-test-key \
  mcpgateway --host 0.0.0.0 --port 4444 &   # admin/pass

# Generate a bearer token & smoke-test the API
export MCPGATEWAY_BEARER_TOKEN=$(python3 -m mcpgateway.utils.create_jwt_token \
    --username admin --exp 10080 --secret my-test-key)

curl -s -H "Authorization: Bearer $MCPGATEWAY_BEARER_TOKEN" \
     http://127.0.0.1:4444/version | jq

# Spin up the sample GO MCP time server:
pip install uv # to install uvx, if not already installed
python3 -m mcpgateway.translate --stdio "uvx mcp-server-git" --port 9000

# Register it with the gateway
curl -s -X POST -H "Authorization: Bearer $MCPGATEWAY_BEARER_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"fast_time","url":"http://localhost:9000/sse"}' \
     http://localhost:4444/gateways

# Verify tool catalog
curl -s -H "Authorization: Bearer $MCPGATEWAY_BEARER_TOKEN" http://localhost:4444/tools | jq

# Create a *virtual server* bundling those tools. Use the ID of tools from the tool catalog (Step #3) and pass them in the associatedTools list.
curl -s -X POST -H "Authorization: Bearer $MCPGATEWAY_BEARER_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"time_server","description":"Fast time tools","associatedTools":[<ID_OF_TOOLS>]}' \
     http://localhost:4444/servers | jq

# List servers (should now include the UUID of the newly created virtual server)
curl -s -H "Authorization: Bearer $MCPGATEWAY_BEARER_TOKEN" http://localhost:4444/servers | jq

# Client SSE endpoint. Inspect it interactively with the MCP Inspector CLI (or use any MCP client)
npx -y @modelcontextprotocol/inspector
# Transport Type: SSE, URL: http://localhost:4444/servers/UUID_OF_SERVER_1/sse,  Header Name: "Authorization", Bearer Token
```

The MCP Gateway dashboard shows the new server and the tools - see screenshot at the top of this post.

## MCP Gateway Wrapper

In addition to being able to create virtual servers to manage tools from various sources, the gateway comes with a [MCP Gateway Wrapper](https://ibm.github.io/mcp-context-forge/using/mcpgateway-wrapper/).

> mcpgateway.wrapper [...] re-publishes your gateway's tools [...] over stdin and stdout, while connecting securely to the gateway using SSE + JWT. [...] Perfect for clients that can't open SSE streams or attach JWT headers.

As currently done by many MCP clients, you set environment variables and run local MCP servers. In this case tools are not invoked directly, but via the mcp-contextforge-gateway proxy.

```bash
export MCP_AUTH_TOKEN=${MCPGATEWAY_BEARER_TOKEN}
export MCP_SERVER_CATALOG_URLS='http://localhost:4444/servers/UUID_OF_SERVER_1'
pip install mcp-contextforge-gateway
python3 -m mcpgateway.wrapper
```

## MCP Inspector

The [MCP Inspector](https://ibm.github.io/mcp-context-forge/using/clients/mcp-inspector/) is the standard tool to test MCP tools. While the sample MCP tool above can be accessed via 'http://localhost:9000/sse', you can also use the wrapper for STDIO.

```bash
npx @modelcontextprotocol/inspector 
   -e MCP_AUTH_TOKEN=${MCPGATEWAY_BEARER_TOKEN} 
   -e MCP_SERVER_CATALOG_URLS=http://localhost:4444/servers/UUID_OF_SERVER_1 
   -- python3 -m mcpgateway.wrapper
```

![image](/assets/img/2025/07/mcp-gateway-01.png)

## Watsonx Orchestrate

Watsonx Orchestrate could leverage this functionality. As I wrote in the post [Local MCP Tools in watsonx Orchestrate]({{ "/article/orchestrate-mcp/" | relative_url }}) local Python and Node based MCP servers with environment variables are supported.

Note: The following commands should work, but I haven't been able to test it yet.

```bash
orchestrate connections add --app-id "mcpgateway-niklas"
orchestrate connections configure 
  --app-id mcpgateway-niklas 
  --env draft 
  --kind key_value 
  --type team 
  --url "http://mcp-gateway-ip:4444"
orchestrate connections set-credentials 
  --app-id "mcpgateway-niklas" 
  --env draft 
  -e MCP_AUTH_TOKEN=ey... 
  -e MCP_SERVER_CATALOG_URLS=http://mcp-gateway-ip:4444/servers/UUID_OF_SERVER_1

orchestrate toolkits import 
  --kind mcp \
  --name mcpgateway-niklas 
  --description "mcpgateway-niklas" \
  --command "python3 -m mcpgateway.wrapper" \
  --tools "*"  \
  --app-id mcpgateway-niklas
```

## Next Steps

To find out more, check out the following resources:

* [MCP Gateway](https://github.com/ibm/mcp-context-forge), aka ContextForge MCP Gateway
* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Documentation watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)