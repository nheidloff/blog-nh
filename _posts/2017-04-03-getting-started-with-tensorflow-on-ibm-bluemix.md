---
id: 2205
title: 'Getting started with Tensorflow on IBM Bluemix'
date: '2017-04-03T14:11:31+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2205'
permalink: /article/getting-started-with-tensorflow/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/getting-started-with-tensorflow/
categories:
    - Articles
---

In order to learn Deep Learning I’ve taken an [Udacity course](https://www.udacity.com/course/deep-learning--ud730) that I can highly recommend. One reason I took that course was because I also liked the [Udacity machine learning courses]({{ "/article/machine-learning-courses-developers" | relative_url }}). Another reason was because I wanted to learn [Tensorflow](https://www.tensorflow.org/) which to me looks like the most popular deep learning library right now.

Below is the [YouTube playlist](https://www.youtube.com/playlist?list=PLAwxTw4SYaPn_OWPFT9ulXLuQrImzHfOV) of the course. The [assignments](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/udacity) can be run locally via Docker.

{% include embed/youtube.html id='iF8dRePlPUo' %}

Another good starting point to learn Tensorflow is the video “[Tensorflow and deep learning – without a PhD by Martin Görner](https://www.youtube.com/watch?v=vq2nnJ4g6N0)“.

In order to run Tensorflow on [IBM Bluemix](https://console.ng.bluemix.net/) you can use [Docker](https://hub.docker.com/r/tensorflow/tensorflow/). Alternatively you can use Tensorflow in notebooks on [IBM Data Science Experience](http://datascience.ibm.com/). Check out the [hello world sample](https://apsportal.ibm.com/analytics/notebooks/91440c8b-0bfb-471e-b04e-235e4d9f510d/view?access_token=fb4380415a903111e26cec3bd95d8ba91a04746185c866fecde9d36643fa5585) how to install Tensorflow.

```
#!pip install https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.9.0-cp27-none-linux_x86_64.whl
import tensorflow as tf

# Create TensorFlow object called hello_constant
hello_constant = tf.constant('Hello World!')

with tf.Session() as sess:
    # Run the tf.constant operation in the session
    output = sess.run(hello_constant)
    print(output)
 
```