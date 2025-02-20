---
id: nh-108
title: 'Deploying Agentic Applications on watsonx.ai'
date: 2025-02-20 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-108'
permalink: /article/watsonx-ai-service/
custom_permalink:
    - article/watsonx-ai-service/
image: /assets/img/2025/02/watsonx-ai-service.png
---

*In watsonx.ai custom Python code can be deployed and accessed via REST APIs. This allows deploying agentic applications, models and more. This post describes the new feature "AI Service" in watsonx.ai.*

The [watsonx.ai AI Service](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ai-services-overview.html?context=wx&locale=en) is similar to the concept of containers. Custom Python code including custom dependencies can be packaged and deployed. Additionally, the watsonx.ai AI Service provides automatically secured REST APIs.

The service is available in the SaaS version of watsonx.ai and adds more capabilities on top of the features in [Python Functions](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-deploy-py-function.html?context=cpdaas).

> While Python functions are the traditional way to deploy machine learning assets, AI services offer a more flexible option to deploy code for generative AI applications like streaming.

Let's look at an [example](https://github.com/IBM/watsonx-ai-samples/blob/master/cloud/notebooks/python_sdk/deployments/foundation_models/chat/Use%20watsonx%2C%20and%20%60llama-3-1-70b-instruct%60%20to%20create%20ai%20service.ipynb).

## Runtimes

