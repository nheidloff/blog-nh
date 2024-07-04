---
id: 4674
title: 'Containerizing Quarkus Applications'
date: '2022-02-23T10:15:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4674'
permalink: /article/containerizing-quarkus-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/containerizing-quarkus-applications/
categories:
    - Articles
---

*Applications and microservices should be developed to allow deployments to different environments. This article describes how to apply this principle to Quarkus applications.*

The third factor of [The Twelve-Factor App](https://12factor.net/config) describes how to handle configurations.

> An app’s config is everything that is likely to vary between deploys (staging, production, developer environments, etc). This includes: Resource handles to the database and other backing services and credentials to external services. Apps sometimes store config as constants in the code. This is a violation of twelve-factor, which requires strict separation of config from code. Config varies substantially across deploys, code does not.

**Quarkus Configurations**

For Quarkus applications the text file [application.properties](https://quarkus.io/guides/config) is used for configurations. Here is a [sample](https://github.com/IBM/multi-tenancy-backend/blob/474954508eb2d64da08cbe333f0fd2d4849cd741/src/main/resources/application.properties) how this file can be used to configure access to Postgres.

```
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=${POSTGRES_USERNAME}
quarkus.datasource.password=${POSTGRES_PASSWORD}
quarkus.datasource.jdbc.url=${POSTGRES_URL}
```

Note that some of the values of the properties are environment variables. These variables need to be set before the Quarkus applications can be started. The following [snippet](https://github.com/IBM/multi-tenancy-backend/blob/474954508eb2d64da08cbe333f0fd2d4849cd741/deployments/kubernetes.yml) shows how to do this in yaml files when deploying Quarkus applications to Kubernetes or OpenShift.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: service-backend
  template:
    metadata:
      labels:
        app: service-backend
    spec:
      containers:
      - name: service-backend
        image: my-quarkus-image
        env:
        - name: POSTGRES_USERNAME
          valueFrom:
            secretKeyRef:
              name: postgres.username
              key: POSTGRES_USERNAME
```

Similarly if you run Quarkus applications locally or in local [containers](https://github.com/IBM/multi-tenancy/blob/main/scripts/run-locally-container-backend.sh#L73-L82) the same variables need to be defined.

```
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

**Quarkus Containers**

Obviously you also need a Dockerfile (sometimes called ContainerFile these days) to create the image. When creating Quarkus applications, various Dockerfiles are provided. Check out the [sample](https://github.com/IBM/multi-tenancy-documentation/blob/main/documentation/development_of_microservices/backend-service-container.md) which uses a multi-stage Dockerfile for the Maven build as well as the actual runtime image.

Another Quarkus feature I really like is that liveness and readiness endpoints are provided automatically after adding “quarkus-smallrye-health” as dependency. For example in my simple sample these probes return automatically whether the Postgres database is accessible.

```
livenessProbe:
  exec:
    command: ["sh", "-c", "curl -s http://localhost:8081/q/health/live"]
  initialDelaySeconds: 20
readinessProbe:
  exec:
    command: ["sh", "-c", "curl -s http://localhost:8081/q/health/ready"]
  initialDelaySeconds: 40
```

Building microservices that follow these patterns has the big advantage to be able to run the same services on various platforms, for example Kubernetes, OpenShift or the serverless IBM offering Code Engine (see screenshot).

![image](/assets/img/2022/02/quarkus-config-035.png)

**What’s next?**

Take a look at the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) repo to learn how a Quarkus microservice has been used to implement the backend functionality of a SaaS application.

I’ve also planned to blog in more detail about the SaaS repo soon. Keep an eye on this blog.