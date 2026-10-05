---
id: nh-194
title: "OAuth Token Exchange for Orchestrate Agents, Tools, and MCP Servers"
date: 2026-10-04 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-194'
permalink: /article/agent-user-identity-oauth-token-exchange/
custom_permalink:
    - article/agent-user-identity-oauth-token-exchange/
image: /assets/img/2026/10/agent-user-identity-oauth-token-exchange.jpg
---

*In enterprise applications, AI agents frequently access downstream systems on behalf of users. IBM watsonx Orchestrate supports OAuth Token Exchange to propagate the user’s identity from initial login through to downstream enterprise systems.*

OAuth Token Exchange is defined in [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693), which is supported by identity providers such as Keycloak, Okta, Ping Identity, and IBM Verify. The example below demonstrates implementation using IBM Verify.

Related resources:

* [User Identity in watsonx Orchestrate]({{ "/article/agent-user-identity-mcp/" | relative_url }})
* [OAuth On-Behalf-Of]({{ "/article/agent-user-identity-oauth-on-behalf-of/" | relative_url }})
* [Authenticating Types]({{ "/article/watsonx-orchestrate-authentication-types/" | relative_url }})

## Python

In watsonx Orchestrate tools can be implemented in Python running in the Orchestrate runtime or as MCP servers and tools running remotely.

*Tool Context:*

The following context is available in Python tools. The 'context_sub' variable holds the user ID, 'exchange_token' is the token that had been exchanged by the Orchestrate runtime which can be used to authenticate requests against third-party systems.

```json
{
  "client_id": "trip-booking",
  "context_email": "user@email.com",
  "context_keys": "[\"clientID\", \"email\", \"roles\", \"sub\", \"user_id\", \"wxo_run_id\", \"wxo_tenant_id\", \"wxo_thread_id\", \"wxo_user_name\"]",
  "context_roles": "[\"admin\", \"trip_booker\"]",
  "context_sub": "yyyyyyyyyy",
  "context_user_id": "yyyyyyyyyy",
  "has_sso_token": false,
  "has_token_exchange_token": true,
  "sso_token_redacted": "(empty)",
  "token_exchange_jwt": "{\"app_id\": \"dddddddddddddddddd\", \"aud\": [\"gggggggg-gggg-gggg-gggg-gggggggggggg\", \"api://default\", \"https://bbbbbbbbbbb.verify.ibm.com/oauth2/token\"], \"client_id\": \"gggggggg-gggg-gggg-gggg-gggggggggggg\", \"exp\": 1790781321, \"grant_id\": \"...\", \"grant_type\": \"urn:ietf:params:oauth:grant-type:token-exchange\", \"groups\": [\"admin\", \"trip_booker\"], \"iat\": 1790777720, \"iss\": \"https://bbbbbbbbbbb.verify.ibm.com/oauth2\", \"jti\": \"...\", \"nbf\": 1790777720, \"preferred_username\": \"user@email.com\", \"realmName\": \"www.ibm.com\", \"scope\": \"email profile\", \"sub\": \"yyyyyyyyyy\", \"txn\": \"...\", \"uniqueSecurityName\": \"yyyyyyyyyy\"}",
  "token_exchange_token_redacted": "...",
  "wxo_run_id": "...",
  "wxo_tenant_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa",
  "wxo_thread_id": "...",
  "wxo_user_name": "wxochatyyyyyyyyyy@example.com"
}
```

*Code:*

The following section contains the code of a debug Python tool. Here is the TL;DR:

```python
from ibm_watsonx_orchestrate.run import connections
token_exchange_token_connection.connections.oauth2_token_exchange(APP_ID)
token_exchange_token = token_exchange_token_connection.access_token
```

