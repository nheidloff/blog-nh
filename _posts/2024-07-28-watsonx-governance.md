---
id: nh-077
title: 'Introduction to watsonx.governance'
date: 2024-07-28 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-077'
permalink: /article/watsonx-governance/
custom_permalink:
    - article/watsonx-governance/
image: /assets/img/2024/07/xgov-overview-01.png
---

*When building Generative AI pilots, MVPs, PoCs, etc. the focus is often to figure out if AI works and adds value in general. Running AI applications in production requires additional capabilities like ML Ops and governance.*

IBM provides a complete platform to build and run AI applications. Here is the definition of [watsonx.governance](https://www.ibm.com/products/watsonx-governance) from the landing page.

> IBM watsonx.governance was built to help you direct, manage and monitor the artificial intelligence (AI) activities of your organization.
* Govern generative AI (gen AI) and machine learning (ML) models from any vendor including IBM watsonx.ai, Amazon Sagemaker and Bedrock, Google Vertex and Microsoft Azure.
* Evaluate and monitor for model health, accuracy, drift, bias and gen AI quality. 
* Access powerful governance, risk and compliance capabilities featuring workflows with approvals, customizable dashboards, risk scorecards and reports.
* Use factsheet capabilities to collect and document model metadata automatically across the AI model lifecycle.

## watsonx.governance

watsonx.governance contains three major components.

1. [OpenPages](https://www.ibm.com/products/openpages): AI-driven, highly scalable governance, risk and compliance (GRC) solution
2. [OpenScale](https://www.ibm.com/downloads/cas/BK0OK0EA): Monitoring of AI models and applications
3. [AI Factsheets](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/factsheets-model-inventory.html?context=cpdaas): Tracking of AI models from request to production

This post focusses on the OpenPages part, also known as the watsonx Governance Console.

The screenshot at the top shows the dashboard that gives an overview of the deployed models and their states.

## Workflows

Via use case requests and workflows, models can be managed and governed. Users can request approvals for new use cases.

![image](/assets/img/2024/07/xgov-overview-02.png)

Reviewers need to answer questions in questionnaires.

![image](/assets/img/2024/07/xgov-overview-03.png)

Users with certain roles can finally approve use cases.

![image](/assets/img/2024/07/xgov-overview-04.png)

## Customization

While there are typical patterns for governance, the specific processes are often handled slightly differently by companies. watsonx.governance provides several ways to customize roles, policies, workflows, use cases, etc.

Workflows can be defined via a no-code web editor.

![image](/assets/img/2024/07/xgov-overview-05.png)

Similarly questionnaires can be created.

![image](/assets/img/2024/07/xgov-overview-06.png)

Even the graphical representation can be changed without programming.

![image](/assets/img/2024/07/xgov-overview-07.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.