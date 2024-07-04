---
id: 2721
title: 'Deploying TensorFlow Models to Kubernetes on IBM Cloud'
date: '2017-12-11T13:45:44+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2721'
permalink: /article/tensorflow-models-kubernetes-ibm-cloud/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6342633066'
custom_permalink:
    - article/tensorflow-models-kubernetes-ibm-cloud/
categories:
    - Articles
---

[Ansgar Schmidt](https://ansi.23-5.eu/) and I open sourced a sample that shows how to use [TensorFlow](https://www.tensorflow.org/) to recognize certain types of flowers. The [first version]({{ "/article/visual-recognition-tensorflow-openwhisk" | relative_url }}) of the sample used the [MobileNet](https://research.googleblog.com/2017/06/mobilenets-open-source-models-for.html) model which we deployed to the serverless platform [OpenWhisk](https://openwhisk.apache.org/) to run the predictions. This article describes how to deploy a TensorFlow model to [Kubernetes](https://console.bluemix.net/docs/containers/container_index.html#container_index).

TensorFlow supports various image recognition models that can be retrained for certain objects. MobileNet is small and can be run in OpenWhisk. The more precise and bigger [Inception](https://www.tensorflow.org/tutorials/image_retraining) model however is too big for the 512 MB RAM memory limit of OpenWhisk. Instead it can be deployed to Kubernetes, for example on the IBM Cloud which provides a [free plan](https://console.bluemix.net/docs/containers/container_index.html#container_index) that can be used to run this sample.

In order to deploy TensorFlow models to production environments you should check out [TensorFlow Serving]({{ "/article/tensorflow-serving-inception-ibm-cloud-kubernetes" | relative_url }}). It provides a lot of nice functionality to manage models, provide API access to models and more. I set up Serving, but it wasn’t as straight forward as I had hoped. Below is a quick tutorial how you can deploy a model on Kubernetes without Serving.

I’ve [open sourced](https://github.com/nheidloff/VisualRecognitionWithTensorflow/blob/inception-kubernetes/README_KUBE_CLASSIFY.md) the code. There is also a [live demo](https://visual-recognition-tensorflow.mybluemix.net/) of the original sample using the MobileNet model.

Check out the blog from Ansgar how to [train the model](https://ansi.23-5.eu/2017/11/image-recognition-with-tensorflow-training-on-kubernetes/). The only change is that you have to refer to Inception rather than MobileNet. Ansgar also describes how to [deploy the model to OpenWhisk](https://ansi.23-5.eu/2017/11/image-recognition-tensorflow-classification-openwhisk/) via Docker. The same Docker image can also be deployed to Kubernetes on the IBM Cloud.

Before the Docker image can be built, you need to create an instance of IBM Object Storage on the IBM Cloud. Check out the article [Accessing IBM Object Store from Python](https://ansi.23-5.eu/2017/11/accessing-ibm-object-store-python/) for details. Paste the values of ‘region’, ‘projectId’, ‘userId’ and ‘password’ in classifier.py. After this upload the model (retrained\_graph.pb and retrained\_labels.txt) into your Object Storage instance in a bucket ‘tensorflow’.

In order to build the image, run these commands:

```
$ git clone https://github.com/AnsgarSchmidt/VisualRecognitionWithTensorflow.git
$ cd VisualRecognitionWithTensorflow/Classify
$ docker build -t $USER/tensorflow-kubernetes-classify:latest .
```

In order to test the image, run these commands:

```
$ docker run -d -p 8080:8080 $USER/tensorflow-kubernetes-classify:latest
$ curl http://localhost:8080/classify?image-url=http://heidloff.net/wp-content/uploads/2017/10/codetalks17-6.jpg
```

In order to deploy the image to Kubernetes on the IBM Cloud, run the following commands after you’ve updated your user name in \[tensorflow-model-classifier.yaml\](Classify/tensorflow-model-classifier.yaml):

```
$ docker push $USER/tensorflow-kubernetes-classify:latest
$ bx plugin install container-service -r Bluemix
$ bx login -a https://api.eu-de.bluemix.net
$ bx cs cluster-config mycluster
$ export KUBECONFIG=/Users/nheidlo.....
$ cd Classify
$ kubectl create -f tensorflow-model-classifier.yaml
$ bx cs workers mycluster
$ kubectl describe service classifier-service
```

In order to test the classifier, open the following URL after you’ve replaced your ‘Public IP’ and ‘NodePort’ from the previous two commands:

http://169.51.19.8:32441/classify?image-url=http://heidloff.net/wp-content/uploads/2017/10/codetalks17-6.jpg

Check out the complete source on [GitHub](https://github.com/nheidloff/VisualRecognitionWithTensorflow/blob/inception-kubernetes/README_KUBE_CLASSIFY.md). For now it’s in my fork, but we’ll merge it in the original project soon.

Here is a screenshot of the sample web application:

![image](/assets/img/2017/12/inception.png)