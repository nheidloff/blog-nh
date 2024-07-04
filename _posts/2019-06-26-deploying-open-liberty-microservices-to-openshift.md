---
id: 3700
title: 'Deploying Open Liberty Microservices to OpenShift'
date: '2019-06-26T07:12:42+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3700'
permalink: /article/deploying-open-liberty-microservices-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-open-liberty-microservices-openshift/
categories:
    - Articles
---

[OKD](https://www.okd.io/), the open source upstream Kubernetes distribution embedded in OpenShift, provides several ways to make deployments of applications to Kubernetes for developers easy.

**Source to Image**

Previously I [blogged]({{ "/article/source-to-image-builder-open-liberty-openshift/" | relative_url }}) about how to use Source-to-Image (S2I) to deploy local [Open Liberty](https://openliberty.io/) applications with two simple commands:

```
$ oc new-app s2i-open-liberty:latest~/. --name=<service-name>
$ oc start-build --from-dir . <service-name>
```

The nice thing about this approach is, that you don’t need to define and build Docker images. However in some cases you need more flexibility, for example when extra drivers and files are needed in the image. Fortunately in these cases you can also use your own Dockerfiles.

**Options to deploy Microservices with Dockerfiles**

The following three options show how to deploy Open Liberty microservices to Minishift. I’ve [open sourced](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee) a very simple microservice which uses Java/[Jakarta EE](https://jakarta.ee/) and [MicroProfile](https://microprofile.io/). Read my previous blog [How to build and run a Hello World Java Microservice]({{ "/article/how-to-build-and-run-a-hello-world-java-microservice/" | relative_url }}) to find out more about the implementation and how to deploy the microservice to Minikube and the [IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service).

[Get the code from GitHub.](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee)

**Deploy via kubectl**

This option is very similar to deployments of microservices to Kubernetes clusters like Minikube and the IBM Cloud Kubernetes Service.

Build and push image:

```
$ cd ${ROOT_FOLDER}/authors-java-jee
$ mvn package
$ eval $(minishift docker-env)
$ oc login -u developer -p developer
$ oc new-project cloud-native-starter
$ docker login -u developer -p $(oc whoami -t) $(minishift openshift registry)
$ docker build -f DockerfileNoBuild -t authors:kubectl .
$ docker tag authors:kubectl $(minishift openshift registry)/cloud-native-starter/authors:kubectl
$ docker push $(minishift openshift registry)/cloud-native-starter/authors:kubectl
$ oc get istag
```

Deploy microservice:

```
$ cd ${ROOT_FOLDER}/authors-java-jee/deployment
$ sed "s+<namespace>+cloud-native-starter+g" deployment-template.yaml > deployment-template.yaml.1
$ minishiftregistryip=$(minishift openshift registry)
$ sed "s+<ip:port>+$minishiftregistryip+g" deployment-template.yaml.1 > deployment-template.yaml.2
$ sed "s+<tag>+kubectl+g" deployment-template.yaml.2 > deployment-minishift.yaml
$ kubectl apply -f deployment-minishift.yaml
$ kubectl apply -f service.yaml
$ oc expose svc/authors
$ curl -X GET "http://authors-cloud-native-starter.$(minishift ip).nip.io/api/v1/getauthor?name=Niklas%20Heidloff" -H "accept: application/json"
$ open http://authors-cloud-native-starter.$(minishift ip).nip.io/openapi/ui/
$ open https://$(minishift ip):8443
```

**Deploy via Git Repos with Dockerfiles**

Rather than building the image locally and deploying the microservice via kubectl and yaml files, Minishift can download the code from a Git repository and build and deploy the microservices:

```
$ oc login -u developer -p developer
$ oc new-project server-side-build
$ oc new-app https://github.com/nheidloff/cloud-native-starter --context-dir=authors-java-jee
$ oc expose svc/server-side-build
$ curl -X GET "http://cloud-native-starter-server-side-build.$(minishift ip).nip.io/api/v1/getauthor?name=Niklas%20Heidloff" -H "accept: application/json"
```

**Deploy as Binary Build**

With this [deployment method](https://docs.okd.io/3.11/dev_guide/dev_tutorials/binary_builds.html), the code is pushed to Minishift (similarly to ‘cf push’).

```
$ cd ${ROOT_FOLDER}/authors-java-jee
$ oc login -u developer -p developer
$ oc new-project binary-build
$ oc new-build --name authors --binary --strategy docker
$ oc start-build authors --from-dir=.
$ oc new-app authors
$ oc expose svc/authors
$ curl -X GET "http://authors-binary-build.$(minishift ip).nip.io/api/v1/getauthor?name=Niklas%20Heidloff" -H "accept: application/json"
```

After the microservice has been deployed, it shows up in the Minishift console.

![image](/assets/img/2019/06/overview.png)

If you want to try out these options yourself, get the sample code and follow these [instructions](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee).