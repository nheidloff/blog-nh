---
id: nh-085
title: 'Developing custom Tools with the Bee Agent Framework'
date: 2024-09-07 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-085'
permalink: /article/developing-custom-tools-bee-agent-framework/
custom_permalink:
    - article/developing-custom-tools-bee-agent-framework/
image: /assets/img/2024/08/bee.png
---

*LLM Agents and Function Calling are powerful techniques to build modern AI applications. IBM Research open sourced the Bee Agent Framework. This post describes how custom tools can be developed in Typescript via this framework.*

As the reminder here is a [definition](https://www.ibm.com/think/topics/ai-agents) of AI Agents.

> An artificial intelligence (AI) agent refers to a system or program that is capable of autonomously performing tasks on behalf of a user or another system by designing its workflow and utilizing available tools.

Resources that explain agents, tools and the Bee framework:

* [Bee Agent Framework](https://github.com/i-am-bee/bee-agent-framework)
* [Bee Agent Framework - Custom Tools](https://github.com/i-am-bee/bee-agent-framework/blob/main/docs/tools.md)
* [Simple Bee Agent Framework Example]({{ "/article/bee-agents-function-calling-watsonx.ai/" | relative_url }})
* [Code Execution with the Bee Agent Framework]({{ "/article/bee-agentic-ai-code-execution/" | relative_url }})
* [Agents and Function Calling with watsonx.ai]({{ "/article/mixtral-agents-tools-multi-turn-sql/" | relative_url }})
* [HuggingFace Documentation: Tool use / function calling](https://huggingface.co/docs/transformers/main/en/chat_templating#advanced-tool-use--function-calling)

## Custom Tools

The Bee Agent Framework is developed in Typescript. Custom tools are implemented in Typescript too to make it easier for developers who don't have strong Python skills.

In the simplest case tools extend a base class to define the functionality of the tool and its input and output parameters via [Zod](https://github.com/colinhacks/zod). The actual implementation is done in the '_run' function. Below is a complete example tool.

See the [documentation](https://github.com/i-am-bee/bee-agent-framework/blob/main/docs/tools.md) for details.

```typescript
import { z } from "zod";
import { Tool, ToolInput, BaseToolOptions, BaseToolRunOptions, ToolOutput } from "bee-agent-framework/tools/base";

export interface RouterUpdateToolOptions extends BaseToolOptions {}

export interface RouterUpdateToolRunOptions extends BaseToolRunOptions {}

export interface RouterUpdateResult {
  success: string;
}

export class RouterUpdateToolOutput extends ToolOutput{
  constructor(result:RouterUpdateResult) {
    super();
    this.finalResult = result.success
  }
  finalResult:string;
  isEmpty(): boolean {
    return false;
  }
  createSnapshot(): unknown {
    throw new Error("Method not implemented.");
  }
  loadSnapshot(snapshot: unknown): void {
    throw new Error("Method not implemented.");
  }
  static {
    this.register();
  }
  getTextContent(): string {
    return this.finalResult
  }
}

export class RouterUpdateTool extends Tool<
  RouterUpdateToolOutput,
  RouterUpdateToolOptions,
  RouterUpdateToolRunOptions
> {
  name = "Router Update";
  description =
    "Updates the software of routers remotely for a subscriber with a certain phone number.";

  inputSchema() {
    return z.object({
      phoneNumber: z
        .string({ description: `Phone number of a subscriber, for example '123-456-7890'` })
        .min(1)
        .max(40),
    });
  }

  public constructor(public readonly config: RouterUpdateToolOptions = {}) {
    super(config);
  }

  static {
    this.register();
  }

  protected async _run({ phoneNumber: phoneNumber }: ToolInput<RouterUpdateTool>,
    _options?: RouterUpdateToolRunOptions): Promise<RouterUpdateToolOutput> {
    
    console.log("Input to Router Update tool - phoneNumber: " + phoneNumber)

    // real implementation goes here
    let results:RouterUpdateResult = {
      success: "true"
    }
    return new RouterUpdateToolOutput(results);
  }
}
```

## Invocation

The following snippet shows how to associate the tool with the agent and how to invoke the agent.

```typescript
import { WatsonXChatLLM } from "bee-agent-framework/adapters/watsonx/chat";
import { BeeAgent } from "bee-agent-framework/agents/bee/agent";
import { UnconstrainedMemory } from "bee-agent-framework/memory/unconstrainedMemory";
import { RouterUpdateTool } from "./routerUpdate.js";
import { WatsonXChatLLMPresetModel } from "bee-agent-framework/adapters/watsonx/chatPreset";
import { createConsoleReader } from "./io.js";
import { FrameworkError, Logger } from "bee-agent-framework";
import { GenerateCallbacks } from "bee-agent-framework/llms/base";

const reader = createConsoleReader();
const logger = new Logger({ name: "app", level: "trace" });

const WATSONX_MODEL = process.env.WATSONX_MODEL as WatsonXChatLLMPresetModel
const chatLLM = WatsonXChatLLM.fromPreset(WATSONX_MODEL, {
    apiKey: process.env.WATSONX_API_KEY,
    projectId: process.env.WATSONX_PROJECT_ID,
    baseUrl: process.env.WATSONX_BASE_URL,
    parameters: {
        decoding_method: "greedy",
        max_new_tokens: 1500
    }
})
const agent = new BeeAgent({
    llm: chatLLM,
    memory: new UnconstrainedMemory(),
    tools: [
        new RouterUpdateTool()
    ]
});

export async function runAgentUpdateRouterIfNecessary(transcriptSummary:string) {
    // transcriptSummary: Summary:**\n\n* **Agent:** John (Teltop Customer Care Agent)\n* **Subscriber:** Mary (123-555-1234)\n* **Specific Issues:** Home Wi-Fi keeps dropping, and TV service over fiber is pixelated and glitchy.\n* **Corrective Actions:** Remote diagnostic check on the router, router software update, and addressing the TV service quality by the technical team.\n* **Issue Resolved:** Not yet, but expected to be resolved within 24 hours.\n* **Follow-up Actions and Timelines:** The technical team will work on the TV service quality, and the router update will be completed immediately. The subscriber will be offered three months of free TV service once everything is resolved.\n**Subscriber Phone Number:** 123-555-1234
    let prompt = transcriptSummary
    try {
        return await agent
            .run(
            { prompt },
            {
                execution: {
                maxRetriesPerStep: 5,
                totalMaxRetries: 5,
                maxIterations: 5,
                },
            });
        });
    } catch (error) {
        logger.error(FrameworkError.ensure(error).dump());
    } 
}
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.