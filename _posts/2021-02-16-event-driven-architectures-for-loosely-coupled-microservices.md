---
id: 4404
title: 'Event driven Architectures for loosely coupled Microservices'
date: '2021-02-16T11:50:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4404'
permalink: /article/event-driven-architectures-loosely-coupled-microservices/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/event-driven-architectures-loosely-coupled-microservices/
categories:
    - Articles
---

The [strangler pattern]({{ "/article/strangler-pattern-example/" | relative_url }}) is a common methodology to break down monoliths in microservices. However caution needs to be taken to prevent building [distributed monoliths]({{ "/article/do-not-build-distributed-monoliths/" | relative_url }}). This article describes how to use event driven architectures for loosely coupled microservices.

Distributed systems have several advantages, for example resiliency and horizontal scalability. At the same time they introduce new challenges compared to classic monolithic systems related to the networking overhead between services. When breaking down monoliths into microservices, the goal is to minimize the dependencies between the services.

While in the optimal case strangled services are independent from the monoliths, in reality there are often still some dependencies. Even the plants used as analogy in the strangler fig pattern still dependent on the monolith (at least initially).

There are many different ways how services can communicate: Different protocols, sync vs async, different serialisation technologies, etc. One of the most common and easiest ways to communicate between services are synchronous REST API invocations. However, when it comes to microservices based architectures, this technique is often considered an anti-pattern since the dependencies from monolithic architectures still exist and they are now even harder to manage in distributed systems.

As alternative event-driven architectures and asynchronous communications are very promising. Let me describe how to use events in a real world example.

Just before I do this, let me clarify one thing: The dependencies don’t disappear completely and, as always, this approach is not the solution for all problems. But I think event driven architectures can minimize the coupling between services.

**Example Application**

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

In a previous [article]({{ "/article/strangler-pattern-example/" | relative_url }}) I explained how you can identify which part of the monolith application should be put in a separate service. I decided to move the catalog functionality into a separate service. Most users of e-commerce sites probably navigate through different offers while only few users actually log in, add something to their shopping carts and order something. So the advantage of splitting the catalog functionality from the monolith is that this part of the application can be scaled independently from the rest of the application. Economically this means you need less resources like CPU and memory which leads to less costs.

The catalog functionality is pretty separate from the functionality of the remaining monolith, for example account information and orders. However there still are some dependencies. Let’s say users added products from the catalog to their shopping carts. When the prices (or titles, ratings, descriptions, etc.) of these products change, there should be some indications in the shopping cart user interface.

Here is an architecture diagram of the application:

![image](/assets/img/2021/02/strangler-pattern-example.png)

The following screenshot shows the web application of the legacy application with the price change indication (before the user interface was modernized).

![image](/assets/img/2021/02/storefront-new-price.png)

**Event Producer**

In order to display the new price, the order service (the remaining monolith) could invoke a synchronous REST API of the catalog service. In order to minimize the coupling between the components, I’m using events instead.

Here is the [code](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-synch/src/main/java/com/ibm/catalog/ProductResource.java) of the ‘strangled’ catalog service which has been implemented with Quarkus. The application uses MicroProfile and Kafka to send events asynchronously.

```
@PUT
@Consumes("application/json")
@Produces("application/json")
@Path("/CustomerOrderServicesWeb/jaxrs/Product/{id}")
@Transactional
public Product update(@PathParam("id") Long id, Product updatedProduct) {        
   Product existingProduct = entityManager.find(Product.class, id);
   if (existingProduct == null) {
      throw new WebApplicationException(Response.Status.BAD_REQUEST);
   }    
   existingProduct.price = updatedProduct.price;
   entityManager.persist(existingProduct);
   sendMessageToKafka(existingProduct.id, existingProduct.price);
   return existingProduct;	    
}

@ConfigProperty(name = "kafka.bootstrap.servers")
String kafkaBootstrapServer;

@Inject
Vertx vertx;

private KafkaProducer<String, String> producer;

@PostConstruct
void initKafkaClient() {
   Map<String, String> config = new HashMap<>();
   config.put("bootstrap.servers", kafkaBootstrapServer);
   config.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
   config.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
   producer = KafkaProducer.create(vertx, config);
}

public void sendMessageToKafka(Long productId, BigDecimal price) {
   String productIdString = productId.toString();
   String priceString = price.toString();
   try {
      KafkaProducerRecord<String, String> record = KafkaProducerRecord.create("product-price-updated", productIdString + "#" + priceString);
      producer.write(record, done -> System.out.println("Kafka message sent: product-price-updated - " + productIdString + "#" + priceString));
   } catch (Exception e) {
   }
}
```

**Event Consumer**

The remaining monolith runs on Open Liberty. In order to prevent synchronous invocations of the catalog service, it caches the changed prices in it’s own Db2 database in a new column.

![image](/assets/img/2021/02/strangler-caching.png)

Here is the [code](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty-cloud-native/src/main/java/org/pwte/example/ProductPriceChanged.java) of the remaining monolith which also uses MicroProfile.

```
import org.eclipse.microprofile.reactive.messaging.Incoming;
import javax.enterprise.context.ApplicationScoped;
import org.pwte.example.service.CustomerOrderServicesImpl;
import javax.inject.Inject;

@ApplicationScoped
public class ProductPriceChanged {

@Inject 
CustomerOrderServicesImpl customerOrderServices;		

@Incoming("product-price-updated")
public String process(String message) {
   String productId = "";
   String newPrice = "0";
   try {
      productId = message.substring(0, message.indexOf("#"));
      newPrice = message.substring(message.indexOf("#") + 1, message.length());
      customerOrderServices.updateLineItem(productId, newPrice);
   }
   catch (Exception e) {}        
      return message;
   }   
}
```

**What’s next?**

While there are still dependencies between the strangled catalog service and the remaining monolith, the coupling is minimal.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).

Also check out [AsyncAPI](https://www.asyncapi.com/) which aims to be a standard for defining asynchronous APIs.