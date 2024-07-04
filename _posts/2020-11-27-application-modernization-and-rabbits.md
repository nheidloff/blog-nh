---
id: 4247
title: 'Application Modernization and Rabbits'
date: '2020-11-27T07:47:28+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4247'
permalink: /article/application-modernization-and-rabbits/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/application-modernization-and-rabbits/
categories:
    - Articles
    - Java
---

Do you want to know what rabbits have to do with app modernization? Let me explain.

If this article is too long, you can also watch the 1:40 min [video](https://www.youtube.com/watch?v=pEbRbrN3wAU).

Earlier this year I got my children two rabbits. I never wanted to have pets, but this year I thought it was a good distraction and I knew my kids would enjoy it.

The two rabbits were supposed to be females, but as it turned out they were not. All of the sudden we had seven additional baby rabbits.

![image](/assets/img/2020/11/app-mod-rabbits2.jpg)

The original cage became too small.

![image](/assets/img/2020/11/app-mod-rabbits1.jpg)

So we had to build a new set of hutches. In order to be flexible, we connected several hutches with pathways. The pathways can be closed so that, for example, male rabbits can be separated from female rabbits.

![image](/assets/img/2020/11/app-mod-rabbits3.jpg)

The hutches are similar to loosely coupled microservices. You can use them independently from other hutches. The pathways are like network traffic which can be controlled via Kubernetes and Istio. In the next picture the microservices are marked in red and the pathways are blue.

![image](/assets/img/2020/11/app-mod-rabbits4.png)

I explained the [Reasons why Enterprises should modernize Applications]({{ "/article/ten-reasons-why-enterprises-should-modernize-applications/" | relative_url }}) in an earlier blog. Essentially it boils down to three points:

1. More Agility
2. Better Experience
3. Reduced Costs

**More Agility**

With the new structure we can be more agile and adopt faster to new situations. For example, when I need to repair one of these hutches, the rabbits can continue moving around. Similarly, in a microservices application, if you need to fix or improve one of your microservices, you can replace it while your application continues to run.

**Better Experience**

My ‘end users’ are having a much better and faster experience with this modernized structure. There’s a petting zoo, which means they can play with the rabbits at the same time without having to wait for their turn. Similarly, your end users will appreciate better experiences built via modern web or mobile technologies, since it makes them more productive.

![image](/assets/img/2020/11/app5mod-rabbits2.jpg)

**Reduced Costs**

My children promised me to help more with the rabbits, if we can keep all of them, which means less work for me. Similarly modern cloud native architectures save costs. Containers are usually more efficient than virtual machines and require less resources. Additionally when all enterprise applications run on container platforms like Kubernetes or OpenShift, they can be managed consistently. Everything is a container, no matter what programming languages and application stacks are used, and this makes operations easier.

For visual learners, here is a video with the same story:

{% include embed/youtube.html id='pEbRbrN3wAU' %}

To find out more about what IBM offers to modernize your applications, check out our [app modernization landing page](https://www.ibm.com/cloud/architecture/architectures/application-modernization/).