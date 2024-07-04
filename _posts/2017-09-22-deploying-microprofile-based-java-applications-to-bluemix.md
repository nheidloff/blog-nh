---
id: 2548
title: 'Deploying MicroProfile based Java Applications to Bluemix'
date: '2017-09-22T13:50:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2548'
permalink: /article/microprofile-bluemix-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/microprofile-bluemix-kubernetes/
dsq_thread_id:
    - '6162540258'
categories:
    - Articles
---

Eclipse [MicroProfile](http://microprofile.io/) is an open source project to optimize Enterprise Java for microservices architectures. MicroProfile based applications can be deployed to Kubernetes. This article describes how to build microservices via the Microservice Builder and how to deploy them to Bluemix.

The [Microservice Builder](https://developer.ibm.com/microservice-builder/) provides functionality to easily create new Java based microservices. Below is a quick walkthrough how to create new microservices, how to run them locally and how to deploy them to Kubernetes on Bluemix public. You can find more information on the Microservice Builder [landing page](https://developer.ibm.com/microservice-builder/).

To create a new project install the Bluemix CLI and run these commands:

```
bx plugin install -r bluemix dev
bx dev create
```

![image](/assets/img/2017/09/microprofile-wizard2.png)

After this you can change the starter template with your IDE of choice. Here is a [sample project](https://github.com/nheidloff/microprofile) that contains the generated code.

![image](/assets/img/2017/09/microprofile-wizard1.png)

In order to run the microservice locally (http://localhost:9080) run these commands.

```
bx dev build
bx dev run
```

Before deploying the microservice to Bluemix, you need to login with the CLI:

```
bx login -a https://api.ng.bluemix.net
bx target --cf
bx cs init
bx cs cluster-config mycluster
set environment variable: export KUBECONFIG=...
bx cr login
```

You also need to change the image name in the generated [Kubernetes yml file](https://github.com/nheidloff/microprofile/blob/master/manifests/kube.deploy.yml#L35) to include the Bluemix DNS name and your namespace, e.g. “registry.ng.bluemix.net/nheidloff/microprofile:latest”.

```
apiVersion: extensions/v1beta1
kind: Deployment
...
         containers:
         - name: microprofile
           image: registry.ng.bluemix.net/nheidloff/microprofile:latest
```

Before deploying the service to Kubernetes, the image needs to be tagged and pushed.

```
docker tag microprofile registry.ng.bluemix.net/nheidloff/microprofile
docker push registry.ng.bluemix.net/nheidloff/microprofile
kubectl create -f manifests
```

To find out the IP address and port run these commands:

```
bx cs workers mycluster
kubectl get svc microprofile-service
```