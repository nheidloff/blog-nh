---
id: nh-182
title: "Testing Conversations in Orchestrate via Agentic Skill"
date: 2026-07-01 00:03:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-182'
permalink: /article/watsonx-orchestrate-skill-multi-turn-tests/
custom_permalink:
    - article/watsonx-orchestrate-skill-multi-turn-tests/
image: /assets/img/2026/07/watsonx-orchestrate-skill-multi-turn-tests.jpg
---

*Agentic software development tools like IBM Bob can do much more than just generate code. Their real power emerges when they directly access live environments to run, test, and monitor code. This post covers a new watsonx-orchestrate skill that allows developers to access IBM watsonx Orchestrate systems directly from Bob, eliminating manual workflows when testing agents directly in Orchestrate environments.*

Previously, I blogged about the new [watsonx-orchestrate]({{ "/article/watsonx-orchestrate-skill/" | relative_url }}) skill which is fully [open-source](https://github.com/nheidloff/orchestrate-bob). It includes functionality to automatically [set up the Orchestrate ADK's command line interface]({{ "/article/watsonx-orchestrate-skill-environment/" | relative_url }}) (CLI) and to run tests.

## Functionality

Test-Driven Development (TDD) has been a software engineering staple for years. For agentic workflows, it is equally crucial to establish clear success criteria and verify that generated code works seamlessly in practice.

To run these validations, code must be imported or deployed to live environments. Once deployed, agents need reliable ways to execute tests and surface clear error messages or warnings. With the watsonx-orchestrate skill, Bob handles the heavy lifting: generating agents and tools, importing everything into Orchestrate environments, and running live tests.

Testing only the 'happy path' where a user provides a single prompt and the agent handles all business logic in a single turn—isn't enough. Real-world interactions require multi-turn conversations. Using this skill, Bob executes smoke tests for both single-turn and multi-turn scenarios.

Note: If Orchestrate agents only invoke read-only tools, Bob can execute tests automatically. However, agents that trigger business transactions require human verification before proceeding.

Bob can also read starter prompts (typical example interactions) directly from the agents' YAML definitions and use them to construct test cases. Afterward, it evaluates the results and aggregates them into a clean report.

## Script

The skill can optionally pair with the [watsonx Orchestrate ADK MCP Server](https://developer.watson-orchestrate.ibm.com/mcp_server/wxOmcp_configuration), which includes a chat_with_agent tool.

However, to optimize token usage, the skill typically invokes the 'orchestrate' CLI directly. Unfortunately, the CLI command 'orchestrate chat ask' runs in an interactive mode, making it incompatible with automated agent execution.

Because the MCP tool utilizes the [Orchestrate REST API](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/main/packages/mcp-server/ibm_watsonx_orchestrate_mcp_server/src/chat/mcp_tools.py) instead of the CLI, I created a wrapper script called [wxo-chat.sh](https://github.com/nheidloff/orchestrate-bob/blob/1dca06eec454be8cac52efd58470284d964163fd/skills/watsonx-orchestrate/references/wxo-chat.sh) to replicate this programmatic behavior without requiring the extra overhead of an MCP server.

This script is bundled directly with the skill and executes locally rather than being injected into the LLM context window.

Here are the key parts of the script:

```bash
#!/usr/bin/env bash
# wxo-chat.sh — Programmatic single-turn and multi-turn chat with a watsonx Orchestrate agent
#
# Reads credentials and the active environment from the Developer Edition config at:
#   ~/.config/orchestrate/config.yaml     (active env, wxo_url)
#   ~/.cache/orchestrate/credentials.yaml (wxo_mcsp_token)
#
# Usage:
#   Single-turn (new thread):
#     ./wxo-chat.sh -n <agent-name> "Your message"
#
#   Multi-turn (continue existing thread):
#     ./wxo-chat.sh -n <agent-name> --thread-id <UUID> "Your follow-up"
#
#   With reasoning trace:
#     ./wxo-chat.sh -n <agent-name> -r "Your message"
#
#   Override active environment:
#     ./wxo-chat.sh -n <agent-name> -e local "Your message"
#
# Output (JSON, always to stdout):
#   {
#     "status":          "success" | "error",
#     "thread_id":       "<UUID>",
#     "final_message":   "...",
#     "reasoning_trace": { "steps": [...] },
#     "thinking_trace":  ["..."],
#     "error":           null
#   }
#
# thread_id: save this value and pass it back via --thread-id to continue
#            the conversation from any process at any point in time.

TOKEN=$(yaml_scalar "$CREDS_FILE" auth "$ENVIRONMENT" wxo_mcsp_token)
[[ -n "$TOKEN" ]] || die "No token for '${ENVIRONMENT}'. Run: orchestrate env activate ${ENVIRONMENT}"

[...]

AGENTS_ENDPOINT="${WXO_URL}/v1/orchestrate/agents"
curl -sf \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  "${AGENTS_ENDPOINT}" \
  -o "$AGENTS_FILE" \
  || die "Failed to list agents at ${AGENTS_ENDPOINT}. Is the server running?"
AGENT_ID=$(python3 - "$AGENT_NAME" "$AGENTS_FILE" <<'PYEOF'

[...]

RUNS_ENDPOINT="${WXO_URL}/v1/orchestrate/runs"
curl -sf \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d "@${RUN_PAYLOAD_FILE}" \
  "${RUNS_ENDPOINT}" \
  -o "$RUN_RESPONSE_FILE" \
  || die "Failed to create run at ${RUNS_ENDPOINT}"

RUN_ID=$(python3 -c "
import sys, json
with open(sys.argv[1]) as f: d = json.load(f)
print(d.get('run_id', ''))
" "$RUN_RESPONSE_FILE")

THREAD_ID=$(python3 -c "
import sys, json
with open(sys.argv[1]) as f: d = json.load(f)
print(d.get('thread_id', ''))
" "$RUN_RESPONSE_FILE")
```

## Skill

The accompanying [SKILL.md](https://github.com/nheidloff/orchestrate-bob/blob/1dca06eec454be8cac52efd58470284d964163fd/skills/watsonx-orchestrate/SKILL.md) file outlines how and when to run the script:

```markdown
**Verify before handover (post-deploy gate)**

*Deployed ≠ verified.* Never report an agent as "done" or "ready for handover"
until it has been tested — or the human explicitly declined. 

To test the agent, Orchestrate assets have to be imported/deployed first: 
Run 'import-all.sh'.

After deploy, **ask first**, then prove it works:

> "'<agent>' is deployed to '<env>'. Want me to smoke-test it before handover? I'll
> run 1 single-turn + 1 multi-turn test against '<env>' — this sends real prompts
> and may invoke its tools, so I'll keep to **read-only** prompts." — Yes / No

If yes, derive the tests from the agent's own spec ('description', 'instructions',
'tools', and especially 'starter_prompts' — those *are* example user prompts).
Make the follow-up **context-dependent** (e.g. *"which movie was it written for?"* —
"it" only resolvable from turn 1).

Important: Always run one single-turn test and additionally one multi-turn test:
1. Single-turn test
2. Multi-turn test
2a. first user input (this is input is different from 1. Single-turn test)
2b. second user input (and thread_id from 2a)

There are two ways to run these tests dependent on whether the 'watsonx-orchestrate-adk' MCP server is available.

#### 1. 'watsonx-orchestrate-adk' MCP server is available

Run the MCP server 'watsonx-orchestrate-adk' tool 'chat_with_agent' for single-turn and multi-turn conversations.

#### 2. 'watsonx-orchestrate-adk' MCP server is not available
'''bash
# Single-turn (1)
./.bob/skills/watsonx-orchestrate/references/wxo-chat.sh -n <agent> "<derived single-turn prompt>"
# → { "thread_id": "3f92692d-...", "final_message": "...", ... }

# Multi-turn (2a) — initial user input
./.bob/skills/watsonx-orchestrate/references/wxo-chat.sh -n <agent> "<derived multi-turn prompt>"
# → { "thread_id": "3f92692d-...", "final_message": "...", ... }

# Multi-turn (2b) — resume
./.bob/skills/watsonx-orchestrate/references/wxo-chat.sh -n <agent> --thread-id <thread-id> -r "<second user input>"
# → { "thread_id": "3f92692d-...", "final_message": "...", "reasoning_trace": {"steps": [...]}, ... }
'''

**Pass = behavior, not exact text** (LLMs are non-deterministic): no error,
on-topic, the **expected tool was called** (visible via '-r'; '-l' for custom
agents), and the multi-turn follow-up **uses prior context**. Then emit a short
'temp/TEST_REPORT.md' (prompts, response excerpts, tool-call evidence, env, timestamp,
pass/fail) and **report status honestly**: "deployed and tested (2/2)", "deployed;
test 2 failed — …", or "deployed; not tested at your request".

**Safety:** keep tests **read-only by default** — if the agent has 'READ_WRITE'
tools, do not craft prompts that trigger writes unless the human opts in. Full
recipe + report template: **[references/testing-debugging.md](references/testing-debugging.md)**.

[...]

## 10. References (load on demand)

| File | Contents |
|------|----------|
| [references/wxo-chat.sh](references/wxo-chat.sh) | Tests single-turn and multi-turn conversations with agents if the MCP server 'watsonx-orchestrate-adk' is not available |
```

## Example Flow

Here is an example of the workflow in action:

```text
**User:**

Create a new Orchestrate "Trip Booking" agent to book flights.

The agent uses a tool "Find Trip" that requires four input parameters:
1. destination airport
2. departure airport
3. start date
4. return date

The tool returns mocked data for now.

**Assistant:**

Used skill watsonx-orchestrate

[...]

Todo List:
- Scaffold the trip_booking agent project structure
- Write the find_trip tool (tools/find_trip.py)
- Write the agent YAML (agents/trip_booking_agent.yaml)
- Write import-all.sh and delete-all.sh
- Import tools and agent
- Run smoke tests

Now let me set up the venv and check what's available in the environment:

$ source ./.bob/skills/watsonx-orchestrate/references/setup-venv.sh 2>&1 | tail -5
── Step 4: activate .venv ──────────────────────────────
.venv activated  (python: /Users/niklasheidloff/Desktop/orchestrate-bob/test-runs/26/.venv/bin/python)
=== Setup complete — virtual environment is active ===

[...]

$ source .venv/bin/activate && orchestrate models list 2>&1 | head -40

[...]

groq/openai/gpt-oss-120b is available. Now let me scaffold the project:

$ mkdir -p trip_booking/agents trip_booking/tools

Now write the tool, agent YAML, and helper scripts in parallel:

Wrote file trip_booking/agents/trip_booking_agent.yaml
Wrote file trip_booking/tools/find_trip.py
Wrote file trip_booking/README.md
Wrote file trip_booking/import-all.sh
Wrote file trip_booking/delete-all.sh

[...]

Now run the import:

$cd trip_booking && bash import-all.sh 2>&1

[...]

Both the tool and agent imported successfully. The WARNING about type hints is a known false positive in ADK 2.12 — the descriptions parsed fine. 
Now run smoke tests.

$source ./.bob/skills/watsonx-orchestrate/references/setup-venv.sh && \ 
./.bob/skills/watsonx-orchestrate/references/wxo-chat.sh \ -n trip_booking_agent \ 
"Find me a flight from Chicago O'Hare (ORD) to London Heathrow (LHR) 
departing 2025-09-01 and returning 2025-09-10." 2>&1

[...]

Single-turn test passed — the agent called find_trip correctly and returned the mocked data. 
Now the multi-turn test:

$ source ./.bob/skills/watsonx-orchestrate/references/setup-venv.sh && \ 
./.bob/skills/watsonx-orchestrate/references/wxo-chat.sh \ -n trip_booking_agent \ 
"I need to fly from Atlanta to San Francisco" 2>&1

[...]

$ source ./.bob/skills/watsonx-orchestrate/references/setup-venv.sh && \ 
./.bob/skills/watsonx-orchestrate/references/wxo-chat.sh \ -n trip_booking_agent \ 
--thread-id f865bb96-765d-4671-a79a-2a1595ff5eaf \ -r 
"Departure January 15, 2027 and return January 22, 2027" 2>&1

[...]

Both tests pass. Writing the test report:

[...]
```

## Next Steps

To find out more, check out the following resources:

* Try [Bob](https://bob.ibm.com/trial/)!
* [Bob Documentation](https://bob.ibm.com/docs/ide)
* [Watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Watsonx Orchestration Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base)