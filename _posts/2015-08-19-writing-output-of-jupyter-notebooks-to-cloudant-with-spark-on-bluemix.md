---
id: 1411
title: 'Writing Output of Jupyter Notebooks to Cloudant with Spark on Bluemix'
date: '2015-08-19T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/writing-output-of-jupyter-notebooks-to-cloudant-with-spark-on-bluemix/'
permalink: /article/19.08.2015095346NHEBA7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/19.08.2015095346NHEBA7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4328332600'
categories:
    - Articles
---

 With the new beta service [Apache Spark](https://www.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index.html) and the support of [Jupyter Notebooks](https://jupyter.org/) in [IBM Bluemix](https://bluemix.net/) data analysts can run large scale data processing. The output can be visualized directly in the notebooks or it can be stored as files in the Swift [object storage](https://console.ng.bluemix.net/catalog/object-storage/) service that comes with the [Bluemix Spark starter](https://console.ng.bluemix.net/catalog/apache-spark-starter/).

 Alternatively you can also store the data in other [data and analytics services](https://console.ng.bluemix.net/data/discovery/) in Bluemix. In the example below I wrote simple Scala code which uses the [Apache Http Client](https://hc.apache.org/) library to invoke REST APIs from [Cloudant](https://cloudant.com/). After this developers can for example use the Cloudant REST APIs to leverage the data in visualization tools or they can move the data to [dashDB](https://console.ng.bluemix.net/catalog/dashdb/) to analyze that data with advanced built-in analytics like predictive analytics and data mining.

![image](/assets/img/2015/08/sparkwritetocloudant.png)

 The credentials from the object storage service are available as environment variables. Credentials from other Bluemix services (from VCAP\_SERVICES) can currently not be accessed via environment variables.