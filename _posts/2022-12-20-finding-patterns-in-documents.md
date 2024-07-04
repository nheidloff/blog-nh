---
id: 5586
title: 'Finding Patterns in Documents'
date: '2022-12-20T01:05:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5586'
permalink: /article/finding-patterns-in-documents/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/finding-patterns-in-documents/
categories:
    - Articles
---

*Watson Discovery is an IBM offering to search and analyze information in various types of documents. This post describes how to find patterns in documents via a graphical experience provided by Watson Discovery.*

There are several ways to find patterns in texts. Regular expressions are very powerful, but also not trivial to define. Plus they are not really optimal to identify longer repeating expressions in different formats.

Let’s look at an example. As data the publicly available IBM earning report 2018 is used. The goal is to find all occurrences of ‘revenue of …’ with different amounts. In Watson Discovery you can simply select occurrences of this pattern.

![image](/assets/img/2022/12/wd-04-08.png)

After you’ve selected multiple occurances, Watson starts learning. To improve and validate patterns, Discovery provides a list of further suggestions which can be confirmed or rejected.

![image](/assets/img/2022/12/wd-04-09.png)

The next screenshot shows how well the pattern recognition works.

![image](/assets/img/2022/12/wd-04-10.png)

When searching for documents or parts of documents, the found patterns are annotated.

![image](/assets/img/2022/12/wd-04-17.png)

To find out more about this topic, check out the [Watson Discovery](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-domain-pattern) documentation.