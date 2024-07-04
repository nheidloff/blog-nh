---
id: 2409
title: 'Great Introduction to Reactive Microservices'
date: '2017-06-28T13:26:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2409'
permalink: /article/introduction-reactive-microservices/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/introduction-reactive-microservices/
categories:
    - Articles
---

Today, IBM [announced](https://www-03.ibm.com/press/us/en/pressrelease/52723.wss) a new collaborative development initiative with [Lightbend](https://www.lightbend.com/), a provider of a reactive application development platform for building distributed apps. When trying to learn more about that platform, I found a great presentation from the Lightbend CTO Jonas Bonér where he describes the concepts behind reactive microservices.

There is a [shorter](https://www.youtube.com/watch?v=9gLrCPVrXo4) version and a [longer](https://www.youtube.com/watch?v=DRK7WYNh6AA) version of his talk on YouTube as well as a transcript on his [blog](http://jonasboner.com/bla-bla-microservices-bla-bla/). Here are some of my key takeaways.

- Building microservices is relative easy. The more difficult part is everything that happens between the services in distributed systems. That’s where orchestration frameworks like [Kubernetes](https://kubernetes.io/) and the Lightbend platform come to rescue.
- Microservices should minimize synchronous invocations (for example, through REST) for intra-microservices communications to ensure the best possible isolation and autonomicity. Instead, developers should consider using asynchronous communication between the services. This is why reactive libraries like the ones from the [ReactiveX](http://reactivex.io/) programming family and streaming projects like Kafka and gRPC have become so popular.
- I also like Jonas’ statements about state. Sometimes when reading about cloud native apps it feels like you should not have any state. But as Jonas points out you need state and if you don’t handle it in your service, some other component needs to do it for you, which makes it worse.

I’ve used reactive programming in an Angular app over the last year and really like the [observer](http://reactivex.io/intro.html) pattern and such. It has helped me to structure my code much better and isolate different services/components from each other. In [my Angular app]({{ "/article/angular-2-redux" | relative_url }}) this mechanism works nicely together with Redux and the concept of functional programming.

I’m keen to learn more about reactive programming for back-end services. If you want to find out more about reactive microservices and the Lightbend platform you can attend this [webinar](https://info.lightbend.com/webinar-why-ibm-lightbend-announcement-register.html) and [try](http://developer.lightbend.com/start/) their technologies.

{% include embed/youtube.html id='9gLrCPVrXo4' %}