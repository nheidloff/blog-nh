---
id: 3090
title: 'Training TensorFlow Object Detection Models'
date: '2018-09-17T12:51:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3090'
permalink: /article/tensorflow-object-detection-deep-learning/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6916681750'
custom_permalink:
    - article/tensorflow-object-detection-deep-learning/
categories:
    - Articles
---

[TensorFlow Object Detection](https://github.com/tensorflow/models/tree/master/research/object_detection) is a powerful technology to recognize different objects in images including their positions. The trained Object Detection models can be run on mobile and edge devices to execute predictions really fast. I’ve used this technology to build a demo where Anki Overdrive cars and obstacles are detected via an iOS app. When obstacles are detected, the cars are stopped automatically.

Check out the short [video](https://youtu.be/i7qnAA33ZFo) (only 2 mins) for a quick demo.

This picture shows the track with two cars and a phone and the iOS app which draws rectangles around the objects.

![image](/assets/img/2018/09/picture2-small.jpg)

I have [open sourced](https://github.com/nheidloff/object-detection-anki-overdrive-cars) the code on GitHub. The repo includes two parts:

1. Trained deep learning model to recognize items on Anki Overdrive tracks with an iOS app
2. Documentation how to train TensorFlow Object Detection models

The instructions in the [README](https://github.com/nheidloff/object-detection-anki-overdrive-cars/blob/master/README.md) are pretty detailed. Below is a quick overview of the main steps that you can follow to train models to detect your own objects.

**1) Development Environment Setup**

First you need to download the trained MobileNet model which is an optimized model for mobile devices. Rather than training a new model from scratch, transfer learning is used. Basically the last layer of the neural network is replaced with your own objects.

To make the [setup of the development environment](https://github.com/nheidloff/object-detection-anki-overdrive-cars#1-development-environment-setup) as simple as possible, Docker containers are provided.

**2) Labelling of Images**

While for Visual Recognition models only images and the names of the categories need to be provided, the [labeling for Object Detection](https://github.com/nheidloff/object-detection-anki-overdrive-cars#2-labelling-of-images-and-creation-of-tfrecords) is more sophisticated. In addition to the list of objects you also need to provide their positions. I’ve used [labelImg](https://github.com/tzutalin/labelImg) to create the labels and rectangles as shown in the screenshot.

![image](/assets/img/2018/09/labelimage2.jpg)

From what I’ve read these are some best practices how to create the training data:

- Take/get at least 50 pictures per object.
- Use a rather small resolution, for example 640 x 480.
- Use different sizes of your objects and different angles.
- Use pictures that have multiple objects in them.
- When marking the objects with labelImg, put the rectangles as closely as possible around the objects.

The images and the annotations exported from the labelImg tool need to be [converted](https://github.com/nheidloff/object-detection-anki-overdrive-cars/blob/master/README.md#creation-of-tfrecords) into a certain format (TFRecords) which TensorFlow Object Detection expects.

**3) Training of the Model**

Trainings with just a few training steps can be run [locally](https://github.com/nheidloff/object-detection-anki-overdrive-cars#3-training-of-the-model). This is useful, for example, if you want to test whether the code runs. When you can use a GPU, trainings with many steps should also be possible locally, but I haven’t tried it.

I’ve used [Kubernetes on the IBM Cloud](https://www.ibm.com/cloud/container-service) to run the training. The 17.000 training steps took roughly 1.5 days. In order to also leverage GPUs I want to look at [FfDL](https://github.com/IBM/FfDL). I’ll blog about it when I’ll have found out more. If you want to use the IBM Cloud, you can get a [free account](https://ibm.biz/nheidloff).

![image](/assets/img/2018/09/od-kubernetes.jpg)

After the training a frozen graph of the model needs to be created. The repo contains a script and a Docker container to do this.

**4) Usage of the Model in Notebooks and Apps**

The training model can be tested with a [Python notebook](https://github.com/nheidloff/object-detection-anki-overdrive-cars#5-testing-of-the-model). The screenshot shows the detected objects in a test image.

![image](/assets/img/2018/09/notebook.jpg)

The repo also contains an [iOS app](https://github.com/nheidloff/object-detection-anki-overdrive-cars#6-setup-of-the-ios-app) which I found on [GitHub](https://github.com/csharpseattle/tensorflowiOS).

**Connecting the Cars and the iOS App to the Watson IoT Platform**

In order to stop the Anki Overdrive cars when phones are put on the track, you need to set up additional components, especially the Node.js controller and the [Watson IoT Platform](https://www.ibm.com/internet-of-things). In order to do this, follow the instructions from my project [node-mqtt-for-anki-overdrive](https://github.com/IBM-Bluemix/node-mqtt-for-anki-overdrive).

Here is a diagram of the high level architecture:

![image](/assets/img/2018/09/od-architecture-small.jpg)

The next screenshot shows a simple [Node-RED](https://nodered.org/) flow that stops the cars when obstacles are detected.

![image](/assets/img/2018/09/node-red1.jpg)

If you want to run this demo yourself, you need an [Anki Overdrive Starter Kit](https://www.anki.com/en-us/overdrive/get-started) and the [code](https://github.com/nheidloff/object-detection-anki-overdrive-cars) from GitHub.