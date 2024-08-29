---
id: nh-082
title: 'Code Execution with the Bee Agent Framework'
date: 2024-08-27 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-082'
permalink: /article/bee-agentic-ai-code-execution/
custom_permalink:
    - article/bee-agentic-ai-code-execution/
image: /assets/img/2024/08/bee-containers.png
---

*LLM Agents and Function Calling are powerful techniques to build modern AI applications. IBM Research open sourced the Bee Agent Framework. This post describes how with this framework agents can generate Python code via LLMs and how this code can be executed in containers.*

IBM Research has open sourced a new agent framework, called [Bee Agent Framework](https://github.com/i-am-bee/bee-agent-framework).

> Open-source framework for building, deploying, and serving powerful agentic workflows at scale. The Bee framework makes it easy to build agentic workflows with leading proprietary and open-source models. We’re working on bringing model-agnostic support to any LLM to help developers avoid model provider lock-in and embrace the latest open-source LLMs.

Read my post [Simple Bee Agent Framework Example]({{ "/article/bee-agents-function-calling-watsonx.ai/" | relative_url }}) for an introduction.

To find out more about `Agents` and `Function Calling`, check out these resources.

* [bee-agent-framework](https://github.com/i-am-bee/bee-agent-framework)
* [Agents and Function Calling with watsonx.ai]({{ "/article/mixtral-agents-tools-multi-turn-sql/" | relative_url }})
* [HuggingFace Documentation: Tool use / function calling](https://huggingface.co/docs/transformers/main/en/chat_templating#advanced-tool-use--function-calling)
* [IBM Granite leads open-source LLMs on API calling](https://research.ibm.com/blog/granite-function-calling)

## Evolution of AI Systems

Single ```Large Language Models``` provide great capabilities, but when only prompted directly with user input, they can only return what they knew at the time of the pre-training.

Prompt engineering, few shot learning, chain of thought and other techniques improve results compared to raw user input only prompts. With RAG (Retrieval Augmented Generation) models can even handle information which was not known at training time.

Agents are the next step in the evolution of AI systems. Multiple specialized LLMs can work together. Additionally, they can even invoke tools to execute predefined code.

This post shows how LLMs can even generate code dynamically which is executed in containers. Personally, I think this is amazing!

## Overview

The example below is very simple but demonstrates how a language model can generate Python code which is executed in a container running with Podman. The LLM generates code to print the numbers from 1 to 10.

For security reasons the generated code is run in container sandboxes. This is important to ensure the code doesn't damage the overall AI application and the machine it is running on.

## Code

Here is the complete source code. Note the part where the agent is defined with the 'PythonTool'.

```
import "dotenv/config.js";
import { BeeAgent } from "@/agents/bee/agent.js";
import { createConsoleReader } from "../helpers/io.js";
import { FrameworkError } from "@/errors.js";
import { Logger } from "@/logger/logger.js";
import { UnconstrainedMemory } from "@/memory/unconstrainedMemory.js";
import { BaseMessage } from "@/llms/primitives/message.js";
import { WatsonXChatLLM } from "@/adapters/watsonx/chat.js";
import { WatsonXLLM } from "@/adapters/watsonx/llm.js";
import { PromptTemplate } from "@/template.js";
import { GenerateCallbacks } from "@/llms/base.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PythonTool } from "@/tools/python/python.js";
import { LocalPythonStorage } from "@/tools/python/storage.js";
const codeInterpreterUrl = process.env.CODE_INTERPRETER_URL;
console.log(codeInterpreterUrl)
const __dirname = dirname(fileURLToPath(import.meta.url));
const reader = createConsoleReader();
const logger = new Logger({ name: "app", level: "trace" });
const template = new PromptTemplate({
  variables: ["messages"],
  template: `{{#messages}}{{#system}}<|begin_of_text|><|start_header_id|>system<|end_header_id|>

{{system}}<|eot_id|>{{/system}}{{#user}}<|start_header_id|>user<|end_header_id|>

{{user}}<|eot_id|>{{/user}}{{#assistant}}<|start_header_id|>assistant<|end_header_id|>

{{assistant}}<|eot_id|>{{/assistant}}{{/messages}}<|start_header_id|>assistant<|end_header_id|>

`,
});
const llm = new WatsonXLLM({
  modelId: "meta-llama/llama-3-70b-instruct",
  projectId: process.env.WATSONX_PROJECT_ID,
  baseUrl: process.env.WATSONX_BASE_URL,
  apiKey: process.env.WATSONX_API_KEY,
  parameters: {
    decoding_method: "greedy",
    max_new_tokens: 500,
  },
});
const chatLLM = new WatsonXChatLLM({
  llm,
  config: {
    messagesToPrompt(messages: BaseMessage[]) {
      return template.render({
        messages: messages.map((message) => ({
          system: message.role === "system" ? [message.text] : [],
          user: message.role === "user" ? [message.text] : [],
          assistant: message.role === "assistant" ? [message.text] : [],
        })),
      });
    },
  },
});
const agent = new BeeAgent({
  llm: chatLLM,
  memory: new UnconstrainedMemory(),
  tools: [
    ...(codeInterpreterUrl
      ? [
          new PythonTool({
            codeInterpreter: { url: codeInterpreterUrl },
            storage: new LocalPythonStorage({
              interpreterWorkingDir: `${__dirname}/tmp/code_interpreter`,
              localWorkingDir: `${__dirname}/tmp/local`,
            }),
          }),
        ]
      : []),
  ],
});
try {
  let prompt = "Print the numbers from 1 to 10";
  console.info("Prompt: " + prompt);
  const response = await agent
    .run(
      { prompt },
      {
        execution: {
          maxRetriesPerStep: 3,
          totalMaxRetries: 10,
          maxIterations: 20,
        },
      },
    )
    .observe((emitter) => {
      emitter.on("start", () => {
        reader.write(`Agent 🤖 : `, "starting new iteration");
      });
      emitter.on("error", ({ error }) => {
        reader.write(`Agent 🤖 : `, FrameworkError.ensure(error).dump());
      });
      emitter.on("retry", () => {
        reader.write(`Agent 🤖 : `, "retrying the action...");
      });
      emitter.on("update", async ({ data, update, meta }) => {
        reader.write(`Agent (${update.key}) 🤖 : `, update.value);
      });
      emitter.match("*.*", async (data: any, event) => {
        if (event.creator === chatLLM) {
          const eventName = event.name as keyof GenerateCallbacks;
          switch (eventName) {
            case "start":
              console.info("LLM Input");
              console.info(data.input);
              break;
            case "success":
              console.info("LLM Output");
              console.info(data.value.raw.finalResult);
              break;
            case "error":
              console.error(data);
              break;
          }
        }
      });
    });
    reader.write(`Agent 🤖 : `, response.result.text);
} catch (error) {
  logger.error(FrameworkError.ensure(error).dump());
} finally {
  process.exit(0);
}
```

## Flow

Below is the complete execution flow. Note the part where the Python tool returns 'stdout' and 'stderr'.

```
Prompt: Print the numbers from 1 to 10
Agent 🤖 :  starting new iteration
LLM Input
[
  BaseMessage {
    role: 'system',
    text: 'You are a helpful assistant that uses tools to answer questions.\n' +
      '\n' +
      '# Tools\n' +
      '\n' +
      'Tools must be used to retrieve factual or historical information to answer the question.\n' +
      'A tool can be used by generating the following three lines:\n' +
      '\n' +
      'Tool Name: ZblorgColorLookup\n' +
      'Tool Caption: Searching Zblorg #178\n' +
      'Tool Input: {"id":178}\n' +
      '\n' +
      '## Available tools\n' +
      'Tool Name: Python\n' +
      "Tool Description: Run Python code and return the console output. Use for tasks that involve calculations, computations, or data manipulation.If files are created inside Python code, the user won't see them right away -- tool output will provide hashes of the created files, and the assistant must reference them using a Markdown link or image, by using the provided URN. To work with some files, you must specify them in the input schema; otherwise, the file will not be accessible.It is necessary to always print() results. Available libraries include numpy, pandas, scipy, matplotlib (but you have to save the plot as a file, showing does not work), but you can import any library and it will be installed for you.The execution state is not preserved -- each invocation is a new environment. Do not use this tool multiple times in a row, always write the full code you want to run in a single invocation.\n" +
      'Tool Input Schema: {"type":"object","properties":{"code":{"type":"string","minLength":1,"description":"full source code file in Python that will be executed"},"inputFiles":{"type":"object","properties":{},"additionalProperties":false,"description":"To access an existing file, you must specify it; otherwise, the file will not be accessible. IMPORTANT: If the file is not provided in the input, it will not be accessible.The key is the final segment of a file URN, and the value is the filename. Example: {\\"e6979b7bec732b89a736fd19436ec295f6f64092c0c6c0c86a2a7f27c73519d6\\":\\"file.txt\\"} -- the files will be available to the Python code in the working directory."}},"required":["code"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}\n' +
      '\n' +
      '\n' +
      '# Instructions\n' +
      '\n' +
      'Responses must always have the following structure:\n' +
      "- The user's input starts with 'Question: ' followed by the question the user asked, for example, 'Question: What is the color of Zblorg #178?'\n" +
      "  - The question may contain square brackets with a nested sentence, like 'What is the color of [The Zblorg with the highest score of the 2023 season is Zblorg #178.]?'. Just assume that the question regards the entity described in the bracketed sentence, in this case 'Zblorg #178'.\n" +
      "- Line starting 'Thought: ', explaining the thought, for example 'Thought: I don't know what Zblorg is, but given that I have a ZblorgColorLookup tool, I can assume that it is something that can have a color and I should use the ZblorgColorLookup tool to find out the color of Zblorg number 178.'\n" +
      "  - In a 'Thought', it is either determined that a Tool Call will be performed to obtain more information, or that the available information is sufficient to provide the Final Answer.\n" +
      '  - If a tool needs to be called and is available, the following lines will be:\n' +
      "    - Line starting 'Tool Name: ' name of the tool that you want to use.\n" +
      "    - Line starting 'Tool Caption: ' short description of the calling action.\n" +
      "    - Line starting 'Tool Input: ' JSON formatted input adhering to the selected tool JSON Schema.\n" +
      `    - Line starting 'Tool Output: ', containing the tool output, for example 'Tool Output: {"success": true, "color": "green"}'\n` +
      "      - The 'Tool Output' may or may not bring useful information. The following 'Thought' must determine whether the information is relevant and how to proceed further.\n" +
      '  - If enough information is available to provide the Final Answer, the following line will be:\n' +
      "    - Line starting 'Final Answer: ' followed by a response to the original question and context, for example: 'Final Answer: Zblorg #178 is green.'\n" +
      '      - Use markdown syntax for formatting code snippets, links, JSON, tables, images, files.\n' +
      '      - To reference an internal file, use the markdown syntax [file_name.ext](urn:file_identifier).\n' +
      '        - The bracketed part must contain the file name, verbatim.\n' +
      '        - The parenthesis part must contain the file URN, which can be obtained from the user or from tools.\n' +
      '        - The agent does not, under any circumstances, reference a URN that was not provided by the user or a tool in the current conversation.\n' +
      '        - To show an image, prepend an exclamation mark, as usual in markdown: ![file_name.ext](urn:file_identifier).\n' +
      '        - This only applies to internal files. HTTP(S) links must be provided as is, without any modifications.\n' +
      "- The sequence of lines will be 'Thought' - ['Tool Name' - 'Tool Caption' - 'Tool Input' - 'Tool Output' - 'Thought'] - 'Final Answer', with the bracketed part repeating one or more times (but never repeating them in a row). Do not use empty lines between instructions.\n" +
      "- Sometimes, things don't go as planned. Tools may not provide useful information on the first few tries. The agent always tries a few different approaches before declaring the problem unsolvable:\n" +
      "- When the tool doesn't give you what you were asking for, you MUST either use another tool or a different tool input.\n" +
      '  - When using search engines, the assistant tries different formulations of the query, possibly even in a different language.\n' +
      '- When executing code, the assistant fixes and retries when the execution errors out and tries a completely different approach if the code does not seem to be working.\n' +
      '  - When the problem seems too hard for the tool, the assistant tries to split the problem into a few smaller ones.\n' +
      '\n' +
      '## Notes\n' +
      '- Any comparison table (including its content), file, image, link, or other asset must only be in the Final Answer.\n' +
      "- When the question is unclear, respond with a line starting with 'Final Answer:' followed by the information needed to solve the problem.\n" +
      '- When the user wants to chitchat instead, always respond politely.\n' +
      "- IMPORTANT: Lines 'Thought', 'Tool Name', 'Tool Caption', 'Tool Input', 'Tool Output' and 'Final Answer' must be sent within a single message.\n",
    meta: undefined
  },
  BaseMessage {
    role: 'user',
    text: 'Question: Print the numbers from 1 to 10',
    meta: undefined
  }
]
> Agent (thought) 🤖 :  I can use the Python tool to print the numbers from 1 to 10.
Agent (tool_name) 🤖 :  Python
Agent (tool_caption) 🤖 :  Printing numbers from 1 to 10
LLM Output
{
  generated_text: 'Thought: I can use the Python tool to print the numbers from 1 to 10.\n' +
    'Tool Name: Python\n' +
    'Tool Caption: Printing numbers from 1 to 10\n' +
    'Tool Input: {"code": "for i in range(1, 11):\\n    print(i)"}\n' +
    'Tool Output:',
  generated_token_count: 2016,
  input_token_count: 1383,
  stop_reason: 'not_finished'
}
Agent (tool_input) 🤖 :  {"code": "for i in range(1, 11):\n    print(i)"}
Agent (tool_output) 🤖 :  The code exited with code 0.
stdout:
'''
1
2
3
4
5
6
7
8
9
10

'''

stderr:
'''

'''

No files were created or modified.
Agent 🤖 :  starting new iteration
LLM Input
[
  BaseMessage {
    [same one as above]
  },
  BaseMessage {
    [same one as above]
  },
  BaseMessage {
    role: 'assistant',
    text: 'Thought: I can use the Python tool to print the numbers from 1 to 10.\n' +
      'Tool Name: Python\n' +
      'Tool Caption: Printing numbers from 1 to 10\n' +
      'Tool Input: {"code":"for i in range(1, 11):\\n    print(i)"}\n' +
      'Tool Output: The code exited with code 0.\n' +
      'stdout:\n' +
      '```\n' +
      '1\n' +
      '2\n' +
      '3\n' +
      '4\n' +
      '5\n' +
      '6\n' +
      '7\n' +
      '8\n' +
      '9\n' +
      '10\n' +
      '\n' +
      '```\n' +
      '\n' +
      'stderr:\n' +
      '```\n' +
      '\n' +
      '```\n' +
      '\n' +
      'No files were created or modified.\n',
    meta: { success: true }
  }
]
LLM Output
{
  generated_text: 'Final Answer: The numbers from 1 to 10 are: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
  generated_token_count: 990,
  input_token_count: 1496,
  stop_reason: 'eos_token'
}
Agent (final_answer) 🤖 :  The numbers from 1 to 10 are: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.
Agent 🤖 :  The numbers from 1 to 10 are: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.
```

## Start Containers

There is a script to start the two containers. Either Docker or Podman is required with compose.

```bash
git clone git@github.com:i-am-bee/bee-agent-framework
corepack yarn install
# start Podman or Docker
corepack yarn run infra:start-code-interpreter
# get the port and define it in .env
```

The [source code](https://github.com/i-am-bee/bee-agent-framework/blob/9cff03219f100d7b633c715095abe625e1c84944/src/tools/python/python.ts#L44-L48) describes how Python code should be implemented/generated:

* Run Python code and return the console output. Use for tasks that involve calculations, computations, or data manipulation.
* If files are created inside Python code, the user won't see them right away -- tool output will provide hashes of the created files, and the assistant must reference them using a Markdown link or image, by using the provided URN.
* To work with some files, you must specify them in the input schema; otherwise, the file will not be accessible.
* It is necessary to always print() results. Available libraries include numpy, pandas, scipy, matplotlib (but you have to save the plot as a file, showing does not work), but you can import any library and it will be installed for you.
* The execution state is not preserved -- each invocation is a new environment. Do not use this tool multiple times in a row, always write the full code you want to run in a single invocation.

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.