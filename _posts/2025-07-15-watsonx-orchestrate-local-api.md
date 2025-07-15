---
id: nh-134
title: 'Invoking watsonx Orchestrate APIs locally'
date: 2025-07-15 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-134'
permalink: /article/watsonx-orchestrate-local-api/
custom_permalink:
    - article/watsonx-orchestrate-local-api/
image: /assets/img/2025/07/watsonx-orchestrate-api-00.png
---

*Watsonx Orchestrate is IBM's platform to run agentic systems. To make developers productive, Orchestrate can be run locally via the watsonx Orchestrate Developer Edition. This post describes how to invoke local agents from local applications via APIs.*

Watsonx Orchestrate provides [APIs](https://developer.watson-orchestrate.ibm.com/apis/). The OpenAPI documentation can be accessed via the [localhost:4321/docs](http://localhost:4321/docs) endpoint.

## Bearer Token

All APIs require bearer tokens for authentication. For example, when running Orchestrate on IBM Cloud you can retrieve the tokens via  [curl](https://cloud.ibm.com/docs/account?topic=account-iamtoken_from_apikey) and [CLI](https://cloud.ibm.com/docs/key-protect?topic=key-protect-retrieve-access-token).

When running Orchestrate locally as containers, you can read the token from a [configuration file](https://developer.watson-orchestrate.ibm.com/environment/initiate_environment#important-configuration-files).

```bash
cat ~/.cache/orchestrate/credentials.yaml
auth:
  local:
    wxo_mcsp_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz.....
```

## Invocation

For the [chat/completions](https://developer.watson-orchestrate.ibm.com/apis/orchestrate-agent/chat-with-agents) API you also need the agent id.

```bash
orchestrate agents list --verbose
curl --request POST \
  --url http://localhost:4321/api/v1/orchestrate/agent-id/chat/completions \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz.....' \
  --header 'Content-Type: application/json' \
  --data '{
  "stream": true,
  "messages": [
    {
      "role": "user",
      "content": "Hi"
    }
  ]
}'
```

There is also a nice [Try it](https://developer.watson-orchestrate.ibm.com/apis/orchestrate-agent/chat-with-agents) experience on the Developer Orchestrate site that helps putting together the curl commands, see the screenshot at the top of this post.

## Next Steps

To find out more, check out the following resources:

* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Developer watsonx Orchestrate APIs](https://developer.watson-orchestrate.ibm.com/apis/)