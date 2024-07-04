---
id: 5130
title: 'Setting up IBM Software with Terraform'
date: '2022-10-24T09:34:53+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5130'
permalink: /article/setting-up-ibm-software-with-terraform/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/setting-up-ibm-software-with-terraform/
categories:
    - Articles
---

*Automation is key when developing and deploying software. Community is key to get support, to find samples and more. This is why I like Terraform which is a great tool to automate infrastructure on any cloud and there is a huge community.*

**Infrastructure as Code**

While developers have used source control systems for a long time, more and more DevOps engineers use the same mechanism to deploy and manage infrastructures. The main advantage of handling infrastructure as code is that with a declarative approach changes can be easier tracked and human errors can be reduced. Over the last years [Terraform](https://www.terraform.io/) has gained popularity and became an established tool to set up infrastructure.

**Getting started with Terraform**

I’d like to blog soon more about Terraform. Here are some resources that I have used to learn it.

- [Terraform](https://www.terraform.io/)
- [Terraform explained in 15 mins](https://www.youtube.com/watch?v=l5k1ai_GBDE)
- [8 Terraform Best Practices that will improve your TF workflow immediately](https://www.youtube.com/watch?v=gxPykhPxRW0)
- [Terraform vs. Pulumi vs. Crossplane – Infrastructure as Code (IaC) Tools Comparison](https://youtu.be/RaoKcJGchKM)
- [Complete Terraform Course](https://youtu.be/7xngnjfIlK4)

**Terraform for IBM Software**

IBM provides a lot of modules to deploy IBM Software.

- [IBM Cloud Provider](https://registry.terraform.io/providers/IBM-Cloud/ibm/latest/docs)
- [IBM Cloud modules](https://github.com/terraform-ibm-modules/documentation)
- [IBM Cloud Native Toolkit modules](https://github.com/orgs/cloud-native-toolkit/repositories)
- [Getting started with Terraform on IBM Cloud](https://cloud.ibm.com/docs/ibm-cloud-provider-for-terraform?topic=ibm-cloud-provider-for-terraform-getting-started)

Here is a little sample to deploy a resource group in the IBM Cloud and a namespace in a Kubernetes cluster.

![image](/assets/img/2022/10/Screenshot-2022-10-24-at-10.39.03.png)

Check out my blog for more information about Terraform, GitOps and IBM Software over the next days.