---
id: nh-083
title: 'Generative AI Quality Metrics in watsonx.governance'
date: 2024-09-06 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-083'
permalink: /article/gen-ai-quality-metrics-watsonx-governance/
custom_permalink:
    - article/gen-ai-quality-metrics-watsonx-governance/
image: /assets/img/2024/08/watsonx-gov-00.png
---

*watsonx.governance is IBM's AI governance offering to manage and monitor (Generative) AI solutions. It is available as SaaS or as software to be run everywhere. This post demonstrates how to do this for a simple summarization scenario.*

Here is a definition of [IBM watsonx.governance](https://www.ibm.com/products/watsonx-governance):

> IBM watsonx.governance was built to help you direct, manage and monitor the artificial intelligence (AI) activities of your organization: 1. Govern generative AI (gen AI) and machine learning (ML) models from any vendor including IBM watsonx.ai, Amazon Sagemaker and Bedrock, Google Vertex and Microsoft Azure. 2. Evaluate and monitor for model health, accuracy, drift, bias and gen AI quality. 3. Access powerful governance, risk and compliance capabilities featuring workflows with approvals, customizable dashboards, risk scorecards and reports. 4. Use factsheet capabilities to collect and document model metadata automatically across the AI model lifecycle.

Documentation, videos and blog posts:

* Documentation: [Generative AI quality evaluations](https://dataplatform.cloud.ibm.com/docs/content/wsj/model/wos-monitor-gen-quality.html?context=wx)
* [Evaluating deployments in spaces](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-deploy-manage-monitor.html?context=wx&audience=wdp)
* Video: [IBM watsonx.governance: Direct, manage and monitor your Generative AI and ML models, anywhere](https://www.ibm.com/products/watsonx-governance)
* [Evaluting Question Answering Scenarios with watsonx.governance]({{ "/article/evolution-question-answering-scenarios-watsonx-governance/" | relative_url }})
* [Custom LLM Metrics in watsonx.governance]({{ "/article/watsonx-governance-custom-llm-metrics/" | relative_url }})


## Scenario

In the example below summarization is done via a 13b Granite model running on watsonx.ai. A prompt template has been defined which allows passing in different data for evaluations via a variable.

![image](/assets/img/2024/08/watsonx-gov-01.png)

## Evaluations

For this model different [GenAI evaluations](https://dataplatform.cloud.ibm.com/docs/content/wsj/model/wos-monitor-gen-quality.html?context=wx) have been defined which are provided by watsonx. For the evaluations test sets need to provide ground truth information.

![image](/assets/img/2024/08/watsonx-gov-02.png)

Results are displayed after the evaluations.

![image](/assets/img/2024/08/watsonx-gov-03.png)

![image](/assets/img/2024/08/watsonx-gov-06.png)

The home page provides a dashboard with results of all deployed models.

![image](/assets/img/2024/08/watsonx-gov-04.png)

The model health page displays information about number of requests, token counts and more.

![image](/assets/img/2024/08/watsonx-gov-09.png)

For GenAI scenario different out-of-the-box metrics are shown.

![image](/assets/img/2024/08/watsonx-gov-10.png)

The factsheet displays the same information.

![image](/assets/img/2024/08/watsonx-gov-11.png)

Evaluations can be run on all stages in the AI lifecycle.

![image](/assets/img/2024/08/watsonx-gov-08.png)

## Use Cases

Use cases have approval workflows which can be defined with watsonx.governance.

![image](/assets/img/2024/08/watsonx-gov-05.png)

The same use cases can also be viewed in watsonx (.ai).

![image](/assets/img/2024/08/watsonx-gov-07.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.