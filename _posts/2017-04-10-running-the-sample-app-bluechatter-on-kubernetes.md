---
id: 2234
title: 'Running the Sample App BlueChatter on Kubernetes'
date: '2017-04-10T14:56:04+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2234'
permalink: /article/bluemix-kubernetes-docker-sample/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/bluemix-kubernetes-docker-sample/
categories:
    - Articles
---

Since last month Bluemix supports [Kubernetes](https://kubernetes.io/) (beta) which many people consider the de-facto standard for orchestrations of containers. Some of the older and simpler Bluemix sample applications use docker-compose. Below is a description how to run those examples on Kubernetes.

Essentially the docker-compose file needs to be converted to a Kubernetes yaml file. As example I use the chat application [BlueChatter](https://github.com/IBM-Bluemix/bluechatter). The sample is a Node.js application that leverages Redis to store session data. The file [docker-compose.yml](https://github.com/IBM-Bluemix/bluechatter/blob/master/docker-compose.yml) defines the two containers, the ports and links.

In order to create the Kubernetes configuration file I’ve tried an open source project ‘[Kompose (Kubernetes + Compose)](https://github.com/kubernetes-incubator/kompose)‘. When you run it, four files are created, two for the deployments and two for the services. For a quick introduction to these terms watch this [video]({{ "/article/kubernetes-docker-bluemix" | relative_url }}). I’ve merged everything into one file.

There were only two things I had to change in the file manually.  
1\) I had to enter the name of my Docker image, e.g. ‘registry.ng.bluemix.net/nheidloff/bluechatter\_web’  
2\) In order to expose the web application via a public IP address, I defined a public port for the ‘web’ service via [NodePort](https://console.ng.bluemix.net/docs/containers/cs_apps.html#cs_apps_public)

Here is a screenshot of the Kubernetes dashboard.

![kube-bluechatter](/assets/img/2017/04/kube-bluechatter.png)

Here is the Kubernetes file ‘bluechatter.yaml’.

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:  
  name: redis
spec:
  replicas: 1  
  template:
    metadata:      
      labels:
        bluechatter: redis
    spec:
      containers:
      - image: redis
        name: redis        
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:  
  labels:
    bluechatter: redis
  name: redis
spec:
  clusterIP: None
  ports:
  - name: headless
    port: 55555
    targetPort: 0
  selector:
    bluechatter: redis
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:  
  name: web
spec:
  replicas: 1
  template:
    metadata:
      labels:
        bluechatter: web
    spec:
      containers:
      - name: web
        image: registry.ng.bluemix.net/nheidloff/bluechatter_web
        ports:
        - containerPort: 80
        - containerPort: 8080
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  labels:
    bluechatter: web
  name: web
spec:
  type: NodePort
  ports:
  - name: "80"
    port: 80
    nodePort: 30072  
  selector:
    bluechatter: web
```

Run these [commands](https://console.ng.bluemix.net/docs/containers/cs_cluster.html#cs_cluster_cli) to create and configure a cluster.

```
$ bx cs cluster-create --name my_cluster
$ bx cs workers my_cluster # wait and repeat until state is 'deployed'
$ bx cs cluster-config my_cluster # copy and paste the 'export ...' line
```

Run these commands to build the containers of the [sample](https://github.com/IBM-Bluemix/bluechatter#2-docker-deployment-approach).

```
$ git clone https://github.com/IBM-Bluemix/bluechatter.git
$ cd bluechatter
$ docker-compose build
$ docker tag bluechatter_web registry.ng.bluemix.net/nheidloff/bluechatter_web
$ docker push registry.ng.bluemix.net/nheidloff/bluechatter_web
```

Run these commands to deploy the sample application.

```
$ kubectl create -f bluechatter.yaml
$ bx cs workers my_cluster # to get the public IP
$ kubectl describe service web # to get the port (NodePort)
```