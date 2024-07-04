---
id: 3073
title: 'Deploying Machine Learning Models in the Cloud'
date: '2018-08-03T09:46:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3073'
permalink: /article/deployment-machine-learning-models-cloud/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deployment-machine-learning-models-cloud/
dsq_thread_id:
    - '6832957038'
categories:
    - Articles
---

For software development there are many methodologies, patterns and techniques to build, deploy and run applications. DevOps is the state of the art methodology which describes a software engineering culture with a holistic view of software development and operation.

For data science there is a lot of information how machine and deep learning models can be built. The operational aspects seem to still be evolving. I’m currently trying to understand better how to deploy models in the cloud and how to use them efficiently in applications. Below are some of my findings so far.

In the simplest case [models provided by data scientists]({{ "/article/open-source-ai-models-zoo-exchange-onnx" | relative_url }}) and models extended by developers can be wrapped in Docker containers and accessed via REST APIs. The Docker containers can be run, for example, on [Kubernetes]({{ "/article/model-asset-exchange-dl-kubernetes-tensorflow" | relative_url }}) or on serverless platforms like [OpenWhisk]({{ "/article/visual-recognition-tensorflow" | relative_url }}). When building Flask based web applications, the models could even be packaged and run in the same container.

While this works for prototypes and quick evaluations, there are several other aspects you need to take into account when deploying models to production environments.

**Versioning**

As for other services and APIs multiple versions need to be handled. At a minimum it should be possible to roll out new models via blue-green deployments. Furthermore traffic management functionality like canary deployments and [A/B testing]({{ "/article/ab-testing-kubernetes-istio" | relative_url }}) is often required for sophisticated production applications.

**Inference Pipelines**

In order to run inferences, applications have to provide the input in a certain format as expected by the models. In some cases this means that the data needs to be formatted first. For example in a visual recognition scenario the application might have to convert a JPG image into a JSON structure. Vise versa the output of the model might not have the format the application requires.

Additionally sometimes it’s more efficient to do batch invocations rather than causing network traffic for every single request. Sometimes multiple models are invoked at the same time and the responses are sent together back to the applications.

So rather than deploying only the core model, inference pipelines should be deployed and made available as service.

**Inference Model Optimizations**

I blogged about how to deploy models to edge devices via [TensorFlow Lite]({{ "/article/tensorflow-lite-ibm-watson-ios" | relative_url }}) and [TensorFlow.js]({{ "/article/tensorflowjs-ibm-watson-web-browsers-dl" | relative_url }}). In both cases models need to be optimized in terms of model size, memory usage, battery usage, etc. To achieve this, one method is to remove dropouts from the graph. Dropouts are used during training to prevent overfitting models. At runtime, when running predictions, they are not needed.

Another method to optimize models is quantization. Weights in graphs are often defined via floats. When using integers instead however, the sizes of the models are reduced significantly while the accuracy is only affected minimally or not at all.

Similarly to optimizations for mobile devices, optimizations are done before deploying models to the cloud.

**Standard Requirements for Services**

As for other services authentication and authorization need to be handled. In order to make models accessible to multiple applications and developers, [API Management]({{ "/article/machine-learning-models-rest-apis" | relative_url }}) is desirable.

REST APIs are not the only way to expose models. Maybe other protocols like gRPC or messaging based systems are better options for specific scenarios.

Services that run inferences need to be scalable and there needs to be monitoring functionality. In summary services that run inferences have the same requirements as all other services.

**Available Frameworks**

There are several frameworks to deploy models in the cloud. In the best case a framework should fulfill all requirements above and the framework should be serverless so that people can focus on the business logic rather than infrastructure. Below are a couple of frameworks and offerings that you might want to check out.

[Watson Studio](https://dataplatform.cloud.ibm.com/docs/content/analyze-data/ml_dlaas_model_deploy_score_ovr.html?audience=wdp&context=analytics) supports not only the training of models, but also deployments of models. These models can have different versions and can be invoked via REST APIs:

![image](/assets/img/2018/08/watson-studio-deployment-1024x435.png)

The models from the [IBM Model Asset Exchange](https://developer.ibm.com/code/exchanges/models/) can be deployed easily to [Kubernetes]({{ "/article/model-asset-exchange-dl-kubernetes-tensorflow" | relative_url }}). Istio on top of Kubernetes supports traffic management, for example to do canary rollouts.

[Seldon](https://github.com/SeldonIO/seldon-core) is an open source platform for deploying machine learning models on Kubernetes. It supports libraries like TensorFlow and Sklearn and REST and gRPC APIs. It can be used well together with the [Fabric for Deep Learning](https://developer.ibm.com/code/2018/06/12/serve-it-hot-deploy-your-ffdl-trained-models-using-seldon/). I like especially the capability to do what I call [Inference Pipelines](https://github.com/SeldonIO/seldon-core/blob/master/docs/crd/readme.md#creating-your-resource-definition) above.

[TensorFlow Serving](https://www.tensorflow.org/serving/) is a flexible, high-performance serving system for machine learning models with built-in support for TensorFlow models. It seems to be pretty powerful but when I [tried]({{ "/article/tensorflow-serving-inception-ibm-cloud-kubernetes" | relative_url }}) it last year, it wasn’t that easy. I’m sure it has improved a lot since then. For example since recently TensorFlow Serving also supports [REST](https://www.tensorflow.org/serving/api_rest) and not only gRPC.

[PipelineAI](https://github.com/PipelineAI/pipeline) is a real-time enterprise AI platform and looks very promising. I’ve watched some of the great [videos](https://www.youtube.com/channel/UCvlZKtekcKkBUuz8f9dhobw/videos) which describe not only PipelineAI, but also deployment strategies and concepts in general. Models are packaged in Docker containers and can be run on Kubernetes. While that part is open source, I’m not sure yet about other PipelineAI components which do the model optimizations and visualization.

Again, I’m only learning this topic myself currently, but maybe this article creates some awareness for the deployment requirements and options.