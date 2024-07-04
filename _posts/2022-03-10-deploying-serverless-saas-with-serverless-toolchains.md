---
id: 4758
title: 'Deploying Serverless SaaS with Serverless Toolchains'
date: '2022-03-10T16:38:39+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4758'
permalink: /article/deploying-serverless-saas-with-serverless-toolchains/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-serverless-saas-with-serverless-toolchains/
categories:
    - Articles
---

*For serverless applications not only the compute should be serverless, but also the deployment. This article describes how to deploy and run a multi-tenancy SaaS application fully serverless on the IBM Cloud.*

Over the previous weeks my team has built a reference architecture showing our partners how to build and deploy SaaS (software as a service). Our sample application can be deployed to various platforms. The easiest way to get started is to use serverless. This works especially well for simpler cloud-native applications.

To learn more about the reference architecture, check out these resources.

- [New Open-Source Multi-Cloud Asset to build SaaS]({{ "/article/open-source-multi-cloud-assets-saas" | relative_url }})
- [How to build SaaS for multiple Tenants]({{ "/article/how-to-build-saas-for-multiple-tenants/" | relative_url }})
- [Typical Authentication Flow for Kubernetes Applications]({{ "/article/typical-authentication-flow-kubernetes-applications/" | relative_url }})
- [Initial Setup of the Serverless Application](https://ibm.github.io/multi-tenancy-documentation/serverless-via-ibm-code-engine/ce-setup-create-the-instances/)
- [Multi Tenancy Repo](https://github.com/IBM/multi-tenancy)

The sample application comes with four common components used by many application stacks.

- Web application running in a browser and hosted by a frontend container
- Backend microservice
- Managed database service
- Managed authentiation service

The two managed services are created via scripts. We will blog separately about this. My colleague Thomas Suedbroecker has written great [documentation](https://ibm.github.io/multi-tenancy-documentation/serverless-via-ibm-code-engine/ce-setup-create-the-instances/) and developed an image that contains all necessary tools to run the scripts.

In this article I focus on CI/CD. Every time developers submit new code to the Git repos for the backend and frontend containers pipelines should be triggered to deploy the latest versions and configure the complete system. Our challenge was to find a good pattern to deploy the same applications for multiple tenants using the same infrastructure.

We decided to use the serverless [IBM Toolchains](https://cloud.ibm.com/devops/toolchains) in the IBM Cloud which supplement well the serverless compute platform [IBM Cloud Code Engine](https://ibm.com/cloud/code-engine).

For our multi-tenancy SaaS scenario we leverage four pipelines.

- pipeline-backend: Builds the backend image and triggers the deployment pipelines for all tenants
- pipeline-backend-tenant: Deploys the backend container for one tenant
- pipeline-frontend: Builds the frontend image and triggers the deployment pipelines for all tenants
- pipeline-frontend-tenant: Deploys the frontend container for one tenant

The complete flow is [documented](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/serverless-via-ibm-code-engine/serverless-cicd.md) in one of our repos. Since the 36 steps might be a little too much for a blog, let me highlight some key capabilities.

With only a handful of clicks the complete toolchain with the four pipelines can be created.

![image](/assets/img/2022/03/serverless-cicd1.png)

In the first pipeline (pipeline-backend) the image is built and pushed to a container registry. This pipeline is run only once for all tenants (per code change).

![image](/assets/img/2022/03/serverless-cicd2.png)

In the last step of the first pipeline for each tenant pipeline runs of a second pipeline (pipeline-backend-tenant) are triggered. These pipelines deploy the same image for the different tenants using their specific configuration.

![image](/assets/img/2022/03/serverless-cide3.png)

As result the backend and frontend containers will have been deployed for all tenants to Code Engine including their configurations to access the authentication and the database services. Everything fully automated.

![image](/assets/img/2022/03/serverless-cicd4.png)

Check out the resources above to find out more. I’ll also blog more about how I’ve actually built these pipelines.