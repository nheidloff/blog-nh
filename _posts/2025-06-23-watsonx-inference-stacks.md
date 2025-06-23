---
id: nh-130
title: 'Custom Inference Stacks in watsonx.ai'
date: 2025-06-23 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-130'
permalink: /article/watsonx-inference-stacks/
custom_permalink:
    - article/watsonx-inference-stacks/
image: /assets/img/2025/06/custom-inference-server.png
---

*Watsonx.ai comes with the popular inference stack vLLM out of the box. With the latest version it's also possible to deploy custom inference servers.*

Not every Generative AI Model can be run on vLLM. With the latest version (5.2.0) of watsonx.ai software you can deploy custom containers with inference servers to run specific models. Models which have been deployed with these custom inference servers, look and feel like any other model on watsonx.ai, for example you can use them in watsonx.ai Prompt Lab and access them over APIs. 

I like this powerful capability since watsonx.ai can be utilized as platform to host all types of Generative AI models. 

There are several pages in the documentation which describe this new feature. Below is a summary of the high-level steps.

* [Building a custom inference runtime image](
https://www.ibm.com/docs/en/software-hub/5.2.x?topic=dcfm-building-custom-inference-runtime-image-your-custom-foundation-model)
* [Example Inference Server](https://github.com/nheidloff/custom-inference-server-for-watsonx.ai)
* [Deploying Custom Images in watsonx.ai](https://heidloff.net/article/watsonx-ai-custom-images/#create-runtime-definition)
* [Example Notebook for custom Images](https://github.com/IBM/watsonx-ai-samples/blob/master/cpd5.1/notebooks/python_sdk/deployments/custom_image/Use%20Custom%20Image%2C%20Software%20Specification%20and%20Runtime%20Definition%20to%20deploy%20a%20python%20function.ipynb)
* [Setting up storage and uploading a model](https://www.ibm.com/docs/en/software-hub/5.1.x?topic=susum-setting-up-storage-uploading-model-that-is-located-in-your-environment)
* [Registering a custom foundation model](https://www.ibm.com/docs/en/software-hub/5.1.x?topic=models-registering-custom-foundation-model)
* [Requirements for deploying custom foundation models](https://www.ibm.com/docs/en/watsonx/w-and-w/2.2.0?topic=gpus-requirements-deploying-custom-foundation-models-dedicated)

## Process

The following steps describe how to deploy custom inference servers.

1. [Upload](https://www.ibm.com/docs/en/software-hub/5.2.x?topic=susum-setting-up-storage-uploading-model-that-is-located-in-your-environment) the model files to a PVC on watsonx.ai
2. [Get](https://heidloff.net/article/watsonx-ai-custom-images/#get-base-image) the base image base image 'runtime-24.1-py3.11-cuda'
3. [Develop](https://github.com/nheidloff/custom-inference-server-for-watsonx.ai) the custom inference server Python code which implements the endpoint '/v1/chat/completions'
4. [Build](https://heidloff.net/article/watsonx-ai-custom-images/#build-image) the image
5. [Push](https://www.ibm.com/docs/en/watsonx/w-and-w/2.2.0?topic=images-pushing-custom-image-image-registry) the image
6. [Create](https://www.ibm.com/docs/en/SSLSRPV_2.2.x/wsj/analyze-data/ml-deploy-custom-image-soft-spec.html) a custom software specification
7. [Create](https://www.ibm.com/docs/en/SSLSRPV_2.2.x/wsj/analyze-data/ml-deploy-custom-image-mapping.html) a custom runtime definition
8. [Choose](https://www.ibm.com/docs/en/watsonx/w-and-w/2.2.0?topic=assets-default-hardware-configurations-deployments#hardware-configurations-for-gpu-inferencing) the GPU hardware configuration
9. [Register](https://www.ibm.com/docs/en/software-hub/5.2.x?topic=models-registering-custom-foundation-model) your custom foundation model
10. [Test](https://www.ibm.com/docs/en/watsonx/w-and-w/2.2.0?topic=models-testing-deployed-custom-foundation) your model

## Example

Custom inference servers need to implement the '/v1/chat/completions' API from [OpenAI](https://platform.openai.com/docs/api-reference/chat/create). Check out the [example](https://github.com/nheidloff/custom-inference-server-for-watsonx.ai).

```python
from flask import Blueprint, request, jsonify
import uuid
import time

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/v1/chat/completions', methods=['POST'])
def chat_completions():
    data = request.get_json()

    dummy_response = {
        "id": f"chatcmpl-{uuid.uuid4().hex[:24]}",
        "object": "chat.completion",
        "created": int(time.time()),
        "model": data.get("model", "provider/model"),
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": "This is a dummy response from a mock API."
                },
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": 10,
            "completion_tokens": 10,
            "total_tokens": 20
        }
    }
    return jsonify(dummy_response)
```

While the inference server implements the OpenAI API, access from applications is consistent with other models hosted on watsonx.ai including streaming.

* POST /ml/v1/deployments/{id_or_name}/text/chat
* POST /ml/v1/deployments/{id_or_name}/text/chat_stream

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.