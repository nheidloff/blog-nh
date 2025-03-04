---
id: nh-110
title: 'Generating Agentic Applications with watsonx.ai Agent Lab'
date: 2025-02-24 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-110'
permalink: /article/watsonx-ai-agent-lab-service/
custom_permalink:
    - article/watsonx-ai-agent-lab-service/
image: /assets/img/2025/02/agent-lab-code-1.png
---

*Watsonx.ai Agent Lab is a low-code tool for building and deploying agents. It can also be used by pro-code developers to generate code for agentic applications which can be extended and optimized.*

This post is part of a mini-series about watsonx.ai Agent Lab:

* [Getting started with watsonx.ai Agent Lab]({{ "/article/watsonx-ai-agent-lab/" | relative_url }})
* [Deploying Agentic Applications on watsonx.ai]({{ "/article/watsonx-ai-service/" | relative_url }})
* [Structured Output of Large Language Models]({{ "/article/llm-structured-output/" | relative_url }})

Agent Lab generates Python code which utilizes Pydantic and watsonx.ai AI Services. The code can be exported to a notebook which can be run directly in watsonx.ai and downloaded to be run locally.

At this point the beta version of Agent Lab supports LangGraph. The generated code can be extended and deployed on watsonx.ai, for example LangGraph could be exchanged with other agent frameworks like Bee AI.

## Set up Environment

Let's look at a generated example notebook.

![image](/assets/img/2025/02/agent-lab-code-2.png)

In the first step the environment is configured including credentials, project and space ids.

```python
import os
import getpass
import requests

def get_credentials():
    return {
        "url" : "https://us-south.ml.cloud.ibm.com",
        "apikey" : "xxx"
    }
def get_bearer_token():
    url = "https://iam.cloud.ibm.com/identity/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = f"grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey={credentials['apikey']}"

    response = requests.post(url, headers=headers, data=data)
    return response.json().get("access_token")

credentials = get_credentials()
from ibm_watsonx_ai import APIClient
client = APIClient(credentials)
space_id = "xxx"
client.set.default_space(space_id)
source_project_id = "xxx"
params = {
    "space_id": space_id,
}
```

## Create AI Service Function

The following snippet demonstrates multiple concepts. First the complete custom application is wrapped in a Python function 'gen_ai_service' which provides the sub-functions 'generate' and 'generate_stream'.

There are two types of tools:

1. Remote Tools which are provided out-of-the-box and made available in a catalog
2. Custom local Python tools

To ensure that tools get the required input, agents use 'Structured Output' which should match the same schema.

The prompt contains some default instructions plus the text defined in the Agent Lab user interface.

