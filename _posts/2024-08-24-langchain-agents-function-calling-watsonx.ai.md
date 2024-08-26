---
id: nh-079
title: 'Agents and Function Calling with watsonx.ai'
date: 2024-08-24 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-079'
permalink: /article/langchain-agents-function-calling-watsonx.ai/
custom_permalink:
    - article/langchain-agents-function-calling-watsonx.ai/
image: /assets/img/2024/08/langchain-watsonxai.png
---

*LLM Agents and Function Calling are powerful techniques to build modern AI applications. This post describes a sample how to use Langchain agents, custom Python functions and LLM models on watsonx.ai.*

Definition of agents from Langchain:

> The core idea of agents is to use a language model to choose a sequence of actions to take. In chains, a sequence of actions is hardcoded (in code). In agents, a language model is used as a reasoning engine to determine which actions to take and in which order.

To find out more about `Agents` and `Function Calling`, check out these resources.

* [Mixtral Agents with Tools for Multi-turn Conversations]({{ "/article/mixtral-agents-tools-multi-turn-sql/" | relative_url }})
* [HuggingFace Documentation: Tool use / function calling](https://huggingface.co/docs/transformers/main/en/chat_templating#advanced-tool-use--function-calling)
* [LangChain Agents](https://python.langchain.com/v0.1/docs/modules/agents/)
* [LangChain watsonx.ai](https://python.langchain.com/v0.2/docs/integrations/llms/ibm_watsonx/)
* [Create a LangChain AI Agent in Python using watsonx](https://developer.ibm.com/tutorials/awb-create-langchain-ai-agent-python-watsonx/)
* [Sample Code](https://github.com/thomassuedbroecker/agent-tools-langchain-watsonx)
* [IBM Granite leads open-source LLMs on API calling](https://research.ibm.com/blog/granite-function-calling)

## Example Scenario

In the following example scenario users can ask weather related questions to find out temperatures, but also to compare temperatures.

Example user input: Which city is hotter today: LA or NY?

To implement this scenario, an agent is used which leverages Mixtral running on watsonx.ai and a Python function which reads weather information via a REST API.

## Step 1 - First LLM Invocation

The initial prompt demonstrates how to configure the agent. Note the definitions of the function, the JSON format and the Final Answer part.

With this prompt the agent calls the model for the first time.

Note: Because of encoding issues, you need to replace `'''` in the snippets below with three backticks.

Prompt:
```
System: Respond to the human as helpfully and accurately as possible. You have access to the following tools: 

weather_service(cities: List[str]) -> str - weather service provides all of the weather needs and information in that api, it serves weather information.
Args:
   cities: The parameter cities is a list e.g. [LA, NY]., args: {'cities': {'title': 'Cities', 'type': 'array', 'items': {'type': 'string'}}}

Use a json blob to specify a tool by providing an action key (tool name) and an action_input key (tool input).
Valid \"action\" values: \"Final Answer\" or weather_service
Provide only ONE action per $JSON_BLOB, as shown:\"
'''
{
    \"action\": $TOOL_NAME,
    \"action_input\": $INPUT
}
'''

Follow this format:
Question: input question to answer
Thought: consider previous and subsequent steps
Action:
'''
$JSON_BLOB
'''
Observation: action result
... (repeat Thought/Action/Observation N times)
Thought: I know what to respond
Action:
'''
{
    \"action\": \"Final Answer\",
    \"action_input\": \"Final response to human\"
}
'''
Begin! Reminder to ALWAYS respond with a valid json blob of a single action.
Respond directly if appropriate. Format is Action:```$JSON_BLOB```then Observation
Human: Which city is hotter today: LA or NY?
(reminder to always respond in a JSON blob)
```

## Step 2 - First LLM Response

As result the model can not provide an answer yet which is why it returns the action definition, so that the agent knows what to do next. In this case the Python function 'weather_service' is invoked.

```
Action:
'''
{
    \"action\": \"weather_service\",
    \"action_input\": {
        \"cities\": [\"LA\", \"NY\"]
    }
}
'''
```

## Step 3 - Python Tool

The Python function returns the temperatures of both cities.

```
Entering Tool run with input: "{'cities': ['LA', 'NY']}"
[{'city': 'NY', 'temperature': '15'}, {'city': 'LA', 'temperature': '11'}]
"The hottest city is NY with a temperature or 15 degrees Celsius. In the city LA the temperature is 11 degrees Celsius."
```

## Step 4 - Second LLM Invocation

The outcome of the function is simply appended to the initial prompt and the model is invoked the second time.

Prompt:
```
[beginning is the same as above in step 1]
...

Begin! Reminder to ALWAYS respond with a valid json blob of a single action.
Respond directly if appropriate. Format is Action:```$JSON_BLOB```then Observation
Human: Which city is hotter today: LA or NY?

Action:
'''
{
    \"action\": \"weather_service\",
    \"action_input\": {
        \"cities\": [\"LA\", \"NY\"]
    }
}
'''
Observation
Observation:  The hottest city is NY with a temperature or 15 degrees Celsius. In the city LA the temperature is 11 degrees Celsius.
(reminder to always respond in a JSON blob)
```

## Step 5 - Second LLM Response

This time the model can provide the final answer.

```
I know the answer to the user's question.
Action:
'''
{
    \"action\": \"Final Answer\",
    \"action_input\": \"NY is hotter today with a temperature of 15 degrees Celsius, while LA has a temperature of 11 degrees Celsius.\"
}
'''
```

## Code

This snippet shows how to implement the function. Via the annotation the agent knows to add this function as a tool to the prompt.

```python
@tool
def weather_service(cities: List[str]) -> str:
     """weather service provides all of the weather needs and information in that api
     Args:
            cities: The parameter cities is a list e.g. [LA, NY].
     """
     ...
```

The next snippet shows how to connect to watsonx.ai.

```python
from langchain_ibm import WatsonxLLM
watsonx_client = WatsonxLLM(
    model_id="mistralai/mixtral-8x7b-instruct-v01",
    url="https://eu-de.ml.cloud.ibm.com",
    project_id=environment['project_id'],
    apikey= environment['apikey'],
    params=parameters
)
```

The full code is available on GitHub and documented in the resources at the top of this article.

```python
from langchain.prompts import PromptTemplate
from langchain_core.tools import tool
from langchain.agents import AgentExecutor

prompt = PromptTemplate.from_template(system_prompt_load())
simple_chain = prompt | watsonx_client
response = simple_chain.invoke({"question": "Which city is hotter today: LA or NY?"})
tools = [weather_service]
agent_system_prompt = load_agent_system_prompt()
human_prompt = load_human_prompt()
agent_chat_prompt = ChatPromptTemplate.from_messages(
[
    ("system", agent_system_prompt),
    MessagesPlaceholder("chat_history", optional=True),
    ("human", human_prompt),
]
)
agent_chat_incl_tools_prompt = agent_chat_prompt.partial(
tools=render_text_description_and_args(list(tools)),
tool_names=", ".join([t.name for t in tools]),
)
memory = ConversationBufferMemory()
agent_chain = ( RunnablePassthrough.assign(
    agent_scratchpad=lambda x: format_log_to_str(x["intermediate_steps"]),
    chat_history=lambda x: memory.chat_memory.messages,
)
| agent_chat_incl_tools_prompt |watsonx_client | JSONAgentOutputParser()
)
agent_executor = AgentExecutor(agent=agent_chain, tools=tools, handle_parsing_errors=True, verbose=True, memory=memory)
results = []
response = agent_executor.invoke({"input":"Which city is hotter today: LA or NY?"})
```

When developing agents, it's important to understand what the agents do. For Langchain agents enable debugging.

```python
from langchain.globals import set_debug
set_debug(True)
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.