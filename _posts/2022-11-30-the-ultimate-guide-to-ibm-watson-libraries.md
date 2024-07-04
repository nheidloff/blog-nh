---
id: 5424
title: 'Guide to IBM Watson Libraries'
date: '2022-11-30T00:05:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5424'
permalink: /article/the-ultimate-guide-to-ibm-watson-libraries/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/the-ultimate-guide-to-ibm-watson-libraries/
categories:
    - Articles
image: /assets/img/embeddable-ai.png
---

*IBM provides Watson NLP (Natural Language Understanding), Watson Speech To Text and Watson Text To Speech as containers which can be embedded in cloud-native applications. There is quite a bit of information available about these technologies. This post lists links to documentation, tutorials, test environments, and more.*

## Overview

- [IBM’s Embeddable AI](https://www.ibm.com/partnerworld/program/embeddableai)
- [IBM’s announcement regarding its embeddable AI software portfolio](https://newsroom.ibm.com/2022-10-25-IBM-Helps-Ecosystem-Partners-Accelerate-AI-Adoption-by-Making-it-Easier-to-Embed-and-Scale-AI-Across-Their-Business)
- [Rob Thomas on Accelerating AI Adoption with Ecosystem Partners](https://youtu.be/V8oGXnqVZEs?t=743)
- [IBM Digital Self-Serve Co-Create Experience for Embeddable AI](https://dsce.ibm.com/)
- [TechZone: Embeddable AI](https://techzone.ibm.com/collection/embedded-ai)
- [IBM Developer: Watson Libraries](https://developer.ibm.com/articles/watson-libraries-embeddable-ai-that-works-for-you/)

## Natural Language Processing

### Overview and Documentation

- [Landing page](https://www.ibm.com/products/ibm-watson-natural-language-processing)
- [Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726)
- [Entitlement key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)
- [Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [Model Catalog](https://www.ibm.com/docs/en/watson-libraries?topic=models-catalog)
- [Watson NLP in Cloud Pak for Data](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/watson-nlp.html?audience=wdp)

### Development

- [Running and Deploying IBM Watson NLP Containers]({{ "/article/running-and-deploying-ibm-watson-nlp-containers/" | relative_url }})
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson NLP in Minikube]({{ "/article/running-ibm-watson-nlp-in-minikube/" | relative_url }})
- [Understanding IBM Watson Containers]({{ "/article/understanding-ibm-watson-containers/" | relative_url }})
- [Deploying Watson NLP to IBM Code Engine]({{ "/article/deploying-watson-nlp-to-ibm-code-engine/" | relative_url }})
- [Watson Embedded AI Runtime Client Libraries](https://github.com/IBM/ibm-watson-embed-clients)
- [Embed Model Builder (init Containers)](https://github.com/IBM/ibm-watson-embed-model-builder)
- [Watson NLP Python Client](https://github.com/ibm-build-lab/Watson-NLP/blob/main/MLOps/Dash-App-gRPC-Client/readme.md)

### Operations

- [Building custom IBM Watson NLP Images]({{ "/article/building-custom-ibm-watson-nlp-images-models/" | relative_url }})
- [Automation for embedded IBM Watson Deployments]({{ "/article/automation-for-ibm-watson-deployments/" | relative_url }})
- [Setting up OpenShift and Applications in one Hour]({{ "/article/setting-up-openshift-and-applications-in-one-hour/" | relative_url }})
- [Repo: Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Deploying TechZone Toolkit Modules on existing Clusters]({{ "/article/deploying-techzone-toolkit-modules-on-existing-clusters/" | relative_url }})
- [Serving Watson NLP on Kubernetes with KServe ModelMesh]({{ "/article/serving-watson-nlp-on-kubernetes-with-kserve-modelmesh/" | relative_url }})
- [Repo: Samples](https://github.com/ibm-build-lab/Watson-NLP/tree/main/MLOps)
- [Serve Models on Amazon ECS with AWS Fargate](https://github.com/ibm-build-lab/Watson-NLP/blob/main/MLOps/Deploy-to-AWS-Fargate/README.md)

### Training

- [Training IBM Watson NLP Models]({{ "/article/training-ibm-watson-nlp-models/" | relative_url }})
- [Watson Studio Environment for IBMers and Partners](https://developer.ibm.com/tutorials/set-up-your-ibm-watson-libraries-environment/)
- [Text Classification](https://techzone.ibm.com/collection/watson-nlp-text-classification)
- [Repo: Samples](https://github.com/ibm-build-lab/Watson-NLP/tree/main/ML)
- [Sentiment and Emotion Analysis](https://techzone.ibm.com/collection/watson-core-nlp)
- [Topic Modeling](https://techzone.ibm.com/collection/watson-nlp-topic-modeling)
- [Entities and Keywords Extraction](https://techzone.ibm.com/collection/watson-nlp-entities-and-keywords-extraction)

## Speech To Text

- [IBM Watson Speech Libraries for Embed](https://www.ibm.com/products/watson-speech-embed-libraries)
- [Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51754)
- [Entitlement Key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)
- [Running IBM Watson Speech to Text in Containers]({{ "/article/running-ibm-watson-speech-to-text-in-containers/" | relative_url }})
- [Running IBM Watson Text To Speech in Minikube]({{ "/article/running-ibm-watson-text-to-speech-in-minikube/" | relative_url }})
- [Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-speech-text-library-embed-home)
- [Model Catalog](https://www.ibm.com/docs/en/watson-libraries?topic=home-models-catalog)
- [(SaaS) API Documentation](https://cloud.ibm.com/apidocs/speech-to-text)
- [SaaS Documentation](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-gettingStarted)
- [Convert speech to text, and extract meaningful insights from data](https://developer.ibm.com/tutorials/extract-meaningful-insights-from-data/)
- [Watson Speech To Text Analysis Notebook](https://github.com/ibm-build-lab/Watson-Speech/blob/main/Speech%20To%20%20Text/Speech%20To%20Text%20Analysis.ipynb)
- [STT Spring Application](https://github.com/ibm-build-lab/Watson-Speech/tree/main/STTApplication#readme)

## Text To Speech

- [IBM Watson Speech Libraries for Embed](https://www.ibm.com/products/watson-speech-embed-libraries)
- [Trial](https://www.ibm.com/account/reg/signup?formid=urx-51758)
- [Entitlement Key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)
- [Running IBM Watson Text to Speech in Containers]({{ "/article/running-ibm-watson-text-to-speech-in-containers/" | relative_url }})
- [Running IBM Watson Text To Speech in Minikube]({{ "/article/running-ibm-watson-text-to-speech-in-minikube/" | relative_url }})
- [Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-text-speech-library-embed-home")
- [Model Catalog](https://www.ibm.com/docs/en/watson-libraries?topic=wtsleh-models-catalog)
- [(SaaS) API Documentation](https://cloud.ibm.com/apidocs/text-to-speech)
- [SaaS Documentation](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-gettingStarted)
- [Using TTS in a Notebook](https://github.com/ibm-build-lab/Watson-Speech/blob/main/Text%20To%20Speech/Text-to-Speech-Tutorial.md)
- [Watson Developer Cloud (Client SDKs)](https://github.com/watson-developer-cloud)