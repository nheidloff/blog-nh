---
id: 3410
title: 'Invoking REST APIs from Java Microservices'
date: '2019-03-13T10:21:37+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3410'
permalink: /invoke-rest-apis-java-microprofile-microservice/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - invoke-rest-apis-java-microprofile-microservice/
dsq_thread_id:
    - '7290411415'
categories:
    - Articles
---

Previously I blogged about how to [implement and document REST APIs in JavaEE]({{ "/article/rest-apis-microprofile-javaee-jaxrs" | relative_url }}) applications with [Eclipse MicroProfile](https://microprofile.io/). In this article I describe the inverse scenario how services can invoke other services via REST APIs over HTTP.

MicroProfile comes with a [REST Client](https://github.com/eclipse/microprofile-rest-client) which defines a type safe client programming model. The REST Client makes it easier to convert between the JSON data and Java objects in both directions.

There is pretty good [documentation](https://github.com/OpenLiberty/guide-microprofile-rest-client) about the REST Client available (see below). In this article I describe how I’ve used the client in my sample application. The application has a Web API service which implements the BFF (backend for frontend pattern). The Web API service uses the REST Client to invoke another ‘Authors’ service.

![image](/assets/img/2019/03/blog-resiliency-resiliency-diagram.png)

Get the code of the [cloud native starter](https://github.com/nheidloff/cloud-native-starter) application.

First you need to define the [interface](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/data/AuthorsService.java) of the service you want to invoke.

```
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.ibm.webapi.business.Author;
import com.ibm.webapi.business.NonexistentAuthor;

@RegisterProvider(ExceptionMapperArticles.class)
public interface AuthorsService {
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Author getAuthor(String name) throws NonexistentAuthor; 
}
```

The method ‘getAuthor’ returns an object of the [Author](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/business/Author.java) class.

```
public class Author {
   public String name;
   public String twitter;
   public String blog;
}
```

The actual invocation of the authors service happens in [AuthorsServiceDataAccess.java](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/data/AuthorsServiceDataAccess.java). The RestClientBuilder is used to get an implementation of the AuthorsService interface. The deserialization of the data into a Java object is done automatically.

```
import org.eclipse.microprofile.rest.client.RestClientBuilder;
import com.ibm.webapi.business.Author;
import com.ibm.webapi.business.NonexistentAuthor;

public class AuthorsServiceDataAccess {
   static final String BASE_URL = "http://authors/api/v1/";

   public AuthorsServiceDataAccess() {}	

   public Author getAuthor(String name) throws NoConnectivity, NonexistentAuthor {
      try {
         URL apiUrl = new URL(BASE_URL + "getauthor?name=" + name);
         AuthorsService customRestClient = RestClientBuilder.newBuilder().baseUrl(apiUrl).register(ExceptionMapperAuthors.class).build(AuthorsService.class);
         return customRestClient.getAuthor(name);
      } catch (NonexistentAuthor e) {
         throw new NonexistentAuthor(e);			
      } catch (Exception e) {
         throw new NoConnectivity(e);
      }
   }
}
```

In order to use the RESTClientBuilder you need to understand the concept of the [ResponseExceptionMapper](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/data/ExceptionMapperAuthors.java). This mapper is used to translate certain HTTP response error codes back into Java exceptions.

```
import org.eclipse.microprofile.rest.client.ext.ResponseExceptionMapper;
import com.ibm.webapi.business.NonexistentAuthor;

@Provider
public class ExceptionMapperAuthors implements ResponseExceptionMapper<NonexistentAuthor> {
   @Override
   public boolean handles(int status, MultivaluedMap<String, Object> headers) {
      return status == 204;
   }
   @Override
   public NonexistentAuthor toThrowable(Response response) {
      switch (response.getStatus()) {
         case 204:
            return new NonexistentAuthor();
        }
        return null;
   }   
}
```

Read the following resources to learn more about the MicroProfile REST Client.

- [Guide: Consuming RESTful services with template interfaces](https://github.com/OpenLiberty/guide-microprofile-rest-client)
- [Rest Client for MicroProfile](https://github.com/eclipse/microprofile-rest-client)
- [MicroProfile Rest Client in Istio](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php#restclient)
- [Java Microservices with MicroProfile – Rest Client and JSON-B](https://www.ibm.com/blogs/bluemix/2018/10/migrate-java-microservices-from-spring-to-microprofile-p3/)