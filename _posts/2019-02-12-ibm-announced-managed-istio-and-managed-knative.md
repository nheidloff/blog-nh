---
id: 3271
title: 'IBM announced Managed Istio and Managed Knative'
date: '2019-02-12T14:42:52+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3271'
permalink: /article/managed-istio-managed-knative/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/managed-istio-managed-knative/
dsq_thread_id:
    - '7227563982'
categories:
    - Articles
---

At [Think 2019](https://www.ibm.com/events/think/) IBM announced two new add-ons to the [IBM Cloud Kubernetes Service](https://cloud.ibm.com/docs/containers/container_index.html): [Managed Istio](https://www.ibm.com/blogs/bluemix/2019/02/managed-istio-on-iks/) and [Managed Knative](https://www.ibm.com/blogs/bluemix/2019/02/announcing-managed-knative-on-ibm-cloud-kubernetes-service-experimental/).

**My Point of View**

I like this functionality a lot. Istio is a key component when building cloud-native applications. It allows operators to monitor and manage the many microservices developers have implemented. When moving monoliths to mircoservice architectures, monoliths are replaced with simpler microservices. However at the same time the communication between the microservices is more complex. Features like Istio traffic management, which pure Kubernetes infrastructures don’t provide, make it easier for operators to manage these interactions between microservices.

Knative aims to make it simpler for developers to deploy and run code. While I also see the advantages of using containers for some applications to get maximal flexibility, I like Rapid Application Development and as a developer I like to focus on code, rather than having to worry about infrastructure. It feels like with Knative the best of containers, serverless and PaaS are coming together. Knative Serving allows running serverless workloads that scale 0-N. Knative Build makes it easy to deploy source code on Kubernetes, not containers from a developer’s perspective.

**Managed Istio and Managed Knative**

The two new add-ons can be activated in the dashboard of the Kubernetes service:

![image](/assets/img/2019/02/blog-istio-addons.png)

> [Istio](https://istio.io/) is a service mesh for providing a uniform way to integrate microservices, manage traffic flow across microservices, enforce policies and aggregate telemetry data. The Istio add-on simplifies the installation and maintenance of your Istio control plane so you can focus on managing your microservices.

The Managed Istio add-on (beta) comes with Istio 1.0.5, the BookInfo sample application and several tools.

![image](/assets/img/2019/02/blog-istio-istio.png)

The next screenshot shows the invocation hierarchies of microservices from the BookInfo application displayed in [Kiali](https://www.kiali.io/), a monitoring tool for service meshes.

![image](/assets/img/2019/02/blog-istio-kiali.png)

> [Knative](https://cloud.google.com/knative/) is an open source platform to extend the capabilities of Kubernetes to help you create modern, source-centric containerized and serverless apps on top of your cluster.

The Knative add-on provides Knative 0.3.0 and requires Istio.

![image](/assets/img/2019/02/blog-istio-knative.png)

Once the add-ons have been installed, you’ll see additional pods in the Istio and Knative namespaces.

![image](/assets/img/2019/02/blog-istio-pods.png)

To find out more about the new add-ons, read the documentation:

- [Managed Istio](https://cloud.ibm.com/docs/containers/cs_istio.html)
- [Managed Knative](https://cloud.ibm.com/docs/containers/cs_tutorials_knative.html)