---
id: nh-106
title: 'Observability for Agents via the Bee Agent Framework'
date: 2025-02-17 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-106'
permalink: /article/bee-observability/
custom_permalink:
    - article/bee-observability/
image: /assets/img/2025/02/bee-mlflow-1.png
---

*The Bee Agent Framework is an open-source project for building, deploying, and serving powerful multi-agent workflows at scale. One of its strengths is observability. While other frameworks require additional commercial offerings, the Bee Agent Framework provides transparency to help developers to understand the execution flows.*

Let's look at an example. The agent can answer questions like this one:

"What is the best vacation city in Europe, and can you tell me the current temperature in this city?"

The agent has two tools:

1. Tool to return weather information
2. Tool to advice travel locations

The response is:

"The best vacation city in Europe is Rome, and the current temperature there is 4.1 degrees Celsius."

## Example Flow

While the result is valid, the [example agent](https://github.com/IBM/watsonx-ai-platform-demos/tree/main/agents/beeframework/watsonx-simple-travel-agent) needs several iterations.

The problem is that the weather tool requires the current date as input which the agent finds out by invoking the tool several times. Via observability tools developers can identify these weaknesses and improve the prompts, tool descriptions or add other tools to find out the current date. This saves several LLM invocations which leads to lower costs and faster response times.

Here is the complete flow:

```text
[
  {
    "content": "# Available functions\nYou can only use the following functions. Always use all required parameters.\n\nFunction Name: OpenMeteo\nDescription: Retrieve current, past, or future weather forecasts for a location.\nParameters: {\"type\":\"object\",\"properties\":{\"location\":{\"anyOf\":[{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"language\":{\"type\":\"string\",\"default\":\"English\"}},\"required\":[\"name\"],\"additionalProperties\":false},{\"type\":\"object\",\"properties\":{\"latitude\":{\"type\":\"number\"},\"longitude\":{\"type\":\"number\"}},\"required\":[\"latitude\",\"longitude\"],\"additionalProperties\":false}]},\"start_date\":{\"type\":\"string\",\"format\":\"date\",\"description\":\"Start date for the weather forecast in the format YYYY-MM-DD (UTC)\"},\"end_date\":{\"type\":\"string\",\"format\":\"date\",\"description\":\"End date for the weather forecast in the format YYYY-MM-DD (UTC)\"},\"temperature_unit\":{\"type\":\"string\",\"enum\":[\"celsius\",\"fahrenheit\"],\"default\":\"celsius\"}},\"required\":[\"location\",\"start_date\"],\"additionalProperties\":false}\n\nFunction Name: TravelAgent\nDescription: Provides a list of vacation options to visit it answers with the reasons to travel to a city.\nParameters: {\"type\":\"object\",\"properties\":{\"question_input\":{\"type\":\"string\",\"description\":\"Question of the traveler.\"}},\"required\":[\"question_input\"],\"additionalProperties\":false}\n\n# Communication structure\nYou communicate only in instruction lines. The format is: \"Instruction: expected output\". You must only use these instruction lines and must not enter empty lines or anything else between instruction lines.\nYou must skip the instruction lines Function Name, Function Input and Function Output if no function calling is required.\n\nMessage: User's message. You never use this instruction line.\nThought: A single-line step-by-step plan of how to answer the user's message. You can use the available functions defined above. This instruction line must be immediately followed by Function Name if one of the available functions defined above needs to be called, or by Final Answer. Do not provide the answer here.\nFunction Name: Name of the function. This instruction line must be immediately followed by Function Input.\nFunction Input: Function parameters. Empty object is a valid parameter.\nFunction Output: Output of the function in JSON format.\nThought: Continue your thinking process.\nFinal Answer: Answer the user or ask for more information or clarification. It must always be preceded by Thought.\n\n## Examples\nMessage: Can you translate \"How are you\" into French?\nThought: The user wants to translate a text into French. I can do that.\nFinal Answer: Comment vas-tu?\n\n# Instructions\nUser can only see the Final Answer, all answers must be provided there.\nYou must always use the communication structure and instructions defined above. Do not forget that Thought must be immediately followed by either Function Name or Final Answer.\nFunctions must be used to retrieve factual or historical information to answer the message.\nIf the user suggests using a function that is not available, answer that the function is not available. You can suggest alternatives if appropriate.\nWhen the message is unclear or you need more information from the user, ask in Final Answer.\n\n# Your capabilities\nPrefer to use these capabilities over functions.\n- You understand these languages: English, Spanish, French.\n- You can translate and summarize, even long documents.\n\n# Notes\n- If you don't know the answer, say that you don't know.\n- The current time and date in ISO format can be found in the last message.\n- When answering the user, use friendly formats for time and date.\n- Use markdown syntax for formatting code snippets, links, JSON, tables, images, files.\n- Sometimes, things don't go as planned. Functions may not provide useful information on the first few tries. You should always try a few different approaches before declaring the problem unsolvable.\n- When the function doesn't give you what you were asking for, you must either use another function or a different function input.\n  - When using search engines, you try different formulations of the query, possibly even in a different language.\n- You cannot do complex calculations, computations, or data manipulations without using functions.\n\n# Role\nYou are a helpful assistant.",
    "role": "system"
  },
  {
    "content": "Message: What is the best vacation city in Europe, and can you tell me the current temperature in this city?\n\nThis message was created at 2025-02-17T06:33:22.772Z",
    "role": "user"
  },
  {
    "content": "Thought: The user wants to know the best vacation city in Europe and the current temperature there. I can use the TravelAgent function to find the best vacation city in Europe, and then use the OpenMeteo function to find the current temperature in that city.\n\nFunction Name: TravelAgent\nFunction Input: {\"question_input\":\"What is the best vacation city in Europe?\"}\nFunction Output: [{\"rank\":1,\"city\":\"Rome\",\"country\":\"Italy\",\"reason_to_travel\":\"Rome is the capital city of Italy and the country's largest urban area. It is the center of the Metropolitan City of Rome, which has a population of 4.3 million residents.\",\"main_interests_covered\":\"History, Art, Culture, Food, Fashion\"},{\"rank\":2,\"city\":\"Paris\",\"country\":\"France\",\"reason_to_travel\":\"Paris is the capital and most populous city of France, with an area of 105 square kilometers and an official estimated population of 2,140,526 residents as of 1 January 2019.\",\"main_interests_covered\":\"History, Art, Culture, Food, Fashion\"}]\n",
    "role": "assistant"
  },
  {
    "content": "Thought: The TravelAgent function has returned Rome and Paris as the top two vacation cities in Europe. I will now use the OpenMeteo function to find the current temperature in Rome.\n\nFunction Name: OpenMeteo\nFunction Input: {\"location\":{\"name\":\"Rome\",\"country\":\"Italy\"},\"temperature_unit\":\"celsius\"}\nFunction Output: ToolInputValidationError: The received tool input does not match the expected schema.\nInput Schema: \"{\"type\":\"object\",\"properties\":{\"location\":{\"anyOf\":[{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\",\"minLength\":1},\"country\":{\"type\":\"string\"},\"language\":{\"type\":\"string\",\"default\":\"English\"}},\"required\":[\"name\"],\"additionalProperties\":false},{\"type\":\"object\",\"properties\":{\"latitude\":{\"type\":\"number\"},\"longitude\":{\"type\":\"number\"}},\"required\":[\"latitude\",\"longitude\"],\"additionalProperties\":false}]},\"start_date\":{\"type\":\"string\",\"format\":\"date\",\"description\":\"Start date for the weather forecast in the format YYYY-MM-DD (UTC)\"},\"end_date\":{\"type\":\"string\",\"format\":\"date\",\"description\":\"End date for the weather forecast in the format YYYY-MM-DD (UTC)\"},\"temperature_unit\":{\"type\":\"string\",\"enum\":[\"celsius\",\"fahrenheit\"],\"default\":\"celsius\"}},\"required\":[\"location\",\"start_date\"],\"additionalProperties\":false,\"$schema\":\"http://json-schema.org/draft-07/schema#\"}\"\nValidation Errors: [{\"instancePath\":\"\",\"schemaPath\":\"#/required\",\"keyword\":\"required\",\"params\":{\"missingProperty\":\"start_date\"},\"message\":\"must have required property 'start_date'\"}]\n\nHINT: If you're convinced that the input was correct but the function cannot process it then use a different function or say I don't know.\n",
    "role": "assistant"
  },
  {
    "content": "Thought: The OpenMeteo function requires a start date for the weather forecast, even if it's the current date. I will now use the OpenMeteo function to find the current temperature in Rome, using the current date as the start date.\n\nFunction Name: OpenMeteo\nFunction Input: {\"location\":{\"name\":\"Rome\",\"country\":\"Italy\"},\"start_date\":\"2023-02-17\",\"temperature_unit\":\"celsius\"}\nFunction Output: {\"current_units\":{\"time\":\"iso8601\",\"interval\":\"seconds\",\"temperature_2m\":\"°C\",\"rain\":\"mm\",\"relative_humidity_2m\":\"%\",\"wind_speed_10m\":\"km/h\"},\"current\":{\"time\":\"2025-02-17T06:30\",\"interval\":900,\"temperature_2m\":4.1,\"rain\":0,\"relative_humidity_2m\":90,\"wind_speed_10m\":2.3},\"daily_units\":{\"time\":\"iso8601\",\"temperature_2m_max\":\"°C\",\"temperature_2m_min\":\"°C\",\"rain_sum\":\"mm\"},\"daily\":{\"time\":[\"2023-02-17\",
    ...
    ,\"2025-02-16\",\"2025-02-17\"],\"temperature_2m_max\":
    ...]}}\n",
    "role": "assistant"
  },
  {
    "content": "The best vacation city in Europe is Rome, and the current temperature there is 4.1 degrees Celsius.",
    "role": "assistant"
  }
]
```

## Setup

To run the example, follow the next steps. First you need to create environment variables, for example to point to watsonx.ai models.

```text
export CODE_INTERPRETER_URL=http://127.0.0.1:50051
export BEE_FRAMEWORK_LOG_PRETTY=true
export BEE_FRAMEWORK_LOG_LEVEL="info"
export BEE_FRAMEWORK_LOG_SINGLE_LINE="false"
export WATSONX_BASE_URL=https://eu-de.ml.cloud.ibm.com
export WATSONX_PROJECT_ID=xxx
export WATSONX_API_KEY=xxx
export WATSONX_MODEL=mistralai/mixtral-8x7b-instruct-v01
```

Next clone the repo and run the open-source tool [MLflow](https://mlflow.org/) and MongoDB in containers.

```bash
git clone https://github.com/IBM/watsonx-ai-platform-demos.git
cd agents/beeframework/watsonx-simple-travel-agent
npm ci
source .env 
npm run infra:start --profile=observe
npm run start src/agent_observe.ts
open http://localhost:8080/#/experiments/
```

![image](/assets/img/2025/02/bee-mlflow-2.png)

## Source Code

The example prints status information to the standard output of the process and there is a connector to push the information to MLflow and a persistent database.


```typescript
  let prompt = "What is the best vacation city in Europe, and can you tell me the current temperature in this city?";
  console.info("Prompt:\n" + prompt + "\n");
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
    .middleware(
      createObserveConnector({
        api: {
          baseUrl: "http://127.0.0.1:4002",
          apiAuthKey: "testing-api-key",
        },
        cb: async (err, data) => {
          if (err) {
            console.error(`Agent 🤖 : `, ObserveError.ensure(err).explain());
          } else {
            console.info(`Observe 🔎`, data?.result?.response?.text || "Invalid result.");
            console.info(
              `Observe 🔎`,
              `Trace has been created and will shortly be available at http://127.0.0.1:8080/#/experiments/0`,
            );
          }
        },
      }))
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

## Next Steps

Try out the [Bee Agent Framework](https://github.com/i-am-bee/bee-agent-framework).