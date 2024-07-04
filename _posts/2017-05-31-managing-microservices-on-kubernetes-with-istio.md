---
id: 2308
title: 'Managing Microservices on Kubernetes with Istio'
date: '2017-05-31T17:13:41+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2308'
permalink: /article/kubernetes-istio-microservices-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/kubernetes-istio-microservices-bluemix/
dsq_thread_id:
    - '5936508646'
categories:
    - Articles
---

Last week IBM and Google [announced](https://developer.ibm.com/dwblog/2017/istio/) [Istio](https://istio.io/), an open platform to connect, manage, and secure microservices. Istio improves the visibility of the data flowing between the different services and the good news for developers is that you don’t have to change your code.

There is good [documentation](https://istio.io/docs/) available, but in a nutshell Istio inserts proxies in pods which are called instead of the custom containers (services) directly. This allows Istio to control and monitor the requests to the services. As a developer you simply use Istio to automatically add a bunch of additional containers and pods to your Kubernetes deployments without having to change your app.

The Istio website explains the [concepts](https://istio.io/docs/concepts/index.html) in more detail. As Jason McGee writes in this blog Instio’s main functionality is:

- Automatic zone-aware load balancing and failover for HTTP/1.1, HTTP/2, gRPC, and TCP traffic.
- Fine-grained control of traffic behavior with rich routing rules, fault tolerance, and fault injection.
- A pluggable policy layer and configuration API supporting access controls, rate limits and quotas.
- Automatic metrics, logs and traces for all traffic within a cluster, including cluster ingress and egress.
- Secure service-to-service authentication with strong identity assertions between services in a cluster.

I’ve installed the [BookInfo](https://istio.io/docs/samples/bookinfo.html) sample to try the functionality. It was very easy to set up, both on [Minikube](https://github.com/kubernetes/minikube) and on IBM [Bluemix](https://bluemix.net). I like especially the dashboard (Grafana) which visualizes metrics like request rates, success/failure rates, etc. in a cluster.

![istio1](/assets/img/2017/05/istio1.png)

The ServiceGraph addon provides a graphical visualization of the service interaction graph for the cluster.

![istio3](/assets/img/2017/05/istio3.png)

With the [Zipkin](https://istio.io/docs/tasks/zipkin-tracing.html#accessing-the-zipkin-dashboard) dashboard you can see the invocation chains of microservices.

![istio2](/assets/img/2017/05/istio2.png)

If you want to try out Istio follow these [instructions](https://istio.io/docs/tasks/installing-istio.html) and set up the [sample](https://istio.io/docs/samples/bookinfo.html).