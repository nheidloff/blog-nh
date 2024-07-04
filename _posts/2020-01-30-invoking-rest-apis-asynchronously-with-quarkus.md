---
id: 3984
title: 'Invoking REST APIs asynchronously with Quarkus'
date: '2020-01-30T09:38:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3984'
permalink: /article/invoking-rest-apis-asynchronously-with-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/invoking-rest-apis-asynchronously-with-quarkus/
categories:
    - Articles
---

Recently I blogged about how to [develop reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }}). Developing the actual endpoints asynchronously is the first step. To leverage reactive capabilities maximally though, the complete code path should be asynchronous, especially long lasting operations like database accesses and REST API invocations. This article describes two options how to invoke REST APIs asynchronously with [Quarkus](https://quarkus.io/).

**Two Options to invoke REST APIs asynchronously**

Here are the two options:

- [Eclipse MicroProfile REST Client](https://github.com/eclipse/microprofile-rest-client)
- [Eclipse Vert.x Axle Web Client](https://vertx.io/docs/vertx-web-client/java/)

The question is when to use which option. Rather than trying to answer this myself, let me refer to [Clement Escoffier](https://twitter.com/clementplop?lang=en), the reactive expert in the Quarkus team. Clement answered this question on [StackOverflow](https://stackoverflow.com/questions/58453542/microprofile-rest-client-vs-vertx-client-in-quarkus):

- The MicroProfile Rest Client is not non-blocking. The Vert.x web client is.
- If the rest of your code uses RX Java, the Vert.x client has a neat RX Java API.
- The MicroProfile Rest Client is using an annotation-driven approach, the Vert.x client is API-driven.

You can use both options in the same application which is what I’ve done in the sample application that is included in the [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive) project. The sample application uses several microservices. The web-api service invokes the articles service which I’ll describe below.

![image](/assets/img/2020/01/reactive-micoprofile-client.png)

**Eclipse Vert.x Axle Web Client**

The Quarkus guide [Using Eclipse Vert.x](https://quarkus.io/guides/vertx#using-vert-x-clients) describes how to use the Vert.x client. Let’s take a look at the [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/web-api-reactive/src/main/java/com/ibm/webapi/data/ArticlesServiceDataAccess.java#L106) to invoke the articles service from the web-api service.

```
import io.vertx.axle.core.Vertx;
import io.vertx.axle.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.core.json.JsonArray;
import javax.annotation.PostConstruct;
import java.util.concurrent.CompletableFuture;
...
@Inject
Vertx vertx;
private WebClient client;

@PostConstruct
void initialize() {				
  this.client = WebClient.create(vertx, new WebClientOptions().setDefaultHost(ARTICLES_DNS).setDefaultPort(ARTICLES_PORT).setSsl(false));
}

public CompletableFuture<List<CoreArticle>> getArticlesReactiveVertxWebClient(int amount) {		
  CompletableFuture<List<CoreArticle>> future = new CompletableFuture<>();
  this.client.get("/v2/articles?amount=" + amount)
    .send()
    .toCompletableFuture() 
    .orTimeout(MAXIMAL_DURATION, TimeUnit.MILLISECONDS)
    .thenAccept(resp -> {
      if (resp.statusCode() == 200) {
        List<CoreArticle> articles = this.convertJsonToCoreArticleList(resp.bodyAsJsonArray());
        future.complete(articles);
      } else {
        future.completeExceptionally(new NoConnectivity());
      }
    })
    .exceptionally(throwable -> {
      future.completeExceptionally(new NoConnectivity());
      return null;
    });
    return future;
}
```

The methods ‘get’ and ‘send’ invoke the HTTP request. I’ve explained in my previous [article]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }}) why ‘toCompletableFuture’ and ‘orTimeout’ or used.

Once the request has been completed, the HTTP status code has to be checked and converted into a Java exception. If the request has been successful, the response will be a io.vertx.core.json.JsonArray or io.vertx.core.json.JsonObject. These objects need to be converted manually into Java objects, in this example in a list of articles.

**Eclipse MicroProfile REST Client**

The second option is to use the MicroProfile REST Client. Check out my previous blog [Invoking REST APIs from Java Microservices](http://heidloff.net/invoke-rest-apis-java-microprofile-microservice) which explains how to invoke REST APIs synchronously.

The MicroProfile REST Client has been extended to also support asynchronous invocations. There is an OpenLiberty guide [Consuming RESTful services asynchronously](https://openliberty.io/guides/microprofile-rest-client-async.html) that describes this functionality.

Again, let’s take a look at the [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/web-api-reactive/src/main/java/com/ibm/webapi/data/ArticlesServiceReactive.java). First you need to define an interface to the service you want to invoke:

```
import java.util.concurrent.CompletionStage;
import org.eclipse.microprofile.rest.client.annotation.RegisterProvider;
...
@RegisterProvider(ExceptionMapperArticles.class)
public interface ArticlesServiceReactive {
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public CompletionStage<List<CoreArticle>> getArticlesFromService();
}
```

In this interface an exception mapper class is defined. This class maps HTTP errors to Java exceptions (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/web-api-reactive/src/main/java/com/ibm/webapi/data/ExceptionMapperArticles.java)):

```
import org.eclipse.microprofile.rest.client.ext.ResponseExceptionMapper;
...
@Provider
public class ExceptionMapperArticles implements ResponseExceptionMapper<InvalidArticle> {
  @Override
  public boolean handles(int status, MultivaluedMap<String, Object> headers) {
    return status == 204;
  }
  @Override
  public InvalidArticle toThrowable(Response response) {
    switch (response.getStatus()) {
      case 204:
        return new InvalidArticle();
      }
      return null;
    }
}
```

In order to invoke the REST API, a normal Java method can be called. The implementation of this method handles MicroProfile magically (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/web-api-reactive/src/main/java/com/ibm/webapi/data/ArticlesServiceDataAccess.java#L80)):

```
public CompletableFuture<List<CoreArticle>> getArticlesReactive(int amount) {		
  CompletableFuture<List<CoreArticle>> future = new CompletableFuture<>();
  URL apiUrl;
  try {
    apiUrl = new URL("http://" + ARTICLES_DNS + ":" + ARTICLES_PORT + "/v2/articles?amount=" + amount);
    ArticlesServiceReactive articlesServiceReative = RestClientBuilder.newBuilder().baseUrl(apiUrl).build(ArticlesServiceReactive.class);
    articlesServiceReative.getArticlesFromService()
      .toCompletableFuture()
      .orTimeout(MAXIMAL_DURATION, TimeUnit.MILLISECONDS)	
      .thenAccept((articles) -> {
        future.complete(articles);
      })
      .exceptionally((throwable) -> {
        future.completeExceptionally(new NoConnectivity());
        return null;
      });
    } catch (MalformedURLException e) {
      future.completeExceptionally(new NoConnectivity());
    }
  return future;
}
```

Note that the deserialization of the JSON response into a list of articles is done automatically.

**Closing Thoughts**

My two cents: If you are not an experienced Rx Java developer, I’d go with MicroProfile for asynchronous REST invocations. The MicroProfile model is nicely designed, you don’t have to convert objects manually and it’s not blocking.

All samples of this article are included in the open source project [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive). Check it out to see the code in action.

This article is part of a series. Read the other articles of this series to learn about reactive programming:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Developing reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }})
- [Comparing synchronous and asynchronous Access to Postgres]({{ "/article/comparing-synchronous-asynchronous-access-postgresql/" | relative_url }})