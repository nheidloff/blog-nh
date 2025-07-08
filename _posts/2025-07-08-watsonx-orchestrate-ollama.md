---
id: nh-133
title: 'Accessing local Models in watsonx Orchestrate via Ollama'
date: 2025-07-08 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-133'
permalink: /article/watsonx-orchestrate-ollama/
custom_permalink:
    - article/watsonx-orchestrate-ollama/
image: /assets/img/2025/07/watsonx-orchestrate-ollama-00.png
---

*Watsonx Orchestrate is IBM's platform to run agentic systems. While low-code developers can use the user interface to build agents, pro-code developers can use the Agent Development Kit to build sophisticated applications. To make developers productive, Orchestrate can be run locally via the watsonx Orchestrate Developer Edition. This post describes how to access local models from local watsonx Orchestrate agents.*

With the new [watsonx.ai Model Gateway](https://www.ibm.com/new/announcements/watsonx-ai-model-gateway-in-public-preview) external models can be integrated in watsonx.ai, for example OpenAI models. The [gateway](https://www.ibm.com/docs/en/watsonx/saas?topic=models-using-model-gateway-beta) is utilized within watsonx Orchestrate and allows accessing even local models. Once developers have downloaded the watsonx Orchestrate images and the models, everything can be run locally. As a developer I love this!

The screenshot at the top shows how to run the open-source model [Granite 3.3](https://ollama.com/library/granite3.3) locally via Ollama in watsonx Orchestrate.

The following paragraphs describe how to set up the full local environment.

## Setup of Orchestrate

Let's start with the setup of the [Agent Development Kit (ADK)](https://developer.watson-orchestrate.ibm.com/getting_started/installing).

```bash
python3.13 -m venv venv
source venv/bin/activate
pip install ibm-watsonx-orchestrate
```

To run the containers locally, you need a container runtime like Rancher with dockerd (moby) as container engine.

Before the containers can be started, a file with environment variables needs to be created. You need an IBMid and an [entitlement key](https://myibm.ibm.com/).

The watsonx API key and space id are needed when accessing models from watsonx.ai.

```text
WO_DEVELOPER_EDITION_SOURCE=myibm
WO_ENTITLEMENT_KEY=<my_entitlement_key>
WATSONX_APIKEY=<my_watsonx_api_key>
WATSONX_SPACE_ID=<my_space_id>
```

Next the containers can be started:

```bash
orchestrate server start --env-file=./.env-dev -l
```

Before the user interface can be opened an agent needs to be imported first.

```bash
git clone https://github.com/IBM/ibm-watsonx-orchestrate-adk.git
cd ibm-watsonx-orchestrate-adk/examples/agent_builder/ibm_knowledge
sh import_all.sh
orchestrate chat start
docker ps --filter network=wxo-server'
open http://localhost:3000/
```

## Setup of Ollama

There are two ways to set up Ollama for Orchestrate with pros and cons:

1. Run Ollama locally and configure the network to allow Orchestrate to access Ollama (described in this post)
2. Run Ollama as container in the same container network 'wxo-server'

To access local models running in Ollama, some setup is required.

```bash
brew install ollama
ollama run granite3.3
export OLLAMA_HOST=0.0.0.0:11434
ollama serve
```

Next get the IP address of your local network. This part is a little tricky. The following steps worked for me on a MacBook.

```bash
ipconfig getifaddr en0
```

Try to invoke Ollama via curl. Replace '192.168.178.184' with the result from the previous command:

```bash
curl --request POST \
  --url http://192.168.178.184:11434/v1/chat/completions \
  --header 'content-type: application/json' \
  --data '{
  "model": "granite3.3",
  "messages": [
    {
      "content": "Hi",
      "role": "user"
    }
  ]
}'
```

I needed some time to get this working. Some notes that might help you:

* I had to connect to ethernet and wifi at the same time. Otherwise, the command above wouldn't have an IP for en0.
* Disconnect and close all VPN clients.
* Do not change networks.
* Try resetting and restarting watsonx Orchestrate.

To try the configuration execute the same curl command above in the gateway container:

```bash
docker exec -it docker-wxo-agent-gateway-1 sh
```

Once this works the actual [configuration](https://developer.watson-orchestrate.ibm.com/llm/managing_llm) for watsonx Orchestrate can be done:

```bash
orchestrate models add --name ollama/granite3.3 --provider-config '{"custom_host": "http://192.168.178.184:11434", "api_key": "ollama"}'
```

To validate whether everything works, open the user interface and try the chat. To find out more, you can open the user interface of the gateway.

![image](/assets/img/2025/07/watsonx-orchestrate-ollama-01.png)

![image](/assets/img/2025/07/watsonx-orchestrate-ollama-02.png)

## Next Steps

To find out more, check out the following resources:

* Developer watsonx Orchestrate [Managing custom LLMs](https://developer.watson-orchestrate.ibm.com/llm/managing_llm)
* Developer watsonx Orchestrate [Installing the ADK](https://developer.watson-orchestrate.ibm.com/getting_started/installing)
* Developer watsonx Orchestrate [Installing the watsonx Orchestrate Developer Edition](https://developer.watson-orchestrate.ibm.com/getting_started/wxOde_setup)
* [Model Gateway documentation](https://www.ibm.com/docs/en/watsonx/saas?topic=models-using-model-gateway-beta)