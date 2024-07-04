---
id: 4559
title: 'Connecting to managed Database Services via TLS'
date: '2021-05-10T07:49:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4559'
permalink: /article/connecting-to-managed-database-services-via-tls/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/connecting-to-managed-database-services-via-tls/
categories:
    - Articles
---

This article describes how to use a managed PostgreSQL database in a Quarkus microservice and how to handle TLS certificates.

In my [application modernization](https://github.com/IBM/application-modernization-javaee-quarkus) example I have used Postgres as datastore of a strangled microservice. My article [Deploying Postgres on OpenShift]({{ "/article/deploying-postgres-on-openshift/" | relative_url }}) explained how to deploy Postgres in Kubernetes clusters. This is particularly useful for development in early project stages. However, for applications in production managed database services have several advantages, for example high availability and data backups.

Accessing managed databases rather than databases running in the same cluster doesn’t make much difference. Source code does not have to be changed usually. The biggest difference often is to use TLS which requires only changes to the configuration.

**IBM Cloud Databases for PostgreSQL**

Let’s take a look how to accesss the managed Postgres service [IBM Cloud Databases for PostgreSQL](https://cloud.ibm.com/docs/databases-for-postgresql?topic=databases-for-postgresql-getting-started) from a Quarkus application.

First you need an [IBM Cloud account](https://cloud.ibm.com/registration). It is free, there is no time restriction, no credit card is required and several services are provided as trial.

Next you need to create a Postgres instance which can be done via the IBM Cloud web interface or programmatically. See the [instructions](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/documentation/Deployments.md#managed-postgres) for details. You need the following information:

- Username
- Password
- Database name
- Connection URL
- TLS certificate

![image](/assets/img/2021/05/postgres-ibm-cloud.png)

**Connection URL with Link to Certificate**

My Quarkus application accesses Postgres via [Panache](https://quarkus.io/guides/hibernate-orm-panache). The configuration of data sources in Quarkus applications is done in [application.properties](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-synch/src/main/resources/application.properties.container-managed) files.

```
quarkus.datasource.jdbc.url=jdbc:postgresql://a68f8532-d089-4859-96b8-3f09cf4b4d1f.bn2a2vgd01r3l0hfmvc0.databases.appdomain.cloud:30239/ibmclouddb?sslmode=verify-full&sslrootcert=/certs/ibm-cloud-postgres-cert
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=admin
quarkus.datasource.password=demopassword
quarkus.hibernate-orm.database.generation=drop-and-create
quarkus.hibernate-orm.sql-load-script=import2.sql
```

In order to use TLS the connection URL needs to contain ‘sslmode=verify-full&amp;sslrootcert=/certs/ibm-cloud-postgres-cert’. Sslrootcert points to the TLS certificate which had been made available to the Quarkus container.

Rather than copying the certificate on the image a volume is used (see [yaml](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/service-catalog-quarkus-synch/deployment/kubernetes.yaml)).

```
volumes:
- name: ibm-cloud-postgres-cert
   secret:
     secretName: ibm-cloud-postgres-cert
containers:
- name: service-catalog-quarkus-synch
   image: image-registry.openshift-image-registry.svc:5000/app-mod-dev/build-service-catalog-quarkus-synch:latest
   volumeMounts:
   - mountPath: "/certs"
      name: ibm-cloud-postgres-cert
      readOnly: true
```

For security reasons the certificate is put in a Kubernetes secret:

```
$ oc create secret generic ibm-cloud-postgres-cert --from-file ibm-cloud-postgres-cert
```

**Configuration of Quarkus Applications**

Quarkus applications are configured in application.properties files. Additionally [environment variables](https://quarkus.io/guides/config-reference) can be used to overwrite these values. This is useful for applications that are deployed to Kubernetes/OpenShift. In the example below the database username and password are defined in the yaml file rather than application.properties.

Note that the database password should be stored in a secret or a service like HashiCorp Vault.

```
containers:
- name: service-catalog-quarkus-synch
   image: image-registry.openshift-image-registry.svc:5000/app-mod-dev/build-service-catalog-quarkus-synch:latest
   env:
   - name: QUARKUS_DATASOURCE_USERNAME
      value: "admin"
   - name: QUARKUS_DATASOURCE_PASSWORD
      value: "demopassword"
```

**What’s next?**

If you want to see these mechanisms in action, check out my [sample application](https://github.com/IBM/application-modernization-javaee-quarkus). It includes Quarkus and Open Liberty applications which access Postgres and Db2 deployed to clusters or in the cloud.