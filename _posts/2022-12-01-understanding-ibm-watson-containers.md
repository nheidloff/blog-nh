---
id: 5433
title: 'Understanding IBM Watson Containers'
date: '2022-12-01T00:05:41+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5433'
permalink: /article/understanding-ibm-watson-containers/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/understanding-ibm-watson-containers/
categories:
    - Articles
---

*IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. This post explains how to find the latest versions of containers and how to get the model files and gRPC proto files.*

To try it, a [trial](https://www.ibm.com/products/ibm-watson-natural-language-processing) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/signup?formid=urx-51726).

This post has three parts:

- Finding the latest Version of Images
- Accessing the Model Files
- Accessing the gRCP Proto Files

**Finding the latest Version of Images**

In addition to the runtime container ‘cp.icr.io/cp/ai/watson-nlp-runtime’ IBM provides out of the box models which are stored in images that are run as init containers.

- [NLP](https://www.ibm.com/docs/en/watson-libraries?topic=models-catalog)
- [Speech To Text](https://www.ibm.com/docs/en/watson-libraries?topic=home-models-catalog)
- [Text To Speech](https://www.ibm.com/docs/en/watson-libraries?topic=wtsleh-models-catalog)

To find out the latest version even before the documentation is updated, you can use [Skopeo](https://github.com/containers/skopeo). The output shows the available tags and environment variables for the model and proto directories.

```
$ docker login cp.icr.io --username cp --password <your-entitlement-key>
$ skopeo login cp.icr.io
$ skopeo inspect docker://cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18
{
    "Name": "cp.icr.io/cp/ai/watson-nlp-runtime",
    "Digest": "sha256:0cbcbd5bde0e4691e4cb1bf7fbe306a4b2082cc553c32f0be2bd60dfac75a2a5",
    "RepoTags": [
        "1.0.18",
        "1.0.20",
        "1.0",
        "1"
    ],
...
    ],
    "Env": [
        "JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk",
        "SERVICE_PROTO_GEN_MODULE_DIR=generated",
        "LOCAL_MODELS_DIR=/app/models"
        ...
    ]
}
```

**Accessing the Model Files**

Custom images can be built which only include the models you need. To include out of the box models in your custom images, you need to download the model files first. Each model is stored in one sub-directory or as zip file. The name of the directory or zip file is the model id.

You can get the model files by invoking these commands:

```
$ docker login cp.icr.io --username cp --password <your-entitlement-key>
$ mkdir models
$ docker run -it --rm -e ACCEPT_LICENSE=true -v `pwd`/models:/app/models cp.icr.io/cp/ai/watson-nlp_syntax_izumo_lang_en_stock:1.0.7
$ ls -la models 
```

Build a custom image with the syntax model:

```
$ cat <<EOF >>Dockerfile
FROM cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18
COPY models /app/models
EOF
$ docker build . -t watson-nlp-with-syntax-model:latest
$ docker run --rm -it \
  -e ACCEPT_LICENSE=true \
  -p 8085:8085 \
  -p 8080:8080 \
  watson-nlp-with-syntax-model
```

Invoke Watson NLP via REST:

```
$ open http://localhost:8080/swagger/
$ curl -X POST "http://localhost:8080/v1/watson.runtime.nlp.v1/NlpService/SyntaxPredict" \
  -H "accept: application/json" \
  -H "grpc-metadata-mm-model-id: syntax_izumo_lang_en_stock" \
  -H "content-type: application/json" \
  -d " { \"rawDocument\": { \"text\": \"It is so easy to embed Watson NLP in applications. Very cool.\" }}"
{
  "text": "It is so easy to embed Watson NLP in applications. Very cool.",
  "producerId": { "name": "Izumo Text Processing", "version": "0.0.1" },
  ...
  "sentences": [
    {
      "span": {
        "begin": 0, "end": 50, "text": "It is so easy to embed Watson NLP in applications."
      }
    },
    { "span": { "begin": 51, "end": 61, "text": "Very cool." } }
  ]
}
```

**Accessing the gRCP Proto Files**

To invoke the gRCP APIs, the proto files are needed which you can get from [GitHub](https://github.com/IBM/ibm-watson-embed-clients/tree/main/watson_nlp/protos). To make sure you always use the right version, you can also ‘download’ them from the runtime image.

```
$ mkdir protos
$ docker create --name watson-runtime-protos cp.icr.io/cp/ai/watson-nlp-runtime:1.0.18
$ docker cp watson-runtime-protos:/app/protos/. protos 
$ docker rm watson-runtime-protos
```

Start the container:

```
$ docker run --rm -it \
  -e ACCEPT_LICENSE=true \
  -p 8085:8085 \
  -p 8080:8080 \
  watson-nlp-with-syntax-model
```

Invoke Watson NLP via gRCP:

```
$ cd protos
$ grpcurl -plaintext -proto common-service.proto -d '{
"raw_document": {
"text": "It is so easy to embed Watson NLP in applications. Very cool"},
"parsers": ["token"]
}' -H 'mm-model-id: syntax_izumo_lang_en_stock' localhost:8085 watson.runtime.nlp.v1.NlpService.SyntaxPredict
{
  "text": "It is so easy to embed Watson NLP in applications. Very cool",
  "producerId": {
    "name": "Izumo Text Processing",
    "version": "0.0.1"
  },
  ...
  "sentences": [
    {
      "span": {
        "end": 50,
        "text": "It is so easy to embed Watson NLP in applications."
      }
    },
    {
      "span": {
        "begin": 51,
        "end": 60,
        "text": "Very cool"
      }
    }
  ]
}
```

To find out more about Watson NLP, Watson Speech To Text, Watson Text To Speech and Watson for Embed in general, check out the resources in my post Guide to [IBM Watson Libraries]({{ "/article/the-ultimate-guide-to-ibm-watson-libraries/" | relative_url }}).