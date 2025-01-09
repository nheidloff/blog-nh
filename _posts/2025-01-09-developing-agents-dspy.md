---
id: nh-103
title: 'Developing Agents with DSPy'
date: 2025-01-09 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-103'
permalink: /article/developing-agents-dspy/
custom_permalink:
    - article/developing-agents-dspy/
image: /assets/img/2025/01/dspy-1.png
---

*DSPy is a Python-based open-source framework from Stanford university. Developers can write code to build compound systems, for example agents.*

> DSPy is the framework for programming—rather than prompting—language models. It allows you to iterate fast on building modular AI systems and offers algorithms for optimizing their prompts and weights, whether you're building simple classifiers, sophisticated RAG pipelines, or Agent loops. DSPy stands for Declarative Self-improving Python.

[DSPy](https://github.com/stanfordnlp/dspy) offers advanced ways to optimize prompts and even to fine-tune smaller models with bigger models. This post only focusses on how to write simple agents.

## Model

There are various ways to access Large Language Models. Below I run Granite locally via Ollama.

```bash
ollama run granite3.1-dense:8b
```

```python
import dspy
lm = dspy.LM('ollama_chat/granite3.1-dense:8b', api_base='http://localhost:11434', api_key='')
dspy.configure(lm=lm)
lm(messages=[{"role": "user", "content": "Which model are you?"}])
```

```text
["I am Ganite, an AI model developed by IBM Research, a research organization spread across the globe. My design is based on the principles of transparency, fairness, robustness, and explainability in AI systems. I'm here to assist with information up until April 2024."]
```

## Example Agent

The following snippet is the complete implementation of an agent. An answer is supposed to be provided for a question that requires a search in a database and some math calculation. These two functions are defined as tools for the agent.

ReAct is used to get the model to 'think' first. ReAct defines a signature with the expected input which is the question and the expected output which is a float.

The last two lines print out the result and the intermediate steps.

```python
def evaluate_math(expression: str):
    return dspy.PythonInterpreter({}).execute(expression)

def search_wikipedia(query: str):
    results = dspy.ColBERTv2(url='http://20.102.90.50:2017/wiki17_abstracts')(query, k=3)
    return [x['text'] for x in results]

react = dspy.ReAct("question -> answer: float", tools=[evaluate_math, search_wikipedia])

pred = react(question="What is 9362158 divided by the year of birth of David Gregory of Kinnairdy castle?")
print(pred.answer)
lm.inspect_history(n=10)
```

## Flow

The following text describes the flow:

1. A default prompt is used that defines input and output fields as well as how to handle reasoning and tools
2. The user question is added
3. The agent determines to look up information in the search system. Note that the query is not the complete question, but contains only the key terms that are needed
4. The agent sees that it found the relevant data
5. The agent invokes that math tool
6. The agent returns the right answer

```text
System message:

Your input fields are:
1. `question` (str)
2. `trajectory` (str)

Your output fields are:
1. `next_thought` (str)
2. `next_tool_name` (Literal[evaluate_math, search_wikipedia, finish])
3. `next_tool_args` (dict[str, Any])

All interactions will be structured in the following way, with the appropriate values filled in.

[[ ## question ## ]]
{question}

[[ ## trajectory ## ]]
{trajectory}

[[ ## next_thought ## ]]
{next_thought}

[[ ## next_tool_name ## ]]
{next_tool_name}        # note: the value you produce must be one of: evaluate_math; search_wikipedia; finish

[[ ## next_tool_args ## ]]
{next_tool_args}        # note: the value you produce must be pareseable according to the following JSON schema: {"type": "object"}

[[ ## completed ## ]]

In adhering to this structure, your objective is: 
        Given the fields `question`, produce the fields `answer`.
        
        You will be given `question` and your goal is to finish with `answer`.
        
        To do this, you will interleave Thought, Tool Name, and Tool Args, and receive a resulting Observation.
        
        Thought can reason about the current situation, and Tool Name can be the following types:
        
        (1) evaluate_math. It takes arguments {'expression': 'str'} in JSON format.
        (2) search_wikipedia. It takes arguments {'query': 'str'} in JSON format.
        (3) finish, whose description is <desc>Signals that the final outputs, i.e. `answer`, are now available and marks the task as complete.</desc>. It takes arguments {} in JSON format.


User message:

[[ ## question ## ]]
What is 9362158 divided by the year of birth of David Gregory of Kinnairdy castle?

[[ ## trajectory ## ]]
[[ ## thought_0 ## ]]
First, I need to find out the year of birth of David Gregory of Kinnairdy castle. Then, I will divide 9362158 by that number.

[[ ## tool_name_0 ## ]]
search_wikipedia

[[ ## tool_args_0 ## ]]
{"query": "David Gregory of Kinnairdy castle year of birth"}

[[ ## observation_0 ## ]]
[1] «David Gregory (physician) | David Gregory (20 December 1625 – 1720) was a Scottish physician and inventor. His surname is sometimes spelt as Gregorie, the original Scottish spelling. He inherited Kinnairdy Castle in 1664. Three of his twenty-nine children became mathematics professors. He is credited with inventing a military cannon that Isaac Newton described as "being destructive to the human species". Copies and details of the model no longer exist. Gregory's use of a barometer to predict farming-related weather conditions led him to be accused of witchcraft by Presbyterian ministers from Aberdeen, although he was never convicted.»
[2] «David Gregory (footballer, born 1970) | Born in Polstead, Gregory began his career at Ipswich Town, making 32 appearances between 1987–1995. He made two appearances on loan at Hereford United and three appearances at Peterborough United after leaving Ipswich. He joined Colchester United in 1995 and spent seven years at Layer Road, making 226 league appearances and scoring 19 goals. Gregory helped the U's to their first league promotion for 22 years in 1998 when he stepped up to put Colchester ahead from the spot in the Third Division playoff final. Gregory made history along with Neil as the first pair of brothers in a play-off final in the same match. His brother Neil joined the U's in 1998 and played alongside David until 2000. Gregory featured regularly in the first team until he cracked a bone in his foot playing against Port Vale in March 2002 and failed to recover fitness by the summer break. He again teamed up with his brother Neil at Canvey Island in July 2002.»
[3] «David Gregory (footballer, born 1951) | David Harry Gregory (born 6 October 1951) is an English former footballer who played in the Football League for Blackburn Rovers, Bury, Peterborough United, Portsmouth, Stoke City and Wrexham.»

[[ ## thought_1 ## ]]
The year of birth of David Gregory of Kinnairdy castle is 1625. Now I will divide 9362158 by this number.

[[ ## tool_name_1 ## ]]
evaluate_math

[[ ## tool_args_1 ## ]]
{"expression": "9362158 / 1625"}

[[ ## observation_1 ## ]]
5761.328

Respond with the corresponding output fields, starting with the field `[[ ## next_thought ## ]]`, then `[[ ## next_tool_name ## ]]` (must be formatted as a valid Python Literal[evaluate_math, search_wikipedia, finish]), then `[[ ## next_tool_args ## ]]` (must be formatted as a valid Python dict[str, Any]), and then ending with the marker for `[[ ## completed ## ]]`.


Response:

[[ ## next_thought ## ]]
The result of 9362158 divided by the year of birth of David Gregory of Kinnairdy castle is approximately 5761.328.

[[ ## next_tool_name ## ]]
finish

[[ ## next_tool_args ## ]]
{}

[[ ## completed ## ]]
```

## Setup

The [setup](https://dspy.ai/#__tabbed_1_6) is straight forward and well documented. For the simple demos (without optimization) I run a notebook in Visual Studio code with a virtual environment.

![image](/assets/img/2025/01/dspy-2.png)

## Next Steps

Check out [DSPy](https://dspy.ai/#__tabbed_1_6) to learn more. I like the following two videos which contain lots of demos.

* [Video 1](https://www.youtube.com/watch?v=41EfOY0Ldkc)
* [Video 2](https://www.youtube.com/watch?v=_ROckQHGHsU)