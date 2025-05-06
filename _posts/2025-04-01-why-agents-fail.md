---
id: nh-118
title: 'Why Agents and Agentic Systems can fail'
date: 2025-04-01 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-118'
permalink: /article/why-agents-fail/
custom_permalink:
    - article/why-agents-fail/
image: /assets/img/2025/04/why-agents-fail-slide-00.png
pin: true
---

*At the ChatBot Summit in Berlin I gave a talk 'How to understand why Agents fail'. Below is a transcript and the slides.*

As you all know there is a lot of innovation and buzz around agents and agentic. However, the high expectations don't always match reality. In this session you will learn why agents can fail, why observability is important and how to address these issues.

![image](/assets/img/2025/04/why-agents-fail-slide-01.jpeg)

## Sample Scenario

Let's start with concrete examples that demonstrate why agents can fail. The simple scenario has one travel agent which has two tools: Weather tool and travel location advisor tool. Users can ask questions like 'Where should I go on my next vacation and how is the weather there?'. This sounds pretty simple, right? Well, it is a simple scenario, but even in this case many issues can occur.

![image](/assets/img/2025/04/why-agents-fail-slide-02.png)

## First Example

In the first example the agent's input is 'What is the best vacation city in Europe, and can you tell me the current temperature in this city?'. The output is 'The best vacation city in Europe is Rome, and the current temperature there is 10 degrees.' The output is correct, but how reliable is the answer and how efficient was the agent to generate it? It turns out there were actually two issues.

![image](/assets/img/2025/04/why-agents-fail-slide-03.png)

To find out what the agent did, I use an observability tool. There are many options, I picked the tool MLflow. The screenshot in the upper left corner shows what happened. It is hard to read, because the output is very verbose. This is currently an issue with many observability tools and I'm going to talk about this later. To make the essential part easier to read I've zoomed in. The red and black rectangles highlight the key information.

The agent identified that the weather tool needs to be invoked. However, the invocation failed since the tool requires a property 'start_date'. So, the agent called the same tool a second time, this time with the current date as start date. The ability of agents to auto correct themselves is powerful. But in this case the Large Language Model was invoked twice. This leads to higher costs primarily caused by the GPU resources. This behavior also leads to longer response times, especially for larger models. Via an extra instruction this issue could be avoided.

![image](/assets/img/2025/04/why-agents-fail-slide-04.png)

Next the question is how the agent knows the current date. The Large Language Models obviously don't know this. Only when you look at the logs, you see what happened. The agentic framework added the current date to the prompt. The framework developers decided to always add this information in the prompt since it's a common use case. However, in other examples this might add noise and could confuse the models, for example when more dates are passed in.

![image](/assets/img/2025/04/why-agents-fail-slide-05.png)

## Second Example

Let's look at another example: 'What is the best vacation city in Europe, and can you tell me the typical temperature in this city in summer?'. The answer is 'The typical temperature in Rome in summer is around 25 degrees Celsius.' This is correct, but you'll see that the output of the weather tool was ignored.

![image](/assets/img/2025/04/why-agents-fail-slide-06.png)

The agent invoked the weather tool which makes sense because you'd expect such a tool to be able to answer these types of questions. The tool is invoked with June 2023 as start date and August 2023 as end date. I'm not sure why the agent chose 2023 and not last year, but let's ignore this for now. Unfortunately, the tool cannot handle this request for some reason. Rather than returning an error, it returns a list of nulls.

![image](/assets/img/2025/04/why-agents-fail-slide-07.png)

This time the agent doesn't attempt to invoke the tool a second time with other parameters. Instead, it ignores the output of the agent and returns data from the model. While this works for this specific scenario, it might cause issues for other questions where the pretrained model doesn't have this information. For me as developer this feels like too much magic. I prefer more transparency to understand how responses were generated. As in the first example with a better instruction and tool description the unnecessary tool invocation could be avoided.

![image](/assets/img/2025/04/why-agents-fail-slide-08.png)

## Third Example

The next question is: 'What impact does the climate change have on Berlin during my trip?'. This is obviously a trick question since climate and weather are different topics, especially when it comes to short-term vacation planning. In the output the agent mentions some temperatures but also states: 'I don't have enough information about the historical weather patterns in Berlin to determine the impact of climate change on your trip.' I think this answer is kind of OK. At least the agent knows that it doesn't really have a good answer. However, the explanation for the missing information is not that good. Plus, the agent answers with some temperatures anyway.

![image](/assets/img/2025/04/why-agents-fail-slide-09.png)

Let's look in the logs what happened. It turns out that the agent called the weather tool even though the question was related to climate change. So, the agent didn't fully understand the question. It's also interesting how the agent invoked the tool. It assumed the trip starts today and takes a week which will in most cases not be correct.

