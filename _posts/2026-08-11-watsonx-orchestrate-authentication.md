---
id: nh-186
title: "Mastering Authentication in watsonx Orchestrate"
date: 2026-08-09 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-186'
permalink: /article/watsonx-orchestrate-authentication/
custom_permalink:
    - article/watsonx-orchestrate-authentication/
image: /assets/img/2026/08/watsonx-orchestrate-authentication-0.jpg
---

*When deploying agents to AI enterprise platforms like IBM watsonx Orchestrate, user authentication is a primary requirement. Agents must be capable of operating on behalf of users to securely access external systems. This post outlines how to authenticate from Orchestrate agents with IBMid using IBM App ID.*

Supported by IBM Bob, I have developed an [open-source](https://github.com/nheidloff/watsonx-orchestrate-sso-example) example application to demonstrate this implementation. IBMid and IBM App ID can easily be replaced with other OpenID Connect (OIDC) solutions.

Read the following resources for details:

* [Role based Access Control in watsonx Orchestrate]({{ "/article/watsonx-orchestrate-rbac/" | relative_url }})
* [Security Architecture](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/SECURITY_ARCHITECTURE.md)
* [Setup Instructions](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/README.md)

## Components

The reference architecture utilizes several key components:

1. IBMid: The primary identity provider.
2. IBM App ID: Manages authentication across various identity providers or a built-in directory.
3. IBM watsonx Orchestrate: The enterprise agentic platform.
4. React Web Frontend: Integrated with the Orchestrate embedded chat widget.
5. Node.js Backend: Handles server-side authentication processes.

## Flow

The diagram below illustrates the authentication and request flow among the integrated components.

![image](/assets/img/2026/08/watsonx-orchestrate-authentication-1.jpg)

## Tools

Tools can verify user authentication status through two primary methods:

1. Validating that the user possesses a valid JSON Web Token (JWT) signed with the Orchestrate private key.
2. Invoking the App ID /userinfo endpoint to verify user identity and retrieve assigned roles.

The following code snippet demonstrates how tools can check for authentication:

```python
from ibm_watsonx_orchestrate.run.context import AgentRun
@tool()
def get_user_profile(context: AgentRun) -> UserProfile:
    token = context.request_context.get("sso_token", "")

    if not token:
        raise ValueError("No sso_token in context. Please log in via the web app first.")
```

The repository includes a debug utility designed to inspect the runtime context and data passed to tools:

```python
"""
DEBUG ONLY — dumps everything the wxO runtime passes to a tool.

Reports:
  • The full context.request_context dict (shows sso_token, roles, email, etc.)
  • /userinfo HTTP status + raw response (shows what App ID returns)
"""

import json
import requests
from pydantic import BaseModel
from ibm_watsonx_orchestrate.agent_builder.tools import tool
from ibm_watsonx_orchestrate.run.context import AgentRun

APP_ID_USERINFO_URL = (
    "https://eu-de.appid.cloud.ibm.com/oauth/v4/"
    "xxxx/userinfo"
)

class DebugResult(BaseModel):
    # --- what wxO injected into the tool ---
    context_keys: str       # all keys present in request_context
    context_roles: str      # value of context["roles"]  (our main question)
    context_email: str      # value of context["email"]
    has_sso_token: bool     # True if sso_token is present and non-empty
    sso_token_prefix: str   # first 40 chars of sso_token (safe to log)

    # --- what /userinfo returns ---
    userinfo_status: int
    userinfo_roles: str     # value of userinfo["roles"] — or "__KEY_MISSING__"
    userinfo_sub: str

@tool()
def debug_userinfo(context: AgentRun) -> DebugResult:
    """
    DEBUG ONLY: dump the full wxO tool context and the raw App ID /userinfo
    response so we can see exactly what reaches the tool at runtime.

    Args:
        context (AgentRun): Injected agent-run context.

    Returns:
        DebugResult: Full context dump and /userinfo response.
    """
    rc = context.request_context  # the dict wxO injects

    sso_token = rc.get("sso_token", "")
    roles      = rc.get("roles", "__KEY_MISSING__")

    # Safely log a prefix of the token (never log the full token)
    token_prefix = sso_token[:40] + "..." if sso_token else "(empty)"

    # Call /userinfo with the sso_token
    userinfo_status = 0
    userinfo_data: dict = {}
    if sso_token:
        try:
            resp = requests.get(
                APP_ID_USERINFO_URL,
                headers={"Authorization": f"Bearer {sso_token}", "Accept": "application/json"},
                timeout=10,
            )
            userinfo_status = resp.status_code
            userinfo_data = resp.json() if resp.ok else {"error": resp.text[:200]}
        except Exception as e:
            userinfo_data = {"error": str(e)}

    return DebugResult(
        # --- context ---
        context_keys    = json.dumps(sorted(rc.keys())),
        context_roles   = json.dumps(roles),
        context_email   = rc.get("email", "(missing)"),
        has_sso_token   = bool(sso_token),
        sso_token_prefix= token_prefix,

        # --- /userinfo ---
        userinfo_status = userinfo_status,
        userinfo_roles  = json.dumps(userinfo_data.get("roles", "__KEY_MISSING__")),
        userinfo_sub    = userinfo_data.get("sub", "(missing)"),
    )
```

Example out of the debug tool:

```json
{
  "context_email": "xxx@ibm.com",
  "context_keys": "[\"email\", \"roles\", \"sso_token\"]",
  "context_roles": "[\"trip_booker\"]",
  "has_sso_token": true,
  "sso_token_prefix": "eyJhb...",
  "userinfo_roles": "\"__KEY_MISSING__\"",
  "userinfo_status": 200,
  "userinfo_sub": "xxxc"
}
```

[createJWT.js](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/webchat/server/routes/createJWT.js) generates the token in the Node.js backend.

```javascript
function createJWTString(sessionUser, accessToken, roles) {
  // Always authenticated at this point — the route handler already rejected
  // unauthenticated requests with 401 before calling this function.
  const jwtContent = {
    sub: sessionUser.sub,
    user_payload: encryptUserPayload({
      name:           sessionUser.name,
      custom_user_id: sessionUser.sub,
    }),
    context: {
      clientID:  'trip-booking-app',
      email:     sessionUser.email,
      sso_token: accessToken,   // App ID access token — read by get_user_profile via AgentRun
      roles:     roles,         // flat string array e.g. ["trip_booker"] — read by check_booking_permission
    },
  };
```

## Setup

Setting up authentication is often a little bit more challenging since several keys and links have to be defined. Below is a quick overview of the key configuration files.

* [watsonx Orchestrate](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/README.md#7--create-trip_bookingenv)
* [watsonx Orchestrate and Node.js](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/README.md#4--generate-your-rsa-key-pair)
* [React](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/webchat/client/.env.example)
* [Node.js](https://github.com/nheidloff/watsonx-orchestrate-sso-example/blob/main/README.md#6--create-webchatserverenv)

In this implementation, App ID is configured with two distinct identity providers:

1. IBMid, where the primary user possesses the required operational role.
2. A test user in the built-in cloud directory who lacks the necessary permissions, serving as a negative test case.

![image](/assets/img/2026/08/watsonx-orchestrate-authentication-2.jpg)

## Next Steps

To find out more, check out the following resources:

* [Role based Access Control in watsonx Orchestrate]({{ "/article/watsonx-orchestrate-rbac/" | relative_url }})
* [MCP Tools acting On‑Behalf‑Of Users in Orchestrate Agents]({{ "/article/mcp-watsonx-orchestrate-oauth-on-behalf-of/" | relative_url }})
* [Running agentic Tools on behalf of Users in watsonx]({{ "/article/agentic-tools-oauth-personal-watsonx-orchestrate/" | relative_url }})
* [Tutorial: IBM watsonx Orchestrate and HashiCorp Vault](https://developer.ibm.com/tutorials/securing-ai-agents/)
* [Context Variables](https://developer.watson-orchestrate.ibm.com/webchat/context_variables)
* [Watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestration Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base)