---
id: 3396
title: 'Serverless Java Functions with Quarkus and OpenWhisk'
date: '2019-03-12T14:45:27+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3396'
permalink: /article/serverless-java-quarkus-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7288278370'
custom_permalink:
    - article/serverless-java-quarkus-openwhisk/
categories:
    - Articles
---

[Quarkus](https://quarkus.io/) is a “next-generation Kubernetes native Java framework” which is available as open source. Quarkus promises fast boot times and low memory usages. This makes Quarkus a perfect fit for Java workloads running as microservices on Kubernetes as well as Java workloads running as serverless functions.

Read the article [Why Quarkus](http://in.relation.to/2019/03/08/why-quarkus/) to learn how Quarkus works. In a nutshell Quarkus compiles Java source code in native binaries via [GraalVM](https://graalvm.org/). The Quarkus framework helps developers to easily build applications that can leverage the GraalVM benefits.

Most developers use JavaScript/Node.js to build serverless functions nowadays. One reason is that Node.js applications usually (used to?) start faster and consume less memory. Since you typically pay for memory and time in the cloud, Node.js often saves you money and provides better experiences.

Today I looked briefly into how to use Quarkus to build lightweight and fast Docker images which can be run as serverless functions on [Apache OpenWhisk](https://openwhisk.apache.org/) based platforms like [IBM Cloud Functions](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-index#index). One of the great features of OpenWhisk is that you can use Docker to develop functions.

I’ve put together a little [sample](https://github.com/nheidloff/openwhisk-quarkus-starter) on GitHub.

Here is how you can try Quarkus on IBM Cloud Functions. All you need is a free [IBM Cloud lite account](https://ibm.biz/nheidloff) and the ‘[ibmcloud](https://console.bluemix.net/docs/cli/index.html)‘ CLI.

First download the code:

```
$ git clone https://github.com/nheidloff/openwhisk-quarkus-starter.git
$ cd openwhisk-quarkus-starter
```

Before the actual Docker image is built, the native binary is created. Follow the [instructions](https://quarkus.io/guides/building-native-image-guide) on the Quarkus web site how to set up GraalVM, a Java JDK and Maven.

Then build the image (replace ‘nheidloff’ with your Docker name).

```
$ mvn package -Pnative -Dnative-image.docker-build=true
$ docker build -t nheidloff/quarkus-serverless:1 .
$ docker push nheidloff/quarkus-serverless:1
```

In order to invoke the function locally, run these commands:

```
$ docker run -i --rm -p 8080:8080 nheidloff/quarkus-serverless
$ curl --request POST \
  --url http://localhost:8080/run \
  --header 'Content-Type: application/json' \
  --data '{"value":{"name":"Niklas"}}'
```

In order to change the implementation of the sample function, use your favorite Java IDE or text editor. When you run the following command, the application will be updated automatically every time you save a file:

```
$ mvn compile quarkus:dev
```

The OpenWhisk function can be created on the IBM Cloud with these commands:

```
$ ibmcloud login
$ ibmcloud fn action create echo-quarkus --docker nheidloff/quarkus-serverless:1 -m 128
```

**Note:** The deployed Quarkus function only consumes 128 MB memory. I think this is pretty amazing.

The easiest way to invoke the command is via the ibmcloud CLI:

```
$ ibmcloud fn action invoke --blocking echo-quarkus --param name Niklas
```

Next I want to look more at the speed of the Quarkus functions.