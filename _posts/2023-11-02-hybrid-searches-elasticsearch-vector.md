---
id: nh-056
title: 'Hybrid and Vector Searches with Elasticsearch'
date: 2023-11-02 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-056'
permalink: /article/hybrid-searches-elasticsearch-vector/
custom_permalink:
    - article/hybrid-searches-elasticsearch-vector/
image: /assets/img/2023/10/elser2.png
---

*Semantic searches allow finding relevant information even if there are no classic keyword matches. Recent research has shown that combinations of semantic and classic keyword searches often outperform these separate search options.*

Elasticsearch provides `Hybrid Retrieval` to run both searches in parallel to get the best of both options.

* [Improving information retrieval in the Elastic Stack: Hybrid retrieval](https://www.elastic.co/blog/improving-information-retrieval-elastic-stack-hybrid)
* [Reciprocal rank fusion](https://www.elastic.co/guide/en/elasticsearch/reference/current/rrf.html)

My previous posts describe semantic searches:

* [Semantic Searches with Elasticsearch]({{ "/article/semantic-search-vector-eslasticsearch/" | relative_url }})
* [Tokenizing Text for Vector Searches with Java]({{ "/article/tokenizing-text-java-vector-searches-djl/" | relative_url }})

IBM provides the new Elasticsearch capabilities in the new offering [Watsonx Discovery](https://www.ibm.com/docs/en/announcements/watsonx-discovery-10?region=US).

## Overview

> It is known that lexical retrievers (such as BM25) and semantic retrievers (like ELSER) are somewhat complementary. Specifically, it will improve relevance to combine the results of retrieval methods, if one assumes that the more matches occur between the relevant documents they retrieve than between the irrelevant documents they retrieve.

The following diagram shows the performance improvements:

![image](/assets/img/2023/10/elser-hybrid.png)

## Reciprocal Rank Fusion

`Reciprocal Rank Fusion` (RRF) is a method for combining multiple result sets with different relevance indicators into a single result set. RRF requires no tuning, and the different relevance indicators do not have to be related to each other to achieve high-quality results. The only drawback is that currently the query latency is increased as the two queries are performed sequentially in Elasticsearch. This is mitigated by the fact that BM25 retrieval is typically faster than semantic retrieval.

Essentially RRF normalizes the scores of the two searches to make them comparable and to create one ordered list of search results. If the same documents/passages/chuncks are returned by both searches, they are ranked higher. With the parameters 'rank_constant' and 'window_size' hybrid searches can be configured, e.g., to define how to ensure that documents that are only returned once don't get lost.

## Query

In the following example two sub searches are run independently of each other.

```bash
GET elser-index/_search
{
  "sub_searches": [
    {
      "query": {
        "multi_match" : {
          "query":question,
          "type":"most_field",
          "fields":[ "title", "text"]
        }
      }
    },
    {
      "query": {
        "text_expansion": {
          "my_embeddings.tokens": {
            "model_id": ".elser_model_1",
            "model_text": question
          }
        }
      }
    }
  ],
  "rank": {
    "rrf": {
          "window_size": 50,
          "rank_constant": 20
    }
  }
}
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.