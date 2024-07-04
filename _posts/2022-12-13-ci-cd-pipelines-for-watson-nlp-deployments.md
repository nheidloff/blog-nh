---
id: 5525
title: 'CI/CD Pipelines for Watson NLP Deployments'
date: '2022-12-13T00:37:49+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5525'
permalink: /article/ci-cd-pipelines-for-watson-nlp-deployments/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ci-cd-pipelines-for-watson-nlp-deployments/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) containers can be run everywhere and they provide APIs to be embedded in applications. This post explains how Watson NLP containers including AI models can be deployed via CI/CD pipelines.*

Automation is key for CI/CD which includes building images, managing versions, tracking changes and the actual deployments to various environments. In the context of Watson NLP this means that not only the Watson NLP runtime, but also custom models need to follow the same process.

There are different options to package the Watson NLP runtime and models:

1. Everything in one image including runtime, stock models and custom models
2. Pod with one runtime container and one init container per model (for stock and custom models)
3. KServe ServingRuntime with one runtime container; stock and custom models are stored on S3

(1) is for simpler deployments with one or few models, (3) for highly scalable workloads and lots of models. The focus of this post is (2) in which case every model is stored in one init container.

The post [Building custom IBM Watson NLP Images]({{ "/article/building-custom-ibm-watson-nlp-images-models/" | relative_url }}) describes how to use the [watson-embed-model-packager](https://github.com/IBM/ibm-watson-embed-model-builder) Python tool to create images for models. However, this tool might not be what you want to use in CI/CD pipelines. At this point the tool also requires Docker.

The repo of the tool also shows how to simply use a Dockerfile instead so that other container technologies can be used and so that images can be built in the more usual scripted way.

Let’s take a look at the key parts of the [Dockerfile](https://github.com/IBM/ibm-watson-embed-model-builder/blob/main/watson_embed_model_packager/resources/local.dockerfile).

- Two stages which both use UBI are used to optimize the runtime image.
- The unzipped model is copied, then zipped and then unzipped again to handle access rights.
- When the container starts, the image files are stored in /app/models.

```
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest as build
RUN true && \
    microdnf update -y && \
    microdnf install -y which zip findutils openssl util-linux jq && \
    /copy_bin_with_libs.sh openssl && \
    ...
ARG MODEL_PATH
ARG MODEL_DEST
COPY ${MODEL_PATH} ${MODEL_DEST}
RUN true && \
    cd / && \
    mv $(dirname ${MODEL_DEST})/* . && \
    cd $(basename ${MODEL_DEST}) && \
    zip -r /model.zip * && \
    chmod 444 /model.zip && \
    true
COPY unpack_model.sh /unpack_model.sh
RUN chmod 555 /unpack_model.sh

FROM registry.access.redhat.com/ubi9/ubi-micro:latest as release
ARG MODEL_NAME
ENV MODEL_ROOT_DIR="/app/models"
ENV MODEL_NAME=$MODEL_NAME
...
WORKDIR /app
RUN chmod -R ugo+rw /app/
COPY --from=build /model.zip /app/model.zip
COPY --from=build /unpack_model.sh /app/unpack_model.sh
USER 1001:0
ENTRYPOINT /app/unpack_model.sh
```

In my [text classification sample](https://github.com/nheidloff/text-classification-watson-nlp#step-5-deploy-to-minikube) I’ve used this mechanism to build an image with the custom classification model that had been trained via Watson NLP and Watson Studio.

```
WATSON_EMBED_DEMOS=./containers/build-model-image
$ chmod 777 ${WATSON_EMBED_DEMOS}/copy_bin_with_libs.sh     
$ chmod 777 ${WATSON_EMBED_DEMOS}/unpack_model.sh 
$ docker build -f ${WATSON_EMBED_DEMOS}/Dockerfile --build-arg MODEL_PATH=./models --build-arg MODEL_DEST=/tmp/models -t watson-nlp_ensemble_model_heidloff .
```

The screenshot shows the deployed pod with two models.

![image](/assets/img/2022/12/Screenshot-2022-12-01-at-09.37.41.png)

After you’ve built model images you can test them locally before they are deployed as init containers.

```
$ mkdir models
$ docker run -it --rm -e ACCEPT_LICENSE=true -v `pwd`/models:/app/models watson-nlp_ensemble_model_heidloff
$ ls -la models 
```

Note that this post only shows how to build the model images. Additionally you need a strategy how to handle versions of images in general, how to map between image versions and model versions, how the model files can be accessed and more.

To find out more about Watson NLP, Watson Speech To Text, Watson Text To Speech and Watson for Embed in general, check out the resources in my post Guide to [IBM Watson Libraries]({{ "/article/the-ultimate-guide-to-ibm-watson-libraries/" | relative_url }}).