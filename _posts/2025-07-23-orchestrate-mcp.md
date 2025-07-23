---
id: nh-138
title: 'Local MCP Tools in watsonx Orchestrate'
date: 2025-07-23 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-138'
permalink: /article/orchestrate-mcp/
custom_permalink:
    - article/orchestrate-mcp/
image: /assets/img/2025/07/orchestrate-mcp-00.png
---

*The Model Context Protocol (MCP) has quickly become the standard how tools can be invoked from agents. This post contains a simple example how to invoke GitHub tools including authentication from watsonx Orchestrate, which is IBM's platform to build and run agents.* 

Agents need to be able to access data and invoke operations on behalf of users. Recently [OAuth](https://modelcontextprotocol.io/specification/draft/basic/authorization#standards-compliance) has been added to the MCP specification. First remote MCP servers leverage this capability for authentication and authorization, for example [github-mcp-server](https://github.com/github/github-mcp-server).

Earlier MCP servers run locally and leverage environment variables, for example tokens, to authenticate and authorize users. Below is an example demonstrating how to create a local MCP server in watsonx Orchestrate that accesses GitHub via a personal access token.

## Scenario

Let's look at a simple scenario - see screenshot at the top of this post.

* User: Which of my repos have 'demo' in the name? List them in a table. My GitHub account is 'nheidloff'.
* Agent: Here are the GitHub repositories with 'demo' in the name, listed in a table ...
* User: Which issues have been created in my repos this week?
* Agent: Here are the issues created in your repositories this week ...

## Credential Vault

Watsonx Orchestrate comes with a [built-in credential vault](https://developer.watson-orchestrate.ibm.com/connections/overview). There are two types of credentials:

1. Team credentials are shared between all agent users and provided at build-time.
2. Member credentials are individual credentials provided by users at run-time.

> A connection represents a dependency on an external service. [...] Each connection can be thought of in terms of its 3 (4 for SSO Oauth flows) constituent parts. The first is the connection itself. It is essentially a wrapper that is used to contain the other components and assign a common identifier that can be passed to tools, agents or other entities that require connections. The second is the configuration. Each connection can have different configurations depending on environment (draft/live). The configuration outlines shared details on the connections such as its kind (basic, bearer, key_value, etc.) and its type (whether the connections are shared among the team or per member). The third is the connections. These will be the values used to authorize against the external service. For example if in the configuration you selected is of kind basic, this would be where you pass in the username and password. The fourth is the identity provider (IDP) connections. These are only needed for OAuth with SSO. These are used when your external service makes use of a third party OAuth identity provider such as Microsoft or Google to generate auth tokens.

The connections with credentials can be defined via CLI, API or UI:

![image](/assets/img/2025/07/orchestrate-mcp-01.png)

## Setup

The following commands show how to add tools from GitHub. For authentication a [personal access token](https://github.com/settings/personal-access-tokens/new) is used for demonstration purposes. Obviously in production you don't want to share your personal token with anyone else.

```bash
orchestrate connections add --app-id "github-niklas"
orchestrate connections configure --app-id github-niklas --env draft --kind key_value --type team --url "https://github.com"
orchestrate connections set-credentials --app-id "github-niklas" --env draft -e GITHUB_PERSONAL_ACCESS_TOKEN=YOUR_TOKEN

orchestrate toolkits import --kind mcp \
--name github-niklas --description "Deals with Github" \
--command "npx -y @modelcontextprotocol/server-github" \
--tools "*"  \
--package-root mcp/github --app-id github-niklas
```

After the tools have been imported you can choose them in the Orchestrate user interface.

![image](/assets/img/2025/07/orchestrate-mcp-02.png)

## Next Steps

To find out more, check out the following resources:

* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Documentation watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)