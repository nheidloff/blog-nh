---
id: nh-114
title: 'Deploying Embedding Models on watsonx.ai'
date: 2025-03-11 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-114'
permalink: /article/watsonx-ai-embedding-models/
custom_permalink:
    - article/watsonx-ai-embedding-models/
image: /assets/img/2025/03/python-function-00.png
---

*Watsonx.ai provides various Large Language Models and Embedding Models out of the box. Models that are not supported by the watsonx.ai inference stack can be deployed via Python Functions.*

Watsonx.ai supports different open-source Large Language Models, Embedding and ReRanker Models, Time Series Models and more.

* [Models in watsonx.ai](https://www.ibm.com/docs/en/software-hub/5.1.x?topic=install-foundation-models#watsonxai-models__embedding)
* [Supported hardware, model architectures and performance settings](https://www.ibm.com/docs/en/software-hub/5.1.x?topic=model-supported-architecture-performance-settings)

vLLM is utilized as inference stack. Even if models are not officially supported, they might work on watsonx.ai if they work on [vLLM](https://docs.vllm.ai/en/latest/models/supported_models.html).

Models that don't run on vLLM can be deployed via `Python Functions` and `AI Services` which are like containers. Read my post [Deploying Agentic Applications on watsonx.ai]({{ "/article/watsonx-ai-service/" | relative_url }}).

## Embeddings

Embeddings are vector representations of words and are used for semantic searches in RAG and for other similarity searches. For example, ReRankers can help to rank search results in memory after RAG searches to improve the results.

The [HuggingFace Leaderbord](https://huggingface.co/spaces/mteb/leaderboard) lists different embeddings models. For different use cases certain embedding models work better than other ones if they are specialized on a certain domain, for example languages.

It can also make sense to fine-tune your own embedding models to optimize the retrieval performance of your RAG application, see [Fine-tune Embedding models for Retrieval Augmented Generation](https://www.philschmid.de/fine-tune-embedding-model-for-rag).

Let's look at an example which uses [bilingual-embedding-large](https://huggingface.co/Lajavaness/bilingual-embedding-large), a bilingual language embedding model for French and English.

The model is based on an architecture that vLLM does not support.

```json
{
  "_name_or_path": "dangvantuan/bilingual_impl",
  "architectures": [
    "BilingualModel"
  ],
  ...
}
```

The code leverages the standard library sentence-transformers.

```bash
python3.11 -m venv venv
source venv/bin/activate
!pip install sentence-transformers==3.4.1
```

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("Lajavaness/bilingual-embedding-large", trust_remote_code=True)
sentences = [
    "Paris est une capitale de la France",
    "Paris is a capital of France",
    "Niklas Heidloff works for IBM et il aime le développement de logiciels"
]
embeddings = model.encode(sentences)

similarities = model.similarity(embeddings, embeddings)
print(similarities)
#tensor([[1.0000, 0.8833, 0.0802],
#        [0.8833, 1.0000, 0.0306],
#        [0.0802, 0.0306, 1.0000]])
```

The result shows that the first two sentences about Paris are more similar than the last sentence.

## Deployable Function

This post demonstrates [Python Functions](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-deploy-py-function-write.html?context=cpdaas)
. AI Services are more flexible but not supported yet in the software version of watsonx.ai.

Update 12.02.25: AI Services are supported in [2.1.1](https://www.ibm.com/docs/en/watsonx/w-and-w/2.1.x?topic=new-watsonxai).

```python
def deployable_function():
    """
    Deployable Python Function
    """
    def score(payload):
        from sentence_transformers import SentenceTransformer
        try:
            model = SentenceTransformer("Lajavaness/bilingual-embedding-large", trust_remote_code=True)
            sentences = payload['input_data'][0]['values']
            embeddings = model.encode(sentences)
            result = []
            index = 0
            for row in embeddings:
                result.append({sentences[index]: str(row)})
                index = index + 1
            output = {
                'predictions': [
                    {'values': str(result)}
                ]
            }          
            return(output)
        except Exception as e:
            return {'predictions': [{'values': [repr(e)]}]}    
    return score
```

## Notebook

The function can be deployed via REST APIs or Python. Below a notebook is run in a Python environment with CPUs. Note that this environment is different from the one the deployed function will use!

![image](/assets/img/2025/03/python-function-02.png)

The first part of the notebook sets up credentials. 

```python
!pip install -U ibm-watsonx-ai | tail -n 1
!pip install sentence-transformers==3.4.1
api_key = "xxx"
space_id = "xxx"

from ibm_watsonx_ai import Credentials
credentials = Credentials(
    url = "https://cpd-watsonx.apps.fusion-hci.xxx",
    username = "xxx",
    api_key = api_key,
    instance_id = "openshift",
    version = "5.0"
)
from ibm_watsonx_ai import APIClient
client = APIClient(credentials)
client.set.default_space(space_id)
```

After this the function can be invoked directly in the notebook for testing purposes. The example returns the embeddings for the three sentences.

```python
sentences = [
    "Paris est une capitale de la France",
    "Paris is a capital of France",
    "Niklas Heidloff works for IBM et il aime le développement de logiciels"
]
payload = deployable_function()({
    "input_data": [{
        "values" : sentences
    }]
})
print(payload)
# {'predictions': [{
#   'values': "[
#     {'Paris est une capitale de la France': '[-0.00971037  0.04192735  0.00290196 ...  0.01251461 -0.01226924\\n  0.02913582]'}, 
#     {'Paris is a capital of France': '[-0.00085885  0.04388924 -0.00083831 ...  0.02374511 -0.00984441\\n  0.02858762]'}, 
#     {'Niklas Heidloff works for IBM et il aime le développement de logiciels': '[-0.08408933 -0.0428754  -0.03804896 ... -0.03178102  0.00735097\\n  0.00501928]'}]
# "}]}
```

## Environment

The example uses a predefined Python environment plus custom dependencies which are defined in Conda yaml files. 

```python
config_yml =\
"""
name: python311
channels:
  - conda-forge
  - nodefaults
dependencies:
  - pip
  - pip:
      - sentence-transformers
prefix: /opt/anaconda3/envs/python311
"""
with open("config.yaml", "w", encoding="utf-8") as f:
    f.write(config_yml)

base_sw_spec_id = client.software_specifications.get_id_by_name("runtime-24.1-py3.11")
meta_prop_pkg_extn = {
    client.package_extensions.ConfigurationMetaNames.NAME: "sentence-transformers env",
    client.package_extensions.ConfigurationMetaNames.DESCRIPTION: "Environment with sentence-transformers",
    client.package_extensions.ConfigurationMetaNames.TYPE: "conda_yml"
}
pkg_extn_details = client.package_extensions.store(meta_props=meta_prop_pkg_extn, file_path="config.yaml")
pkg_extn_id = client.package_extensions.get_id(pkg_extn_details)
pkg_extn_url = client.package_extensions.get_href(pkg_extn_details)

meta_prop_sw_spec = {
    client.software_specifications.ConfigurationMetaNames.NAME: "sentence-transformers software_spec",
    client.software_specifications.ConfigurationMetaNames.DESCRIPTION: "Software specification to use sentence-transformers",
    client.software_specifications.ConfigurationMetaNames.BASE_SOFTWARE_SPECIFICATION: {"guid": base_sw_spec_id}
}

sw_spec_details = client.software_specifications.store(meta_props=meta_prop_sw_spec)
sw_spec_id = client.software_specifications.get_id(sw_spec_details)
client.software_specifications.add_package_extension(sw_spec_id, pkg_extn_id)
sw_spec_id = client.software_specifications.get_id_by_name("sentence-transformers software_spec")
client.software_specifications.get_details(sw_spec_id)
client.software_specifications.list()
```

Next choose a [hardware configuration](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-hardware-configs.html?context=wx).

```python
asset_uid = client.hardware_specifications.get_id_by_name("L")
print("hw spec",asset_uid)
```

## Deployment

Before the deployment the function needs to be stored.

```python
meta_props = {
    client.repository.FunctionMetaNames.NAME: "custom embedding bilingual-embedding-large",
    client.repository.FunctionMetaNames.SOFTWARE_SPEC_ID: sw_spec_id
}
function_details = client.repository.store_function(meta_props=meta_props, function=deployable_function)
function_id = client.repository.get_function_id(function_details)
client.repository.list_functions()
```

Now the actual deployment can be invoked. The screenshot at the top shows how the function deployment is displayed in the user interface.

```python
metadata = {
    client.deployments.ConfigurationMetaNames.NAME: "Deployment of custom embedding bilingual-embedding-large",
    client.deployments.ConfigurationMetaNames.ONLINE: {},
    client.deployments.ConfigurationMetaNames.HARDWARE_SPEC: { "id": asset_uid }
}
function_deployment = client.deployments.create(function_id, meta_props=metadata)
deployment_id = client.deployments.get_id(function_deployment)
print(deployment_id)
```

![image](/assets/img/2025/03/python-function-01.png)

## Endpoint

After the successful deployment an endpoint will be provided.

![image](/assets/img/2025/03/python-function-03.png)

The snippet can be run in a notebook.

```python
sentences = [
    "Paris est une capitale de la France",
    "Paris is a capital of France",
    "Niklas Heidloff works for IBM et il aime le développement de logiciels"
]
scoring_payload = {
    "input_data": [{
        "values" : sentences
    }]
}
predictions = client.deployments.score(deployment_id, scoring_payload)
print(predictions)
# {'predictions': [{
#   'values': "[
#     {'Paris est une capitale de la France': '[-0.00971037  0.04192735  0.00290196 ...  0.01251461 -0.01226924\\n  0.02913582]'}, 
#     {'Paris is a capital of France': '[-0.00085885  0.04388924 -0.00083831 ...  0.02374511 -0.00984441\\n  0.02858762]'}, 
#     {'Niklas Heidloff works for IBM et il aime le développement de logiciels': '[-0.08408933 -0.0428754  -0.03804896 ... -0.03178102  0.00735097\\n  0.00501928]'}]
# "}]}
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.