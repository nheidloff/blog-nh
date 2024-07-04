---
id: 4570
title: 'Deploying Nginx on OpenShift'
date: '2021-05-10T10:19:37+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4570'
permalink: /article/deploying-nginx-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-nginx-on-openshift/
categories:
    - Articles
---

Many web applications use Nginx as web server to host web resources like HTML and JavaScript. This article describes a mechanism to deploy Nginx on OpenShift, the Kubernetes distribution for enterprises.

OpenShift extends Kubernetes with additional capabilities. While Kubernetes is like an engine, OpenShift is like a car with everything you need to drive. In order to run enterprise workloads and workloads in regulated industries, it comes with additional security features and rules. One of these rules is not to run containers as root.

Here is a quick example that shows how to run and configure Nginx following OpenShift’s rules. First you need a [Dockerfile](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/navigator/Dockerfile.os4) like this:

```
FROM node:lts-alpine as BUILD
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17
COPY nginx-os4.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=BUILD /usr/src/app/dist .
EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
```

Next define a [nginx.conf](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/navigator/nginx-os4.conf) configuration file.

```
# nginx.conf
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
     root /code;
     expires -1;
     add_header Pragma "no-cache";
     add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
     try_files $uri /index.html = 404;
   }
 }
}
```

After this web applications can be deployed via the following commands. Check out the sample [Vue.js application](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/frontend-single-spa/navigator) and the [configuration yaml](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/navigator/deployment/kubernetes.yaml) file. After the build the resources are stored in the ‘dist’ directory.

```
$ cd web-app-root-directory
$ oc new-build --name build-storefront-mf-navigator --binary --strategy=docker
$ oc start-build build-storefront-mf-navigator --from-dir=. --follow
$ oc apply -f deployment/kubernetes.yaml
$ oc expose svc/storefront-mf-navigator
```

![image](/assets/img/2021/05/openshift-nginx.png)

**What’s next?**

If you want to see these mechanisms in action, check out my [sample application](https://github.com/IBM/application-modernization-javaee-quarkus). There is also a good blog [Deploy VueJS applications on OpenShift](https://www.openshift.com/blog/deploy-vuejs-applications-on-openshift) on Red Hat Developer.