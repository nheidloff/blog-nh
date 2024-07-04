---
id: 3449
title: 'Sample Application demonstrating Istio Traffic Management'
date: '2019-03-27T10:12:20+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3449'
permalink: /article/sample-app-manage-microservices-traffic-istio/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7321002916'
custom_permalink:
    - article/sample-app-manage-microservices-traffic-istio/
categories:
    - Articles
---

[Istio](https://istio.io/) is an open source service mesh to connect and control microservices in cloud native applications running on Kubernetes. One of the key features is [traffic management](https://istio.io/docs/concepts/traffic-management/) for A/B testing, canary rollouts and blue-green deployments.

My colleague Harald Uebele and I have implemented a sample which is very easy to set up that demonstrates this capability. The Istio [Bookinfo](https://istio.io/docs/examples/bookinfo/) shows similar functionality, but there is one significant difference: The Bookinfo application routes traffic to services that are not accessed from Istio Ingress. Our sample demonstrates how to route traffic from Istio Ingress to different versions of the “Web API” service (which implements the backend for frontend pattern). The API is invoked from a web application.

![image](/assets/img/2019/03/istio-traffic-architecture.png)

Get the [code](https://github.com/nheidloff/cloud-native-starter) from GitHub.

[Harald](https://haralduebele.blog/2019/03/11/managing-microservices-traffic-with-istio/) describes in his blog in detail how exactly Ingress needs to be configured. In summary a Gateway and a VirtualService need to be defined.

```
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: default-gateway-ingress-http
spec:
  selector:
    istio: ingressgateway # use Istio default gateway implementation
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
```

In the VirtualService the traffic is split 80% / 20% between version 1 and 2.

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: virtualservice-ingress-web-api--web-app
spec:
  hosts:
  - "*"
  gateways:
  - default-gateway-ingress-http
  http:
  - match:
    - uri:
        prefix: /web-api/v1/getmultiple 
    route:
      - destination:
          host: web-api
          subset: v1
        weight: 80
      - destination:
          host: web-api
          subset: v2
        weight: 20    
```

In order to demonstrate this feature, I’ve implemented a Vue.js application. When refreshed it shows either five articles (version 1) or ten articles (version 2):

![image](/assets/img/2019/03/istio-traffic-management.gif)

The [Kiali](https://www.kiali.io/) dashboard displays how the traffic is routed:

![image](/assets/img/2019/03/istio-traffic-management-2.png)

In order to try this out yourself on Minikube, install the necessary [prerequisites](https://github.com/nheidloff/cloud-native-starter#deployment) and run these commands:

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ cd cloud-native-starter
$ scripts/check-prerequisites.sh
$ scripts/deploy-articles-java-jee.sh
$ scripts/deploy-web-api-java-jee.sh
$ scripts/deploy-authors-nodejs.sh
$ scripts/deploy-web-app-vuejs.sh
$ scripts/deploy-istio-ingress-v1.sh
$ scripts/show-urls.sh
```

After this only version 1 of the Web API service is used, which means that always five articles are displayed in the web application.

In order to deploy version 2 which displays ten articles and to split the traffic, run these commands:

```
$ scripts/deploy-web-api-java-jee-v2.sh
$ scripts/deploy-istio-ingress-v1-v2.sh
```

Open the web application on port 31380, for example http://192.168.99.100:31380 (replace the IP address with “minikube ip”).

Get the [code](https://github.com/nheidloff/cloud-native-starter) from GitHub to try out the sample.