```python
@tool(
    expected_credentials=[
        {"app_id": APP_ID, "type": ConnectionType.OAUTH2_TOKEN_EXCHANGE}
    ]
)
def get_user_profile_token_exchange(context: AgentRun) -> DebugResult:
    """
    DEBUG ONLY: dump every context variable the wxO runtime injects into a tool.

    Args:
        context (AgentRun): Injected agent-run context.

    Returns:
        DebugResult: Full context dump
    """
    rc = context.request_context

    sso_token = rc.get("sso_token", "")
    roles     = rc.get("roles", [])
    if sso_token:
        token_redacted = sso_token[:8] + "..." + sso_token[-4:]
    else:
        token_redacted = "(empty)"
    
    token_exchange_token_red = "(empty)"
    te_token = ""
    token_exchange_jwt_payload = "(not fetched)"
    try:
        if connections:
            token_exchange_token_connection = connections.oauth2_token_exchange(APP_ID)
            if token_exchange_token_connection:
                te_token = token_exchange_token_connection.access_token
                if te_token:
                    token_exchange_token_red = te_token[:8] + "..." + te_token[-4:]
                    token_exchange_jwt_payload = json.dumps(jwt.decode(te_token, options={"verify_signature": False}))
    except Exception as e:
        token_exchange_token_red = f"(error: {e})"
    
    return DebugResult(
        wxo_run_id      = rc.get("wxo_run_id",    "(missing)"),
        wxo_tenant_id   = rc.get("wxo_tenant_id", "(missing)"),
        wxo_thread_id   = rc.get("wxo_thread_id", "(missing)"),
        wxo_user_name   = rc.get("wxo_user_name", "(missing)"),
        context_email   = rc.get("email",         "(missing)"),
        context_roles   = json.dumps(roles),
        context_sub     = rc.get("sub",           "(missing)"),
        context_user_id = rc.get("user_id",       "(missing)"),
        has_sso_token      = bool(sso_token),
        sso_token_redacted = token_redacted,
        has_token_exchange_token      = bool(te_token),
        token_exchange_token_redacted = token_exchange_token_red,
        token_exchange_jwt = token_exchange_jwt_payload,
        client_id       = rc.get("clientID",      "(missing)"),
        context_keys    = json.dumps(sorted(rc.keys())),
    )
```

## MCP

In MCP tools, the token is retrieved differently.

*Tool Context:*

The following context is returned by a debug MCP tool, containing the 'token_exchange_token' and the user's 'sub' for the target system.

```json
{
  "sub": "yyyyyyyyyy",
  "email": "user@email.com",
  "roles": ["admin", "trip_booker"],
  "has_token_exchange_token": true,
  "token_exchange_token_redacted": "...",
  "token_exchange_jwt": {
    "app_id": "dddddddddddddddddd",
    "aud": [
      "gggggggg-gggg-gggg-gggg-gggggggggggg",
      "api://default",
      "https://bbbbbbbbbbb.verify.ibm.com/oauth2/token"
    ],
    "client_id": "gggggggg-gggg-gggg-gggg-gggggggggggg",
    "exp": 1790781916,
    "grant_id": "tttttttt-tttt-tttt-tttt-tttttttttttt",
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "groups": ["admin", "trip_booker"],
    "iat": ...,
    "iss": "https://bbbbbbbbbbb.verify.ibm.com/oauth2",
    "jti": "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz.zzzzzzzzzzzzzzzzzzzz",
    "nbf": ...,
    "preferred_username": "user@email.com",
    "realmName": "www.ibm.com",
    "scope": "email profile",
    "sub": "yyyyyyyyyy",
    "txn": "...",
    "uniqueSecurityName": "yyyyyyyyyy"
  },
  "token_claim_keys": [
    "app_id", "aud", "client_id", "exp", "grant_id", "grant_type",
    "groups", "iat", "iss", "jti", "nbf", "preferred_username",
    "realmName", "scope", "sub", "txn", "uniqueSecurityName"
  ],
  "raw_claims": {
    "app_id": "dddddddddddddddddd",
    "aud": [
      "gggggggg-gggg-gggg-gggg-gggggggggggg",
      "api://default",
      "https://bbbbbbbbbbb.verify.ibm.com/oauth2/token"
    ],
    "client_id": "gggggggg-gggg-gggg-gggg-gggggggggggg",
    "grant_id": "tttttttt-tttt-tttt-tttt-tttttttttttt",
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "groups": ["admin", "trip_booker"],
    "iss": "https://bbbbbbbbbbb.verify.ibm.com/oauth2",
    "jti": "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz.zzzzzzzzzzzzzzzzzzzz",
    "nbf": ...,
    "preferred_username": "user@email.com",
    "realmName": "www.ibm.com",
    "scope": "email profile",
    "sub": "yyyyyyyyyy",
    "txn": "...",
    "uniqueSecurityName": "yyyyyyyyyy"
  },
  "wxo_run_id": "(not available in MCP)",
  "wxo_tenant_id": "(not available in MCP)",
  "wxo_thread_id": "(not available in MCP)",
  "wxo_user_name": "(not available in MCP)",
  "context_user_id": "(not available in MCP)",
  "client_id": "(not available in MCP)"
}
```

*Code:*

Below is the Python implementation of the MCP tool. In summary, the exchange token is read directly from the bearer token in the request header.

```python
auth = _get_auth_header(ctx)
token_exchange_token = auth[7:]
```

