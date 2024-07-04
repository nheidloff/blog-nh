---
id: 3347
title: 'Dockerizing Java MicroProfile Applications'
date: '2019-03-06T15:18:46+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3347'
permalink: /article/dockerizing-container-java-microprofile/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7275760835'
custom_permalink:
    - article/dockerizing-container-java-microprofile/
categories:
    - Articles
---

For cloud-native applications [Kubernetes](https://kubernetes.io/) and [Istio](https://istio.io/) deliver a lot of important functionality out of the box, for example to ensure resiliency and scalability. This functionality works generically for microservices, no matter in which language they have been implemented and independent from the application logic.

Some cloud-native functionality however cannot be handled by Kubernetes and Istio, since it needs to be handled in the business logic of the microservices, for example application specific failover functionality, metrics and fine-grained authorization.

**MicroProfile**

That’s why I started to look into Eclipse [MicroProfile](https://microprofile.io/) which is an extension to JavaEE to build microservices-based architectures and a [great programming model for Istio](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php). In addition to the application specific logic that Istio cannot handle, it also comes with convenience functionality that you typically need when developing microservices, for example invoking REST APIs and implementing REST APIs including their documentation.

There is a [MicroProfile Starter](https://start.microprofile.io/) that includes several simple samples for MicroProfile functionality. In order to try these features in Istio, I’ve started to create a simple [sample application](https://github.com/nheidloff/cloud-native-starter).

Get the code of the [cloud-native starter](https://github.com/nheidloff/cloud-native-starter) sample.

**Container**

The first thing you need to run MicroProfile applications on Kubernetes is an image. MicroProfile is supported by several Java application servers, different JVMs can be used and there are different versions of all of these components. Because of this there are many different images you need to choose from.

I looked for an image that contains only components that are available as open source. Here is my Open Liberty [server.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/liberty/server.xml) file and this is how my [Dockerfile](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/Dockerfile) looks like:

```
FROM openliberty/open-liberty:microProfile2-java8-openj9
ADD https://github.com/WASdev/sample.opentracing.zipkintracer/releases/download/1.2/liberty-opentracing-zipkintracer-1.2-sample.zip /
RUN unzip liberty-opentracing-zipkintracer-1.2-sample.zip -d /opt/ol/wlp/usr/ \
 && rm liberty-opentracing-zipkintracer-1.2-sample.zip
COPY liberty/server.xml /config/
ADD target/articles.war /config/dropins/
```

The image contains these components:

- [OpenJ9](https://www.eclipse.org/openj9/) 0.12.1
- OpenJDK 8u202-b08 from [AdoptOpenJDK](https://adoptopenjdk.net/)
- [Open Liberty](https://openliberty.io/) 18.0.0.4
- [MicroProfile](https://microprofile.io/) 2.1

There are several different [images](https://github.com/OpenLiberty/ci.docker) available for Open Liberty. I picked a community image since it comes with OpenJ9 instead of the IBM version of OpenJ9. Unfortunately that image doesn’t seem to support MicroProfile 2.2 yet (at least I haven’t found it).

Additionally I download and copy a file needed for [Zipkin tracing](https://istio.io/docs/tasks/telemetry/distributed-tracing/) onto the image which you need to do manually at this point if you want to use the tracing functionality built into MicroProfile. This functionality is pretty useful since it allows you to see the chains of invocations between microservices.

This screenshot shows the [Jaeger](https://www.jaegertracing.io/) dashboard. The BFF (backend for frontend) ‘web-api’ microservice invokes another ‘articles’ service:

![image](/assets/img/2019/03/jaeger-starter-1024x509.png)

**Variations of the Dockerfile**

In order to avoid downloading the Zipkin file every time a new image is built, I’ve created a slightly different [Dockerfile](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/Dockerfile.previousdownload) where the file is added from a local directory. The image is built with a [script](https://github.com/nheidloff/cloud-native-starter/blob/master/scripts/deploy-articles-java-jee.sh#L18-L24) that downloads the file if it doesn’t exist locally. Alternatively you can download the file via Maven (check out the example [pom.xml](https://github.com/eclipse/microprofile-service-mesh-service-a/blob/master/pom.xml) and example [Dockerfile](https://github.com/eclipse/microprofile-service-mesh-service-a/blob/master/src/main/profiles/liberty/Dockerfile)).

Additionally I have created another variation of the [Docker image](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/Dockerfile.nojava) so that my sample application can be installed even by people who don’t have Java and Maven installed locally (or who have wrong Java/Maven versions). This Dockerfile uses a [multistage build](https://docs.docker.com/develop/develop-images/multistage-build/).

```
FROM maven:3.5-jdk-8 as BUILD
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM openliberty/open-liberty:microProfile2-java8-openj9
ADD liberty-opentracing-zipkintracer-1.2-sample.zip /
RUN unzip liberty-opentracing-zipkintracer-1.2-sample.zip -d /opt/ol/wlp/usr/ \
 && rm liberty-opentracing-zipkintracer-1.2-sample.zip
COPY liberty/server.xml /config/
COPY --from=BUILD /usr/src/app/target/articles.war /config/dropins/
```

**Sample Application**

If you want to try MicroProfile on Istio, use the [sample application](https://github.com/nheidloff/cloud-native-starter), set up a [local development environment]({{ "/article/setup-local-development-kubernetes-istio" | relative_url }}), make sure you have installed all necessary [prerequisites](https://github.com/nheidloff/cloud-native-starter/blob/master/scripts/check-prerequisites.sh#L13-L21) and run these commands:

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ scripts/check-prerequisites.sh
$ scripts/deploy-articles-java-jee.sh
$ scripts/deploy-web-api-java-jee.sh
```