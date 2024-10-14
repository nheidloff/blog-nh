---
id: nh-090
title: 'watsonx Platform Demos'
date: 2024-10-10 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-090'
permalink: /article/watsonx-platform-demos/
custom_permalink:
    - article/watsonx-platform-demos/
image: /assets/img/2024/10/watsonx-platform-demos.png
---

*watsonx is IBM's AI & data platform that's built for business. It supports the complete AI lifecycle including Large Language Models, developer tools, governance and more. This post describes a new asset which explains how to leverage various watsonx capabilities together.*

To build AI based applications, you need a complete suite of tools to not only develop first prototypes, but also to deploy and operate these applications in production. A platform like watsonx allows enterprises scaling their processes to build new applications and to extend existing applications with AI functionality efficiently.

In the IBM CSM DACH team, we have built (and are still improving) a new asset which demonstrates key capabilities of the watsonx platform and how different components can be integrated. The code is available as open source in the [watsonx Platform Demos](https://github.com/nheidloff/watsonx-ai-platform-demos) repo.

The asset contains demos to highlight the following key messages:

* watsonx is IBM's complete AI platform for enterprises
* Smaller and cheaper models can be fine-tuned with InstructLab
* Custom models can be deployed on watsonx.ai
* Agentic flows allow automation via tools and function calling
* Developers can start working efficiently locally with InstructLab and Bee Agent Framework
* Metrics can be monitored with watsonx.governance
* watsonx Orchestrate provides integrations of custom AI applications in conversational experiences

## Example Scenario

As example scenario customer care of a telecommunications company is used. *Human agents* talk with *customers* to solve their issues. The human agents are supported by *digital agents* to automate as much as possible the necessary fixes.

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

## Agentic Application

In this example, the software of routers can be updated remotely and automatically. If this can be done successfully, mails are sent to customers.

Transcriptions of phone calls can be done via Speech to Text services. The asset covers the following three steps which are executed sequentially. To update routers and send mails, tools are invoked.

1. Summarize transcript
2. Update router if necessary
3. Write mail if necessary

Let's look at step (2) in more detail. If the transcript summary contains 'router update' as a corrective action, the agent understands that it has to invoke a tool with the phone number of the customer as input.

```text
Agent UpdateRouterIfNecessary LLM Output:
{
  generated_text: 'Question: Update the router for Mary (123-555-1234) based on the 
        transcript summary.\n' +
    'Thought: I need to update the router for Mary (123-555-1234) based on the 
        transcript summary, so I will use the RouterUpdate tool.\n' +
    'Tool Name: RouterUpdate\n' +
    'Tool Caption: Updating router software for Mary (123-555-1234)\n' +
    'Tool Input: {"phoneNumber":"123-555-1234"}\n' +
    'Tool Output: ',
  generated_token_count: 4465,
  input_token_count: 1271,
  stop_reason: 'not_finished'
}
```

The agents have been implemented with the Bee Agent Framework in TypeScript. The framework has been built by IBM Research and is available as open-source. The following snippet shows the definition of the router tool which is put into the prompt when invoking the Large Language Models.

```typescript
export class RouterUpdateTool extends Tool<
  RouterUpdateToolOutput, RouterUpdateToolOptions, RouterUpdateToolRunOptions> {
  name = "RouterUpdate"; 
  description = "Updates the software of routers remotely for a subscriber " +
    "with a certain phone number.";
  inputSchema() {
    return z.object({
      phoneNumber: z
        .string({ description: `Phone number of a subscriber, for example '123-456-7890'` })
        .min(1)
        .max(40),
    });
  }
```

Rather than hallucinating the tool output, the agent stops the stream from the LLM after 'Tool Output: ' and executes the tool instead.

```text
Agent UpdateRouterIfNecessary (tool_input) 🤖 :  {"phoneNumber":"123-555-1234"}
Input to Router Update tool - phoneNumber: 123-555-1234
Agent UpdateRouterIfNecessary (tool_output) 🤖 :  {"success":"true",
"text":"Router has been updated"}
```

## watsonx Orchestrate

The agentic application can be run as a standalone TypeScript application, for example locally for development purposes. Additionally, watsonx Orchestrate can be utilized to invoke the three steps and to pass context between the steps.

![image](/assets/img/2024/10/watsonx-platform-demos-2.png)

When 'Hide this form from user' is selected, the complete flow is executed, for example in the Orchestrate chat client or via API.

![image](/assets/img/2024/10/watsonx-platform-demos-3.png)

## InstructLab

To summarize transcripts, the bigger model LLama 3.1 70b can be used running on watsonx.ai. To achieve faster response times and to save costs for running the models, smaller models can be fine-tuned.

InstructLab is an open-source initiative led by Red Hat and IBM Research. In addition to the ability to fine-tune generative AI models, it also supports generations of synthetical data so that less real data is required.

For example, InstructLab can generate more sample transcriptions (contexts) based on few real samples which are defined in yaml files.

```yaml
version: 3
task_description: >-
  Summarization of phone call transcripts between human agents
  and clients of a telecommunication service provider about
  technical issues.
created_by: nheidloff
seed_examples:
  - context: >-
      John (Teltop Customer Care Agent): Hello, this is John from Teltop customer
      care. How can I assist you today?\n\nMary (Disappointed Subscriber): Hi
      John, it'\''s Mary. I'\''ve been having a nightmare with your service.
      My home Wi-Fi is acting up, and the TV service over fiber is terrible.
      \n\nJohn: I'm sorry to hear about the troubles you're facing at home, Mary.
      Let's address these issues. Can you please provide me with your account number
      or the phone number associated with your account??\n\nMary: Sure, it'\''s
      123-555-1234. [...]
      \n\nJohn:  Mary, it appears there are some issues with your router. We need
      to update the router software. [...]
    question: >-
      Summarize the transcript of the call. Identify the agent and the
      subscriber. Add any specific issues mentioned by the subscriber. Add any
      corrective actions taken as directed by the agent. Please mention if the
      issue is resolved. Mention any follow-up actions and timelines. List the
      phone number of the subscriber at the end.
    answer: >-
      **Agent:** Mike\n**Subscriber:** Sara\n [...]
      **Corrective Actions:** Router software update [...]
      **Subscriber's Phone Number:** 123-555-1234
```

The following snippet shows some example output. Similarly, InstructLab can generate and evaluate summaries (answers).

```text
[Start of Context]
Raj (Customer Care Agent): Hello, this is Raj from customer care. How can I assist
you today?

Samantha (Customer): Hi Raj, I'm having trouble with my internet connection. It's
been really slow lately [cut ... cut]
[End of Context]
```

## watsonx.ai

Custom foundation models and models from HuggingFace can be imported into and deployed on watsonx.ai.

![image](/assets/img/2024/09/import-llm-watsonx-ai-01.png)

## watsonx.governance

To evaluate foundation models, watsonx.governance provides mechanisms to monitor models with various out-of-the-box metrics as well as custom metrics.

![image](/assets/img/2024/10/watsonx-platform-demos-4.png)

## Documentation

* watsonx Platform Demos
    * [GitHub Repo](https://github.com/nheidloff/watsonx-ai-platform-demos)
    * [Get Started](https://github.com/nheidloff/watsonx-ai-platform-demos?tab=readme-ov-file#get-started)
    * [Architecture](https://github.com/nheidloff/watsonx-ai-platform-demos/blob/main/documentation/Architecture.pptx)
* Bee Agent Framework
    * [GitHub Repo](https://github.com/i-am-bee/bee-agent-framework)
    * [Simple Bee Agent Framework Example]({{ "/article/bee-agents-function-calling-watsonx.ai/" | relative_url }})
    * [Developing custom Tools with the Bee Agent Framework]({{ "/article/developing-custom-tools-bee-agent-framework/" | relative_url }})
* InstructLab
    * [GitHub Repos](https://github.com/instructlab)
    * [Fine Tuning Example](https://github.com/nheidloff/watsonx-ai-platform-demos/tree/main/instructlab)
    * [Synthetic Data Generation with InstructLab]({{ "/article/synthetic-data-generation-instructlab/" | relative_url }})
    * [Deploying Foundation Models on watsonx.ai]({{ "/article/deploying-custom-foundation-models-watsonx-ai/" | relative_url }})
    * [OpenAI API Proxy for watsonx.ai]({{ "/article/watsonx-ai-proxy-openai-api/" | relative_url }})
* watsonx Orchestrate
    * [Documentation](https://www.ibm.com/docs/en/watsonx/watson-orchestrate/current?topic=getting-started-watsonx-orchestrate)
    * [Example Skill Flow](https://github.com/nheidloff/watsonx-ai-platform-demos/blob/main/documentation/Orchestrate.md)
    * [Multi-turn Conversations with watsonx Orchestrate]({{ "/article/multi-turn-conversations-watsonx-orchestrate/" | relative_url }})
* watsonx.governance
    * [Documentation](https://www.ibm.com/docs/en/watsonx/saas?topic=governing-ai-assets)
    * [GenAI Quality Metrics for third Party Models in watsonx]({{ "/article/generative-ai-quality-metrics-watsonx-governance-third-party-models/" | relative_url }})