---
id: nh-140
title: 'Evaluating Agents in watsonx Orchestrate'
date: 2025-07-29 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-140'
permalink: /article/agent-evaluations-watsonx-orchestrate/
custom_permalink:
    - article/agent-evaluations-watsonx-orchestrate/
image: /assets/img/2025/07/agent-evaluations-00.png
---

*There is a lot of buzz around autonomous agents. However, agents can fail. In these cases, it's important for developers and AI engineers to understand why they fail to improve prompts, models and tools. This post describes how agents in watsonx Orchestrate can be evaluated.*

Watsonx Orchestrate is IBM's platform to build and run agentic systems. Agents can orchestrate work by delegating tasks to multiple agents and tools. You can start simple by leveraging the Orchestrate user interfaces, but as a developer you can also get full control by writing code.

The watsonx Orchestrate Agent Developer Kit comes with an evaluation framework for developers. As described in my post [Why Agents and Agentic Systems can fail]({{ "/article/why-agents-fail/" | relative_url }}) it's important to test not only the final answers, but also the intermediate steps, for example the order of tool calls. The new evaluation framework supports this by defining ground truth information including trajectories.

## Example Scenario

Let's look at an [example](https://github.com/IBM/ibm-watsonx-orchestrate-adk/tree/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate) which is a simple HR agent with three tools.

* [Agent](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/agent_tools/hr_agent.json)
* [Tools](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/agent_tools/tools.py)

```json
{
   "spec_version": "v1",
   "style": "default",
   "name": "hr_agent",
   "llm": "watsonx/meta-llama/llama-3-2-90b-vision-instruct",
   "description": "A HR Agent that can answer questions related to timeoff and holiday calendar",
   "instructions": "Use the tools provided to answer the user's question.  If you do not have enough information to answer the question, say so.  If you need more information, ask follow up questions.",
   "collaborators": [],
   "tools": [
      "get_assignment_id_hr_agent",
      "get_timeoff_schedule_hr_agent",
      "get_direct_reports_hr_agent"
   ]
}
```

The three tools only return some hardcoded data.

