---
id: 3774
title: 'Getting started with Red Hat OpenShift on the IBM Cloud'
date: '2019-08-01T12:35:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3774'
permalink: /article/developers-get-started-red-hat-openshift-ibm-cloud/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developers-get-started-red-hat-openshift-ibm-cloud/
categories:
    - Articles
---

Today (8/1/19) IBM [announced](https://www.ibm.com/cloud/blog/red-hat-openshift-on-ibm-cloud) the general availability of managed [Red Hat OpenShift on the IBM Cloud](https://cloud.ibm.com/kubernetes/catalog/openshiftcluster). This article describes how developers can get started with OpenShift.

**OpenShift on the IBM Cloud**

OpenShift is a Kubernetes distribution which comes with additional capabilities for developers and operators to make building and running cloud-native applications easier. For example it comes with a catalog of services providing a self service experience for developers. I also like that OpenShift comes with lot’s of necessary components like container registries and pipelines out-of-the-box, so that these tools don’t have to be installed or integrated separately. This [article](https://cloudowski.com/articles/10-differences-between-openshift-and-kubernetes/) describes the differences between Kubernetes and OpenShift.

In addition to managed [Kubernetes clusters](https://cloud.ibm.com/docs/containers?topic=containers-cs_ov), the IBM Cloud also offers now managed OpenShift clusters which leverage a lot of the same infrastructure as the Kubernetes clusters with all its [benefits](https://cloud.ibm.com/docs/containers?topic=containers-responsibilities_iks) like the vulnerability advisor for containers. The tutorial [Creating an IBM Cloud Red Hat OpenShift Container Platform cluster](https://cloud.ibm.com/docs/containers?topic=containers-openshift_tutorial) explains how to create OpenShift clusters and how to deploy first applications.

**Minishift**

[OKD](https://www.okd.io/) is the open source upstream Kubernetes distribution embedded in OpenShift. At this point Red Hat OpenShift on IBM Cloud supports OpenShift version 3.11, which includes Kubernetes version 1.11. With [Minishift](https://github.com/minishift/minishift) the 3.x versions of OKD can be run locally for free. All you need is a modern notebook. In my experience you need at least 16 GB of RAM with 8 GB RAM set aside for Minishift.

**Sample Microservices Application**

My colleague Harald Uebele and I have developed and open sourced an end-to-end [sample application](https://github.com/IBM/cloud-native-starter) that helps developers to get started with developing microservices and deploying them to Kubernetes. Recently we’ve added documentation and scripts how to deploy the same application to Minishift and to OpenShift on the IBM Cloud.

The repo describes how to build cloud-native applications with Java, MicroProfile, Kubernetes and Istio. It demonstrates how to develop resilient applications, how to do traffic management, how to invoke microservices and much more. Check out these instructions for how to run the application on Minishift and OpenShift:

- [Minishift]({{ "/article/setup-cloud-native-sample-app-minishift/" | relative_url }})
- [OpenShift on IBM Cloud](https://haralduebele.blog/2019/07/10/deploying-the-cloud-native-starter-example-on-red-hat-openshift-on-the-ibm-cloud/)

**Developing and deploying Microservices**

There are various options to deploy microservices to OpenShift. Some of these options require Dockerfiles, some don’t. Some use standard Kubernetes tooling (kubectl), some additional OpenShift functionality. I’ve tried some of these options and blogged about them.

- [How to develop Open Liberty Microservices on OpenShift]({{ "/article/how-to-develop-open-liberty-microservices-openshift/" | relative_url }})
- [Source to Image Builder for Open Liberty Apps on OpenShift]({{ "/article/source-to-image-builder-open-liberty-openshift/" | relative_url }})
- [Deploying Open Liberty Microservices to OpenShift]({{ "/article/deploying-open-liberty-microservices-openshift/" | relative_url }})

**More useful Resources**

When running OpenShift on the IBM Cloud, it might also make sense for certain scenarios to leverage other IBM Cloud services. For example, as far as I know, OpenShift doesn’t come with a source control system. I’ve written an article [Accessing private GitLab Repositories from OpenShift]({{ "/article/accessing-private-gitlab-repositories-from-openshift/" | relative_url }}) that explains how to access Git repos on the IBM Cloud from OpenShift.

My colleagues have also created a new [landing page](https://developer.ibm.com/collections/openshift-on-ibm/) on [IBM Developer](https://developer.ibm.com/) with lot’s of great samples, tutorials and articles. Check it out.

Red Hat has an awesome [developer program](https://developers.redhat.com/) with many great resources. I like especially the [interactive tutorials](https://developers.redhat.com/topics/kubernetes/) which allow you to play with OpenShift without having to install anything.

![image](/assets/img/2019/08/blog-ibm-redhat.png)