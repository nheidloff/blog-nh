---
id: 5043
title: 'Exporting Metrics from Kubernetes Apps for Prometheus'
date: '2022-04-13T05:45:48+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5043'
permalink: /article/exporting-metrics-kubernetes-applications-prometheus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/exporting-metrics-kubernetes-applications-prometheus/
categories:
    - Articles
---

*Operators automate day 2 operations for Kubernetes based software. Operators need to know the state of their operands. One way to find out the state is to check metrics information stored in Prometheus. This article describes how to export metrics from applications running on Kubernetes to make them accessible by Prometheus.*

The complete source code from this article is available in the [ibm/operator-sample-go](https://github.com/IBM/operator-sample-go) repo. The repo includes operator samples that demonstrate patterns and best practises.

Let’s look how Prometheus can be deployed on Kubernetes and how Go and Java based applications can export metrics so that Prometheus is able to read and store it.

**1. Setup of Prometheus**

An easy way to install Prometheus is to utilize the [Prometheus operator](https://operatorhub.io/operator/prometheus). Before it can be installed, the Operator Lifecycle Manager (OLM) needs to be deployed. When you develop operators with the [Operator SDK](https://sdk.operatorframework.io/), it is possible to deploy OLM with just one command:

```
$ operator-sdk olm install
or
$ curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.20.0/install.sh | bash -s v0.20.0
```

Next the Prometheus operator can be installed.

```
$ kubectl create -f https://operatorhub.io/install/prometheus.yaml
```

**2. Configuration of Prometheus**

To set up the actual Prometheus instance on Kubernetes, RBAC access rights need to be defined. Read the [documentation](https://book.kubebuilder.io/reference/metrics.html) for details. In summary the following four files handle the minimal setup.

- [service-account.yaml](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/prometheus/prometheus/service-account.yaml)
- [cluster-role.yaml](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/prometheus/prometheus/cluster-role.yaml)
- [cluster-role-binding.yaml](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/prometheus/prometheus/cluster-role-binding.yaml)
- [prometheus.yaml](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/prometheus/prometheus/prometheus.yaml)

**3. Linkage between Prometheus and custom Applications**

Applications can export data in the format Prometheus expects. The applications don’t push this data, but they provide endpoints that Prometheus pulls on a scheduled basis. To tell Prometheus these endpoints, the custom resource ‘ServiceMonitor’ is used.

Here is a simple [sample](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/simple-microservice/kubernetes/service-monitor.yaml). The trick is the correct usage of labels and selectors. The selector in the service monitor finds the appropriate service. The selector in the service links to pods.

```
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  labels:
    app: myapplication
  name: myapplication-metrics-monitor
  namespace: application-beta
spec:
  endpoints:
    - path: /q/metrics
  selector:
    matchLabels:
      app: myapplication
```

When building operators with the Operator SDK, the SDK creates this [service monitor](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/operator-application/config/prometheus/monitor.yaml) automatically. All you need to do is to [uncomment one line](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/operator-application/config/default/kustomization.yaml#L24-L25).

**4. Writing Metrics**

There are several libraries and frameworks for different languages available. Here is a [sample](https://github.com/IBM/operator-sample-go/blob/2a00d28cd40bf0c877589feb3fc636a7fa1e69f9/operator-application/controllers/application/controller.go#L23-L33) how to write metrics from a Golang application.

```
import (
  "github.com/prometheus/client_golang/prometheus"
)
var countReconcileLaunched = prometheus.NewCounter(
  prometheus.CounterOpts{
    Name: "reconcile_launched_total",
    Help: "reconcile_launched_total",
  },
)
func (reconciler *ApplicationReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
  countReconcileLaunched.Inc()
  ...
```

To learn more about operator patterns and best practices, check out the repo [operator-sample-go](https://github.com/IBM/operator-sample-go). The repo shows how to export metrics from a Quarkus application and a Go based operator. The screenshot shows the two registered service monitors.

![image](/assets/img/2022/04/Screenshot-2022-04-12-at-17.53.07.png)

Finally the data can be queried, for example in the Prometheus user interface.

![image](/assets/img/2022/04/Screenshot-2022-04-12-at-17.52.02.png)