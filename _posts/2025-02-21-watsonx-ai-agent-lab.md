---
id: nh-109
title: 'Getting started with watsonx.ai Agent Lab'
date: 2025-02-21 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-109'
permalink: /article/watsonx-ai-agent-lab/
custom_permalink:
    - article/watsonx-ai-agent-lab/
image: /assets/img/2025/02/agent-lab-1.png
---

*IBM launched the beta release of Agent Lab, a low-code tool for building and deploying agents on watsonx.ai. This post describes a simple example.*

Here are the official resources:

* [Documentation: Agent Lab (beta)](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-agent-lab.html?context=wx&pos=2b)
* [Start building AI Agents on watsonx.ai with Agent Lab](https://www.ibm.com/new/announcements/start-building-ai-agents-on-watsonx-ai-with-agent-lab)

## Example Scenario

Let's look at an example customer care scenario of a telecommunications company. Human agents talk with customers to solve their issues. The human agents are supported by digital agents to automate as much as possible the necessary fixes.

Here is a transcript of a conversation with a customer who has a Wi-Fi router issue:

```text
John (Teltop Customer Care Agent): Hello, this is John from Teltop customer care. How 
can I assist you today?

Mary (Disappointed Subscriber): Hi John, it's Mary again. I've been having a nightmare 
with your service. My home Wi-Fi is acting up, and the TV service over fiber is 
terrible.

John: I'm sorry to hear about the troubles you're facing at home, Mary. Let's address 
these issues. Can you please provide me with your account number or the phone number 
associated with your account?

Mary: Sure, it's 123-555-1234.

[...]

John: Mary, it appears there are some issues with your router. We need to update the 
router software. 
```

In this example, the software of routers can be updated remotely and automatically. 

## Tools

Agent Lab provides a list of out-of-the-box tools.

![image](/assets/img/2025/02/agent-lab-4.png)

Additionally, custom tools can be defined, in the example above a "Router Update" tool. The custom tool requires the phone number from the transcript as input and returns a success message.

![image](/assets/img/2025/02/agent-lab-2.png)

```json
{
  "phoneNumber": {
    "title": "Phone number",
    "description": "Phone number of a subscriber, for example '123-456-7890'",
    "type": "string"
  }
}
```

```python
def update_router(phoneNumber: str) -> dict:
    response = {
        "success": "true",
        "text": "Router has been updated"
    }
    return response
```

## Agents

Agents need to have a name and a description which is an instruction that is passed to the Large Language Model. For the "Router Update" Agent the description is ...

```text
You are an expert for router updates in customer care scenarios. 
Based on a transcript of a support call you determine whether a 
router update is necessary. If necessary, invoke the Router Update 
tool to fix the router.
```

For this [transcript](https://github.com/IBM/watsonx-ai-platform-demos/blob/main/applications/application/prompts/prompt4.md) the agent detects that the router needs to be updated and does it directly.

![image](/assets/img/2025/02/agent-lab-3.png)

## Next Steps

The best feature is that AgentLab can generate code which you can extend and deploy. I'd like to blog about this soon. The generated code uses the following concepts:

* [Deploying Agentic Applications on watsonx.ai]({{ "/article/watsonx-ai-service/" | relative_url }})
* [Structured Output of Large Language Models]({{ "/article/llm-structured-output/" | relative_url }})

Check out the following resources to learn details.

* [watsonx.ai](https://www.ibm.com/products/watsonx-ai)
* [AI Agent Development](https://www.ibm.com/products/watsonx-ai/ai-agent-development)
* [IBM TechXchange Conference Session Presentations](https://community.ibm.com/community/user/discussion/ibm-techxchange-conference-session-presentations-how-to-access)
* [Bee AI](https://github.com/i-am-bee)