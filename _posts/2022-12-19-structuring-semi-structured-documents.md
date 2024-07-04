---
id: 5577
title: 'Structuring semi-structured Documents'
date: '2022-12-19T00:49:13+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5577'
permalink: /article/structuring-semi-structured-documents/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/structuring-semi-structured-documents/
categories:
    - Articles
---

*Watson Discovery is an IBM offering to search and analyze information in various types of documents. This post describes how the graphical interface in Discovery can be used to structure information in documents to reduce noise.*

Let’s take a look at an example. In the sample scenario data is used from the [US Securities and Exchange Commission](https://www.sec.gov/tm/reports-and-publications/special-studies/algo_trading_report_2020). The goal is to improve the quality of the result for the question “What is the purpose of Rule 15c3-5?”.

By default Watson Discovery returns the right answer from page 81.

![image](/assets/img/2022/12/Screenshot-2022-12-13-at-09.24.07.png)

But the result includes the ‘noise’ from the previous sentence.

![image](/assets/img/2022/12/wd-03-06.png)

To improve this, the document can be structured by identifying sections graphically. The following screenshot shows how footnotes, subtitles, headers, etc. can be defined by selecting text in the right column.

![image](/assets/img/2022/12/wd-03-10.png)

As result Discovery understands the different sections in the document and only returns the actual sentence of the answer.

![image](/assets/img/2022/12/wd-03-13.png)

To find out more about Watson Discovery, check out the [documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-train).