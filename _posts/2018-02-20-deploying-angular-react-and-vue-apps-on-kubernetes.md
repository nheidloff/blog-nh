---
id: 2832
title: 'Deploying Angular, React and Vue Apps on Kubernetes'
date: '2018-02-20T09:23:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2832'
permalink: /article/angular-react-vue-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/angular-react-vue-kubernetes/
dsq_thread_id:
    - '6491954155'
categories:
    - Articles
---

I’ve open sourced some sample code that shows how to deploy [Angular](https://angular.io/), [React](https://reactjs.org/) and [Vue](https://vuejs.org/) web applications to [Kubernetes](https://kubernetes.io/) on the [IBM Cloud](https://ibm.biz/nheidloff).

[Get the code from GitHub.](https://github.com/nheidloff/web-apps-kubernetes)

![image](/assets/img/2018/02/webapps-kube.png)

In order to serve the web applications, nginx is used. Check out [nginx.conf](https://github.com/nheidloff/web-apps-kubernetes/blob/master/angular-app/nginx.conf) for a simple sample configuration. The file also shows how to access other domains via HTTP.

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

The built web applications in the dist/build folders are copied on a Docker image. The image extends the standard nginx image from DockerHub. Here is the [Dockerfile](https://github.com/nheidloff/web-apps-kubernetes/blob/master/angular-app/Dockerfile).

```
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
```

In order to deploy the applications to Kubernetes, the Docker images are pushed to Docker registries and the Kubernetes [configurations](https://github.com/nheidloff/web-apps-kubernetes/blob/master/angular-app/kube-angular.yaml) are deployed via the kubectl CLI.

```
apiVersion: v1
kind: Service
metadata:
  name: angular-app
  labels:
    run: angular-app
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  - port: 443
    protocol: TCP
    name: https
  selector:
    run: angular-app
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: angular-app
spec:
  replicas: 1
  template:
    metadata:
      labels:
        run: angular-app
    spec:
      containers:
      - name: angular-app
        image: nheidloff/angular-app
        ports:
        - containerPort: 80
        - containerPort: 443      
```

If you want to try out deploying web applications on Kubernetes, you can register an account on the [IBM Cloud](https://ibm.biz/nheidloff).