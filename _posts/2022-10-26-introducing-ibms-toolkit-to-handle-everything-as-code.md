---
id: 5159
title: "Introducing IBM's Toolkit to handle Everything as Code"
date: '2022-10-26T07:58:54+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5159'
permalink: /article/introducing-ibms-toolkit-to-handle-everything-as-code/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/introducing-ibms-toolkit-to-handle-everything-as-code/
categories:
    - Articles
---

*Terraform is a popular tool to set up infrastructure declaratively. Argo CD is a popular tool to manage Kubernetes resources via GitOps. To set up and manage complete solutions, these tools can be used together.*

To run applications, you need more than just your application code:

- Bare metal hardware or VMs in the cloud or on-premises
- Operating systems
- SaaS or on-premises services like databases
- Container orchestration platforms
- Compiled and optimized applications

**Terraform meets Argo CD**

To be able to deploy and operate applications efficiently, you need automation for the complete stack.

1. [Terraform for infrastructure like Kubernetes]({{ "/article/setting-up-ibm-software-with-terraform/" | relative_url }})
2. [Argo CD for everything within Kubernetes clusters]({{ "/article/deploying-kubernetes-resources-via-gitops/" | relative_url }})

![image](/assets/img/2022/10/Screenshot-2022-10-26-at-13.26.08.png)

To automate deployments, declarative approaches are often used known as ‘[Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)‘.

> Infrastructure as code is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

However Infrastructure as Code does not handle the deployments of services and applications which is required for full solutions. What you really need is **Everything as Code**.

This is why IBM has built a toolkit that combines Terraform and Argo CD. IBM has created a Terraform module which sets up Argo CD in a Kubernetes or OpenShift cluster. The Argo CD bootstrap module uses another module which creates a Git repo which is linked to ArgoCD.

- [terraform-tools-argocd-bootstrap](https://github.com/cloud-native-toolkit/terraform-tools-argocd-bootstrap)
- [terraform-tools-gitops](https://github.com/cloud-native-toolkit/terraform-tools-gitops)

In GitOps repos all resources can be defined which Argo CD deploys. The following screenshot shows an Argo CD application which deploys IBM Watson NLP (natural language processing) via Helm.

![image](/assets/img/2022/10/Screenshot-2022-10-27-at-08.21.54.png)

**Introducing IBM’s Toolkit**

The current name of the toolkit is ‘IBM Technology Zone Accelerator Toolkit’, also known as ‘TechZone Accelerator Toolkit’, ‘Software Everywhere’, ‘TechZone Automation’ and ‘Cloud Native Toolkit’.

With the toolkit IBM follows Red Hat’s successful model to open source projects (‘[upstream projects](https://www.redhat.com/en/blog/what-open-source-upstream)‘) and to have supported versions of these open source projects.

The open source version of the toolkit is available under [operate.cloudnativetoolkit.dev](https://operate.cloudnativetoolkit.dev/).

The toolkit is an opinionated framework which brings together the strengths of Terraform and Argo CD. I’ll blog more about it, but to get started check out the [labs](https://operate.cloudnativetoolkit.dev/learn/iascable/lab1/) in the toolkit documentation.

![image](/assets/img/2022/10/Screenshot-2022-10-27-at-09.42.54.png)