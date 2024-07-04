---
id: 4976
title: 'Tekton without Tekton in DevSecOps Pipelines'
date: '2022-04-05T08:48:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4976'
permalink: /article/tekton-without-tekton-devsecops-pipelines/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/tekton-without-tekton-devsecops-pipelines/
categories:
    - Articles
---

*IBM provides a DevSecOps reference implementation which is especially useful for regulated industries to adhere to policies. This article describes how we have implemented the CI and CD pipelines for our SaaS reference architecture.*

This article is part of a mini series. Read the previous articles to understand the benefits of the DevSecOps reference implementation and how to use the CI/CD pipelines from a consumer perspective. In those articles I explain the DevSecOps reference implementation via a concrete sample scenario which is a [SaaS reference architecture](https://github.com/IBM/multi-tenancy) that shows how our clients and partners can build software as a service.

- [DevSecOps for SaaS Reference Architecture on OpenShift]({{ "/article/devsecops-saas-reference-architecture-openshift/" | relative_url }})
- [Shift-Left Continuous Integration with DevSecOps Pipelines]({{ "/article/shift-left-continuous-integration-devsecops-pipelines/" | relative_url }})
- [Change, Evidence and Issue Management with DevSecOps]({{ "/article/change-evidence-issue-management-devsecops/" | relative_url }})
- [Continuous Delivery with DevSecOps Reference Architecture]({{ "/article/continuous-delivery-ibm-devsecops-reference-architecture/" | relative_url }})
- This article: [Tekton without Tekton in DevSecOps Pipelines]({{ "/article/tekton-without-tekton-devsecops-pipelines/" | relative_url }})

The DevSecOps reference implementation uses internally [Tekton](https://tekton.dev/) which is a Kubernetes-native CI/CD technology with several benefits like the big community, lots of reusable tasks, multi-cloud support and more. One challenge I’ve experienced with Tekton is that it is sometimes not as easy and convenient as I had hoped. A good example is how parameters are passed around. To support clean encapsulations and allow reuse of assets, Tekton assets provide interfaces which describe exactly the input and output of assets like tasks. While this concept makes a lot of sense, it can add complexity (some people might say unnecessary work) when developing pipelines. For example to pass a property to a task it might involve multiple stages: from initial definition to pipeline to pipeline run to task and then to task run. In my case this often caused issues since I forgot steps and the debugging was time consuming.

This is why I use the article title ‘Tekton without Tekton’. The DevSecOps reference implementation comes with its own programming model to make it easier to build pipelines. For common tasks like vulnerability checks, secret detections and building images out of the box functionality is provided. In other words no code has to be written. Instead tasks can be reused and customized either declaratively or programmatically.

Rather than writing Tekton tasks, scripts can be invoked. The [.pipeline-config.yaml](https://github.com/IBM/multi-tenancy/blob/2692acce6588f12011ce4b52e7dccb425b219530/.pipeline-config.yaml) file defines which scripts to invoke in which stages of the CI/CD pipelines. For each stage different base images can be chosen. For example the ‘deploy’ stage cannot be handled generically which is why custom specific scripts need to be provided.

```
# Documentation: https://pages.github.ibm.com/one-pipeline/docs/custom-scripts.html
version: '1'
setup:
  image: icr.io/continuous-delivery/pipeline/pipeline-base-image:2.12@sha256:ff4053b0bca784d6d105fee1d008cfb20db206011453071e86b69ca3fde706a4
  script: |
    #!/usr/bin/env bash
    source cd-scripts/setup.sh
deploy:
  image: icr.io/continuous-delivery/pipeline/pipeline-base-image:2.12@sha256:ff4053b0bca784d6d105fee1d008cfb20db206011453071e86b69ca3fde706a4
  script: |
    #!/usr/bin/env bash
    if [[ "$PIPELINE_DEBUG" == 1 ]]; then
      trap env EXIT
      env
      set -x
    fi
    source cd-scripts/deploy_setup.sh
    source cd-scripts/deploy.sh
```

I especially like the tools that provide various convenience functionality. For example this is how you can use global variables (see [documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-devsecops-pipelinectl)).

[Define variable](https://github.com/IBM/multi-tenancy/blob/2692acce6588f12011ce4b52e7dccb425b219530/cd-scripts/deploy_setup.sh#L154):

```
set_env PLATFORM_NAME "${PLATFORM_NAME}"
```

[Read variable:](https://github.com/IBM/multi-tenancy/blob/2692acce6588f12011ce4b52e7dccb425b219530/cd-scripts/deploy.sh#L5)

```
PLATFORM_NAME="$(get_env PLATFORM_NAME)"
```

![image](/assets/img/2022/04/Screenshot-2022-04-01-at-10.37.46.png)

Check out the [IBM Toolchains documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-tutorial-cd-devsecops) and the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) to find out more.