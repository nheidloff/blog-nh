---
id: nh-055
title: 'Semantic Searches with Elasticsearch'
date: 2023-11-01 01:19:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-055'
permalink: /article/semantic-search-vector-eslasticsearch/
custom_permalink:
    - article/semantic-search-vector-eslasticsearch/
image: /assets/img/2023/10/elser.png
---

*In the most recent versions Elasticsearch provides semantic searches. This post summarizes how this new functionality can be utilized.*

Semantic searches allow finding relevant information even if classic keyword matches (BM25) are not present. The new functionality is described in the Elasticsearch blog and documentation:

* [Improving information retrieval in the Elastic Stack: Introducing Elastic Learned Sparse Encoder, our new retrieval model](https://www.elastic.co/search-labs/may-2023-launch-information-retrieval-elasticsearch-ai-model)
* [ELSER – Elastic Learned Sparse EncodeR](https://www.elastic.co/guide/en/machine-learning/current/ml-nlp-elser.html)
* [Tutorial: semantic search with ELSER](https://www.elastic.co/guide/en/elasticsearch/reference/8.10/semantic-search-elser.html)
* [ELSER text expansion](https://www.elastic.co/guide/en/enterprise-search/current/elser-text-expansion.html)

IBM provides the new Elasticsearch capabilities in the new offering [Watsonx Discovery](https://www.ibm.com/docs/en/announcements/watsonx-discovery-10?region=US).

## Overview

With `Retrieval Augmented Generation` (RAG) search results are passed as context via prompts to the `Large Language Models` (LLMs). This supports LLMs to generate responses based on data the models haven't been trained on, e.g., data that is not publicly available. It also reduces hallucination.

With vector-based searches documents can be found even if keywords from the questions don't appear in the documents. Instead `Embeddings` are used to find the k-nearest neighbors in neural networks. While this is a typical approach for semantic searches, it is not the only way to implement this.

## Dense

Elasticsearch supports [Dense vectors](https://www.elastic.co/guide/en/machine-learning/8.10/ml-nlp-model-ref.html#ml-nlp-model-ref-text-embedding) and [k-nearest neighbor searches](https://www.elastic.co/guide/en/elasticsearch/reference/current/knn-search-api.html) (kNN). In this case embeddings are stored in the indexes.

As stated in the blog and documentation there are some disadvantages though.

> Training the model on your own data is essential to ensure better search results than using only BM25. However, the model training process requires a team of data scientists and ML experts, making it expensive and time-consuming.

## ELSER

Additionally Elasticsearch supports another slightly different approach. When adding documents to search indexes, lists of tokens with rankings are generated which represent the content of documents. At runtime this list of tokens is leveraged to detect relevant documents. This new semantic search functionality is called ELSER.

> Elastic Learned Sparse EncodeR - or ELSER - is a retrieval model trained by Elastic that enables you to perform semantic search to retrieve more relevant search results. This search type provides you search results based on contextual meaning and user intent, rather than exact keyword matches. ELSER is an out-of-domain model which means it does not require fine-tuning on your own data, making it adaptable for various use cases out of the box. Effectively the ELSER model is replacing the terms in the original query with other terms that have been learnt to exist in the documents that best match the original search terms in a training dataset, and weights to control how important each is.

As stated in the blog in most cases ELSER searches outperform BM25.

![image](/assets/img/2023/10/elser-perf.png)

*Notes:* ELSER is only available in English. Response times can increase compared to classic BM25 searches.

## Indexing

To leverage ELSER the model needs to be deployed and extra information needs to be created in the indexes via pipelines. Check out the documentation for details.

Longer documents have to be split in multiple parts because of technical restrictions. My previous post [Tokenizing Text for Vector Searches with Java]({{ "/article/tokenizing-text-java-vector-searches-djl/" | relative_url }}) describes how documents can be split in less than 512 tokens with overlaps. As tokenizer MiniLM L-6 is used:

> Following the literature, we were using MiniLM L-6 from the SBERT family for our initial teacher. 

## Input

The following curl request shows how to invoke queries via the new 'text_expansion' field. Filters work as for classic BM25 searches.

```bash
QUESTION="my question"
ELASTIC_SEARCH_FILTER_NAME="myfilter"
ELASTIC_SEARCH_FILTER_VALUE="myfiltervalue"
curl -X GET "${ELASTIC_SEARCH_URL}${ELASTIC_SEARCH_INDEX}/_search?pretty" 
-H 'Content-Type: application/json' 
-u "${ELASTIC_SEARCH_USER}:${ELASTIC_SEARCH_PASSWORD}" 
-d'
{
  "size": 1,
  "query":
  {
    "bool":
    {
      "must":    
      {
        "text_expansion":
        {
          "ml.tokens":
          {
            "model_id":".elser_model_1",
            "model_text":"'$QUESTION'"
          }
        }
      },
      "filter":
      [
        {
          "term":
          {
            "'$ELASTIC_SEARCH_FILTER_NAME'": "'$ELASTIC_SEARCH_FILTER_VALUE'"
          }
        }
      ]
    }
  }
}
'
```

## Output

The response to queries includes the standard information plus the list of tokens with probabilities that have been created when indexing documents.

```bash
{
  "took" : 139,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 10000,
      "relation" : "gte"
    },
    "max_score" : 8.314766,
    "hits" : [
      {
        "_index" : "xxx",
        "_id" : "xxx",
        "_score" : 8.314766,
        "_source" : {
          "myfilter" : "myfiltervalue",
          "title" : "xxx",
          "url" : https://xxx,
          "text" : "xxx ...",
          "ml" : {
            "tokens" : {
              "xxx" : 0.9745649,
                ...
            },
            "model_id" : ".elser_model_1"
          }
        }
      }
    ]
  }
}
```

The tokens are created by ELSER. They can be single characters or full words. There are even tokens in these lists that are not in the original text if they are semantically similar. Stop words don't have to be removed manually. ELSER determines automatically whether or not certain stop words should be added to the list of tokens.

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.