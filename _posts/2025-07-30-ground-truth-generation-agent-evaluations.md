---
id: nh-141
title: 'Creating Ground Truth Datasets for Agent Evaluations'
date: 2025-07-30 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-141'
permalink: /article/ground-truth-generation-agent-evaluations/
custom_permalink:
    - article/ground-truth-generation-agent-evaluations/
image: /assets/img/2025/07/ground-truth-generation-00.png
---

*Agentic applications can fail for multiple reasons. For developers it's important to understand why they fail to improve the quality. To run evaluations, ground truth information is required which is not always available. This post describes how watsonx Orchestrate can create ground truth datasets.*

Watsonx Orchestrate is IBM's platform to build and run agentic systems, from structured flows to autonomous systems. You can start simple by leveraging the Orchestrate user interfaces, but as a developer you can also get full control by writing code.

The watsonx Orchestrate Agent Developer Kit comes with an evaluation framework for developers. As described in my post [Why Agents and Agentic Systems can fail]({{ "/article/why-agents-fail/" | relative_url }}) it's important to test not only the final answers, but also the intermediate steps, for example the order of tool calls. The new evaluation framework supports this by defining ground truth information including trajectories.

## Ground Truth Datasets

Evaluations of Large Language Model prompts, RAG use cases and agentic systems work best if you have ground truth information. In simple cases it's sufficient to only compare the expected response with the generated response. For RAG use cases it gets more challenging since you should also test whether the search step found the right documents before generating responses. Agentic applications are even more sophisticated. The ground truth information should also include the required tools and the right order in addition to the final answers.

Read my blog post [Evaluating Agents in watsonx Orchestrate]({{ "/article/agent-evaluations-watsonx-orchestrate/" | relative_url }}) and especially the part that explains the semantics and the format of [ground truth]({{ "/article/agent-evaluations-watsonx-orchestrate/#ground-truth-datasets" | relative_url }}) datasets.

Rather than creating the ground truth datasets manually, there are [two methods](https://developer.watson-orchestrate.ibm.com/evaluate/create_data) to do this more efficiently:

1. Generation: Automatically creates ground truth datasets from user stories and tool definitions
2. Recordings: Captures live chat sessions via the chat UI and converts them into structured datasets

## Generation

The evaluation framework comes with functionality to generate ground truth information in the format watsonx Orchestrate expects based on stories and tools. Here is an example:

1. [Stories](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/generate/stories.csv)
2. [Tools](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/generate/tools.py)

Here are some sample stories for an HR agent used in my previous [post]({{ "/article/agent-evaluations-watsonx-orchestrate/" | relative_url }}).

![image](/assets/img/2025/07/ground-truth-generation-01.png)

The following command generates ground truth information for the five stories.

```bash
orchestrate evaluations generate --stories-path ./examples/evaluations/generate/stories.csv --tools-path ./examples/evaluations/generate/tools.py --env-file .env-dev
```

For each story two variants are generated. The following screenshot shows one potential ground truth dataset for the third story above. Note that this also includes the two tool invocations, in the right order with the right input parameters.

![image](/assets/img/2025/07/ground-truth-generation-02.png)

The documentation doesn't cover how the 'generate' command has been built, but it might use an agent with tools to find tool definitions and stories and a (fine-tuned?) Large Language Model to generate structured data (just my guess).

## Recordings

As a second option conversations can be recorded.

```bash
orchestrate chat start
open http://localhost:3000/chat-lite
orchestrate evaluations record --output-dir ./chat_recordings --env-file .env-dev
# press Ctrl+C to stop
```

As displayed in the screenshot at the top of this post, the user enters "I want to know my time off schedule between 2025-01-01 to 2025-10-30" and "nwaters" which results in the following ground truth dataset.

```json
{
    "agent": "hr_agent",
    "goals": {
        "fetch_assignment_id-1": [
            "retrieve_timeoff_schedule-1"
        ],
        "retrieve_timeoff_schedule-1": [
            "summarize"
        ]
    },
    "goal_details": [
        {
            "type": "tool_call",
            "name": "fetch_assignment_id-1",
            "tool_name": "fetch_assignment_id",
            "args": {
                "username": "nwaters"
            }
        },
        {
            "type": "tool_call",
            "name": "retrieve_timeoff_schedule-1",
            "tool_name": "retrieve_timeoff_schedule",
            "args": {
                "assignment_id": "15778303",
                "end_date": "2025-10-30",
                "start_date": "2025-01-01"
            }
        },
        {
            "name": "summarize",
            "type": "text",
            "response": "Your time off schedule between 2025-01-01 and 2025-10-30 is on 2025-01-05.",
            "keywords": [
                "2025-01-01",
                "2025-10-30",
                "2025-01-05"
            ]
        }
    ],
    "story": "Your username is nwaters. You want to know your time off schedule between 2025-01-01 to 2025-10-30.",
    "starting_sentence": "I want to know my time off schedule between 2025-01-01 to 2025-10-30"
}
```

## Next Steps

To find out more, check out the following resources:

* [Watsonx Orchestrate Evaluation Framework](https://developer.watson-orchestrate.ibm.com/evaluate/overview)
* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Documentation watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)