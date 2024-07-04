---
id: 5243
title: 'Deploying TechZone Toolkit Modules on existing Clusters'
date: '2022-11-04T07:28:12+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5243'
permalink: /article/deploying-techzone-toolkit-modules-on-existing-clusters/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-techzone-toolkit-modules-on-existing-clusters/
categories:
    - Articles
---

*With the TechZone Accelerator Toolkit IBM software, open source projects and custom applications can easily be deployed to various clouds. This article explains how to deploy resources on existing OpenShift clusters.*

Check out my earlier blog that introduces the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices from IBM projects with partners and clients.

With the toolkit both infrastructure like Kubernetes clusters as well as resources within Kubernetes clusters can be deployed. Infrastructure resources are deployed via Terraform, resources within clusters via Argo CD.

In some cases you might already have clusters and only want to set up resources within these clusters. Additionally when developing your own modules for the toolkit, you often want to skip creations of clusters, since it takes too much time.

To automate the [deployments of Watson containers](https://github.com/IBM/watson-automation) to embed AI in custom applications, we’ve created a repo. The repo contains documentation how to set up an OpenShift cluster with Watson containers and also documentation how to deploy the Watson containers to existing clusters.

The following [sample](https://github.com/IBM/watson-automation/blob/main/roks-new-nlp/bom.yaml) shows how an OpenShift cluster is created in the IBM Cloud which comes with Argo CD, a GitOps repo, Watson NLP and a sample application based on ubi.

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

To deploy Watson containers to existing OpenShift cluster, another module called ‘[ocp-login](https://github.com/cloud-native-toolkit/terraform-ocp-login)‘ can be used.

```
apiVersion: cloudnativetoolkit.dev/v1alpha1
kind: BillOfMaterial
metadata:
  name: cluster-with-watson-nlp
spec:
  modules:
    - name: ocp-login
    - name: argocd-bootstrap
    - name: gitops-repo
    - name: terraform-gitops-ubi
    - name: terraform-gitops-watson-nlp
```

There is [documentation](https://github.com/IBM/watson-automation/blob/main/documentation/Usage.md#usage-of-existing-clusters) that describes how to use the ocp-login module. You need two pieces of information that are defined in credentials.properties.

- OpenShift server URL, for example ‘https://cXXX-e.yy-zz.containers.cloud.ibm.com:30364’
- OpenShift login token, for example ‘sha256~xxx’

This is the complete [credentials.properties](https://github.com/IBM/watson-automation/blob/main/roks-existing-nlp/output/credentials-template.properties) file which also includes credentials to access the GitOps repo and the Watson container registry:

```
export TF_VAR_gitops_repo_token=___your-github-token____
export TF_VAR_terraform_gitops_watson_nlp_registry_credentials=___your-registry-credentials___
export TF_VAR_server_url=https://cXXX-e.yy-zz.containers.cloud.ibm.com:30364
export TF_VAR_cluster_login_token=sha256~xxx
```

To obtain ‘TF\_VAR\_server\_url’ and ‘TF\_VAR\_cluster\_login\_token’ open the OpenShift console, click on your user name in the upper right corner and choose ‘copy login command’.

![image](/assets/img/2022/11/Screenshot-2022-11-04-at-08.19.06.png)

To find out more about these capabilities, check out the following resources:

- [Watson Automation Repo](https://github.com/IBM/watson-automation)
- [TechZone Accelerator Toolkit](https://operate.cloudnativetoolkit.dev/)
- [Watson NLP](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)