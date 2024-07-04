---
id: 5228
title: 'Interface Descriptions of TechZone Toolkit Modules'
date: '2022-11-03T08:44:42+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5228'
permalink: /article/interface-descriptions-of-techzone-toolkit-modules/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/interface-descriptions-of-techzone-toolkit-modules/
categories:
    - Articles
---

*With the TechZone Accelerator Toolkit IBM software, open source projects and custom applications can easily be deployed to various clouds. This article explains how input and output variables of modules are defined.*

Check out my earlier blog that introduces the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices from IBM projects with partners and clients.

Solutions are defined via bill of materials (BOMs) which contain lists of [modules](https://modules.cloudnativetoolkit.dev/). In the following [example](https://github.com/IBM/watson-automation/blob/main/roks-new-nlp/bom.yaml) an OpenShift cluster is created in the IBM Cloud which comes with Argo CD, a GitOps repo, Watson NLP and a sample application based on ubi.

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
    - name: terraform-gitops-ubi
    - name: terraform-gitops-watson-nlp
```

Modules have input and output variables. Read my blog [Configuring the TechZone Accelerator Toolkit]({{ "/article/configuring-the-techzone-accelerator-toolkit/" | relative_url }}) how to use input variables to configure BOMs for different scenarios.

The input variables are defined by convention in the [variables.tf](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp/blob/main/variables.tf) files of modules via Terraform and HCL.

```
variable "registries" {
  type    = list(map(string))
  default = [{
    name = "watson"
    url = "cp.icr.io/cp/ai"
  }]
}
```

The [readme](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp#3-example-usage) files of the modules also describe how to use modules and pass in variables if you would use Terraform directly and not the toolkit which is useful for module developers to test their modules.

```
module "terraform_gitops_watson_nlp" {
  source = "github.com/cloud-native-toolkit/terraform-gitops-watson-nlp?ref=v0.0.80"
  accept_license = var.terraform_gitops_watson_nlp_accept_license
  ...
}
```

The output variables are defined by convention in [output.tf](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp/blob/main/outputs.tf) files.

```
output "namespace" {
  description = "The namespace where the module will be deployed"
  value       = local.namespace
  depends_on  = [resource.gitops_module.setup_gitops]
}
```

Some variables are defined on a global level which is useful for [common variables](https://github.com/IBM/watson-automation/blob/main/roks-new-nlp/output/cluster-with-watson-nlp/variables-template.yaml) like regions, resource group names and common tags.

```
variables:
  - name: region
    description: The IBM Cloud region where the instance should be provisioned
    value: xxx
  - name: resource_group_name
    description: The name of the IBM Cloud resource group where the resources should be provisioned
    value: xxx
  - name: common_tags 
    description: The list of tags that should be applied to all resources (does not work)
    value: []
```

![image](/assets/img/2022/11/Screenshot-2022-11-03-at-09.36.24.png)

To define the values of variables for certain modules, naming conventions are used. For example to define the value of ‘[runtime\_image](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp/blob/main/variables.tf#L110-L113)‘ …

```
variable "runtime_image" {
  description = "runtime_image"
  default     = "watson-nlp-runtime:1.0.15"
}
```

… the name of the [module](https://github.com/IBM/watson-automation/blob/main/roks-new-nlp/output/cluster-with-watson-nlp/variables-template.yaml#L45) is used followed by ‘\_’ and the variable name.

```
- name: terraform_gitops_watson_nlp_runtime_image
  value: watson-nlp-runtime:1.0.18
```

To find out more about these capabilities, check out the following resources:

- [Watson Automation Repo](https://github.com/IBM/watson-automation)
- [TechZone Accelerator Toolkit](https://operate.cloudnativetoolkit.dev/)
- [Watson NLP](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)