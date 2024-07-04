---
id: 4503
title: "Deploying IBM's Db2 on OpenShift"
date: '2021-04-28T08:53:10+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4503'
permalink: /article/deploying-ibms-db2-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-ibms-db2-on-openshift/
categories:
    - Articles
---

This article describes an easy way for developers to deploy IBM’s Db2 databases on Red Hat OpenShift.

**Managed Services**

There are multiple ways to use Db2 in the cloud. One way is to use [IBM’s managed Db2 service](https://cloud.ibm.com/catalog/services/db2) in the cloud. The big advantage of managed services is that you don’t have to worry about managing, operating and maintaining the database systems and your data. As soon as you deploy services in your own clusters, you are usually responsible for managing them. Even if you use operators which help with day 2 tasks, you will have to perform some extra work compared to managed services.

**Developer Perspective**

As a developer I want to write code and be productive as soon as possible. Setting up infrastructure should be as painless as possible. Especially for the early stages in projects I don’t need infrastructure that could be used in production. For example even databases that don’t persist data are often sufficient in these stages.

Managed services are often an option, but sometimes it’s also desirable to set up services like databases in your own clusters, for example if this makes the creation of the schema and sample data easier, if you don’t want to handle secure connectivity and certificates, if you don’t want to set up users, roles and access rights, etc. In these cases I like being able to set up infrastructure myself, if it’s fast, easy and doesn’t cost me anything.

**Db2 Image**

In order to deploy Db2 to Kubernetes and OpenShift clusters, you obviously need to use containers. For Db2 there is an image ‘ibmcom/db2’ which I’ve used in my example.

You can find the source code of the complete sample [Application Modernization – From Java EE in 2010 to Cloud-Native in 2021](https://github.com/IBM/application-modernization-javaee-quarkus) on GitHub. Everything related to Db2 is located in the ‘[db2](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/db2)‘ directory.

The custom Dockerfile extends the Db2 image and adds scripts to add the schema and sample data.

```
FROM ibmcom/db2:11.5.5.0
RUN mkdir /var/custom
COPY createOrderDB.sql /var/custom
COPY orderdb-data.sql /var/custom
COPY populateDB.sh /var/custom
RUN chmod a+x /var/custom/populateDB.sh
```

Invoke these commands to build and run the container locally:

```
$ docker build . -t storefront-db2
$ docker create network store-front-network
$ docker run --name storefront-db2 --network store-front-network --privileged=true -e LICENSE=accept  -e DB2INST1_PASSWORD=db2inst1 -e DBNAME=orderdb -p 50000:50000 storefront-db2
```

Not that the container needs to be run as privileged. The Docker network is necessary to access the container from another container.

**Connection Information**

It takes several minutes to start the container (3-5 mins). After this you can access it from your applications, CLIs and tools.

The following screenshot shows DBeaver. The password is also ‘db2inst1’.

![image](/assets/img/2021/04/database-tool-2.png)

**Deployment to OpenShift**

In order to deploy the image to OpenShift, you need additional yaml configuration – see the ‘[db2/deployment](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/db2/deployment)‘ directory. Similarly to running the container locally via Docker Desktop you need to use the privileged setting again.

```
containers:
- resources: {}
  name: storefront-db2
  env:
    - name: DB2INST1_PASSWORD
       value: db2inst1
    - name: LICENSE
       value: accept
    - name: DBNAME
       value: orderdb
   securityContext:
     capabilities:
     privileged: true
     readOnlyRootFilesystem: false
     allowPrivilegeEscalation: true
   ports:
     - containerPort: 50000
        protocol: TCP
    imagePullPolicy: Always
    terminationMessagePolicy: File
    image: nheidloff/storefront-db2
```

Additionally you need to create a service account which has the right to run privileged containers – see [deploy-db.sh](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/scripts-openshift/deploy-db2.sh).

```
$ oc new-project db2   
$ oc create sa mysvcacct
$ oc adm policy add-scc-to-user privileged -z default -n db2
$ oc apply -f ${root_folder}/db2/deployment/db2-dc.yaml -n db2 
$ oc apply -f ${root_folder}/db2/deployment/db2-service.yaml -n db2 
$ oc expose svc/storefront-db2 --port=50000
```

In order to access the database from other containers running in the same cluster use the name ‘storefront-db2.db2:50000’ and the same configuration as above. In order to access the database from external processes use the OpenShift route.

**Next Steps**

To learn more about Db2, OpenShift deployments via Tekton and ArgoCD and application modernization, check out the [Application Modernization – From Java EE in 2010 to Cloud-Native in 2021](https://github.com/IBM/application-modernization-javaee-quarkus) on GitHub.