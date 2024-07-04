---
id: 2796
title: 'A/B Testing with Kubernetes and Istio'
date: '2018-02-13T13:37:16+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2796'
permalink: /article/ab-testing-kubernetes-istio/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6477253588'
custom_permalink:
    - article/ab-testing-kubernetes-istio/
categories:
    - Articles
---

Last week I gave a presentation “[When to use Serverless? When to use Kubernetes?]({{ "/article/when-to-use-serverless-kubernetes" | relative_url }})” One of the weaknesses of Serverless platforms is that you currently cannot do things like A/B testing well since there is no notion of versions.

[A/B testing](https://en.wikipedia.org/wiki/A/B_testing) allows running multiple variants of functionality in parallel, so that through analytics of user behavior the better variant can be determined. Similarly with ‘dark launches’ new features can be made available to only certain users to test features in production environments before these features will be released to the masses.

These traffic flow management capabilities are one of the advantages of [Kubernetes](https://kubernetes.io) and [Istio](https://istio.io/). Istio is an open platform to manage microservices.

Some of my colleagues have [documented](https://github.com/IBM/microservices-traffic-management-using-istio) how to do traffic flow management with Istio for the [Book Info](https://istio.io/docs/guides/bookinfo.html) sample that is part of the [Istio documentation](https://istio.io/docs/concepts/what-is-istio/overview.html). The current documentation is for Istio 0.1.6 and doesn’t work for the later version 0.5.0 which I use. I’ve sent a [pull request](https://github.com/IBM/microservices-traffic-management-using-istio/pull/60), since some URLs have changed.

The diagram shows the architecture of the book info sample app. Books have reviews and can have ratings. The application has three versions of the review service. The gray components on the left hand side are the Istio components. When the sample application is deployed, further Istio components, the Envoy containers, are automatically added to each pod. These Envoy components are proxies (also called side cars) through which containers communicate with each other which is the basis for Istio’s traffic management capabilities.

![image](/assets/img/2018/02/istio-sample-architecture.png)

Check out the [bookinfo.yaml](https://github.com/istio/istio/blob/9f670724fb6c5f7de818204c63e155c6d6c0706a/samples/bookinfo/kube/bookinfo.yaml#L88-L156) file how to define and deploy the three versions of the review service.

In order to route traffic to version 1 for 50% of the invocations and to version 3 for the other half, this [route rule](https://github.com/istio/istio/blob/9f670724fb6c5f7de818204c63e155c6d6c0706a/samples/bookinfo/kube/route-rule-reviews-50-v3.yaml) can be used.

```
apiVersion: config.istio.io/v1alpha2
kind: RouteRule
metadata:
  name: reviews-default
spec:
  destination:
    name: reviews
  precedence: 1
  route:
  - labels:
      version: v1
    weight: 50
  - labels:
      version: v3
    weight: 50
```

In order to expose version 2 to only users with the name ‘Jason’, a [regular expression](https://github.com/istio/istio/blob/9f670724fb6c5f7de818204c63e155c6d6c0706a/samples/bookinfo/kube/route-rule-reviews-test-v2.yaml) can be used.

```
apiVersion: config.istio.io/v1alpha2
kind: RouteRule
metadata:
  name: reviews-test-v2
spec:
  destination:
    name: reviews
  precedence: 2
  match:
    request:
      headers:
        cookie:
          regex: "^(.*?;)?(user=jason)(;.*)?$"
  route:
  - labels:
      version: v2
```

To learn more about traffic management in Istio, check out the [documentation](https://istio.io/docs/tasks/traffic-management/). If you want to try out Kubernetes, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff).