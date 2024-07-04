---
id: nh-066
title: 'Mixtral Agents with Tools for Multi-turn Conversations'
date: 2024-02-28 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-066'
permalink: /article/mixtral-agents-tools-multi-turn-sql/
custom_permalink:
    - article/mixtral-agents-tools-multi-turn-sql/
image: /assets/img/2024/02/mixtral-tools.png
---

*Larger `Large Language Models` like ChatGPT can be prompted to behave as agents for specific use cases. They can return output in certain formats, and they can return instructions to invoke code. This post explains how to build agents for multi-turn conversations with the smaller, but very powerful Mixtral model which can even be run on-premises.*

Let's look at the definitions of [LLM Agents](https://www.promptingguide.ai/research/llm-agents) and [Tools](https://python.langchain.com/docs/modules/agents/tools/).

> LLM based agents [...] can execute complex tasks through the use of an architecture that combines LLMs with key modules like planning and memory. When building LLM agents, an LLM serves as the main controller or "brain" that controls a flow of operations needed to complete a task or user request. The LLM agent may require key modules such as [...] tool usage.

> Tools are interfaces that an agent can use to interact with the world. [...] The name, description, and JSON schema can be used to prompt the LLM so it knows how to specify what action to take.

## Background

Defining agents just by using prompts is amazing. Until recently many people thought that this only works for the really large LLMs. While I haven't done extensive testing yet, this also seems to work for Mixtral. The example below is based on the following resources:

