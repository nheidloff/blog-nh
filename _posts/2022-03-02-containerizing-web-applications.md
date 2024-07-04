---
id: 4683
title: 'Containerizing Web Applications'
date: '2022-03-02T15:41:21+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4683'
permalink: /article/containerizing-web-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/containerizing-web-applications/
categories:
    - Articles
---

*Applications and microservices should be developed in a way that they can be deployed to different environments. This article describes how to apply this principle to web applications running in containers.*

The third factor of [The Twelve-Factor App](https://12factor.net/config) describes how to handle configurations.

> An app’s config is everything that is likely to vary between deploys (staging, production, developer environments, etc). This includes: Resource handles to the database and other backing services and credentials to external services. Apps sometimes store config as constants in the code. This is a violation of twelve-factor, which requires strict separation of config from code. Config varies substantially across deploys, code does not.

**Web Application Configurations**

For backend applications configuration can simply be done via environment variables. Check out my previous blog describing how to do this for [Quarkus applications]({{ "/article/containerizing-quarkus-applications/" | relative_url }}).

For web applications this is a little bit more tricky. Environment variables are only available in the container. Web applications are often hosted by web servers like nginx. Sometimes the static web resources are even only hosted via cloud object storage. In other words the environment variables are by default not available in the web browsers where the actual web applications run.

A best practise to handle this scenario is to store the environment variables in a static JavaScript file. The JavaScript file is loaded by the web browser so that all variables can be accessed from the client side JavaScript code.

Note that this approach must not be used for passwords and other credentials since they would be sent to the browser without protection!

In the sample JavaScript file env-config.js the variables are stored in ‘window’ or ‘document’.

```
window.VUE_APP_ROOT="/"
document.VUE_APP_KEYCLOAK="http://localhost:8282/auth"
```

The file is loaded as all other static resources, so that the variables can be used as normal JavaScript DOM variables.

```
<script src="env-config.js" type="text/javascript"></script>
```

When deploying the web server container to Kubernetes or OpenShift, the values of the variables can be defined in the yaml.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: service-frontend
  template:
    metadata:
      labels:
        app: service-frontend
    spec:
      containers:
      - name: service-frontend
        image: my-nginx-image
        env:
        - name: VUE_APP_ROOT
          value: "/" 
```

**Nginx Containers**

Obviously you also need a Dockerfile (sometimes called ContainerFile these days) to create the image. In order to run web servers like nginx on OpenShift, certain rules apply. For example the server must not run as root and use certain ports. Check out the [Red Hat blog](https://cloud.redhat.com/blog/deploy-vuejs-applications-on-openshift) for details.

The last question is how to make the JavaScript file with the environments available in the container. This can be done via the same pattern I described in the article [Accessing Postgres from Quarkus Containers via TLS]({{ "/article/accessing-postgres-from-quarkus-containers-via-tls/" | relative_url }}).

The trick is not to copy the values to the image. Instead it should be possible to change these variables without having to rebuild the image. This can be done by creating the file with the variables in the command when the container is started. Check out the complete [Dockerfile](https://github.com/IBM/multi-tenancy-frontend/blob/main/Dockerfile).

```
cat <<EOF
window.VUE_APP_ROOT="${VUE_APP_ROOT}"
document.VUE_APP_KEYCLOAK="{VUE_APP_KEYCLOAK}"
EOF
```

The screenshot shows the deployed web application container in OpenShift.

![image](/assets/img/2022/02/web-apps-config.png)

**What’s next?**

Take a look at the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) repo to see the full technique in action.

I’ve also planned to blog in more detail about the SaaS repo soon. Keep an eye on this blog.