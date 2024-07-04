---
id: 2223
title: 'Orchestrating Docker Containers with Kubernetes'
date: '2017-04-07T13:37:15+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2223'
permalink: /article/kubernetes-docker-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/kubernetes-docker-bluemix/
categories:
    - Articles
---

Last month IBM [announced](https://www.ibm.com/blogs/bluemix/2017/03/kubernetes-now-available-ibm-bluemix-container-service/) the beta of [Kubernetes](https://kubernetes.io/) support in the [IBM Bluemix Container Service](https://console.ng.bluemix.net/docs/containers/cs_ov.html). Below is a short introduction to Kubernetes and a short description how to get started using Kubernetes on IBM Bluemix.

In a nutshell Kubernetes allows running and managing cloud native apps that consist of multiple containers. To get started you need to know some terminology. For example a ‘Deployment’ contains ‘Pods’ that can contain multiple Docker containers (but typically contain one container). ‘Deployments’ are run in ‘Worker nodes’ that are part of a ‘Cluster’. ‘Services’ define how deployments can be accessed. I like the following video which explains this terminology well.

{% include embed/youtube.html id='4ht22ReBjno' %}

To start using Kubernetes on Bluemix you should follow this three parts [tutorial](https://console.ng.bluemix.net/docs/containers/cs_tutorials.html#cs_tutorials).

Part 2 shows how to run multiple replicas of pods and how to scale them up and down. The screenshot shows the Kubernetes web interface that displays the status of the three replicas/pods. The sample also explains how Kubernetes can do [health checks](https://github.com/IBM/container-service-getting-started-wt/blob/master/Stage2/app.js). If Kubernetes detects an issue with a pod it stops it and and creates a new one automatically.

![kub2](/assets/img/2017/04/kub2.png)

Part 3 of the tutorial shows how to use a Bluemix service from a container running in Kubernetes. After you’ve created an instance of a Bluemix service, you can [bind it to the Kubernetes cluster](https://console.ng.bluemix.net/docs/containers/cs_cluster.html#cs_cluster_services). In the configuration yml file the service credentials are [mounted to a volume](https://github.com/IBM/container-service-getting-started-wt/blob/master/Stage3/watson-deployment.yml#L17-L24). Containers can [read](https://github.com/IBM/container-service-getting-started-wt/blob/master/Stage3/watson/app.js#L8-L12) these from there at runtime.

Containers can access other containers simply via the container’s (service’s) DNS name.

```
app.get('/analyze/:string', function(req, res) {
   request.get({ url: "http://watson-service:8081/analyze?text=" + req.params.string },
      function(error, response, body) {
         ...
     });
```

This is how to define a service, in this case the ‘watson-service’.

```
apiVersion: v1
kind: Service
metadata:
  name: watson-service
  labels:
    run: watson-demo
spec:
  type: NodePort
  selector:
    run: watson-demo
  ports:
   - protocol: TCP
     port: 8081
     nodePort: 30081
```