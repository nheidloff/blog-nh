---
id: 5460
title: 'Converting XML Feeds into CSVs with Sentences'
date: '2022-12-05T00:16:32+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5460'
permalink: /article/converting-xml-feeds-into-csvs-with-sentences/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/converting-xml-feeds-into-csvs-with-sentences/
categories:
    - Articles
---

*This post is part of a mini series which describes an AI text classification sample end to end using Watson NLP (Natural Language Understanding) and Watson Studio. This part explains how to convert XML RSS feeds into one CSV with a list of all sentences.*

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

Before data can be labelled and the model can be trained, the data needs to be prepared. I’ve implemented some JavaScript code that does this automatically. The data is read from my blog and converted into a CSV file with a list of sentences for all blog posts. See the [screenshots](https://github.com/nheidloff/text-classification-watson-nlp/blob/main/documentation/step1) for a walk-through.

Architecture:

![image](/assets/img/2022/11/step1.jpeg)

**Step 1: Copy Blog Data into Repo**

The original data from the blog is located in [data/heidloffblog/input/feed-pages](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/input/feed-pages). The data was read via RSS feeds ‘http://heidloff.net/feed/?paged=1’ and copied manually into the repo.

**Step 2: Split each Blog Post into separate File**

There are 8 pages with 80 posts. The split script splits each page in 10 elements stored in [data/heidloffblog/input/training](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/input/training).

```
$ cd data-prep-and-predictions
$ npm install
$ node splitFeedPagesInElements.js
```

**Step 3: Generate CSV File**

Next the data needs to be converted in multiple steps:

1. [XML to HTML](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/output/rssxml-to-html)
2. [HTML to Text](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/output/html-to-text)
3. [Text to Sentences](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/output/text-to-sentences-as-text)
4. [Sentences to CSVs](https://github.com/nheidloff/text-classification-watson-nlp/tree/main/data/heidloffblog/output/text-to-sentences-as-csv)
5. [CSVs to CSV](https://github.com/nheidloff/text-classification-watson-nlp/blob/main/data/heidloffblog/output/all-sentences.csv)

This is the structure of the generated CSV file:

```
document_id,text
page1-elem0,Building custom IBM Watson NLP Images.
page1-elem0,IBM Watson NLP (Natural Language Understanding) and Watson Speech containers can be run locally on-premises or Kubernetes and OpenShift clusters.
page1-elem1,Understanding IBM Watson Containers.
page1-elem1,Via REST and gRCP APIs AI can easily be embedded in applications.
```

For the conversions to HTML and text open source JavaScript modules are used. For identifying sentences Watson NLP is used with the syntax stock model.

To try IBM Watson NLP, a [trial](https://www.ibm.com/account/reg/us-en/signup?formid=urx-51726) is available. The container images are stored in an IBM container registry that is accessed via an [IBM Entitlement Key](https://www.ibm.com/account/reg/signup?formid=urx-51726).

Run Watson NLP with Docker locally:

```
$ docker login cp.icr.io --username cp --password <your-entitlement-key>
$ mkdir models
$ docker run -it --rm -e ACCEPT_LICENSE=true -v `pwd`/models:/app/models cp.icr.io/cp/ai/watson-nlp_syntax_izumo_lang_en_stock:1.0.7
$ docker build . -f containers/Dockerfile -t watson-nlp-with-syntax-model:latest
$ docker run --rm -it \
  -e ACCEPT_LICENSE=true \
  -p 8085:8085 \
  -p 8080:8080 \
  watson-nlp-with-syntax-model
```

When Watson NLP is running, the following commands create the CSV file.

```
$ cd data-prep-and-predictions
$ npm install
$ node convert.js heidloffblog ../data/heidloffblog/
```

![image](/assets/img/2022/11/preparation12.png)

**What’s next?**

Check out my blog for more posts related to this sample or get the [code](https://github.com/nheidloff/text-classification-watson-nlp) from GitHub. To learn more about IBM Watson NLP and Embeddable AI, check out these [resources]({{ "/article/the-ultimate-guide-to-ibm-watson-libraries/" | relative_url }}).