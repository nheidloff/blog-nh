---
id: nh-054
title: 'Tokenizing Text for Vector Searches with Java'
date: 2023-10-31 01:19:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-054'
permalink: /article/tokenizing-text-java-vector-searches-djl/
custom_permalink:
    - article/tokenizing-text-java-vector-searches-djl/
image: /assets/img/2023/10/djl.png
---

*Vector-based searches allow finding semantic relevant information without the presence of keywords. Often vector-based search engines can only handle documents with limited lengths. This post describes the tokenization prerequisite to split longer documents in smaller chuncks with Java.*

To work around length limitations of search engines (e.g. [Elasticsearch](https://www.elastic.co/guide/en/machine-learning/current/ml-nlp-limitations.html)), frameworks like [LangChain](https://python.langchain.com/docs/modules/data_connection/document_transformers/) have utilities to split longer documents. If these frameworks cannot be utilized, documents have to be split manually. To index and split documents in enterprise scenarios, Java is often used.

The [Deep Java Library](https://djl.ai/) provides capabilities to employ models from Hugging Face with Java.

> Deep Java Library (DJL) is an open-source, high-level, engine-agnostic Java framework for deep learning. DJL is designed to be easy to get started with and simple to use for Java developers. DJL is a native Java development experience and functions like any other regular Java library. You don't have to be machine learning/deep learning expert to get started. You can use your existing Java expertise as an on-ramp to learn and use machine learning and deep learning.

## Tokenization

To split documents, the number of tokens needs to be known. Tokens are not identical to words. Models come with specific tokenizers which provide different token dictionaries and convert words and sentences in different tokens.

DJL provides the same functionality in Java that [Hugging Face Tokenizers](https://huggingface.co/docs/tokenizers/index) support. The following code shows how models from Hugging Face can be loaded and how tokenization can be done.

```java
import ai.djl.huggingface.tokenizers.Encoding;
import ai.djl.huggingface.tokenizers.HuggingFaceTokenizer;

String DJL_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

public Map<String, String> getDJLConfig() {
    Map<String, String> options = new HashMap<String, String>();
    options.put("addSpecialTokens", "false");
    options.put("padding", "false");
    options.put("modelMaxLength", "100000");
    options.put("maxLength", "100000");
    return options;
}

public String[] getLLMTokens(String text) {
    Encoding encoding = HuggingFaceTokenizer.newInstance(DJL_MODEL, getDJLConfig()).encode(text);
    return encoding.getTokens();
}
```

Based on the number of tokens documents can be split. As stated in the LangChain documentation, make sure you also use overlaps of words to avoid losing context.

## Embeddings

Embeddings are stored in vector-based databases. Usually, the embeddings are created by the search engines. However, you can also leverage the same [library](https://github.com/deepjavalibrary/djl-demo/blob/master/huggingface/nlp/src/main/java/com/examples/TextEmbedding.java) to get the embeddings directly.

```java
import ai.djl.huggingface.translator.TextEmbeddingTranslatorFactory;

String DJL_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
String DJL_PATH = "djl://ai.djl.huggingface.pytorch/" + DJL_MODEL;

public float[] getEmbeddings(String text) throws ModelNotFoundException, MalformedModelException, IOException, TranslateException {
    Criteria<String, float[]> criteria =
        Criteria.builder()
            .setTypes(String.class, float[].class)
            .optModelUrls(DJL_PATH)
            .optEngine("PyTorch")
            .optTranslatorFactory(new TextEmbeddingTranslatorFactory())
            .optProgress(new ProgressBar())
            .build();

    ZooModel<String, float[]> model = criteria.loadModel();
    Predictor<String, float[]> predictor = model.newPredictor();
    return predictor.predict(text);
}
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.