---
id: 1258
title: 'What are IPython Notebooks and how to use them on Bluemix'
date: '2015-05-13T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/what-are-ipython-notebooks-and-how-to-use-them-on-bluemix/'
permalink: /article/13.05.2015115614NHEDNQ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/13.05.2015115614NHEDNQ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4337902506'
categories:
    - Articles
---

 Last week at StrataHadoop Rod Smith and David Fallside [demonstrated](https://twitter.com/nheidloff/status/596274362262679552) project [Nitro](http://heidloff.net/nh/home.nsf/article.xsp?id=30.04.2015095937NHEBDT.htm) from IBM Emerging Technologies allowing business users to analyze big amounts and different types of data including real-time data. In the optimal case business users can do this without any help but sometimes collaboration with data scientists is necessary who provide the necessary code that can then be consumed in Nitro.

 As I started to learn about big data and analytics only recently I had and have to learn about these topics, for example about other roles, other technologies and other programming languages. In the big data world there is the role of a [Data Scientist](http://www-01.ibm.com/software/data/infosphere/data-scientist/). Here is how [Wikipedia](http://en.wikipedia.org/wiki/Data_science) defines this role:   
 “Data scientists use the ability to find and interpret rich data sources; manage large amounts of data despite hardware, software, and bandwidth constraints; merge data sources; ensure consistency of datasets; create visualizations to aid in understanding data; build mathematical models using the data.”

 As far as programming languages data scientists use a variety of languages which includes also for application developers familiar languages like Java and Scala, but as far as I can see the two mostly used languages are [Python](https://www.python.org/) and [R](http://www.r-project.org/) which have [pros and cons](http://blog.datacamp.com/r-or-python-for-data-analysis/).

 Python code can be written, documented and run easily in [IPython Notebooks](http://ipython.org/notebook.html) which are essentially web based IDEs for data scientists and very popular these days. Many universities are using them and the number of [notebooks on GitHub](https://github.com/ipython/ipython/wiki/A-gallery-of-interesting-IPython-Notebooks) is growing very fast. As example check out how to use [Python to see how the Times writes about men and women](http://nbviewer.ipython.org/gist/nealcaren/5105037) and how to find out [how clean restaurants are in San Francisco](https://github.com/ipython/ipython/wiki/A-gallery-of-interesting-IPython-Notebooks).

 To learn more about IPython Notebooks check out these [tutorials](https://github.com/ipython/ipython/wiki/A-gallery-of-interesting-IPython-Notebooks#introductory-tutorials), the [A Programmer’s Guide to Data Mining](http://guidetodatamining.com/) or the [videos](http://ipython.org/notebook.html) on the IPython website.

 There are several ways to run IPyton Notebooks on [IBM Bluemix](http://bluemix.net/). My colleague Jean Francois Puget blogged recently about how to [deploy notebooks to Bluemix](https://www.ibm.com/developerworks/community/blogs/jfp/entry/using_ipython_notebooks_in_docker_containers_on_bluemix_using_ibm_containers?lang=en) via Docker within minutes. I’ve followed his instructions and it was really easy. So if you want to learn more about this technology just set it up on Bluemix and give it a try.

![image](/assets/img/2015/05/ipython.png)