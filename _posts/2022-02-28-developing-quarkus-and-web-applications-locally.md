---
id: 4713
title: 'Developing Quarkus and Web Applications locally'
date: '2022-02-28T16:44:54+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4713'
permalink: /article/developing-quarkus-and-web-application-locally/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-quarkus-and-web-application-locally/
categories:
    - Articles
---

*Developing backend or frontend applications locally often involves access to other remote services, for example databases. This article describes how development and debugging can be done locally and how to handle the credentials of the remote services.*

Since I’ve worked a lot with partners who needed to know how to build SaaS (software as a service), my team has created a [reference architecture](https://github.com/IBM/multi-tenancy) which is available as an open source GitHub repo.

The reference architecture comes with a set of best practices how to build SaaS. It is not (and can’t be) a generic solution. That’s why the reference architecture is supposed to be a starting point for developers and not an out-of-the-box solution.

**Sample Application**

We’ve created a simple sample application that comes with two containers and two services in a public cloud. The backend container has been implemented with Quarkus, the frontend container with Vue.js. The two services Postgres and authentication are provided in the IBM Cloud.

The sample application is a simple e-commerce application which requires users to log in to browse the catalog of products.

![image](/assets/img/2022/02/example-app.png)

In order to run the backend and frontend functionality locally, we had two requirements.

- Externalize all configuration, e.g. Postgres URL
- Run applications locally in the same containers used at runtime

**Externalization of the external Services Configuration**

Read the [documentation](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/development_of_microservices/local-development.md) for details. In a nutshell we used a file with environment variables which can be created based on a [template file](https://github.com/IBM/multi-tenancy/blob/main/local.env.template). This file contains all credentials to access Postgres and AppID in the IBM Cloud and is obviously never pushed to the public GitHub repo.

```
POSTGRES_USERNAME="aaa"
POSTGRES_PASSWORD="bbb"
POSTGRES_URL="jdbc:postgresql://NO_USERNAME_NO_PASSWORDccc.ddd.databases.appdomain.cloud:30143/ibmclouddbNOTHING_ELSE"
POSTGRES_CERTIFICATE_FILE_NAME="5df929c2-b76a-11e9-b3dd-4acf6c229d45"
APPID_CLIENT_ID='XXXX-XXXX-XXX-XXXX-XXXXX'
APPID_DISCOVERYENDPOINT=https://us-south.appid.cloud.ibm.com/oauth/v4/YOUR_TENDANT/.well-known/openid-configuration
APPID_AUTH_SERVER_URL=https://us-south.appid.cloud.ibm.com/oauth/v4/YOUR_TENDANT
```

The backend and frontend code has been built to be fully customizable via environment variables without hardcoding anything. This pattern allows the same applications not only to be run on different development machines, but also on various runtime platforms like Kubernetes and OpenShift and on different clouds. Take a look at my previous blogs:

- [Containerizing Quarkus Applications]({{ "/article/containerizing-quarkus-applications/" | relative_url }})
- [Accessing Postgres from Quarkus Containers via TLS]({{ "/article/accessing-postgres-from-quarkus-containers-via-tls/" | relative_url }})
- [Containerizing Web Applications]({{ "/article/containerizing-web-applications/" | relative_url }})

In order to run and debug the Quarkus application locally, I built a little [script](https://github.com/IBM/multi-tenancy/blob/main/scripts/run-locally-backend.sh) that basically only does these things:

```
source $ROOT_PATH/$ROOT_PROJECT/local.env
mvn clean package
mvn quarkus:dev
```

A similar [script](https://github.com/IBM/multi-tenancy/blob/main/scripts/run-locally-frontend.sh) exists for the frontend application.

**Running Applications locally in Containers**

The great capability of containers is that the same containers work everywhere identically, for example on your Mac, Linux or Windows machines or hosted in cloud environments. Well, let’s ignore different host systems, different networking, etc. for now.

Local containers allow developers at least to get closer to production environments. This allows testing code locally more efficiently than in remote systems. It also removes challenges with handling installations of different tools and different versions of tools, for example different JVMs, Maven versions, etc.

Since Docker changed the licensing for Docker Desktop and I’m not sure what this means for me, I’ve started to use podman which works quite well. Check out the [script](https://github.com/IBM/multi-tenancy/blob/main/scripts/run-locally-container-backend.sh) that builds the Quarkus image with a Dockerfile provided by Quarkus. The same environment variables are passed in from the local.env file.

```
source $ROOT_PATH/$ROOT_PROJECT/local.env
podman build --file Dockerfile --tag service-catalog
podman run --name=service-catalog \
    -it \
    -e POSTGRES_CERTIFICATE_DATA="${POSTGRES_CERTIFICATE_DATA}" \
    -e POSTGRES_USERNAME="${POSTGRES_USERNAME}" \
    -e POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" \
    -e POSTGRES_URL="${POSTGRES_URL}" \
    -e APPID_AUTH_SERVER_URL="${APPID_AUTH_SERVER_URL}" \
    -e APPID_CLIENT_ID="${APPID_CLIENT_ID}" \
    -p 8081:8081/tcp \
    localhost/service-catalog:latest
```

**What’s next?**

Take a look at the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) repo to see the full technique in action.

I’ve also planned to blog in more detail about the SaaS repo soon. Keep an eye on this blog.