---
id: 5328
title: 'Running IBM Watson NLP in Minikube'
date: '2022-11-16T00:26:04+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5328'
permalink: /article/running-ibm-watson-nlp-in-minikube/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-ibm-watson-nlp-in-minikube/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post describes how to run Watson NLP locally in Minikube.*

To set some context, check out the landing page [IBM Watson NLP Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing). The Watson NLP containers can be run on different container platforms, they provide REST and gRCP interfaces, they can be extended with custom models and they can easily be embedded in solutions.

To try it, a [trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/signup?formid=urx-51726).

**How to run NLP locally in Minikube**

My post [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }}) explained how to run Watson NLP locally in Docker. The instructions below describe how to deploy Watson NLP locally to Minikube via the [Watson NLP Helm chart](https://github.com/IBM/watson-automation/blob/90e61e05a5d0eacd268c97fc3c8b67e285c99241/documentation/NLPHelmChart.md).

First you need to install Minikube, for example via brew on MacOS. Next Minikube needs to be started with more memory and disk size than the Minikube defaults. I’ve used the settings below which is more than required, but I wanted to leave space for other applications. Note that you also need to give your container runtime more resources. For example if you use Docker Desktop, go to Preferences-Resources and define your settings.

```
$ brew install minikube 
$ minikube start --cpus 12 --memory 16000 --disk-size 50g
```

For some reason in my setup the watson-nlp-runtime image couldn’t be pulled by the Deployment resource/operator. I guess it’s related to the big size of the image. I’ve found this workaround:

```
$ eval $(minikube docker-env)
$ docker login cp.icr.io --username cp --password <entitlement_key> 
$ docker pull cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18
```

Next the namespace and secret need to be created.

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

After this a repo with the Helm chart and another repo with a sample [values.yaml](https://github.com/IBM/watson-automation/blob/94f28f12a58608f7b7fe355d36f101ddf7cd8cb8/helm-nlp/values.yaml) file are cloned and the license needs to be accepted.

```
$ git clone https://github.com/cloud-native-toolkit/terraform-gitops-watson-nlp
$ git clone https://github.com/IBM/watson-automation.git
$ code watson-automation/helm-nlp/values.yaml #change acceptLicense to true
$ cp watson-automation/helm-nlp/values.yaml terraform-gitops-watson-nlp/chart/watson-nlp/values.yaml
```

```
componentName: watson-nlp
acceptLicense: true
serviceType: ClusterIP
imagePullSecrets:
  - ibm-entitlement-key
registries:
  - name: watson
    url: cp.icr.io/cp/ai
runtime:
  registry: watson
  image: watson-nlp-runtime:1.0.18
models:
  - registry: watson
    image: watson-nlp_syntax_izumo_lang_en_stock:1.0.7
```

Finally the chart can be installed.

```
$ cd terraform-gitops-watson-nlp/chart/watson-nlp
$ helm install -f values.yaml watson-embedded .
$ kubectl get pods -n watson-demo --watch
$ kubectl get deployment/watson-embedded-watson-nlp -n watson-demo
$ kubectl get svc/watson-embedded-watson-nlp -n watson-demo
```

When you open the Kubernetes Dashboard (via ‘minikube dashboard’), you’ll see the deployed resources. The Watson NLP pod contains the watson-nlp-runtime container and a simple syntax model container.

![image](/assets/img/2022/11/Screenshot-2022-11-15-at-08.56.39.png)

![image](/assets/img/2022/11/Screenshot-2022-11-15-at-08.57.27.png)

To invoke Watson NLP via REST, you need to find out the IP address and port. Alternatively you could use port forwarding.

```
$ minikube service watson-embedded-watson-nlp -n watson-demo --url
$ curl -X POST "http://<ip-and-port>/v1/watson.runtime.nlp.v1/NlpService/SyntaxPredict" \
  -H "accept: application/json" \
  -H "grpc-metadata-mm-model-id: syntax_izumo_lang_en_stock" \
  -H "content-type: application/json" \
  -d " { \"rawDocument\": { \"text\": \"It is so easy to embed Watson NLP in applications. Very cool.\" }}"
```

The NLP containers also provides a [gRCP interface](https://github.com/IBM/watson-automation#grpc).

To find out more about Watson NLP, check out these resources:

- [Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [Model catalog](https://www.ibm.com/docs/en/watson-libraries?topic=models-catalog)
- [Trial](https://www.ibm.com/products/ibm-watson-natural-language-processing)
- [Entitlement key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson Speech to Text in Containers]({{ "/article/running-ibm-watson-speech-to-text-in-containers/" | relative_url }})
- [Running IBM Watson Text to Speech in Containers]({{ "/article/running-ibm-watson-text-to-speech-in-containers/" | relative_url }})