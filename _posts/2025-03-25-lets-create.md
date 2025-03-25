---
id: nh-115
title: 'AI Agents and InstructLab based Fine-tuning'
date: 2025-03-25 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-115'
permalink: /article/lets-create/
custom_permalink:
    - article/lets-create/
image: /assets/img/2025/03/lets-create.png
---

*My colleague Thomas Harrer interviewed me about agentic systems and fine-tuning. Below is the recording and the transcript.*

Watch [Let's Create Technology Talk with Niklas Heidloff about Artificial Intelligence Agents and more](https://video.ibm.com/recorded/134256398) which was recorded at the beginning of this year.

## Biggest Trend in AI

In one word: Agents. I think 2025 will be THE year of agents. Agents combine the power of Large Language Models and business logic. This allows leveraging real time data and it allows invoking business functionality. 

Modern Large Language Models can not only return text, but structured data including instructions how to run code with which parameters. This key technique is called Function Calling. Additionally, agents can specialize on certain tasks, for example by using specific tools and by using specific prompts. 

Rather than one agent doing everything, agents can work together and orchestrate their work. So, rather than developing code with clear sequences, agents can generate Execution Plans to fulfill a task. I think these new capabilities will change the AI landscape dramatically and we will see a lot of innovation around agents this year as well as actual deployments of these agents in enterprises.

## Value of AI Agents
 
The key value of agents is that you can automate and improve a lot of digital work. Knowledge workers will be able to work much more efficiently. In many cases they will only have to review and approve tasks that have been prepared and executed by agents. I find this evolution quite interesting. 

For me as a developer agents will make my life much easier. For example, at our TechExchange conference, we demonstrated how agents can support developers to find issues in code, the exact files and positions and to propose solutions. Just a couple of years ago, this was clearly not possible.
 
## Agent Demo

I've prepared a very simple demo which showcases key capabilities. There are many frameworks to build agents these days. One framework is called BeeAI Framework developed by IBM Research which is available as open source. The agent uses a larger model available on watsonx.ai in the IBM Cloud, but I can also use smaller models like Granite running locally on my MacBook.
 
Customer Care is a typical scenario for AI. As example, let's say a call between a human support agent and a client occurred where the client reported a WiFi connectivity issue. A transcript of the call is available and based on this transcript an agent should try to fix the issue automatically.
 
This is a sample [transcript](https://github.com/IBM/watsonx-ai-platform-demos/blob/main/applications/application/prompts/prompt4.md). The client has an account number which is the phone number. The transcript mentions an issue with the router.

On the left side you see the agent definition. The role definition is important since it will be used as part of the prompt to the underlaying Large Language Model. For example, it says 'You are an expert for router updates'.

![image](/assets/img/2025/03/bee-stack-1.png)

Furthermore, a tool Router Update is defined. It's a Python function to update the router. In this demo it's only a mockup though. The important parts are the textural definition of the function as well as the required input and generated output.

![image](/assets/img/2025/03/bee-stack-2.png)

Now the agent can be triggered with the transcript as input. It takes a couple of seconds while the agents is 'thinking'. This reasoning step is important and helps to increase the performance of the Large Language Model.
 
The result is: "Based on the transcript, a router update is necessary." It found the right customer identified via phone number. The tool was invoked, and it returned with a success message.
 
One last thing I'd like to show is the observability. As a developer I want to understand what happened and why agents produced certain responses. When I click on the three dots, I can see the exact prompts and output.
 
## Fine-tuning
 
There is clearly a trend to smaller and specialized Large Language Models. Running large models is not only much more expensive, but they also provide much slower response times. In many cases this is not fast enough. For example, for conversational experiences, users don't want to wait for longer than 200 - 500 milliseconds.
 
For agentic systems, or compound systems in general, fast response times are even more important since they are more than a single model invocation.
 
Fine-Tuning is a great technique to build small and fast models optimized for specific tasks. In many cases they are tuned with the knowledge of larger teacher models. These smaller models can achieve performances similarly to much larger general-purpose models.
 
Fine-Tuning is typically done with LoRA and QLoRA which only changes a subset of the model weights. IBM Research created a framework called InstructLab which leverages these techniques. Additionally, it relies heavily on Synthetic Data Generation so that models can be tuned with only a small set of examples.
 
IBM announced InstructLab in watsonx.ai and I hope to see it very soon in our offerings.
 
## Granite Models

Granite is our family of open, performant, and trusted AI models, tailored for business. Just as other models they can be fine-tuned for specific AI tasks as we just talked about. They also support Function Calling which is necessary for agents.
 
What I like about them most is that it is well documented which data was used for the pre-training and IBM ensured that only data was used for the training which is available under the right licenses.
 
By the way: There are also Granite guardian models for risk detections which can be integrated in agentic applications.

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.