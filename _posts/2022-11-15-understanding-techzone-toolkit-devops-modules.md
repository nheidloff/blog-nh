---
id: 5306
title: 'Understanding TechZone Toolkit GitOps Modules'
date: '2022-11-15T00:38:51+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5306'
permalink: /article/understanding-techzone-toolkit-gitops-modules/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/understanding-techzone-toolkit-gitops-modules/
categories:
    - Articles
---

*With the TechZone Accelerator Toolkit IBM software, open source projects and custom applications can easily be deployed to various clouds. This article explains how to deploy resources in Kubernetes clusters via GitOps.*

Check out my earlier blog that introduces the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices from IBM projects with partners and clients. With the toolkit both infrastructure like Kubernetes clusters as well as Kubernetes resources within clusters can be deployed. Infrastructure resources are deployed via Terraform, resources within clusters via Argo CD.

To deploy resources in Kubernetes clusters, DevOps modules are used which can be found in the [TechZone Module Catalog](https://modules.cloudnativetoolkit.dev/). The TechZone Toolkit uses Argo CD for GitOps which is deployed automatically. Argo CD requires a Git repo to store the desired state which it continuously synchronizes with the actual state in the cluster. Read my blog [Deploying Kubernetes Resources via GitOps]({{ "/article/deploying-kubernetes-resources-via-gitops/" | relative_url }}) for an introduction to GitOps.

Let’s look how the toolkit works for a concrete [sample](https://github.com/ibm/watson-automation) where Watson NLP is deployed to OpenShift via GitOps.

First you define the modules argocd-bootstrap and gitops-repo in the BOM (bill of material).

```
apiVersion: cloudnativetoolkit.dev/v1alpha1
kind: BillOfMaterial
metadata:
  name: cluster-with-watson-nlp
spec:
  modules:
    - name: ibm-ocp-vpc
    - name: argocd-bootstrap
    - name: gitops-repo
    - name: terraform-gitops-ubi
    - name: terraform-gitops-watson-nlp
```

To configure the GitOps module, change the configuration in [variables.yaml](https://github.com/IBM/watson-automation/blob/main/roks-new-nlp/output/cluster-with-watson-nlp/variables-template.yaml#L31-L42).

```
# gitops
- name: gitops_repo_repo
  description: The name of the gitops repository that will be created
  value: xxx
- name: gitops_repo_host
  value: github.com
- name: gitops_repo_org
  value: xxx
- name: gitops_repo_username
  value: xxx
```

After applying the Terraform modules a GitOps repo will be created with a specific [structure](https://github.com/cloud-native-toolkit/terraform-tools-gitops/tree/main/template) that the toolkit expects. There are two major types of resources in these repos:

1. ArgoCD configuration
2. Application ‘payloads’

*ArgoCD configuration*  
In Argo CD, collections of kubernetes resources that are deployed together are called “applications”. Applications in ArgoCD are configured using a custom resource definition (CRD) in the cluster which means ArgoCD applications can deploy other ArgoCD applications (called the ‘[App of Apps pattern](https://argoproj.github.io/argo-cd/operator-manual/cluster-bootstrapping/#app-of-apps-pattern)‘). With this pattern, the Argo CD environment can be bootstrapped with an initial application. That initial bootstrap application can then be updated in the GitOps repository to configure other applications.

*Application ‘payloads’*  
The ArgoCD configuration points to other paths within the GitOps repository that contain the actual “payload” yaml to provision the applications (the deployments, config maps, etc that make up the applications).

In addition to separating the Argo CD configuration from the application ‘payloads’, the configuration has also been divided into three different layers of the cluster configuration:

1. Infrastructure: Foundational elements within the cluster, like namespaces, service accounts, role-based access control, etc. These resources are often managed by the infrastructure team and are required by the other resources.
2. Shared services: Shared services are application components that are used across multiple applications or across the cluster. Often these are operator-based services and managed independently from the applications.
3. Applications: The application layer contains the applications deployed to the cluster, using the infrastructure and shared service components.

Let’s look at the Watson NLP GitOps module example. In the directory ‘argocd/2-services’ the source of the Argo CD application is defined which resides in the same repo in the ‘payload/2-services’ directory. Helm is used for the actual deployment of the Watson NLP resources. Helm is the preferred solution of the toolkit since it allows easy configurations for different environments based on its built-in templating mechanism.

![image](/assets/img/2022/11/Screenshot-2022-11-14-at-09.32.17.png)

The Argo CD dashboard shows the registered applications and their synchronization states.

![image](/assets/img/2022/11/Screenshot-2022-11-14-at-09.55.58.png)

Additionally the dashboard shows for each application which Kubernetes resources have been deployed.

![image](/assets/img/2022/11/Screenshot-2022-11-14-at-09.56.55.png)

To change deployments you can simply change the configuration in the GitOps repo, for example to update to a later version of Watson NLP. Argo CD will be triggered automatically to synchronize the desired state with the actual state.

To find out more about these capabilities, check out the following resources:

- [TechZone Accelerator Toolkit Documentation](https://operate.cloudnativetoolkit.dev/)
- [TechZone Accelerator Toolkit Modules](https://operate.cloudnativetoolkit.dev/)
- [TechZone Accelerator Toolkit CLI (iascable)](https://github.com/cloud-native-toolkit/iascable)
- [Sample GitOps Module: UBI](https://github.com/cloud-native-toolkit/terraform-gitops-ubi)
- [Sample GitOps Module: Watson NLP](https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp)
- [Sample BOMs to deploy Watson NLP](https://github.com/IBM/watson-automation)