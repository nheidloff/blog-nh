---
id: nh-195
title: "Delegated Trust for Enterprise Agents via OAuth On-Behalf-Of"
date: 2026-10-05 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-195'
permalink: /article/agent-user-identity-oauth-on-behalf-of/
custom_permalink:
    - article/agent-user-identity-oauth-on-behalf-of/
image: /assets/img/2026/10/agent-user-identity-oauth-on-behalf-of.jpg
---

*In enterprise applications, AI agents frequently access downstream systems on behalf of users. IBM watsonx Orchestrate supports OAuth On-Behalf-Of to propagate the user’s identity from initial login through to downstream enterprise systems.*

OAuth On-Behalf-Of is defined in [RFC 7523](https://www.rfc-editor.org/info/rfc7523/) and [Microsoft OBO](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow) which is supported by Microsoft Entra ID and IBM App ID. The example below demonstrates implementation using IBM App ID.

Related resources:

* [User Identity in watsonx Orchestrate]({{ "/article/agent-user-identity-mcp/" | relative_url }})
* [OAuth Token Exchange]({{ "/article/agent-user-identity-oauth-token-exchange/" | relative_url }})
* [Authenticating Types]({{ "/article/watsonx-orchestrate-authentication-types/" | relative_url }})

## Python

In watsonx Orchestrate tools can be implemented in Python running in the Orchestrate runtime or as MCP servers and tools running remotely.

*Tool Context:*

The following context is available in Python tools. The 'context_sub' variable holds the user ID, 'obo_token' is the token that had been exchanged by the Orchestrate runtime which can be used to authenticate requests against third-party systems.

```json
{
  "client_id": "trip-booking-app",
  "context_email": "user@email.com",
  "context_keys": "[\"clientID\", \"email\", \"roles\", \"sso_token\", \"sub\", \"user_id\", \"wxo_run_id\", \"wxo_tenant_id\", \"wxo_thread_id\", \"wxo_user_name\"]",
  "context_roles": "[\"trip_booker\"]",
  "context_sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "context_user_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "has_obo_token": true,
  "has_sso_token": true,
  "obo_jwt": "{\"iss\": \"https://mock-enterprise-step2.dddddddddddd.eu-de.codeengine.appdomain.cloud\", \"sub\": \"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\", \"email\": \"mock_user@example.com\", \"roles\": [\"trip_booker\"], \"aud\": \"https://mock-enterprise-step2.dddddddddddd.eu-de.codeengine.appdomain.cloud\", \"iat\": 1790779080, \"exp\": 1790782680, \"jti\": \"...\", \"step\": \"delegated\", \"scope\": \"enterprise:read\", \"enterprise_app\": \"mock\"}",
  "obo_token_redacted": "...",
  "sso_token_redacted": "...",
  "wxo_run_id": "...",
  "wxo_tenant_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa",
  "wxo_thread_id": "...",
  "wxo_user_name": "wxochatxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@example.com"
}
```

*Code:*

The following section contains the code of a debug Python tool. Here is the TL;DR:

```python
from ibm_watsonx_orchestrate.run import connections
obo_creds = connections.oauth2_on_behalf_of(APP_ID)
obo_token = obo_creds.access_token
```

```python
@tool(
    expected_credentials=[
        {"app_id": APP_ID, "type": ConnectionType.OAUTH_ON_BEHALF_OF_FLOW}
    ]
)
def get_user_profile_on_behalf_of(context: AgentRun) -> DebugResult:
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
    token_redacted = (sso_token[:8] + "..." + sso_token[-4:]) if sso_token else "(empty)"

    obo_creds = connections.oauth2_on_behalf_of(APP_ID)
    obo_token = obo_creds.access_token or "" if obo_creds else ""
    obo_token_red = (obo_token[:8] + "..." + obo_token[-4:]) if obo_token else "(empty)"
    obo_jwt_payload = json.dumps(jwt.decode(obo_token, options={"verify_signature": False})) if obo_token else "(empty)"

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
        has_obo_token      = bool(obo_token),
        obo_token_redacted = obo_token_red,
        obo_jwt            = obo_jwt_payload,
        client_id       = rc.get("clientID",      "(missing)"),
        context_keys    = json.dumps(sorted(rc.keys())),
    )
```

## MCP

In MCP tools, the token is retrieved differently.

*Tool Context:*

The following context is returned by a debug MCP tool, containing the 'obo_token' and the user's 'sub' for the target system.

```json
{
  "sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "mock_user@example.com",
  "roles": ["trip_booker"],
  "has_obo_token": true,
  "obo_token_redacted": "...",
  "obo_token_jwt": {
    "iss": "https://mock-enterprise-step2.dddddddddddd.eu-de.codeengine.appdomain.cloud",
    "sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "mock_user@example.com",
    "roles": ["trip_booker"],
    "aud": "https://mock-enterprise-step2.dddddddddddd.eu-de.codeengine.appdomain.cloud",
    "iat": 1790779402,
    "exp": 1790783002,
    "jti": "jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj",
    "step": "delegated",
    "scope": "enterprise:read",
    "enterprise_app": "mock"
  },
  "token_claim_keys": [
    "aud", "email", "enterprise_app", "exp",
    "iat", "iss", "jti", "roles", "scope", "step", "sub"
  ],
  "raw_claims": {
    "iss": "https://mock-enterprise-step2.dddddddddddd.eu-de.codeengine.appdomain.cloud",
    "sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "mock_user@example.com",
    "roles": ["trip_booker"],
    "aud": "https://mock-enterprise-step2.dddddddddddd.eu-de.codeengine.appdomain.cloud",
    "jti": "jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj",
    "step": "delegated",
    "scope": "enterprise:read",
    "enterprise_app": "mock"
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

Below is the Python implementation of the MCP tool. In summary, the on-behalf-of token is read directly from the bearer token in the request header.

```python
auth = _get_auth_header(ctx)
obo_token = auth[7:]
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
async def get_user_profile_mcp_7523_obo(ctx: Context) -> str:
    """Return the authenticated user's full identity from their App ID OBO JWT.
    Uses App ID OBO tokens (oauth_auth_on_behalf_of_flow).
    Returns identity fields extracted from the decoded token."""
    
    NOT_AVAILABLE = "(not available in MCP)"
    auth = _get_auth_header(ctx)
    try:
        claims = _verify_bearer_obo(auth)
    except PermissionError as exc:
        return str(exc)

    sub   = claims.get("sub", "(missing)")
    email = claims.get("email", claims.get("preferred_username", "(missing)"))
    roles: list = [r for r in claims.get("roles", []) if isinstance(r, str)]
    group_ids: list = claims.get("groupIds", [])
    roles += [g.get("displayName", "") for g in group_ids if isinstance(g, dict)]
    roles += [g for g in claims.get("groups", []) if isinstance(g, str)]

    obo_token = auth[7:] if auth.startswith("Bearer ") else ""
    if obo_token:
        obo_token_redacted = obo_token[:8] + "..." + obo_token[-4:]
        try:
            obo_token_jwt = json.dumps(
                pyjwt.decode(obo_token, options={"verify_signature": False})
            )
        except Exception as exc:
            obo_token_jwt = f"(decode error: {exc})"
    else:
        obo_token_redacted = "(empty)"
        obo_token_jwt = "(not fetched)"

    raw_claims = {k: v for k, v in claims.items() if k not in ("exp", "iat")}
    token_claim_keys = sorted(claims.keys())

    return json.dumps({
        "sub":   sub,
        "email": email,
        "roles": roles,
        "has_obo_token":      bool(obo_token),
        "obo_token_redacted": obo_token_redacted,
        "obo_token_jwt":      obo_token_jwt,
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

Refer to the [tutorial](https://developer.watson-orchestrate.ibm.com/tutorials/workday_sso_connections/sso-diagram-concepts) for setup instructions.

*Connection:*

Below is a sample connection configuration post-creation. 

Note: You cannot import this connection directly during initial setup because no authenticated user exists at the time of import. Refer to the official documentation on how to import team connections first and subsequently convert them to member connections.

```yaml
spec_version: v1
kind: connection
app_id: appid_appid
environments:
  draft:
    # Final state — overrides the key_value bootstrap from first step
    kind: oauth_auth_on_behalf_of_flow
    type: member
    sso: true
    server_url: "__OIDC_ISSUER_URL__"
    idp_config:
      header:
        content-type: application/x-www-form-urlencoded
      body:
        requested_token_use: on_behalf_of
        requested_token_type: urn:ietf:params:oauth:token-type:access_token
    app_config:
      header:
        content-type: application/x-www-form-urlencoded
  live:
    kind: oauth_auth_on_behalf_of_flow
    type: member
    sso: true
    server_url: "__OIDC_ISSUER_URL__"
    idp_config:
      header:
        content-type: application/x-www-form-urlencoded
      body:
        requested_token_use: on_behalf_of
        requested_token_type: urn:ietf:params:oauth:token-type:access_token
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