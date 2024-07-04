---
id: 3056
title: 'Reusing Open Source Models in AI Applications'
date: '2018-08-01T13:50:03+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3056'
permalink: /article/open-source-ai-models-zoo-exchange-onnx/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/open-source-ai-models-zoo-exchange-onnx/
dsq_thread_id:
    - '6829451573'
categories:
    - Articles
---

Building machine and deep learning models from scratch is often not trivial, not for developers and sometimes not even for data scientists. Fortunately over the last years several models have been developed and shared that can be reused and sometimes extended. This allows developers adding AI to applications without having to be data scientists.

This article describes how to find open source AI models and introduces briefly ONNX, which allows conversions between different model formats.

In order to find models, there isn’t the one place to go to. In my experience the best way to find models is to rely on Google searches. That having said, there are a number of websites though with lot’s of interesting open source models.

**IBM Model Asset Exchange**

The [IBM Model Asset Exchange](https://developer.ibm.com/code/exchanges/models/) doesn’t contain too many models yet, but I like the consumability for developers. As I [blogged]({{ "/article/model-asset-exchange-dl-kubernetes-tensorflow" | relative_url }}) about, the models are put in Docker containers and predictions can be done via REST APIs. The models are published under open source licenses and the IP has been vetted. Some of the models can be re-trained easily with custom data.

**TensorFlow Models**

As the name implies the [TensorFlow Models](https://github.com/tensorflow/models) GitHub project is specialized on TensorFlow. This catalog has a big amount of models and many different types of models. Many of the models are high quality and well documented, for example the visual recognition models. For some of the other models I’m not sure whether they are actively maintained. Also some of the models are not the trained models, but code to execute trainings of models.

**Caffe2 Model Zoo**

The [Caffe2 Model Zoo](https://caffe2.ai/docs/zoo.html) is another website you might want to check out when looking for models. There is a bigger number of visual recognition models available for Caffe and Caffe2. As a developer without much data science background however, I’ve found it sometimes hard to understand what these models do and how to use them.

**ONNX Model Zoo**

The [Open Neural Network eXchange Model Zoo](https://github.com/onnx/models) is a collection of pre-trained, state-of-the-art models in the ONNX format. [ONNX](http://onnx.ai/) is an open format to represent deep learning models. ONNX was initiated by Facebook and Microsoft, [IBM](https://www.ibm.com/blogs/research/2017/10/open-standards-deep-learning-simplify-development-neural-networks/) joined shortly after this.

There are several [converters](https://github.com/onnx/tutorials) available to import ONNX models in frameworks like TensorFlow, CoreML and Caffe and vice versa converters to convert models from different deep learning frameworks into the ONNX format. This allows developers, for example, to convert models that cannot be run natively on mobile devices into formats that can be executed on mobile devices. Unfortunately I haven’t had luck to get a sample working so far, but I’ll keep trying as the different converters evolve.

This screenshots shows the currently available ONNX converters:

![image](/assets/img/2018/08/onnx-converters.jpeg)