![image](/assets/img/2025/04/why-agents-fail-slide-10.png)

## Architecture

I hope that these concrete examples give you some ideas why agents can fail. For me as developer an understanding of these flows helps me to optimize or fix my applications. AI requires a lot of experimentation and trial and error which is why observability and evaluations are key. This slide shows the architecture of the previous scenario. The reason why there are failures are not related to the model. The Mixtral model is still very good. I run it on watsonx in the IBM Cloud, but obviously you can run models also on other clouds, on-premises and smaller ones even locally. As mentioned, I picked MLflow as observability tool and I picked BeeAI as agentic framework.

![image](/assets/img/2025/04/why-agents-fail-slide-11.png)

## BeeAI

BeeAI is an open-source framework from IBM Research. There are many other frameworks with different pros and cons. It almost feels like new frameworks pop up every week. The reason why I chose BeeAI is because its strength is observability. BeeAI logs on a fine-grained level events, prompts, tool invocations, flows and so forth. The framework uses the observability standard OpenTelemetry so that tools like MLflow and Arize Phoenix can be plugged in.

![image](/assets/img/2025/04/why-agents-fail-slide-12.png)

## watsonx.ai

As you saw earlier complete logs can typically be very verbose and hard to read. The other extreme are frameworks that only provide the final answers. Between these extremes there are many alternatives how much data is logged and how the data is visualized.

I predict that we'll see a lot of progress in this space this year. The screenshot shows a tool, called Agent Lab which is part of IBM's watsonx.ai. The user interface displays a trajectory which documents the steps of the executed flow as well as the tool invocations. By default, only the answer is displayed. The section 'How did I get this answer' can be expanded to see the trajectory. From there the full trace details can be opened. As a user you can dig into the details if necessary.

![image](/assets/img/2025/04/why-agents-fail-slide-13.png)

## Agentic Systems

After I've demonstrated examples how to understand what agents do, let's pop up one level and look at the different types of agents and agentic systems. There is a spectrum of agentic architectures ranging from fixed flows to autonomous agents. When Generative AI came out, only single models were invoked. Retrieval Augmented Generation went a step further to first search data before generating responses, but these flows were still fixed. The key change between just an LLM and an agent is the ability of an agent to invoke tools to read real-time data and to invoke business logic.

There are different definitions of the term agentic. I think everyone agrees that autonomous agents are agentic. Some people argue that also non fully autonomous systems which include tools, memory, planning and so forth are agentic systems. As always there are pros and cons. Fixed flows are less flexible, but more reliable. For autonomous agents it's the opposite. They are more flexible, but less reliable. No matter how you define the term agentic, the more features from left to right your solution utilizes, the more important observability becomes.

![image](/assets/img/2025/04/why-agents-fail-slide-14.png)

## Observability

There are many topics which you might want to observe. We already covered steps, tools and prompts. There are many more though, for example compute.

Compute is very important when it comes to agentic applications. GPUs are a critical resource. They are expensive, difficult to get, and you often don't have enough. By monitoring compute usage, you can better understand and compare the impact of different agentic architectures. In general, you should try to minimize the number of model invocations and to reduce the length of the data you pass into the models. The sizes of the models have the biggest impact on GPU usage. My advice is to use as small as possible models. In agentic systems this is more important than for architectures like RAG since typically models are invoked several times for each request.

![image](/assets/img/2025/04/why-agents-fail-slide-15.png)

## Reasons for Failures

We've looked at a couple of simple examples that demonstrate why our travel agent failed. In addition to this there are several other potential reasons why agents and agentic systems fail. I've summarized here my top 5 reasons which are related to the architectures of agentic systems. 

Reason number 1: As I said at the beginning as a developer, I'm used to develop code that always follows the same execution path. This makes it relatively easy to debug and test code. With AI this is different since AI is all about probabilities. In other words, you need to do a lot of trial and error and run experiments. Just because of the nature of AI, there is always the risk of failures.

We already talked about the second reason. If I hadn't been able to use the observability tool, I wouldn't have been able to find out what the agent did.

Reason number 3 are various tool calling failures. Wrong tools can be invoked. Wrong parameters can be passed it. Tools can be invoked too often. Tools might not return the expected output and schema. You saw some of this also in the demo.

The fourth reason are planning failures. As you know models can now 'think' which is called reasoning. Agentic systems usually start by creating an execution plan which is generated by something called an orchestration agent. If this agent is not good enough, chances are that the rest of the flow cannot produce good results. So, it's key to pick the right model and the right instruction for this agent. Agentic systems also have issues to decide when to terminate which often causes infinite looping. I'll cover this on the next slide.

