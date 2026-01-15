---
id: nh-159
title: 'Running Langflow in watsonx Orchestrate'
date: 2026-01-15 02:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-159'
permalink: /article/watsonx-orchestrate-langflow/
custom_permalink:
    - article/watsonx-orchestrate-langflow/
image: /assets/img/2026/01/watsonx-orchestrate-langflow-00.png
---

*Watsonx Orchestrate is IBM's platform to build and run agentic systems in enterprises. Agents implemented with the open-source framework Langflow can be imported and deployed in Orchestrate.*

[Langflow](https://www.langflow.org/) makes it easy to implement agents, for example via its user interface and lots of re-usable components. Read my post [Leveraging Docling in Langflow]({{ "/article/docling-in-langflow/" | relative_url }}) to learn more. Langflow is also part of [OpenRAG]({{ "/article/openrag/" | relative_url }}), an open-source framework to build Retrieval Augmented Generation applications.

## Example

Let's look at an [example](https://developer.watson-orchestrate.ibm.com/tutorials/tutorial_langflow) with a simple flow. The flow extracts action items from meeting transcripts. Flows can be sophisticated agentic systems, but in this case the flow only uses regular expressions and deterministic code to keep it simple.

![image](/assets/img/2026/01/watsonx-orchestrate-langflow-01.png)

The next screenshot shows an Orchestrate agent which uses the Langflow flow as a tool with text as input parameter and text as output parameter.

![image](/assets/img/2026/01/watsonx-orchestrate-langflow-02.png)

## Import

Flows can be exported as JSON files. The Langflow runtime which comes with watsonx Orchestrate can interpret the definitions and run them.

The [watsonx Orchestrate Developer Edition](https://developer.watson-orchestrate.ibm.com/developer_edition/wxOde_overview) allows running Orchestrate locally via containers. To enable Langflow and to open the editor, launch Orchestrate via '--with-langflow'.

```bash
orchestrate server start --env-file=./.env -l --with-langflow 
open http://localhost:7861/
```

The sample flow and the sample agent can be imported in watsonx Orchestrate via CLI.

![image](/assets/img/2026/01/watsonx-orchestrate-langflow-03.png)

```bash
orchestrate tools import -k langflow -f transcripts_action_item_extractor.json
orchestrate agents import -f langflow_agent.yml
```

In the definition of the agent the Langflow flow is listed as tool:

```yaml
kind: native
name: langflow_agent
display_name: Tutorial Langflow Agent
description: Tutorial Langflow Agent
context_access_enabled: true
context_variables: []
llm: watsonx/ibm/granite-4-h-small 
style: default
instructions: ''
guidelines: []
collaborators: []
tools:
- transcripts_action_item_extractor
knowledge_base: []
spec_version: v1
```

## Credentials

Langflow utilizes environment variables to store configurations and API keys. This data should be kept separate from the core flow definition.

![image](/assets/img/2026/01/watsonx-orchestrate-langflow-04.png)

These environment variables can be managed via [watsonx Orchestrate connections](https://developer.watson-orchestrate.ibm.com/connections/overview).

```bash
orchestrate connections add -a langflow_app
orchestrate connections configure -a langflow_app --env draft -t team -k key_value
orchestrate connections set-credentials -a langflow_app --env draft -e USER_NAME=$USER_NAME
```

## Next Steps

To find out more, check out the following resources:

* [Tutorial: Using watsonx Orchestrate and Langflow](https://developer.watson-orchestrate.ibm.com/tutorials/tutorial_langflow)
* [Visual Tool Building with Langflow in watsonx Orchestrate Developer Edition](https://achan2013.medium.com/visual-tool-building-with-langflow-in-watsonx-orchestrate-developer-edition-82f99d733162)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)
* [Langflow](https://www.langflow.org/)
* [Documentation: Langflow Environment Variables in Orchestrate](https://developer.watson-orchestrate.ibm.com/langflow/binding_variables)
* [Documentation: Importing Flows in Langflow](https://docs.langflow.org/concepts-flows-import#import-a-flow)