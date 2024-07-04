---
id: 4733
title: 'Typical Authentication Flow for Kubernetes Applications'
date: '2022-02-24T13:04:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4733'
permalink: /article/typical-authentication-flow-kubernetes-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/typical-authentication-flow-kubernetes-applications/
categories:
    - Articles
---

*Typical business applications require backend and frontend functionality as well as databases and authentication mechanisms. This article describes a pattern how to do authentication in these types of applications.*

I’ve built cloud-native applications for quite some time. Authentication of users is often still a challenge though. The relationship between frontend, backend, authentication service and database and the order of interactions between these components is not trivial.

My team has built a [reference architecture](https://github.com/IBM/multi-tenancy) showing how to built SaaS solutions (software as as service) for multiple clouds. We picked a simple ecommerce sample application which comes with the four components I just mentioned. We’ve implemented authentication and the same patterns can be used for other business applications.

Our solution is based on open standards like [JWT and OpenID Connect]({{ "/article/authenticating-web-users-openid-connect-jwt/" | relative_url }}) which I described in a previous blog.

**Authentication Flow**

Let’s take a look at the authentication flow between the different components.

![image](/assets/img/2022/02/Screenshot-2022-02-24-at-08.58.29.png)

1. The web application loads static web resources from the Nginx container
2. The web application redirects the user to the App ID login page and the user enters name and password
3. App ID validates the user
4. App ID provides an id token and access token in a JWT format and returns it to the web application
5. The web application uses the access token to invoke a secured endpoint provided by the backend container
6. The backend container verifies if the token is valid
7. The backend container accesses securely the Postgres database

A couple of important notes:

JWT tokens are stored in the web browser. Some people think this shouldn’t be done for security reasons. Instead they should only be stored on the server. In order to access them though, mechanisms like HTTP sessions, cookies, etc. would have to be used. It’s not really obvious how this can be more secure.

While our reference architecture uses technologies like Quarkus, Vue.js, IBM PostgreSQL and IBM App ID, the same principles apply for other languages, web frameworks, authentication and database services.

Deploying these components is always challenging. The main reason is that the frontend needs to know the authentication URL and the authentication service needs to know the redirect URL of the frontend. This is why we first deploy then authentication service, then the frontend component and then we configure the redirect URL in the authentication service.

**Quarkus Application**

In the Quarkus application authentication and authorization can now be handled easily. Take a look at the Quarkus [configuration](https://github.com/IBM/multi-tenancy-backend/blob/main/src/main/resources/application.properties).

```
quarkus.oidc.enabled=true
quarkus.oidc.auth-server-url=${APPID_AUTH_SERVER_URL}
appid.auth-server-url_tenant=${APPID_AUTH_SERVER_URL}
quarkus.http.auth.permission.authenticated.paths=/category
quarkus.http.auth.permission.authenticated.policy=authenticated
appid.client_id_tenant=${APPID_CLIENT_ID}
```

Here is a snippet how to access the JWT token.

```
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
@Path("/")
public class CategoryResource {
    @Inject
    @IdToken
    JsonWebToken idToken;
    @Inject
    JsonWebToken accessToken;
    @Inject
    RefreshToken refreshToken;
```

**What’s next?**

Take a look at the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) repo to see the full technique in action.

I’ve also planned to blog in more detail about the SaaS repo soon. Keep an eye on this blog.