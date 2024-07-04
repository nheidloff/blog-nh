---
id: 5216
title: 'Handling of Versions of TechZone Toolkit Modules'
date: '2022-11-02T07:43:03+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5216'
permalink: /article/versioning-of-techzone-accelerator-toolkit-modules/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/versioning-of-techzone-accelerator-toolkit-modules/
categories:
    - Articles
---

*With the TechZone Accelerator Toolkit IBM software, open source projects and custom applications can easily be deployed to various clouds. This article explains how to ensure that the right versions of modules are deployed.*

In an earlier blog I introduced the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices based on IBM experiences in partner and clients projects.

Solutions are defined via bill of materials (BOM) which contain lists of [modules](https://modules.cloudnativetoolkit.dev/). In the following [example](https://github.com/IBM/watson-automation/blob/main/roks-new-nlp/bom.yaml) an OpenShift cluster is created in the IBM Cloud which comes with Argo CD, a GitOps repo, Watson NLP and a sample application based on ubi.

```
apiVersion: cloudnativetoolkit.dev/v1alpha1
kind: BillOfMaterial
metadata:
  name: cluster-with-watson-nlp
spec:
  modules:
    - name: ibm-ocp-vpc
    - name: argocd-bootstrap
    - name: gitops-repo
      alias: gitops_repo
    - name: terraform-gitops-ubi
      alias: terraform_gitops_ubi
    - name: terraform-gitops-watson-nlp
      alias: terraform_gitops_watson_nlp
```

If you don’t provide any version numbers in the BOMs, the toolkit installs the latest versions.

Modules can have dependencies which are defined in the [module.yaml](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp/blob/4c22e5bba2023602bdd8e4a1a1634b4d024ee937/module.yaml#L15) files.

```
dependencies:
  - id: gitops
    refs:
      - source: github.com/cloud-native-toolkit/terraform-tools-gitops.git
        version: '>= 1.1.0'
  - id: namespace
    refs:
      - source: github.com/cloud-native-toolkit/terraform-gitops-namespace.git
        version: '>= 1.0.0'   
  - id: setup_clis
    refs:
      - source: github.com/cloud-native-toolkit/terraform-util-clis.git
        version: '>= 1.0.0'   
```

As in other frameworks and programming languages like JavaScript, Java, Go, etc. the best practise is to require certain versions of dependencies. Automatic updates of modules can easily break production applications. Before updating dependencies, testing needs to be done. The only exception might be security fixes, but even those need to be tested.

Let’s take a look how this can be done with the TechZone Accelerator Toolkit. After you have run ‘iascable build …’ on BOM files which only include high level modules without version numbers like above, you will find a second BOM file (shadow BOM) in the subdirectory ‘output/bom-name/bom.yaml’.

These shadow BOM files contain not only the high level modules, but a complete list of all modules including dependencies. They also include the latest version numbers.

```
apiVersion: cloudnativetoolkit.dev/v1alpha1
kind: BillOfMaterial
metadata:
  name: cluster-with-watson-nlp
spec:
  modules:
    - name: gitops-repo
      alias: gitops_repo
      version: v1.22.2
    - name: argocd-bootstrap
      alias: argocd-bootstrap
      version: v1.12.0
    - name: ibm-ocp-vpc
      alias: cluster
      version: v1.16.3
    - name: ibm-vpc
      alias: ibm-vpc
      version: v1.17.0
    - name: ibm-vpc-gateways
      alias: ibm-vpc-gateways
      version: v1.10.0
    - name: terraform-gitops-ubi
      alias: terraform_gitops_ubi
      version: v0.0.26
    - name: terraform-gitops-watson-nlp
      alias: terraform_gitops_watson_nlp
      version: v1.0.0
    - name: olm
      version: v1.3.5
    - name: sealed-secret-cert
      version: v1.0.1
    - name: ibm-resource-group
      alias: resource_group
      version: v3.3.5
    - name: ibm-object-storage
      alias: cos
      version: v4.1.0
    - name: ibm-vpc-subnets
      version: v1.14.0
    - name: gitops-namespace
      alias: namespace
      version: v1.14.0
    - name: util-clis
      version: v1.18.1
```

**To ‘pin’ the version numbers** of modules for subsequent Terraform runs, a best practise is to replace the original BOM file with the generated shadow BOM file. This approach is similar to JavaScript’s package-lock.json files and Golang’s go.sum files.

![image](/assets/img/2022/11/Screenshot-2022-11-03-at-08.41.07.png)

To find out more about these capabilities, check out the following resources:

- [Watson Automation Repo](https://github.com/IBM/watson-automation)
- [TechZone Accelerator Toolkit](https://operate.cloudnativetoolkit.dev/)
- [Watson NLP](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)