```python
def _verify_bearer(auth: str) -> dict:
    if not auth.startswith("Bearer "):
        [...]
    raw_token = auth[7:]
    jwks_uri = config.jwks_uri or os.environ.get("JWKS_URI")
    if not jwks_uri:
        [...]

    try:
        client = _fetch_jwks()
        options = {"verify_exp": True, "verify_aud": bool(config.jwt_audience)}
        decode_kwargs = dict(
            algorithms=["RS256"],
            issuer=config.jwt_issuer or None,
            audience=config.jwt_audience or None,
            options=options,
        )

        try:
            signing_key = client.get_signing_key_from_jwt(raw_token)
            signing_keys = [signing_key]
        except Exception:
            signing_keys = client.get_jwk_set().keys
        last_exc: Exception = Exception("No JWKS keys available")
        for sk in signing_keys:
            try:
                claims = pyjwt.decode(raw_token, sk.key, **decode_kwargs)
                return claims
            except (pyjwt.InvalidSignatureError, pyjwt.DecodeError) as exc:
                last_exc = exc
                continue
        [...]

@mcp.tool(structured_output=False)
async def get_user_profile_mcp_8693(ctx: Context) -> str:
    """Return the authenticated user's full identity from their IBM Verify JWT.
    Uses IBM Verify token-exchange (oauth_auth_token_exchange_flow); JWT is
    verified against JWKS."""

    NOT_AVAILABLE = "(not available in MCP)"
    auth = _get_auth_header(ctx)
    try:
        claims = _verify_bearer(auth)
    except PermissionError as exc:
        return str(exc)

    sub   = claims.get("sub", "(missing)")
    email = claims.get("email", claims.get("preferred_username", "(missing)"))
    group_ids: list = claims.get("groupIds", [])
    roles = [g.get("displayName", "") for g in group_ids if isinstance(g, dict)]
    roles += [g for g in claims.get("groups", []) if isinstance(g, str)]
    roles += [r for r in claims.get("roles", []) if isinstance(r, str) and r not in roles]

    te_token = auth[7:] if auth.startswith("Bearer ") else ""
    if te_token:
        token_exchange_token_redacted = te_token[:8] + "..." + te_token[-4:]
        try:
            token_exchange_jwt = json.dumps(
                pyjwt.decode(te_token, options={"verify_signature": False})
            )
        except Exception as exc:
            token_exchange_jwt = f"(decode error: {exc})"
    else:
        token_exchange_token_redacted = "(empty)"
        token_exchange_jwt = "(not fetched)"

    raw_claims = {k: v for k, v in claims.items() if k not in ("exp", "iat")}
    token_claim_keys = sorted(claims.keys())

    return json.dumps({
        "sub":   sub,
        "email": email,
        "roles": roles,
        "has_token_exchange_token":      bool(te_token),
        "token_exchange_token_redacted": token_exchange_token_redacted,
        "token_exchange_jwt":            token_exchange_jwt,
        "token_claim_keys":   token_claim_keys,
        "raw_claims":         raw_claims,
        "wxo_run_id":      NOT_AVAILABLE,
        "wxo_tenant_id":   NOT_AVAILABLE,
        "wxo_thread_id":   NOT_AVAILABLE,
        "wxo_user_name":   NOT_AVAILABLE,
        "context_user_id": NOT_AVAILABLE,
        "client_id":       NOT_AVAILABLE,
    })
```

## Setup

For comprehensive deployment steps, refer to the following guides:

* [Secure AI agents with IBM watsonx Orchestrate, IBM Verify, and HashiCorp Vault](https://developer.ibm.com/tutorials/securing-ai-agents/)
* [Implement secure RBAC for MCP server access using context variables and On‑Behalf‑Of (OBO) flow in watsonx Orchestrate](https://developer.ibm.com/tutorials/secure-rbac-mcp-context-variables-obo-watsonx-orchestrate/)

*Connection:*

Below is a sample connection configuration post-creation. 

Note: You cannot import this connection directly during initial setup because no authenticated user exists at the time of import. Refer to the official documentation on how to import team connections first and subsequently convert them to member connections.

```yaml
spec_version: v1
kind: connection
app_id: verify_token_exchange
environments:
  draft:
    # Final state — overrides the bearer bootstrap from first step
    kind: oauth_auth_token_exchange_flow
    type: member
    sso: true
    server_url: "__VERIFY_SERVER_URL__"
    app_config:
      header:
        content-type: application/x-www-form-urlencoded
  live:
    kind: oauth_auth_token_exchange_flow
    type: member
    sso: true
    server_url: "__VERIFY_SERVER_URL__"
    app_config:
      header:
        content-type: application/x-www-form-urlencoded
```

## Next Steps

To find out more, check out the following resources:

* [Connecting Custom Apps to Orchestrate via REST APIs]({{ "/article/orchestrate-surface-rest-api/" | relative_url }})
* [Example Source Code](https://github.com/nheidloff/watsonx-orchestrate-sso-example/)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestration Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base)