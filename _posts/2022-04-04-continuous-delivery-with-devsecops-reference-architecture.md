---
id: 4963
title: 'Continuous Delivery with DevSecOps Reference Architecture'
date: '2022-04-04T07:59:07+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4963'
permalink: /article/continuous-delivery-ibm-devsecops-reference-architecture/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/continuous-delivery-ibm-devsecops-reference-architecture/
categories:
    - Articles
---

*IBM provides a DevSecOps reference implementation which is especially useful for regulated industries to adhere to policies. This article describes the CD pipeline to deploy software using a GitOps approach.*

Here is the definition of [DevSecOps](https://cloud.ibm.com/docs/devsecops?topic=devsecops-devsecops_intro) from IBM:

> DevSecOps is an evolution of Agile and DevOps, integrating secure development best practices as early as possible in the software delivery lifecycle (also known as “shift left”). This approach prevents security problems from reaching production systems and failing corporate audits. DevSecOps requires automating security and compliance controls as part of continuous integration and continuous delivery processes. Evidence of these controls is also collected to demonstrate to auditors that every change in history meets the necessary controls.

This article is part of a mini series:

- [DevSecOps for SaaS Reference Architecture on OpenShift]({{ "/article/devsecops-saas-reference-architecture-openshift/" | relative_url }})
- [Shift-Left Continuous Integration with DevSecOps Pipelines]({{ "/article/shift-left-continuous-integration-devsecops-pipelines/" | relative_url }})
- [Change, Evidence and Issue Management with DevSecOps]({{ "/article/change-evidence-issue-management-devsecops/" | relative_url }})
- This article: [Continuous Delivery with DevSecOps Reference Architecture]({{ "/article/continuous-delivery-ibm-devsecops-reference-architecture/" | relative_url }})
- [Tekton without Tekton in DevSecOps Pipelines]({{ "/article/tekton-without-tekton-devsecops-pipelines/" | relative_url }})

In my previous [blog]({{ "/article/change-evidence-issue-management-devsecops/" | relative_url }}) I explained the CI pipeline. The CI pipeline template that is part of IBM’s DevSecOps reference implementation builds and pushes images and runs various security and code tests. Only if all checks pass, the application can be deployed to production via the CD pipeline. This assures that new versions can be deployed at any time based on business (not technical) decisions.

The CD (continuous delivery) pipeline generates all of the evidence and change request summary content. The pipeline deploys the build artifacts to a specific environment and collects, creates, and uploads all existing log files, evidence, and artifacts to the evidence locker. Here is an overview of the [functionality](https://cloud.ibm.com/docs/devsecops?topic=devsecops-cd-devsecops-cd-pipeline) provided by the CD pipeline:

- Determine deployment delta
- Calculate deployment BOM
- Collect evidence summary
- Prepare and create change request
- Check change request approval
- Perform deployment
- Run acceptance test

Let’s take a look at a concrete sample. My team has developed a [SaaS reference architecture](https://github.com/IBM/multi-tenancy) that shows how our clients and partners can build software as a service. While the compute components are identical for multiple platforms like Kubernetes, OpenShift and Serverless, the way these components are deployed is specific to the platforms.

Here is how the CD pipeline is used for Kubernetes and OpenShift deployments. In order to deploy a new application version for a specific tenant, a pull request has to be created and merged. The pull request asks to merge the latest version from the main branch of the inventory to the tenant specific branches in the inventory. After the latest version has been merged into the branch of a specific tenant, the deployment functionality of the DevSecOps reference implementation uses GitOps to deploy the application to the production environment of the tenant. This is done by comparing the actual ‘as is’ state in the cluster with the ‘to be’ state in the tenant branch.

Here are the key steps performed in the CD pipelines. For the complete flow read the documentation.

- [Promotion pipeline](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/cd-pull-request.md): The first CD pipeline is a very simple ‘pipeline’ which only creates a pull request.
- [CD pipeline](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/kubernetes-via-ibm-kubernetes-service-and-ibm-openshift/cd-pipeline.md): The second CD pipeline is the actual CD pipeline.

Create the pull request to deploy the latest version for a specific tenant.

![image](/assets/img/2022/04/devsecops-cd-0.png)

After defining all data, the pull request can be merged.

![image](/assets/img/2022/04/devsecops-cd-1.png)

The actual CD pipeline (the second one) can be started in either of the following ways:

- Preferred: Trigger the CD pipeline manually.
- Optional: Automatically after every merge action in the inventory repository

![image](/assets/img/2022/04/devsecops-cd-3.png)

Global and tenant specific configuration is read. Either Kubernetes or OpenShift can be used; in a shared cluster or isolated clusters for tentants.

![image](/assets/img/2022/04/devsecops-cd-4.png)

The delta is calculated, since only changes are deployed. Additionally security checks are performed again.

![image](/assets/img/2022/04/devsecops-cd-5.png)

After the actual deployment has been performed, data is collected.

![image](/assets/img/2022/04/devsecops-cd-6.png)

![image](/assets/img/2022/04/devsecops-cd-7.png)

![image](/assets/img/2022/04/devsecops-cd-8.png)

Check out the [IBM Toolchains documentation](https://cloud.ibm.com/docs/devsecops?topic=devsecops-tutorial-cd-devsecops) and the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) to find out more.