---
id: 5255
title: 'Running IBM Watson Speech to Text in Containers'
date: '2022-11-08T08:46:03+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5255'
permalink: /article/running-ibm-watson-speech-to-text-in-containers/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-ibm-watson-speech-to-text-in-containers/
categories:
    - Articles
---

*IBM announced the general availability of Watson NLP and Watson Speech containers which can be run locally, on-premises or Kubernetes and OpenShift clusters. This post describes how to run Speech to Text (STT) locally.*

To set some context, here are the descriptions of [IBM Watson Speech Libraries for Embed](https://www.ibm.com/products/watson-speech-embed-libraries) and the Watson Speech to Text library.

> Build your applications with enterprise-grade speech technology: IBM Watson Speech Libraries for Embed are a set of containerized text-to-speech and speech-to-text libraries designed to offer our IBM partners greater flexibility to infuse the best of IBM Research technology into their solutions. Now available as embeddable AI, partners gain greater capabilities to build voice transcription and voice synthesis applications more quickly and deploy them in any hybrid multi-cloud environment.

> Watson STT library uses natural language AI technology to understand the human voice and turn it into usable, searchable text. As an embeddable AI library, developers have greater access to the best of IBM Watson Speech technology and IBM Research algorithms to build voice transcription and voice synthesis applications faster: 1. Accuracy out-of-box with advanced training techniques. 2. Customization tools to tailor the models for your specific domain.

The Watson Speech to Text library is available as containers providing REST and WebSockets interfaces. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Cloud SaaS service STT and IBM Cloud Pak for Data. STT is a speech recognition service that offers functionalities like text recognition, audio preprocessing, noise removal, background noise separation, semantic sentence conversation, and how many speakers are in conversions.

To try it, a [trial](https://www.ibm.com/products/watson-speech-embed-libraries) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726).

**How to run STT locally via Docker**

To run STT as container, the container image needs to be built first. Different [speech models](https://www.ibm.com/docs/en/watson-libraries?topic=wtsleh-models-catalog) are provided for different languages and different voices. There is a [sample](https://github.com/ibm-build-lab/Watson-Speech/tree/main/single-container-stt) that describes how to run STT with two speech models [locally](https://www.ibm.com/docs/en/watson-libraries?topic=rc-run-docker-run-1).

In a first terminal execute these commands to build and run the container:

```
$ docker login cp.icr.io --username cp --password <entitlement_key>                                          
$ git clone https://github.com/ibm-build-lab/Watson-Speech.git
$ cd Watson-Speech/single-container-stt      
$ docker build . -t speech-standalone
$ docker run -e ACCEPT_LICENSE=true --rm --publish 1080:1080 speech-standalone
```

In second terminal invoke these commands to invoke a REST API:

```
$ cd Watson-Speech/single-container-stt
$ curl "http://localhost:1080/speech-to-text/api/v1/recognize" \
  --header "Content-Type: audio/wav" \
  --data-binary @sample_dataset/en-quote-1.wav
```

Here is a screenshot of the container in action:

![image](/assets/img/2022/11/Screenshot-2022-11-09-at-09.02.18.png)

To define which models you want to put in your image, a multi stage [Dockerfile](https://github.com/ibm-build-lab/Watson-Speech/blob/main/single-container-stt/Dockerfile) is used.

```
# Model images
FROM cp.icr.io/cp/ai/watson-stt-generic-models:1.0.0 as catalog
# Add additional models here
FROM cp.icr.io/cp/ai/watson-stt-en-us-multimedia:1.0.0 as en-us-multimedia
FROM cp.icr.io/cp/ai/watson-stt-fr-fr-multimedia:1.0.0 as fr-fr-multimedia

# Base image for the runtime
FROM cp.icr.io/cp/ai/watson-stt-runtime:1.0.0 AS runtime

# Environment variable used for directory where configurations are mounted
ENV CONFIG_DIR=/opt/ibm/chuck.x86_64/var

# Copy in the catalog and runtime configurations
COPY --chown=watson:0 --from=catalog catalog.json ${CONFIG_DIR}/catalog.json
COPY --chown=watson:0 ./${LOCAL_DIR}/* ${CONFIG_DIR}/

# Intermediate image to populate the model cache
FROM runtime as model_cache

# Copy model archives from model images
RUN sudo mkdir -p /models/pool2
# For each additional models, copy the line below with the model image
COPY --chown=watson:0 --from=en-us-multimedia model/* /models/pool2/
COPY --chown=watson:0 --from=fr-fr-multimedia model/* /models/pool2/

# Run script to initialize the model cache from the model archives
COPY ./prepareModels.sh .
RUN ./prepareModels.sh

# Final runtime image with models baked in
FROM runtime as release

COPY --from=model_cache ${CONFIG_DIR}/cache/ ${CONFIG_DIR}/cache/
```

To find out more about Watson Speech to Text, check out these resources:

- [Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-text-speech-library-embed-home)
- [Model catalog](https://www.ibm.com/docs/en/watson-libraries?topic=wtsleh-models-catalog)
- [SaaS model catalog](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models)
- [SaaS API docs](https://cloud.ibm.com/apidocs/speech-to-text)
- [Trial](https://www.ibm.com/products/watson-speech-embed-libraries)
- [Entitlement key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)