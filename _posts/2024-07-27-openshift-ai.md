---
id: nh-076
title: 'OpenShift AI Platform based on Open Source'
date: 2024-07-27 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-076'
permalink: /article/openshift-ai/
custom_permalink:
    - article/openshift-ai/
image: /assets/img/2024/07/openshift-ai.png
---

*AI is evolving fast and lots of new frameworks come up frequently. The open-source project Open Data Hub (ODH) brings several of these modern frameworks together. Red Hat uses ODH as upstream project for its offering OpenShift AI.*

From the [OpenShift AI](https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai) landing page:

> Red Hat OpenShift AI is a flexible, scalable artificial intelligence and machine learning platform that enables enterprises to create and deliver AI-enabled applications at scale across hybrid cloud environments. Built using open source technologies, OpenShift AI provides trusted, operationally consistent capabilities for teams to experiment, serve models, and deliver innovative apps.

Details:

* [Open Data Hub](https://opendatahub.io/)
* [Serving Watson NLP on Kubernetes with KServe ModelMesh](https://heidloff.net/article/serving-watson-nlp-on-kubernetes-with-kserve-modelmesh/)
* [Serving Models](https://ai-on-openshift.io/generative-ai/llm-serving/#serving-runtimes-for-single-stack-model-serving
https://docs.redhat.com/en/documentation/red_hat_openshift_ai_self-managed/2-latest/html/serving_models/index)
* [Fraud Detection Example](https://docs.redhat.com/en/documentation/red_hat_openshift_ai_self-managed/2-latest/html/openshift_ai_tutorial_-_fraud_detection_example/index)
* [Text Generation Inference for Foundation Models](https://heidloff.net/article/tgi-kserve/)
* [AI on OpenShift](https://ai-on-openshift.io/)

## Workbench

To test, fine-tune and evaluate `Large Language Models` several technologies can be utilized. OpenShift AI provides multiple options to run these as containers.

![image](/assets/img/2024/07/openshift-ai-workbench.png)

## Serving

For serving models various inference stacks are provided, for example [Hugging Face Text Generation Inference](https://huggingface.co/docs/text-generation-inference/index) and [vLLM](https://github.com/vllm-project/vllm).

![image](/assets/img/2024/07/openshift-ai-serving.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.