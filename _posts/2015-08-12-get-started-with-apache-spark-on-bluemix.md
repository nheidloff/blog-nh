---
id: 1364
title: 'Get started with Apache Spark on Bluemix'
date: '2015-08-12T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/get-started-with-apache-spark-on-bluemix/'
permalink: /article/12.08.2015121755NHEE4A.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
custom_permalink:
    - article/12.08.2015121755NHEE4A.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4326403816'
categories:
    - Articles
---

 Recently IBM has added a beta version of the new [Apache Spark](https://console.ng.bluemix.net/catalog/apache-spark/) service to [IBM Bluemix](https://bluemix.net/). [Apache Spark](http://spark.apache.org/) is a fast and general engine for large-scale data processing. [Performance benchmarks](http://spark.apache.org/news/spark-wins-daytona-gray-sort-100tb-benchmark.html) have shown that it can be up to 100 times faster than Hadoop.

The Spark beta service on Bluemix can only be used as part of the [Apache Spark Starter](https://console.ng.bluemix.net/catalog/apache-spark-starter/) on Bluemix which comes with a SWIFT [Object Storage](https://console.ng.bluemix.net/catalog/object-storage/) service for the storage of files and integrated [Jupyter Notebooks](https://jupyter.org/) for interactive and reproducible data analysis and visualization. Notebooks are essentially web based IDEs for data scientists to program and document their algorithms.

The Spark Starter includes three sample notebooks that show how to use Python and Scala as programming languages. All samples use publically accessible weather data that needs to be uploaded to the object storage service. The screenshot below is from the sample to identify the 10 weather stations with the highest amount of average precipitations in the US. With the first three lines data is loaded and then the amount of entries and the first entry is printed out.

![image](/assets/img/2015/08/sparkstarter.png)

To learn more read the articles from my colleague Luis Arellano [Introducing IBM Analytics for Apache Spark](https://developer.ibm.com/bluemix/2015/07/21/ibm-analytics-for-apache-spark-beta/) and [Top 5 Tips to get Started On Apache Spark](https://developer.ibm.com/bluemix/2015/07/22/top-5-tips-to-get-started-on-apache-spark/).