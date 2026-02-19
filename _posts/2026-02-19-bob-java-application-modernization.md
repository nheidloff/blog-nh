---
id: nh-166
title: 'Modernizing Java Applications with IBM Bob'
date: 2026-02-19 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-166'
permalink: /article/bob-java-application-modernization/
custom_permalink:
    - article/bob-java-application-modernization/
image: /assets/img/2026/02/bob-java-application-modernization-00.jpg
---

*Until recently, modernizations of legacy projects have often been challenging. With AI-based engineering tools it has become easier. This post describes how to convert WebSphere applications into OpenLiberty applications with newer Java runtimes via IBM Bob.*

Modernizing Java applications brings significant advantages - from ultra‑fast startup times and dramatically reduced memory consumption to enhanced developer productivity. Cloud-native frameworks like OpenLiberty make these gains even more accessible, but large‑scale modernization projects have traditionally been time‑consuming and difficult.

Today, new AI‑driven engineering techniques are reshaping this process which enable autonomous AI agents to generate, adapt, and refine code in iterative cycles. Developers remain fully in control by defining intent and exit criteria (such as tests), while the agents do the heavy lifting inside those boundaries.

Previously, only straightforward changes could be automated with rules or recipes. Complex refactorings and architecture updates still required extensive manual work. AI agents can now tackle these tasks as well - analyzing codebases, proposing improvements, and performing sophisticated transformations. Developers simply review, approve, or reject the changes, dramatically reducing the effort required.

This post describes how [IBM Bob](https://www.ibm.com/products/bob), an AI partner for the Software Development Lifecycle, brings these capabilities to real-world Java modernization. Bob helps developers understand legacy systems, plan migrations, and execute modernization tasks safely and efficiently. With proactive insights and autonomous code generation integrated directly into the development workflow, Bob accelerates modernization while ensuring developers retain full oversight.

## Example

Below is a sample how to modernize a WebSphere application in two steps:

1. Replatforming to OpenLiberty
2. Updating the Java runtime

Read my previous articles about Java application modernization for more context:

* [Improving operational Efficiency through Application Modernization]({{ "/article/improving-operational-efficiency-through-application-modernization/" | relative_url }})
* [Sample Repo](https://github.com/IBM/application-modernization-javaee-quarkus?tab=readme-ov-file#documentation)

## Understanding

Before any code is updated, it makes sense to get a better understanding about the application which Bob supports in the chat mode.

![image](/assets/img/2026/02/bob-java-application-modernization-01.jpg)

## Replatforming

Next the WebSphere code will be updated to [OpenLiberty](https://openliberty.io/).

![image](/assets/img/2026/02/bob-java-application-modernization-02.jpg)

After an analysis of the project, server.xml and a Containerfile are generated.

![image](/assets/img/2026/02/bob-java-application-modernization-03.jpg)

## Code Analysis

When modernizing applications, certain changes can and should be done automatically via deterministic classic rules. Rules are more reliable than AI, faster and cheaper.

The [IBM Application Modernization Accelerator](https://www.ibm.com/docs/en/ama) creates a report of required changes:

1. Changes that can be done rule-based
2. Changes that need to be done via AI

The following screenshot shows an issue which cannot be handled via rules.

![image](/assets/img/2026/02/bob-java-application-modernization-04.jpg)

## Agentic Modernization

After the rule-based changes have been done via workflows and recipes, the AI starts to work on the remaining tasks.

![image](/assets/img/2026/02/bob-java-application-modernization-05.jpg)

As shown in the previous Visual Studio Code screenshot something needs to be changed regarding 'PrintWriter'.

![image](/assets/img/2026/02/bob-java-application-modernization-06.jpg)

Bob figured out the necessary fixes. In this case it's only a change of a library version.

![image](/assets/img/2026/02/bob-java-application-modernization-07.jpg)

Bob iterates through the list of tasks until he thinks everything should work. For example, he runs unit tests and Maven builds.

In my case the modernized application didn't come up. Bob detected this issue when running the last 'Validate' stage to run the application. Based on this error, he even updated his Todo list.

![image](/assets/img/2026/02/bob-java-application-modernization-08.jpg)

After a couple of iterations, the application has been updated successfully to OpenLiberty.

![image](/assets/img/2026/02/bob-java-application-modernization-09.jpg)

Bob also created documentation and a diagram for the completed work.

![image](/assets/img/2026/02/bob-java-application-modernization-10.jpg)

## Java Runtime Updates

After the replatforming I've asked Bob to upgrade the Java runtime.

![image](/assets/img/2026/02/bob-java-application-modernization-11.jpg)

![image](/assets/img/2026/02/bob-java-application-modernization-12.jpg)

## Next Steps

To find out more, check out the following resources:

* [IBM Bob](https://www.ibm.com/products/bob)
* [IBM Bob Demos](https://www.youtube.com/@ibm-bob/videos)
* [Improving operational Efficiency through Application Modernization]({{ "/article/improving-operational-efficiency-through-application-modernization/" | relative_url }})
* [Sample Repo](https://github.com/IBM/application-modernization-javaee-quarkus?tab=readme-ov-file#documentation)
* [OpenLiberty](https://openliberty.io/)
* [IBM Application Modernization Accelerator](https://www.ibm.com/docs/en/ama)
* [IBM Application Modernization Accelerator Developer Tools](https://www.ibm.com/docs/en/ama-dev-tools)
* [IBM Transformation Advisor](https://www.ibm.com/products/cloud-pak-for-applications/transformation-advisor)