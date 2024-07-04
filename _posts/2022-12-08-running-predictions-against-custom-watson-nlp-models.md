---
id: 5502
title: 'Running Predictions against custom Watson NLP Models'
date: '2022-12-08T00:12:24+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5502'
permalink: /article/running-predictions-against-custom-watson-nlp-models/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-predictions-against-custom-watson-nlp-models/
categories:
    - Articles
---

*This post is part of a mini series which describes an AI text classification sample end to end using Watson NLP (Natural Language Understanding) and Watson Studio. This part explains how to build images with Watson NLP and custom models and how to run predictions against the containers.*

[IBM Watson NLP](https://www.ibm.com/products/ibm-watson-natural-language-processing) (Natural Language Understanding) containers can be run locally, on-premises or Kubernetes and OpenShift clusters. Via REST and gRCP APIs AI can easily be embedded in applications. [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio) is used for the training of the model.

The code is available as open source in the [text-classification-watson-nlp](https://github.com/nheidloff/text-classification-watson-nlp) repo.

Here are all parts of the series:

- [Introduction: Text Classification Sample for IBM Watson NLP]({{ "/article/text-classification-sample-for-ibm-watson-nlp/" | relative_url }})
- [Step 1: Converting XML Feeds into CSVs with Sentences]({{ "/article/converting-xml-feeds-into-csvs-with-sentences/" | relative_url }})
- [Step 2: Labelling Sentences for Text Classifications]({{ "/article/labelling-sentences-for-text-classifications/" | relative_url }})
- [Step 3: Training Text Classification Models with Watson NLP]({{ "/article/training-text-classification-models-with-watson-nlp/" | relative_url }})
- [Step 4: Running Predictions against custom Watson NLP Models]({{ "/article/running-predictions-against-custom-watson-nlp-models/" | relative_url }})
- [Step 5: Deploying custom Watson NLP Text Classification Models]({{ "/article/deploying-custom-watson-nlp-text-classification-models" | relative_url }})

**Overview**

The custom image will contain the Watson NLP runtime, the custom classification model and the out of the box IBM Watson NLP Syntax model.

Architecture:

![image](/assets/img/2022/11/step4.jpeg)

**Walk-through**

Let’s take a look how the image is built and the container is run. See the [screenshots](https://github.com/nheidloff/text-classification-watson-nlp/blob/main/documentation/step4) for a detailed walk-through.

The trained model is stored in the Watson Studio project.

![image](/assets/img/2022/11/build-image03.png)

Download ensemble\_model.zip to the directory ‘models’, rename it to ‘ensemble\_model\_heidloff.zip’, unzip it and delete it.

![image](/assets/img/2022/11/build-image05.png)

Run these commands to build the image. Make sure 1. the syntax model and 2. your ensemble\_model\_heidloff model are in the models directory.

```
$ docker login cp.icr.io --username cp --password <your-entitlement-key>
$ chmod -R 777 models/ensemble_model_heidloff
$ docker build . -f containers/Dockerfile -t watson-nlp-with-classification-model
```

Run the container locally via Docker:

```
$ docker run --name watson-nlp-with-classification-model --rm -it \
  -e ACCEPT_LICENSE=true \
  -p 8085:8085 \
  -p 8080:8080 \
  watson-nlp-with-classification-model
```

You can run predictions via curl:

```
$ curl -s -X POST "http://localhost:8080/v1/watson.runtime.nlp.v1/NlpService/ClassificationPredict" \
  -H "accept: application/json" \
  -H "grpc-metadata-mm-model-id: ensemble_model_heidloff" \
  -H "content-type: application/json" \
  -d "{ \"rawDocument\": \
    { \"text\": \"The Watson NLP containers also provides a gRCP interface\" }}" | jq
```

![image](/assets/img/2022/11/build-image07.png)

Alternatively you can run a Node.js app. Put xml file(s) in ‘[data/heidloffblog/input/testing](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/input/testing)‘. There are some sample files.

```
$ cd data-prep-and-predictions
$ npm install
$ node predict.js heidloffblog ../data/heidloffblog/ watson-embed-containers.xml ensemble_model_heidloff

Article IS about WatsonEmbed since the confidence level of one sentence is above 0.8
The sentence with the highest confidence is:
IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally, on-premises or Kubernetes and OpenShift clusters.
{ className: 'WatsonEmbed', confidence: 0.9859272 }

$ node predict.js heidloffblog ../data/heidloffblog/ not-watson-embed-studio.xml ensemble_model_heidloff

Article IS NOT about WatsonEmbed since the confidence level of no sentence is above 0.8
The sentence with the highest confidence is:
For example IBM provides Watson Machine Learning to identify the best algorithm.
{ className: 'WatsonEmbed', confidence: 0.6762146 }
```

![image](/assets/img/2022/11/prediction01.png)

**What’s next?**

Check out my blog for more posts related to this sample or get the [code](https://github.com/nheidloff/text-classification-watson-nlp) from GitHub. To learn more about IBM Watson NLP and Embeddable AI, check out these [resources]({{ "/article/the-ultimate-guide-to-ibm-watson-libraries/" | relative_url }}).