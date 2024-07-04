---
id: 2553
title: 'Deploying Apps to Kubernetes on the IBM Cloud with Helm'
date: '2017-09-26T08:46:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2553'
permalink: /article/kubernetes-helm-ibm-cloud/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/kubernetes-helm-ibm-cloud/
categories:
    - Articles
---

[Helm](https://github.com/kubernetes/helm) is the package manager for Kubernetes. With Helm you can very easily deploy applications, tools and databases like MongoDB, PostgreSQL, WordPress and Apache Spark into your own Kubernetes clusters. Below is a brief description how to use Helm for the IBM Cloud Container service.

Here is a short description of Helm and Helm Charts from the [Helm](https://helm.sh/) home page:

“Helm helps you manage Kubernetes applications. Helm Charts helps you define, install, and upgrade even the most complex Kubernetes application. Charts are easy to create, version, share, and publish, so start using Helm and stop the copy-and-paste madness. The latest version of Helm is maintained by the [CNCF](https://www.cncf.io/).”

In the easiest way you can install applications by invoking commands like ‘helm install stable/mongodb’. You can also configure applications before installing them via yaml configuration files.

The Kubernetes community provides a curated catalog of [stable Helm Charts](https://github.com/kubernetes/charts/tree/master/stable). Additionally IBM provides [charts](https://github.com/IBM/charts/tree/master/stable) for Db2, MQ and more.

Below is a quick example for how to deploy [MongoDB](https://github.com/kubernetes/charts/tree/master/stable/mongodb) to Kubernetes on the IBM Cloud.

First you need to configure the Bluemix CLI to work against your Kubernetes cluster and you need to [install Helm](https://docs.helm.sh/using_helm/#quickstart-guide) on your development machine.

```
bx login -a https://api.ng.bluemix.net
bx target --cf
bx cs init
bx cs cluster-config mycluster
set environment variable: export KUBECONFIG=...
bx cr login
helm init
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
```

Next you can install Kubernetes applications with the following command:

```
helm install --name my-tag stable/mongodb
```

If you want to delete everything later, run ‘helm delete my-tag’.

To find out the IP address and port run these commands:

```
bx cs workers mycluster
kubectl get svc
kubectl get svc my-service
```

If you have a paid account, this is all you have to do.

The free account does not support [persistent volumes](https://console.bluemix.net/docs/containers/cs_planning.html#cs_planning_apps_storage). As workaround (not for production) you can use disk space on worker nodes. Run ‘kubectl create -f config.yaml’ with the following content in config.yaml for MongoDB.

```
kind: PersistentVolume
apiVersion: v1
metadata:
  name: mongo-simple-mongodb
  namespace: default  
spec:  
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/tmp/data"
```

After this you can see everything working on the Kubernetes dashboard (‘kubectl proxy’).

![image](/assets/img/2017/09/helm-mongo.png)