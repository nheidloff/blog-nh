---
id: nh-034
title: 'Searching Documents related to Questions via Embeddings'
date: 2023-08-29 11:02:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-034'
permalink: /article/searching-documents-for-questions-embeddings/
custom_permalink:
    - article/searching-documents-for-questions-embeddings/
image: /assets/img/2023/08/mteb-leaderboard.png
---

*In large language models embeddings are numerical representations of words, phrases, or sentences that capture their meaning and context. This post describes how to use embeddings to search and rerank documents.*

When words or sentences are represented in vectors, several AI tasks can be performed like classification and similarity detection. Even arithmetic operations like "King − Man + Woman = ?" are possible (to some degree).

Since Word2vec was introduced, many more efficient embedding models have been created - see the [Massive Text Embedding Benchmark (MTEB) Leaderboard](https://huggingface.co/spaces/mteb/leaderboard).

At this point [BAAI/bge-large-en](https://huggingface.co/BAAI/bge-large-en) is the leader.

> FlagEmbedding can map any text to a low-dimensional dense vector which can be used for tasks like retrieval, classification, clustering, or semantic search. And it also can be used in vector database for LLMs.

## Hugging Face API

Hugging Face is often considered as the GitHub for AI since more than 200k models are shared in their catalogue. Additionally Hugging Face provides libraries which make it easy to consume AI, for example [Transformers](https://huggingface.co/docs/transformers/index) and [Pipelines](https://huggingface.co/docs/transformers/main_classes/pipelines). Another library is [Sentence Transformers](https://huggingface.co/sentence-transformers) which is a Python framework for state-of-the-art sentence, text and image embeddings.

Using the sentence transformers library is as easy as this:

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
sentence = ['This framework generates embeddings for each input sentence']
embedding = model.encode(sentence)
```

## Example

Let's look at a simple example.

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('BAAI/bge-large-en')
instruction = "Represent this sentence for searching relevant passages: "

question = "When did IBM acquire Red Hat?"
doc1 = "IBM acquires Red Hat. It's official - IBM has acquired Red Hat! The deal was announced in October 2018. IBM Closes Landmark Acquisition of Red Hat."
doc2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
doc3 = "Hello Niklas"
doc4 = "Hi Niklas"

embeddings_q = model.encode(instruction + question, normalize_embeddings=True)
embeddings_1 = model.encode(doc1, normalize_embeddings=True)
embeddings_2 = model.encode(doc2, normalize_embeddings=True)
embeddings_3 = model.encode(doc3, normalize_embeddings=True)
embeddings_4 = model.encode(doc4, normalize_embeddings=True)

similarity = embeddings_3 @ embeddings_4.T
print("similarity of doc3 to doc4:")
print(similarity)

similarity = embeddings_q @ embeddings_1.T
print("similarity of question to doc1:")
print(similarity)
similarity = embeddings_q @ embeddings_2.T
print("similarity of question to doc2:")
print(similarity)
```

```text
similarity of doc3 to doc4:
0.99194574
similarity of question to doc1:
0.9207834
similarity of question to doc2:
0.6977091
```

The text 'Hi Niklas' and 'Hello Niklas' are considered to be almost identical: 0.9919

For the question "When did IBM acquire Red Hat?" doc1 which contains the press release is considered more similar than the lorem ipsum text in doc2.

The key advantage of using embeddings and neural seek rather than keyword matches is that even texts can be found that do not include the same words. For the BAAI/bge-large-en model an instruction "Represent this sentence for searching relevant passages: " is prepended to the question when comparing much longer documents with the question.

![image](/assets/img/2023/08/embedding.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.