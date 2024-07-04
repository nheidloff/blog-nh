---
id: 3104
title: 'Installing Knative on the IBM Cloud'
date: '2018-09-20T13:50:28+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3104'
permalink: /article/knative-ibm-cloud-kubernetes-installation/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6922785239'
custom_permalink:
    - article/knative-ibm-cloud-kubernetes-installation/
categories:
    - Articles
---

I finally found some time to start playing with Knative. It took me a few hours to get a simple sample running. Below I describe some pitfalls when installing Knative and tips how to avoid them. With the official instructions and these tips it shouldn’t take longer than half an hour to run your first container on Knative.

[Knative](https://github.com/knative/docs) is a very promising technology running on Kubernetes and Istio. Earlier this year I blogged and spoke about the topic [When to use Serverless? When to use Kubernetes?]({{ "/article/when-to-use-serverless-kubernetes" | relative_url }}). When Knative was announced in July, Jason McGee (IBM Fellow, IBM Cloud) [wrote](https://www.ibm.com/blogs/cloud-computing/2018/07/24/ibm-cloud-google-knative-serverless/): “Today \[…\] we are one step closer to ending the serverless versus containers debate among developers.” That’s what immediately caught my attention.

I won’t repeat Jason’s blog here, but in summary Knative allows running containers on Kubernetes only when they get requests. When they are not used anymore, they are terminated and make room for other workloads. So with Knative containers can scale from 0-N, rather than only 1-N.

I also think it’s worth noting that similar to the [Istio](https://istio.io/) project, IBM is contributing to Knative and working closely together with Google.

This diagram shows how IBM Cloud Functions could potentially leverage Knative:

![image](/assets/img/2018/09/Knative-Architecture-FINAL.001-1024x576.jpeg)

Now to the installation tips. There are two documents that describe how to set up Knative and how to run a first simple sample:

- [Knative Install on IBM Cloud Kubernetes Service](https://github.com/knative/docs/blob/master/install/Knative-with-IKS.md)
- [Getting Started with Knative App Deployment](https://github.com/knative/docs/blob/master/install/getting-started-knative-app.md)

Before following these steps, read through the following five points to save some time.

**Tip 1) kubectl**  
Update the kubectl CLI! This costed me a lot of time since I had installed the latest version with brew but forgot to link it.

**Tip 2) Kubernetes Version**  
When creating the Kubernetes cluster on the IBM Cloud, refer to the latest supported Kubernetes version 1.10.7, not 1.10.3 as the documentation says.

```
ibmcloud cs cluster-create --name=$CLUSTER_NAME \
  --zone=$CLUSTER_ZONE \
  --kube-version=1.10.7 \
  --machine-type=b2c.4x16 \
  --workers=3
```

**Tip 3) istio-statsd-prom-bridge Pod**  
After installing Istio, the documentation says all pods need to have the status RUNNING. However the pod istio-statsd-prom-bridge has the status CrashLoopBackOff. While this doesn’t seem to be critical to get Knative up and running, you can fix it as documented in this [issue](https://github.com/knative/serving/issues/1921#issuecomment-415921445).

One line in the yaml file needs to be replaced:  
Wrong: – ‘-statsd.mapping-config=/etc/statsd/mapping.conf’  
Right: – –statsd.mapping-config=/etc/statsd/mapping.conf

**Tip 4) Host URL**  
To find the host URL for your service, the documentation says the alias ksvc can be used. For me that didn’t even work with Knative 0.1.1.

Wrong: kubectl get ksvc helloworld-go –output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain  
Right: kubectl get services.serving.knative.dev helloworld-go –output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain

**Tip 5) IP Address**  
For some reason sometimes when I create new Kubernetes clusters on the IBM Cloud I don’t get public IP addresses immediately. You can check whether you have an IP address by invoking the following command. If EXTERNAL-IP is ‘pending’, you don’t have one yet.

```
$kubectl get svc knative-ingressgateway --namespace istio-system
```

If you don’t want to wait you can use the external IP of a worker node together with the NodePort of the knative-ingressgateway service. The documentation describes this, but reads the wrong IP from the worker node.

Wrong: kubectl get node –output ‘jsonpath={.items\[0\].status.addresses\[0\].address}’  
Right: kubectl get node –output ‘jsonpath={.items\[0\].status.addresses\[1\].address}’

After this you can invoke your container via commands like this one. The header is needed to define the name of your service.

```
$ curl -H "Host: helloworld-go.default.example.com" 169.62.129.173:32380
```