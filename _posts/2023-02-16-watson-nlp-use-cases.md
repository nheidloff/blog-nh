---
id: nh-008
title: 'IBM Watson NLP Use Cases'
date: 2023-02-16 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-008'
permalink: /article/watson-nlp-use-cases/
custom_permalink:
    - article/watson-nlp-use-cases/
image: /assets/img/2023/02/build-lab-repo.png
---


*[Watson Natural Language Processing Library for Embed](https://www.ibm.com/products/ibm-watson-natural-language-processing) is a containerized library designed to empower IBM partners with greater flexibility to infuse powerful natural language AI into their solutions. This posts summarizes some of the possible use cases for which documentation and samples are available.*


## Text Classification

Scenario: Customer reviews of hotels are classified in 'non-complaint' and 'complaint'

Data:

```text
Label, Text
Non-Complaint, Staff very friendly and helpful hotel immaculate
Complaint, My room was dirty and I was afraid to walk barefoot on the floor which looked as if it was not cleaned in weeks White furniture which looked nice in pictures was dirty too ...
```

Sample:

* [Notebook: Custom Trained](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Text-Classification/Hotel%20Reviews%20Classification.ipynb)
* The Ensemble 'model' combines three classification models: CNN, SVM with TF-IDF and SVM with USE (Universal Sentence Encoder)
* Alternatively BERT can be used
* Second [sample](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Text-Classification/Consumer%20complaints%20Classification.ipynb) predicts multiple classifications

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* embedding_use_en_stock
* text_stopwords_classification_ensemble_en_stock
* embedding_glove_en_stock
* watson_nlp.workflows.classification.Ensemble
* watson_nlp.blocks.classification.SVM
* watson_nlp.blocks.classification.bert.BERT


## Sentiment Classification

Scenario: 

* Sentiment (positive, neutral, negative) is analyzed for movie reviews
* Analysis is done for document, sentence and aspect/target level: The sentence sentiment model will split the whole document into sentences and return each sentence's sentiment. The document sentiment is calculated by aggregating all the sentence predictions in the document. Each target's sentiment is calculated by aggregating the predictions from all the sentences that contain this target's span. 

Document level:

```text
Label, Text
SENTIMENT_NEGATIVE, I grew up (b. 1965) watching and loving the Thunderbirds. All my mates at school watched. We played "Thunderbirds" before school, during lunch and after school. We all wanted to be Virgil or Scott. No one wanted to be Alan. Counting down from 5 became an art form. I took my children to see the movie hoping they would get a glimpse of what I loved as a child. How bitterly disappointing.
SENTIMENT_POSITIVE, Im a die hard Dads Army fan and nothing will ever change that. I got all the tapes, DVD's and audiobooks and every time i watch/listen to them its brand new. <br /><br />The film. The film is a re run of certain episodes, Man and the hour, Enemy within the gates, Battle School and numerous others with a different edge. Introduction of a new General instead of Captain Square was a brilliant mov...
```

Sentence level:

```text
Sentence, Positive, Neutral, Negative
watching and loving the thunderbirds, 0.747463, 0.236405, 0.016132
How bitterly disappointing, 0.050000, 0.050000, 0.900000
```

Aspect/target level:

Example: "The served food was delicious, yet the service was slow."

The block identifies that there is a positive sentiment expressed towards the target “food”, and a negative sentiment expressed towards “service”.

Samples:

* [Notebook: Pre-Trained Model](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Sentiment-Analysis/Sentiment%20Analysis%20-%20Pre-Trained%20models.ipynb)
* [Notebook: Custom Trained](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Sentiment-Analysis/Sentiment%20Analysis%20-%20Model%20Training.ipynb)
* The custom trained model provides an accuracy of 96%, while the out of the box model only has 87% accuracy
* The CNN models utilize GloVE embeddings
* The BERT model uses the Google Multilingual BERT Foundation Model

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* [sentiment_aggregated-cnn-workflow_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=models-catalog#sentiment) and sentiment-aggregated_cnn-workflow_en_stock
* [sentiment_aggregated-bert-workflow_lang_multi_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-sentiment) and sentiment-document_bert_multi_stock
* pretrained-model_bert_multi_bert_multi_uncased
* watson_nlp.workflows.document_sentiment.BERT


## Emotion Classification

Scenario: Classify emotions in tweets into 'sadness', 'joy', 'anger', 'fear' and 'disgust'

Data:

```text
text, anger, disgust, fear, joy, sadness, highest_emotion
@Markgatiss I'm surrounded by those Trump voters. You're right, it is terrifying. #redstate #despair, 0.105250, 0.184527, 0.325083, 0.138259, 0.139309, fear
jstor's lingua obscura articles are always such a delight, 0.019665, 0.010188, 0.021364, 0.981510, 0.051864, joy
```

Samples:

* [Notebook: Pre-Trained Model](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Emotion-Classification/Emotion%20Classification%20-%20Pre-Trained%20Models.ipynb)
* [Notebook: Custom Trained](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Emotion-Classification/Emotion%20Classification%20-%20Custom%20Model%20Training.ipynb)
* The aggregated emotion workflow model is an ensemble of the three models TF-IDF SVM, USE (Universal Sentence Encoder) SVM, and CNN

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* [emotion_aggregated-workflow_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-emotion) and emotion_aggregated-workflow_en_stock
* watson_nlp.blocks.classification.cnn.CNN
* watson_nlp.workflows.classification.base_classifier.tfidf_svm.TFidfSvm
* watson_nlp.workflows.classification.base_classifier.use_svm.UseSvm


## Keywords and Phrases Extraction

Scenario: Extract noun phrases and keywords from documents

The Watson NLP noun phrases model extracts non-overlapping noun phrases from the input text. 

```text
Example input:
'Anna went to school at University of California Santa Cruz.'
Example phrases: 
'Anna', 'school', 'University of California Santa Cruz'
```

The Watson NLP keywords model extracts from an input document keywords based on how relevant they are within the document. 

```
Example input:
'Anna went to school at University of California Santa Cruz. Anna joined the university in 2015.'
Example keywords: 
'Anna' and 'University of California Santa Cruz' are more relevant than 'school' and 'university'.
```

Sample:

* [Notebook: Pre-Trained Model](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Topic-Modeling/Complaint%20Data%20Topic%20Modeling.ipynb)
* Sample includes text pre-processing (stop-words filtering, remove some patterns, lemmatization)

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* [noun-phrases_rbr_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-noun-phrases) and noun-phrases_rbr_en_stock
* [keywords_text-rank-workflow_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-keywords) and keywords_text-rank_en_stock


## Topic Modeling

Scenario: 

* Extract topics from complaints from banking customers
* As result, customer service teams can mine support tickets to understand what the main problems are and route them to the right experts
* For example, a conversation that includes the words ‘loan’, ‘mortgage’, ‘loan servicing’, or ‘loan payment issues’, could be sent to the loan department for resolution

Output Data:

```json
{
  "clusterId": 0,
  "numDocuments": 227.0,
  "percentage": 2.0183159953765446,
  "cohesiveness": 2.172240128162185,
  "modelWords": [
    "report (report),0.5984445214271545",
    "inquiry (inquiry),0.054762981832027435",
    ...
    ],
  "modelNgram": [
    "inquiry report hard,2.3678008318348054",
    "inquiry report,2.1766209884405305",
    ...
  ],
  "modelId": 0,
  "topicName": "remove_inquiry_report",
  "sentences": [
    "noticed Report ( ) account reported closed consumer , checked report .",
    "Inaccurate date account closed , summary report states remarks report states .",
    ...
```

Samples:

* [Notebook: Custom Trained](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Topic-Modeling/Complaint%20Data%20Topic%20Modeling.ipynb)
* Sample shows how to build in a first step a summary model that suggests ngrams sizes (number of words per topic) and a topic model
* A second [sample](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Topic-Modeling/Complaint%20Data%20Topic%20Modeling%20-%20Compare%20With%20LDA.ipynb) shows the Watson NLP advantages compared to Latent Dirichlet Allocation, e.g. better accuracy and topics don't have to be predefined

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* watson_nlp.toolkit.NGramSummary
* watson_nlp.blocks.topics.HierarchicalClustering


## Entities Extraction

Scenario:

* Extract entities from hotel reviews
* Entities can include names of people, organization names, dates, prices, and facilities

Output Data:

```text
Input text:
Dorset Square Hotel conveniently located, moderately priced luxury hotel. blocks Wax museum London. street pleasant, peaceful park named (what else) Dorset Square, adds quiet ambiance. proximity busy streets tourist attractions.We nights April, 2000 enjoyed stay. restaurant served excellent breakfast, offered English European fare. Buses taxi's easy catch, great night spots short distance away...	

Entities:
Location, street pleasant
Facility, Dorset Square
Date, April, 2000
Organization, English European
```

Sample:

* [Notebook: Pre-trained Models](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Entities-Keywords-Extraction/Hotel%20Reviews%20Analysis%20-%20Entities%20and%20Keywords.ipynb)
* The same notebook also demonstrates keywords, phrases and sentiments detecion

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* [entity-mentions_bilstm-workflow_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-entity-mentions) and entity-mentions_bilstm_en_stock
* [entity-mentions_rbr_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-entity-mentions)
* [entity-mentions_bert-workflow_lang_multi_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-entity-mentions) and entity-mentions_bert_multi_stock


## Text Categorization

Scenario:

* Create a hierarchical categorization system for news articles that is more specific than broad categories like politics, sports, and entertainment
* For example, articles on politics can be further categorized into subcategories like crime, war, education etc.

Data:

```text
Input:
President issues vow as tensions with China rise. ...

Output:
{
  "categories": [
    {
      "labels": [
        "news and politics",
        "politics",
        "political issues"
      ],
      "score": 0.999511,
      "explanation": [
        {
          "text": "issues"
        }
      ]
...
```

Sample:

* [Notebook: Pre-trained Model](https://github.com/ibm-build-lab/Watson-NLP/blob/main/ML/Text-Categorization/Text%20Categorization%20-%20Pre-trained%20Model.ipynb)
* This notebook demonstrates how to use the Explicit Semantic Analysis (ESA) block for performing text categorization. This model has been pre-trained on scrapped web data & news data set

Used Watson NLP models and libraries:

* [syntax_izumo_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-syntax) and syntax_izumo_en_stock
* [categories_esa-workflow_lang_en_stock](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-categories) and categories_esa_en_stock
* watson_nlp.blocks.categories.ESAHierarchical


## What's next?

In addition to the use cases above, Watson NLP also supports the following functionality.

* [Relation Extraction](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-relations)
* Coreference
* [Concept Extraction](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-concepts)
* Topical Clustering
* [PII entities](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-entity-mentions)
* [Categories Detection](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-categories)
* [Language Detection](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-lang-detect)
* [Detag HTML Tags](https://www.ibm.com/docs/en/watson-libraries?topic=catalog-detag)

To find out more, check out the [documentation](https://www.ibm.com/docs/en/watson-libraries?topic=watson-natural-language-processing-library-embed-home).