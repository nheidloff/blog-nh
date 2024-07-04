---
id: 4661
title: 'Accessing Postgres from Quarkus Containers via TLS'
date: '2022-02-22T16:23:11+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4661'
permalink: /article/accessing-postgres-from-quarkus-containers-via-tls/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-postgres-from-quarkus-containers-via-tls/
categories:
    - Articles
---

*Accessing PostgreSQL from applications is easy. Doing it the right way from containers using secure TLS connections is a little harder.*

Over the last months I’ve worked with many companies who want to build SaaS (Software as a Service) to scale their solutions to new markets and to save costs. To address these needs, our team has produced a reference architecture that demonstrates how to build cloud-native applications that can be deployed to multiple clouds and how they can be exposed in multiple marketplaces. Red Hat OpenShift is a perfect technology to address these requirements.

Check out the [announcement]({{ "/article/open-source-multi-cloud-assets-saas" | relative_url }}) blog and the [SaaS repo](https://github.com/IBM/multi-tenancy).

The reference architecture comes with a sample application which uses a managed Postgres database in the IBM Cloud. This article describes how to handle the certificate.

TL;DR: If you don’t want to read the whole article, here is the summary.

**Don’t put the secret in the image!**

The trick is not to put the certificate in the image. I know it would be easier for development, but it wouldn’t be a solution for production ready images. The certificate needs to be passed as variable to the container. A script in the image’s Dockerfile copies the certificate to the right location in the container. Below are the step by step instructions.

The backend of the sample application has been implemented with Quarkus. In order to access Postgres, Hibernate is used. The configuration is stored in [application.properties](https://github.com/IBM/multi-tenancy-backend/blob/main/src/main/resources/application.properties).

```
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=${POSTGRES_USERNAME}
quarkus.datasource.password=${POSTGRES_PASSWORD}
quarkus.datasource.jdbc.url=${POSTGRES_URL}
```

The Postgres certificate is accessible in the container, but is not part of the [image](https://github.com/IBM/multi-tenancy-backend/blob/main/Dockerfile#L33-L37):

```
COPY ./docker-service-catalog-entry.sh ./docker-service-catalog-entry.sh
RUN chmod 777 docker-service-catalog-entry.sh
ENV POSTGRES_CERTIFICATE_FILE_NAME /cloud-postgres-cert
RUN touch $POSTGRES_CERTIFICATE_FILE_NAME
RUN chmod 777 $POSTGRES_CERTIFICATE_FILE_NAME
ENTRYPOINT ["/bin/sh","docker-service-catalog-entry.sh"]
```

The Postgres [certificate](https://github.com/IBM/multi-tenancy-backend/blob/main/docker-service-catalog-entry.sh) is copied to “/cloud-postgres-cert”.

```
echo "$POSTGRES_CERTIFICATE_DATA" > "$POSTGRES_CERTIFICATE_FILE_NAME"
sh /deployments/run-java.sh
```

At runtime the container uses the [URL](https://github.com/IBM/multi-tenancy/blob/main/scripts/run-locally-container-backend.sh#L60-L83) “…?sslmode=verify-full&amp;sslrootcert=/cloud-postgres-cert” to refer to the certificate.

```
POSTGRES_URL=$(echo $POSTGRES_URL| cut -d'?' -f 1)
CERTIFICATE_PATH=/cloud-postgres-cert
POSTGRES_URL="$POSTGRES_URL?sslmode=verify-full&sslrootcert=$CERTIFICATE_PATH"
APPID_AUTH_SERVER_URL=${APPID_AUTH_SERVER_URL}
APPID_CLIENT_ID=${APPID_CLIENT_ID}

POSTGRES_CERTIFICATE_DATA=$(<$ROOT_PATH/$BACKEND_SOURCEFOLDER/src/main/resources/certificates/${POSTGRES_CERTIFICATE_FILE_NAME})

cd ${ROOT_PATH}/$BACKEND_SOURCEFOLDER
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
}
```

The screenshot shows the used Postgres environment variables.

![image](/assets/img/2022/02/Screenshot-2022-02-21-at-16.58.58.png)

**What’s next?**

Take a look at the [SaaS reference architecture](https://github.com/IBM/multi-tenancy) repo to learn more.

I’ve also planned to blog in more detail about the SaaS repo soon. Keep an eye on this blog.