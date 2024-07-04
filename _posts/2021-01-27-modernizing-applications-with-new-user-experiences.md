---
id: 4349
title: 'Modernizing Applications with new User Experiences'
date: '2021-01-27T13:39:36+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4349'
permalink: /article/modernizing-applications-with-new-user-experiences/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/modernizing-applications-with-new-user-experiences/
categories:
    - Articles
---

There are many [reasons]({{ "/article/ten-reasons-why-enterprises-should-modernize-applications/" | relative_url }}) why you should consider to modernize applications. One reason is to provide better experiences for users to make them more productive.

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

This article describes the first step to modernize user experiences which is to separate the user interface from the backend logic.

**Architecture**

There are many options to build web applications. My preference and probably the most popular approach nowadays is to develop intelligent JavaScript applications running in browsers which access backends via APIs. I think this is the cleanest design and helps with the separation of concerns. The only disadvantage might be SEO (search engine optimisation) but Google has become really good to handle this and you could always use server-side rending for the home page meta data in addition to the client-side architecture.

Fortunately the sample e-commerce application uses this approach already instead of server-side technologies like JSF or JSP.

The web application has been implemented with the [Dojo Toolkit](https://dojotoolkit.org/) which is similar to jQuery.

The backend monolith provides HTTP based REST APIs which use JSON for data. Some people would consider these APIs not to be RESTful APIs though since they are not resource focussed. Instead they use a RPC style (remote procedure calls) and implement the BFF (backend for frontend) pattern. Check out the [Postman](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/postman.json) file for the available APIs.

![image](/assets/img/2021/01/architecture-dojo.png)

**Separation of Concerns**

In older Java applications often the web applications were put in the same project as the business code and the Java application servers were used to host the business logic and the web applications at the same time. My sample [WebSphere Liberty application](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/monolith-websphere-liberty) uses that same approach.

In order to replace the web application in a later modernization step easier, I created a second container. The first one runs the business logic of the WebSphere Liberty application. The second basically only hosts the static web resources. This image still uses WebSphere Liberty, but doesn’t have to. Instead other more lightweight application servers like nginx could be used or the files could be stored in cloud object storage.

The frontend container could access the backend container directly, but this would cause CORS (Cross-Origin Resource Sharing) if not handled appropriately. That’s why I simply added an nginx container in front of the two containers.

Currently I use Docker Desktop to run everything locally via [docker-compose](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/scripts-docker/docker-compose-splitted-frontend.yml). When the application is deployed to OpenShift or Kubernetes, this part of the application needs to be changed.

Here is the nginx [configuration](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/proxy/nginx-splitted-frontend.conf) file:

```
worker_processes 1;

events { worker_connections 1024; }

http {

    sendfile on;

    upstream storefront-backend {
        server storefront-backend:9080;
    }

    upstream storefront-frontend {
        server storefront-frontend:9080;
    }

    server {
        listen 80;

        location / {
            proxy_pass         http://storefront-frontend;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
        }

        location /CustomerOrderServicesWeb/jaxrs/ {
            proxy_pass         http://storefront-backend;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
        }
    }
}
```

**What’s next?**

In a future article I’ll explain how to use micro frontends to develop modular web applications.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).