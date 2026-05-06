---
id: nh-174
title: "Spec-driven Development with IBM Bob"
date: 2026-05-06 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-174'
permalink: /article/spec-driven-development-ibm-bob/
custom_permalink:
    - article/spec-driven-development-ibm-bob/
image: /assets/img/2026/05/spec-driven-development-ibm-bob.jpg
---

*AI-based development tools can significantly increase autonomy in software development. However, it is crucial that developers maintain control to ensure the level of quality required for enterprise applications. This post demonstrates how Spec-driven Development addresses these challenges and how it can be utilized in IBM Bob.*

While ```Vibe Coding``` created a lot of excitement, developers quickly hit a wall: a moment where progress stops completely because reclaiming ownership requires painful, manual investigation. The emerging answer is ```Spec‑driven Development``` (SDD). Read my article [Why 'Software Development Lifecycle Partner' describes IBM Bob best]({{ "/article/why-ibm-bob-software-development-lifecycle-partner/" | relative_url }}) to understand this pattern.

The goal of SDD is not to reduce autonomy, but to balance three forces:

1. Human ownership: Do humans retain control over the system’s direction and state?
2. Agent autonomy: Can agents make meaningful progress independently?
3. Project trust: Is the system correct, maintainable, understandable, and safe?

Spec‑driven development intentionally maximizes autonomy without sacrificing trust and ownership.

IBM Bob operationalizes this balance across four distinct stages.

1. Requirements
2. Spec
3. Implementation
4. Verification

## Scenario

This post contains a full end-to-end example workflow. It's a simple scenario, but it describes well some of the key concepts.

The article shows how to use IBM Bob to build a [watsonx Orchestrate](https://developer.watson-orchestrate.ibm.com) agent. Watsonx Orchestrate is IBM's agentic control plane for scaling and governing AI in your enterprise.

The high-level requirements are defined in a [GitHub issue](https://github.com/nheidloff/bob-orchestrate-demo/issues/1).

```text
Create a new Orchestrate 'Trip Booking' agent to book flights.
The agent uses a tool 'Find Trip' that requires four input parameters:
- destination airport
- departure airport
- start date
- return date
The tool returns mocked data for now.
```

## Setup

First Bob needs be configured and customized for this specific scenario.

For watsonx Orchestrate there are two MCP servers that help Bob to understand how to build agentic applications and how to access the Orchestrate environment.

1. Orchestrate documentation
2. Orchestrate command line interface

![image](/assets/img/2026/05/sdd-0-setup-02.jpg)

Next, a rule is defined that tells Bob about the Orchestrate deployment. This information could also be put in an Agents.md file.

![image](/assets/img/2026/05/sdd-0-setup-06.jpg)

Bob comes with modes like 'Plan' and 'Code'. I've extended these modes so that Bob can also access the Orchestrate MCP tools.

![image](/assets/img/2026/05/sdd-0-setup-08.jpg)

To create specifications, a [grill-me](https://www.aihero.dev/my-grill-me-skill-has-gone-viral) skill is used below.

![image](/assets/img/2026/05/sdd-0-setup-11.jpg)

## Requirements

In this example the requirements are defined in 'feature request' issues on GitHub, but they could also be defined in other tools. Bob can access third party systems via MCP.

Via the GitHub MCP server and the following prompt, the requirements are stored in the project.

```text
Get the latest issue from GitHub for this project and write only 
the title and description in documents/requirements.md
```

![image](/assets/img/2026/05/sdd-1-requirements-03.jpg)

If these requirement documents contain too many requirements, break them down in more manageable documents first.

Next, ask Bob to create an implementation plan.

```text
Create an implementation plan for the requirements 
in @documents/requirements.md.
```

To create the plan, Bob searches for necessary information in the Orchestrate documentation.

![image](/assets/img/2026/05/sdd-1-requirements-05.jpg)

The drafted implementation plan needs to be reviewed by developers. In this case I saw that Bob has planned to do some testing, but not the level of testing that I expect. Based on my instruction Bob has added this to the plan.

![image](/assets/img/2026/05/sdd-1-requirements-08.jpg)

## Spec

Next the spec is created which is the next level of detail of the implementation plan. In this stage it's important to review and clarify the key architecture and design decisions. If these specs are not good enough, AI agents won't be able to deliver good outcomes in the next stages.

At the same time these specs must not be too detailed. If they are, you are essentially writing software in natural language rather than leveraging all the AI capabilities. The right balance between autonomy and clear instructions need to be found.

The 'grill-me' skill is a good mechanism to detect potential weaknesses in the implementation plan and to have a conversation between developers and agents to clarify open questions and core architecture decisions. These conversations are often more efficient than developers having to read the complete implementation plans.

![image](/assets/img/2026/05/sdd-2-spec-01.jpg)

In this example Bob discovered that a small model was planned to be used by the Orchestrate agent which is why I changed it to a larger model.

![image](/assets/img/2026/05/sdd-2-spec-03.jpg)

For many of the open question Bob provides options for answers and even recommends options. Based on the conversation Bob updates the spec.

![image](/assets/img/2026/05/sdd-2-spec-05.jpg)

## Implementation

In the implementation stage autonomy peaks. Developers can still interrupt and correct Bob anytime, but often Bob can work autonomously if the spec is good.

Dependent on the application, necessary quality and acceptable risk, developers can decide how much Bob can do automatically. Actions can be auto-approved ('yolo mode'), but you can also define that each write operation needs to be approved first.

When prompted to generate code, Bob creates a to-do list first which can also be reviewed by developers.

```text
Implement @documents/implementaton-plan.md
```

![image](/assets/img/2026/05/sdd-3-implementation-02.jpg)

Developers also need to define exit criteria to help Bob to understand when he is done. For example, Bob should not only generate application code, but also tests: unit tests, browser component tests, Chrome dev tools, Playwright, etc.

In this example Bob deploys the generated agent directly to Orchestrate and runs the Orchestrate command line interface to test the agent in the Orchestrate environment.

![image](/assets/img/2026/05/sdd-3-implementation-07.jpg)

And of course, you can also test your agents in the Orchestrate user interface.

![image](/assets/img/2026/05/sdd-3-implementation-11.jpg)

Bob is also good at generating documentation. Personally, I still see issues with documentation which can be out of synch with the code, even when generated by AI agents. However, I think it makes sense to store Architecture Decision Records (ADR) in repos and keep them up to date. This helps Bob later to enhance the application.

## Verification

As mentioned above tests should directly be generated when generating application code so that they can be run to determine whether additions and changes work.

Additionally, code reviews need to be done: AI-based reviews, but also reviews by humans, at a minimum for critical tasks and applications. In some cases, it makes sense to still review every single line of changed code manually.

In this example Bob provides a couple of tips in the 'Bob Findings' tab which can be fixed directly by Bob.

![image](/assets/img/2026/05/sdd-4-verification-02.jpg)

Furthermore, Bob can detect potential security issues. This can be done in the verification stage, but Bob also searches for issues in earlier stages.

![image](/assets/img/2026/05/sdd-4-verification-05.jpg)

With the following prompt, a pull request is created which will have to be approved by developers.

```text
commit and push the changes to github. create a PR
```

![image](/assets/img/2026/05/sdd-4-verification-07.jpg)

## Next Steps

To find out more, check out these resources:

* Try [Bob](https://bob.ibm.com/)!
* [Bob Documentation](https://bob.ibm.com/docs/ide)
* [Watsonx Orchestrate Developer](https://developer.watson-orchestrate.ibm.com)