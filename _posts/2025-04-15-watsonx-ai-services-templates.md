---
id: nh-122
title: 'Agentic Templates for watsonx.ai'
date: 2025-04-15 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-122'
permalink: /article/watsonx-ai-services-templates/
custom_permalink:
    - article/watsonx-ai-services-templates/
image: /assets/img/2025/04/ai-services-00.png
---

*Custom Python code for agentic applications can be deployed on watsonx.ai so that various agentic applications can be managed consistently and accessed securely. There are templates to help developers and AI Engineers to get started quickly.*

Watsonx.ai comes with a feature called 'AI Service' which allows packaging and deploying custom Python code similarly to containers. My post [Deploying Agentic Applications on watsonx.ai]({{ "/article/watsonx-ai-service/" | relative_url }}) describes the core concepts.

Watsonx.ai services like Agent Lab generate code that contains and deploys AI services. This code can be used to get started, but since everything is in one notebook, the code is not trivial to manage. To utilize code control systems and CI/CD pipelines, IBM proposes a certain project structure.

## Templates

There are various [templates](https://github.com/IBM/watsonx-developer-hub/tree/main/agents) for different agent frameworks and the list is growing.

* Base
  * autogen-agent
  * beeai-framework-react-agent
  * crewai-websearch-agent
  * langgraph-react-agent
  * llamaindex-websearch-agent
* Community
  * langgraph-agentic-rag
  * langgraph-arxiv-research
  * langgraph-tavily-tool

## AI Service

The Python code needs to be wrapped in an AI Service and needs to provide the functions 'generate' and 'generate_stream'. The [LangGraph example](https://github.com/IBM/watsonx-developer-hub/tree/main/agents/base/langgraph-react-agent) comes with an example [agent](https://github.com/IBM/watsonx-developer-hub/blob/main/agents/base/langgraph-react-agent/src/langgraph_react_agent_base/agent.py) and an example [tool](https://github.com/IBM/watsonx-developer-hub/blob/main/agents/base/langgraph-react-agent/src/langgraph_react_agent_base/tools.py).

```python
def deployable_ai_service(context, url = None, space_id = None, model_id = None, thread_id = None):
    from typing import Generator
    from langgraph_react_agent_base.agent import get_graph_closure
    from ibm_watsonx_ai import APIClient, Credentials
    ...
    client = APIClient(
        credentials=Credentials(url=url, token=context.generate_token()),
        space_id=space_id,
    )
    graph = get_graph_closure(client, model_id)
    ...
    def generate(context) -> dict:
        ...
        return execute_response

    def generate_stream(context) -> Generator[dict, ..., ...]:
        ...
        return generate, generate_stream
```

## Project Structure

Projects have the following structure:

* langgraph-react-agent
  * src
    * langgraph_react_agent_base
      * agent.py
      * tools.py
  * schema
  * ai_service.py
  * config.toml
  * pyproject.toml

The 'config.toml' file contains the following configuration:

* API key
* Watsonx Endpoint
* Space ID
* Model ID
* Custom key/value pairs and credentials

Custom key/value pairs can be used as well as [credentails](https://github.com/IBM/watsonx-developer-hub/tree/main/agents/community/langgraph-tavily-tool#setting-up-secrets-manager).

## CLI and Python

There is a [CLI](https://github.com/IBM/watsonx-developer-hub/tree/main/agents) and Python code to deploy AI services.

```bash
python scripts/deploy.py
```

Code can be tested locally and the deployed code can be invoked remotely:

```bash
python examples/execute_ai_service_locally.py
python examples/query_existing_deployment.py
```

## Deployment

The deployment creates a code asset and the AI service.

![image](/assets/img/2025/04/ai-services-01.png)

![image](/assets/img/2025/04/ai-services-02.png)

There is also a nice chat user interface to try the AI service in a playground - see the image at the top of this post.

## API

After the deployments endpoints are provided including authentication.

![image](/assets/img/2025/04/ai-services-03.png)

There are also examples how to invoke the endpoint from several programming languages.

![image](/assets/img/2025/04/ai-services-04.png)

## Next Steps

Here are some resources:

* [Deploying Agentic Applications on watsonx.ai]({{ "/article/watsonx-ai-service/" | relative_url }})
* [Generating Agentic Applications with watsonx.ai Agent Lab]({{ "/article/watsonx-ai-agent-lab-service/" | relative_url }})
* [Resource Specifications for Custom Code in watsonx.ai]({{ "/article/watsonx-ai-resource-specification-injection/" | relative_url }})
* Predefined [software specifications](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/pm_service_supported_frameworks.html?context=wx&audience=wdp)
* Predefined [hardware specifications](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-hardware-configs.html?context=wx)
* [Customizing runtimes with external libraries and packages](https://www.ibm.com/docs/en/watsonx/w-and-w/2.1.0?topic=runtimes-customizing-external-libraries-packages)


To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.