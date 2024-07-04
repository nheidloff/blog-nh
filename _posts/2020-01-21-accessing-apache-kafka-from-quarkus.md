---
id: 3914
title: 'Accessing Apache Kafka from Quarkus'
date: '2020-01-21T08:25:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3914'
permalink: /article/accessing-apache-kafka-from-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-apache-kafka-from-quarkus/
categories:
    - Articles
---

This article describes how to develop microservices with [Quarkus](https://quarkus.io/) which use [Apache Kafka](https://kafka.apache.org/) running in a Kubernetes cluster.

Quarkus supports [MicroProfile Reactive Messaging](https://github.com/eclipse/microprofile-reactive-messaging) to interact with Apache Kafka. There is a nice guide [Using Apache Kafka with reactive Messaging](https://quarkus.io/guides/kafka) which explains how to send and receive messages to and from Kafka.

The guide contains instructions how to run Kafka locally via Docker with docker-compose. While this is probably the easiest way to get started, the next step for microservices developers is often to figure out how to access Apache Kafka in Kubernetes environments or hosted Kafka services.

**Option 1: Apache Kafka running in Kubernetes**

The open source project [Strimzi](https://strimzi.io/) provides container images and operators for running Apache Kafka on Kubernetes and Red Hat OpenShift. There is a nice [blog series](https://developers.redhat.com/blog/2019/06/06/accessing-apache-kafka-in-strimzi-part-1-introduction/) on Red Hat Developer that describes how to use Strimzi. In order to access it from applications there are several different options, for example NodePorts, OpenShift routes, load balancers and Ingress.

Sometimes these options can be overwhelming for developers, especially when all you need is a simple development environment to write some reactive hello world applications to get started. In my case I wanted to install a simple Kafka server in my Minikube cluster.

There is a [quickstart](https://strimzi.io/quickstarts/minikube/) guide how to deploy Strimzi to Minikube. Unfortunately it doesn’t explain how to access it from applications. The second part of the blog series [Accessing Apache Kafka in Strimzi: Part 2 – Node ports](https://developers.redhat.com/blog/2019/06/07/accessing-apache-kafka-in-strimzi-part-2-node-ports/) explains this.

Based on these two articles I wrote a simple script that deploys Kafka to Minikube in less than 5 minutes. The script is part of the [cloud-native-starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive) project. Run these commands to give it a try:

```
$ git clone https://github.com/IBM/cloud-native-starter.git
$ cd cloud-native-starter/reactive
$ sh scripts/start-minikube.sh
$ sh scripts/deploy-kafka.sh
$ sh scripts/show-urls.sh
```

The output of the last command prints out the URL of the Kafka bootstrap server which you’ll need in the next step. You can find all resources in the ‘kafka’ namespace.

![image](/assets/img/2020/01/kafka-in-kubernetes.png)

In order to access Kafka from Quarkus, the Kafka connector has to be [configured](https://quarkus.io/guides/kafka#configuring-the-kafka-connector). When running the Quarkus application in the same Kubernetes cluster as Kafka, use the following configuration in ‘application.properties’. ‘my-cluster-kafka-external-bootstrap’ is the service name, ‘kafka’ the namespace and ‘9094’ the port.

```
kafka.bootstrap.servers=my-cluster-kafka-external-bootstrap.kafka:9094
mp.messaging.incoming.new-article-created.connector=smallrye-kafka
mp.messaging.incoming.new-article-created.value.deserializer=org.apache.kafka.common.serialization.StringDeserializer
```

When developing the Quarkus application locally, Kafka in Minikube is accessed via NodePort. In this case replace the kafka.bootstrap.servers configuration with the following URL:

```
$ minikubeip=$(minikube ip)
$ nodeport=$(kubectl get svc my-cluster-kafka-external-bootstrap -n kafka --ignore-not-found --output 'jsonpath={.spec.ports[*].nodePort}')
$ echo ${minikubeip}:${nodeport}  
```

**Option 2: Kafka as a Service**

Most cloud providers also host managed Kafka services. For example [Event Streams](https://cloud.ibm.com/catalog/services/event-streams) is the managed Kafka service in the IBM Cloud. There is a free lite plan which offers access to a single partition in a multi-tenant Event Streams cluster. All you need is an [IBM id](http://ibm.biz/nheidloff), which is free and you don’t need a credit card.

As most Kafka services in production, Event Streams requires a secure connection. This additional configuration needs to be defined in ‘application.properties’ again.

```
kafka.bootstrap.servers=broker-0-YOUR-ID.kafka.svc01.us-south.eventstreams.cloud.ibm.com:9093,broker-4-YOUR-ID.kafka.svc01.us-south.eventstreams.cloud.ibm.com:9093,...MORE-SERVERS
mp.messaging.incoming.new-article-created.connector=smallrye-kafka
mp.messaging.incoming.new-article-created.value.deserializer=org.apache.kafka.common.serialization.StringDeserializer
mp.messaging.incoming.new-article-created.sasl.mechanism=PLAIN
mp.messaging.incoming.new-article-created.security.protocol=SASL_SSL
mp.messaging.incoming.new-article-created.ssl.protocol=TLSv1.2
mp.messaging.incoming.new-article-created.sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="token" password="YOUR-PASSWORD";
```

In order to enter this information, you need 1. the list of Kafka bootstrap servers and 2. your password for the Event streams service. You can receive this information in the web frontend of the Event Streams service or you can use the IBM Cloud CLI.

My colleague Harald Uebele has developed a [script](https://github.com/IBM/cloud-native-starter/blob/master/reactive/iks-scripts/deploy-kafka.sh) that creates the service programmatically and returns these two pieces of information.

**Next Steps**

The scripts mentioned in this article are part of the cloud-native-starter project which describes how to get develop reactive applications with Quarkus. My previous [article]({{ "/article/development-reactive-applications-quarkus/" | relative_url }}) describes the project.

Try out the [code](https://github.com/IBM/cloud-native-starter/tree/master/reactive) yourself.

Read the other articles of this series:

- [Development of Reactive Applications with Quarkus]({{ "/article/development-reactive-applications-quarkus/" | relative_url }})
- [Accessing Apache Kafka from Quarkus]({{ "/article/accessing-apache-kafka-from-quarkus/" | relative_url }})
- [Accessing PostgreSQL in Kubernetes from Quarkus]({{ "/article/accessing-postgresql-from-quarkus/" | relative_url }})
- [Reactive Messaging Examples for Quarkus]({{ "/article/reactive-messaging-examples-quarkus/" | relative_url }})
- [Developing reactive REST APIs with Quarkus]({{ "/article/developing-reactive-rest-apis-with-quarkus/" | relative_url }})
- [Invoking REST APIs asynchronously with Quarkus]({{ "/article/invoking-rest-apis-asynchronously-with-quarkus/" | relative_url }})
- [Comparing synchronous and asynchronous Access to Postgres]({{ "/article/comparing-synchronous-asynchronous-access-postgresql/" | relative_url }})