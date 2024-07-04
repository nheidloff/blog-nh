---
id: 5289
title: 'Developing TechZone Toolkit Terraform Modules'
date: '2022-11-11T00:03:42+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5289'
permalink: /article/developing-techzone-toolkit-terraform-modules/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-techzone-toolkit-terraform-modules/
categories:
    - Articles
---

*With the TechZone Accelerator Toolkit IBM software, open source projects and custom applications can easily be deployed to various clouds. This article explains on a high level how to develop new modules with Terraform.*

Check out my earlier blog that introduces the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices from IBM projects with partners and clients. With the toolkit both infrastructure like Kubernetes clusters as well as Kubernetes resources within clusters can be deployed. Infrastructure resources are deployed via Terraform, resources within clusters via Argo CD.

**Custom Modules and custom Catalogs**

The toolkit is available as open source and it is extensible. Custom modules can be added to deploy more software or to add other target platforms. The [TechZone Module Catalog](https://modules.cloudnativetoolkit.dev/) contains a list of curated modules which need to provide automatic testing capabilities. However, the curated catalog doesn’t have to be used or can be used in addition to a custom catalog. This is necessary if you want to build modules for internal consumption only and it is necessary for modules while they are being developed.

My colleague Thomas Südbröcker has documented how to [create your own catalog](https://github.com/cloud-native-toolkit/site-operator-guide/blob/e0f2302f7d67c185edd63d71e2612ddf078bb34f/docs/learn/iascable/lab4/index.md#6-create-an-own-catalog). When running the ‘iascable’ CLI to generate Terraform modules based on BOMs (bill of materials), the locations of the catalogs can be passed in. Alternatively you can also define the catalogs directly in the BOMs.

```
$ BASE_CATALOG=https://modules.cloudnativetoolkit.dev/index.yaml
$ CUSTOM_CATALOG=https://raw.githubusercontent.com/Vishal-Ramani/UBI-helm-module-example/main/example/catalog/ubi-helm-catalog.yaml
$ iascable build -i ibm-vpc-roks-argocd-ubi.yaml -c $BASE_CATALOG -c $CUSTOM_CATALOG
```

**Terraform Modules**

The TechZone Toolkit provides two types of modules:

1. Terraform modules
2. GitOps modules

Terraform modules are used to create infrastructure like clusters, VPCs, external resources and more. The GitOps modules are used to deploy and operate different types of software within clusters.

The Toolkit Terraform modules are just Terraform modules with some extended conventions how to build them. Modules contain these [files](https://modules.cloudnativetoolkit.dev/#/how-to/terraform):

- main.tf: Logic of the module
- variables.tf: Input variables
- outputs.tf: Output variables which can be passed to child modules
- version.tf: Minimum required Terraform version
- module.yaml: Metadata descriptor
- README.md: Documentation

The best way to get started building modules is to look at the available modules in the [catalog](https://modules.cloudnativetoolkit.dev/). The module catalog provides a filter ‘Module type’. Browse through the existing modules and pick one which sounds similar to what you want to achieve or simple enough to use it as template or starting point.

![image](/assets/img/2022/11/Screenshot-2022-11-10-at-14.56.46-1.png)

To find out more about these capabilities, check out the following resources:

- [TechZone Accelerator Toolkit Documentation](https://operate.cloudnativetoolkit.dev/)
- [TechZone Accelerator Toolkit Modules](https://operate.cloudnativetoolkit.dev/)
- [TechZone Accelerator Toolkit CLI (iascable)](https://github.com/cloud-native-toolkit/iascable)
- [Sample GitOps Module: UBI](https://github.com/cloud-native-toolkit/terraform-gitops-ubi)
- [Sample GitOps Module: Watson NLP](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp)
- [Sample BOMs to deploy Watson NLP](https://github.com/IBM/watson-automation)