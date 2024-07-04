---
id: 3711
title: 'How to develop Open Liberty Microservices on OpenShift'
date: '2019-07-04T09:23:03+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3711'
permalink: /article/how-to-develop-open-liberty-microservices-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/how-to-develop-open-liberty-microservices-openshift/
categories:
    - Articles
    - Java
tags:
    - java
---

[Open Liberty](https://openliberty.io/) is a flexible Java application server. It comes with [Eclipse MicroProfile](https://microprofile.io/) which is a set of tools and APIs to build microservices. With these technologies I have created a simple hello world microservice which can be used as template for your own microservices. In this article I describe how to deploy it to [OpenShift](https://www.openshift.com/).

The sample microservice is available as [open source](https://github.com/nheidloff/cloud-native-starter/tree/master/authors-java-jee).

**Microservice Implementation**

The microservice contains the following functionality:

- Image with OpenJ9, OpenJDK, Open Liberty and MicroProfile: [Dockerfile](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/Dockerfile)
- Maven project: [pom.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/pom.xml)
- Open Liberty server configuration: [server.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/liberty/server.xml)
- Health endpoint: [HealthEndpoint.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/HealthEndpoint.java)
- Kubernetes yaml files: [deployment.yaml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/deployment/deployment.yaml) and [service.yaml](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/deployment/service.yaml)
- Sample REST GET endpoint: [AuthorsApplication.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/AuthorsApplication.java), [GetAuthor.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/GetAuthor.java) and [Author.java](https://github.com/nheidloff/cloud-native-starter/blob/master/authors-java-jee/src/main/java/com/ibm/authors/Author.java)

If you want to use this code for your own microservice, remove the three Java files for the REST GET endpoint and rename the service in the pom.xml file and the yaml files.

**Deployment Options**

The microservice can be run in different environments:

- [Docker](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee#run-in-docker)
- [Minikube](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee#run-in-minikube)
- [IBM Cloud Kubernetes Service](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee#run-in-ibm-cloud-kubernetes-service)
- [Minishift](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee#run-in-minishift)
- Red Hat OpenShift on the IBM Cloud

**Deployment to Red Hat OpenShift on the IBM Cloud**

The following instructions should work for OpenShift, no matter where you run it. However I’ve only tested it on the IBM Cloud.

IBM provides a managed [Red Hat OpenShift offering on the IBM Cloud](https://cloud.ibm.com/docs/containers?topic=containers-openshift_tutorial) (beta). You can get a [free IBM Cloud Lite](https://ibm.biz/nheidloff) account.

After you’ve created a new cluster, open the OpenShift console. From the dropdown menu in the upper right of the page, click ‘Copy Login Command’. Paste the copied command in your local terminal, for example ‘oc login https://c1-e.us-east.containers.cloud.ibm.com:23967 –token=xxxxxx’.

Get the code:

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ cd cloud-native-starter
$ ROOT_FOLDER=$(pwd)
```

Push the code and build the image:

```
$ cd ${ROOT_FOLDER}/authors-java-jee
$ oc login ...
$ oc new-project cloud-native-starter
$ oc new-build --name authors --binary --strategy docker
$ oc start-build authors --from-dir=.
$ oc get istag
```

Wait until the image has been built. Then deploy the microservice:

```
$ cd ${ROOT_FOLDER}/authors-java-jee/deployment
$ sed "s+<namespace>+cloud-native-starter+g" deployment-template.yaml > deployment-template.yaml.1
$ sed "s+<ip:port>+docker-registry.default.svc:5000+g" deployment-template.yaml.1 > deployment-template.yaml.2
$ sed "s+<tag>+latest+g" deployment-template.yaml.2 > deployment-os.yaml
$ oc apply -f deployment-os.yaml
$ oc apply -f service.yaml
$ oc expose svc/authors
$ open http://$(oc get route authors -o jsonpath={.spec.host})/openapi/ui/
$ curl -X GET "http://$(oc get route authors -o jsonpath={.spec.host})/api/v1/getauthor?name=Niklas%20Heidloff" -H "accept: application/json"
```

Rather than using ‘oc apply’ (which is essentially ‘kubectl apply’), you can also use ‘oc new-app’. In this case you don’t have to create yaml files which makes it easier. At the same time you loose some flexibility and capabilities that kubectl with yaml files provides.

```
$ oc new-app authors
```

After this you’ll be able to open the API explorer and invoke the endpoint:

![image](/assets/img/2019/07/openshift-liberty1.png)

After the deployment the application will show up in the OpenShift Web Console:

![image](/assets/img/2019/07/openshift-liberty2.png)

Note that there are several other options to deploy applications to OpenShift/OKD. Check out my previous article [Deploying Open Liberty Microservices to OpenShift]({{ "/article/deploying-open-liberty-microservices-openshift/" | relative_url }}).

This sample is part of the GitHub repo [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter). Check it out to learn how to develop cloud-native applications with Java EE/Jakarta EE, Eclipse MicroProfile, Kubernetes and Istio and how to deploy these applications to Kubernetes, Minikube, OpenShift and Minishift.