```python
def gen_ai_service(context, params = params, **custom):
    from langchain_ibm import ChatWatsonx
    from ibm_watsonx_ai import APIClient
    from langchain_core.messages import AIMessage, HumanMessage
    from langchain.tools import WikipediaQueryRun
    from langchain_community.utilities import WikipediaAPIWrapper
    from langchain_community.tools import DuckDuckGoSearchRun
    from langchain_community.utilities import DuckDuckGoSearchAPIWrapper
    from langgraph.checkpoint.memory import MemorySaver
    from langgraph.prebuilt import create_react_agent
    import json

    model = "meta-llama/llama-3-3-70b-instruct"  
    service_url = "https://us-south.ml.cloud.ibm.com"
    credentials = {
        "url": service_url,
        "token": context.generate_token()
    }
    client = APIClient(credentials)
    space_id = params.get("space_id")
    client.set.default_space(space_id)
    def create_chat_model(watsonx_client):
        parameters = {
            "frequency_penalty": 0,
            "max_tokens": 2000,
            "presence_penalty": 0,
            "temperature": 0,
            "top_p": 1
        }
        chat_model = ChatWatsonx(
            model_id=model,
            url=service_url,
            space_id=space_id,
            params=parameters,
            watsonx_client=watsonx_client,
        )
        return chat_model
    
    def get_schema_model(original_json_schema):
        from datamodel_code_generator import DataModelType, PythonVersion
        from datamodel_code_generator.model import get_data_model_types
        from datamodel_code_generator.parser.jsonschema import JsonSchemaParser
        from typing import Optional
        from pydantic import BaseModel, Field, constr
        import json
        json_schema = json.dumps(original_json_schema)
        data_model_types = get_data_model_types(
            DataModelType.PydanticV2BaseModel,
            target_python_version=PythonVersion.PY_311
        )
        parser = JsonSchemaParser(
            json_schema,
            data_model_type=data_model_types.data_model,
            data_model_root_type=data_model_types.root_model,
            data_model_field_type=data_model_types.field_model,
            data_type_manager_type=data_model_types.data_type_manager,
            dump_resolve_reference_action=data_model_types.dump_resolve_reference_action,
        )
        model_code = parser.parse()
        full_code = model_code
        namespace = {
            "Field": Field,
            "constr": constr,
            "Optional": Optional
        }
        value = exec(full_code, namespace)
        value = exec("Model.model_rebuild()", namespace)
        pydantic_model = namespace['Model']
        return pydantic_model
    
    def get_remote_tool_descriptions():
        remote_tool_descriptions = {}
        remote_tool_schemas = {}
        import requests
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f'Bearer {context.generate_token()}'
        }
        tool_url = "https://private.api.dataplatform.cloud.ibm.com"
        remote_tools_response = requests.get(f'{tool_url}/wx/v1-beta/utility_agent_tools', headers = headers)
        remote_tools = remote_tools_response.json()
        for resource in remote_tools["resources"]:
            tool_name = resource["name"]
            tool_description = resource["description"]
            tool_schema = resource.get("input_schema")
            remote_tool_descriptions[tool_name] = tool_description
            if (tool_schema):
                remote_tool_schemas[tool_name] = get_schema_model(tool_schema)
        return remote_tool_descriptions, remote_tool_schemas
   
    tool_descriptions, tool_schemas = get_remote_tool_descriptions()
    
    def create_remote_tool(tool_name, context):
        from langchain_core.tools import StructuredTool
        from langchain_core.tools import Tool
        import requests
        def call_tool( tool_input ):
            body = {
                "tool_name": tool_name,
                "input": tool_input
            }
            headers  = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": f'Bearer {context.get_token()}'
            }
            tool_url = "https://private.api.dataplatform.cloud.ibm.com"
            tool_response = requests.post(f'{tool_url}/wx/v1-beta/utility_agent_tools/run', headers = headers, json = body)
            if (tool_response.status_code > 400):
                raise Exception(f'Error calling remote tool: {tool_response.json()}' )
            tool_output = tool_response.json()
            return tool_response.json().get("output")
    
        def call_tool_structured(**tool_input):
            return call_tool(tool_input)
    
        def call_tool_unstructured(tool_input):
            return call_tool(tool_input)
        
        remote_tool_schema = tool_schemas.get(tool_name)
    
        if (remote_tool_schema):
            tool = StructuredTool(
                name=tool_name,
                description = tool_descriptions[tool_name],
                func=call_tool_structured,
                args_schema=remote_tool_schema
            )
            return tool    
    
        tool = Tool(
            name=tool_name,
            description = tool_descriptions[tool_name],
            func=call_tool_unstructured
        )
        return tool            
    
    def create_custom_tool(tool_name, tool_description, tool_code, tool_schema):
        from langchain_core.tools import StructuredTool
        import ast
    
        def call_tool(**kwargs):
            tree = ast.parse(tool_code, mode="exec")
            function_name = tree.body[0].name
            compiled_code = compile(tree, 'custom_tool', 'exec')
            namespace = {}
            exec(compiled_code, namespace)
            return namespace[function_name](**kwargs)
            
        tool = StructuredTool(
            name=tool_name,
            description = tool_description,
            func=call_tool,
            args_schema=get_schema_model(tool_schema)
        )
        return tool
    
    def create_custom_tools():
        custom_tools = []
    

    def create_tools(inner_client, context):
        tools = []
        
        tools.append(create_remote_tool("GoogleSearch", context))
        return tools
    
    def create_agent(model, tools, messages):
        memory = MemorySaver()
        instructions = """
# Notes
- Use markdown syntax for formatting code snippets, links, JSON, tables, images, files.
- Any HTML tags must be wrapped in block quotes, for example <html>.
- When returning code blocks, specify language.
- Sometimes, things don't go as planned. Tools may not provide useful information on the first few tries. You should always try a few different approaches before declaring the problem unsolvable.
- When the tool doesn't give you what you were asking for, you must either use another tool or a different tool input.
- When using search engines, you try different formulations of the query, possibly even in a different language.
- You cannot do complex calculations, computations, or data manipulations without using tools.
- If you need to call a tool to compute something, always call it instead of saying you will call it.

If a tool returns an IMAGE in the result, you must include it in your answer as Markdown.

Example:

Tool result: IMAGE(https://api.dataplatform.cloud.ibm.com/wx/v1-beta/utility_agent_tools/cache/images/plt-04e3c91ae04b47f8934a4e6b7d1fdc2c.png)
Markdown to return to user: ![Generated image](https://api.dataplatform.cloud.ibm.com/wx/v1-beta/utility_agent_tools/cache/images/plt-04e3c91ae04b47f8934a4e6b7d1fdc2c.png)

You are a helpful assistant that uses tools to answer questions in detail.
When greeted, say Hi, I am watsonx.ai agent. How can I help you?
"""
        for message in messages:
            if message["role"] == "system":
                instruction += message["content"]
        graph = create_react_agent(model, tools=tools, checkpointer=memory, state_modifier=instructions)
        return graph
    
    def convert_messages(messages):
        converted_messages = []
        for message in messages:
            if (message["role"] == "user"):
                converted_messages.append(HumanMessage(content=message["content"]))
            elif (message["role"] == "assistant"):
                converted_messages.append(AIMessage(content=message["content"]))
        return converted_messages

    def generate(context):
        payload = context.get_json()
        messages = payload.get("messages")
        inner_credentials = {
            "url": service_url,
            "token": context.get_token()
        }
        inner_client = APIClient(inner_credentials)
        model = create_chat_model(inner_client)
        tools = create_tools(inner_client, context)
        agent = create_agent(model, tools, messages)
        generated_response = agent.invoke(
            { "messages": convert_messages(messages) },
            { "configurable": { "thread_id": "42" } }
        )
        last_message = generated_response["messages"][-1]
        generated_response = last_message.content
        execute_response = {
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "choices": [{
                    "index": 0,
                    "message": {
                       "role": "assistant",
                       "content": generated_response
                    }
                }]
            }
        }
        return execute_response

    def generate_stream(context):
      ...
```

