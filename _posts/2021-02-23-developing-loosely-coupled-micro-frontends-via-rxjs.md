---
id: 4458
title: 'Developing loosely coupled Micro Frontends via RxJS'
date: '2021-02-23T09:25:58+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4458'
permalink: /article/developing-loosely-coupled-micro-frontends-rxjs/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-loosely-coupled-micro-frontends-rxjs/
categories:
    - Articles
---

My last article [Developing Micro Frontends with Single-Spa]({{ "/article/developing-micro-frontends-single-spa/" | relative_url }}) explained how to break down monolithic web applications in micro frontends using [single-spa](https://single-spa.js.org/). In order to ensure loosely coupling between the micro frontends, I’ve used RxJS in my sample application.

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies. The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

When breaking down backend monoliths in microservices or monolithic web applications in micro frontends, the amount of dependencies between components should be minimized. [Event driven architectures]({{ "/article/do-not-build-distributed-monoliths/" | relative_url }}) provide several ways to do this.

For example, in my [e-commerce application]({{ "/article/event-driven-architectures-loosely-coupled-microservices/" | relative_url }}) I use Apache Kafka as message broker together with Eclipse MicroProfile to communicate between Java backend services. The microservices which communicate with each other still need to understand which events occur and their data formats, but there is no blocking.

**RxJS – Reactive Extensions For JavaScript**

For the micro frontends in the sample application I looked for a similar capability. For me it feels like [RxJS](https://rxjs.dev/guide/overview) is the most natural JavaScript counterpart for web applications.

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators … (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

In addition to visible components single-spa also supports the usage of utility components. I’ve created a ‘[messaging](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/frontend-single-spa/messaging/src)‘ component with three files.

The core messaging component has only two functions:

- getObservable(microFrontendName): maps to @Incoming in MicroProfile to receive Kafka events
- send(event): maps to @Outgoing in MicroProfile to send Kafka events

```
import { Observable, Subject } from 'rxjs';

export default {
  ...

  getObservable(microFrontendName) {
    switch (microFrontendName) {      
      case MICRO_FRONTEND_CATALOG:
        if (!observableForCatalog) {
          observableForCatalog = new Subject()
        }
        return observableForCatalog
    ...     
    }
  },

  send(event) {
    let topic = event
    let commandId = event.commandId

    switch (topic) {
      case TOPIC_COMMAND_ADD_ITEM:
        if (observableForOrder) {
          observableForOrder.next(message)
        }
        break
    ...
    }
  },
};
```

**Sample Scenario**

Let’s take a look at a sample flow. In the e-commerce sample application users can add products from the catalog to their shopping carts.

- The user clicks the button ‘add to shopping cart’: The catalog micro frontend sends an event
- The order micro frontend subscribed to the event and invokes the business logic to add the product to the shopping cart
- The order micro frontend sends an event that the product has been added to the shopping cart
- The catalog micro frontend receives the confirmation to stop displaying the progress indicator
- The navigator micro frontend receives the confirmation to update the amount of items in the shopping cart

Events are asynchronous and not blocking. However in the sample scenario the catalog micro frontend doesn’t only send events, but wants to invoke an action of the order micro frontend. To implement this with events, I’ve used the command pattern. The order frontend sends a confirmation of the command as another event after the action has been executed.

To visualize the different steps, I’ve used the console.

![image](/assets/img/2021/02/Screenshot-2021-02-23-at-09.42.00.png)

The following [code](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/catalog/src/components/Home.vue) shows how the catalog micro frontend sends and receives events.

```
<script>
import { Messaging } from "@vue-app-mod/messaging";
export default {
  ...
  created() {   
    let observable = Messaging.getObservable(Messaging.MICRO_FRONTEND_CATALOG);
    observable.subscribe({
      next: (message) => {
        switch (message.topic) {
          case Messaging.TOPIC_COMMAND_RESPONSE_ADD_ITEM:
            this.$store.commit("commandResponseReceived", message.payload);
            break;
          case Messaging.TOPIC_NAVIGATOR_CATEGORY_CHANGED:
            this.readProducts(
              message.payload.categoryId,
              message.payload.categoryName
            );
            break;
        }
      },
    });
    ...
  },
  methods: {
    addToShoppingCart(productId) {
      let commandId = Date.now();
      let message = {
        topic: Messaging.TOPIC_COMMAND_ADD_ITEM,
        commandId: commandId,
        payload: {
          productId: productId,
        },
      };
      this.$store.commit("sendCommand", message);
      Messaging.send(message);
    },
```

**What’s next?**

To learn more about application modernization, check out my blog series in the GitHub [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).