---
id: 5388
title: 'Deploying custom Watson NLP Models with Terraform'
date: '2022-11-24T00:51:15+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5388'
permalink: /article/deploying-custom-watson-nlp-models-with-terraform/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-custom-watson-nlp-models-with-terraform/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post describes how custom Watson NLP models can be deployed with TechZone Deployer, an opinionated deployment and operations toolkit based on Terraform and ArgoCD.*

*Watson NLP*

To set some context, check out the landing page [IBM Watson NLP Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing). The Watson NLP containers can be run on different container platforms, they provide REST and gRCP interfaces, they can be extended with custom models and they can easily be embedded in solutions. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Watson Assistant and NLU (Natural Language Understanding) SaaS services and IBM Cloud Pak for Data.

*TechZone Deployer*

With TechZone Deployer (also known as TechZone Accelerator Toolkit, TechZone Automation, Software Everywhere, Cloud Native Toolkit) IBM software, open source projects and custom applications can easily be deployed to various clouds. Check out my earlier blog that introduces the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terraform and GitOps and is based on best practices from IBM projects with partners and clients. With the toolkit both infrastructure like Kubernetes clusters as well as Kubernetes resources within clusters can be deployed. Infrastructure resources are deployed via Terraform, resources within clusters via Argo CD.

**Automatic Deployments of the Watson NLP Runtime and Models**

Based on TechZone Deployer my team has created an [asset to deploy 1. OpenShift clusters, 2. Watson NLP and 3. custom applications](https://github.com/IBM/watson-automation) in these clusters in [one hour]({{ "/article/setting-up-openshift-and-applications-in-one-hour/" | relative_url }}). Watch the short video [Automation for IBM Watson Deployments](https://www.youtube.com/watch?v=8lbVRAvJgy4) for an introduction.

The usage of TechZone Deployer is very easy:

- Install CLI
- Define which modules to deploy from a [module catalog](https://modules.cloudnativetoolkit.dev/)
- Configure modules in variables.yaml and credentials.properties files
- Use CLI to create Terraform modules
- Launch local tools container and apply Terraform modules

This sample Watson NLP configuration uses one predefined model hosted in the IBM Cloud Pak registry.

```
- name: terraform_gitops_watson_nlp_runtime_image
  value: watson-nlp-runtime:1.0.18
- name: terraform_gitops_watson_nlp_runtime_registry
  value: watson
- name: terraform_gitops_watson_nlp_accept_license
  value: false
- name: terraform_gitops_watson_nlp_imagePullSecrets
  value:
    - ibm-entitlement-key
- name: terraform_gitops_watson_nlp_models
  value:
    - registry: watson
      image: watson-nlp_syntax_izumo_lang_en_stock:1.0.7
- name: terraform_gitops_watson_nlp_registries
  value:
    - name: watson
      url: cp.icr.io/cp/ai
- name: terraform_gitops_watson_nlp_registryUserNames
  value:
    - registry: watson
      userName: cp
```

**Deployments of multiple Models**

It’s also possible to deploy in addition to the Watson NLP runtime multiple models, both predefined models as well as custom models.

At a minimum you need the Watson NLP runtime image. The NLP runtime container runs in the Watson NLP pod at runtime.

Additionally you can have 1 to N ‘model images’ which run as Kubernetes init containers. They are triggered when pods are created. Their purpose is to put the model artifacts on disk so that the Watson NLP runtime container can access them. Once they have done this, these containers terminate.

Images reside in registries which are typically protected. Pull secrets need to be provided to access them. [Sealed Secrets for Kubernetes](https://github.com/bitnami-labs/sealed-secrets) are used to protect the secrets.

There can be multiple registries (N &gt;= 1) and multiple secrets (M &gt;= 0). Registries can use secrets, but don’t have to (N &gt; M). There needs to be one registry to access the NLP runtime image which is stored in a protected registry.

The configuration is done in two files:

- variables.yaml
- credentials.yaml

Pull secrets have to contain the following information:

- Secret name: Defined in the “imagePullSecrets” array in variables.yaml.
- Registry URL: Defined in the “registries” array in variables.yaml.
- Registry user name: Defined in the “registryUserNames” array in variables.yaml. the “registry” name needs to map to the same name under registries.
- Registry password: Defined in “TF\_VAR\_terraform-gitops-watson-nlp\_registry\_credentials” in credentials.properties. This variable can include a comma delimited list of registry passwords/tokens. For multiple secrets the order needs to be the same one as in variables.yaml for “registryUserNames”.

The screenshot shows the deployed containers.

![image](/assets/img/2022/11/Screenshot-2022-11-17-at-15.50.31.png)

To find out more about Watson NLP and TechZone Deployer, check out these resources:

- [IBM Watson NLP Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [IBM Watson NLP Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [TechZone Accelerator Toolkit Documentation](https://operate.cloudnativetoolkit.dev/)
- [TechZone Accelerator Toolkit Modules](https://operate.cloudnativetoolkit.dev/)