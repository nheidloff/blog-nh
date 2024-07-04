---
id: 3316
title: 'Setup of a Local Kubernetes and Istio Dev Environment'
date: '2019-03-04T15:35:33+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3316'
permalink: /article/setup-local-development-kubernetes-istio/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/setup-local-development-kubernetes-istio/
dsq_thread_id:
    - '7271046564'
categories:
    - Articles
---

As developer I like to do as much development as possible locally, because it’s generally easier and faster to develop and debug code. In order to build cloud-native applications and microservices, it’s very convenient to have a local [Kubernetes](https://kubernetes.io/) cluster and [Istio](https://istio.io/) running locally. This article describes how to install these components and some additional tools like [Kiali](https://www.kiali.io/).

**Minikube**

In order to run Kubernetes clusters locally, there are different alternatives. One is to use the Kubernetes functionality integrated in [Docker Desktop](https://blog.docker.com/2018/07/kubernetes-is-now-available-in-docker-desktop-stable-channel/). The alternative that I’ve chosen is [Minikube](https://kubernetes.io/docs/setup/minikube/) which runs a single-node Kubernetes cluster inside a VM on your development machine.

Follow the instructions to install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/). As hypervisor I’m using VirtualBox which is supported on Mac, Linux and Windows.

When running Istio and your own applications, you need more more memory and CPUs than you get by default. Here are my settings:

```
$ minikube config set cpus 4
$ minikube config set memory 8192
$ minikube config set disk-size 50g
$ minikube addons enable ingress 
$ minikube start
```

‘minikube start’ can take several minutes when starting it for the first time. Be patient.

Sometimes ‘minikube start’ doesn’t work for me. In that case I stop my VPN, invoke ‘minikube delete#, delete the ‘.minikube’ directory, restart my machine and start it again.

After this you can get the Minikube IP address and open the Kubernetes dashboard via these commands:

```
$ minikube ip
$ minikube dashboard
```

Minikube comes with it’s own Docker daemon, so that you don’t have to use Docker Desktop. You only need the ‘docker’ CLI and point it to Minikube:

```
$ eval $(minikube docker-env)
```

To stop the cluster run this command:

```
$ minikube stop
```

**Istio**

To download Istio, run this command:

```
$ curl -L https://git.io/getLatestIstio | sh -
```

Follow the instructions in the terminal to set the path.

To install Istio, run these commands:

```
$ cd istio-1.0.6
$ kubectl apply -f install/kubernetes/helm/istio/templates/crds.yaml
$ kubectl apply -f install/kubernetes/istio-demo.yaml
```

Make sure that all pods are running or completed before continuing. This can take several minutes when starting the pods for the first time. Be patient.

```
$ kubectl get pod -n istio-system
```

This screenshot shows all Istio pods running or completed (ignore the Kiali one for now).

![image](/assets/img/2019/03/setup-loca-id-kubernetes-1.png)

In the last step enable automatic sidecar injection:

```
$ kubectl label namespace default istio-injection=enabled
```

After the setup of Minikube and Istio you can use the following tools:

*Kubernetes Dashboard*

```
$ minikube dashboard
```

*Jaeger Dashboard*

```
$ kubectl port-forward -n istio-system $(kubectl get pod -n istio-system -l app=jaeger -o jsonpath='{.items[0].metadata.name}') 16686:16686
```

URL to Open Jaeger: http://localhost:16686

*Grafana Dashboard*

```
$ kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000 &
```

URL to open Grafana: http://localhost:3000/dashboard/db/istio-mesh-dashboard

*Prometheus Dashboard*

```
$ kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') 9090:9090 &
```

URL to open Prometheus: http://localhost:9090

**Kiali**

Run the following command to install Kiali:

```
$ bash <(curl -L http://git.io/getLatestKialiKubernetes)
```

Note: For some reason the script didn’t work for me. I had to replace one [line](https://github.com/kiali/kiali/blob/master/deploy/kubernetes/deploy-kiali-to-kubernetes.sh#L172):

```
get_downloader
github_api_url="https://api.github.com/repos/kiali/kiali/releases/latest"
kiali_version_we_want="v0.15.0"
```

To launch Kiali you need the IP address and NodePort:

```
$ minikube ip
$ kubectl get svc -n istio-system kiali --output 'jsonpath={.spec.ports[*].nodePort}'
```

URL to open Kiali: https://\[minikube-ip\]:\[kiali-nodeport\]/kiali

**Sample Application**

I’m working on a simple [sample application](https://github.com/nheidloff/cloud-native-starter) that shows some of the Istio and [MicroProfile](https://microprofile.io/) functionality to build cloud-native applications. I’ll blog more about this soon.

For now you can install two sample microservices from this project. Make sure Minikube runs and you have installed all necessary [prerequisites](https://github.com/nheidloff/cloud-native-starter/blob/master/scripts/check-prerequisites.sh#L13-L21):

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ scripts/check-prerequisites.sh
$ scripts/deploy-articles-java-jee.sh
$ scripts/deploy-web-api-java-jee.sh
```

The following screenshot shows a BFF (backend for frontend) ‘web-api’ microservice invoking another ‘articles’ webservice:

![image](/assets/img/2019/03/setup-loca-id-kubernetes-2.png)

Most of the information in this article I got from [Harald Uebele](https://haralduebele.blog/2019/02/22/install-istio-and-kiali-on-ibm-cloud-or-minikube/). Thanks Harald. I just added some details that I had to do differently.