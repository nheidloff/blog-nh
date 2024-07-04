---
id: 3119
title: 'Using Docker Containers in the Deep Learning Platform FfDL'
date: '2018-09-24T07:50:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3119'
permalink: /article/ffdl-kubernetes-docker-tensorflow/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ffdl-kubernetes-docker-tensorflow/
dsq_thread_id:
    - '6929197266'
categories:
    - Articles
---

In order to train the object detection model for my sample [TensorFlow Object Detection for Anki Overdrive Cars](https://github.com/nheidloff/object-detection-anki-overdrive-cars), I used a custom Docker container. I’ve extended the [description](https://github.com/nheidloff/object-detection-anki-overdrive-cars#3c-training-of-the-model-on-the-ibm-cloud-with-ffdl) of my repo to also document how [Fabric for Deep Learning (FfDL)](https://github.com/IBM/FfDL) can be used to run this container.

Fabric for Deep Learning (FfDL) is an open source extension for Kubernetes to run deep learning workloads. It can be run in the cloud or on-premises. It supports frameworks like TensorFlow, Caffe and PyTourch, it’s supports GPUs and can be used to run distributed trainings. [Watson Deep Learning as a Service](https://www.ibm.com/blogs/watson/2018/03/deep-learning-service-ibm-makes-advanced-ai-accessible-users-everywhere/) uses FfDL internally.

FfDL supports [various deep learning frameworks](https://github.com/IBM/FfDL/blob/master/docs/user-guide.md#1-supported-deep-learning-frameworks) out of the box. For TensorFlow Object Detection however this is not sufficient since [additional libraries](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/installation.md) are required.

Fortunately it turned out that you can also bring your own containers and use them for trainings on FfDL. Until recently this was only possible when [compiling FfDL](https://github.com/IBM/FfDL/blob/master/docs/developer-guide.md#enable-custom-learner-images-with-development-build) before deploying it, but now this functionality is also available with the standard installation.

Here is a sample [manifest.yml](https://github.com/nheidloff/object-detection-anki-overdrive-cars/blob/master/ffdl/manifest.yml) file. The output is stored in [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage).

```
name: Niklas OD
description: Niklas OD
version: "1.0"
gpus: 0
cpus: 4
learners: 1
memory: 16Gb

data_stores:
  - id: test-datastore
    type: mount_cos
    training_data:
      container: nh-od-input
    training_results:
      container: nh-od-output
    connection:
      auth_url: http://s3-api.dal-us-geo.objectstorage.softlayer.net
      user_name: xxx
      password: xxx

framework:
  name: custom
  version: "nheidloff/train-od"
  command: cd /tensorflow/models/research/volume && python model_main.py --model_dir=$RESULT_DIR/training --pipeline_config_path=ssd_mobilenet_v2_coco.config --num_train_steps=15000  --alsologtostderrdock
```

At the bottom of the manifest.yml, the [Docker image](https://github.com/nheidloff/object-detection-anki-overdrive-cars/blob/master/DockerfileCloud) is defined as well as the command to start the training. To initiate the training, a CLI can be used or a web application as shown in the screenshot.

![image](/assets/img/2018/09/ffdl-docker1.png)

Thanks a lot to my colleagues Tommy Chaoping and Animesh Singh for their help to get this sample to work.