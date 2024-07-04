---
id: 4532
title: 'Deploying Kafka on OpenShift'
date: '2021-04-30T12:45:29+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4532'
permalink: /article/deploying-kafka-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-kafka-on-openshift/
categories:
    - Articles
---

This article describes an easy way for developers to deploy Kafka on Red Hat OpenShift.

**Managed Services**

There are multiple ways to use Kafka in the cloud. One way is to use IBM’s managed [Event Streams](https://cloud.ibm.com/catalog/services/event-streams) service or Red Hat’s managed service [OpenShift Streams for Apache Kafka](https://www.redhat.com/en/blog/introducing-red-hat-openshift-streams-apache-kafka). The big advantage of managed services is that you don’t have to worry about managing, operating and maintaining the messaging systems. As soon as you deploy services in your own clusters, you are usually responsible for managing them. Even if you use operators which help with day 2 tasks, you will have to perform some extra work compared to managed services.

**Operators**

Another approach to use Kafka is to install it in your own clusters. Especially for early stages in projects when developers want simply to try out things, this is a pragmatic approach to get started. For Kafka multiple operators are available which you find on the OperatorHub page in the OpenShift Console, for example:

1. Strimzi
2. Red Hat Integration – AMQ Streams

Strimzi is the open source upstream project for Red Hat’s AMQ Streams operator. It’s also the same code base used in Red Hat’s new managed Kafka service.

As always you can install the operators through the OpenShift user interface or programmatically.

**Programmatic Setup**

For my [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus) I’ve used the programmatic approach to set up the Strimzi operator.

```
$ oc new-project kafka
$ curl -L https://github.com/strimzi/strimzi-kafka-operator/releases/download/0.15.0/strimzi-cluster-operator-0.15.0.yaml \
     | sed 's/namespace: .*/namespace: kafka/' \
     | oc apply -f - -n kafka 
$ oc apply -f kafka-cluster.yaml -n kafka 
$ oc expose svc/my-cluster-kafka-external-bootstrap --port=9094
$ echo Run this command \(potentially multiple times\): \"oc wait kafka/my-cluster --for=condition=Ready --timeout=300s -n kafka\"
```

In the file kafka-cluster.yaml the cluster is defined.

```
apiVersion: kafka.strimzi.io/v1beta1
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    version: 2.3.0
    replicas: 3
    listeners:
      plain: {}
      tls: {}
      external:
        type: nodeport
        tls: false
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
      log.message.format.version: '2.3'
    storage:
      type: ephemeral
  zookeeper:
    replicas: 3
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

After this Kafka will be available under ‘my-cluster-kafka-external-bootstrap.kafka:9094’ for other containers running in the same cluster.

![image](/assets/img/2021/04/kafka-setup-openshift.png)

**Next Steps**

To learn more about OpenShift deployments and application modernization, check out the [Application Modernization – From Java EE in 2010 to Cloud-Native in 2021](https://github.com/IBM/application-modernization-javaee-quarkus) on GitHub.