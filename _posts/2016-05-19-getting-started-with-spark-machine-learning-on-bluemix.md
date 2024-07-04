---
id: 2119
title: 'Getting started with Spark Machine Learning on Bluemix'
date: '2016-05-19T10:15:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2119'
permalink: /article/getting-started-spark-machine-learning-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/getting-started-spark-machine-learning-bluemix/
categories:
    - Articles
---

I’m fascinated by the power of machine learning and I’m trying to learn more about this technology. I’ve started to look into how to use the machine learning library in Spark.

The Spark documentation of the [spark.ml](http://spark.apache.org/docs/latest/ml-guide.html) package explains the main concepts like pipelines and transformers pretty well. There are also a number of good [videos](https://www.youtube.com/user/TheApacheSpark/videos) on YouTube about machine learning. I’ve used the [spark.ml](http://spark.apache.org/docs/latest/ml-guide.html) library as opposed to [spark.mllib](http://spark.apache.org/docs/latest/mllib-guide.html) since it’s the recommended approach and it uses Spark DataFrames which makes the code easier.

[IBM Bluemix](https://bluemix.net) provides an [Apache Spark service](https://new-console.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index.html#index) that I’ve used to run samples. The simplest way to get started is to follow the Bluemix [tutorial](https://developer.ibm.com/clouddataservices/docs/spark/tutorials-and-samples/use-the-machine-learning-library/). There is a simple sample Scala notebook to determine the top drop off locations for New York City taxis.

In addition to the taxi sample and the the simple samples in the Spark documentation there are more [samples](https://github.com/apache/spark/tree/branch-1.6/examples/src/main/scala/org/apache/spark/examples/ml) on GitHub. Make sure you use the samples of the 1.6 branch since that is the Spark version currently supported on Bluemix. I’ve chosen Scala as programming language since most of the machine learning samples I’ve seen have been written in Scala plus there are good ways to debug this code.

The Spark machine learning samples can be run on Bluemix in two different ways. Either as [notebooks](https://new-console.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index-gentopic2.html#genTopProcId3) or as [Spark applications](https://new-console.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index-gentopic3.html#genTopProcId4). The advantage of notebooks is that you don’t have to set up anything. However it’s more difficult to debug code.

To run the Spark samples in notebooks you need to copy and paste only subsets of them. Let’s take the machine learning algorithm [KMeans](https://github.com/apache/spark/blob/branch-1.6/examples/src/main/scala/org/apache/spark/examples/ml/KMeansExample.scala) as an example. Essentially you only need the code between ‘// $example on$’ and ‘// $example off$’. In order to get the sqlContext I added ‘val sqlContext = new org.apache.spark.sql.SQLContext(sc)’ to the notebook. You also need to remove the spaces before the ‘.xxx’ when lines break since notebooks don’t seem to like this.

![image](/assets/img/2016/05/sparkml1.jpg)

While notebooks are easy to get started, I switched to a local Scala IDE to build and run these samples. The advantage is that with a local IDE you can debug and test your code better. My colleague David Taieb describes in this [article](https://developer.ibm.com/clouddataservices/start-developing-with-spark-and-notebooks/) how to set up a local Scala IDE. The instructions are easy to follow. Just make sure to use the Spark version 1.6.0 in sbt.build (rather than 1.3.1).

Here is a screenshot of the same sample running in my IDE. The class name of the sample needs to be defined in the program arguments in the run configuration dialog.

![image](/assets/img/2016/05/sparkml2.jpg)

In order to run the application on Bluemix use the script [spark-submit.sh](https://new-console.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index-gentopic3.html#spark-submit_properties).

```
./spark-submit.sh \
--vcap ./vcap.json \
--deploy-mode cluster \
--class org.apache.spark.examples.ml.KMeansExample \
--master https://169.54.219.20 \
./target/scala-2.10/hellospark_2.10-1.0.jar file://spark-submit_20160305165113.log
```