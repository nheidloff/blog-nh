---
id: 3659
title: 'How to build and run a Hello World Java Microservice'
date: '2019-06-17T14:02:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3659'
permalink: /article/how-to-build-and-run-a-hello-world-java-microservice/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-build-and-run-a-hello-world-java-microservice/
categories:
    - Articles
    - Java
tags:
    - java
---

The repo [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) contains an end-to-end sample application that demonstrates how to develop your first cloud-native applications. Two of the microservices have been developed with Java EE and MicroProfile. To simplify the creation of new Java EE microservices, I’ve added another very simple service that can be used as template for new services.

[Get the code.](https://github.com/nheidloff/cloud-native-starter/tree/master/authors-java-jee)

The template contains the following functionality:

- Image with OpenJ9, OpenJDK, Open Liberty and MicroProfile: [Dockerfile](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/Dockerfile)
- Maven project: [pom.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/pom.xml)
- Open Liberty server configuration: [server.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/liberty/server.xml)
- Health endpoint: [HealthEndpoint.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/HealthEndpoint.java)
- Kubernetes yaml files: [deployment.yaml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/deployment/deployment.yaml) and [service.yaml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/deployment/service.yaml)
- Sample REST GET endpoint: [AuthorsApplication.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/AuthorsApplication.java), [GetAuthor.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/GetAuthor.java) and [Author.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/Author.java)

If you want to use this code for your own microservice, remove the three Java files for the REST GET endpoint and rename the service in the pom.xml file and the yaml files.

The microservice can be run in different environments:

- Docker
- Minikube
- IBM Cloud Kubernetes Service

In all cases get the code first:

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ cd cloud-native-starter
$ ROOT_FOLDER=$(pwd)
```

**Run in Docker**

The microservice can be run in [Docker Desktop](https://docs.docker.com/install/).

```
$ cd ${ROOT_FOLDER}/authors-java-jee
$ mvn package
$ docker build -t authors .
$ docker run -i --rm -p 3000:3000 authors
$ open http://localhost:3000/openapi/ui/
```

**Run in Minikube**

These are the instructions to run the microservice in [Minikube](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/SetupLocalEnvironment.md#minikube).

```
$ cd ${ROOT_FOLDER}/authors-java-jee
$ mvn package
$ eval $(minikube docker-env)
$ docker build -t authors:1 .
$ kubectl apply -f deployment/deployment.yaml
$ kubectl apply -f deployment/service.yaml
$ minikubeip=$(minikube ip)
$ nodeport=$(kubectl get svc authors --ignore-not-found --output 'jsonpath={.spec.ports[*].nodePort}')
$ open http://${minikubeip}:${nodeport}/openapi/ui/
```

**Run in IBM Cloud Kubernetes Service**

IBM provides the managed [IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service). You can get a free [IBM Cloud account](http://ibm.biz/nheidloff). Check out the [instructions](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/IKSDeployment.md) for how to create a Kubernetes cluster.

Set your namespace and cluster name, for example:

```
$ REGISTRY_NAMESPACE=niklas-heidloff-cns
$ CLUSTER_NAME=niklas-heidloff-free
```

Build the image:

```
$ cd ${ROOT_FOLDER}/authors-java-jee
$ ibmcloud login -a cloud.ibm.com -r us-south -g default
$ ibmcloud ks cluster-config --cluster $CLUSTER_NAME
$ export ... // for example: export KUBECONFIG=/Users/$USER/.bluemix/plugins/container-service/clusters/niklas-heidloff-free/kube-config-hou02-niklas-heidloff-free.yml
$ mvn package
$ REGISTRY=$(ibmcloud cr info | awk '/Container Registry  /  {print $3}')
$ ibmcloud cr namespace-add $REGISTRY_NAMESPACE
$ ibmcloud cr build --tag $REGISTRY/$REGISTRY_NAMESPACE/authors:1 .
```

Deploy microservice:

```
$ cd ${ROOT_FOLDER}/authors-java-jee/deployment
$ sed "s+<namespace>+$REGISTRY_NAMESPACE+g" deployment-template.yaml > deployment-template.yaml.1
$ sed "s+<ip:port>+$REGISTRY+g" deployment-template.yaml.1 > deployment-template.yaml.2
$ sed "s+<tag>+1+g" deployment-template.yaml.2 > deployment-iks.yaml
$ kubectl apply -f deployment-iks.yaml
$ kubectl apply -f service.yaml
$ clusterip=$(ibmcloud ks workers --cluster $CLUSTER_NAME | awk '/Ready/ {print $2;exit;}')
$ nodeport=$(kubectl get svc authors --output 'jsonpath={.spec.ports[*].nodePort}')
$ open http://${clusterip}:${nodeport}/openapi/ui/
$ curl -X GET "http://${clusterip}:${nodeport}/api/v1/getauthor?name=Niklas%20Heidloff" -H "accept: application/json"
```

**Swagger UI**

Once deployed the Swagger UI can be opened which shows the APIs of the authors service:

![image](/assets/img/2019/06/Screen-Shot-2019-06-17-at-3.53.40-PM.png)