---
id: 4597
title: 'Deploying Tekton on OpenShift'
date: '2021-05-10T13:39:39+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4597'
permalink: /article/deploying-tekton-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-tekton-on-openshift/
categories:
    - Articles
---

This article explains how to install Tekton on OpenShift and how to run pipelines of a cloud native sample application.

[Tekton](https://tekton.dev/) is an open source CNCF project to run CI/CD pipelines in Kubernetes clusters.

> Tekton is a powerful and flexible open-source framework for creating CI/CD systems, allowing developers to build, test, and deploy across cloud providers and on-premise systems.

**OpenShift Pipelines**

In order to use Tekton in OpenShift, an [operator](https://www.openshift.com/learn/topics/ci-cd) is available. The setup is trivial. One option is to use the user interface of the OpenShift Web Console:

![image](/assets/img/2021/05/deploy-tekton-1.png)

![image](/assets/img/2021/05/deploy-tekton-2.png)

![image](/assets/img/2021/05/deploy-tekton-3.png)

![image](/assets/img/2021/05/deploy-tekton-4.png)

After the setup you can run your first simple pipelines. In many cases though, your pipelines might need to access resources in other projects. In order to do this, you can use Kubernetes cluster roles:

```
$ oc apply -f scripts-openshift-tekton/ClusterRole.yaml
$ oc create clusterrolebinding routes-and-services-reader-tekton \
    --clusterrole=routes-and-services-reader-tekton  \
    --serviceaccount=app-mod-tekton-dev:pipeline
```

This is the definition of the role:

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: routes-and-services-reader-tekton
rules:
- apiGroups: ["", "route.openshift.io", "apps"]
  resources: ["routes", "services", "deployments", "imagestreams"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
```

**Sample Pipelines**

I have created an [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus) which shows how to modernize a 10+ year old application with modern technologies. When modernizing applications, updates and improvements to the actual applications is only one part of the story. Equally important is to have or introduce a DevOps culture and to use automation and CI/CD.

If you want to run my sample application, the following [commands](https://github.com/IBM/application-modernization-javaee-quarkus#deployment-to-openshift-on-ibm-cloud-with-tekton) can be invoked:

```
$ git clone https://github.com/nheidloff/application-modernization-javaee-quarkus.git && cd application-modernization-javaee-quarkus
$ ROOT_FOLDER=$(pwd)
$ sh ${ROOT_FOLDER}/scripts-openshift-tekton/check-prerequisites.sh
$ oc login ...
$ sh ${ROOT_FOLDER}/scripts-openshift/deploy-db2.sh
$ sh ${ROOT_FOLDER}/scripts-openshift/deploy-kafka.sh
$ sh ${ROOT_FOLDER}/scripts-openshift/deploy-postgres.sh
$ sh ${ROOT_FOLDER}/scripts-openshift-tekton/deploy-application.sh
$ sh ${ROOT_FOLDER}/scripts-openshift-tekton/show-urls.sh
```

The nice thing about Tekton is that (almost) everything is done server-side. In order to run the scripts above, you only need the oc and git CLIs!

**What’s next?**

If you want to see these mechanisms in action, check out my [sample application](https://github.com/IBM/application-modernization-javaee-quarkus). Over the next days I’ll blog more about Tekton, CI/CD and ArgoCD.