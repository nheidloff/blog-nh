---
id: nh-153
title: 'Boost Productivity with Vibe Coding and IBM Bob'
date: 2025-12-10 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-153'
permalink: /article/vibe-coding-bob/
custom_permalink:
    - article/vibe-coding-bob/
image: /assets/img/2025/12/vibe-coding-bob-00.jpeg
---

*In the field of AI-based development, often referred to as Vibe Coding, there is a lot of innovation and there are debates about the impact on the future of software engineering. The hype around Vibe Coding sometimes leads to disappointments because of high expectations which cannot be met due to technical limitations. However, if employed in the right way for the right tasks, AI-based tools can boost developer productivity.*

The term ```Vibe Coding``` is not optimal for AI-based development tools and processes, but it's commonly used in this context. There are multiple Vibe Coding IDEs (integrated development environments) and tools available in the market. Recently, IBM [announced](https://www.ibm.com/new/announcements/ibm-project-bob) [Bob](https://www.ibm.com/products/bob), an AI-powered integration development environment, which is utilized below for sample scenarios. Full demos can be found on the [IBM Bob YouTube channel](https://www.youtube.com/@ibm-bob/videos).

## Introduction

Andrej Karpathy, OpenAI co-founder, invented the term Vibe Coding at the beginning of this year. Vibe Coding claims to be able to make everyone a programmer, just by specifying the goals and functionalities of applications, as, for example Jensen Huang, NVIDIA CEO, stated. Some developers have started to define these specifications via voice to be even faster.

![image](/assets/img/2025/12/vibe-coding-bob-02.jpeg)

As stated in the following quotes, Mark Zuckerberg, Meta CEO, and Dario Amodei, Anthropic CEO, predicted a big impact of AI-based engineering at the beginning of this year.

![image](/assets/img/2025/12/vibe-coding-bob-01.jpeg)

However, I think it's fair to say that their predictions were exaggerated. While some public demonstrations are impressive, there are various issues as of today. Often, technical debt and 'slop' is generated, and vibe-coded applications are not production-ready. Additionally, there are open questions about legal aspects of the generated code.

## Productivity Study

[Stanford university](https://www.youtube.com/watch?v=9xoqlstC-W0) has done a survey with 600+ companies and 100k+ software engineers this year. It shows some interesting results.

AI-based coding assistants work well for greenfield scenarios and low complexity, while they struggle with brownfield applications and high complexity.

![image](/assets/img/2025/12/vibe-coding-bob-03.jpeg)

AI-based software engineering leads to higher productivity initially, but it takes time to fix issues that AI introduced. A colleague told me that he had spent two hours generating a new application, but he had to spend two weeks to fix it.

![image](/assets/img/2025/12/vibe-coding-bob-04.jpeg)

Productivity increases also depend on the programming languages. Popular languages with large communities show higher increases compared to exotic and older languages.

![image](/assets/img/2025/12/vibe-coding-bob-05.jpeg)

Large Language Models are restricted by their context window sizes. Even the quality of models with huge context windows decreases significantly when too much data is put into the context. Because of this ```Context Engineering``` is a key technique to pass the right context and signals to the models rather than full projects.

![image](/assets/img/2025/12/vibe-coding-bob-06.jpeg)

## Planning

Let's look at some samples and patterns that work well with AI-based software engineering tools like IBM Bob.

The planning is very important before code is generated. In the first step the goals need to be understood, research needs to be done, and specifications need to be created with enough and concrete details. Bob has a 'Planning Mode' to do this.

![image](/assets/img/2025/12/vibe-coding-bob-07.jpeg)

Bob can also use a browser tool to find information on the internet which is not part of the underlaying trained model.

![image](/assets/img/2025/12/vibe-coding-bob-15.jpeg)

## Testing

Another best practice is to let coding tools directly generate tests which are run automatically after every code change. 

![image](/assets/img/2025/12/vibe-coding-bob-08.jpeg)

In addition to unit tests, user interface testing can also be performed directly by AI development tools.

![image](/assets/img/2025/12/vibe-coding-bob-09.jpeg)

## Extending

I love the ability of Bob to add custom tools via MCP, skills, custom modes and custom commands. This allows developers to extend Bob for specific domains and processes.

The following example demonstrates how Bob can be extended with a MCP server and mode for [Quarkus](https://www.the-main-thread.com/p/ai-coding-modes-bob-quarkus-dev-mode) development.

![image](/assets/img/2025/12/vibe-coding-bob-11.jpeg)

The next example shows how to point Bob against the public watsonx Orchestrate documentation MCP server.

![image](/assets/img/2025/12/vibe-coding-bob-10.jpeg)

## Editing

IBM Bob can trigger various actions like read files, save files, execute terminal commands, invoke MCP tools, etc. Actions can be run automatically, for example in demos or for rapid prototyping. For changes in existing applications humans should be in the loop and approve manually running actions.

If developers are not happy with the generated code or the generated code doesn't work, developers need to be able to easily go back to previous states and run more experiments or develop the code manually. IBM Bob has a checkpoint feature to easily undo changes.

![image](/assets/img/2025/12/vibe-coding-bob-12.jpeg)

Developers need to understand the code that has been generated. It's hard enough to understand code that you wrote yourself previously, it's much harder to understand generated code once you have to debug it. In Bob's ```Literate Coding``` mode, developers can review changes before they are applied.

![image](/assets/img/2025/12/vibe-coding-bob-17.jpeg)

One of my favorite features of Bob is to fix errors by pointing Bob to the error descriptions in the terminal or problems section. This reduces several manual steps that I had to do previously: Copy error, paste it in Google, find a StackOverflow page, check whether the StackOverflow page is the right one, find the accepted answer and then apply the fix manually.

![image](/assets/img/2025/12/vibe-coding-bob-16.jpeg)

## Combining AI and Rules

While AI can do many tasks that were previously done via imperative coding, rules and regular expressions, there is still value in rule-based systems. They are not only much faster, but also often benefit from experience and skills that were gained when building these systems.

A good example is the Java ```Application Modernization``` feature of Bob which leverages existing rules and complements them via AI generation if rules are not possible or don't exist.

![image](/assets/img/2025/12/vibe-coding-bob-13.jpeg)

The following screenshot shows the result of a Java application modernization.

![image](/assets/img/2025/12/vibe-coding-bob-14.jpeg)

IBM Bob also comes with functionality to detect and review security vulnerabilities and secrets.

![image](/assets/img/2025/12/vibe-coding-bob-18.jpeg)

## My Point of View

As mentioned at the beginning of this post, there are many challenges with AI-based tools today. But as demonstrated above, AI-based tools like Bob can also increase developer productivity a lot!

AI-based software engineering has made incredible progress, even if you only compare the beginning of this year with today. AI years are like dog years. I believe we'll see many improvements in this space soon.

Adding AI tools is more than just adding yet another tool to the developers' toolboxes. You need a transformation of development processes and your organization which is the hard part.

I suggest starting using AI-based tools as soon as possible, but I recommend starting simple. Try AI-based development for simpler and new applications to gain skills and to learn what works and what doesn't. Provide your developers access to these tools and let them experiment.

I'm a big of AI-based development, but classic development software principles still apply. To build more than toy applications, developers will still be critical for a long time. Their daily work will be different, though.

## Next Steps

To find out more, check out the following resources:

* [IBM Bob](https://www.ibm.com/products/bob)
* [IBM Bob Demos](https://www.youtube.com/@ibm-bob/videos)
* [Stanford University Study](https://www.youtube.com/watch?v=9xoqlstC-W0)