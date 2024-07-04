---
id: 3954
title: 'Reactive Messaging Examples for Quarkus'
date: '2020-01-27T08:55:15+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3954'
permalink: /article/reactive-messaging-examples-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/reactive-messaging-examples-quarkus/
categories:
    - Articles
---

[Quarkus](https://quarkus.io/) provides several different reactive messaging capabilities. The open source project [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive) uses some of these capabilities in a sample application which are described in this article.

There a several easy to follow Quarkus guides about the topic ‘reactive messaging’. Tutorials are great, but the best way to learn new technologies is for me is to use them in simple applications. That’s why I’ve come up with a simple scenario.

**Sample Application**

The sample comes with a web application which displays links to articles with author information in a simple web application. The web application invokes the web-api service which implements a backend-for-frontend pattern and invokes the articles and authors microservices. The articles service stores data in a Postgres database. Messages are sent between the microservices via Kafka. This diagram describes the high level architecture:

![image](/assets/img/2020/01/reactive-messaging-architecture.png)

One benefit of reactive models is the ability to update web applications by sending messages, rather than pulling for updates. This is more efficient and improves the user experience.

The following video shows how articles can be created via REST API. The web application receives notifications and adds the new articles to the page.

![image](/assets/img/2020/01/reactive-messaging-demo-1-video.gif)

The next diagram explains the flow which I’ll go through in more detail in this article.

![image](/assets/img/2020/01/reactive-messaging-demo-1.png)

1. The ‘submission’ API client invokes a REST endpoint of the ‘articles’ service to create a new article.
2. After the article has been created, a message is sent to Kafka.
3. The ‘web-api’ service has subscribed to Kafka messages so that a listener is invoked.
4. When new articles are created, events are streamed to the web-app.

Let’s take a closer look at the used technologies.

**Sending in-memory Messages via Vert.x Event Bus**

The ‘articles’ and the ‘web-api’ service have been implemented in Java with Quarkus. In both cases I have used a clean architecture approach where the code of the microservice is organized in three packages. These packages are rather independent from each other and could be exchanged with other implementations.

1. API: Contains the REST endpoints and handles incoming and outgoing messages.
2. Business: Contains the business logic of the microservice and business entities.
3. Data: Contains the code to access databases or other microservices.

After a new article has been stored in the Postgres database, a message is sent to Kafka. This is triggered by the business logic, but the actual code resides in the API layer. That’s why the business layer needs to send the message to the API layer first.

Quarkus provides a mechanism for beans to interact via asynchronous messages by enforcing loose-coupling. Check out the guide [Asynchronous messaging between beans](https://quarkus.io/guides/reactive-messaging). This functionality is provided via Eclipse Vert.x which comes with Quarkus.

Here is the [code](https://github.com/IBM/cloud-native-starter/blob/00a8a7ed4f6884bdb5a1b48fd38b015a9f66eb02/reactive/articles-reactive/src/main/java/com/ibm/articles/business/ArticleService.java#L92) that sends the event in memory to the API layer:

```
import io.vertx.axle.core.eventbus.EventBus;
...
@Inject
EventBus bus;
...
private void sendMessageToKafka(Article article) {
  bus.publish("com.ibm.articles.apis.NewArticleCreatedListener", article.id);
}
```

In the API layer the event can be consumed (see [code](https://github.com/IBM/cloud-native-starter/blob/00a8a7ed4f6884bdb5a1b48fd38b015a9f66eb02/reactive/articles-reactive/src/main/java/com/ibm/articles/apis/NewArticleCreatedListener.java#L37)):

```
import io.quarkus.vertx.ConsumeEvent;
...
@ConsumeEvent
public void sendMessageToKafka(String articleId) {
...
}
```

Eclipse MicroProfile supports another mechanism for in memory messages. The reason why I didn’t use it in this case was that I didn’t get it to work. For me the @Outgoing annotation only worked on methods that are either triggered by an incoming event or by the platform (e.g. @PostConstruct). In my case I have to trigger this functionality from the business logic. I’m not sure whether this is a missing feature in MircoProfile, a defect or user error. I’m trying to find this out.

The documentation mentions another reason when you should use the Vert.x event bus: “The asynchronous message passing feature allows replying to messages which is not supported by MicroProfile Reactive Messaging. However, it is limited to single-event behavior (no stream) and to local messages.”

**Sending Kafka messages via Kafka API**

Next the API layer of the ‘web-api’ service needs to send the message to Kafka. In order to set up Kafka in Kubernetes, follow the instructions from my previous article [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }}).

Eclipse MicroProfile Reactive Messaging provides the same @Outgoing annotation to do this, but I couldn’t get it to work since I have to trigger this functionality manually. I want to find out the reason for this as well.

As a workaround I used the Kafka API instead. The usage is pretty straight forward. Unfortunately it looks like the configuration is not read from the same ‘application.properties’ file which MicroProfile uses. Instead I had to do this in the [code](https://github.com/IBM/cloud-native-starter/blob/00a8a7ed4f6884bdb5a1b48fd38b015a9f66eb02/reactive/articles-reactive/src/main/java/com/ibm/articles/apis/NewArticleCreatedListener.java#L26):

```
import io.vertx.core.Vertx;
import io.vertx.kafka.client.producer.KafkaProducer;
...
@Inject
Vertx vertx;

@ConfigProperty(name = "kafka.bootstrap.servers")
String kafkaBootstrapServer;

KafkaProducer<String, String> producer;
...
@PostConstruct
void initKafkaClient() {
  Map<String, String> config = new HashMap<>();
  config.put("bootstrap.servers", kafkaBootstrapServer);
  config.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
  config.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
  producer = KafkaProducer.create(vertx, config);
}
...
@ConsumeEvent
public void sendMessageToKafka(String articleId) {
  try {
    KafkaProducerRecord<String, String> record = KafkaProducerRecord.create("new-article-created", articleId);
    producer.write(record, done -> System.out.println("Kafka message sent: new-article-created - " + articleId));
  } catch (Exception e) {
    // allow to run this functionality if Kafka hasn't been set up
  }
}
```

**Sending and receiving messages via MicroProfile**

Next the ‘web-api’ service needs to receive this message from Kafka. This part can be implemented very easily with MicroProfile Reactive Messaging via the annotation @Incoming. Here is the [code](https://github.com/IBM/cloud-native-starter/blob/00a8a7ed4f6884bdb5a1b48fd38b015a9f66eb02/reactive/web-api-reactive/src/main/java/com/ibm/webapi/apis/NewArticleListener.java#L11):

```
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;
import io.smallrye.reactive.messaging.annotations.Broadcast;
...
@Incoming("new-article-created")
@Outgoing("stream-new-article")
@Broadcast
public String process(String articleId) {
   System.out.println("Kafka message received: new-article-created - " + articleId);
   return articleId;
}
```

In the next step notifications about new articles need to be streamed to the web application. In order to do this, the event is forwarded to the streaming endpoint via the MicroProfile annotations @Outgoing and @Broadcast.

Check out the guide [Using Apache Kafka with reactive messaging](https://quarkus.io/guides/kafka) for more information about these annotations. From a developer experience this is as easy as it can get. I like especially that the same annotations can be used for Kafka channels as well as in memory messaging.

**Sending Events to Web Applications via Server Sent Events**

The last step is to stream the events to web applications. This is done via Server Sent Events and with Quarkus very easy to implement. The streaming endpoint receives the messages via @Channel and forwards them via @Produces(MediaType.SERVER\_SENT\_EVENTS) and @SseElementType (see [code](https://github.com/IBM/cloud-native-starter/blob/00a8a7ed4f6884bdb5a1b48fd38b015a9f66eb02/reactive/web-api-reactive/src/main/java/com/ibm/webapi/apis/NewArticlesStream.java)):

```
import org.reactivestreams.Publisher;
import io.smallrye.reactive.messaging.annotations.Channel;
import org.jboss.resteasy.annotations.SseElementType;
...
public class NewArticlesStream { 
   @Inject
   @Channel("stream-new-article") Publisher<String> newArticles;

   @GET
   @Path("/server-sent-events")
   @Produces(MediaType.SERVER_SENT_EVENTS) 
   @SseElementType("text/plain") 
   public Publisher<String> stream() { 
      return newArticles;
   }
}
```

In the web application the events can be consumed via EventSource. In my case I only send the id of the article and refresh the list of displayed articles (see [code](https://github.com/IBM/cloud-native-starter/blob/00a8a7ed4f6884bdb5a1b48fd38b015a9f66eb02/reactive/web-app-reactive/src/components/Home.vue#L62)). Alternatively I also could send the complete article information in the event.

```
let source = new EventSource(this.$store.state.endpoints.api + "server-sent-events");
let that = this;
source.onmessage = function (event) {
   that.readArticles();
};
```

**Next Steps**

If you want to learn more about reactive programming and reactive messaging, try out the [code](https://github.com/IBM/cloud-native-starter/tree/master/reactive) yourself.

Read the other articles of this series:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Developing reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }})
- [Invoking REST APIs asynchronously with Quarkus]({{ "/article/invoking-rest-apis-asynchronously-with-quarkus/" | relative_url }})
- [Comparing synchronous and asynchronous Access to Postgres]({{ "/article/comparing-synchronous-asynchronous-access-postgresql/" | relative_url }})