* [Function Calling with Mistral AI](https://www.youtube.com/watch?v=eOo4GfHj3ZE)
* [Mixtral when being used as an Agent](https://github.com/pinecone-io/examples/blob/master/learn/generation/llm-field-guide/mistral-ai/mixtral-8x7b/00-mixtral-8x7b-agent.ipynb)
* [Mixtral Model Card](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1)

## Scenario

The example shows how to implement multi-turn conversations where users ask questions via natural language and an assistant translates the queries into SQL statements which can be run against relational databases to find specific data.

There are many LLMs that have been fine-tuned to generate SQL statements. For example, [sqlcoder-7b-2](https://huggingface.co/defog/sqlcoder-7b-2) shows better results than ChatGPT. However, these optimized LLMs often can only handle single questions.

For chat experiences it's also desirable to allow follow-up questions, for example to filter the previous results. Assistants might also want to ask for more information from users, if they are not confident to be able to generate good SQL statements.

## JSON Output

The first decoder based LLMs typically returned plain text with the next predicted tokens. To leverage LLMs for multi-turn conversations, often additional orchestration logic in applications is required. Based on the generated LLM output, applications need to understand the state of the conversation and what to do next.

* Has the intent of the user been fulfilled?
* Is additional user input required?
* Does business logic, for example data retrieval, have to be run first before the conversation can be continued?

Rather than having to parse plain text, modern LLMs can return this information as structured data, e.g. as JSON. This makes the implementation of the orchestration application much easier.

## Prompt

To implement agents, the right prompts need to be used. The following example shows how to build a multi-turn conversations assistant which can generate SQL statements based on natural user input and database schemas. The same concept can be leveraged for many other scenarios.

There are three tools which the agent returns with well-defined JSON. 'Final Answer' contains SQL which can be invoked by the application. The other two tools indicate the state of the conversation so that the application can decide how to proceed.

Note: Because of encoding issues, you need to replace `'''` in the snippets below with three backticks.

```text
<s> [INST] You are a helpful AI assistant which creates SQL statements. You are an agent capable of using a variety of tools to answer a question. Here are a few of the tools available to you:

- Final Answer: The final answer tool must be used to respond to the user. You must use this when you have decided on an answer. The final answer must contain valid SQL for the SCHEMA defined below. 
- Refiner: The refiner tool should be used if the user has not provided enough information. 
- Conversation Starter: The conversation starter tool should be used when the user requests to reset the conversation and to remove the conversation history.

SCHEMA:
CREATE TABLE [Employee]
(
    [EmployeeId] INTEGER  NOT NULL,
    [LastName] NVARCHAR(20)  NOT NULL,
    [FirstName] NVARCHAR(20)  NOT NULL,
    [HireDate] DATETIME
);

To use these tools you must always respond in JSON format containing `"tool_name"` and `"input"` key-value pairs. For example, to answer the question, "Show me things I am interested in" you must use the refiner tool like so:

'''json
{
    "tool_name": "Refiner",
    "input": "Please provide more information."
}
'''

Remember, even when answering to the user, you must still use this JSON format! 

'''json
{
    "tool_name": "Final Answer",
    "input": "SELECT * FROM Customers;",
    "confidence": "5" // from 0 to 10
}
'''

Users might want to ask for another SQL statement by starting the conversation from scratch.

'''json
{
    "tool_name": "Conversation Starter",
    "input": "I understood that you want to create a new SQL statement. Please define your request."
}
'''

Let's get started. The user's query is as follows. [/INST]

User: How many employees are there?

Assistant: '''json
{
    "tool_name": "
```

## Use Cases

Based on the same prompt different use cases are covered.

**Use Case 1**

The first use case shows the happy path. A user asks a question and gets immediately back a good answer with a SQL statement.

```text
User: How many employees are there?

Assistant: '''json
{
    "tool_name": "Final Answer",
    "input": "SELECT COUNT(*) FROM [Employee];",
    "confidence": "9"
}
'''
```

**Use Case 2**

The next use case shows how users can refine their queries.

```text
User: How many employees are there?

Assistant: '''json
{
    "tool_name": "Final Answer",
    "input": "SELECT COUNT(*) FROM [Employee];",
    "confidence": "9"
}
'''

User: How many of them were hired last year?

Assistant: '''json
{
    "tool_name": "Final Answer",
    "input": "SELECT COUNT(*) FROM [Employee] WHERE YEAR(HireDate) = YEAR(GETDATE()) AND MONTH(HireDate) >= 1 AND MONTH(HireDate) <= 12;",
    "confidence": "9"
}
'''
```

**Use Case 3**

The assistant does not always return the right SQL statements initially. This could be discovered by the application by quering the database. The assistant could be asked to provide better SQL statements. Alternatively the application might invoke a second model specialized on SQL generation or even a fine-tuned model for specific schemas.

```text
User: How many employees are there?

Assistant: '''json
{
    "tool_name": "Final Answer",
    "input": "SELECT COUNT(*) FROM [NonExistingTable];",
    "confidence": "3"
}
'''

User: This is not correct. Please fix it.

Assistant: '''json
{
    "tool_name": "Final Answer",
    "input": "SELECT COUNT(*) FROM [Employee];",
    "confidence": "10"
}
'''
```

**Use Case 4**

In natural conversations users could also ask questions which are not relevant. As response assistants need to generate answers to ask for more specific relevant input.

```text
User: How is the weather?

Assistant: '''json
{
    "tool_name": "Refiner",
    "input": "I'm sorry for the confusion, but I can only help with SQL queries using the provided schema. The weather information is not available in the schema. Please provide a SQL query or a related request."
}
'''
```

**Use Case 5**

In natural conversations users could also provide input which is not sufficient. In this case assistants could request more information.

```text
User: Show the top 10

Assistant: '''json
{
    "tool_name": "Refiner",
    "input": "Top 10 of what? I need more information to generate the correct SQL statement."
}
'''
```

**Use Case 6**

Sometimes users might want to generate a second SQL statement. Via the 'Conversation Starter' tool applications can reset the conversation by deleting the previous conversation flow.

```text
User: How many employees are there?

Assistant: '''json
{
    "tool_name": "Final Answer",
    "input": "SELECT COUNT(*) FROM [Employee];",
    "confidence": "9"
}
'''

User: Let's try another scenario.

Assistant: '''json
{
    "tool_name": "Conversation Starter",
    "input": "I understood that you want to create a new SQL scenario. Please define your request."
}
'''
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.