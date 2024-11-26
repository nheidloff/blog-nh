---
id: nh-095
title: 'Improving Developer Productivity via Agents'
date: 2024-11-26 01:04:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-095'
permalink: /article/watsonx-code-assistant-swe-preview/
custom_permalink:
    - article/watsonx-code-assistant-swe-preview/
image: /assets/img/2024/11/agents-code-00.png
---

*At TechXchange 2024 IBM gave an amazing demo how to increase developer productivity via agents. Below are some screenshots from the keynote.*

Check out the demo of the keynote 'Track Spotlight for AI Software' ([video](https://www.ibm.com/community/ibm-techxchange-conference/) starting at 19:30 min, [slides](https://community.ibm.com/community/user/viewdocument/3658-ai-spotlight?CommunityKey=8c64553a-86a9-4af3-a2e6-55826c69b4e2&tab=librarydocuments)).

The new capability is an experimental feature and currently called SWE-Agent (Software Engineering Agent).

## Scenario

Git is widely used by developers as source code management tool. Users can submit issues which need to be solved by contributors of projects. In the demo an issue is shown which does not provide a lot of details, for example the description is a short title only.

![image](/assets/img/2024/11/agents-code-01.png)

## SWE-Agent

The SWE-Agent is triggered by assigning a label to the issue. As result it displays the name of the file that probably needs to be fixed, the function and the line number. The agent even describes the reasoning.

![image](/assets/img/2024/11/agents-code-02.png)

## Mixture of Agents

The experimental feature utilizes a mixture of multiple agents. One agent identifies the file and the function, another agent proposes how to fix the issue. Both agents use IBM Granite open-source models.

![image](/assets/img/2024/11/agents-code-03.png)

## Iterations

To improve the quality, the agents iterate in multiple iterations: Think, plan, act and observe. In this example the second step auto-corrects the output from the first step.

![image](/assets/img/2024/11/agents-code-04.png)

## Next Steps

Check out the following resources to learn details.

* Video: [Track Spotlight for AI Software](https://www.ibm.com/community/ibm-techxchange-conference/)
* Slides: [Track Spotlight for AI Software](https://community.ibm.com/community/user/viewdocument/3658-ai-spotlight?CommunityKey=8c64553a-86a9-4af3-a2e6-55826c69b4e2&tab=librarydocuments)
* [watsonx Code Assistant](https://www.ibm.com/products/watsonx-code-assistant)
* [IBM Granite 3.0](https://www.ibm.com/new/ibm-granite-3-0-open-state-of-the-art-enterprise-models)