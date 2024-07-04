---
id: 2707
title: 'Sample Application how to use TensorFlow in OpenWhisk'
date: '2017-12-01T08:03:21+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2707'
permalink: /article/visual-recognition-tensorflow/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/visual-recognition-tensorflow/
dsq_thread_id:
    - '6321958072'
categories:
    - Articles
---

[TensorFlow](https://www.tensorflow.org/) provides predefined models that can be retrained to recognize certain objects in images. [OpenWhisk](https://openwhisk.apache.org/) is a serverless platform that executes functions in the cloud. With [Kubernetes](https://kubernetes.io/) you can run heavy workloads in the cloud, for example the training of new TensorFlow models. Check out our open source sample that shows how to use these technologies together to recognize certain types of flowers.

[Get the code from GitHub](https://github.com/nheidloff/visual-recognition-tensorflow-openwhisk) or [try out the live demo](http://visual-recognition-tensorflow.mybluemix.net/).

Let me summarize how [Ansgar Schmidt](https://ansi.23-5.eu) and I have built the sample.

**TensorFlow**

TensorFlow provides various [predefined visual recognition models](https://github.com/tensorflow/models/tree/master/research/slim#Pretrained). These models can be used as starting point to build your own models to recognize your own objects in images. This technique is called [Transfer Learning](https://www.tensorflow.org/tutorials/image_retraining). We’ve chosen the [MobileNet](https://research.googleblog.com/2017/06/mobilenets-open-source-models-for.html) model which can be used in OpenWhisk since you need less than 512 MB RAM to run it. The codelab [TensorFlow for Poets](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets/#0) describes this functionality in more detail and we’ve used some of this code in our sample.

**Object Storage**

IBM provides [Object Storage](https://console.bluemix.net/catalog/infrastructure/object-storage-group) to store files in the cloud which can be accessed via the S3 or Swift protocols. There is a lite plan that allows running this sample without having to pay anything and without having to provide payment information. We use Object Storage to store the training set of flowers and to store and read the trained models.

**Training with Kubernetes**

In our sample we leverage [flower images](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets/#2) provided by Google. In order to train the model we’ve created a [Docker image](https://github.com/AnsgarSchmidt/VisualRecognitionWithTensorflow/blob/master/Train/Dockerfile) that extends the TensorFlow Docker image and contains code from TensorFlow for Poets. A [script](https://github.com/AnsgarSchmidt/VisualRecognitionWithTensorflow/blob/master/Train/execscript.sh) reads the flower images from Object Storage, triggers the training and stores the models back in Object Storage. The Docker container can be run locally or on [Kubernetes](https://github.com/AnsgarSchmidt/VisualRecognitionWithTensorflow/blob/master/Train/train.yml). We’ve used the free lite plan available in the [IBM Cloud](https://console.bluemix.net/containers-kubernetes/home/clusters).

**Classification with OpenWhisk**

In order to classify images Ansgar has built a second [Docker image](https://github.com/AnsgarSchmidt/VisualRecognitionWithTensorflow/blob/master/Classify/Dockerfile) which extends the TensorFlow image and runs [Python code](https://github.com/AnsgarSchmidt/VisualRecognitionWithTensorflow/blob/master/Classify/classifier.py) to classify images against the trained model which is read from Object Storage. The Docker image can be deployed to the cloud as an OpenWhisk function. The classification of images takes less than 160 ms. Since the loading of the model takes some time, Ansgar runs this code in the ‘/init’ endpoint to leverage OpenWhisk’s caching capabilities.

**Web Application and API**

For demonstration and testing purposes we’ve built a simple API and a web application. A second [OpenWhisk action](https://github.com/nheidloff/visual-recognition-tensorflow-openwhisk/blob/master/openwhisk-api/api.js) receives an image via an HTTP POST request and converts it to base64 which is the format the classifier OpenWhisk action expects as input. Via an OpenWhisk sequence the API action invokes the classifier action. As a result JSON is returned containing the recognized classes and probabilities. Via the [web application](https://github.ibm.com/niklas-heidloff/visual-recognition-tensorflow/tree/master/web-app) you can upload files and see the predictions in the UI.

Here is a screenshot of the sample application:

![image](/assets/img/2017/11/tensorflow-openwhisk.png)

Ansgar Schmidt and I have blogged about this project in more detail.

- [Visual Recognition with TensorFlow and OpenWhisk]({{ "/article/visual-recognition-tensorflow-openwhisk" | relative_url }})
- [Accessing IBM Object Storage from Python](https://ansi.23-5.eu/2017/11/accessing-ibm-object-store-python/)
- [Image Recognition with Tensorflow training on Kubernetes](https://ansi.23-5.eu/2017/11/image-recognition-with-tensorflow-training-on-kubernetes/)
- [Image Recognition with Tensorflow classification on OpenWhisk](https://ansi.23-5.eu/2017/11/image-recognition-tensorflow-classification-openwhisk/)
- [Sample Application to classify Images with TensorFlow and OpenWhisk](https://heidloff.net/article/visual-recognition-tensorflow)

Enjoy !