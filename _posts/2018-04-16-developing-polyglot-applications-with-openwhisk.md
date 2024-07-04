---
id: 2945
title: 'Developing Polyglot Applications with OpenWhisk'
date: '2018-04-16T12:48:04+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2945'
permalink: /article/polyglot-openwhisk-serverless/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/polyglot-openwhisk-serverless/
categories:
    - Articles
---

As serverless platforms mature, more and more sophisticated cloud-native applications are built with serverless technologies. I’ve created a sample application which uses multiple functions which have been developed with JavaScript, TypeScript, Java and Kotlin.

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-polyglot)

Functions in a serverless application can be developed by different teams and might be reused in different applications. The functions are rather easy and stateless, the interesting question is how to build applications which handle the invocations of functions and the flows of data between the functions. The way [OpenWhisk](https://openwhisk.apache.org/) solves this is by providing an extension called [Composer](https://github.com/ibm-functions/composer) which is also available as open source.

In my sample application I’ve used several programming languages because the bigger applications get, the more likely it is that you want to use different languages. For example you might want to reuse existing code or libraries in serverless functions or you want to leverage certain skills in your team. Additionally certain languages might allow you to implement functions more efficiently.

OpenWhisk supports several programming languages out of the box. In the sample I’ve often used Docker which might be important for your requirements as well. For example with Docker you can develop and test the same image locally, which is deployed onto the cloud. This minimizes the risk of running into issues due to different environments. Docker also allows you to use programming languages your cloud function provider doesn’t support natively or newer version of languages and runtimes than the ones supported by your cloud function provider.

For a demo check out the video starting at [2:18 min](https://youtu.be/N0T8jkfkuEg?t=2m18s).

{% include embed/youtube.html id='N0T8jkfkuEg' %}

This is the screenshot of the sample application in the IBM Cloud Shell.

![image](/assets/img/2018/04/polyglot-serverless.png)

Want to run this sample yourself? Try it out on the [IBM Cloud](https://ibm.biz/nheidloff).