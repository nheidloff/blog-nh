---
id: 4578
title: 'Using CORS for OpenShift Applications'
date: '2021-05-10T13:09:24+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4578'
permalink: /article/using-cors-for-openshift-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/using-cors-for-openshift-applications/
categories:
    - Articles
---

When starting to develop microservices and micro frontends, often CORS needs to be used to load web resources from different domains. Read on to learn how to enable CORS in Quarkus and Open Liberty applications as well as in web applications hosted via Nginx.

When [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (cross domain resource sharing) is enabled, web resources, especially JavaScript, can be loaded from different domains. By default this is disabled for security reasons. Production applications often use proxies or services that implement the backend for frontend pattern in which case web applications read everything from the same domain. However, especially during development you might want to access different microservices from web applications directly to avoid these errors:

![image](/assets/img/2021/05/cors-error.png)

CORS needs to be enabled on the server, for example in the implementation of your microservices, and on the client. Below are some snippets that show how I have done this in my [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus).

**Quarkus**

In Quarkus applications CORS can be enabled declaratively in the [application.properties](https://quarkus.io/guides/http-reference#cors-filter) file. In the simplest case only [one line](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-reactive/src/main/resources/application.properties#L13) is necessary.

```
quarkus.http.cors=true
```

**Open Liberty**

Open Liberty also supports a [declarative](https://openliberty.io/guides/cors.html) mechanism to enable CORS. In the simplest case this can be done in the [server.xml](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty-cloud-native/src/main/liberty/config/server.xml) file.

```
<cors domain="/"
  allowedOrigins="*"
  allowedMethods="GET, DELETE, POST, PUT"
  allowedHeaders="content-type,x-requested-with, origin, content-type, accept, authorization, cache-control" maxAge="3600" />
```

If you need more flexibility, you can also enable CORS in [Java code](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/monolith-open-liberty-cloud-native/src/main/java/org/pwte/example/resources/CorsFilter.java).

```
@Provider	
public class CorsFilter implements ContainerResponseFilter {
  @Override
  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
    responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
    responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
    responseContext.getHeaders().add("Access-Control-Allow-Headers", "*");
    responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    responseContext.getHeaders().add("Access-Control-Max-Age", "100000");
  }
}
```

**Nginx**

Web applications can be hosted via Nginx. Check out my previous article [Deploying Nginx on OpenShift]({{ "/article/deploying-nginx-on-openshift/" | relative_url }}).

In order to enable CORS, you need to define rules in [nginx.conf](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/navigator/nginx-os4.conf).

```
worker_processes auto;
pid /tmp/nginx.pid;
events {
 worker_connections 1024;
}
http {
 include /etc/nginx/mime.types; 
 client_body_temp_path /tmp/client_temp;
 proxy_temp_path       /tmp/proxy_temp_path;
 fastcgi_temp_path     /tmp/fastcgi_temp;
 uwsgi_temp_path       /tmp/uwsgi_temp;
 scgi_temp_path        /tmp/scgi_temp;
 server {
   listen 8080;
   charset utf-8;
   sendfile on;
   server_name _;
   index index.html;
   error_log  /tmp/error.log;
   access_log /tmp/access.log;
   location / {
     if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
     }
     if ($request_method = 'GET') {
         add_header 'Access-Control-Allow-Origin' '*';
         add_header 'Access-Control-Allow-Methods' 'GET, OPTIONS';
         add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
         add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     }
     root /code;
     expires -1;
     add_header Pragma "no-cache";
     add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
     try_files $uri /index.html = 404;
   }
 }
}
```

**What’s next?**

If you want to see these mechanisms in action, check out my [sample application](https://github.com/IBM/application-modernization-javaee-quarkus).