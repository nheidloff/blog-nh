---
id: nh-196
title: "Invoking A2A Agents On Behalf Of Users from Orchestrate"
date: 2026-10-10 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-196'
permalink: /article/watsonx-orchestrate-a2a-security/
custom_permalink:
    - article/watsonx-orchestrate-a2a-security/
image: /assets/img/2026/10/a2a-traces-00.jpg
---

*IBM watsonx Orchestrate can run and manage native agents while also integrating external agents via protocols like A2A. The Orchestrate Agent Control Plane is used to control and provide observability for these agents, including external ones.*

[Agent2Agent](https://github.com/a2aproject/a2a) (A2A) is an open protocol that enables communication and interoperability between opaque agentic applications. This post describes how to invoke A2A agents from orchestrator agents, running them and their tools on behalf of users. Traces from A2A are integrated via [OpenTelemetry](https://opentelemetry.io/) so that they appear seamlessly in Orchestrate Analytics.

## Example

The example features a simple trip-booking agent that checks whether an authenticated user possesses a specific role.

![image](/assets/img/2026/10/a2a-traces-01.png)

OAuth Token Exchange is used as authentication mechanism, as described in my previous [post]({{ "/article/agent-user-identity-oauth-token-exchange/" | relative_url }}).

Orchestrate invokes the A2A server, which provides two simple tools. These tools access the user's bearer token (via token exchange) and can invoke the Identity Provider (such as IBM Verify) to read roles and group memberships.

```
User (browser)
     │  sends message via Embedded Web Chat widget
     ▼
wxO Orchestrator (trip_booking_agent_a2a)
     │  detects flight / identity intent
     │  performs RFC 8693 token exchange
     │  obtains Verify JWT for the current user
     ▼
A2A Server (flights_agent  — a2a/)
     │  POST /  (A2A JSON-RPC)
     │  Authorization: Bearer <Verify JWT>
     │
     ├─► FlightsAgentExecutor.execute()
     │       extracts bearer token from HTTP headers
     │       passes token to FlightsAgent.stream()
     │
     └─► Tool (search_flights_a2a / get_user_profile_a2a)
             calls verify_bearer()  ← validates JWT signature via JWKS
             calls check_role()     ← enforces trip_booker role in Verify
             returns result to A2A server
```

## Code

Let’s look at how to implement the A2A executor, the A2A agent, and the tools.

**Agent Definitions**

The Orchestrator agent includes the A2A agent as collaborator. "app_id: verify_token_exchange" defines the usage of OAuth Token Exchange.

```yaml
spec_version: v1
kind: external
name: flights_agent
provider: external_chat/A2A/0.3.0
api_url: "${A2A_SERVER_URL}"
app_id: verify_token_exchange
```

```yaml
spec_version: v1
kind: native
name: trip_booking_agent_a2a
collaborators:
  - flights_agent
```

**A2A Agent Executor**

The agent executor gets the bearer token passed from watsonx Orchestrate and forwards it to the underlying tools.

```python
from a2a.server.agent_execution import AgentExecutor, RequestContext

def _extract_bearer_token(context: RequestContext) -> str:
    call_ctx = getattr(context, "_call_context", None)
    if call_ctx is not None:
        headers: dict = call_ctx.state.get("headers", {})
        auth = headers.get("authorization") or headers.get("Authorization", "")

...

bearer_token = _extract_bearer_token(context)
async for item in self.agent.stream(query, task.context_id, bearer_token=bearer_token):

...

async def stream(self, query: str, context_id: str, bearer_token: str = ""):
    self._bearer_token = bearer_token
    self.model.set_bearer_token(bearer_token)

...

tool_call = {
    'name': 'search_flights_a2a',
    'args': {
        'origin': origin,
        'destination': destination,
        'date': travel_date,
        'bearer_token': self._bearer_token,
    }
```

**Tools**

The tools have access to the user's bearer token and can read user metadata from the Identity Provider (IdP).

```python
import jwt as pyjwt

JWKS_URI = os.environ.get("JWKS_URI", "")
JWT_ISSUER = os.environ.get("JWT_ISSUER", "")
JWT_AUDIENCE = os.environ.get("JWT_AUDIENCE", "")

...

target_uri = jwks_uri or JWKS_URI or os.environ.get("JWKS_URI", "")
client = pyjwt.PyJWKClient(target_uri, cache_keys=True)

...

def verify_bearer(auth: str) -> dict:
    raw_token = auth[7:]
    client = fetch_jwks(JWKS_URI)

    try:
        signing_key = client.get_signing_key_from_jwt(raw_token)
        signing_keys = [signing_key]
    except Exception:
        signing_keys = client.get_jwk_set().keys

    for sk in signing_keys:
        claims = pyjwt.decode(raw_token, sk.key, algorithms=["RS256"], ...)
        return claims

...

@tool
@_sdk_tool
def get_user_profile_a2a(bearer_token: str = "") -> str:
    """Return the authenticated user's full identity from their IBM Verify JWT.
    Uses IBM Verify token-exchange (oauth_auth_token_exchange_flow); JWT is
    verified against JWKS.
    Returns identity fields extracted from the verified token.
    """
    trace_tool_execution_start('get_user_profile_a2a')

    auth = bearer_token if bearer_token.startswith("Bearer ") else (f"Bearer {bearer_token}" if bearer_token else "")
    try:
        claims = verify_bearer(auth)
    except PermissionError as exc:
        result = str(exc)
        trace_tool_execution_end('get_user_profile_a2a', result)
        return result

    sub = claims.get("sub", "(missing)")
    email = claims.get("email", claims.get("preferred_username", "(missing)"))
    group_ids: list = claims.get("groupIds", [])
    roles = [g.get("displayName", "") for g in group_ids if isinstance(g, dict)]
    roles += [g for g in claims.get("groups", []) if isinstance(g, str)]
    roles += [r for r in claims.get("roles", []) if isinstance(r, str) and r not in roles]

    obo_token = auth[7:] if auth.startswith("Bearer ") else ""
    if obo_token:
        token_exchange_token_redacted = obo_token[:8] + "..." + obo_token[-4:]
        try:
            token_exchange_jwt = json.dumps(
                pyjwt.decode(obo_token, options={"verify_signature": False})
            )
        except Exception as exc:
            token_exchange_jwt = f"(decode error: {exc})"
    else:
        token_exchange_token_redacted = "(empty)"
        token_exchange_jwt = "(not fetched)"

    raw_claims = {k: v for k, v in claims.items() if k not in ("exp", "iat")}
    token_claim_keys = sorted(claims.keys())

    profile = {
        "sub": sub,
        "email": email,
        "roles": roles,
        "has_token_exchange_token": bool(obo_token),
        "token_exchange_token_redacted": token_exchange_token_redacted,
        "token_exchange_jwt": token_exchange_jwt,
        "token_claim_keys": token_claim_keys,
        "raw_claims": raw_claims,
    }
    result = json.dumps(profile)
    trace_tool_execution_end('get_user_profile_a2a', result)
    return result
```

## Observability

When watsonx Orchestrate invokes an external A2A agent it already records the call on its own side. The orchestrator's trace shows the delegated call as a 'collaborator' span. However, what happens inside the external agent (which tools were called, how long they took, what they returned) is invisible to Orchestrate by default because the external server is a completely separate process.

The [ibm-watsonx-orchestrate-sdk](https://developer.watson-orchestrate.ibm.com/traces/otel-export#exporting-observability-traces-with-opentelemetry) solves this: the external agent can use the SDK to emit OpenTelemetry spans, and those spans are collected into the same Analytics view in Orchestrate, so the full execution chain, from the orchestrator's LLM call all the way down into the A2A agent's tool invocations, appears in a single trace.

The SDK triggers the following endpoint:

```text
POST https://api.watson-orchestrate.ibm.com/instances/<instance-id>/v1/orchestrate/inject/traces
Authorization: Bearer <IAM token obtained from API_KEY>
```

The tracer must be configured with your Orchestrate API key, host URL, and agent deployment information:

```python
from ibm_watsonx_orchestrate_sdk.client import Client as _WxOClient
from ibm_watsonx_orchestrate_sdk.observability import (
    Tracer as _WxOTracer,
    TracerConfig as _WxOTracerConfig,
    register_tracer as _register_tracer,
)
from ibm_watsonx_orchestrate_sdk.observability.tracer import (
    get_default_tracer,
)

_wxo_client = Client(
    api_key=os.getenv('WXO_API_KEY'),
    instance_url=os.getenv('WXO_HOST_URL'),
    auth_type="mcsp_v2",
)
_tracer_config = TracerConfig(
    client=_wxo_client,
    agent_id=os.getenv('WXO_AGENT_ID'),
    workspace_id='00000000-0000-0000-0000-000000000001',
    environment='draft',
    tenant_id=os.getenv('WXO_ORCHESTRATION_ID'),
)
register_tracer(Tracer(_tracer_config))

...

tracer = get_default_tracer()
if _sdk_spans_available and tracer is not None:
    agent_span = tracer.start_agent_span(
        'LangGraph',
        agent_name='FlightsAgent',
        framework='langgraph',
    )
...

from ibm_watsonx_orchestrate_sdk.observability.decorators import (
        trace_tool_call as _trace_tool_call,
    )
    _sdk_decorator_available = True
except ImportError:
    _sdk_decorator_available = False

def _sdk_tool(func):
    if _sdk_decorator_available:
        return _trace_tool_call(capture_input=True, capture_output=True)(func)
    return func#

...

def trace_start(event_type: str, message: str, **details: Any) -> None:
    Tracer.trace(event_type, message, **details)
    _trace_depth.set(_trace_depth.get() + 1)

...

def trace_tool_execution_start(tool_name: str) -> None:
    Tracer.trace_start('tool_exec', 'TOOL_EXECUTION_START', tool=tool_name)
...
```

Tools can use the '@_sdk_tool' annotation and methods like 'Tracer.trace()' to send traces.

```python
from .tracer import trace_tool_execution_start, trace_tool_execution_end

@tool
@_sdk_tool
def search_flights_a2a(
    origin: str,
    destination: str,
    date: str,
    bearer_token: str = "",
) -> str:
    """Search for available flights between two cities on a given date.
    Uses IBM Verify token-exchange (oauth_auth_token_exchange_flow); requires
    the caller to hold the trip_booker role in their IBM Verify JWT.

    Args:
        origin: Departure IATA code or city (e.g. FRA).
        destination: Arrival IATA code or city (e.g. JFK).
        date: Travel date YYYY-MM-DD.
    """
    trace_tool_execution_start('search_flights_a2a')
    auth = bearer_token if bearer_token.startswith("Bearer ") else (f"Bearer {bearer_token}" if bearer_token else "")
    try:
        claims = verify_bearer(auth)
        sub = check_role(claims)
    except PermissionError as exc:
        logger.warning("search_flights_a2a: access denied — %s", exc)
        result = str(exc)
        trace_tool_execution_end('search_flights_a2a', result)
        return result
    )
    flights = ...
    ]
    result = json.dumps(flights)
    trace_tool_execution_end('search_flights_a2a', result)
    return result
```

Ultimately, traces from the native Orchestrate orchestrator agent will show up as usual in your Analytics dashboard, alongside the integrated telemetry from the A2A agent.

![image](/assets/img/2026/10/a2a-traces-02.png)

![image](/assets/img/2026/10/a2a-traces-03.png)

Additionally, the A2A agent is displayed.

![image](/assets/img/2026/10/a2a-traces-04.png)

![image](/assets/img/2026/10/a2a-traces-05.png)

## Next Steps

To find out more, check out the following resources:

* [User Identity in watsonx Orchestrate]({{ "/article/agent-user-identity-mcp/" | relative_url }})
* [OAuth Token Exchange]({{ "/article/agent-user-identity-oauth-token-exchange/" | relative_url }})
* [Authenticating Types]({{ "/article/watsonx-orchestrate-authentication-types/" | relative_url }})
* [Connecting Custom Apps to Orchestrate via REST APIs]({{ "/article/orchestrate-surface-rest-api/" | relative_url }})
* [Example Source Code](https://github.com/nheidloff/watsonx-orchestrate-sso-example/)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestration Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base)