---
id: 4951
title: 'Change, Evidence and Issue Management with DevSecOps'
date: '2022-04-01T13:30:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4951'
permalink: /article/change-evidence-issue-management-devsecops/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/change-evidence-issue-management-devsecops/
categories:
    - Articles
---

*IBM provides a DevSecOps reference implementation which is especially useful for regulated industries to adhere to policies. This article describes the CI pipeline which provides in addition to the usual CI functionality change, evidence and issue management capabilities.*

This article is part of a mini series:

- [DevSecOps for SaaS Reference Architecture on OpenShift]({{ "/article/devsecops-saas-reference-architecture-openshift/" | relative_url }})
- [Shift-Left Continuous Integration with DevSecOps Pipelines]({{ "/article/shift-left-continuous-integration-devsecops-pipelines/" | relative_url }})
- This article: [Change, Evidence and Issue Management with DevSecOps]({{ "/article/change-evidence-issue-management-devsecops/" | relative_url }})
- [Continuous Delivery with DevSecOps Reference Architecture]({{ "/article/continuous-delivery-ibm-devsecops-reference-architecture/" | relative_url }})
- [Tekton without Tekton in DevSecOps Pipelines]({{ "/article/tekton-without-tekton-devsecops-pipelines/" | relative_url }})

The CI pipeline template that is part of IBM’s DevSecOps reference implementation builds and pushes images and runs various security and code tests. Only if all checks pass, the application can be deployed to production via the CD pipelines. This assures that new versions can be deployed at any time based on business (not technical) decisions.

Functionality of the (second) CI pipeline:

- Build and push images
- Run various security checks (secret detection, image vulnerabilities, compliance)
- Run various code tests (unit tests, acceptance tests)
- Deploy services to integration/testing Kubernetes namespaces or OpenShift projects
- Manage changes, evidence and issues

I’ve [documented](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/ci-pipeline.md) all steps of the pipeline on GitHub. Let’s take a look at the most important steps.

The CI pipeline is triggered automatically after the pull request has been merged ([see previous article]({{ "/article/shift-left-continuous-integration-devsecops-pipelines/" | relative_url }})).

![image](/assets/img/2022/03/devsecops-ci2-002.png)

The CI pipeline reads both global and tenant specific configuration from a Git repo. In the CI pipeline the tenant configuration is not from an actual tenant, but a dummy/test tenant used to run the CI tests.

![image](/assets/img/2022/03/devsecops-ci2-007.png)

The image is built and pushed.

![image](/assets/img/2022/03/devsecops-ci2-010.png)

Next various security, vulnerability and compliance checks are run. Then the container is deployed to an integration/testing Kubernetes namespace or OpenShift project to run more tests.

![image](/assets/img/2022/03/devsecops-ci2-015.png)

The status can be monitored in IBM DevOps Insights.

![image](/assets/img/2022/03/devsecops-ci2-028.png)

The latest successful version is stored in the inventory repo.

![image](/assets/img/2022/03/devsecops-ci2-032.png)

Evidence is collected in the evidence repo.

![image](/assets/img/2022/03/devsecops-ci2-035.png)

If the pipeline run has been successful, no issues are created in the compliance issues repo.

![image](/assets/img/2022/03/devsecops-ci2-037.png)

After a successful run of the CI pipeline, the CD pipeline can be run. I’ll blog about this soon. Check out the [IBM Toolchains documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-tutorial-cd-devsecops) and the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) to find out more.