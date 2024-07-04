---
id: nh-057
title: 'Metrics to evaluate Search Results'
date: 2023-11-07 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-057'
permalink: /article/search-evaluations/
custom_permalink:
    - article/search-evaluations/
image: /assets/img/2023/11/search-metrics.png
---

*Via Retrieval Augmented Generation search results can be passed as context into prompts to Large Language Models to support the models to generate good responses. Passing the right search results is essential. This post describes different metrics to measure how good search results are.*

`Large Language Models` are pretrained on massive amounts of data up to a certain date. For data that didn't exist until that date and data which is proprietary, context can be sent to the models. The common pattern `Retrieval Augmented Generation` (RAG) invokes queries first and passes the results to the models. The performance of the models can only be as good as the content that is fed into the models. If the first search stage doesn't find the right information, the model cannot provide the best possible answers. This is why search is very important in RAG scenarios.

Usually, there are many ways to run queries against search engines, databases, APIs, etc. For example, classic keyword searches can be done, vector searches, hybrid searches and many combinations of various parameters. To find out the best ways to run queries, experiments need to be done for diverse and enough sample input data. Determining manually the best options is often time consuming, expensive and error prone. Automated experiments and good metrics help addressing these challenges.

There are several different metrics to evaluate search results. This post describes offline metrics which utilize fixed datasets. Some metrics are order-unaware (Recall@K), others are order-aware (MRR@K, MAP@K, NDCG@K).

## Recall@K

Recall and Precision are easy to interpret metrics for search evaluations. Let's recap when they are used and how they refer to accuracy and F1-scores.

* Precision can be thought of as a measure of exactness.
* Recall can be thought of as a measure of completeness.
* Accuracy refers to how close a measurement is to the true or accepted value. Precision refers to how close measurements of the same item are to each other. 
* F1-score is a combination of Precision and Recall. A good F1 score means that you have low False Positives and low False Negatives.
* Accuracy is used when the True Positives and True Negatives are more important while F1-score is used when the False Negatives and False Positives are crucial.

For smaller and fixed size datasets Recall and Precision can be fully calculated. For usual full text search scenarios this doesn't work since queries can have lots of relevant documents and only the top documents are interesting for users. The notion `@K` extends the classic metrics by calculating metrics only for the top K documents.

Recall@K defines the ratio of relevant documents returned in the top K results out of all correct answers for a given query. Let's take a look at an example where eight documents are returned in this order:

1. False Positive = not relevant
2. True Positive = relevant
3. True Negative = not relevant
4. False Negative = relevant
5. False Negative = relevant
6. True Negative = not relevant
7. False Negative = relevant
8. True Negative = not relevant

To calculate Recall@2 the first two documents are used in no particular order. The best possible value is 1.0 which means that all returned documents are relevant and fit the search criteria.

Recall@2 = True Positives in top 2 / (all True Positives + all False Negatives) = 1 / (1 +3) = 0.25

## MRR@K

MRR, MAP and NDCG are order-aware metrics. There is a great video [Evaluation Measures for Search and Recommender Systems](https://www.youtube.com/watch?v=BD9TkvEsKwM) explaining them.

Mean Reciprocal Rank (MRR) defines how good a retrieval system is to return a relevant result as the top result. To calculate the MRR, multiple queries are invoked. If all of these queries return a relevant document at the top, the score will be 1.0.

MRR is utilized for use cases where the rank of the first relevant result is important, e.g., the "Google I'm feeling lucky" button.

## MAP@K

The disadvantage of MRR is that only the top document is considered. Other use cases like comparative questions in Question Answering scenarios require multiple relevant documents.

Mean Average Precision (MAP) addresses this shortcoming by considering the order of the returned items. To calculate this score, three steps are taken:

1. Calculate precision
2. Calculate average precision for K
3. Calculate mean average precision for sample of queries

As for MRR, multiple queries are run. Instead of calculating the Recall, Precision is computed by using relevant and non-relevant documents from the returned lists (not the complete dataset). Next the average precision is computed which only considers relevant documents. Last the [mean](https://www.cuemath.com/data/difference-between-average-and-mean/) is calculated for the sample of data.

## NDCG@K

While the relevance for MAP can only be true or false, Normalized Discounted Cumulative Gain (NDCG) goes one step further and differentiates between different relevance scores. NDCG is a powerful metrics useful for many scenarios. For example, for Question Answering scenarios you typically need to pass multiple documents into prompts which should be the most relevant documents.

Watch the video above for details:

1. Calculate cumulative gain
2. Calculate discounted cumulative gain
3. Normalize discounted cumulative gain

In difference to the other metrics above, additional labeled data is required. On top of the information whether a document is relevant, scores need to be defined which documents are more relevant than others.

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.