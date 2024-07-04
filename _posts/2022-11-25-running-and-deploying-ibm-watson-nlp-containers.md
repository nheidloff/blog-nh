---
id: 5407
title: 'Running and Deploying IBM Watson NLP Containers'
date: '2022-11-25T07:15:48+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5407'
permalink: /article/running-and-deploying-ibm-watson-nlp-containers/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-and-deploying-ibm-watson-nlp-containers/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post describes different options how to run and deploy Watson NLP.*

To set some context, check out the landing page [IBM Watson NLP Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing). The Watson NLP containers can be run on different container platforms, they provide REST and gRCP interfaces, they can be extended with custom models and they can easily be embedded in solutions. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Watson Assistant and NLU (Natural Language Understanding) SaaS services and IBM Cloud Pak for Data.

There are multiple options how to run and deploy Watson NLP:

- [Locally via container engines like Docker or Podman]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Deployments to Kubernetes (or OpenShift and Minikube) via Helm chart]({{ "/article/running-ibm-watson-nlp-in-minikube/" | relative_url }})
- [Deployments to Kubernetes/OpenShift via TechZone Deployer (Terraform and ArgoCD)]({{ "/article/setting-up-openshift-and-applications-in-one-hour/" | relative_url }})
- Deployments to Kubernetes via kubectl and yaml files (focus of this post)
- [Deployments to Kubernetes and KServe ModelMesh Serving](https://www.ibm.com/docs/en/watson-libraries?topic=containers-run-kubernetes-kserve-modelmesh-serving)

To run Watson NLP two components are needed:

- Watson NLP runtime: Executes the core functionality and provides REST and gRPC interfaces.
- Models: Predefined or custom models are stored in a directory/volume that the runtime can access. The models can be copied there manually, init containers can be used or they can be downloaded from cloud object storage.

There are different ways to package these two components up in containers. Read the post [Building custom IBM Watson NLP Images]({{ "/article/building-custom-ibm-watson-nlp-images-models/" | relative_url }}) for details.

**Deployments to Kubernetes via kubectl and yaml files**

Via kubectl or oc [Kubernetes resources](https://github.com/nheidloff/watson-embed-demos/blob/main/nlp/kubernetes/deployment.yaml) can be deployed. The Watson NLP pod contains the NLP runtime container and potentially multiple init containers. Each init container contains either [predefined](https://www.ibm.com/docs/en/watson-libraries?topic=models-catalog) or custom models.

```
initContainers:
- name: ensemble-model
  image: cp.icr.io/cp/ai/watson-nlp_syntax_izumo_lang_en_stock:1.0.7
  volumeMounts:
  - name: model-directory
    mountPath: "/app/models"
  env:
  - name: ACCEPT_LICENSE
    value: 'true'
```

```
containers:
- name: watson-nlp-runtime
  image: cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18
  env:
  - name: ACCEPT_LICENSE
    value: 'true'
  - name: LOCAL_MODELS_DIR
    value: "/app/models"
```

To deploy the Kubernetes resources, the following commands need to be executed.

```
$ kubectl create namespace watson-demo
$ kubectl config set-context --current --namespace=watson-demo
$ kubectl create secret docker-registry \
--docker-server=cp.icr.io \
--docker-username=cp \
--docker-password=<your IBM Entitlement Key> \
-n watson-demo \
ibm-entitlement-key
$ git clone https://github.com/nheidloff/watson-embed-demos.git
$ kubectl apply -f watson-embed-demos/nlp/kubernetes/
$ kubectl get pods --watch
$ kubectl get svc
$ kubectl port-forward svc/watson-nlp-runtime-service 8080
```

In the second terminal the REST API can be invoked.

```
$ curl -X POST "http://localhost:8080/v1/watson.runtime.nlp.v1/NlpService/SyntaxPredict" \
  -H "accept: application/json" \
  -H "grpc-metadata-mm-model-id: syntax_izumo_lang_en_stock" \
  -H "content-type: application/json" \
  -d " { \"rawDocument\": { \"text\": \"It is so easy to embed Watson NLP in applications. Very cool.\" }}"
```

To see and run other REST APIs, the Swagger (OpenAPI) user interface can be opened: http://localhost:8080/swagger.

![image](/assets/img/2022/11/Screenshot-2022-11-18-at-08.08.49.png)

To find out more about Watson NLP and Watson for Embed in general, check out these resources:

- [IBM Watson NLP Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [IBM Watson NLP Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson NLP in Minikube]({{ "/article/running-ibm-watson-nlp-in-minikube/" | relative_url }})