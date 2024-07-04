---
id: 3689
title: 'Source to Image Builder for Open Liberty Apps on OpenShift'
date: '2019-06-25T09:02:22+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3689'
permalink: /article/source-to-image-builder-open-liberty-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/source-to-image-builder-open-liberty-openshift/
categories:
    - Articles
    - Java
tags:
    - java
---

[OKD](https://www.okd.io/), the open source upstream Kubernetes distribution embedded in OpenShift, provides several ways to make deployments of applications to Kubernetes for developers easy. I’ve open sourced a project that demonstrates how to deploy local [Open Liberty](https://openliberty.io/) applications via two simple commands ‘oc new-app’ and ‘oc start-build’.

```
$ oc new-app s2i-open-liberty:latest~/. --name=<service-name>
$ oc start-build --from-dir . <service-name>
```

[Get the code from GitHub.](https://github.com/nheidloff/s2i-open-liberty)

**Source-to-Image**

OKD allows developers to deploy applications without having to understand Docker and Kubernetes in depth. Similarily to the Cloud Foundry [cf push](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html) experience, developers can deploy applications easily via terminal commands and without having to build Docker images. In order to do this [Source-to-Image](https://github.com/openshift/source-to-image) is used.

> Source-to-Image (S2I) is a toolkit for building reproducible container images from source code. S2I produces ready-to-run images by injecting source code into a container image.

In order to use S2I, builder images are needed. These builder images create the actual images with the applications. The builder images are similar to Cloud Foundry buildpacks.

OKD provides several builder images out of the box. In order to support other runtimes, for example Open Liberty, custom builder images can be built and deployed.

**Sample Application running locally in Docker Desktop**

The [repo](https://github.com/nheidloff/s2i-open-liberty) contains a S2I builder image which creates an image running Java web applications on [Open Liberty](https://openliberty.io/). Additionally the repo comes with a simple sample application which has been implemented with Java/[Jakarta EE](https://jakarta.ee/) and [Eclipse MicroProfile](https://microprofile.io/).

The Open Liberty builder image can be used in two different environments:

- OpenShift or MiniShift via ‘oc new-app’ and ‘oc start-build’
- Local Docker runtime via ‘s2i’

This is how to run the sample application locally with Docker and S2I:

```
$ cd ${ROOT_FOLDER}/sample
$ mvn package
$ s2i build . nheidloff/s2i-open-liberty authors
$ docker run -it --rm -p 9080:9080 authors
$ open http://localhost:9080/openapi/ui/
```

To use “s2i” or “oc new-app/oc start-build” you need to build the application with Maven. The server configuration file and the war file need to be in these directories:

- server.xml in the root directory
- \*.war file in the target directory

**Sample Application running on Minishift**

First the builder image needs to be built and deployed:

```
$ cd ${ROOT_FOLDER}
$ eval $(minishift docker-env)
$ oc login -u developer -p developer
$ oc new-project cloud-native-starter
$ docker login -u developer -p $(oc whoami -t) $(minishift openshift registry)
$ docker build -t nheidloff/s2i-open-liberty .
$ docker tag nheidloff/s2i-open-liberty:latest $(minishift openshift registry)/cloud-native-starter/s2i-open-liberty:latest
$ docker push $(minishift openshift registry)/cloud-native-starter/s2i-open-liberty
```

After the builder image has been deployed, Open Liberty applications can be deployed:

```
$ cd ${ROOT_FOLDER}/sample
$ mvn package
$ oc new-app s2i-open-liberty:latest~/. --name=authors
$ oc start-build --from-dir . authors 
$ oc expose svc/authors
$ open http://authors-cloud-native-starter.$(minishift ip).nip.io/openapi/ui/
$ curl -X GET "http://authors-cloud-native-starter.$(minishift ip).nip.io/api/v1/getauthor?name=Niklas%20Heidloff" -H "accept: application/json"
```

After the sample application has been deployed, it shows up in the console.

![image](/assets/img/2019/06/overview.png)