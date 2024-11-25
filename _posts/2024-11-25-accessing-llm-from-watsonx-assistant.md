---
id: nh-093
title: 'Accessing LLMs from watsonx Assistant'
date: 2024-11-25 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-093'
permalink: /article/accessing-llm-from-watsonx-assistant/
custom_permalink:
    - article/accessing-llm-from-watsonx-assistant/
image: /assets/img/2024/11/watsonx-extension-1.png
---

*watsonx Assistant and watsonx Orchestrate can access Large Language Models from watsonx.ai to build conversational experiences utilizing Generative AI capabilities via state-of-the-art models from Mistral, Meta and IBM. This blog post explains how to invoke models hosted on watsonx.ai via APIs.*

## Overview

There are several ways to use Generative AI and LLMs in Assistant and Orchtestrate, for example in Conversational Skills. One of the possibilities is covered below.

In watsonx Assistant and watsonx Orchestrate extensions can be registered that can be invoked via REST APIs when providing Swagger/OpenAPI specifications. This post describes how to leverage this capability for LLM inferences.

Detailed instructions and the Swagger API documentation can be found in the [IBM watsonx Language Model Starter Kit](https://github.com/watson-developer-cloud/assistant-toolkit/tree/master/integrations/extensions/starter-kits/language-model-watsonx).

## Extensibility

The extension needs to be installed, and actions can be imported.

![image](/assets/img/2024/11/watsonx-extension-3.png)

![image](/assets/img/2024/11/watsonx-extension-2.png)

## Usage

The usage of the extension is simple. Just configure the model’s name and watsonx.ai project id and define the prompt. There is one action for synchronous invocations and another one for streaming. See the screenshot at the top of this post.

## Next Steps

To learn more, check out the [watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate) landing page, the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) home page.