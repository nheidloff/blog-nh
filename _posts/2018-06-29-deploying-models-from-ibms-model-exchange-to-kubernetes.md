---
id: 3026
title: "Deploying Models from IBM's Model Exchange to Kubernetes"
date: '2018-06-29T07:17:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3026'
permalink: /article/model-asset-exchange-dl-kubernetes-tensorflow/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/model-asset-exchange-dl-kubernetes-tensorflow/
dsq_thread_id:
    - '6761623176'
categories:
    - Articles
---

In March IBM [launched](https://developer.ibm.com/code/2018/03/20/igniting-a-community-around-deep-learning-models-with-model-asset-exchange-max/) the [Model Asset Exchange](https://developer.ibm.com/code/exchanges/models/) which is a place for developers to find and use open source deep learning models. In this article I describe how developers can use these models in applications and how the applications can be deployed to Kubernetes.

The Model Asset Exchange contains currently 11 models for visual recognition, text generation, style transfer and more. The models are open source and the IP, including for the data, has been vetted.

There are two types of models: Models that can be re-used directly and models with instructions how to train and customize them. I like this concept a lot. I’m a developer and not a data scientist and these models allow me to use AI in my applications without having to write my own neural networks.

Technically the models are put in Docker images which can be deployed to various environments, for example Kubernetes on the IBM Cloud. The Docker images also abstract which deep learning framework is used. So as a consumer you don’t have to understand the differences between TensorFlow, PyTorch, etc. Instead developers can simply invoke REST APIs to run predictions. Every model comes with a Swagger API definition and an explorer as shown in the screenshot.

![image](/assets/img/2018/06/max-caption-generator-swagger.png)

One of the models is the [Image Caption Generator](https://github.com/IBM/MAX-Image-Caption-Generator). With this model text is generated that describes content on an image. The next screenshot shows a [sample web application](https://github.com/IBM/MAX-Image-Caption-Generator-Web-App) which uses this model. It also displays a tag cloud. Users can click on a tag and only the images are selected that match this tag.

![image](/assets/img/2018/06/max-caption-generator.png)

The Docker images of the models are available on [Docker Hub](https://hub.docker.com/u/codait/). There are also [yaml](https://github.com/IBM/MAX-Image-Caption-Generator/blob/master/image-caption-generator.yaml) files for the models to deploy them easily on Kubernetes.

The caption generator web application documents currently how to deploy the model to Kubernetes and how to deploy the web application on the IBM Cloud as Cloud Foundry application. I’ve sent a [pull request](https://github.com/IBM/MAX-Image-Caption-Generator-Web-App/pull/31) that also shows how to deploy the web application to Kubernetes.

Check out the [yaml](https://github.com/nheidloff/MAX-Image-Caption-Generator-Web-App/blob/kubernetes-cli/kube-web.yaml) file to deploy the web application and the [yaml](https://github.com/nheidloff/MAX-Image-Caption-Generator-Web-App/blob/kubernetes-cli/kube-model.yaml) file to deploy the model.

In the model yaml file the service has the name ‘caption-generator-service’:

```
kind: Service
metadata:
  labels:
    name: caption-generator-service
  name: caption-generator-service
```

In the web application yaml file this name is passed as argument to the web application:

```
containers:
  - name: caption-generator-web
     image: nheidloff/caption-generator-web:latest
     command: ["python", "app.py", "--ml-endpoint=http://caption-generator-service:5000"]
     ports:
       - containerPort: 8088
```

Want to run this sample yourself?

All you need to do is to get a free [IBM Cloud account](https://ibm.biz/nheidloff), create a [Kubernetes cluster](https://console.bluemix.net/containers-kubernetes/catalog/cluster), get the code from [GitHub](https://github.com/nheidloff/MAX-Image-Caption-Generator-Web-App/tree/kubernetes-cli) and run these commands:

```
$ kubectl apply -f kube-model.yaml
$ kubectl apply -f kube-web.yaml 
```