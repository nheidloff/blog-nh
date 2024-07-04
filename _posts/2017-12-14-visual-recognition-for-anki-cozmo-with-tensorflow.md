---
id: 2729
title: 'Visual Recognition for Anki Cozmo with TensorFlow'
date: '2017-12-14T10:51:02+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2729'
permalink: /article/visual-recognition-for-cozmo-with-tensorflow/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6348542028'
custom_permalink:
    - article/visual-recognition-for-cozmo-with-tensorflow/
categories:
    - Articles
---

The [Anki Cozmo](https://www.anki.com/cozmo) robot can recognize [faces](http://cozmosdk.anki.com/docs/generated/cozmo.faces.html) and [objects](http://cozmosdk.anki.com/docs/generated/cozmo.objects.html) with markers like Cozmo’s Power Cubes. Ansgar Schmidt and I have developed some sample code to allow Cozmo to recognize other types of objects via [TensorFlow](https://www.tensorflow.org/).

Watch the [video](https://www.youtube.com/watch?v=YhxItqxtfpU) and check out the [slides](https://www.slideshare.net/niklasheidloff/visual-recognition-with-anki-cozmo-and-tensorflow-84050740) to see how Cozmo can recognize three different toys:

{% include embed/youtube.html id='YhxItqxtfpU' %}

[Get the source code from GitHub.](https://github.com/nheidloff/visual-recognition-for-cozmo-with-tensorflow)

The training is done via TensorFlow and a retrained MobileNet model on Kubernetes.

![image](/assets/img/2017/12/architecture-1.png)

The classification is done via Tensorflow running in an [OpenWhisk](https://www.ibm.com/cloud/functions) function.

![image](/assets/img/2017/12/architecture-2.png)

Ansgar and I have blogged about this project in more detail.

- [Visual Recognition with TensorFlow and OpenWhisk]({{ "/article/visual-recognition-tensorflow-openwhisk" | relative_url }})
- [Accessing IBM Object Storage from Python](https://ansi.23-5.eu/2017/11/accessing-ibm-object-store-python/)
- [Image Recognition with Tensorflow training on Kubernetes](https://ansi.23-5.eu/2017/11/image-recognition-with-tensorflow-training-on-kubernetes/)
- [Image Recognition with Tensorflow classification on OpenWhisk](https://ansi.23-5.eu/2017/11/image-recognition-tensorflow-classification-openwhisk/)
- [Sample Application to classify Images with TensorFlow and OpenWhisk](https://heidloff.net/article/visual-recognition-tensorflow)

Cozmo finding the deer:

![image](/assets/img/2017/12/cozmo-deer.jpg)

Enjoy !

If you want to run this demo, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff) and try OpenWhisk and Kubernetes.