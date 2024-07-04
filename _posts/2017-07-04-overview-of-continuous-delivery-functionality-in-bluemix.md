---
id: 2426
title: 'Overview of Continuous Delivery Functionality in Bluemix'
date: '2017-07-04T07:05:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2426'
permalink: /article/continuous-delivery-devops-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/continuous-delivery-devops-bluemix/
dsq_thread_id:
    - '5962389997'
categories:
    - Articles
---

For a Bluemix DevOps workshop I’ve prepared a [deck](https://www.slideshare.net/niklasheidloff/ibm-bluemix-continuous-delivery) that gives an overview of the [Continues Delivery](https://console.bluemix.net/devops/getting-started) functionality in [IBM Bluemix](https://bluemix.net).

In the first part I describe why Continuous Delivery is important, what the differences are between Continuous Delivery, Continuous Integration, Continuous Deployment and DevOps as well as key concepts like automation and delivery pipelines. If you haven’t done much with Continuous Delivery yet, I suggest to watch this great [introduction](https://www.youtube.com/watch?v=aoMfbgF2D_4) from Martin Fowler.

One of the things I like about Bluemix Continuous Delivery is the concept of [Open Toolchains](https://console.bluemix.net/docs/services/ContinuousDelivery/toolchains_working.html#toolchains_getting_started). While IBM used to have it’s own tools for basically everything, with toolchains you can integrate third party tools as well as open source tools. Tools in the toolchain can communicate between each other, for example after a successful Jenkins build fixed issues in GitHub can be [annotated]({{ "/article/jenkins-devops-toolchains-bluemix" | relative_url }}) automatically with deployment information.

The screenshot shows the tools that can be used in toolchains.

![image](/assets/img/2017/07/toolchains1.png)

Here is my deck [Continuous Delivery with IBM Bluemix](https://www.slideshare.net/niklasheidloff/ibm-bluemix-continuous-delivery). For the parts that I’ll demonstrate I’ve taken screenshots and added annotations.

<iframe allowfullscreen="" frameborder="0" height="520" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/key/rMfg4wCTvRDSFB" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" width="853"></iframe>

While preparing for the workshop I discovered two new features that I think are worth highlighting. The first one is a new builder type for Kubernetes to easily deploy your apps to your clusters.

![image](/assets/img/2017/07/toolchains3.png)

The second new feature is [Composite Pipelines](https://console.bluemix.net/docs/services/ContinuousDelivery/pipeline_composites.html#deliverypipeline_create_composite) which are useful for microservices applications to see the overall deployment status on one page.

![image](/assets/img/2017/07/toolchains2.png)

If you want to learn more go to [bluemix.net/devops](https://console.bluemix.net/devops/getting-started) and create your own toolchain based on one of the templates.