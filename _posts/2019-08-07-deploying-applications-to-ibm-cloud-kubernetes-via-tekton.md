---
id: 3794
title: 'Deploying Applications to IBM Cloud Kubernetes via Tekton'
date: '2019-08-07T09:30:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3794'
permalink: /article/ibm-cloud-kubernetes-tekton/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ibm-cloud-kubernetes-tekton/
categories:
    - Articles
---

This article describes Tekton, an open-source framework for creating CI/CD systems, and explains how to deploy and use it on the IBM Cloud Kubernetes service.

**What is Tekton?**

Kubernetes is the de-facto standard for running cloud-native applications. While Kubernetes is very flexible and powerful, deploying applications is sometimes challenging for developers. That’s why several platforms and tools have evolved that aim to make deployments of applications easier, for example Cloud Foundry’s ‘cf push’ experience, OpenShift’s source to image (S2I), various Maven plugins and different CI/CD systems.

Similarly as Kubernetes has evolved to be the standard for running containers and similarly as Knative is evolving to become the standard for serverless platforms, the goal of Tekton is to become the standard for continuous integration and delivery (CI/CD) platforms.

Here is the definition from the project’s [home page](https://cloud.google.com/tekton/):

> Tekton is a powerful yet flexible Kubernetes-native open-source framework for creating CI/CD systems. It lets you build, test, and deploy across multiple cloud providers or on-premises systems by abstracting away the underlying implementation details.

As described in this intro [video](https://www.youtube.com/watch?v=TQJ_pdTxZr0&feature=youtu.be&t=274), Tekton is a shared set of open source building blocks that are composable, declarative and reproducible CI/CD systems.

The biggest companies that are engaged in this project are at this point Google, CloudBees, IBM and Red Hat. Because of its importance the project has been split from Knative which is focussed on scale to zero capabilities.

**Deploying a Sample Application to IBM Cloud Kubernetes**

The first thing you should get familiar with to use Tekton is its terminology and component model. Check out the [documentation](https://github.com/tektoncd/pipeline/blob/master/docs/README.md) to understand what tasks, steps, pipelines, etc. are.

My colleague Gregory Dritschler has written a tutorial [Deploy a Knative application using Tekton Pipelines](https://developer.ibm.com/tutorials/knative-build-app-development-with-tekton/). The same principles apply also for other (non Knative) containers.

I don’t want to repeat Gregory’s tutorial here, but outline some points that took me some time to understand. Here are the steps to deploy a simple hello world sample on the [IBM Cloud Kubernetes](https://www.ibm.com/cloud/container-service) service.

First get an [IBM lite account](http://ibm.biz/nheidloff). It’s free and there is no time restriction. In order to use the Kubernetes service you need to enter your credit card information, but there is a free Kubernetes cluster.

Next you need to install some prerequisites as described in the tutorial. Note that in order to run the tutorial with a lite account, you need to install Knative manually since the Knative add on currently doesn’t work.

Then run these commands to login and create two tasks, one pipeline and a resource pointing to your source:

```
$ ibmcloud login -a cloud.ibm.com -r us-south -g default
$ ibmcloud ks cluster-config --cluster niklas-heidloff-4
$ export <output-from-previous-command>
$ git clone https://github.com/IBM/tekton-tutorial
$ cd tekton-tutorial
$ kubectl apply -f tekton/tasks/source-to-image.yaml
$ kubectl apply -f tekton/tasks/deploy-using-kubectl.yaml
$ kubectl apply -f tekton/pipeline/build-and-deploy-pipeline.yaml
$ kubectl apply -f tekton/resources/picalc-git.yaml
```

Next a secret and a pipeline account needs to be created to access your image registry on the IBM Cloud from Tekton:

```
$ ibmcloud iam api-key-create tekton -d "tekton" --file tekton.json
$ cat tekton.json | grep apikey 
$ kubectl create secret generic ibm-cr-push-secret --type="kubernetes.io/basic-auth" --from-literal=username=iamapikey --from-literal=password=<your-apikey>
$ kubectl annotate secret ibm-cr-push-secret tekton.dev/docker-0=us.icr.io
$ kubectl apply -f tekton/pipeline-account.yaml
```

Before the pipeline can be run, your registry’s DNS name and your namespace need to be defined in ‘tekton/run/picalc-pipeline-run.yaml’. Here is how you find this information:

```
$ ibmcloud cr region
$ ibmcloud cr namespace-list
```

After you’ve defined this information in ‘picalc-pipeline-run.yaml’, the pipeline can be run:

```
$ kubectl create -f tekton/run/picalc-pipeline-run.yaml
$ kubectl describe pipelinerun picalc-pr-<output-from-previous-command>
$ kubectl get ksvc picalc
$ curl http://picalc-default.<...>.us-south.containers.appdomain.cloud?iterations=20000000
```

**Using the Tekton Dashboard**

In addition to [Tekton Pipelines](https://github.com/tektoncd/pipeline) there is another project [Tekton Dashboard](https://github.com/tektoncd/dashboard) to visualize the definitions and output of pipelines.

In order to run it on the IBM Cloud, clone the repo:

```
$ git clone https://github.com/tektoncd/dashboard.git
$ cd dashboard
```

Before you can install it, one file needs to be changed. Since the lite account doesn’t provide Ingress capabilities, you need to define to use NodePort for the dashboard service.

In order to do this, add “type: NodePort” in line 145 in ‘config/release/gcr-tekton-dashboard.yaml’:

```
kind: Service
apiVersion: v1
metadata:
  name: tekton-dashboard
  namespace: tekton-pipelines
  labels:
    app: tekton-dashboard
spec:
  ports:
    - name: http
      protocol: TCP
      port: 9097
      targetPort: 9097
  type: NodePort
  selector:
    app: tekton-dashboard
```

After this run these commands to install and open the dashboard:

```
$ kubectl apply -f config/release/gcr-tekton-dashboard.yaml
$ CLUSTER_NAME=<your-cluster-name>
$ clusterip=$(ibmcloud ks workers --cluster $CLUSTER_NAME | awk '/Ready/ {print $2;exit;}')
$ nodeport=$(kubectl get svc tekton-dashboard -n tekton-pipelines --ignore-not-found --output 'jsonpath={.spec.ports[*].nodePort}')
$ open http://$clusterip:$nodeport
```

This screenshot shows the results of the pipeline runs:

![image](/assets/img/2019/08/tekton-pipeline-runs.png)

This screenshot shows the results of the task runs:

![image](/assets/img/2019/08/tekton-task-runs.png)