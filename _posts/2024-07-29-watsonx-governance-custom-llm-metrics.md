---
id: nh-078
title: 'Custom LLM Metrics in watsonx.governance'
date: 2024-07-29 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-078'
permalink: /article/watsonx-governance-custom-llm-metrics/
custom_permalink:
    - article/watsonx-governance-custom-llm-metrics/
image: /assets/img/2024/07/xgov-custom-metrics-01.png
---

*watsonx.governance is IBM's AI platform to govern generative AI models built on any platform and deployed in the cloud or on-premises. This post describes how to collect metrics from LLMs running on other platforms.*

Read my post [Introduction to watsonx.governance]({{ "/article/watsonx-governance/" | relative_url }}) for more context. This post focusses on custom metrics for Generative AI models via OpenScale.

## Overview

watsonx.governance supports different types of AI models, which can be hosted on watsonx.ai, AWS Sagemaker, Azure, in the cloud or on-premises.

1. Machine Learning models (classic AI)
2. Generative AI models

Dependent on the type of the model and the use case, different metrics need to be used. For predictive models there are many standard metrics. For example, for classification scenarios these metrics can be applied easily against ground truth information.

However, for some if not most Generative AI use cases these standard metrics do not work. For example, for Question Answering scenarios Bleu or Rouge don't really mean much/anything when comparing the generated answers with the expected answers. At the same time these metrics can give good performance indications for translation scenarios.

## Example

Let's look at an easy summarization example, where the model is hosted on Azure.

* [Code](https://github.com/CloudPak-Outcomes/Outcomes-Projects/tree/main/watsonx-governance-l4)
* [Notebook](https://github.com/CloudPak-Outcomes/Outcomes-Projects/blob/main/watsonx-governance-l4/notebooks/azure_openai_evaluation.ipynb)
* [Course](https://cp4d-outcomes.techzone.ibm.com/l4-pox/watsonx-governance)

Several dependencies need to be imported:

```python
import openai
from openai import AzureOpenAI
...
from ibm_cloud_sdk_core.authenticators import CloudPakForDataAuthenticator
from ibm_watson_openscale import *
from ibm_metrics_plugin.metrics.llm.utils.constants import LLMGenerationMetrics
...
import requests
import json
```

An evaluation dataset needs to be provided. Inferences are executed against all data items. The results are used to calculate the metrics. In this case standard metrics are utilized again, but it could be anything else. The results are put in a custom metrics object and sent via REST to watsonx.governance.

```python
### Fetch the existing, if any, OP Model Metrics for a given OP Model ID
metrics_map = get_op_model_metrics_definitions(header, model_id)
# Iterate over the given metrics to be published..
for metric_name, metric_value in metrics.items():
    # check if the metric exists by the given name, and if, get its metric_id
    metric_id = get_existing_metric_id(metrics_map, metric_name)
    # if the metric does not exists, then create it
    if metric_id is None:
        print(metric_name + ': Metric Object does not exist, creating it..')
        # construct the metric object to be published
        metric_object_payload = get_metric_object_payload(model_id, metric_name)
        # now, create the metric object
        metric_id = create_metrics_object(metric_object_payload)
    # Add the metric value to metric object
    # construct the metric value object to be published
    metric_value_payload = get_metric_value_payload(metric_id, metric_name, metric_value)
    # create the metric value - basically add the metric value to the metric object
    metric_value_id = add_metric_value_to_metric_object(metric_value_payload)
    print(str(metric_name) + ': Metric Object ID: ' + str(metric_id) + ', Metric Value Object ID: '+ str(metric_value_id) + '\n')
```

## Result

The results are displayed in watsonx.governance. See the screenshot at the top. In order to track the model, a model definition needs to be defined.

![image](/assets/img/2024/07/xgov-custom-metrics-02.png)

## Next Steps

To learn more, check out the [documentation](https://www.ibm.com/docs/en/cloud-paks/cp-data/5.0.x?topic=models-evaluating-prompt-templates-non-foundation-notebooks).