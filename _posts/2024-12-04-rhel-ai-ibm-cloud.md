---
id: nh-097
title: 'Red Hat Enterprise Linux AI on IBM Cloud'
date: 2024-12-04 01:04:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-097'
permalink: /article/rhel-ai-ibm-cloud/
custom_permalink:
    - article/rhel-ai-ibm-cloud/
image: /assets/img/2024/12/rhel-ai-ibm-cloud-1.png
---

*Red Hat Enterprise Linux AI (RHEL AI) comes with InstructLab to fine tune Large Language Models. This post describes how to set it up on IBM Cloud.*

> Red Hat Enterprise Linux AI is a foundation model platform to seamlessly develop, test, and run Granite family large language models (LLMs) for enterprise applications.

IBM previewed at TechXchange InstructLab integrated in watsonx.ai in a multi-tenancy environment. For regulated industries you can you also run InstructLab on IBM Cloud via RHEL AI in isolated environments.

## Documentation

There are several resources available. This post only explains some highlights of the process to set up everything.

* [Customizations of Generative AI Models with InstructLab]({{ "/article/instructlab/" | relative_url }})
* [Installing RHEL AI on IBM Cloud](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux_ai/1.3/html/installing/installing_ibm_cloud)
* [Download RHEL AI Images](https://developers.redhat.com/products/rhel-ai/download)
* [Generating a custom LLM using RHEL AI](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux_ai/1.3/html/generating_a_custom_llm_using_rhel_ai/index)
* [Red Hat Enterprise Linux AI](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/ai)
* [InstructLab Open Source](https://github.com/instructlab)

## Custom Image

First the RHEL AI image needs to be downloaded (12 GB) and uploaded to Cloud Object Storage. Note that for the following configuration I chose the 'qcow2' version (rhel-ai-nvidia-1.3-1733173196-x86_64-kvm.qcow2) which is much smaller, not the RAW version.

Next a custom image is defined either via API or UI.

![image](/assets/img/2024/12/rhel-ai-ibm-cloud-2.png)

![image](/assets/img/2024/12/rhel-ai-ibm-cloud-3.png)

## Virtual Server Instance

Now a new virtual server instances can be created running in a VPC.

![image](/assets/img/2024/12/rhel-ai-ibm-cloud-4.png)

To run a first simple sample, two L40s GPUs are attached.

![image](/assets/img/2024/12/rhel-ai-ibm-cloud-5.png)

## InstructLab

Via a floating IP and ssh the server can be accessed and InstructLab can be configured and run. Note that RHEL AI 1.3 comes with InstructLab 0.21.0.

![image](/assets/img/2024/12/rhel-ai-ibm-cloud-6.png)