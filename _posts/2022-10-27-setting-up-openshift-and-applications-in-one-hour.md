---
id: 5177
title: 'Setting up OpenShift and Applications in one Hour'
date: '2022-12-01T06:13:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5177'
permalink: /article/setting-up-openshift-and-applications-in-one-hour/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/setting-up-openshift-and-applications-in-one-hour/
categories:
    - Articles
image: /assets/img/iascable-01.png
---

*With IBM TechZone Deployer OpenShift can be set up on multiple clouds including custom applications by using automation via Terraform and Argo CD.*

## ZechZone Deployer Introduction

In my previous blog I explained the TechZone Deployer aka IBM's Toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices based on IBM’s deployment experiences from partner and client projects.

## Module Catalog

Let’s take a look how the toolkit can be used. The [module catalog](https://modules.cloudnativetoolkit.dev/) provides 200+ modules to install IBM Software and open source components which can be deployed on clouds like AWS, Azure and IBM Cloud.

![image](/assets/img/2022/10/Screenshot-2022-10-28-at-07.42.02.png)

## Bill of Materials

Complete stack solutions are defined in yaml files. These bill of materials contain list of modules, in this [example](https://github.com/IBM/watson-automation/blob/e92c9cef8acb1bd5c57177dad3d91c42ff9c8aee/roks-new-nlp/bom.yaml#L27) OpenShift in the IBM Cloud, Argo CD including a GitOps repo, the Watson NLP (natural language processing) container and a custom application.

```yaml
apiVersion: cloudnativetoolkit.dev/v1alpha1
kind: BillOfMaterial
metadata:
  name: cluster-with-watson-nlp
spec:
  modules:
    - name: ibm-ocp-vpc
      version: v1.16.0
    - name: argocd-bootstrap
      version: v1.12.0
    - name: gitops-repo
      alias: gitops_repo
      version: v1.22.2
    - name: terraform-gitops-ubi
      alias: terraform_gitops_ubi
      version: v0.0.8
    - name: terraform-gitops-watson-nlp
      alias: terraform_gitops_watson_nlp
      version: v0.0.80
```

The modules can be configured via [variables](https://github.com/IBM/watson-automation/blob/e92c9cef8acb1bd5c57177dad3d91c42ff9c8aee/roks-new-nlp/output/cluster-with-watson-nlp/variables-template.yaml), for example regions, resource group names, sizes of clusters, etc.

``` yaml
variables:
  # overall
  - name: region
    description: The IBM Cloud region where the instance should be provisioned
    value: xxx
  - name: resource_group_name
    description: The name of the IBM Cloud resource group where the resources should be provisioned
    value: xxx
  # ocp
  - name: worker_count
    description: The number of workers that should be provisioned per subnet
    value: 2
  - name: cluster_flavor
    description: The flavor of the worker nodes that will be provisioned
    value: bx2.4x16
```

## TechZone Deployer CLI

To run the sample, you need to clone the repo and install the [toolkit’s CLI](https://github.com/cloud-native-toolkit/iascable), called iascable.

```bash
curl -sL https://iascable.cloudnativetoolkit.dev/install.sh | sh
git clone https://github.com/IBM/watson-automation
```

With the CLI the bill of material is converted into Terraform assets.

```bash
cd watson-deployments/roks-new-nlp 
iascable build -i bom.yaml
cd output
```

An image is provided which comes with all tools necessary to run Terraform. To start the container, invoke this command in a terminal:

```bash
./launch.sh
```

In the running container invoke these commands:

```bash
cd cluster-with-watson-nlp
./apply.sh
```

The ‘apply’ command takes roughly 45 minutes to set up the managed OpenShift cluster in the IBM Cloud and the additional modules. 

## Result

After this, you can find the resources in the [IBM Cloud console](https://github.com/IBM/watson-automation/blob/e92c9cef8acb1bd5c57177dad3d91c42ff9c8aee/documentation/screenshots/openshift-01.png).

Argo CD has been set up to deploy the Watson NLP container and the custom application.

![image](/assets/img/2022/10/argocd-03.png)

## What's next?

To find out more about the toolkit, check out the [documentation](https://operate.cloudnativetoolkit.dev/) and the [sample](https://github.com/IBM/watson-automation) above.