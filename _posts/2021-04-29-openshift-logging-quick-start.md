---
id: 4516
title: 'OpenShift Logging Quick Start'
date: '2021-04-29T15:15:36+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4516'
permalink: /article/openshift-logging-quick-start/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openshift-logging-quick-start/
categories:
    - Articles
---

This article describes how to set up logging in Red Hat OpenShift and how to use it to see logs from microservices in one place.

OpenShift provides logging capabilities built into the platform to aggregate all the logs from your OpenShift cluster (infrastructure, application and audit logs). When using the OpenShift console though, you might be confused, since there is no UI for logging.

In order to see the option to open the logging user interface, you need to install cluster logging first.

![image](/assets/img/2021/04/logging-openshift-1.png)

The [documentation](https://docs.openshift.com/container-platform/4.6/logging/cluster-logging.html) is pretty good and I don’t want to repeat it here. Instead I summarize the key steps and my findings below.

**Install and configure Operators**

First you need to [install](https://docs.openshift.com/container-platform/4.6/logging/cluster-logging-deploying.html) two operators:

1. OpenShift Elasticsearch Operator provided by Red Hat
2. Cluster Logging provided by Red Hat

After the operators have been installed, create a new ‘Cluster Logging’ instance on the Cluster Logging operator page.

![image](/assets/img/2021/04/logging-openshift-2.png)

You can use all defaults, except one thing: The storage class name. If you use Red Hat OpenShift on the IBM Cloud, use ‘ibmc-block-gold’.

![image](/assets/img/2021/04/logging-openshift-3.png)

**EFK Stack**

After this you should see three running Elasticsearch pods, three Fluentd pods and one Kibana pod. Note that the Elasticsearch pods require a lot of memory.

![image](/assets/img/2021/04/logging-openshift-4.png)

OpenShift uses the EFK stack with three components:

1. Elasticsearch is the datastore which provides search and aggregation capabilities
2. Kibana is the user interface to view logs
3. Fluentd is the log data collector which can send logs to various targets (default is Elasticsearch in OpenShift)

**Viewing Logs**

Kibana is a data visualization dashboard software for Elasticsearch. Before it can be used some [minimal configuration](https://docs.openshift.com/container-platform/4.6/logging/cluster-logging-visualizer.html) needs to be done. You need to define the indexes for application and infrastructure logs.

![image](/assets/img/2021/04/logging-openshift-5.png)

On the Discover page you can refer to these index patterns. For application logs choose your app index. In the screenshot below the logs of my [application modernization](https://github.com/IBM/application-modernization-javaee-quarkus) example are displayed.

All microservices of my sample run in the same OpenShift project which I use as filter. To make the entries in the right column more readable, I selected ‘message’ as the field to be displayed. OpenShift logging (or Fluentd to be more precise) reads and forwards all [container logs](https://docs.openshift.com/container-platform/4.6/logging/cluster-logging.html) from /var/log/containers/\*.log which are the standard outputs and errors.

The screenshot shows the logs of my two microservices in one view.

![image](/assets/img/2021/04/logging-openshift-6.png)

**Alternatives**

There are good reasons to run the complete logging system within your own cluster.

Alternatively you could also consider not to use Elasticsearch in your OpenShift cluster, but other external sources. OpenShift provides various options for [third party solutions](https://docs.openshift.com/container-platform/4.6/logging/cluster-logging-external.html). An advantage of these options could mean less work since several of these options are available as managed services. Plus you wouldn’t need to dedicate that many resources to run Elasticsearch within your cluster.

Yet another alternative is to use the logging capabilities hyperscalers provide. For example [IBM Log Analysis](https://cloud.ibm.com/docs/openshift?topic=openshift-health) is a service that IBM offers for OpenShift on the IBM Cloud as well as for other IBM services.