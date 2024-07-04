---
id: 4008
title: 'Comparing synchronous and asynchronous Access to Postgres'
date: '2020-02-03T14:57:22+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4008'
permalink: /article/comparing-synchronous-asynchronous-access-postgresql/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/comparing-synchronous-asynchronous-access-postgresql/
categories:
    - Articles
---

[Quarkus](https://quarkus.io/) supports imperative as well as reactive programming styles. In this article I compare access times to [Postgres](https://www.postgresql.org/) from Java based microservices developed with Quarkus. For synchronous invocations Panache is used, for asynchronous access Vert.x Axle.

I’ve created a sample application that comes with the [cloud-native-starter](https://github.com/ibm/cloud-native-starter) project. The ‘articles’ microservice accesses the database running in Kubernetes. To keep the scenario simple, only one REST API is tested which reads articles from Postgres.

![image](/assets/img/2020/02/comparison-synch-asynch.png)

There are two implementations of the articles service:

1. Imperative/synchronous: The REST endpoint has been implemented with JAX-RS (synchronous). The service reads articles from Postgres via Panache (see Quarkus guide [Simplified Hibernate ORM with Panache](https://quarkus.io/guides/hibernate-orm-panache)).
2. Reactive/asynchronous: The REST endpoint has been implemented with Vert.x, CompletionStage and CompletableFuture asynchronously. The service reads articles asynchronously from Postgres via Vert.x Axle (see Quarkus guide [Reactive SQL Clients](https://quarkus.io/guides/reactive-sql-clients)).

*The reactive stack of this sample provides response times that take less than half of the time compared to the imperative stack*: Reactive: 142 ms (0:42 min total) – Imperative: 265 ms (1:20 min total). Check out the [documentation](https://github.com/IBM/cloud-native-starter/blob/master/reactive/documentation/LoadTests.md) for details.

While this scenario is not necessarily representative, I think it demonstrates nicely the efficiency of reactive programming.

I’ve run a second performance test where a more complete cloud-native application is tested. Check out the [documentation](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/documentation/LoadTests.md).

**Synchronous Access via Panache**

Panache is basically an extension of JPA which makes persistence really easy. After you’ve defined the [dependencies](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-synch/pom.xml#L33-L43) and the configuration in [application.properties](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-synch/src/main/resources/application.properties), you can define the entity (see [code](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-synch/src/main/java/com/ibm/articles/Article.java)):

```
import javax.persistence.Cacheable;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@Cacheable
public class Article extends PanacheEntity {
  public Article() {}
  public String title;
  public String url;
  public String author;
  public String creationDate;
}
```

Panache comes with built in convenience methods to access databases, for example ‘listAll’ to read all articles (see [code](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-synch/src/main/java/com/ibm/articles/ArticleResource.java)):

```
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
...
@Path("/v1/articles")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class ArticleResource {
  @GET
  public List<Article> get() {
    return Article.listAll(Sort.by("creationdate"));
  }
}
```

**Asynchronous Access with Vert.x Axle**

After you’ve defined the [dependencies](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-reactive/pom.xml#L63) and the configuration in [application.properties](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-reactive/src/main/resources/application.properties.template), the articles can be read from the database via the following [code](https://github.com/IBM/cloud-native-starter/blob/32652f62bb37df481f00ccaa71955c6aff63914b/reactive/articles-reactive/src/main/java/com/ibm/articles/data/PostgresDataAccess.java#L83):

```
import io.vertx.axle.sqlclient.Row;
import io.vertx.axle.sqlclient.RowSet;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
...
public class PostgresDataAccess {
...
  @Inject
  io.vertx.axle.pgclient.PgPool client;
  
  @PostConstruct
  void initdb() {
    client.query("DROP TABLE IF EXISTS articles").thenCompose(r -> client.query(
      "CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT NOT NULL, url TEXT, author TEXT, creationdate TEXT)"))
    .toCompletableFuture().join();
  }

  public CompletableFuture<List<Article>> getArticlesReactive() {
    CompletableFuture<List<Article>> future = new CompletableFuture<List<Article>>();
    client.query("SELECT id, title, url, author, creationdate FROM articles ORDER BY id ASC").toCompletableFuture()
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

private static Article from(Row row) {
  Article article = new Article();
  article.id = row.getLong("id").toString();
  article.title = row.getString("title");
  article.author = row.getString("author");
  article.creationDate = row.getString("creationdate");
  article.url = row.getString("url");
  return article;
}
```

When using the reactive approach, as far as I know, the schema needs to be created programmatically. Additionally the data from the databases needs to be converted into Java objects manually. Hopefully these two areas will be simplified similarly to how this is done with JPA and Panache.

**Closing Thoughts**

All samples of this article are included in the open source project [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive). Check it out to see the code in action.

This article is part of a series. Read the other articles of this series to learn about reactive programming:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Developing reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }})
- [Invoking REST APIs asynchronously with Quarkus]({{ "/article/invoking-rest-apis-asynchronously-with-quarkus/" | relative_url }})