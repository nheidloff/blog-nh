---
id: 3616
title: 'Authorization in Microservices with MicroProfile'
date: '2019-05-20T08:55:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3616'
permalink: /article/authorization-microservices-java-microprofile/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/authorization-microservices-java-microprofile/
categories:
    - Articles
tags:
    - java
---

I’ve been working on an example that demonstrates how to get started with cloud-native applications as a Java developer. The example is supposed to be a full end-to-end sample application which includes the topis authentication and authorization, since that functionality is required by most applications. This article describes how to check authorization in microservices implemented with Java EE and Eclipse MicroProfile.

Get the code of the example application [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) from GitHub.

Previously I [blogged]({{ "/article/authentication-authorization-openid-connect-istio" | relative_url }}) about how to do authorization with [Istio](https://istio.io/). In general as [much as possible of the functionality of the Kubernetes and Istio platforms]({{ "/article/how-to-develop-your-first-cloud-native-applications-with-java/" | relative_url }}) should be leveraged when building microservices. However, some functionality needs to be implemented in the business logic of the application. One such scenario is fine grained authorization that only the application can determine. For example in a project management application only the application knows the owners of specific tasks.

**OpenID Connect and JWT**

Before I describe the sample, let me give you some background and explain my requirements.

In order to authenticate and authorize users, I’d like to use the standard [OpenID Connect](https://openid.net/connect/) 1.0 and OAuth 2.0 which can be used with many existing identify providers. In the context of enterprise applications you want to leverage existing organization directories. [IBM App ID](https://console.bluemix.net/docs/services/appid/enterprise.html#enterprise), for example, acts as an identity provider or identity provider proxy. For simple tests you can define test users in a cloud directory. For production usage App ID can be configured to work against third-party providers such as Active Directory Federation Services via SAML.

The other nice thing about OpenID Connect for developers is, that you don’t have to understand the internals of the different identity providers, but can use standardized and easy APIs. As responses of successful OAuth dances, you get access tokens and user tokens as [JSON Web Token](https://jwt.io/introduction/) (JWT).

**Cloud-Native Sample Application**

There are five services in the application. The services, except of the managed one, are available as open source and run in [Kubernetes](https://kubernetes.io/) clusters with [Istio](https://istio.io/). In my case I utilize Minikube locally or the IBM Cloud Kubernetes Service.

- Web-App: Simple web application built with Vue.js which provides login functionality for users and stores tokens locally
- Web-App Hosting: Nginx based hosting of the Vue.js resources
- Authentication: Node.js microservice which handles the OAuth dance and returns tokens to the web application
- Web-API: Provides an unprotected endpoint ‘/getmultiple’ to read articles and a protected endpoint ‘create’ to create a new article
- IBM App ID: Contains a cloud directory with test users and acts as an OpenID identity provider

![image](/assets/img/2019/04/blog-authorization-istio-1.png)

Check out my other article [Authenticating Web Users with OpenID and JWT]({{ "/article/authenticating-web-users-openid-connect-jwt/" | relative_url }}) that explains how the tokens are retrieved and how they are stored in the web application.

**Authorization via MicroProfile**

Eclipse MicroProfile supports [controlling user and role access to microservices with JSON Web Token](https://openliberty.io/guides/microprofile-jwt.html). Let’s take a look at the sample.

From the web application the endpoint ‘/manage’ of the Web API service can be invoked. Only the user ‘admin@demo.email’ is allowed to invoke this endpoint.

![image](/assets/img/2019/05/authorization-microprofile-admin.png)

For the user ‘user@demo.email’ an error is thrown.

![image](/assets/img/2019/05/authorization-microprofile-user.png)

Watch the [animated gif](https://github.com/nheidloff/cloud-native-starter/blob/master/images/authorization-microprofile.gif) to see the flow in action.

This is the [Java code](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/apis/Manage.java) that checks authorization:

```
public class Manage {
   @Inject
   private JsonWebToken jwtPrincipal;

   @POST
   @Path("/manage")
   @Produces(MediaType.APPLICATION_JSON)
   public Response manage() {
      String principalEmail = this.jwtPrincipal.getClaim("email");
      if (principalEmail.equalsIgnoreCase("admin@demo.email")) {
         JsonObject output = Json.createObjectBuilder().add("message", "success").build();
         return Response.ok(output).build();
      }
      else {			
         JsonObject output = Json.createObjectBuilder().add("message", "failure").build();
         return Response.status(Status.FORBIDDEN).entity(output).type(MediaType.APPLICATION_JSON).build();
      }
   }
}
```

The tricky part to get this working was the [configuration](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/liberty/server.xml) of the Liberty server. Thanks a lot to Chunlong Liang for figuring this out.

In order to check the validation of the JWT token, MicroProfile needs to contact App ID via ‘https’. When using Istio to check authorization, this needs to be done too. The difference is that Istio already comes with the public key of App ID. For MicroProfile applications running in Open Liberty the key needs to be imported into the validation keystore first. It sounds like for WebSphere Liberty this is not necessary either, but I haven’t tested it.

```
<server description="OpenLiberty Server">
    <featureManager>
        <feature>webProfile-8.0</feature>
        <feature>microProfile-2.1</feature>
        <feature>mpJwt-1.1</feature>
        <feature>appSecurity-3.0</feature>
    </featureManager>

    <mpJwt id="jwt"   
        issuer="https://us-south.appid.cloud.ibm.com/oauth/v4/xxx"
        jwksUri="https://us-south.appid.cloud.ibm.com/oauth/v4/xxx/publickeys"
	    userNameAttribute="sub"
	    audiences="ALL_AUDIENCES"/>  

    <sslDefault sslRef="RpSSLConfig"/>
    <ssl id="RpSSLConfig" keyStoreRef="defaultKeyStore" trustStoreRef="validationKeystore"/> 
    <keyStore id="defaultKeyStore" location="keystore.jceks" type="JCEKS" password="secret" />
    <keyStore id="validationKeystore" location="/config/key.jks" type="jks" password="changeit"/>
</server>
```

In order to import the public App ID key, you need to [download](https://stackoverflow.com/questions/11047103/how-can-i-get-the-public-key-of-a-webpage) the key first. After this you can use keytool to import it:

```
keytool -import -file /Users/nheidloff/Desktop/wildcardbluemixnet.crt -alias certificate_alias -keystore /Users/nheidloff/git/cloud-native-starter/auth-java-jee/keystore.jks -storepass keyspass
```

The example application contains this key already. When you want to use another OpenID Connect provider, you need to import the key as just described.

The other issue I ran into was, that App ID doesn’t return an JWT token in the right format for MicroProfile. Fortunately the claims ‘sub’ (subject/user) and ‘audiences’ can be configured in server.xml too.

To run the example yourself, follow these [instructions](https://github.com/nheidloff/cloud-native-starter/blob/master/documentation/DemoAuthentication.md).