---
id: nh-147
title: 'Introducing Project Bob for AI based Software Development'
date: 2025-10-08 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-147'
permalink: /article/project-bob/
custom_permalink:
    - article/project-bob/
image: /assets/img/2025/10/project-bob.png
---

*This week at TechXchange 2025 IBM introduced project Bob, a tool for AI-based development of software for enterprises. Below are some screenshots from the demo in the keynote.*

The [landing page](https://www.ibm.com/products/bob) describes project Bob:

* Helping you ship quality software, faster. Bob is your AI software development partner that understands your intent, repo, and security standards
* Better code in every commit: Shipping quality code faster means catching issues before they ever reach a pull request.
* Purpose built for modernization: Bob specializes in making the hard problems easy. Whether you’re re-platforming an app or helping deliver the next feature, it brings modernization expertise directly into the developer’s workflow.

Check out the following resources for details:

* [Project Bob](https://www.ibm.com/products/bob)
* Keynote TechXchange [Beyond Code: The New Role of the Developer](https://mediacenter.ibm.com/media/1_1k5g8j4z) (starting at 19:05 mins)
* [Announcing IBM Project Bob: Ship code faster with your AI-powered coding partner](https://www.ibm.com/new/announcements/ibm-project-bob)
* [IBM and Anthropic Partner to Advance Enterprise Software Development with Proven Security and Governance](https://newsroom.ibm.com/2025-10-07-2025-ibm-and-anthropic-partner-to-advance-enterprise-software-development-with-proven-security-and-governance)
* [IBM TechXchange](https://www.ibm.com/community/ibm-techxchange-conference/)

Neel Sundaresan, General Manager, Automation and AI, IBM, demonstrated project Bob in the [keynote](https://mediacenter.ibm.com/media/1_1k5g8j4z). I recommend watching his complete demo starting at 19:05 mins. Very cool!

## Literate Coding

One of the key features of project Bob is ```Literate Coding```:

> Literate Coding is a developer environment enhancement that blends clarity of documentation with the precision of code. It allows developers to reference multiple context points across files [...], edit code using natural language [...] and preserve developer intent.

Developers can write text directly in the source files.

![image](/assets/img/2025/10/project-bob-literate-coding-1.jpeg)

Based on the instructions code is generated. Developers can see the changes and must accept them.

![image](/assets/img/2025/10/project-bob-literate-coding-2.jpeg)

Another example is shown on the project Bob landing page. Developers can select code and click on an 'Edit' option inline.

![image](/assets/img/2025/10/project-bob-chat-in-editor-1.jpeg)

Next instructions can be entered:

![image](/assets/img/2025/10/project-bob-chat-in-editor-2.jpeg)

Proposed changes need to be accepted again.

![image](/assets/img/2025/10/project-bob-chat-in-editor-3.jpeg)

## Findings

In addition to user interactions project Bob analyzes code in the background and provides a tab with findings and recommendations.

![image](/assets/img/2025/10/project-bob-findings-1.jpeg)

Findings can be optimization suggestions and potential security vulnerabilities.

![image](/assets/img/2025/10/project-bob-findings-2.jpeg)

In this example the code that needs to be changed is identified. Users can navigate to the code via 'Go to Location' and ask the tool to investigate and improve the code.

![image](/assets/img/2025/10/project-bob-findings-3.jpeg)

## Application Modernization

Project Bob can also be used to modernize Java applications. In the first step projects are analyzed.   

![image](/assets/img/2025/10/project-bob-app-modernization-1.jpeg)

In the demo the Java version is updated. 

![image](/assets/img/2025/10/project-bob-app-modernization-2.jpeg)

![image](/assets/img/2025/10/project-bob-app-modernization-3.jpeg)

A separate branch is created and a to-do list is generated.

![image](/assets/img/2025/10/project-bob-app-modernization-4.jpeg)

![image](/assets/img/2025/10/project-bob-app-modernization-5.jpeg)

After the modernization the new code can be validated and a graphic is displayed describing the workflow.

![image](/assets/img/2025/10/project-bob-app-modernization-6.jpeg)

## Tools

In project Bob tools can be added to the chat in the IDE. The keynote demo shows how to leverage a tool provided by an IBM Instana MCP server which can detect issues with Node.js/TypeScript/JavaScript based applications.

![image](/assets/img/2025/10/project-bob-tools-1.jpeg)

![image](/assets/img/2025/10/project-bob-tools-2.jpeg)

In the example the root cause can be identified, and a fix can be suggested.

![image](/assets/img/2025/10/project-bob-tools-3.jpeg)

![image](/assets/img/2025/10/project-bob-tools-4.jpeg)

In the last step users can use the chat window to fix the code.

![image](/assets/img/2025/10/project-bob-tools-5.jpeg)

## Next Step

To find out more, check out the [project Bob](https://www.ibm.com/products/bob) landing page.