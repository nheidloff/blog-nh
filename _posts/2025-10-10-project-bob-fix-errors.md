---
id: nh-148
title: 'Fixing Errors in the  AI-based IDE Project Bob'
date: 2025-10-10 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-148'
permalink: /article/project-bob-fix-errors/
custom_permalink:
    - article/project-bob-fix-errors/
image: /assets/img/2025/10/project-bob-features.png
---

*This week at TechXchange 2025 IBM introduced project Bob, a tool for AI-based development of enterprise software. Below are two of my favorite features.*

[Project Bob](https://www.ibm.com/products/bob) helps shipping quality software faster. It's your AI software development partner that understands your intent, repo, and security standards required for enterprise-grade applications.

My previous post [Introducing Project Bob for AI based Software Development]({{ "/article/project-bob/" | relative_url }}) explains four cool features that were presented at TechXchange.

1. Literate Coding
2. Findings
3. Application Modernization
4. MCP Tools

Below are two more of my favorite project Bob features. 

I've started to test project Bob and my first time experience has been awesome! It's incredible how much more productive I am now. Plus, it's a lot of fun just to observe how Bob thinks and what it does. Even without code generation, many good ideas are generated that help me to understand necessary work.

## Browser Tool

Let's look at an example. Here is my initial instruction:

```text
Create a repo to fine-tune the ibm-granite/granite-3.3-2b-instruct 
model locally on MacOS with an M3 MacBook Pro. 
Use the dataset b-mc2/sql-create-context from Hugging Face.
```

First an execution plan is generated.

![image](/assets/img/2025/10/project-bob-browser-1.jpeg)

Project Bob comes with a browser tool which is used to find out more information, in this case about the Granite model.

![image](/assets/img/2025/10/project-bob-browser-2.jpeg)

As result project Bob finds out information about Granite.

![image](/assets/img/2025/10/project-bob-browser-3.jpeg)

Before code is generated, Bob generates detailed instructions in markdown files - see left column in the next screenshot. 

![image](/assets/img/2025/10/project-bob-browser-4.jpeg)

## Fixing Errors

Another great capability is how errors and problems can be fixed. I don't know how much time I've spent copying errors from terminals or tabs with problems, posting them to Google, ending up on StackOverflow and searching for the best answers there. 

With project Bob you can simply refer to the errors under 'Problems' which are passed as context to Bob to find and apply resolutions.

![image](/assets/img/2025/10/project-bob-fix-errors-1.jpeg)

In the previous screenshot there are some import errors. Project Box fixes them by creating a virtual environment and importing the modules. The errors in the following screenshot are other issues that could be fixed by another iteration of the 'fix errors in Problems' flow.

![image](/assets/img/2025/10/project-bob-fix-errors-2.jpeg)

Similarly, errors in the terminal can be fixed.

![image](/assets/img/2025/10/project-bob-fix-errors-3.jpeg)

In the previous screenshot are errors in the download model script. Project Bob applies code changes and runs the script again directly. Very nice!

![image](/assets/img/2025/10/project-bob-fix-errors-4.jpeg)

## Next Step

Check out the following resources to learn more:

* [Project Bob](https://www.ibm.com/products/bob)
* [Introducing Project Bob for AI based Software Development]({{ "/article/project-bob/" | relative_url }})
* Keynote TechXchange [Beyond Code: The New Role of the Developer](https://mediacenter.ibm.com/media/1_1k5g8j4z) (starting at 19:05 mins)
* [Announcing IBM Project Bob: Ship code faster with your AI-powered coding partner](https://www.ibm.com/new/announcements/ibm-project-bob)
* [IBM and Anthropic Partner to Advance Enterprise Software Development with Proven Security and Governance](https://newsroom.ibm.com/2025-10-07-2025-ibm-and-anthropic-partner-to-advance-enterprise-software-development-with-proven-security-and-governance)
* [IBM TechXchange](https://www.ibm.com/community/ibm-techxchange-conference/)