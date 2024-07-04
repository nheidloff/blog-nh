---
id: 2700
title: 'Deploying the TensorFlow Inception Model on the IBM Cloud'
date: '2017-11-28T11:22:33+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2700'
permalink: /article/tensorflow-serving-inception-ibm-cloud-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/tensorflow-serving-inception-ibm-cloud-kubernetes/
dsq_thread_id:
    - '6315528591'
categories:
    - Articles
---

As a developer I’m trying to better understand how developers work together with data scientists to build applications that leverage machine learning. In this context one key question is how developers can access models from their applications. Below is a quick introduction to TensorFlow Serving and a description how to deploy TensorFlow models onto the IBM Cloud.

Here is the description of [TensorFlow Serving](https://www.tensorflow.org/serving/) from the home page:

“TensorFlow Serving is a flexible, high-performance serving system for machine learning models, designed for production environments. TensorFlow Serving makes it easy to deploy new algorithms and experiments, while keeping the same server architecture and APIs. TensorFlow Serving provides out-of-the-box integration with TensorFlow models, but can be easily extended to serve other types of models and data.”

TensorFlow Serving can be deployed on Kubernetes which is documented in this [tutorial](https://www.tensorflow.org/serving/serving_inception). The tutorial shows how to deploy and access the [InceptionV3](https://github.com/tensorflow/models/tree/master/research/slim#pre-trained-models) model which has been trained with 1.2 million images from ImageNet with [1000 classes](http://image-net.org/challenges/LSVRC/2014/browse-synsets). This model is a great starting point for your own visual recognition scenarios. See the [retraining](https://www.tensorflow.org/tutorials/image_retraining) documentation for details.

The tutorial describes how to build your own Docker image with TensorFlow Serving. Unfortunately there are quite a number of manual steps necessary at this point. If you just want to try the quality of the image recognition model, you can use the image that I created from [DockerHub](https://hub.docker.com/r/nheidloff/inception_serving/).

In order to deploy this image on Kubernetes in the IBM Cloud save the file [inception\_k8s.yaml](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/example/inception_k8s.yaml) locally.

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: inception-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: inception-server
    spec:
      containers:
      - name: inception-container
        image: nheidloff/inception_serving
        command:
        - /bin/sh
        - -c
        args:
        - serving/bazel-bin/tensorflow_serving/model_servers/tensorflow_model_server
          --port=9000 --model_name=inception --model_base_path=/tmp/inception-export
        ports:
        - containerPort: 9000
---
apiVersion: v1
kind: Service
metadata:
  labels:
    run: inception-service
  name: inception-service
spec:
  ports:
  - port: 9000
    targetPort: 9000
  selector:
    app: inception-server
  type: NodePort
```

After this invoke these commands:

```
$ bx plugin install container-service -r Bluemix
$ bx login -a https://api.eu-de.bluemix.net
$ bx cs cluster-config mycluster
$ export KUBECONFIG=/Users/nheidlo.....
$ kubectl create -f inception_k8s.yaml
$ bx cs workers mycluster
$ kubectl describe service inception-service
```

Write down the IP address and NodePort since you need this information in the next step. Also note that this works even for the lite Kubernetes account on IBM Cloud without Ingress.

This is what you should see after everything has been deployed (‘$kubectl proxy’).

![image](/assets/img/2017/11/tensorflow-serving-1024x869.png)

TensorFlow Serving supports [gRPC](https://grpc.io/) to access the models. In order to test the served model a test gRPC client is needed. In the simplest case you can use the same image since it comes with a test client. Here is a sample flow of commands to get the classes Inception returns for my picture.

```
$ docker run -it nheidloff/inception_serving
$ cd serving/
$ wget http://heidloff.net/wp-content/2015/11/4Y7B9422-4.jpg
$ bazel-bin/tensorflow_serving/example/inception_client --server=172.21.255.183:30584 --image=./4Y7B9422-4.jpg
```

If you want to access the deployed models via REST instead of gRPC, you might want to check out this blog entry [Creating REST API for TensorFlow models](https://becominghuman.ai/creating-restful-api-to-tensorflow-models-c5c57b692c10) which looks promising and is on my list of things I’d like to try out.