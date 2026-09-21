---
id: nh-191
title: "Authenticating Enterprise Agents in watsonx Orchestrate"
date: 2026-09-21 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-191'
permalink: /article/watsonx-orchestrate-authentication-types/
custom_permalink:
    - article/watsonx-orchestrate-authentication-types/
image: /assets/img/2026/09/watsonx-orchestrate-authentication-types.jpg
---

*In agentic enterprise systems, agents and tools require secure access to downstream resources on behalf of users. IBM watsonx Orchestrate supports multiple authentication mechanisms, each tailored to specific operational scenarios.*

Agents and tools running within watsonx Orchestrate can execute on behalf of users or utilize shared team credentials. They may operate synchronously or asynchronously, be triggered interactively or on a scheduled basis, and be accessed across various interfaces, such as REST APIs and the Embedded Web Chat widget.

Depending on these operational dimensions, specific authentication types are preferred for given scenarios. This post provides a comprehensive overview of the available options.

## Summary

Agents deliver significant value when executing tools on behalf of end users. Within watsonx Orchestrate, there are two primary options for running remote Model Context Protocol (MCP) servers and tools, depending on the Identity Provider (IdP) in use. Both methods exchange a user's existing corporate Single Sign-On (SSO) session for a downstream token without requiring a secondary login:

1. 'oauth_auth_token_exchange_flow' (RFC 8693)
2. 'oauth_auth_on_behalf_of_flow' (RFC 7523 + OBO)

Alternatively, Python tools can run directly within Orchestrate, leveraging the same SSO token to execute code on behalf of users. Ensure the IdP token is passed as a context variable.

When agents need to access systems on behalf of the organization rather than an individual user, the preferred and most secure option is 'oauth_auth_client_credentials_flow'.

Users interacting with the native Orchestrate UI can also leverage the standard OAuth flow ('oauth_auth_code_flow').

## oauth_auth_token_exchange_flow

* Supported IdPs: IBM Verify, Okta, Ping Identity, Keycloak, and others supporting RFC 8693 (OAuth 2.0 Token Exchange).
* Use Case: Choose this option when users access agents through the Embedded Web Chat widget, and you must call an enterprise system acting as the authenticated employee.
* Scope: Supported exclusively for the Embedded Web Chat widget (not applicable to the native UI or standard REST APIs).
* Examples:
  * [Secure AI agents with IBM watsonx Orchestrate, IBM Verify, and HashiCorp Vault](https://developer.ibm.com/tutorials/securing-ai-agents/)
  * [Implement secure RBAC for MCP server access using context variables and On‑Behalf‑Of (OBO) flow in watsonx Orchestrate](https://developer.ibm.com/tutorials/secure-rbac-mcp-context-variables-obo-watsonx-orchestrate/)

## oauth_auth_on_behalf_of_flow

* Supported IdPs: Microsoft Entra ID, IBM App ID, and others supporting RFC 7523 (JWT Profile) with OBO extensions.
* Use Case: Ideal when users reach agents via the Embedded Web Chat widget, requiring calls to downstream enterprise systems on behalf of the specific employee.
* Scope: Supported exclusively for the Embedded Web Chat widget.
* Reference:
  * [https://developer.watson-orchestrate.ibm.com/tutorials/workday_sso_connections/sso-diagram-concepts](https://developer.watson-orchestrate.ibm.com/tutorials/workday_sso_connections/sso-diagram-concepts)

## oauth_auth_client_credentials_flow

* Use Case: The standard approach for machine-to-machine (M2M) communication where Orchestrate authenticates as an application without user intervention. Use this when the agent calls downstream systems on behalf of the organization (e.g., backend integrations, data pipelines, the AI Gateway, and scheduled agents).
* Benefits: Preferred over basic or bearer authentication because tokens are short-lived and automatically refreshed. The sole long-term secret is the client secret, which is securely retained by Orchestrate and never transmitted downstream.

## oauth_auth_code_flow

* Use Case: A secure alternative restricted entirely to the native Orchestrate UI. It is incompatible with REST APIs or Embedded Web Chat because those channels lack the browser context required to complete the redirect.
* Mechanism: Utilizes standard OAuth 2.0 authorization codes. The user provides consent at the IdP, after which Orchestrate exchanges the code for a short-lived, auto-refreshing token.

## key_value

* Use Case: Used when a tool requires multiple parameters that do not fit standard authentication schemes, such as injecting environment variables into a local MCP server, configuring the AI Gateway, or working around custom API-key header naming conventions.
* Mechanism: A secure dictionary is injected at runtime. This functions as an encrypted configuration store rather than an authentication protocol.

## api_key

* Use Case: Suited for modern SaaS APIs that accept a single key, typically passed via a custom HTTP header.
* Benefits: Superior to basic or bearer tokens as they are engineered for rotation and granular scoping. Many providers issue read-only or rate-limited keys.

## basic

* Use Case: Restricted to legacy internal REST APIs, self-hosted services, or on-premises middleware that exclusively support HTTP Basic authentication and cannot be migrated.
* Security Note: Avoid this option whenever a modern alternative exists. Basic credentials do not expire automatically, and unrotated service passwords across multiple connections introduce significant attack surface.

## bearer

* Use Case: Applicable only when a service issues long-lived service tokens or Personal Access Tokens (PATs), and organizational security policy explicitly permits them.
* Security Note: Carries inherent risk due to the absence of built-in token expiration. If leaked, the token remains valid until explicitly revoked. If policy mandates a 90-day rotation, manual intervention is required to update the credential.

## oauth_auth_password_flow

* Use Case: A mechanism of last resort. Credentials are sent to Orchestrate, which exchanges them for a token.
* Security Note: This flow violates core OAuth principles by allowing the application to handle user passwords. It has been deprecated in OAuth 2.1 and is frequently flagged during security audits. Use only when a service exposes solely a token endpoint and client credentials are unviable due to strict user identity requirements.

## Next Steps

To find out more, check out the following resources:

* [Connecting Custom Apps to Orchestrate via REST APIs]({{ "/article/orchestrate-surface-rest-api/" | relative_url }})
* [Example Source Code](https://github.com/nheidloff/watsonx-orchestrate-sso-example/)
* [Role-based Access Control in watsonx Orchestrate]({{ "/article/watsonx-orchestrate-rbac/" | relative_url }})
* [Mastering Authentication in watsonx Orchestrate]({{ "/article/watsonx-orchestrate-authentication/" | relative_url }})
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestration Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base)
* [Watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)