Similarly to containers developers need to define a [runtime](https://www.ibm.com/docs/en/watsonx/saas?topic=specifications-supported-frameworks-software) first, for example "runtime-24.1-py3.11".

Next you need to define the dependencies in a yaml file. The definition of the runtime with its dependencies is registered in watsonx.ai.

```python
config_yml =\
"""
name: python311
channels:
  - empty
dependencies:
  - pip:
    - langgraph==0.2.44
prefix: /opt/anaconda3/envs/python311
"""

with open("config.yaml", "w", encoding="utf-8") as f:
    f.write(config_yml)
base_sw_spec_id = api_client.software_specifications.get_id_by_name("runtime-24.1-py3.11")
meta_prop_pkg_extn = {
    api_client.package_extensions.ConfigurationMetaNames.NAME: "watsonx.ai env with langgraph",
    api_client.package_extensions.ConfigurationMetaNames.DESCRIPTION: "Environment with langgraph",
    api_client.package_extensions.ConfigurationMetaNames.TYPE: "conda_yml"
}
pkg_extn_details = api_client.package_extensions.store(meta_props=meta_prop_pkg_extn, file_path="config.yaml")
pkg_extn_id = api_client.package_extensions.get_id(pkg_extn_details)
meta_prop_sw_spec = {
    api_client.software_specifications.ConfigurationMetaNames.NAME: "AI service watsonx.ai custom software specification with langgraph",
    api_client.software_specifications.ConfigurationMetaNames.DESCRIPTION: "Software specification for AI service deployment",
    api_client.software_specifications.ConfigurationMetaNames.BASE_SOFTWARE_SPECIFICATION: {"guid": base_sw_spec_id}
}
sw_spec_details = api_client.software_specifications.store(meta_props=meta_prop_sw_spec)
sw_spec_id = api_client.software_specifications.get_id(sw_spec_details)
api_client.software_specifications.add_package_extension(sw_spec_id, pkg_extn_id)
```

## AI Service

The custom Python code is wrapped in a Python function. The following example shows a LangChain / LangGraph example to perform simple calculations. Note that parameters like credentials can be passed in.

```python
def deployable_ai_service(context, space_id=space_id, url=credentials["url"], model_id=model_id, **kwargs):    
    from ibm_watsonx_ai import APIClient, Credentials
    from langchain_ibm import ChatWatsonx
    from langchain_core.tools import tool
    from langgraph.prebuilt import create_react_agent

    api_client = APIClient(
        credentials=Credentials(url=url, token=context.generate_token()),
        space_id=space_id
    )
    chat = ChatWatsonx(
        watsonx_client=api_client,
        model_id=model_id,
        params={"temperature": 0.1}
    )
    @tool
    def add(a: float, b: float) -> float:
        """Add a and b."""
        return a + b
    ...
    tools = [add, ...]    
    graph = create_react_agent(chat, tools=tools)

    def generate(context) -> dict:        
        api_client.set_token(context.get_token())   
        payload = context.get_json()
        question = payload["question"]        
        response = graph.invoke({"messages": [("user", f"{question}")]})        
        json_messages = [msg.to_json() for msg in response['messages']]        
        response['messages'] = json_messages        
        return {"body": response}
    
    def generate_stream(context):
        ...
        
    return generate, generate_stream
```

## Flexible Interfaces

The custom Python functions are exposed via REST APIs. The input and output interfaces can be customized. This is similar to OpenAPI/Swagger, but developers only need to define the schemas and don't have to implement the APIs themselves.

> Unlike the standard Python function for deploying a predictive machine learning model, which requires input in a fixed schema, an AI service provides flexibility for multiple inputs and allows for customization.

```python
documentation_request = {
    "application/json": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "query": {"type": "string"},
            "parameters": {
                "properties": {
                    "max_new_tokens": {"type": "integer"},
                    "top_p": {"type": "number"},
                },
                "required": ["max_new_tokens", "top_p"],
            },
        },
        "required": ["query"],
    }
}
documentation_response = {
    "application/json": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {"query": {"type": "string"}, "result": {"type": "string"}},
        "required": ["query", "result"],
    }
}
meta_props = {
    client.repository.AIServiceMetaNames.NAME: "AI service example",
    client.repository.AIServiceMetaNames.DESCRIPTION: "This is AI service function",
    client.repository.AIServiceMetaNames.SOFTWARE_SPEC_ID: client.software_specifications.get_id_by_name(
        "runtime-24.1-py3.11"
    ),
    client.repository.AIServiceMetaNames.REQUEST_DOCUMENTATION: documentation_request,
    client.repository.AIServiceMetaNames.RESPONSE_DOCUMENTATION: documentation_response,
}
stored_ai_service_details = client.repository.store_ai_service(
    basic_generate_demo, meta_props
)
```

## Deployment

Before the service is deployed, it can be run and tested locally. 

```python
from ibm_watsonx_ai.deployments import RuntimeContext
context = RuntimeContext(api_client=api_client)
local_function = deployable_ai_service(context=context)
Prepare request json payload.
context.request_payload_json = {"question": "What is the total sum of the numbers 11, 13, and 20? Remember to always return the final result using the last tool message."}
Execute the generate function locally.
resp = local_function[0](context)
```

The actual deployment can be done via REST APIs, but it's easier to do it in Python.

```python
meta_props = {
    api_client.repository.AIServiceMetaNames.NAME: "AI service SDK with langgraph",    
    api_client.repository.AIServiceMetaNames.SOFTWARE_SPEC_ID: sw_spec_id
}
stored_ai_service_details = api_client.repository.store_ai_service(deployable_ai_service, meta_props)
ai_service_id = api_client.repository.get_ai_service_id(stored_ai_service_details)
meta_props = {
    api_client.deployments.ConfigurationMetaNames.NAME: "AI service with tools",
    api_client.deployments.ConfigurationMetaNames.ONLINE: {},
}
deployment_details = api_client.deployments.create(ai_service_id, meta_props)
```

## REST

The service can be invoked via Python.

```python
question = "What is the total sum of the numbers 11, 13, and 20? Remember to always return the final result using the last tool message."
deployments_results = api_client.deployments.run_ai_service(
    deployment_id, {"question": question}
)
```

Alternatively, REST endpoints are provided.

![image](/assets/img/2025/02/watsonx-ai-service2.png)

```
export API_KEY="xxx"
curl --insecure -X POST --header "Content-Type: application/x-www-form-urlencoded" --header "Accept: \
 application/json" --data-urlencode "grant_type=urn:ibm:params:oauth:grant-type:apikey" \
  --data-urlencode "apikey=$API_KEY" "https://iam.cloud.ibm.com/identity/token"
export IAM_TOKEN="xxx"
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: \
 Bearer $IAM_TOKEN" -d '{"question": "What is the total sum of the numbers 11, 13, and 20? Remember to always return the final result using the last tool message."}' "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/xxx/ai_service_stream?version=2021-05-01"
```

For the example the following output is generated:

```text
id: 6
event: message
data: {"messages": [{"lc": 1, "type": "constructor", "id": ["langchain", "schema", "messages", "HumanMessage"], "kwargs": {"content": "What is the total sum of the numbers 11, 13, and 20? Remember to always return the final result using the last tool message.", "type": "human", "id": "eb505a42-31fa-4a66-ae96-28ae5ad47eb9"}}, {"lc": 1, "type": "constructor", "id": ["langchain", "schema", "messages", "AIMessage"], "kwargs": {"content": "", "additional_kwargs": {"tool_calls": [{"id": "chatcmpl-tool-4ccc4f90101d4f1fa39dce72fb4c6ddb", "type": "function", "function": {"name": "add", "arguments": "{\"a\": \"11\", \"b\": \"13\"}"}}]}, "response_metadata": {"token_usage": {"completion_tokens": 23, "prompt_tokens": 574, "total_tokens": 597}, "model_name": "meta-llama/llama-3-1-70b-instruct", "system_fingerprint": "", "finish_reason": "tool_calls"}, "type": "ai", "id": "chatcmpl-927acf5132fd15b3278d2db1860ec6e5", "tool_calls": [{"name": "add", "args": {"a": "11", "b": "13"}, "id": "chatcmpl-tool-4ccc4f90101d4f1fa39dce72fb4c6ddb", "type": "tool_call"}], "usage_metadata": {"input_tokens": 574, "output_tokens": 23, "total_tokens": 597}, "invalid_tool_calls": []}}, {"lc": 1, "type": "constructor", "id": ["langchain", "schema", "messages", "ToolMessage"], "kwargs": {"content": "24.0", "type": "tool", "name": "add", "id": "fac6558c-780a-4125-ba8d-43e6b7e95e98", "tool_call_id": "chatcmpl-tool-4ccc4f90101d4f1fa39dce72fb4c6ddb", "status": "success"}}, {"lc": 1, "type": "constructor", "id": ["langchain", "schema", "messages", "AIMessage"], "kwargs": {"content": "", "additional_kwargs": {"tool_calls": [{"id": "chatcmpl-tool-59cdf61e95744cafb3d92d03f51c6992", "type": "function", "function": {"name": "add", "arguments": "{\"a\": \"24\", \"b\": \"20\"}"}}]}, "response_metadata": {"token_usage": {"completion_tokens": 23, "prompt_tokens": 614, "total_tokens": 637}, "model_name": "meta-llama/llama-3-1-70b-instruct", "system_fingerprint": "", "finish_reason": "tool_calls"}, "type": "ai", "id": "chatcmpl-08cc197df20736652ed205348286f53a", "tool_calls": [{"name": "add", "args": {"a": "24", "b": "20"}, "id": "chatcmpl-tool-59cdf61e95744cafb3d92d03f51c6992", "type": "tool_call"}], "usage_metadata": {"input_tokens": 614, "output_tokens": 23, "total_tokens": 637}, "invalid_tool_calls": []}}, {"lc": 1, "type": "constructor", "id": ["langchain", "schema", "messages", "ToolMessage"], "kwargs": {"content": "44.0", "type": "tool", "name": "add", "id": "9e76181f-558e-4e27-869b-8a9cc891e6de", "tool_call_id": "chatcmpl-tool-59cdf61e95744cafb3d92d03f51c6992", "status": "success"}}, {"lc": 1, "type": "constructor", "id": ["langchain", "schema", "messages", "AIMessage"], "kwargs": {"content": "The total sum of the numbers 11, 13, and 20 is 44.", "response_metadata": {"token_usage": {"completion_tokens": 20, "prompt_tokens": 654, "total_tokens": 674}, "model_name": "meta-llama/llama-3-1-70b-instruct", "system_fingerprint": "", "finish_reason": "stop"}, "type": "ai", "id": "chatcmpl-915c024f7aca64d677298c43b3d7f864", "usage_metadata": {"input_tokens": 654, "output_tokens": 20, "total_tokens": 674}, "tool_calls": [], "invalid_tool_calls": []}}]}
id: 7
event: eos
```

## Credentials

Credentials are stored in a vault.

> AI services offer a secure solution to deploy your code functions. For example, credentials such as bearer tokens that are required for authentication are generated from task credentials by the service and the token is made available to the AI service asset. You can use this token to get connection assets, download data assets, and more.

```python
from ibm_watsonx_ai import Credentials

credentials = Credentials(
    url="https://us-south.ml.cloud.ibm.com",
    api_key="xxx"
)

def deployable_ai_service(context, space_id=space_id, url=credentials["url"], model_id=model_id, **kwargs):    
    ...
    api_client = APIClient(
        credentials=Credentials(url=url, token=context.generate_token()),
        space_id=space_id
    )
    ...
    def generate(context) -> dict:        
        api_client.set_token(context.get_token())   
        payload = context.get_json()
        question = payload["question"]        
        response = graph.invoke({"messages": [("user", f"{question}")]}) 
```

# Next Steps

With watsonx.ai Agent Lab agentic applications are generated which utilize the functionality above. I'll blog about this soon.