---
id: 3306
title: 'Developing and debugging Microservices with Java'
date: '2019-02-18T11:31:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3306'
permalink: /article/debugging-microservices-java-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7240202089'
custom_permalink:
    - article/debugging-microservices-java-kubernetes/
categories:
    - Articles
---

[Kubernetes](https://kubernetes.io/) has become the de facto standard for deploying and managing containerized applications in public, private and hybrid cloud environments. While Kubernetes is really powerful, it’s not the easiest way for developers to deploy applications.

To make developers more productive, several technologies have emerged to make creations and deployments of applications on Kubernetes easier, for example [Cloud Foundry, which can be run on Kubernetes](https://haralduebele.blog/2019/01/27/stuttgart-kubernetes-meetup/), and [Knative](https://cloud.google.com/knative/).

Another technology is [Microclimate](https://microclimate-dev2ops.github.io/). Here is the description from the Microclimate home page:

> Microclimate is an end to end development environment that lets you rapidly create, edit, and deploy applications. Applications are run in containers from day one and can be delivered into production on Kubernetes through an automated DevOps pipeline using Jenkins.

In the easiest case developers can write microservices locally and push code via git which triggers pipelines that generate the images and run the containers. This works when running locally, it is supported for [IBM Cloud Private](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/) and with [scripts](https://github.com/nheidloff/ibm-cloud-starter-java-microservice-microprofile-javaee/tree/master/.bluemix/scripts) and Helm [charts](https://github.com/nheidloff/ibm-cloud-starter-java-microservice-microprofile-javaee/tree/master/chart/java2) microservices can be also deployed to other Kubernetes platforms like [IBM Cloud](https://www.ibm.com/cloud/).

Let’s take a closer look how to use Microclimate [locally](https://microclimate-dev2ops.github.io/installlocally#doc). Via the web application developers can create new projects in Java, Node.js, Python, Swift and Go.

![image](/assets/img/2019/02/microclimate-1.png)

For Java projects you can choose between MicroProfile/Java EE, Spring and Lagom. In my [example](https://github.com/nheidloff/ibm-cloud-starter-java-microservice-microprofile-javaee) I’ve used [MicroProfile](https://microprofile.io/).

![image](/assets/img/2019/02/microclimate-2.png)

The following screenshot shows the overview page of the project. I’ve put the code on [GitHub](https://github.com/nheidloff/ibm-cloud-starter-java-microservice-microprofile-javaee). Whenever the code changes, pipelines can be triggered automatically.

![image](/assets/img/2019/02/microclimate-3.png)

For smaller changes Microclimate comes with an integrated text editor in the web application.

![image](/assets/img/2019/02/microclimate-4.png)

In addition to the build logs and application logs, application metrics are displayed too (Garbage Collection Time, HTTP Throughput, Heap, HTTP Incoming Requests, CPU):

![image](/assets/img/2019/02/microclimate-5.png)

In order to run Microclimate you need Docker since everything is containerized: Microclimate itself as well as the containers running your microservices. I like this concept a lot since it allows working in the same containers locally which are later deployed on Kubernetes. This minimizes the risk to run into issues because of different environments.

![image](/assets/img/2019/02/microclimate-6.png)

For Eclipse and Visual Studio Code there are plugins to connect to Microclimate. This allows running and debugging your application code directly from the development environments. This is very similar to what I blogged about [IBM Cloud Functions]({{ "/article/debug-apache-openwhisk-functions-vscode" | relative_url }}). The following screenshot shows the debugger in Visual Studio Code accessing the running code in a container.

![image](/assets/img/2019/02/microclimate-7.png)

You can also do changes from the IDEs and run the changed code without having to restart containers or application servers manually!

Check out the Microclimate [documentation](https://microclimate-dev2ops.github.io/documentation) to learn more.