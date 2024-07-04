---
id: 2240
title: 'Deploying Angular 2 Apps to Bluemix'
date: '2017-04-11T08:01:24+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2240'
permalink: /article/angular-2-bluemix-docker-nginx/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/angular-2-bluemix-docker-nginx/
categories:
    - Articles
---

Over the last months I’ve done quite a lot of [Angular 2](https://angular.io/) development (now Angular 4). Below is a description how to create a new Angular app and deploy it as Docker container to [Bluemix](https://bluemix.net) in just a few minutes.

In order to create a new Angular app you can use the [Angular CLI](https://github.com/angular/angular-cli).

```
npm install -g @angular/cli
ng new angular-app
cd angular-app
ng build --prod
```

There are several ways to deploy Angular apps to Bluemix. For example you can build a simple Node.js web server to host the files. Or you can leverage existing HTTP servers like [nginx](http://nginx.org/en/). You can use nginx in the Cloud Foundry [staticfile-buildpack](https://github.com/cloudfoundry/staticfile-buildpack) or in Docker. Since I experienced issues with the Cloud Foundry buildpack (I couldn’t enforce https), the following steps show how to use Docker.

Copy the following lines in the file ‘Dockerfile’ in your project’s root directory.

```
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
```

Copy the following lines into ‘nginx.conf’. There are many other features nginx provides that can be [configured](http://nginx.org/en/docs/beginners_guide.html) in this file, e.g. gzip settings and caching.

```
server {
  listen 80;
  charset utf-8;
  sendfile on;
  root /usr/share/nginx/html;
 
  location / {
    expires -1;
    add_header Pragma "no-cache";
    add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";

    try_files $uri $uri/ /index.html = 404;
  }

  location /api/v1/namespaces/ {
    proxy_pass https://openwhisk.ng.bluemix.net; 
  }    
}
```

The location ‘/api/v1/namespaces/’ is an example how to invoke a REST API from your Angular app, in this case to invoke an OpenWhisk action.

Next the Docker container needs to be built.

```
docker build -t angular-app .
docker tag angular-app registry.ng.bluemix.net/nheidloff/angular-app
docker push registry.ng.bluemix.net/nheidloff/angular-app
```

There are different ways to run the container on Bluemix. For example as [scalable container group](https://console.ng.bluemix.net/docs/containers/cs_classic.html) or in a [Kubernetes]({{ "/article/kubernetes-docker-bluemix" | relative_url }}) cluster. For testing purposes you can also run the container as single instance with a public IP address:

```
bx ic run --name angular-app -p 80 -m 128 registry.ng.bluemix.net/nheidloff/angular-app
bx ic ips
bx ic ip-bind 169.46.26.176 angular-app
bx ic inspect angular-app
```

This is the file structure of the Angular project.

![angular2bluemix](/assets/img/2017/04/angular2bluemix.png)