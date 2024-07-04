---
id: 5190
title: 'IBM announces Embeddable AI'
date: '2022-10-28T12:36:37+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5190'
permalink: /article/ibm-announces-embeddable-ai/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ibm-announces-embeddable-ai/
categories:
    - Articles
---

*Over the last months I have worked on a new initiate from IBM called Embeddable AI. You can now run some of the Watson services via containers everywhere.*

Watch the [short video](https://www.ibm.com/partnerworld/program/embeddableai) on the Embeddable AI home page for an introduction or this interview with Rob Thomas.

{% include embed/youtube.html id='V8oGXnqVZEs' %}

> Why embeddable AI?  
> For years, IBM Research has invested in developing AI capabilities which are embedded in IBM software offerings. We are now making the same capabilities available to our partners, providing them a simpler path to create AI-powered solutions.

While it is easy to consume software as a service, certain workloads need to be run on premises. A good example are AI applications where data must not leave certain countries. Containers are a great technology to help running AI services everywhere.

There are many resources that explain the [Embeddable AI](https://github.com/IBM/watson-automation/tree/8973caa7f1a4eac6831ffa087c8a5ad1a9195728#resources) offering. Here are some of the resources that help you getting started.

- [Watson NLP](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [Watson NLP Helm Chart](https://github.com/IBM/watson-automation/blob/8973caa7f1a4eac6831ffa087c8a5ad1a9195728/documentation/NLPHelmChart.md)
- [Watson Speech](https://www.ibm.com/products/watson-speech-embed-libraries)
- [Automation for Watson NLP deployments](https://github.com/IBM/watson-automation/)
- [IBM entitlement API key](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.5.x?topic=information-obtaining-your-entitlement-api-key)

My team has implemented a [Helm chart](https://github.com/IBM/watson-automation/blob/8973caa7f1a4eac6831ffa087c8a5ad1a9195728/documentation/NLPHelmChart.md) which makes it easy to deploy Watson NLP in Kubernetes environments like OpenShift.

```
$ oc login --token=sha256~xxx --server=https://xxx
$ oc new-project watson-demo
$ oc create secret docker-registry \
--docker-server=cp.icr.io \
--docker-username=cp \
--docker-password=<your IBM Entitlement Key> \
ibm-entitlement-key
$ git clone https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp 
$ git clone https://github.ibm.com/isv-assets/watson-automation
$ acceptLicense: true # in values.yaml
$ cp watson-automation/helm-nlp/values.yaml terraform-gitops-watson-nlp/chart/watson-nlp/values.yaml
$ cd terraform-gitops-watson-nlp/chart/watson-nlp
$ helm install -f values.yaml watson-embedded .
```

As a result you’ll see the deployed Watson NLP pod in OpenShift.

![image](/assets/img/2022/10/openshift-15.png)

To find out more about the toolkit, check out the [documentation](https://operate.cloudnativetoolkit.dev/) and the [sample](https://github.com/IBM/watson-automation) above.