## Store and deploy AI Service

The Python code can be deployed as AI Service with an REST endpoint and a specific input and output schema.

```python
software_spec_id_in_project = "xxx"
software_spec_id = ""
try:
	software_spec_id = client.software_specifications.get_id_by_name("ai-service-v4-software-specification")
except:
    software_spec_id = client.spaces.promote(software_spec_id_in_project, source_project_id, space_id)
request_schema = {
    "application/json": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "messages": {
                "title": "The messages for this chat session.",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "role": {
                            "title": "The role of the message author.",
                            "type": "string",
                            "enum": ["user","assistant"]
                        },
                        "content": {
                            "title": "The contents of the message.",
                            "type": "string"
                        }
                    },
                    "required": ["role","content"]
                }
            }
        },
        "required": ["messages"]
    }
}
response_schema = {
    "application/json": {
        "oneOf": [
            {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "description": "AI Service response for /ai_service_stream",
                "properties": {
                    "choices": {
                        "description": "A list of chat completion choices.",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "index": {
                                    "type": "integer",
                                    "title": "The index of this result."
                                },
                                "delta": {
                                    "description": "A message result.",
                                    "type": "object",
                                    "properties": {
                                        "content": {
                                            "description": "The contents of the message.",
                                            "type": "string"
                                        },
                                        "role": {
                                            "description": "The role of the author of this message.",
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "role"
                                    ]
                                }
                            }
                        }
                    }
                },
                "required": [
                    "choices"
                ]
            },
            {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "description": "AI Service response for /ai_service",
                "properties": {
                    "choices": {
                        "description": "A list of chat completion choices",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "index": {
                                    "type": "integer",
                                    "description": "The index of this result."
                                },
                                "message": {
                                    "description": "A message result.",
                                    "type": "object",
                                    "properties": {
                                        "role": {
                                            "description": "The role of the author of this message.",
                                            "type": "string"
                                        },
                                        "content": {
                                            "title": "Message content.",
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "role"
                                    ]
                                }
                            }
                        }
                    }
                },
                "required": [
                    "choices"
                ]
            }
        ]
    }
}
ai_service_metadata = {
    client.repository.AIServiceMetaNames.NAME: "niklas-demo",
    client.repository.AIServiceMetaNames.DESCRIPTION: "",
    client.repository.AIServiceMetaNames.SOFTWARE_SPEC_ID: software_spec_id,
    client.repository.AIServiceMetaNames.CUSTOM: {},
    client.repository.AIServiceMetaNames.REQUEST_DOCUMENTATION: request_schema,
    client.repository.AIServiceMetaNames.RESPONSE_DOCUMENTATION: response_schema,
    client.repository.AIServiceMetaNames.TAGS: ["wx-agent"]
}
ai_service_details = client.repository.store_ai_service(meta_props=ai_service_metadata, ai_service=gen_ai_service)
ai_service_id = client.repository.get_ai_service_id(ai_service_details)
deployment_custom = {
    "avatar_icon": "Bot",
    "avatar_color": "background",
    "placeholder_image": "placeholder2.png"
}
deployment_metadata = {
    client.deployments.ConfigurationMetaNames.NAME: "niklas-demo",
    client.deployments.ConfigurationMetaNames.ONLINE: {},
    client.deployments.ConfigurationMetaNames.CUSTOM: deployment_custom,
    client.deployments.ConfigurationMetaNames.DESCRIPTION: "Change this description to reflect your particular agent",
    client.repository.AIServiceMetaNames.TAGS: ["wx-agent"]
}
function_deployment_details = client.deployments.create(ai_service_id, meta_props=deployment_metadata, space_id=space_id)
```

## Templates for AI Services

The code above has been generated by Agent Lab in one single notebook. For more sophisticated agentic applications it makes sense to structure the code better. IBM has started to provide 'templates' to write AI Services based on certain agent frameworks, for example:

* [Base LangGraph LLM app Template](https://github.com/IBM/watsonx-developer-hub/tree/main/agents/langgraph)
* [Base CrewAI LLM app Template](https://github.com/IBM/watsonx-developer-hub/tree/main/agents/crewai)
* [LlamaIndex Workflow LLM app Template](https://github.com/IBM/watsonx-developer-hub/tree/main/agents/llamaindex)

## Next Steps

Check out the following resources to learn more.

* [Documentation: Agent Lab (beta)](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-agent-lab.html?context=wx&pos=2b)
* [Start building AI Agents on watsonx.ai with Agent Lab](https://www.ibm.com/new/announcements/start-building-ai-agents-on-watsonx-ai-with-agent-lab)