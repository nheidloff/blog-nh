---
id: 5421
title: 'Deploying Watson NLP to IBM Code Engine'
date: '2022-11-29T00:54:08+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5421'
permalink: /article/deploying-watson-nlp-to-ibm-code-engine/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-watson-nlp-to-ibm-code-engine/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post describes how to deploy and run Watson NLP on the serverless offering IBM Code Engine.*

To set some context, check out the landing page [IBM Watson NLP Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing). The Watson NLP containers can be run on different container platforms, they provide REST and gRCP interfaces, they can be extended with custom models and they can easily be embedded in solutions. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Watson Assistant and NLU (Natural Language Understanding) SaaS services and IBM Cloud Pak for Data.

To try it, a [trial](https://www.ibm.com/products/ibm-watson-natural-language-processing) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/signup?formid=urx-51726).

**Step by Step Instructions**

First a custom image needs to be built which includes the NLP runtime and a list of models.

```
$ docker login cp.icr.io --username cp --password <your-entitlement-key>
$ mkdir models
$ docker run -it --rm -e ACCEPT_LICENSE=true -v `pwd`/models:/app/models cp.icr.io/cp/ai/watson-nlp_syntax_izumo_lang_en_stock:1.0.7
$ ls -la models 
$ cat <<EOF >>Dockerfile
FROM cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18
COPY models /app/models
EOF
$ docker build . -t my-watson-nlp-runtime:latest
```

Next the custom image is pushed to a registry, in this case the IBM Container Registry.

```
$ ibmcloud plugin install cr
$ ibmcloud login --sso
$ ibmcloud cr region-set global
$ ibmcloud cr namespace-add watson-nlp-demo
$ ibmcloud cr login
$ docker tag my-watson-nlp-runtime:latest icr.io/watson-nlp-demo/my-watson-nlp-runtime:latest
$ docker push icr.io/watson-nlp-demo/my-watson-nlp-runtime:latest
```

After this the Code Engine project is created.

```
$ ibmcloud plugin install code-engine
$ ibmcloud target -r us-south -g default
$ ibmcloud ce project create --name watson-nlp-demo
$ ibmcloud ce project select --name watson-nlp-demo
```

To access the container registry from Code Engine, a secret is created. This can be done manually or programmatically.

- [ibmcloud CLI documentation](https://cloud.ibm.com/docs/codeengine?topic=codeengine-cli#cli-secret-create)
- [Manual instructions](https://github.com/ibm-build-lab/Watson-NLP/blob/main/MLOps/Deploy-to-Code-Engine/README.md#step-14-create-a-code-engine-managed-secret-from-the-ibm-cloud-web-console)

Finally the serverless application can be created.

```
$ ibmcloud ce application create \
  --name watson-nlp-runtime \
  --port 8080 \
  --min-scale 1 --max-scale 2 \
  --cpu 2 --memory 4G \
  --image private.icr.io/watson-nlp-demo/my-watson-nlp-runtime:latest \
  --registry-secret ce-auto-icr-private-global \
  --env ACCEPT_LICENSE=true
$ ibmcloud ce app list
$ ibmcloud ce app logs --application watson-nlp-runtime
$ ibmcloud ce app events --application watson-nlp-runtime
$ curl -X POST "https://watson-nlp-runtime.vl0podgeqyi.us-south.codeengine.appdomain.cloud/v1/watson.runtime.nlp.v1/NlpService/SyntaxPredict" \
  -H "accept: application/json" \
  -H "grpc-metadata-mm-model-id: syntax_izumo_lang_en_stock" \
  -H "content-type: application/json" \
  -d " { \"rawDocument\": { \"text\": \"It is so easy to embed Watson NLP in applications. Very cool.\" }}"
```

![image](/assets/img/2022/11/Screenshot-2022-11-22-at-08.50.03.png)

To find out more about Watson NLP and Watson for Embed in general, check out these resources:

- [IBM Watson NLP Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [IBM Watson NLP Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson NLP in Minikube]({{ "/article/running-ibm-watson-nlp-in-minikube/" | relative_url }})