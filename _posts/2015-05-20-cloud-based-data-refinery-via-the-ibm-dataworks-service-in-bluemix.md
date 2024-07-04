---
id: 1263
title: 'Cloud-based Data Refinery via the IBM DataWorks Service in Bluemix'
date: '2015-05-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/cloud-based-data-refinery-via-the-ibm-dataworks-service-in-bluemix/'
permalink: /article/20.05.2015112108NHECYR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/20.05.2015112108NHECYR.htm/
dsq_thread_id:
    - '4325063439'
categories:
    - Articles
---

 Here is another quick introduction to one of the cool services in [IBM Bluemix](http://bluemix.net/) – the [DataWorks](https://www.ng.bluemix.net/docs/services/dataworks1/index.html) service that IBM [announced](http://www.ibmbigdatahub.com/blog/announcing-ibm-dataworks-cloud-based-data-refinery) at the end of last year.

 In order to leverage and analyze data from various sources and big amounts of data, data typically has to be cleansed and prepared first. This includes activities like joining data from multiple sources, filtering out unnecessary parts, sorting and classifying data and so forth. Then the actual processing and analysis of this data is simpler when using tools like dashDB, Hadoop or Watson Analytics. The [DataWorks](https://console.ng.bluemix.net/?ace_base=true/#/store/cloudOEPaneId=store&serviceOfferingGuid=190ed121-e3f8-42da-a77b-bae5613a49a5&fromCatalog=true) service in Bluemix provides various functionality to do this.

 The service comes with a graphical tool [Forge](https://www.ng.bluemix.net/docs/services/dataworks1/index-gentopic4.html) (beta) to load data from various sources. These sources can be sources that are available in the cloud like Salesforce or Amazon Redshift or databases that are run on-premises like DB2 and Oracle. To access the on-premises sources in the cloud the DataWorks service comes with a [secure gateway](https://www.ng.bluemix.net/docs/#services/SecureGateway/index.html) that you can also use separately on Bluemix. The loaded data can then be shaped easily with Forge, e.g. sorted or filtered.

![image](/assets/img/2015/05/forge.png)

 After this step activities are created that can be triggered on a scheduled basis to move the shaped data into data sources like Cloudant, dashDB, Watson Analytics or SQL databases which either provide built-in analytics functionality and/or can be used by application developers to query the data they are interested in.

 The same functionality that is available in Forge (and more) can also be invoked by application developers via APIs. There is a [Data Load REST API](https://www.ng.bluemix.net/docs/services/dataworks1/index-gentopic1.html#task_d4j_q1r_np) to load data ([sample](https://hub.jazz.net/project/dataworks/data-load/overview)) and a [Data Profiling REST API](https://www.ng.bluemix.net/docs/services/dataworks1/index-gentopic3.html#t_adding_data_profiling) to analyze your cloud-based data source to understand the structure and content of the data ([sample](https://hub.jazz.net/project/dataworks/data-profiling/overview)). Additionally there is an [Address Cleansing REST API](https://www.ng.bluemix.net/docs/services/dataworks1/index-gentopic2.html#t_adding_address_verification) to verify US addresses ([sample](https://hub.jazz.net/project/dataworks/address-cleansing/overview)).

 Check out this video to see some of this in action.

{% include embed/youtube.html id='CPh5NehsuBU' %}