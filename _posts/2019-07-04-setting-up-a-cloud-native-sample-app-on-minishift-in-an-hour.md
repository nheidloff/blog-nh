---
id: 3727
title: 'Setting up a cloud-native Sample App on Minishift in an Hour'
date: '2019-07-04T14:11:27+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3727'
permalink: /article/setup-cloud-native-sample-app-minishift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/setup-cloud-native-sample-app-minishift/
categories:
    - Articles
---

My colleague Harald Uebele and I have developed an end-to-end sample application to help developers to get started with developing microservices and deploying them to Kubernetes. We have documented how to run this application on Minikube and the IBM Cloud Kubernetes service. This week we added documentation and scripts how to deploy the same application to Minishift in less than an hour.

The application is available as [open source](https://github.com/IBM/cloud-native-starter). My previous article [Example Java App running in the Cloud via Kubernetes]({{ "/article/example-java-app-cloud-kubernetes" | relative_url }}) explains this project and the design principles.

The sample showcases various [cloud-native functionality](https://github.com/IBM/cloud-native-starter#demos): REST APIs, traffic management, resiliency, distributed logging and more. There is also documentation how to do authentication, authorization, persistence and other observability functionality. The application comes with a simple web frontend which displays links to articles.

![image](/assets/img/2019/07/okd-web-app.png)

The Vue.js web application accesses a Web-API service which invokes an Articles service and an Authors service. To demonstrate traffic management, there are two versions of the Web-API service.

![image](/assets/img/2019/07/okd-sample-architecture.png)

**Setup of Minishift and the Sample Application**

[OKD](https://www.okd.io/) is the open source upstream Kubernetes distribution embedded in OpenShift. [Minishift](https://github.com/minishift/minishift) is a tool that allows you to run OKD 3.x locally by running a single-node cluster inside a VM. We have used Minishift v1.34.0 and OKD v3.10.0.

We have documented in the repo the steps to install Minishift, Istio and the sample application. The main steps are:

1. [Get Minishift](https://github.com/IBM/cloud-native-starter/blob/master/documentation/MinishiftDeployment.md#1-get-minishift)
2. [Create a cluster](https://github.com/IBM/cloud-native-starter/blob/master/documentation/MinishiftDeployment.md#2-create-a-minishift-cluster)
3. [Try the oc CLI](https://github.com/IBM/cloud-native-starter/blob/master/documentation/MinishiftDeployment.md#3-oc)
4. [Install Istio](https://github.com/IBM/cloud-native-starter/blob/master/documentation/MinishiftDeployment.md#4-install-istio)
5. [Install the sample’s prerequisites and the sample application](https://github.com/IBM/cloud-native-starter/blob/master/documentation/MinishiftDeployment.md#5-initial-deployment-of-cloud-native-starter)

We have automated this setup as much as possible by providing several scripts. On my 5 years old MacBook Pro with 16 GB RAM it took me less than an hour. To find out what exactly the scripts do, check out the [code](https://github.com/IBM/cloud-native-starter/tree/master/minishift-scripts) and read two articles from Harald [Deploying the Cloud Native Starter microservices on Minishift](https://haralduebele.blog/2019/07/03/deploying-the-cloud-native-starter-microservices-on-minishift/) and [Cloud Native Starter and OpenShift, OKD, Minishift](https://haralduebele.blog/2019/06/28/cloud-native-starter-and-openshift-okd-minishift/).

**Motivation**

There are several reasons why we’ve worked on this.

*1. Learn OKD*

One was simply to learn more about OKD, Minishift and OpenShift since IBM offers a new managed [Red Hat OpenShift service on the IBM Cloud](https://cloud.ibm.com/docs/containers?topic=containers-openshift_tutorial) (beta).

*2. Run existing Kubernetes applications on OKD*

Another reason was to proof that you can deploy applications that have been developed for pure Kubernetes environments to the Kubernetes distribution OKD (‘Run anywhere’). OKD offers several ways to deploy applications, some of them make it really easy for developers so that you don’t have to understand in depth Kubernetes, Dockerfiles and yaml files. To achieve maximal flexibility and to deploy existing applications to OKD, you can also use standard Kubernetes deployment techniques like ‘kubeclt apply -f config.yaml’ which is what we’ve done.

*3. Leverage the OKD image registry*

Kubernetes does not come with an image registry. Since you need a registry to run cloud-native enterprise applications, vendors like IBM offer [managed private registries](https://www.ibm.com/cloud/container-registry). OKD comes already with a registry out-of-the-box. This screenshot shows the image of the Authors service in the web console.

![image](/assets/img/2019/07/okd-image-registry.png)

*4. Leverage the server-side builds*

One way to deploy applications is to host the code in a Git repository. When new code is pushed, builds can automatically be triggered which run server-side on OKD. The screenshot shows the build history of the Authors service including the logs.

![image](/assets/img/2019/07/okd-builds.png)

There are several resources to find out more about this sample application:

- [Repo on GitHub](https://github.com/IBM/cloud-native-starter)
- [30 minutes talk](http://heidloff.net/recording-of-talk-how-to-develop-your-first-cloud-native-applications-with-java/)
- [Slides](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/OneHourTalk.pdf)