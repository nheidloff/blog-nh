---
id: 4388
title: 'Strangler Pattern Example'
date: '2021-02-03T15:58:10+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4388'
permalink: /article/strangler-pattern-example/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/strangler-pattern-example/
categories:
    - Articles
---

According to recent surveys, Kubernetes and microservices have become mainstream and most companies use these technologies in production today. That’s good, but when exactly should you use these technologies and how do you get started?

As I wrote in my previous article [Don’t build distributed Monoliths]({{ "/article/do-not-build-distributed-monoliths/" | relative_url }}) you shouldn’t use microservices just because it’s a hype topic. Different technologies have pros and cons and as developer you need to make the right choices.

When it comes to application modernization, there are [multiple reasons]({{ "/article/ten-reasons-why-enterprises-should-modernize-applications/" | relative_url }}) why you might want to consider, if certain applications should be modernized and how to get started.

**Strangler Fig Pattern**

I’m a big fan of starting simple and learning by doing. That’s why I like the Strangler Fig Pattern (or just Strangler Pattern). [Martin Fowler](https://martinfowler.com/bliki/StranglerFigApplication.html) wrote about this pattern in 2004 (yes, no typo).

Essentially the pattern recommends splitting one service from monoliths to experiment with new microservices architectures rather than doing too many changes at the same time. The monoliths remain functional and the new microservices enrich the monoliths.

The identification of the first microservice to be split from the monolith is not trivial though. Let’s take a look at an example.

I’ve developed a sample application that shows how to modernize an e-commerce application from 2010. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

My first idea was to move the catalog functionality into a separate service. Most users of e-commerce sites probably navigate through different offers while only few users actually log in, add something to their shopping carts and order something.

*So the advantage of splitting the catalog functionality from the monolith is that this part of the application can be scaled independently* from the rest of the application. Economically this means you need less resources like CPU and memory which leads to less costs.

The other reason for splitting the catalog service from the monolith is that there are only a few dependencies to the remaining functionality. I’ll write more about this in a future article.

**IBM’s Mono2Micro Tool**

My sample application is rather simple and my hypothesis to slit the catalog functionality is pretty obvious. For more sophisticated applications the process to identify microservices candidates is more challenging.

IBM provides a new tool [Mono2Micro](https://www.ibm.com/cloud/blog/announcements/ibm-mono2micro) that helps. I’ll write more about this, but here is the result it provided for my simple sample.

![image](/assets/img/2021/02/mono2mircro-3-partitions-1.png)

The purple rectangle is essentially the catalog service (except of the missing Category class).

The green classes make up the remaining monolith (except of Address).

The red classes need to be assigned to either the catalog service of the remaining monolith dependent of class dependencies. Most of them are exceptions which weren’t covered in the use cases.

In summary Mono2Micro confirmed my hypothesis to create a separate catalog service!

Check out the [documentation](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/mono2micro) for details. In order to run the application check out the [ReadMe](https://github.com/nheidloff/application-modernization-javaee-quarkus) of the project.

**What’s next?**

In a future article I’ll explain the different steps how to run Mono2Micro and how the strangled catalog service interacts with the remaining monolith.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).