1. [get_assignment_id_hr_agent](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/agent_tools/tools.py#L6)
2. [get_timeoff_schedule_hr_agent](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/agent_tools/tools.py#L30)
3. [get_direct_reports_hr_agent](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/agent_tools/tools.py#L51)

Let's look at a sample conversation:

* User: I want to know my timeoff schedule for a certain period
* Agent: What is your username?
* User: nwaters
* [Agent invokes tool: get_assignment_id_hr_agent, args: username=nwaters]
* Agent: What is the start date of the timeoff schedule you want to know, in YYYY-MM-DD format?"
* User: 2025-01-01
* Agent: What is the end date of the timeoff schedule you want to know, in YYYY-MM-DD format?
* User: 2025-03-03
* [Agent invokes tool: get_timeoff_schedule_hr_agent, args: start_date=2025-01-01, end_date=2025-03-03, assignment_id=15778303]
* Agent: Your timeoff schedule for the period from 2025-01-01 to 2025-03-03 is on 2025-01-05.

## Ground Truth Datasets 

Evaluations require ground truth datasets. These datasets contain user stories, user input, sequences of tool invocations and final answers.

> Agent evaluation is driven by a user story, which provides all necessary context for the agent to perform tool-based tasks.

> A trajectory is a sequence of actions taken by an agent in response to a user query.

For the example above there are two test cases.

1. [data_simple](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/data_simple.json): 'I want to know my timeoff schedule for a certain period'
2. [data_complex](https://github.com/IBM/ibm-watsonx-orchestrate-adk/blob/65da0aba261cb65e3cc7cde44e85c4535409a82a/examples/evaluations/evaluate/data_complex.json): 'I want to know the timeoff schedule for my reports for a certain period'

Let's look at the simple case.

```json
{
    "agent": "hr_agent",
    "goals": {
        "get_assignment_id_hr_agent-1": [
            "get_timeoff_schedule_hr_agent-1"
        ],
        "get_timeoff_schedule_hr_agent-1": [
            "summarize"
        ]
    },
    "goal_details": [
        {
            "type": "tool_call",
            "name": "get_assignment_id_hr_agent-1",
            "tool_name": "get_assignment_id_hr_agent",
            "args": {
                "username": "nwaters"
            }
        },
        {
            "type": "tool_call",
            "name": "get_timeoff_schedule_hr_agent-1",
            "tool_name": "get_timeoff_schedule_hr_agent",
            "args": {
                "assignment_id": "15778303",
                "end_date": "2025-01-30",
                "start_date": "2025-01-01"
            }
        },
        {
            "name": "summarize",
            "type": "text",
            "response": "Your time off schedule is on January 5, 2025.",
            "keywords": [
                "January 5, 2025"
            ]
        }
    ],
    "story": "You want to know your time off schedule. Your username is nwaters. The start date is 2025-01-01. The end date is 2025-01-30.",
    "starting_sentence": "I want to know my time off schedule"
}
```

Under the goals section it can be defined which tools must be invoked before other tools. In the following example 'get_assignment_id_hr_agent-1' needs to be run before 'get_timeoff_schedule_hr_agent-1'.

```text
"get_assignment_id_hr_agent-1": [
  "get_timeoff_schedule_hr_agent-1"
]
```

The Python function expects the assignment id as input parameter.

```python
@tool(name="get_timeoff_schedule_hr_agent", description="get timeoff_schedule", permission=ToolPermission.ADMIN)
def get_timeoff_schedule_hr_agent(assignment_id: str, start_date: str, end_date: str) -> str:
...
```

The 'summarize' goals create the final answers.

## Running Evaluations

Once you have ground truth datasets the following command can be invoked to run the evaluations.

```bash
orchestrate evaluations evaluate -p ./examples/evaluations/evaluate -o ./debug --env-file .env-dev
```

The intermediate steps of the two test cases are displayed in the terminal.

![image](/assets/img/2025/07/agent-evaluations-01.png)

There is also a summary table. Note that RAG use cases (knowledge bases) can also be evaluated.

![image](/assets/img/2025/07/agent-evaluations-02.png)

You can also overwrite the configuration in a 'config.yml' file.

```
auth_config:
  tenant_name: local
  token: eyJhbxxx...
  url: http://localhost:4321
data_annotation_run: false
enable_manual_user_input: false
enable_verbose_logging: true
llm_user_config:
  model_id: meta-llama/llama-3-405b-instruct
  prompt_config: /Users/niklasheidloff/Desktop/orchestrate-adk/venv/lib/python3.13/site-packages/wxo_agentic_evaluation/prompt/llama_user_prompt.jinja2
  user_response_style: []
num_workers: 2
output_dir: ./debug
provider_config:
  model_id: meta-llama/llama-3-405b-instruct
  provider: watsonx
skip_available_results: false
test_paths:
- ./evals/ibm-watsonx-orchestrate-adk/examples/evaluations/evaluate
wxo_lite_version: 1.8.0
```

## Analyzing Results

While the simple test case worked, the complex one required an additional unnecessary tool invocation. 

The 'analyze' command brings up an easier way to read the results. Additionally, all results are stored in a 'debug' directory.

```bash
orchestrate evaluations analyze --data-path /Users/niklasheidloff/Desktop/orchestrate-adk/debug --env-file .env-dev
```

The first time the tool 'get_direct_reports_hr_agent' was invoked the username was missing. You could try to fix this by changing the prompts and tool descriptions or choosing other models.

![image](/assets/img/2025/07/agent-evaluations-03.png)

## Next Steps

To find out more, check out the following resources:

* [Watsonx Orchestrate Evaluation Framework](https://developer.watson-orchestrate.ibm.com/evaluate/overview)
* [Developer watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com)
* [Documentation watsonx Orchestrate](https://www.ibm.com/docs/en/watsonx/watson-orchestrate)