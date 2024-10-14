---
id: nh-089
title: 'Multi-turn Conversations with watsonx Orchestrate'
date: 2024-10-09 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-089'
permalink: /article/multi-turn-conversations-watsonx-orchestrate/
custom_permalink:
    - article/multi-turn-conversations-watsonx-orchestrate/
image: /assets/img/2024/10/multi-turn-1.png
---

*watsonx Orchestrate supports multi-turn conversations as beta. This post shows an example how this new functionality works.*

Multi-turn conversations are useful in RAG scenarios (Retrieval Augmented Generation). watsonx Orchestrate allows linking to Elasticsearch and you can also integrate your own search engine. At the bottom of this post there are instructions how to write a simple custom search provider.

## Example Conversation

As example let's pick a customer care scenario where a human agent talks with a customer on the phone. To help the customer, the agent leverages a Digital Assistant to find potential route causes and actions to solve the issue.

```text
John (Teltop Customer Care Agent): Hello, this is John from Teltop customer care. 
How can I assist you today?

Mary (Disappointed Subscriber): Hi John, it's Mary. I've been having a nightmare with 
your service. My home Wi-Fi is acting up, and the TV service over fiber is terrible.

John: It could be a specific problem with your equipment or connection. Can you check 
if all cables are properly connected and if there are any obstructions to the router?

Mary: I've checked, and everything seems fine. This is so frustrating!

John: I'm sorry to hear that, Mary. It might be best to perform a remote diagnostic 
check on your router. I can guide you through the process.
```

## Step 1

While on the phone with the customer, the agent asks the Digital Assistant:

"What are potential route causes for 'Wi-Fi problems and the TV service quality'?"

This invokes a search to find relevant content.

```bash
curl -X POST  \
   'https://niklas-custom-search.xxx.eu-de.codeengine.appdomain.cloud/search' \
   -H 'content-type: application/json' \
   -H 'content-type: application/json' \
   -H 'accept: application/json' \
   -d '"{
   \"query\":\"What are potential route causes for 'Wi-Fi problems and the TV service quality'?\",
   \"filter\":\"\"
}"' 
```

The search extension returns two documents. In this case the first one is relevant, the second one is not but has been added to demonstrate that the Assistant can filter out noise.

```json
{
  "status":200,
  "body":[
    {
      "title":"Potential route cause for Wi-Fi issue C01",
      "body":"There could be a specific problem with the equipment or connection. Ask client to check if all cables are properly connected and if there are any obstructions to the router.",
      "result_metadata":{"document_retrieval_source":"server_side_search"}
    },
    {
      "title":"Great weather",
      "body":"The grass is always greener on the other side of the fence",
      "result_metadata":{"document_retrieval_source":"server_side_search"}
    }
  ]
}
```

Based on the results the Assistant answers: "There could be a specific problem with the equipment or connection. Check if all cables are properly connected and if there are any obstructions to the router."

For transparency the Assistant also displays the two documents when requested. 

![image](/assets/img/2024/10/multi-turn-6.png)

With the inspector developers can see the curl that was sent to the search extension and the response.

![image](/assets/img/2024/10/multi-turn-2.png)

## Step 2

Next the agent asks a follow up question:

"That didn't solve the issue. What else could be the route cause?"

Note that "That didn't solve ..." is replaced with the previous context:

"The solution provided in the previous answer didn't solve the issue. What are other potential route causes for 'Wi-Fi problems and the TV service quality'?"

Both the original query and the extended query are sent to the search extension, but the extension only reads the extended query.

```bash
curl -X POST  \
   'https://niklas-custom-search.xxx.eu-de.codeengine.appdomain.cloud/search' \
   -H 'content-type: application/json' \
   -H 'content-type: application/json' \
   -H 'accept: application/json' \
   -d '"{
   \"query\":\"The solution provided in the previous answer didn't solve the issue. What are other potential route causes for 'Wi-Fi problems and the TV service quality'?\",
   \"original_query\":\"That didn't solve the issue. What else could be the route cause?\",
   \"filter\":\"\"
}"' 
```

Two documents are returned. The first one adds another potential route cause for the issue.

```json
{
  "status":200,
  "body":[
    {
      "title":"Potential route cause for Wi-Fi issue C02",
      "body":"A reason why Wi-Fi doesn't work could be an old unsupported router software version. Perform a remote diagnostic check on the router.",
      "result_metadata":{"document_retrieval_source":"server_side_search"}
    },
    {
      "title":"Great weather",
      "body":"The grass is always greener on the other side of the fence",
      "result_metadata":{"document_retrieval_source":"server_side_search"}
    }
  ]
}
```

The Assistant responds with "The only potential route cause I'm aware of is an old unsupported router software version, which would require a remote diagnostic check on the router."

![image](/assets/img/2024/10/multi-turn-3.png)

## Setup

To develop a custom search provider, check out the following resources.

* [Documentation: Custom service integration setup](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-search-customsearch-add)
* [Example custom search provider](https://github.com/nheidloff/watsonx-ai-platform-demos/tree/8a78cfab535f65a3f91c2852ee837c005748b404/orchestrate/custom-search)

![image](/assets/img/2024/10/multi-turn-5.png)

## Analytics

watsonx Orchestrate also provides an analytics dashboard.

![image](/assets/img/2024/10/multi-turn-4.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.