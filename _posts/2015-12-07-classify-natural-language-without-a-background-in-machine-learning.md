---
id: 1679
title: 'Classify Natural Language without a Background in Machine Learning'
date: '2015-12-07T08:15:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1679'
permalink: /article/Classify-Natural-Language-with-ibm-Watson/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4382519039'
custom_permalink:
    - article/Classify-Natural-Language-with-ibm-Watson/
categories:
    - Articles
---

With the [Natural Language Classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html) Watson service in [IBM Bluemix](https://bluemix.net) developers can classify natural language so that, for example, you can build a virtual agent application that answers common questions. Below is a simple sample how you can use this service.

Here is a [description](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html) on the service: “The service enables developers without a background in machine learning or statistical algorithms to create natural language interfaces for their applications. The service interprets the intent behind text and returns a corresponding classification with associated confidence levels. The return value can then be used to trigger a corresponding action, such as redirecting the request or answering a question.”

In order to use the service you need to provide [training data](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/get_start.shtml) that defines the different classes and text samples that fall under certain classes. In the scenario below I have two classes – positive and negative.

```
positive,positive
good,positive
excellent,positive
brilliant,positive
really good,positive
best,positive
supportive,positive
reassuring,positive
encouraging,positive
negative,negative
bad,negative
ugly,negative
really bad,negative
```

Save this file as cvs file and send it to the Watson service.

```
curl -i -u "<username>":"<password>" -F training_data=@./data_train.csv -F training_metadata="{\"language\":\"en\",\"name\":\"PosNegClassifier\"}" "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers
```

After a couple of minutes the training is done and the Watson service returns a classifier\_id that you need to ask the service under which classes specific text falls. Here is a request for the word “awesome” which was **not** in the initial training data.

```
curl -G -u "<username>":"<password>" "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers/3AE103x13-nlc-1116/classify" --data-urlencode "text=awesome"
```

The Watson service returns not only one class but up to the top five classes with the highest confidence levels.

![image](/assets/img/2015/12/classifierresponse2.png)

To learn more about the service check out the [online demo](http://natural-language-classifier-demo.mybluemix.net/), the [engagement gallery sample](http://watson-on-classifier.mybluemix.net/) application, the [documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/) and the [API documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/natural-language-classifier/api/v1/).

In order to improve the quality of the classifier you need to evaluate the results and update the training data. To simplify the management of the training data and the classifiers there is a [toolkit/web application](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/tool_overview.shtml) available.

![image](/assets/img/2015/12/classifierresponse3.png)