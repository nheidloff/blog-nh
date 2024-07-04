---
id: 4773
title: 'DevSecOps for SaaS Reference Architecture on OpenShift'
date: '2022-03-07T17:04:28+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4773'
permalink: /article/devsecops-saas-reference-architecture-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/devsecops-saas-reference-architecture-openshift/
categories:
    - Articles
---

*This article describes how we leverage IBM’s DevSecOps reference implementation for our SaaS reference architecture that describes how to develop, deploy and operate applications on OpenShift.*

Good SaaS (software as a service) solutions provide efficient mechanisms to deploy and operate the same software for multiple clients/tenants. Over the previous weeks my team has built a reference architecture explaining how such an efficient mechanism could be implemented. The complete code is available on [GitHub](https://github.com/IBM/multi-tenancy).

**DevSecOps**

Red Hat Developer has a good definition of [DevSecOps](https://www.redhat.com/en/topics/devops/what-is-devsecops).

> DevSecOps stands for development, security, and operations. It’s an approach to culture, automation, and platform design that integrates security as a shared responsibility throughout the entire IT lifecycle.

For me the key concepts are ‘shift left’ and ‘automation’. Security needs to be considered in every step of the software development lifecycle. It must not be an afterthought. Instead security should be checked as early as possible in the process. To do this efficiently as much as possible needs to be automated, for example by adding these checks to the continuous integration and continuous deployment (CI/CD) pipelines.

**DevSecOps Reference Implementation**

IBM provides a DevSecOps Reference Implementation. Read the announcement [DevSecOps Reference Implementation for Audit-Ready Compliance Across Development Teams](https://www.ibm.com/cloud/blog/announcements/devsecops-reference-implementation-for-audit-ready-compliance-across-development-teams) for details.

> DevSecOps Reference Implementation provides a complete SDLC (software development life cycle) automated with IBM Cloud Continuous Delivery and other IBM Cloud services.

This implementation is based on best practices from IBM development teams who have worked with regulated industries over the last years. The same implementation is used internally to build some of our offerings. Personally I think it’s always a good indication of the importance of a technology if technology providers drink their own champagne.

Key highlights:

- Security and compliance checks
- Change request management
- Container image signing
- Inventory and evidence collection
- Integration with IBM Cloud Security Security and Compliance Center

What I like most about it from a developer perspective is that it simplifies the creation of Tekton pipelines significantly. I call this ‘Tekton without Tekton’. Tekton is used under the cover, but the programming model is easier. I’ll blog about this separately.

**SaaS Reference Architecture is ready for regulated industries**

Regulated industries such as financial institutions, insurance, healthcare and more, all want the advantages of a hybrid cloud, but need assurance they can protect their assets and maintain compliance with industry and regulatory requirements. The key to hosting regulated workloads in the cloud is to eliminate and mitigate the risks that might be standing in the way of progress. In regulated industries, critical risks fall into the general categories of compliance, cybersecurity, governance, business continuity and resilience.

The DevSecOps approach of our CI/CD pipelines are based an IBM DevSecOps reference implementation, helping to address some of the risks faced by regulated industries. The CI/CD pipelines include steps to collect and upload deployment log files, artifacts, and evidence to a secure evidence locker. In addition, a toolchain integration to IBM Security and Compliance Center verifies the security and compliance posture of the toolchain by identifying the location of the evidence locker, and the presence of the evidence information.

**High Level Components**

Our [SaaS reference architecture](https://github.com/IBM/multi-tenancy) leverages the DevSecOps reference implementation to deploy the backend and frontend containers to Kubernetes and OpenShift on the IBM Cloud.

There is IBM Cloud [documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-tutorial-cd-devsecops) that describes how to set up the CI and CD toolchains. The documentation below adopts this information for the multi-tenancy sample application.

There are six steps to deploy the SaaS sample application.

1. CI backend pull request: Get approval to merge backend code changes into main
2. CI backend pipeline: Pipeline to build backend image and deploy it to a staging environment for testing
3. CI frontend pull request: Get approval to merge frontend code changes into main
4. CI frontend pipeline: Pipeline to build frontend image and deploy it to a staging environment for testing
5. CD pull request: Pull request to deploy main for a specific tenant to production
6. CD pipeline: After approval deploy backend and frontend for a specific tenant to production

Check out the following documents for details:

- [CI pull request related to (1) and (3)](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/ci-pull-request.md)
- [CI pipeline related to (2) and (4)](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/ci-pipeline.md)
- [CD pull request related to (5)](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/cd-pull-request.md)
- [CD pipeline related to (6)](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/cd-pipeline.md)

There are three toolchains:

- CI for backend
- CI for frontend
- CD

![image](/assets/img/2022/03/Screenshot-2022-03-07-at-17.25.13.png)

This article is part of a mini series.

- This article: [DevSecOps for SaaS Reference Architecture on OpenShift]({{ "/article/devsecops-saas-reference-architecture-openshift/" | relative_url }})
- [Shift-Left Continuous Integration with DevSecOps Pipelines]({{ "/article/shift-left-continuous-integration-devsecops-pipelines/" | relative_url }})
- [Change, Evidence and Issue Management with DevSecOps]({{ "/article/change-evidence-issue-management-devsecops/" | relative_url }})
- [Continuous Delivery with DevSecOps Reference Architecture]({{ "/article/continuous-delivery-ibm-devsecops-reference-architecture/" | relative_url }})
- [Tekton without Tekton in DevSecOps Pipelines]({{ "/article/tekton-without-tekton-devsecops-pipelines/" | relative_url }})