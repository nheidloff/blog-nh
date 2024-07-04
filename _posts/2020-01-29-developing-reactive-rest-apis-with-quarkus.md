---
id: 3971
title: 'Developing reactive REST APIs with Quarkus'
date: '2020-01-29T13:04:14+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3971'
permalink: /article/developing-reactive-rest-apis-with-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-reactive-rest-apis-with-quarkus/
categories:
    - Articles
---

This article describes how to implement reactive REST APIs in Java with [Quarkus](https://quarkus.io/) rather than using synchronous endpoints. In order to do this, the Java classes CompletableFuture and CompletionStage are needed. The article explains how to use these classes and how to chain asynchronous method invocations including exception handling and timeouts.

**Why to use reactive REST APIs?**

The first question you probably ask is, why should you change old habits and not use imperative code? After all implementing asynchronous code is rather unusual for some Java developers and requires a new thinking.

I think the short answer is efficiency. I’ve run two load tests where I compared reactive code with imperative code. In both cases the response times of the reactive code was only half of the duration of the imperative code. While these tests are not representative for all types of scenarios, I think they demonstrate nicely the benefits of reactive programming.

See the documentation which describes the performance tests for details:

- [Simple REST API with Postgres database access](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/PersistencePerformanceTests.md)
- [Cloud native application with multiple microservices](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/LoadTests.md)

That having said, I don’t think that reactive REST APIs need to be used for all types of applications. For example not every application needs to be highly scalable. Additionally the development costs for reactive applications could be higher, since new skills might have to be learned and classic development processes might have to be extended.

**First reactive REST API**

The Quarkus guide [Using Eclipse Vert.x](https://quarkus.io/guides/vertx#using-vert-x-in-reactive-jax-rs-resources) provides a hello world example of a reactive REST API. In order to learn new technologies, it helps me writing simple sample applications after following the getting started tutorials. That’s why I’ve created a sample application which is available as part of the [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive) project.

The project contains a microservice ‘articles’ which provides a REST API that returns articles from a database. Let’s take a look at the [code ](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/apis/GetArticlesReactive.java#L45):

```
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import javax.ws.rs.core.Response;
import javax.json.JsonArray;
...
@GET
@Path("/articles")
@Produces(MediaType.APPLICATION_JSON)
public CompletionStage<Response> getArticlesReactive(int amount) {
  CompletableFuture<Response> future = new CompletableFuture<>();
  articleService.getArticlesReactive(amount).thenApply(articles -> {
    JsonArray jsonArray = articles.stream()
      .map(article -> articleAsJson.createJson(article))
      .collect(JsonCollectors.toJsonArray());            
      return jsonArray;
    }).thenApply(jsonArray -> {            
      return Response.ok(jsonArray).build();
    }).exceptionally(throwable -> {  
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }).whenComplete((response, throwable) -> {
      future.complete(response);          
    });
  return future;
}
```

Rather than returning javax.ws.rs.core.Response, a java.util.concurrent.CompletionStage with a Response object is given back. Additionally the CompletionStage is returned immediately before the actual business code is run. After the business logic has been run, the CompletionStage is completed (via ‘CompletionStage.complete’) and the response is delivered to the API client. The nice thing with this approach is that while the business code is running, the main thread is not blocked.

The class java.util.concurrent.CompletableFuture is an implementation of the interface java.util.concurrent.CompletionStage. CompletableFuture also implements java.util.concurrent.Future so that code can wait for responses and read the responses via ‘CompletableFuture.get’. Additionally CompletableFuture provides ways to handle timeouts which I describe below.

Learning the capabilities and the correct usage of CompletionStage and CompletableFuture can be challenging. The session [CompletableFuture: The Promises of Java](https://www.youtube.com/watch?v=9ueIL0SwEWI) helped me a lot.

The actual business logic is provided by another class, called ‘ArticlesService’. The method ‘getArticlesReactive’ is an asynchronous method and returns a CompletionStage with a list of articles. Once then response is provided, methods like ‘CompletionStage.thenApply’, ‘CompletionStage.thenAccept’ and ‘CompletionStage.thenRun’ can be used to access the response.

All of these methods return a CompletionStage again, so that the methods can be chained as in the snippet above. ‘CompletionStage.thenApply’ allows receiving an input object and returning another object (wrapped in a completion stage). In the sample the list of articles is converted into a JSON array and after this the array is converted into a Response.

**Chained asynchronous Invocations and Error Handling**

The ‘articles’ microservice has been implemented with a clean architecture approach where the code of the microservice is organized in three packages. These packages are rather independent from each other and could be exchanged with other implementations.

1. API: Contains the REST endpoints and handles incoming and outgoing messages.
2. Business: Contains the business logic of the microservice and business entities.
3. Data: Contains the code to access databases or other microservices.

In the sample the REST endpoint from above resides in the API layer and invokes ArticlesService in the business layer.

Invocations are rather straight forward as described above. The question is how to handle exceptions. The cloud-native-starter project provides also a synchronous implementation of the REST endpoint. Let’s compare how error handling is done in both cases.

The synchronous version of ArticlesService has a method ‘getArticles’ which throws two exceptions (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/business/ArticleService.java#L111)):

```
List<Article> getArticles(int requestedAmount) throws NoDataAccess, InvalidInputParameter {
```

As usual these exceptions can be caught in the code that invokes the method (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/apis/GetArticles.java#L46)):

```
public Response getArticles(int amount) {
  JsonArray jsonArray;
  try {
    jsonArray = articleService.getArticles(amount).stream().map(article -> articleAsJson.createJson(article)).collect(JsonCollectors.toJsonArray());
    return Response.ok(jsonArray).build();
  } catch (NoDataAccess e) {
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
  } catch (InvalidInputParameter e) {
    return Response.status(Response.Status.NO_CONTENT).build();
  }
}
```

For asynchronous methods this mechanism obviously doesn’t work. The reactive version of ArticlesService that returns articles doesn’t declare exceptions in the interface (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/business/ArticleService.java#L126)):

```
public CompletionStage<List<Article>> getArticlesReactive(int requestedAmount) {
  if (requestedAmount < 0)
    return CompletableFuture.failedFuture(new InvalidInputParameter());
  return dataAccess.getArticlesReactive();
}
```

In order to signal an exception, it returns a CompletableFuture and invokes ‘failedFuture’ with the actual exception.

When using chained completion stages, exceptions can be caught via ‘exceptionally’. These paths in the code will be executed when (real) exceptions have been thrown or when exceptions have been signalled via ‘CompletionStage.completeExceptionally’ (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/data/PostgresDataAccess.java#L93)):

```
}).exceptionally(throwable -> {	
  future.completeExceptionally(new NoConnectivity());
  return null;
});
```

As you can see, exception handling in imperative code is quite different from exception handling in asynchronous code with completion stages. Chained completion stages have basically two paths, the normal path and the exception path. If exceptions cannot be handled, they are forwarded to the invoking code via ‘completeExceptionally’ and the exception path is run. However if exceptions can be handled, the flow can continue in the normal path. This is why the method ‘exceptionally’ in the previous snippet returns null. If the method could handle the exception, it could return an object to continue in the normal path.

The next snippet shows how signaled exceptions can be caught. In this case the REST endpoint implementation in the API layer handles the exceptions caused by ArticlesService in the business layer (see [code](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/apis/GetArticlesReactive.java#L45)):

```
articleService.getArticlesReactive(amount).thenApply(articles -> {
  ...     
  return jsonArray;
}).thenApply(jsonArray -> {            
  return Response.ok(jsonArray).build();
}).exceptionally(throwable -> {  
  if (throwable.getCause().toString().equals(InvalidInputParameter.class.getName().toString())) {
    return Response.status(Response.Status.NO_CONTENT).build();
  }
  else {            
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
  }
}).whenComplete((response, throwable) -> {
   future.complete(response);          
});
```

**Handling of Timeouts**

As demonstrated exception handling in asynchronous code is different to exception handling in imperative code. Another new pattern Java developers, who want to write asynchronous code, have to learn is how to handle timeouts.

When microservices invoke asynchronous code successully, the various CompletionStage methods, for example ‘thenApply’ are invoked when the completion stages are completed. But what if completion stages are never completed? In that case the invoking code would wait forever. Good examples are microservices that access databases or invoke other services. In those cases loading indicators in user interfaces wouldn’t stop when databases or services are not available.

Here is another sample [snippet](https://github.com/IBM/cloud-native-starter/blob/fc18118fee406109959e7313cf49028bfa63e1cf/reactive/articles-reactive/src/main/java/com/ibm/articles/data/PostgresDataAccess.java#L83) where a Postgres database is accessed asynchronously:

```
public CompletableFuture<List<Article>> getArticlesReactive() {
  CompletableFuture<List<Article>> future = new CompletableFuture<List<Article>>();
  client.query("SELECT id, title, url, author, creationdate FROM articles ORDER BY id ASC")
    .toCompletableFuture()
    .orTimeout(MAXIMAL_DURATION, TimeUnit.MILLISECONDS).thenAccept(pgRowSet -> {
      List<Article> list = new ArrayList<>(pgRowSet.size());
      for (Row row : pgRowSet) {
        list.add(from(row));
      }
      future.complete(list);
    }).exceptionally(throwable -> {
    future.completeExceptionally(new NoConnectivity());
      return null;
    });
    return future;
}
```

In order to handle timeouts, the method ‘CompletableFuture.orTimeout’ can be used. When the execution takes too long, the code in ‘exceptionally’ is triggered. Note that this method is only available in Java 9+.

Also ‘orTimeout’ is a method of CompletableFuture, not CompletionStage. Fortunately you can convert completion stages in completable futures via ‘CompletionStage.toCompletableFuture’.

**Next Steps**

This article is part of a series. Read the other articles of this series to learn about reactive programming:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Invoking REST APIs asynchronously with Quarkus]({{ "/article/invoking-rest-apis-asynchronously-with-quarkus/" | relative_url }})
- [Comparing synchronous and asynchronous Access to Postgres]({{ "/article/comparing-synchronous-asynchronous-access-postgresql/" | relative_url }})
- More will be added here soon ….

All samples of this article are included in the open source project [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive). Check it out to see the code in action.

The project comes not only with the articles service, but with a complete cloud native application with multiple microservices, Postgres and Kafka:

![image](/assets/img/2020/01/cns-reactive-demo-2.png)