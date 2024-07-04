---
id: nh-018
title: 'Integrating generative AI in Watson Assistant'
date: 2023-03-20 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-018'
permalink: /article/integrating-generative-ai-in-watson-assistant/
custom_permalink:
    - article/integrating-generative-ai-in-watson-assistant/
image: /assets/img/2023/03/qa-prompt.png
---

*Large Language Models can improve the user experience of virtual assistants like Watson Assistant by providing answers rather than lists of links. With Watson Assistant's 'Bring your own Search' feature these generative capabilities can easily be added via OpenAPI and custom HTML responses.*


## Scenario

Let's look at a sample scenario again which was explained in the previous posts:

* [Generative AI for Question Answering Scenarios](https://heidloff.net/article/question-answering-transformers/)
* [Generative AI Sample Code for Question Answering](https://heidloff.net/article/sample-question-answering/)

The goal is to answer the following question:

"When and for how much did IBM acquire Red Hat?"

Without passing in context the `Large Language Model` returns an answer which is not fully correct ('$39 billion').

"$39 billion in cash and stock in 2015, with IBM acquiring Red Hat for $34 billion in cash and stock in 2015"

When passing in context from a previous full text search, the answer is correct.

"IBM acquired Red Hat in October 2018 for $34 billion"


## Architecture

The following diagram explains the architecture.

![image](/assets/img/2023/03/watson-assistant-byos-setup-05.jpeg)

The 'Question Answering' service provides a REST API documented via OpenAPI (formelly known as Swagger). The [/query endpoints](https://github.com/nheidloff/question-answering#endpoints) implement the same interface as Watson Discovery. 

![image](/assets/img/2023/03/OpenAI-UI2.png)


## Bring Your Own Search

IBM Watson Assistant comes with an extensibility mechanism, called '[Bring your own Search](https://medium.com/ibm-watson/bring-your-own-search-to-ibm-watson-assistant-587e77410c98)'. This allows integrating any system which provides REST APIs documented via OpenAPI.

The screenshot at the top shows how the one answer is displayed plus the links to the documents which were passed in as context.

I've open sourced a [sample](https://github.com/nheidloff/question-answering) that leverages PrimeQA and the FLAN-T5 model (via Model as a Service) to provide an answer. 

My colleague Thomas Südbröcker has integrated this extension in Watson Assistant. Read his [documentation](https://github.com/nheidloff/question-answering/blob/main/assistant/README.md). He provides a starter kit which consists of a set of actions that can be imported into Watson Assistant. The first action invokes the endpoint of the sample 'Question Answering' endpoint.

![image](/assets/img/2023/03/qa-prompt1.png)


## Resources

* [Bring your own search to IBM Watson Assistant](https://medium.com/ibm-watson/bring-your-own-search-to-ibm-watson-assistant-587e77410c98)
* [The Setup of Bring Your Own Search (BYOS) for a Question Answering Service in Watson Assistant](https://suedbroecker.net/2023/03/20/the-setup-of-bring-your-own-search-byos-for-the-question-answering-service-in-watson-assistant/)
* Sample code: [question-answering](https://github.com/nheidloff/question-answering)
* [Bring your own Search example](https://github.com/nheidloff/question-answering/blob/main/assistant/README.md)
* [Generative AI for Question Answering Scenarios](https://heidloff.net/article/question-answering-transformers/)
* [Generative AI Sample for Question Answering](https://heidloff.net/article/sample-question-answering/)
* [Using PrimeQA For NLP Question Answering](https://www.deleeuw.me.uk/posts/Using-PrimeQA-For-NLP-Question-Answering/)
* [Finding concise answers to questions in enterprise documents](https://medium.com/ibm-data-ai/finding-concise-answers-to-questions-in-enterprise-documents-53a865898dbd)