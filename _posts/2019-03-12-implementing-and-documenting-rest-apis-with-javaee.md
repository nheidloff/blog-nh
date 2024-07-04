---
id: 3390
title: 'Implementing and documenting REST APIs with JavaEE'
date: '2019-03-12T10:55:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3390'
permalink: /article/rest-apis-microprofile-javaee-jaxrs/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7287838441'
custom_permalink:
    - article/rest-apis-microprofile-javaee-jaxrs/
categories:
    - Articles
---

The standard way to implement REST APIs in JavaEE applications is [JAX-RS](https://projects.eclipse.org/projects/ee4j.jaxrs). The de-facto standard for API documentation is [OpenAPI](https://www.openapis.org/) (formally Swagger). [Eclipse MicroProfile](https://microprofile.io/) supports developers to use OpenAPI annotations for JAX-RS API implementations to document the APIs.

Check out the [cloud-native starter](https://github.com/nheidloff/cloud-native-starter) repo on GitHub. It comes with multiple microservices, two of them have been implemented with JavaEE and MicroProfile.

Eclipse MicroProfile supports the [OpenAPI v3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md) specification. The [documentation](https://github.com/eclipse/microprofile-open-api/blob/master/spec/src/main/asciidoc/microprofile-openapi-spec.adoc) lists all available annotations.

I like using annotations directly in the code to document APIs rather than using external configuration files. The closer the documentation stays together with the actual API implementation, the better and more accurate it will be.

In my sample I created [one Java class per endpoint](https://github.com/nheidloff/cloud-native-starter/tree/master/web-api-java-jee/src/main/java/com/ibm/webapi/apis) to reduce the lengths of the files, since the API documentation can become quite verbose.

When it comes to the design of APIs my personal taste is to provide business-logic-oriented APIs rather the CRUD operations on resources. The following sample shows the ‘[web-api/v1/getmultiple](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/apis/GetArticles.java)‘ endpoint which internally utilizes several resources. It’s part of the API service that uses the BFF (backend for frontend) pattern. It provides the exact APIs web applications need and doesn’t expose the internally used resources.

```
package com.ibm.webapi.apis;

import javax.ws.rs.*;
import org.eclipse.microprofile.openapi.annotations.*;

@RequestScoped
@Path("/v1")
@OpenAPIDefinition(info = @Info(title = "Web-API Service", version = "1.0", description = "Web-API Service APIs", contact = @Contact(url = "https://github.com/nheidloff/cloud-native-starter", name = "Niklas Heidloff"), license = @License(name = "License", url = "https://github.com/nheidloff/cloud-native-starter/blob/master/LICENSE")))
public class GetArticles {
   @Inject
   com.ibm.webapi.business.Service service;
   @Inject
   ArticleAsJson articleAsJson;

   @GET
   @Path("/getmultiple")
   @Produces(MediaType.APPLICATION_JSON)
   @APIResponses(value = { 
      @APIResponse(responseCode = "200", description = "Get most recently added articles", content = @Content(mediaType = "application/json", schema = @Schema(type = SchemaType.ARRAY, implementation = Article.class))),			
      @APIResponse(responseCode = "500", description = "Internal service error") })
   @Operation(summary = "Get most recently added articles", description = "Get most recently added articles")
   public Response getArticles() {
      JsonArray jsonArray;
      try {
         List<Article> articles = service.getArticles();
         Stream<Article> streamArticles = articles.stream();
         Stream<JsonObject> streamJsonObjects = streamArticles.map(article -> {
            JsonObject output = articleAsJson.createJsonArticle(article);
              return output;
         });
         jsonArray = streamJsonObjects.collect(JsonCollectors.toJsonArray());
         return Response.ok(jsonArray).build();
      } catch (NoDataAccess e) {
         e.printStackTrace();
         return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
      }  
   }
}
```

The nice thing about MicroProfile and the open source JavaEE application server [OpenLiberty](https://openliberty.io/) is that it comes with the built-in OpenAPI web application to read the documentation and to invoke the APIs.

![image](/assets/img/2019/03/blog-openapi-microprofile.png)

To learn more about MicroProfile OpenAPI, check out the [cloud-native starter](https://github.com/nheidloff/cloud-native-starter) repo and the [documentation](https://github.com/eclipse/microprofile-open-api/blob/master/spec/src/main/asciidoc/microprofile-openapi-spec.adoc).