---
id: 2885
title: 'IBM Think 2018 Highlights for Developers'
date: '2018-03-23T14:45:14+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2885'
permalink: /article/think2018-highlights-developers/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6572020994'
custom_permalink:
    - article/think2018-highlights-developers/
categories:
    - Articles
---

Last week IBM hosted the [Think 2018](https://www.ibm.com/events/think/) conference in Las Vegas which is IBM’s flagship conference that combines previous conferences like InterConnect and World of Watson. Below is a list of announcements and news that I, as a developer, like most.

For more information about IBM Think topics, check out these sites:

- [IBM THINK Blog](https://www.ibm.com/blogs/think/)
- [IBM Cloud Blog](https://www.ibm.com/blogs/bluemix/)
- [IBM Watson Blog](https://www.ibm.com/blogs/watson/)
- [IBM Watson on Medium](https://medium.com/ibm-watson)
- [IBM Code Blog](https://developer.ibm.com/code/blogs/)
- [IBM Cloud Computing Blog](https://www.ibm.com/blogs/cloud-computing/)

The list is far from being complete, it doesn’t include topics like Blockchain and Quantum Computing, for example.

**Watson Studio**  
IBM Watson Studio was announced, a superset of the functionality that used to be available in the IBM Data Science experience plus many new features. Data scientists, data engineers and developers can use Watson Studio for the end to end AI workflow from accessing and preparing data, building models and deploying models up to building cognitive applications. Read [Introducing IBM Watson Studio](https://medium.com/ibm-watson/introducing-ibm-watson-studio-e93638f0bb47) for more details.

![image](/assets/img/2018/03/think2018-studio2.png)

**Neural Network Modeler**  
With the new Neural Network Modeler, you can define neural networks graphically and declaratively. The Modeler generates generic training definitions which can be translated into TensorFlow, PyTorch and Caffe2 models. Read [Accelerate Your Deep Learning Experiments with IBM’s Neural Network Modeler](https://medium.com/ibm-watson/accelerate-your-deep-learning-experiments-with-ibms-neural-network-modeler-dd0c92fba814) for more details.

![image](/assets/img/2018/03/think2018-modeler.jpg)

**Deep Learning as a Service and Hyperparameter Optimization**  
With the new deep learning service, data scientists can design neural networks with the popular deep learning frameworks TensorFlow, Caffe and PyTorch. The service comes with an experiment assistant to optimize hyperparameters. The workloads are run on Kubernetes clusters supporting GPUs. Read [Deep Learning as a service now in IBM Watson Studio](https://medium.com/ibm-watson/deep-learning-now-in-ibm-watson-studio-d8ba311e4ff1) for more details.

![image](/assets/img/2018/03/think2018-hyper.jpg)

**Open Source Project: Fabric for Deep Learning**  
IBM has contributed the core of Watson Studio’s Deep Learning Service as an open source project: Fabric for Deep Learning. The trainings for various open source frameworks can be run in distributed Kubernetes environments including GPU support. After this, models can be deployed in Watson Studio. Read [Fabric for Deep Learning](https://developer.ibm.com/code/2018/03/20/fabric-for-deep-learning/) for more details.

![image](/assets/img/2018/03/think2018-f.jpg)

**Watson Visual Recognition supports Apple Core ML**  
The Watson Visual Recognition service can be used to train custom models which can be consumed by iOS apps locally. The Watson Swift SDK allows downloading the Core ML models and running predictions. Read [IBM’s Watson Visual Recognition service to support Apple Core ML technology](https://developer.ibm.com/code/2018/03/21/ibm-watson-visual-recognition-service-to-support-apple-core-ml/) for more details.

![image](/assets/img/2018/03/think2018-coreml.png)

**Model Asset Exchange**  
The Model Asset Exchange is a site for developers to find and use free and open source deep learning models. The models are wrapped in Docker containers and they provide REST APIs to run predictions. Read [Igniting a community around deep learning models with Model Asset eXchange](https://developer.ibm.com/code/2018/03/20/igniting-a-community-around-deep-learning-models-with-model-asset-exchange-max/) for more details.

![image](/assets/img/2018/03/think2018-max.jpg)

**Watson Assistant**  
Watson Conversation and Watson Virtual Agent have been merged and rebranded to IBM Watson Assistant with lots of new features. Most importantly prebuilt content is provided, for example for typical support bots. From the content catalog intents can simply be added to custom bots. Read [Introducing Watson Assistant](https://www.ibm.com/blogs/watson/2018/03/the-future-of-watson-conversation-watson-assistant) for more details.

![image](/assets/img/2018/03/think2018-assistant.jpg)

**OpenWhisk Extensions**  
Several new capabilities have been added to IBM Cloud Functions. I like that the usage of Composer, a tool to build serverless applications, has been simplified by not having to configure Redis anymore. For logging Kibana which comes as part of IBM Cloud Log Analysis can be used now. 

![image](/assets/img/2018/03/think2018-kibana.jpg)

**Bare Metal Kubernetes**  
IBM enables developers and data science teams to create and run Kubernetes containers as a managed service directly on bare metal cloud infrastructure. Read [IBM brings the ease of containers to complex workloads with managed Kubernetes on bare metal](https://www.ibm.com/blogs/cloud-computing/2018/03/managed-kubernetes-bare-metal/) for more details.

![image](/assets/img/2018/03/think2018-bare.png)