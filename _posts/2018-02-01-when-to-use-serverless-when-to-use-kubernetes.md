---
id: 2750
title: 'When to use Serverless? When to use Kubernetes?'
date: '2018-02-01T13:33:10+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2750'
permalink: /article/when-to-use-serverless-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6452158282'
custom_permalink:
    - article/when-to-use-serverless-kubernetes/
categories:
    - Articles
---

A question that I get asked very often these days is: Should I use [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) or [Kubernetes](https://kubernetes.io) to build cloud native applications? Both computing options have pros and cons and it depends on your needs which option you should choose.

**Update 02/19**: I’ve published the slides. [Get the deck from Slideshare](https://www.slideshare.net/niklasheidloff/when-to-use-serverless-when-to-use-kubernetes).

**Update 04/12**: I’ve recorded the [demos](https://www.youtube.com/watch?v=Wqy2AHvhDGs) and published them on YouTube.

![image](/assets/img/2018/02/serverless-kube2.png)

**Use Serverless if you have the following needs**

*1) Variable and irregular Workloads*

A good Serverless scenario is a local website which doesn’t get much or any traffic during nights. Since Serverless platforms only charge for the duration your code runs, this can lead to significant lower costs. The longer applications don’t do anything, the better are the chances that Serverless is cheaper.

However Serverless doesn’t automatically mean lower costs, for example when your applications need to run 24/7. There can also be some hidden costs like extra costs for API management or the costs for the function invocations for tests.

*2) Developer Productivity For first Time Experience*

If you neither have experience in Serverless nor in Kubernetes, it’s easier to get a first hello world application running on Serverless platforms. When you use Kubernetes, you typically have to wait some time to create a cluster, configure Kubernetes to get a public IP address and deploy your first container. With Serverless platforms you can simply use web tooling provided by the cloud providers to get started in minutes.

However Serverless isn’t always easier than Kubernetes. Building and managing a Serverless application with a bunch of functions is more difficult than a simple Kubernetes application with only one container. In fact it might be easier to use Kubernetes for more complex applications because the platform is more mature (see below for more).

*3) Inherent Auto-Scalability*

One of the great capabilities of Serverless is the inherent auto-scalability of functions, since as a developer you don’t have to do anything to leverage this functionality. With Kubernetes you can also use auto-scalability of your pods and even nodes, but it requires some configuration and it is a little slower since this process is only triggered when certain rules apply.

However Kubernetes might provide better scalability features than some Serverless platforms, since Kubernetes is more mature and provides even HA (high availability) between different zones which not all Serverless platforms provide yet.

**Use Kubernetes if you have the following needs**

*1) Mature Deployment Options*

I’m not aware of any Serverless platform that supports A/B testing which I consider a key capability for building cloud native applications. Additionally the monitoring capabilities of Kubernetes applications are much more mature. For example with [Istio](https://istio.io) you can see the execution time of microservices, which service invoked which other services and whether there are bottlenecks. Serverless platforms don’t really have this yet and started only rather recently to add features like Amazon Step Functions and OpenWhisk [Composer](https://github.com/ibm-functions/composer) to define flows between functions.

However if your application is rather simple, for example only one function to provide an API, Serverless might be a better option for you, since the deployment would be easier and monitoring for single functions is provided by the various Serverless platforms.

*2) Minimal Response Latency*

When using Serverless platforms the first invocation of a function takes some time since the code needs to be initialized. For example in OpenWhisk you can use Docker containers which can run Java applications that take some time to start. If you need as fast as possible and reliable response times, you should use Kubernetes.

However Serverless platforms like OpenWhisk have improved significantly recently by doing a lot of caching. After the very first cold start you don’t see these longer response times anymore which might be sufficient for your applications.

*3) High Performance Computing without Resource Restrictions*

Serverless platforms typically have certain resource restrictions, for example functions cannot use more than 512 MB RAM and cannot take longer than 5 minutes. If these restrictions are too strict for your applications, you need to use Kubernetes.

However sometimes it might be possible to break up your applications in smaller functions. In some cases this might even be desirable, for example when moving an existing monolithic application into the cloud.

**Closing Thoughts**

I think it will be interesting to observe how these technologies will evolve this year. I’ve heard about several activities to make Kubernetes easier as well as several activities to make Serverless more mature.

If you want to try out Serverless and Kubernetes, you can get an account on the [IBM Cloud](https://ibm.biz/nheidloff) and try out these computing options.