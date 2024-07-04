---
id: 5378
title: 'Building custom IBM Watson NLP Images'
date: '2022-11-23T13:45:24+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5378'
permalink: /article/building-custom-ibm-watson-nlp-images-models/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/building-custom-ibm-watson-nlp-images-models/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post describes how to package custom models in container images for deployments.*

To set some context, check out the landing page [IBM Watson NLP Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing). The Watson NLP containers can be run on different container platforms, they provide REST and gRCP interfaces, they can be extended with custom models and they can easily be embedded in solutions. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Watson Assistant and NLU (Natural Language Understanding) SaaS services and IBM Cloud Pak for Data.

To try it, a [trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/signup?formid=urx-51726).

**Downloading trained Models**

My post [Training IBM Watson NLP Models]({{ "/article/training-ibm-watson-nlp-models/" | relative_url }}) explains how to train Watson NLP based models with notebooks in Watson Studio. After the training models can be saved as file asset in the Watson Studio project and they can be downloaded.

```
project.save_data('ensemble_model', data=ensemble_model.as_file_like_object(), overwrite=True)
```

![image](/assets/img/2022/11/Screenshot-2022-11-17-at-14.35.05.png)

The models are typically stored locally a directory ‘models’. The directory can contain the zipped file with or without ‘.zip’ extension. The zip file can also be extracted. The name of the file (or directory name when extracted) is the model id which you’ll need later to refer to it.

There are three ways to build deploy Watson NLP and models.

1. Standalone containers: One pod with one container including the NLP runtime and the models
2. Init containers for models: One pod with one NLP runtime container and one init container per model
3. Cloud object storage for models and kServe (not covered in this post)

**Building Standalone Images with custom Models**

The easiest way is to put everything in one image.

```
$ docker login cp.icr.io --username cp --password <entitlement_key> 
```

The following Dockerfile extends the runtime image with a local copy of the model(s).

```
ARG WATSON_RUNTIME_BASE="cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18"
FROM ${WATSON_RUNTIME_BASE} as base
ENV LOCAL_MODELS_DIR=/app/models
ENV ACCEPT_LICENSE=true
COPY models /app/models
```

The following commands build the image and run the container.

```
$ docker build . -t watson-nlp-custom-container:v1
$ docker run -d -e ACCEPT_LICENSE=true -p 8085:8085 watson-nlp-custom-container:v1
```

**Building Standalone Images with predefined Models**

Similarly to custom models, predefined models can be put in a standalone image. Predefined Watson NLP models are available in the IBM image registry as init container images. When these containers are run normally, they will invoke an unpack\_model.sh script. The following Dockerfile shows how to download the images with models and how to put the models into the directory where the runtime container expects them.

```
ARG WATSON_RUNTIME_BASE="cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18"
ARG SENTIMENT_MODEL="cp.icr.io/cp/ai/watson-nlp_sentiment_aggregated-cnn-workflow_lang_en_stock:1.0.6"
ARG EMOTION_MODEL="cp.icr.io/cp/ai/watson-nlp_classification_ensemble-workflow_lang_en_tone-stock:1.0.6"

FROM ${SENTIMENT_MODEL} as model1
RUN ./unpack_model.sh

FROM ${EMOTION_MODEL} as model2
RUN ./unpack_model.sh

FROM ${WATSON_RUNTIME_BASE} as release

RUN true && \
    mkdir -p /app/models

ENV LOCAL_MODELS_DIR=/app/models
COPY --from=model1 app/models /app/models
COPY --from=model2 app/models /app/models
```

**Building Model Images for Init Containers**

Custom models can also be put in init container images. A Python tool is provided to do this.

```
$ python3 -m venv client-env
$ source client-env/bin/activate
$ pip install watson-embed-model-packager
$ python3 -m watson_embed_model_packager setup --library-version watson_nlp:3.2.0 --local-model-dir models --output-csv ./customer-complaints.csv
$ python3 -m watson_embed_model_packager build --config customer-complaints.csv
$ docker tag watson-nlp_ensemble_model:v1 <REGISTRY>/<NAMESPACE>/watson-nlp_ensemble_model:v1
$ docker push <REGISTRY>/<NAMESPACE>/watson-nlp_ensemble_model:v1
```

To find out more about Watson NLP and Watson for Embed in general, check out these resources:

- [IBM Watson NLP Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home)
- [IBM Watson NLP Model catalog](https://www.ibm.com/docs/en/watson-libraries?topic=models-catalog)
- [IBM Watson NLP Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726)
- [IBM Watson NLP Entitlement Key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)
- [Automation for Watson NLP Deployments](https://github.com/IBM/watson-automation)
- [Running IBM Watson NLP locally in Containers]({{ "/article/running-ibm-watson-nlp-locally-in-containers/" | relative_url }})
- [Running IBM Watson NLP in Minikube]({{ "/article/running-ibm-watson-nlp-in-minikube/" | relative_url }})