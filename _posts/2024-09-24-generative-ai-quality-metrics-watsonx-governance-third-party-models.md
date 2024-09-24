---
id: nh-086
title: 'GenAI Quality Metrics for third Party Models in watsonx'
date: 2024-09-24 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-086'
permalink: /article/generative-ai-quality-metrics-watsonx-governance-third-party-models/
custom_permalink:
    - article/generative-ai-quality-metrics-watsonx-governance-third-party-models/
image: /assets/img/2024/09/detached-genai-metrics-01.png
---

*watsonx.governance is IBM's governance offering to manage and monitor (Generative) AI solutions. This post demonstrates how to monitor metrics for models that are not provided by watsonx.ai but hosted on other clouds or on-premises.*

Metrics of models that are hosted on watsonx.ai can automatically be handled by watsonx.governance as described in a previous post [Generative AI Quality Metrics in watsonx.governance]({{ "/article/gen-ai-quality-metrics-watsonx-governance/" | relative_url }}). For models hosted somewhere else and fine-tuned models a feature needs to be used, called 'Detached Prompt Template'.

Resources:

* [Detached Prompt Template Sample Notebook](https://github.com/nheidloff/watsonx-ai-platform-demos/blob/287fe5ca310b1fde7a1642e4a10f292207a5bcd1/governance/notebook-detached-ootb.ipynb)
* Documentation: [Generative AI quality evaluations](https://dataplatform.cloud.ibm.com/docs/content/wsj/model/wos-monitor-gen-quality.html?context=wx)
* [Evaluating deployments in spaces](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-deploy-manage-monitor.html?context=wx&audience=wdp)
* Video: [IBM watsonx.governance: Direct, manage and monitor your Generative AI and ML models, anywhere](https://www.ibm.com/products/watsonx-governance)
* [watsonx.governance Sample Notebooks](https://github.com/IBM/watson-openscale-samples/tree/main/WatsonX.Governance/Cloud/GenAI/samples)

## Scenario

In the following sample a simple model is used which runs inside of a notebook within watsonx.ai (without GPU). While this is not the most typical use case, it demonstrates how this mechanism works in general.

The sample model generates summaries. As metrics standards are leveraged like Rouge and Sentence Similarity.

The following snippets are from a complete [sample notebook](https://github.com/nheidloff/watsonx-ai-platform-demos/blob/287fe5ca310b1fde7a1642e4a10f292207a5bcd1/governance/notebook-detached-ootb.ipynb)

## Detached Prompt Template

First the detached prompt template is created.

```python
from ibm_aigov_facts_client import DetachedPromptTemplate, PromptTemplate

detached_information = DetachedPromptTemplate(
    prompt_id="detached_prompt",
    model_id="google/flan-t5-base",
    model_provider="Hugging Face",
    model_name="google/flan-t5-base",
    model_url="https://huggingface.co/google/flan-t5-base",
    prompt_url="prompt_url",
    prompt_additional_info={"model_owner": "huggingface"}
)

task_id = "summarization"
name = "External prompt sample (google/flan-t5-base HF) V2.0"
description = "My first detached prompt"
model_id = "google/flan-t5-base"

prompt_variables = {"original_text": ""}
input = "{original_text}"
input_prefix= "Input:"
output_prefix= "Output:"

prompt_template = PromptTemplate(
    input=input,
    prompt_variables=prompt_variables,
    input_prefix=input_prefix,
    output_prefix=output_prefix
)

pta_details = facts_client.assets.create_detached_prompt(
    model_id=model_id,
    task_id=task_id,
    name=name,
    description=description,
    prompt_details=prompt_template,
    detached_information=detached_information
)
project_pta_id = pta_details.to_dict()["asset_id"]

...

label_column = "reference_summary"
operational_space_id = "development"
problem_type = "summarization"
input_data_type = "unstructured_text"

monitors = {
    "generative_ai_quality": {
        "parameters": {
            "min_sample_size": 10,
            "metrics_configuration": {                    
            }
        }
    }
}

response = wos_client.monitor_instances.mrm.execute_prompt_setup(
    prompt_template_asset_id=project_pta_id, 
    project_id=PROJECT_ID,
    label_column=label_column,
    operational_space_id=operational_space_id, 
    problem_type=problem_type,
    input_data_type=input_data_type, 
    supporting_monitors=monitors, 
    background_mode=False
)

result = response.result
result.to_dict()
```

![image](/assets/img/2024/09/detached-genai-metrics-02.png)

# Model Generations

For the evaluations the model is invoked multiple times for each entry in a dataset. Each item needs to include the following information:

* Input text
* Generated output text
* Ground truth output text

The sample notebook doesn't invoke a real model, but creates some (useless) hardcoded responses. Obviously, this part needs to be replaced with a real implementation.

The 'evaluate_risk' Python function invokes OpenScale in watsonx.governance to run the evaluations and store the results.

```python
test_data_set_name = "data"
content_type = "multipart/form-data"
body = {}
llm_data.to_csv(test_data_path, index=False)

response  = wos_client.monitor_instances.mrm.evaluate_risk(
    monitor_instance_id=mrm_monitor_instance_id,
    test_data_set_name=test_data_set_name, 
    test_data_path=test_data_path,
    content_type=content_type,
    body=body,
    project_id=PROJECT_ID,
    includes_model_output=True,
    background_mode=False
)
```

# Results

The results of the evaluations can be accessed via API (see notebook). Additionally, they are displayed on the 'Evaluate' page (see at the top of this post) and in the 'Factsheet'.

![image](/assets/img/2024/09/detached-genai-metrics-03.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.