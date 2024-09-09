---
id: nh-084
title: 'Evaluating Question Answering Scenarios with watsonx.governance'
date: 2024-09-08 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-084'
permalink: /article/evolution-question-answering-scenarios-watsonx-governance/
custom_permalink:
    - article/evolution-question-answering-scenarios-watsonx-governance/
image: /assets/img/2024/08/watsonx-gov-detached-00.png
---

*watsonx.governance is IBM's AI governance offering to manage and monitor (Generative) AI solutions. It is available as SaaS or as software to be run everywhere. This post demonstrates how to do this for a Question Answering scenario with an external model running on Azure.*

Here is a definition of [IBM watsonx.governance](https://www.ibm.com/products/watsonx-governance):

> IBM watsonx.governance was built to help you direct, manage and monitor the artificial intelligence (AI) activities of your organization: 1. Govern generative AI (gen AI) and machine learning (ML) models from any vendor including IBM watsonx.ai, Amazon Sagemaker and Bedrock, Google Vertex and Microsoft Azure. 2. Evaluate and monitor for model health, accuracy, drift, bias and gen AI quality. 3. Access powerful governance, risk and compliance capabilities featuring workflows with approvals, customizable dashboards, risk scorecards and reports. 4. Use factsheet capabilities to collect and document model metadata automatically across the AI model lifecycle.

Documentation and blog posts:

* Documentation: [Generative AI quality evaluations](https://dataplatform.cloud.ibm.com/docs/content/wsj/model/wos-monitor-gen-quality.html?context=wx)
* [Evaluating deployments in spaces](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-deploy-manage-monitor.html?context=wx&audience=wdp)
* [Generative AI Quality Metrics in watsonx.governance]({{ "/article/gen-ai-quality-metrics-watsonx-governance/" | relative_url }})
* [Custom LLM Metrics in watsonx.governance]({{ "/article/watsonx-governance-custom-llm-metrics/" | relative_url }})

## Overview

For Question Answering GPT is used running on Azure, but the same mechanism works for other models too. Question Answering is often utilized in RAG (Retrieval Augmented Generation) pipelines.

![image](/assets/img/2024/08/watsonx-gov-detached-01.png)

## Evaluations

For this model different [GenAI evaluations](https://dataplatform.cloud.ibm.com/docs/content/wsj/model/wos-monitor-gen-quality.html?context=wx), for example answer quality, faithfulness and answer relevance, have been defined which are provided by watsonx. For the evaluations test sets need to provide ground truth information.

![image](/assets/img/2024/08/watsonx-gov-detached-02.png)

Results are displayed after the evaluations.

![image](/assets/img/2024/08/watsonx-gov-detached-03.png)

![image](/assets/img/2024/08/watsonx-gov-detached-04.png)

For RAG scenarios the documents are displayed which were passed in to the models to generate answers.

![image](/assets/img/2024/08/watsonx-gov-detached-05.png)

You can even select different parts of the answer to see from which documents they came from.

![image](/assets/img/2024/08/watsonx-gov-detached-07.png)

Faithfulness, answer relevance and unsuccessful requests are also displayed graphically.

![image](/assets/img/2024/08/watsonx-gov-detached-06.png)

## Code

Since this example uses an external model, a detached prompt template needs to be created, for example in a notebook.

![image](/assets/img/2024/08/watsonx-gov-detached-08.png)


## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.