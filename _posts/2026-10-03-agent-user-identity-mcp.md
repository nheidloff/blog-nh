---
id: nh-193
title: "Passing User Identity safely across Agents and Enterprise Systems"
date: 2026-10-03 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-193'
permalink: /article/agent-user-identity-mcp/
custom_permalink:
    - article/agent-user-identity-mcp/
image: /assets/img/2026/10/agent-user-identity-mcp.jpg
---

*In enterprise applications, AI agents frequently access downstream systems on behalf of users. To maintain proper security and auditing, authentication tokens must be securely exchanged and propagated across multiple architectural components, ranging from the initial client login and custom applications to identity providers, agent runtimes, custom tool implementations, and core enterprise systems.*

IBM watsonx Orchestrate supports multiple OAuth-based approaches to handle identity propagation. In this context, it accommodates two primary standards:

* OAuth Token Exchange
  * [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693)
* OAuth On-Behalf-Of
  * [RFC 7523](https://www.rfc-editor.org/info/rfc7523/)
  * [Microsoft OBO](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow)

RFC 8693 is the modern vendor-neutral IETF standard, called OAuth Token Exchange, which is supported by Keycloak, Okta, Ping Identity and IBM Verify.

Microsoft Entra ID and IBM App ID do not work with RFC 8693. They support RFC 7523 and the Microsoft OBO extensions, called OAuth On-Behalf-Of.

The following sections describe and compare both alternatives. For deeper dives, refer to the related technical posts:

* [OAuth Token Exchange]({{ "/article/agent-user-identity-oauth-token-exchange/" | relative_url }})
* [OAuth On-Behalf-Of]({{ "/article/agent-user-identity-oauth-on-behalf-of/" | relative_url }})
* [Authenticating Types]({{ "/article/watsonx-orchestrate-authentication-types/" | relative_url }})

## Protocol Comparison

![image](/assets/img/2026/10/agent-user-identity-mcp-2.png)

## OAuth Token Exchange

The following diagram describes the main components and authentication flow for token exchange.

![image](/assets/img/2026/10/wxo-oauth-token-exchange.png)

![image](/assets/img/2026/10/agent-user-identity-mcp-3.png)

Examples:
* [Secure AI agents with IBM watsonx Orchestrate, IBM Verify, and HashiCorp Vault](https://developer.ibm.com/tutorials/securing-ai-agents/)
* [Implement secure RBAC for MCP server access using context variables and On‑Behalf‑Of (OBO) flow in watsonx Orchestrate](https://developer.ibm.com/tutorials/secure-rbac-mcp-context-variables-obo-watsonx-orchestrate/)

## OAuth On-Behalf-Of

The following sequence outlines the core components and authentication flow for on-behalf-of scenarios.

![image](/assets/img/2026/10/wxo-oauth-on-behalf-of.png)

![image](/assets/img/2026/10/agent-user-identity-mcp-4.png)

Example:
* [Configuring SSO for Workday by using OAuth On-Behalf-Of flow](https://developer.watson-orchestrate.ibm.com/tutorials/workday_sso_connections/sso-diagram-concepts)

## Next Steps

To find out more, check out the following resources:

* [Connecting Custom Apps to Orchestrate via REST APIs]({{ "/article/orchestrate-surface-rest-api/" | relative_url }})
* [Example Source Code](https://github.com/nheidloff/watsonx-orchestrate-sso-example/)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestration Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base)