---
id: nh-125
title: 'Tools in watsonx Orchestrate via MCP, Python and OpenAPI'
date: 2025-05-06 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-125'
permalink: /article/watsonx-orchestrate-tools/
custom_permalink:
    - article/watsonx-orchestrate-tools/
image: /assets/img/2025/05/watsonx-orchestrate-tools-00.png
---

*The IBM watsonx Orchestrate Agent Development Kit is a set of tools designed to make it easy to build and deploy agents using IBM watsonx Orchestrate. It supports integrating agents and tools built on other frameworks. This post describes the different ways to create tools.*

[IBM watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate) supports several [agentic](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=agents-overview-agent-builder) capabilities.

> An AI agent in IBM watsonx Orchestrate is an autonomous tool that automates tasks, responds to user queries, and processes information based on pre-existing knowledge. A key differentiator of these agents is multi-agent orchestration, where multiple agents collaborate and coordinate to accomplish tasks more efficiently.

There are different ways to build [tools](https://developer.watson-orchestrate.ibm.com/tools/create_tool):

1. MCP Tools
2. Python Tools
3. OpenAPI Tools


## MCP Tools

The [watsonx Orchestrate Developer Edition](https://developer.watson-orchestrate.ibm.com/tools/toolkits) allows integrating MCP servers as tools - see screenshot at the top of this post.

Let's look how to deploy a simple [mcp-server-node](https://github.com/lucianoayres/mcp-server-node) example.

Define the dependencies in package.json:

```json
{
  "type": "module",
  "dependencies": {
    "@coinpaprika/api-nodejs-client": "2.0.0",
    "@modelcontextprotocol/sdk": "1.7.0",
    "zod": "3.24.2"
  },
  "scripts": {
    "build": ""
  }    
}
```

Implement your MCP server in mcp.js:

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { promises as fs } from "fs"

const server = new McpServer({
  name: "MCP Server Boilerplate",
  version: "1.0.0",
})

server.tool("add", "Add two numbers", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}))

const transport = new StdioServerTransport()
await server.connect(transport)
```

Define meta-data in mcp.json:

```json
{
  "mcpServers": {
    "Node.js MCP Server": {
      "command": "node",
      "args": ["mcp-server.js"],
      "env": {
        "API_KEY": "abc-1234567890"
      }
    }
  }
}
```

Use the CLI to import the tools:

```bash
orchestrate toolkits import \
    --kind mcp \
    --name my-mcp-toolkit \
    --description "adds two numbers" \
    --package-root /Users/niklasheidloff/Desktop/orchestrate-adk/mcp-server-node \
    --command "node mcp-server.js --transport stdio" \
    --tools "add"
```

Add the tool to your agent and test it.

![image](/assets/img/2025/05/watsonx-orchestrate-tools-03.png)

Update June 18th: My colleague [Yohan Bensoussan](https://yohanb.blog/2025/06/11/tutorial-langflow-mcp-server-watsonx-orchestrate/) described how to use a MCP proxy to connect to remote MCP servers.

```bash
orchestrate toolkits import \
  --kind mcp \
  --name lf-my-projects-toolkit \
  --description "My Langflow MCP server (hosted, SSE)" \
  --package-root . \
  --command "uvx mcp-proxy --headers x-api-key <your-key> <your-url>" \
  --tools "*"
```

## Python Tools

Alternatively, you can use Python to implement tools.

```python
from ibm_watsonx_orchestrate.agent_builder.tools import tool

@tool
def get_current_date():
    """
    Get the current date.

    :returns: A string containing the current date.
    """ 
    return "06.05.2025"
```

```bash
orchestrate tools import \
  -k python \
  -f "/Users/niklasheidloff/Desktop/orchestrate-adk/python-tool/get_current_date.py" \
  -r "/Users/niklasheidloff/Desktop/orchestrate-adk/python-tool/requirements.txt"
```

Add the imported tool to your agent:

![image](/assets/img/2025/05/watsonx-orchestrate-tools-01.png)

Test the agent:

![image](/assets/img/2025/05/watsonx-orchestrate-tools-02.png)

## OpenAPI Tools

Yet another option is to import tools with HTTP endpoints via OpenAPI, for example [get-healthcare-providers.yml](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/main/examples/agent_builder/healthcare_provider/tools/get-healthcare-providers.yml).

```yml
servers:
 - url: https://find-provider.1sqnxi8zv3dh.us-east.codeengine.appdomain.cloud
paths:
  /:
    get:
      operationId: getHealthCareProviders
      summary: Gets a list of healthcare providers
      description: Gets a list of healthcare providers
      parameters:
        - in: path
          name: location
          schema:
            type: string
          required: false
          description: The city, state or zipcode you want to get healthcare providers
        - in: path
          name: speciality
          schema:
            type: string
            enum: ["General Medicine", "Cardiology", "Pediatrics", "Orthopedics", "ENT", "Multi-specialty"]
          required: false
          description: The speciality of the healthcare provider
      responses:
        '200':
          description: Successfully retrieved list of healthcare providers
          content:
            application/json:
              schema:
                type: object
                properties:
                  providers:
                    type: array
                    items:
                      type: object
                      properties:
                        address:
                            type: string
                        contact:
                            type: object
                            properties:
                                email:
                                    type: string
                                phone:
                                    type: string
                        name:
                            type: string
                        provider_id:
                            type: string
                        provider_type:
                            type: string
                        specialty:
                            type: string
                required:
                  - data
```

Use the CLI to import the tool:

```bash
orchestrate tools import \
  -k openapi \
  -f /Users/niklasheidloff/Desktop/orchestrate-adk/ibm-watson-orchestrate-adk/examples/agent_builder/healthcare_provider/tools/get-healthcare-providers.yml
```

## Next Steps

To learn more, check out the [watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=agents-overview-agent-builder) documentation and the [watsonx Orchestrate Agent Development Kit](https://github.com/IBM/ibm-watsonx-orchestrate-adk) landing page.