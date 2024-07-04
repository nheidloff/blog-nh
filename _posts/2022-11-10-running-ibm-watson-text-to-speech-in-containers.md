---
id: 5277
title: 'Running IBM Watson Text to Speech in Containers'
date: '2022-11-10T13:07:43+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5277'
permalink: /article/running-ibm-watson-text-to-speech-in-containers/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-ibm-watson-text-to-speech-in-containers/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and WebSockets APIs AI can easily be embedded in applications. This post describes how to run Watson Text to Speech locally.*

To set some context, here are the descriptions of [IBM Watson Speech Libraries for Embed](https://www.ibm.com/products/watson-speech-embed-libraries) and the Watson Text to Speech (TTS) library.

> Build your applications with enterprise-grade speech technology: IBM Watson Speech Libraries for Embed are a set of containerized text-to-speech and speech-to-text libraries designed to offer our IBM partners greater flexibility to infuse the best of IBM Research technology into their solutions. Now available as embeddable AI, partners gain greater capabilities to build voice transcription and voice synthesis applications more quickly and deploy them in any hybrid multi-cloud environment.

> The Watson TTS library converts written text into natural-sounding voice in a variety of languages for real-time speech synthesis. Offered as a containerized library, developers can build applications quickly with interoperable and production scalable components to run their speech tasks anywhere.

The Watson Text to Speech library is available as containers providing REST and WebSockets interfaces. While this offering is new, the underlaying functionality has been used and optimized for a long time in IBM offerings like the IBM Cloud SaaS service for TTS and IBM Cloud Pak for Data.

To try it, a [trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51754) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726).

**How to run TTS locally via Docker**

To run STT as container, the container image needs to be built first. Different [models](https://www.ibm.com/docs/en/watson-libraries?topic=home-models-catalog) are provided for different languages and use cases. There is a [sample](https://github.com/ibm-build-lab/Watson-Speech/tree/main/single-container-tts) that describes how to run TTS with two speech models [locally](https://www.ibm.com/docs/en/watson-libraries?topic=rc-run-docker-run).

In a first terminal execute these commands to build and run the container:

```
$ docker login cp.icr.io --username cp --password <entitlement_key>                                          
$ git clone https://github.com/ibm-build-lab/Watson-Speech.git
$ cd Watson-Speech/single-container-tts    
$ docker build . -t tts-standalone
$ docker run --rm -it --env ACCEPT_LICENSE=true --publish 1080:1080 tts-standalone
```

In second terminal invoke these commands to invoke a REST API:

```
$ cd Watson-Speech/single-container-stt
$ curl "http://localhost:1080/text-to-speech/api/v1/synthesize" \
  --header "Content-Type: application/json" \
  --data '{"text":"Hello world"}' \
  --header "Accept: audio/wav" \
  --output output.wav
$ ls -la
$ curl "http://localhost:1080/text-to-speech/api/v1/voices"
```

Here is a screenshot of the container in action:

![image](/assets/img/2022/11/Screenshot-2022-11-10-at-13.43.23.png)

To define which models you want to put in your image, a multi stage [Dockerfile](https://github.com/ibm-build-lab/Watson-Speech/blob/main/single-container-tts/Dockerfile) is used.

```
# Model images
FROM cp.icr.io/cp/ai/watson-tts-generic-models:1.0.0 AS catalog
# Add additional models here
FROM cp.icr.io/cp/ai/watson-tts-en-us-michaelv3voice:1.0.0 AS en-us-voice
FROM cp.icr.io/cp/ai/watson-tts-fr-ca-louisev3voice:1.0.0 AS fr-ca-voice

# Base image for the runtime
FROM cp.icr.io/cp/ai/watson-tts-runtime:1.0.0 AS runtime

# Environment variable used for directory where configurations are mounted
ENV CONFIG_DIR=/opt/ibm/chuck.x86_64/var

# Copy in the catalog and runtime configurations
COPY --chown=watson:0 --from=catalog catalog.json ${CONFIG_DIR}/catalog.json
COPY --chown=watson:0 ./config/* ${CONFIG_DIR}/

# Intermediate image to populate the model cache
FROM runtime as model_cache

# Copy model archives from model images
RUN sudo mkdir -p /models/pool2

# For each additional models, copy the line below with the model image
COPY --chown=watson:0 --from=en-us-voice model/* /models/pool2/
COPY --chown=watson:0 --from=fr-ca-voice model/* /models/pool2/

# Run script to initialize the model cache from the model archives
COPY ./prepareModels.sh .

RUN ./prepareModels.sh

# Final runtime image with models baked in
FROM runtime as release

COPY --from=model_cache ${CONFIG_DIR}/cache/ ${CONFIG_DIR}/cache/
```

To find out more about Watson Text to Speech, check out these resources:

- [Documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-text-speech-library-embed-home)
- [Model catalog](https://www.ibm.com/docs/en/watson-libraries?topic=home-models-catalog)
- [SaaS API docs](https://cloud.ibm.com/apidocs/text-to-speech)
- [Trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51754)
- [Entitlement key](https://www.ibm.com/account/reg/us-en/subscribe?formid=urx-51726)