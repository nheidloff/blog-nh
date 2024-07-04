---
id: 5414
title: 'Serving Watson NLP on Kubernetes with KServe ModelMesh'
date: '2022-11-28T00:25:38+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5414'
permalink: /article/serving-watson-nlp-on-kubernetes-with-kserve-modelmesh/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/serving-watson-nlp-on-kubernetes-with-kserve-modelmesh/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post describes how to deploy and run Watson NLP and Watson NLP models on Kubernetes via the highly scalable model inference platform KServe ModelMesh.*

To set some context, check out the landing page [IBM Watson NLP Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing). The Watson NLP containers can be run on different container platforms, they provide REST and gRCP interfaces, they can be extended with custom models and they can easily be embedded in solutions. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Watson Assistant and NLU (Natural Language Understanding) SaaS services and IBM Cloud Pak for Data.

**What is KServe ModelMesh?**

KServe is a Kubernetes-based platform for ML model inference (predictions). It supports several standard ML model formats, including TensorFlow, PyTorch, ONNX, scikit-learn and more. Additionally it is highly scalable and dynamic. KServe ModelMesh is used for sophisticated AI scenarios where multiple models are used at the same time. For example you might have a scenario where you need various NLP models (classification, emotions, concepts, etc.), various Speech models (different qualities, voices, etc.) and all this for for different languages. In this case utting all models in one container is not an option.

Let’s look at the definition from the [KServe](https://kserve.github.io/website/0.9/) landing page.

> ModelMesh is designed for high-scale, high-density and frequently-changing model use cases. ModelMesh intelligently loads and unloads AI models to and from memory to strike an intelligent trade-off between responsiveness to users and computational footprint.

Why KServe?

- KServe is a standard Model Inference Platform on Kubernetes, built for highly scalable use cases.
- Provides performant, standardized inference protocol across ML frameworks.
- Support modern serverless inference workload with Autoscaling including Scale to Zero on GPU.
- Provides high scalability, density packing and intelligent routing using ModelMesh
- Simple and Pluggable production serving for production ML serving including prediction, pre/post processing, monitoring and explainability.
- Advanced deployments with canary rollout, experiments, ensembles and transformers.

KServe runs on Kubernetes. It requires etcd, S3 storage and optionally Knative and Istio.

![image](/assets/img/2022/11/kserve_layer.png)

The video [Exploring ML Model Serving with KServe](https://www.youtube.com/watch?v=FX6naJLaq2Y) provides a good introduction and overview.

**Deploying Watson NLP Models to KServe ModelMesh**

There is a [tutorial](https://github.com/ibm-build-lab/Watson-NLP/blob/main/MLOps/Deploy-to-KServe-ModelMesh-Serving/README.md) that provides detailed instructions how to deploy NLP models to KServe. For IBM partners there is also a test environment available. Below are the key steps of the tutorial.

First you need to store predefined or custom Watson NLP models on some S3 complianted cloud object storage. The test environment uses Minio which can be installed in your own clusters. Via the Minio CLI models can be uploaded to buckets. If you use IBM’s Cloud Object Storage, make sure to use the HMAC credentials.

Next you define an instance of the custom resource definition InferenceService per model. In this definition you refer to your model in S3.

```
kubectl create -f - <<EOF
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: $NAME
  annotations:
    serving.kserve.io/deploymentMode: ModelMesh
spec:
  predictor:
    model:
      modelFormat:
        name: watson-nlp
      storage:
        path: $PATH_TO_MODEL
        key: $BUCKET
        parameters:
          bucket: $BUCKET
EOF
```

To get the endpoints, invoke this command.

```
$ kubectl get inferenceservice
ensemble-classification-wf-en-emotion-stock-predictor   grpc://modelmesh-serving.ibmid-6620037hpc-669mq7e2:8033
sentiment-document-cnn-workflow-en-stock-predictor      grpc://modelmesh-serving.ibmid-6620037hpc-669mq7e2:8033
syntax-izumo-en-stock-predictor                         grpc://modelmesh-serving.ibmid-6620037hpc-669mq7e2:8033
```

To invoke Watson NLP from local code or via commands, forward the port.

```
kubectl port-forward service/modelmesh-serving 8085:8033
```

Next you need to get the proto files. You can download them from a repo and copy them from the runtime image.

```
$ git clone https://github.com/IBM/ibm-watson-embed-clients
$ cd watson_nlp/protos
or
$ kubectl exec deployment/modelmesh-serving-watson-nlp-runtime -c watson-nlp-runtime -- jar cM -C /app/protos . | jar x
```

The [watson-automation](https://github.com/ibm/watson-automation#grpc) repo shows a little example how to invoke Watson NLP functionality via gRPC.

**Installing KServe ModelMesh Serving**

See the [KServe ModelMesh Serving installation instructions](https://github.com/kserve/modelmesh-serving/blob/release-0.8/docs/install/install-script.md) for detailed instructions on how to install KServe with ModelMesh onto your cluster. You need to install etcd, S3, KServe and optionally Istio. Unfortunately there is no operator yet, but a script is provided.

To deploy Watson NLP on KServe, a [ServingRuntime](https://www.ibm.com/docs/en/watson-libraries?topic=containers-run-kubernetes-kserve-modelmesh-serving) instance needs to be defined and applied. A serving runtime is a template for a pod that can serve one or more particular model formats. Apply the following sample to create a simple serving runtime for Watson NLP models:

```
apiVersion: serving.kserve.io/v1alpha1
kind: ServingRuntime
metadata:
  name: watson-nlp-runtime
spec:
  containers:
  - env:
      - name: ACCEPT_LICENSE
        value: "true"
      - name: LOG_LEVEL
        value: info
      - name: CAPACITY
        value: "1000000000"
      - name: DEFAULT_MODEL_SIZE
        value: "500000000"
    image: cp.icr.io/cp/ai/watson-nlp-runtime:1.0.20
    imagePullPolicy: IfNotPresent
    name: watson-nlp-runtime
    resources:
      limits:
        cpu: 2
        memory: 16Gi
      requests:
        cpu: 1
        memory: 16Gi
  grpcDataEndpoint: port:8085
  grpcEndpoint: port:8085
  multiModel: true
  storageHelper:
    disabled: false
  supportedModelFormats:
    - autoSelect: true
      name: watson-nlp
```

To find out more about Watson NLP and Watson for Embed in general, check out these resources:

- [IBM Watson NLP Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [IBM Watson NLP Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson NLP in Minikube]({{ "/article/running-ibm-watson-nlp-in-minikube/" | relative_url }})