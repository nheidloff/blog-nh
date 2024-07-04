---
id: 4936
title: 'Shift-Left Continuous Integration with DevSecOps Pipelines'
date: '2022-03-31T18:06:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4936'
permalink: /article/shift-left-continuous-integration-devsecops-pipelines/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/shift-left-continuous-integration-devsecops-pipelines/
categories:
    - Articles
---

*IBM provides a DevSecOps reference implementation that I’ve used to build our SaaS reference architecture. This article describes the CI pipeline, especially the part to enforce branch protection.*

This article is part of a mini series.

- [DevSecOps for SaaS Reference Architecture on OpenShift]({{ "/article/devsecops-saas-reference-architecture-openshift/" | relative_url }})
- This article: [Shift-Left Continuous Integration with DevSecOps Pipelines]({{ "/article/shift-left-continuous-integration-devsecops-pipelines/" | relative_url }})
- [Change, Evidence and Issue Management with DevSecOps]({{ "/article/change-evidence-issue-management-devsecops/" | relative_url }})
- [Continuous Delivery with DevSecOps Reference Architecture]({{ "/article/continuous-delivery-ibm-devsecops-reference-architecture/" | relative_url }})
- [Tekton without Tekton in DevSecOps Pipelines]({{ "/article/tekton-without-tekton-devsecops-pipelines/" | relative_url }})

A core concept of DevSecOps is ‘shift left testing and security’. The basic idea is simple. Do as much security and functional testing as early as possible in the software development lifecycle. The earlier issues are detected, the easier and cheaper is it to fix the issues.

These are the main tasks of the first of the two CI pipelines that are part of the IBM DevSecOps reference implementation.

- Branch protection is ensured so that developers cannot push to the main branch directly
- CIS checks are run
- Secrets in code and config files are detected
- Unit tests are run
- Vulnerability scans are performed

The [documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-tutorial-cd-devsecops#devsecops-ci-toolchain-intro) describes these steps in more details. Let’s look how this can be done when developers check in code. You can find the [complete flow](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/ci-pull-request.md) in the GitHub repo.

Changes from developers are not pushed into the main branch directly. Instead feature branches are used which is a good pattern anyway.

![image](/assets/img/2022/03/devsecops1-002.png)

After the pull request has been created, the first CI pipeline starts automatically to perform the various security and functional tests.

![image](/assets/img/2022/03/devsecops1-008.png)

I like the integration in GitHub. As a developer I can see most of the results directly in the GitHub experience. In the background the pipeline on the IBM Cloud is run.

![image](/assets/img/2022/03/devsecops1-009.png)

Even if the various security checks have been successful, the pull request still cannot be merged. A second developer (in this case my colleague Adam) needs to approve first. From my personal experience I can say that these reviews are another very good pattern.

![image](/assets/img/2022/03/devsecops1-015.png)

Check out the [IBM Toolchains documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-tutorial-cd-devsecops) and the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) to find out more.