---
id: 5343
title: 'Running IBM Watson Text To Speech in Minikube'
date: '2022-11-18T00:06:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5343'
permalink: /article/running-ibm-watson-text-to-speech-in-minikube/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-ibm-watson-text-to-speech-in-minikube/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and WebSockets APIs AI can easily be embedded in applications. This post describes how to run Watson Text To Speech locally in Minikube.*

To set some context, check out the landing page [IBM Watson Speech Libraries for Embed](https://www.ibm.com/products/watson-speech-embed-libraries).

The Watson Text to Speech library is available as containers providing REST and WebSockets interfaces. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Cloud SaaS service for TTS and IBM Cloud Pak for Data.

To try it, a [trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51754) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726).

**How to run TTS locally via Minikube**

My post [Running IBM Watson Text to Speech in Containers]({{ "/article/running-ibm-watson-text-to-speech-in-containers/" | relative_url }}) explained how to run Watson TTS locally in Docker. The instructions below describe how to deploy Watson Text To Speech locally to Minikube via kubectl and yaml files.

First you need to install Minikube, for example via brew on MacOS. Next Minikube needs to be started with more memory and disk size than the Minikube defaults. I’ve used the settings below which is more than required, but I wanted to leave space for other applications. Note that you also need to give your container runtime more resources. For example if you use Docker Desktop, navigate to Preferences-Resources to do this.

```
$ brew install minikube 
$ minikube start --cpus 12 --memory 16000 --disk-size 50g
```

The namespace and secret need to be created.

```
$ kubectl create namespace watson-demo
$ kubectl config set-context --current --namespace=watson-demo
$ kubectl create secret docker-registry \
--docker-server=cp.icr.io \
--docker-username=cp \
--docker-password=<your IBM Entitlement Key> \
-n watson-demo \
ibm-entitlement-key
```

Clone a repo with the Kubernetes yaml files to deploy Watson Text To Speech.

```
$ git clone https://github.com/nheidloff/watson-embed-demos.git
$ kubectl apply -f watson-embed-demos/minikube-text-to-speech/kubernetes/
$ kubectl get pods --watch
```

To use other speech models, modify [deployment.yaml](https://github.com/nheidloff/watson-embed-demos/blob/04c52d563039b10a86fdb25b8effe8ddf2d1e948/minikube-text-to-speech/kubernetes/deployment.yaml#L48-L68).

```
- name: watson-tts-en-us-allisonv3voice
  image: cp.icr.io/cp/ai/watson-tts-en-us-allisonv3voice:1.0.0
  args:
  - sh
  - -c
  - cp model/* /models/pool2
  env:
  - name: ACCEPT_LICENSE
    value: "true"
  resources:
    limits:
      cpu: 1
      ephemeral-storage: 1Gi
      memory: 1Gi
    requests:
      cpu: 100m
      ephemeral-storage: 1Gi
      memory: 256Mi
  volumeMounts:
  - name: models
    mountPath: /models/pool2
```

When you open the Kubernetes Dashboard (via ‘minikube dashboard’), you’ll see the deployed resources. The pod contains the runtime container and four init containers (two specific voice models, a generic model and a utility container).

![image](/assets/img/2022/11/Screenshot-2022-11-16-at-08.44.05.png)

To invoke Watson Text To Speech, port forwarding can be used.

```
$ kubectl port-forward svc/ibm-watson-tts-embed 1080
```

The result of the curl command will be written to output.wav.

```
$ curl "http://localhost:1080/text-to-speech/api/v1/synthesize" \
   --header "Content-Type: application/json" \
   --data '{"text":"Hello world"}' \
   --header "Accept: audio/wav" \
   --output output.wav
```

To find out more about Watson Text To Speech and Watson for Embed in general, check out these resources:

- [Watson Text To Speech Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-text-speech-library-embed-home)
- [Watson Text To Speech Model Catalog](https://www.ibm.com/docs/en/watson-libraries?topic=home-models-catalog)
- [Watson Text To Speech SaaS API docs](https://cloud.ibm.com/apidocs/text-to-speech)
- [Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51754)
- [Entitlement key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson Speech to Text in Containers]({{ "/article/running-ibm-watson-speech-to-text-in-containers/" | relative_url }})
- [Running IBM Watson Text to Speech in Containers]({{ "/article/running-ibm-watson-text-to-speech-in-containers/" | relative_url }})