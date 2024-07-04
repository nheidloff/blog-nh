---
id: 3374
title: 'Using Quarkus to run Java Apps on Kubernetes'
date: '2019-03-11T17:05:15+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3374'
permalink: /article/quarkus-javaee-microprofile-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7286451026'
custom_permalink:
    - article/quarkus-javaee-microprofile-kubernetes/
categories:
    - Articles
---

Last week Red Hat [introduced](https://developers.redhat.com/blog/2019/03/07/quarkus-next-generation-kubernetes-native-java-framework/) Quarkus which is a “next-generation Kubernetes native Java framework” that is available as [open source](https://github.com/quarkusio/quarkus). [Quarkus](https://quarkus.io/) promises really fast boot times and low memory usages. This makes Quarkus a perfect fit for Java workloads running as microservices on Kubernetes as well as Java workloads running as serverless functions.

Read the article [Why Quarkus](http://in.relation.to/2019/03/08/why-quarkus/) to learn how Quarkus works. In a nutshell Quarkus compiles Java source code in native binaries via [GraalVM](https://graalvm.org/). The Quarkus framework helps developers to easily build applications that can leverage the GraalVM benefits.

I did some first quick tests to check how difficult it is to use Quarkus for my [cloud-native starter](https://github.com/nheidloff/cloud-native-starter) sample. One of my microservices uses JavaEE and Eclipse MicroProfile. As documented on the [MicroProfile blog](https://microprofile.io/2019/03/07/next-generation-kubernetes-native-java-framework-implements-eclipse-microprofile/), MicroProfile can be used together with Quarkus.

My [sample service](https://github.com/nheidloff/cloud-native-starter) is pretty simple and basically provides only a REST API. It uses a ‘classic’ JavaEE stack. Read my article [Dockerizing Java MicroProfile Applications]({{ "/article/dockerizing-container-java-microprofile" | relative_url }}) for details about the exact stack I’m using.

What I like most about Quarkus is that I can run my existing MicroProfile application with little changes only!

Using Quarkus was pretty straight forward. All I had to do was to exchange the [Dockerfile](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/Dockerfile.quarkus) …

```
FROM registry.fedoraproject.org/fedora-minimal
WORKDIR /work/
COPY target/*-runner /work/application
RUN chmod 775 /work
EXPOSE 8080
CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
```

… and to change the [pom.xml](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/pom-quarkus.xml) file:

```
<dependency>
   <groupId>org.eclipse.microprofile</groupId>
   <artifactId>microprofile</artifactId>
   <version>2.1</version>
   <scope>provided</scope>
   <type>pom</type>
</dependency>
<dependency>
   <groupId>io.quarkus</groupId>
   <artifactId>quarkus-arc</artifactId>
</dependency>
<dependency>
   <groupId>io.quarkus</groupId>
   <artifactId>quarkus-resteasy</artifactId>
   <version>0.11.0</version>
</dependency>
```

In order to deploy the Quarkus service to Kubernetes, I wrote a little [script](https://github.com/nheidloff/cloud-native-starter/blob/master/scripts/deploy-articles-java-jee-quarkus.sh). In the first step the Java code is compiled via GraalVM into a native binary. After this, a Docker image is built that contains and runs the native binary on a ‘fedora-minimal’ image.

```
mvn -f ${root_folder}/articles-java-jee/pom-quarkus.xml package -Pnative -Dnative-image.docker-build=true
docker build -f ${root_folder}/articles-java-jee/Dockerfile.quarkus -t articles-quarkus:1 .
kubectl apply -f deployment/kubernetes-quarkus.yaml
kubectl apply -f deployment/istio-quarkus.yaml
```

After this I can run the ‘classic’ articles service and the Quarkus based version in the same way.

![image](/assets/img/2019/03/quarkus-test-2.png)

The results are amazing. The size of the ‘classic’ image is 462 MB, while the Quarkus image is only 128 MB big.

**Note**: I haven’t optimized the ‘classic’ stack at all. For example I included many features I don’t really need. Keep this in mind for the comparison.

![image](/assets/img/2019/03/quarkus-test-1.png)

In my local Minikube cluster the startup time of the classic container (including SSL certificate creation, OpenAPI explorer, etc.) took 5 seconds, while Quarkus started in 0.003 seconds.

![image](/assets/img/2019/03/quarkus-test-3.png)

More interesting than the startup time of the containers is the overall duration how long it takes to create a new Kubernetes deployment (‘kubectl apply …yaml’). I haven’t done extensive testing, but here are some interesting numbers. I measured the time how long it takes for Minikube to start both containers (including the Istio proxy) in the pod after the images have been built and pushed. For the ‘classic’ version this takes roughly 46 seconds, for the Quarkus based version it takes about 6 seconds only.

If you want to give it a try yourself, check out my [repo](https://github.com/nheidloff/cloud-native-starter) and run the script above.