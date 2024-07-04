---
id: 4106
title: 'Security in Quarkus Applications via Keycloak'
date: '2020-07-22T06:24:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4106'
permalink: /article/security-quarkus-applications-keycloak/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/security-quarkus-applications-keycloak/
categories:
    - Articles
---

I’ve developed a sample that leverages [Keycloak](https://www.keycloak.org/) to do authentication and authorization in Quarkus applications. In this article I share my experiences and tips.

Get the [code](https://github.com/IBM/cloud-native-starter/tree/master/security) from GitHub.

My sample contains a web application which invokes an API microservice and that one invokes a second microservice. To see the results in the web application, users need to be authenticated and they need to have the role ‘user’. Here is the architecture:

![image](/assets/img/2020/07/keycloak-diagram.png)

The Keycloak [documentation](https://www.keycloak.org/getting-started/getting-started-operator-openshift) describes pretty well how to install Keycloak in OpenShift. The difficult part was the creation of the realm which I’ve documented in my previous article [Setting up Keycloak in OpenShift]({{ "/article/setting-up-keycloak-openshift/" | relative_url }}).

Quarkus comes with two great quides that describe how to use Keycloak in web apps and services:

- [Using OpenID Connect to Protect Service Applications](https://quarkus.io/guides/security-openid-connect)
- [Using OpenID Connect to Protect Web Applications](https://quarkus.io/guides/security-openid-connect-web-authentication)

**Developing protected Endpoints**

The service Articles provides an endpoint ‘/articles’ which only users with the role ‘user’ can access. In [application.properties](https://github.com/IBM/cloud-native-starter/blob/d30b084eeddcebf793037bea07244fe20917caa3/security/articles-secure/src/main/resources/application.properties) the Keycloak URL is defined as well as the client ID and secret.

```
quarkus.oidc.auth-server-url=https://keycloak-default.niklas-heidloff-b3c-4x16-162e406f043e20da9b0ef0731954a894-0000.us-south.containers.appdomain.cloud/auth/realms/quarkus
quarkus.oidc.client-id=backend-service
quarkus.oidc.credentials.secret=secret
quarkus.http.port=8082
quarkus.http.cors=true
resteasy.role.based.security=true
```

Note the line ‘resteasy.role.based.security=true’. This setting is important, so that the Articles service can receive the Authorization header from the Web-API service. I couldn’t find this in the Quarkus documentation, but Phillip Krüger from the Quarkus team [answered](https://stackoverflow.com/questions/62691824/how-can-the-authorization-header-be-propagated-in-quarkus-apps-with-the-micropro/63012595#63012595) it today.

Once you’ve configured your Quarkus application, implementing the endpoint is trivial. I’ve used @RolesAllowed, but there are other annotations available, for example @Authenticated.

```
@GET
@Path("/articles")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed("user")
@NoCache
public Set<Article> getArticles() {  
   return articles;
}
```

This allows my test user Alice to invoke this endpoint, since she has the role ‘user’.

![image](/assets/img/2020/07/keycloak-user.png)

**Invoking protected Endpoints**

The Web-API service has also a protected endpoint which has been implemented as above. Additionally it also invokes the Articles service. In order to do this, the MicroProfile REST Client is used.

Let’s take at the [configuration](https://github.com/IBM/cloud-native-starter/blob/d30b084eeddcebf793037bea07244fe20917caa3/security/web-api-secure/src/main/resources/application.properties) first.

```
quarkus.oidc.auth-server-url=https://keycloak-default.niklas-heidloff-b3c-4x16-162e406f043e20da9b0ef0731954a894-0000.us-south.containers.appdomain.cloud/auth/realms/quarkus
quarkus.oidc.client-id=backend-service
quarkus.oidc.credentials.secret=secret
quarkus.http.port=8081
quarkus.http.cors=true
org.eclipse.microprofile.rest.client.propagateHeaders=Authorization
```

The last line is important again. This allows forwarding the authorization header with the JWT token without having to implement any [code](https://github.com/IBM/cloud-native-starter/blob/d30b084eeddcebf793037bea07244fe20917caa3/security/web-api-secure/src/main/java/com/ibm/webapi/ArticlesDataAccess.java).

```
private ArticlesService articlesService;

@PostConstruct
void initialize() {
   URI apiV1 = UriBuilder.fromUri("http://{host}:{port}/articles").build(articlesHost, articlesPort);     
   articlesService = RestClientBuilder.newBuilder()
      .baseUri(apiV1)
      .register(ExceptionMapperArticles.class)
      .build(ArticlesService.class);        
}

public List<CoreArticle> getArticles(int amount) throws NoConnectivity {
   try {
      return articlesService.getArticlesFromService(amount);
   } catch (Exception e) {
      throw new NoConnectivity(e);
   }
}
```

If you want to try this out yourself, get the [code](https://github.com/IBM/cloud-native-starter/tree/master/security). I’ve documented how to use [Red Hat OpenShift on the IBM Cloud](https://www.ibm.com/cloud/openshift), but you can also use other Kubernetes distributions or local Docker.