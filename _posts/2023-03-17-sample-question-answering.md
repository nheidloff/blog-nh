---
id: nh-017
title: 'Generative AI Sample Code for Question Answering'
date: 2023-03-18 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-017'
permalink: /article/sample-question-answering/
custom_permalink:
    - article/sample-question-answering/
image: /assets/img/2023/03/aq-prompt.jpeg
---

*As Large Language Models have been trained with massive amounts of data, they can provide impressively fluent answers. Unfortunately, the answers are not always correct. Passing in context to questions helps reducing hallucination significantly.*

The blog [Generative AI for Question Answering Scenarios](https://heidloff.net/article/question-answering-transformers/) describes a technique to perform a document retrieval step (e.g. classic full text search) first and to pass the results into `Large Language Models` in a second step. This enables pretrained AI models to start searching for the correct answers at the right places in neural networks and it provides users some transparency based on which data the answer was generated.

Two steps process:

1. Full-text searches on knowledge bases
2. Generation of answers by passing in context to LLMs


## Sample Use Case

Let’s look at a simple sample. The goal is to answer the following question which requires to combine information from two different documents - see the screenshot at the top.

"When and for how much did IBM acquire Red Hat?"

The following snippet shows the answer which the pretrained large language model provides if it is used without passing in context. The answer is not bad, but '$39 billion' is not correct.

``` text
curl -X POST https://mock-api.xxx.us-east.codeengine.appdomain.cloud/query-maas \
  -u "apikey:xxx"
  -H 'Content-Type: application/json' \
  -d '{
    "query": "text:When and for how much did IBM acquire Red Hat?"
  }' | jq '.' 
{
  "matching_results": 1,
  "retrievalDetails": {
    "document_retrieval_strategy": "llm"
  },
  "results": [
    {
      "document_id": "Answer",
      "title": "Answer",
      "text": [
        "$39 billion in cash and stock in 2015, with IBM acquiring Red Hat for $34 billion in cash and stock in 2015"
      ],
      "link": null,
      "document_passages": null
    }
  ]
}
```

Next let's pass in context from the earlier full text search. The response of the REST API contains the list of documents retrieved in the first step and additionally the merged answer as the first result in the list. The parameter 'matching_results' refers to the amount of retrieved documents, the actual number of results is one more, since it includes the merged answer. 

This time the answer is correct! "IBM acquired Red Hat in October 2018 for $34 billion"

```text
curl -X POST https://mock-api.xxx.us-east.codeengine.appdomain.cloud/query \
  -u "apikey:xxx"
  -H 'Content-Type: application/json' \
  -d '{
    "query": "text:When and for how much did IBM acquire Red Hat?"
  }' | jq '.' 
{
  "matching_results": 2,
  "retrievalDetails": {
    "document_retrieval_strategy": "llm"
  },
  "results": [
    {
      "document_id": "Answer",
      "title": "Answer",
      "text": [
        "IBM acquired Red Hat in October 2018 for $34 billion"
      ],
      "link": null,
      "document_passages": null
    },
    {
      "document_id": "cc64fc7995c848ae5d5350dc2978c77e",
      "title": "IBM acquires Red Hat",
      "text": [
        "It's official - IBM has acquired Red Hat! The deal was announced in October 2018. IBM Closes Landmark Acquisition of Red Hat."
      ],
      "link": "https://www.ibm.com/support/pages/ibm-acquires-red-hat",
      "document_passages": [
        {
          "passage_text": "The deal was announced in October 2018",
          "field": "text",
          "passageAnswers": [
            {
              "answer_text": "October 2018.",
              "confidence": 1
            }
          ]
        }
      ]
    },
    {
      "document_id": "2ea6e0c222f6d3fbe005ac22bf5fb12d",
      "title": "IBM Closes Landmark Acquisition of Red Hat; Defines Open, Hybrid Cloud Future",
      "text": [
        "IBM (NYSE:IBM) and Red Hat announced today that they have closed the transaction under which IBM acquired all of the issued and outstanding common shares of Red Hat for $190.00 per share in cash, representing a total equity value of approximately $34 billion. The acquisition redefines the cloud market for business. ..."
      ],
      "link": "https://www.redhat.com/en/about/press-releases/ibm-closes-landmark-acquisition-red-hat-34-billion-defines-open-hybrid-cloud-future",
      "document_passages": [
        {
          "passage_text": "$190.00 per share in cash",
          "field": "text",
          "passageAnswers": [
            {
              "answer_text": "$190.00 per share in cash",
              "confidence": 0.699999988079071
            }
          ]
        }
      ]
    }
  ]
}
```


## Quarkus Sample Application

To implement this type of functionality, several components are needed:

1. Document retrieval/full text search
2. Large Language Model
3. Application that orchestrates the first two components

I have implemented and open sourced a sample [orchestration application](https://github.com/nheidloff/question-answering) which uses the following technologies:

1. Document retrieval via PrimeQA
2. Large Language Model via a Model as a Service option
3. Orchestration via a Quarkus Java application

I've used the biggest version of [FLAN-T5](https://heidloff.net/article/running-llm-flan-t5-locally/) as model. Since it is too big to run it locally, I've used a Model as a Service option. I'll blog more about this later.

The Quarkus application provides a /query endpoint to integrate this functionality in conversational experiences like [Watson Assistant](https://github.com/nheidloff/question-answering#watson-assistant). The endpoint returns the results in a similar way as Watson Discovery returns results for 'Question Answering' scenarios.


## Prompt Engineering

Retraining and fine tuning large language models is expensive, because it takes time and requires lots of hardware resources. Via `Prompt Engineering` and `Prompt Tuning` models can be 'customized' without having to change their weights - see [Introduction to Prompt Tuning](https://heidloff.net/article/introduction-to-prompt-tuning/) for details.

The sample uses simple [prompt engineering](https://heidloff.net/article/importance-of-prompt-engineering/). The trick is to pass in the retrieved documents from the first step as context.

```text
Answer the question based on the context below. Summarize the answer in one sentence.

Context: It's official - IBM has acquired Red Hat! The deal was announced in October 2018. IBM Closes Landmark Acquisition of Red Hat.

IBM (NYSE:IBM) and Red Hat announced today that they have closed the transaction under which IBM acquired all of the issued and outstanding common shares of Red Hat for $190.00 per share in cash, representing a total equity value of approximately $34 billion. The acquisition redefines the cloud market for business. ...

Question: When and for how much did IBM acquire Red Hat?

Answer: 
```

To find the best prompt, different alternatives need to be evaluated and compared. The prompt can easily be changed in the [QuestionAnswering.java](https://github.com/nheidloff/question-answering) file.

```java
@ApplicationScoped
public class QuestionAnswering {

    public final static String CONTEXT = "<<CONTEXT>>";
    public final static String QUESTION = "<<QUESTION>>";

    public final String template = """
Answer the question based on the context below. Summarize the answer in one sentence.

Context: <<CONTEXT>>

Question: <<QUESTION>>

Answer: """;

    public String getPrompt(String query, String context) {... }
```


## Resources

* Sample code: [question-answering](https://github.com/nheidloff/question-answering)
* [Generative AI for Question Answering Scenarios](https://heidloff.net/article/question-answering-transformers/)
* [PrimeQA](https://github.com/primeqa)
* [FLAN-T5](https://heidloff.net/article/running-llm-flan-t5-locally/)
* [ChatGPT-like Functionality in IBM Watson Assistant](https://heidloff.net/article/chatgpt-like-functionality-in-watson-assistant/) 