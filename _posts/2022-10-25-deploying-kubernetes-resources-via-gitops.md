---
id: 5142
title: 'Deploying Kubernetes Resources via GitOps'
date: '2022-10-25T11:12:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5142'
permalink: /article/deploying-kubernetes-resources-via-gitops/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-kubernetes-resources-via-gitops/
categories:
    - Articles
---

*Infrastructure as Code is an important concept of DevOps. With GitOps tools like [Argo CD](https://argo-cd.readthedocs.io/en/stable/), not only infrastructure can be handled as code, but also custom applications and other Kubernetes resources.*

Here is the definition of [GitOps](https://www.redhat.com/en/topics/devops/what-is-gitops) from Red Hat.

> GitOps uses Git repositories as a single source of truth to deliver infrastructure as code. Submitted code checks the CI process, while the CD process checks and applies requirements for things like security, infrastructure as code, or any other boundaries set for the application framework. All changes to code are tracked, making updates easy while also providing version control should a rollback be needed.

Software development is much more than writing source code. Modern software development also requires automation and CI/CD. One way to implement CI/CD is to use pipelines that build images and other resources and deploy them via scripts whenever the pipelines run. While pipelines are still required to build the artefacts, the actual deployment of resources is done more and more via declarative and event based GitOps mechanisms.

GitOps uses Git repos to define the desired state of a system. GitOps tools like Argo CD compare the current state with the desired state. If these states don’t match, synchronisation is triggered automatically to apply, update or delete resources.

Here are some videos I’ve used to learn GitOps:

- [What is GitOps, How GitOps works and Why it’s so useful](https://www.youtube.com/watch?v=f5EpcWp0THw)
- [ArgoCD Tutorial for Beginners | GitOps CD for Kubernetes](https://youtu.be/MeU5_k9ssrs)
- [What Is GitOps And Why Do We Want It?](https://www.youtube.com/watch?v=qwyRJlmG5ew)
- [GitOps Without Pipelines With ArgoCD Image Updater](https://youtu.be/avPUQin9kzU)
- [Argo CD – Applying GitOps Principles To Manage A Production Environment In Kubernetes](https://youtu.be/vpWQeoaiRM4)

Over the next days I’d like to blog more about GitOps and Terraform and how my team has used these tools to [set up Red Hat OpenShift in the IBM Cloud](https://github.com/IBM/watson-automation) including Watson NLP and a custom application.

![image](/assets/img/2022/10/Screenshot-2022-10-26-at-08.37.01.png)