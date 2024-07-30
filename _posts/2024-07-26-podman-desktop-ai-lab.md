---
id: nh-075
title: 'Running LLMs locally via Podman Desktop'
date: 2024-07-26 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-075'
permalink: /article/podman-desktop-ai-lab/
custom_permalink:
    - article/podman-desktop-ai-lab/
image: /assets/img/2024/07/podman-ai-lab.png
---

*Podman Desktop is a great open source alternative to commercial offerings in order to run containers locally. With the new Podman AI Lab extension Large Language Models can be tested locally via techniques like GGUP quantization.*

Developers like to write and test applications locally to be as efficient as possible. However, until recently generative AI has required GPUs in the cloud. With technologies like llama.cpp, quantization, etc. it has become much easier to utilize Large Language Models (LLMs) on modern hardware for developers like MacBook Pro machines.

## Playground

With the [Podman Desktop](https://podman-desktop.io/docs/intro) extension [AI Lab](https://podman-desktop.io/docs/ai-lab) GGUP quantized models can be downloaded from HuggingFace. The HuggingFace account [TheBloke](https://huggingface.co/TheBloke) provides quantized models of popular models very soon after they have been released.

With the built-in playground models can be invoked interactively. 

![image](/assets/img/2024/07/podman-ai-lab-playground.png)

## REST APIs

In addition to the playground REST APIs can be used for model inferences.

![image](/assets/img/2024/07/podman-ai-lab-curl.png)

```
curl --location 'http://localhost:59434/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data '{
  "messages": [
    {
      "content": "You are a helpful assistant.",
      "role": "system"
    },
    {
      "content": "What is the capital of France?",
      "role": "user"
    }
  ]
}'
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.