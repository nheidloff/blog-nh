---
id: nh-081
title: 'Simple Bee Agent Framework Example'
date: 2024-08-27 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-081'
permalink: /article/bee-agents-function-calling-watsonx.ai/
custom_permalink:
    - article/bee-agents-function-calling-watsonx.ai/
image: /assets/img/2024/08/bee.png
---

*LLM Agents and Function Calling are powerful techniques to build modern AI applications. This post describes a simple example how to use agents and tools with LLM models on watsonx.ai via the new Bee agent framework from IBM Research.*

IBM Research has open sourced a new agent framework, called [Bee Agent Framework](https://github.com/i-am-bee/bee-agent-framework).

> Open-source framework for building, deploying, and serving powerful agentic workflows at scale. The Bee framework makes it easy to build agentic workflows with leading proprietary and open-source models. We’re working on bringing model-agnostic support to any LLM to help developers avoid model provider lock-in and embrace the latest open-source LLMs.

My favorite feature of this framework are the ```Observability``` and ```Traceability``` capabilities. The complete flow is transparent which helps developers a lot to understand what is going on. Most other agent frameworks do not provide this.

The framework is based on TypeScript/JavaScript. Tools can also be developed in Python and run in a container.

I will blog more about this framework. For now, I want to describe a first example as an appetizer.

To find out more about `Agents` and `Function Calling`, check out these resources.

* [Agents and Function Calling with watsonx.ai]({{ "/article/mixtral-agents-tools-multi-turn-sql/" | relative_url }})
* [bee-agent-framework](https://github.com/i-am-bee/bee-agent-framework)
* [HuggingFace Documentation: Tool use / function calling](https://huggingface.co/docs/transformers/main/en/chat_templating#advanced-tool-use--function-calling)
* [IBM Granite leads open-source LLMs on API calling](https://research.ibm.com/blog/granite-function-calling)

## Example Scenario

In the following example scenario users can ask for weather information. The agent uses a tool to invoke a REST API to get the weather data.

Local models can be utilized, for example with Ollama. The example below leverages llama-3-70b-instruct running on watsonx.ai for a better performance/quality.

## Code

Here is the complete code of the sample. The first part shows the agent definition and invocation, the last part shows how to enable tracing.

```typescript
import "dotenv/config.js";
import { BeeAgent } from "@/agents/bee/agent.js";
import { createConsoleReader } from "../helpers/io.js";
import { FrameworkError } from "@/errors.js";
import { Logger } from "@/logger/logger.js";
import { OpenMeteoTool } from "@/tools/weather/openMeteo.js";
import { UnconstrainedMemory } from "@/memory/unconstrainedMemory.js";
import { BaseMessage } from "@/llms/primitives/message.js";
import { WatsonXChatLLM } from "@/adapters/watsonx/chat.js";
import { WatsonXLLM } from "@/adapters/watsonx/llm.js";
import { PromptTemplate } from "@/template.js";
import { GenerateCallbacks } from "@/llms/base.js";

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
    new OpenMeteoTool()
  ]
});
const reader = createConsoleReader();
try {
  let prompt = "How is the current weather in Las Vegas?";
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

## Traceability

The framework has great observability features. Let's look at the flow.

**First LLM Input**

Users can ask questions like "How is the current weather in Las Vegas?" which triggers the first LLM invocation with a prompt that defines how to handle function calling.

```
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
      'Tool Name: OpenMeteo\n' +
      'Tool Description: Retrieves current, previous, or upcoming weather for a given destination.\n' +
      'Tool Input Schema: {"type":"object","properties":{"location":{"anyOf":[{"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"}},"required":["latitude","longitude"],"additionalProperties":false},{"type":"object","properties":{"name":{"type":"string","minLength":1},"language":{"type":"string","default":"English"}},"required":["name"],"additionalProperties":false}]},"elevation":{"type":["number","null"]},"timezone":{"type":"string"},"start_date":{"anyOf":[{"type":"string","format":"date","description":"Date Format: YYYY-MM-DD (omit the field for the current date)"},{"type":"null"}],"description":"Date Format: YYYY-MM-DD (omit the field for the current date)"},"end_date":{"anyOf":[{"type":"string","format":"date","description":"Date Format: YYYY-MM-DD (omit the field for the current date)"},{"type":"null"}],"description":"Date Format: YYYY-MM-DD (omit the field for the current date)"},"forecast_days":{"type":"integer","minimum":0,"maximum":16,"default":7},"past_days":{"type":"integer","minimum":0,"maximum":92,"default":0},"temperature_unit":{"type":"string","enum":["celsius","fahrenheit"],"default":"celsius"}},"required":["location","timezone"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}\n' +
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
  }
  BaseMessage {
    role: 'user',
    text: 'Question: How is the current weather in Las Vegas?',
    meta: undefined
  }
```

**First LLM Output**

Since the LLM cannot answer the question, it returns an instruction to invoke the weather tool.

```
> Agent (thought) 🤖 :  I need to find out the current weather in Las Vegas. I have an OpenMeteo tool that can provide me with weather information for a given location.

Agent (tool_name) 🤖 :  OpenMeteo
Agent (tool_caption) 🤖 :  Retrieving current weather in Las Vegas
LLM Output
{
  generated_text: 'Thought: I need to find out the current weather in Las Vegas. I have an OpenMeteo tool that can provide me with weather information for a given location.\n' +
    '\n' +
    'Tool Name: OpenMeteo\n' +
    'Tool Caption: Retrieving current weather in Las Vegas\n' +
    'Tool Input: {"location":{"name":"Las Vegas","language":"English"},"timezone":"","elevation":null,"start_date":null,"end_date":null,"forecast_days":7,"past_days":0,"temperature_unit":"celsius"}\n' +
    '\n' +
    'Tool Output: {',
  generated_token_count: 5565,
  input_token_count: 1317,
  stop_reason: 'not_finished'
}
```

**Tool Input and Output**

This example leverages a built-in tool. Alternatively you can write custom tools with JavaScript or Python.

```
> Agent (tool_input) 🤖 :  {"location":{"name":"Las Vegas","language":"English"},"timezone":"","elevation":null,"start_date":null,"end_date":null,"forecast_days":7,"past_days":0,"temperature_unit":"celsius"}

> Agent (tool_output) 🤖 :  {"latitude":36.16438,"longitude":-115.14392,"generationtime_ms":0.20492076873779297,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":609,"current_units":{"time":"iso8601","interval":"seconds","temperature_2m":"°C","rain":"mm","apparent_temperature":"°C"},"current":{"time":"2024-08-28T06:15","interval":900,"temperature_2m":28.3,"rain":0,"apparent_temperature":23.9},"hourly_units":{"time":"iso8601","temperature_2m":"°C","relative_humidity_2m":"%","apparent_temperature":"°C"},"
...]}}
```

**Second LLM Input**

Next the LLM is invoked the second time. The original messages are passed in again plus a new message with the output of the tool.

```
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
    text: 'Thought: I need to find out the current weather in Las Vegas. I have an OpenMeteo tool that can provide me with weather information for a given location.\n' +
      '\n' +
      'Tool Name: OpenMeteo\n' +
      'Tool Caption: Retrieving current weather in Las Vegas\n' +
      'Tool Input: {"location":{"name":"Las Vegas","language":"English"},"timezone":"","elevation":null,"start_date":null,"end_date":null,"forecast_days":7,"past_days":0,"temperature_unit":"celsius"}\n' +
      'Tool Output: {"latitude":36.16438,"longitude":-115.14392,"generationtime_ms":0.20492076873779297,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":609,"current_units":{"time":"iso8601","interval":"seconds","temperature_2m":"°C","rain":"mm","apparent_temperature":"°C"},"current":{"time":"2024-08-28T06:15","interval":900,"temperature_2m":28.3,"rain":0,"apparent_temperature":23.9},"
      ..."]}}\n',
    meta: { success: true }
  }
]
```

**Second LLM Output**

Now the LLM has all relevant information and can answer the question.

```
LLM Output
{
  generated_text: 'Thought: I have received the current weather information for Las Vegas from the OpenMeteo tool. According to the output, the current temperature is 28.3°C, and the apparent temperature is 23.9°C. There is no rain currently.\n' +
    '\n' +
    'Final Answer: The current weather in Las Vegas is 28.3°C with an apparent temperature of 23.9°C, and there is no rain.',
  generated_token_count: 3655,
  input_token_count: 5350,
  stop_reason: 'eos_token'
}
> Agent (thought) 🤖 :  I have received the current weather information for Las Vegas from the OpenMeteo tool. According to the output, the current temperature is 28.3°C, and the apparent temperature is 23.9°C. There is no rain currently.

> Agent (final_answer) 🤖 :  The current weather in Las Vegas is 28.3°C with an apparent temperature of 23.9°C, and there is no rain.
Agent 🤖 :  The current weather in Las Vegas is 28.3°C with an apparent temperature of 23.9°C, and there is no rain.
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.