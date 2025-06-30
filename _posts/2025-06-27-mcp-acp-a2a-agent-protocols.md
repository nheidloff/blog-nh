---
id: nh-132
title: 'Comparison of Agent Protocols MCP, ACP and A2A'
date: 2025-06-27 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-132'
permalink: /article/mcp-acp-a2a-agent-protocols/
custom_permalink:
    - article/mcp-acp-a2a-agent-protocols/
image: /assets/img/2025/06/mcp-acp-a2a-agent-protocols-00.png
---

*AI agents can work autonomously by delegating tasks to different agents, models and tools. Various protocols are evolving to standardize the communication between agents. This post describes some protocols and key capabilities.*

Several companies and communities are defining [protocols](https://arxiv.org/abs/2504.16736) how agents can collaborate: MCP, ACP, A2A and more. The fact that there are so many different options shows the relevance of this topic and that not one solution solves all needs. This space is changing fast, for example recently Google announced that they transferred the governance of A2A to the [Linux Foundation](https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/) which is the same open governance organization that hosts IBM's [ACP](https://www.linuxfoundation.org/press/ai-workflows-get-new-open-source-tools-to-advance-document-intelligence-data-quality-and-decentralized-ai-with-ibms-contribution-of-3-projects-to-linux-fou-1745937200621).

Sophisticated systems and applications require modular architectures which is why microservices have become popular despite the new challenges they introduce. OpenAPI, formerly known as Swagger, is an interface that defines how to consume modular services in classic programming scenarios. In the age of AI these interfaces are often described via natural language, but well defined structured input and output definitions are more efficient. The evolving agent protocols are basically Swagger for agents.

## Agents vs Tools

Autonomous agents can invoke `Tools` and other `Agents`. Tools and agents have similar characteristics, but are slightly different:

* The execution of tools is usually rather fast. Agents might require much more time, especially if they execute other agents and use generative AI.
* Tools often perform REST API requests where the responses are returned synchronously. Agents return pieces of information asynchronously when they become available. Text is generated token by token.
* Tools are typically stateless; agents can have memory.

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) defines how to invoke tools. Protocols like [Agent Communication Protocol (ACP)](https://agentcommunicationprotocol.dev/) define how to invoke agents.

Well, that's what these protocols focus on today, but these two concepts are coming closer together. *The difference between agents and tools is vanishing*. For example, tools can be implemented with AI agents.

## MCP

At the end of last year [Anthropic](https://www.anthropic.com/company) published the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). Since then, it has been adopted by many companies. I think one of the main reasons is that it is very simple. Another reason is that Anthropic has delivered documentation and samples to enable the community to build MCP servers. Recently there was even a first MCP conference.

While the simplicity is a reason for the fast adoption, more advanced functionality has not been implemented yet or is being implemented ,for example [authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization). The design of the protocol shows that the original goal was to add tools to environments like Claude and IDEs and not agent to agent collaboration.

## ACP

Because of the MCP gaps several new initiatives have evolved. From the more than 10 alternatives mentioned above, I picked ACP as an example which is an IBM open-source project how to address these gaps. ACP addresses three shortcomings of MCP:

1. Streaming
2. Memory
3. Asynchronous Execution

It would be great if these features could be added to MCP. At the MCP Developers Summit several of the features were discussed.

To get started with ACP, check out the new course [Agent Communication Protocol](https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/).

## Memory

MCP servers can have [memory](https://agentcommunicationprotocol.dev/core-concepts/stateful-agents) within single servers, but there is currently no concept of memory beyond this. ACP has this capability built in.

```python
async with Client(base_url="http://localhost:8000") as client, client.session() as session:
    run = await session.run_sync(agent="chat_bot", input=[Message(parts=[MessagePart(content="Hello, my name is Niklas!")])])
    for message in run.output:
        print(message)
    run = await session.run_sync(agent="same_or_other_chat_bot", input=[Message(parts=[MessagePart(content="What's my name again?")])])
    for message in run.output:
        print(message)
```

## Asynchronous Execution

With ACP agents can pause and [await](https://agentcommunicationprotocol.dev/how-to/await-external-response)  additional data. This enable long running tasks, `Human in the Loop` and elicitation.

```python
@server.agent()
async def approval_agent(input: list[Message], context: Context) -> AsyncGenerator:
    """Request approval and respond to user's confirmation."""

    response = yield MessageAwaitRequest(message=Message(parts=[MessagePart(content="I can generate password for you. Do you want me to do that?")]))
    if str(response.message) == "yes":
        yield MessagePart(content="Generating password...")
        yield Message(parts=[MessagePart(content=f"Your password is: {''.join(random.choices(string.ascii_letters, k=10))}")])
    else:
        yield MessagePart(content="Password generation declined.")
```

## Comparison

My college Sandi Besen wrote a great article [Comparison of MCP, ACP, and A2A Protocols](https://medium.com/@sandibesen/an-unbiased-comparison-of-mcp-acp-and-a2a-protocols-0b45923a20f3) which compares the three protocols in more detail.

![image](/assets/img/2025/06/comparison-sandi-besen.jpeg)

In the DeepLearning.AI course [Agent Communication Protocol](https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/) she also outlines the differences.

## Next Steps

Personally, I'd like MCP to learn from ACP to address the current challenges. I hope that Antropic transfers the ownership of this protocol to an open governance organization.

To learn more, check out the following resources:

* MCP
    * [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
    * [The Protocol in Depth with David Soria Parra at Anthropic](https://www.youtube.com/watch?v=C_nqAWHsldo)
    * [MCP Project Update with Jerome Swannack at Anthropic](https://www.youtube.com/watch?v=eMKyBHlqAm4)
* ACP
    * [Agent Communication Protocol (ACP)](https://agentcommunicationprotocol.dev/)
    * [ACP May Community Call](https://www.youtube.com/watch?v=pqxr3j8RQ98)
    * [Course: ACP - Agent Communication Protocol](https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/)
* Comparisons and other protocols
    * [An Unbiased Comparison of MCP, ACP, and A2A Protocols](https://medium.com/@sandibesen/an-unbiased-comparison-of-mcp-acp-and-a2a-protocols-0b45923a20f3)
    * [A Survey of AI Agent Protocols](https://arxiv.org/abs/2504.16736)