The last reason why agents fail are missing citric agents which I'll explain this on one of the next slides.

![image](/assets/img/2025/04/why-agents-fail-slide-16.png)

## Types of Failures

First let me highlight another list of agentic system failures. This diagram is from a paper from Berkeley university which is only two weeks old. They go in more detail and categorize failures in poor specification, inter-agent misalignment and task verification. I like that this matrix maps the failure types to different stages: Pre execution, execution and post execution.

On the previous slide I mentioned the issue of infinite looping. Berkeley calls this more generically 'termination' and lists several termination related failures. In summary agentic system often have challenges to know when they are done. This can lead to infinite looping and premature terminations of the overall agentic systems. Furthermore, agentic systems struggle to even find out whether tasks defined in the execution plan are actually done.

![image](/assets/img/2025/04/why-agents-fail-slide-17.png)

## Critic Agents

Next, I want to circle back to my reason number 5 why agentic systems fail which was: Missing critic agents. Before I'll explain this, I make a short excursion to describe critic agents for RAG. I'm sure you all know what Retrieval Augmented Generation is. The easy flow is displayed at the top. A user asks an assistant a question which triggers a search. The top search results are passed to the LLM to generate the answer.

At the bottom of this slide, you see an agentic flow. It looks more complex, right? That's because it is more complex. The reason why you want to use it anyway is that it most likely will produce better results. Let's walk through it from left to right.

A user asks an agent a question. Note that I call it an agent, not assistant,  since the response will take longer and maybe too long for a chat client, at least if the chat client cannot handle multiple asynchronous sessions. The Q&A agent creates an execution plan which invokes the analyst agent with certain terms which can be improved queries for the original question of the user. The analyst agent has not only access to an internal search tool, but also to an internet search tool to find real-time information. The analyst agent decides which of the search results to use and creates a draft response.

Now comes the key part. On the previous slide I said one reason why agentic systems fail is the missing critic agent. Rather than returning the first draft to the user, a critic agent evaluates the quality of the response first. If it is not happy with the quality, it invokes the analyst agent again to get another draft response. Then the citric agent can decide how to move forward. For example, it might decide to merge both draft responses, it might pick only the better one or it might invoke the analyst agent yet again. This critic agent is a powerful pattern to improve the quality of an agentic system a lot to avoid failures. This is done automatically without having to have a human in the loop. And this pattern could also help with the infinite loop problem.

![image](/assets/img/2025/04/why-agents-fail-slide-18.png)

## Evaluations

I explained the key differences between classic programming and AI. While AI will never be deterministic, as a developer I'd like to understand at least what happened so that I can fix and optimize my agentic system.  My advice is to evaluate not only the final answer, but every single step in the flow.

What you see on this slide is the example from the beginning. I only added a date tool to get the current date and split the one agent in one orchestration agent plus three expert agents. I suggest to even evaluate the incoming input. If the user's question is not appropriate, the expert agents don't have to be invoked, for example. The plan that the travel generated should be evaluated as well and not only the intial plan but whenever the plan changes. Additionally, the input and output of both agents and tools should be evaluated. In our example this would determine that the weather tool was invoked with a missing input parameter.

![image](/assets/img/2025/04/why-agents-fail-slide-19.png)

## Innovation

The field of agentic and observability is evolving quickly. I'm sure that we will see a lot of innovation in this space this year. With AI you'd think that there should be something better than the current observability and traceability tools which are often too verbose and too hard to read.

There are also different activities around providing catalogs of re-usable agents and tools to allow a mix and match of agentic systems. To support interoperability of these components technologies and standards are evolving around agent communication protocols.

Rather than only testing at development time, there will be more and more production monitoring systems and governance systems. These capabilities are provided by platforms like IBM's watsonx.governance as shown here in the screenshot. These platforms provide a holistic view of everything related to agents and Generative AI in your company so that you don't have to reinvent the wheel for every use case.

![image](/assets/img/2025/04/why-agents-fail-slide-20.png)

## Next Steps

Now that you understand why agentic systems can fail and how to use observability, the question is how to learn more. My suggestion is to get your hands dirty and try it yourselves. Try out different agentic frameworks and observability tools. Don't only follow some tutorials but try to implement your own use cases. Since these systems can quickly become challenging, I'd start with simple use cases.

If you want professional help, we at IBM are here to support you. We can help with the identification of use cases, we can build together with you pilots and deploy your solutions to production. I mentioned at the beginning that the expectations of agentic don't always match reality. My colleagues have written a great article that describes this in more detail.

![image](/assets/img/2025/04/why-agents-fail-slide-21.png)