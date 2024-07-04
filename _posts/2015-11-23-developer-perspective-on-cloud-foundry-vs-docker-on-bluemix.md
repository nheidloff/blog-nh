---
id: 1617
title: 'Developer Perspective on Cloud Foundry vs Docker on Bluemix'
date: '2015-11-23T10:06:44+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1617'
permalink: /article/developer-perspective-on-cloud-foundry-vs-docker-on-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4343360158'
custom_permalink:
    - article/developer-perspective-on-cloud-foundry-vs-docker-on-bluemix/
categories:
    - Articles
---

[IBM Bluemix](https://bluemix.net) supports different ways to package applications and to deploy and run them in the cloud (“compute options”). Developers can choose between [Cloud Foundry](https://www.cloudfoundry.org/) and [Docker](https://www.docker.com/). The two models have certainly similarities, for example they are both open and widely adopted, but there are also significant differences. Below I describe some of these differences as well as pros and cons from a consumer point of view.

**Cloud Foundry – Open Source Platform as a Service**

Cloud Foundry is a [platform as a service](https://docs.cloudfoundry.org/concepts/overview.html) (PaaS) which makes it really easy for developers to run their applications in the cloud without having to worry about any infrastructure. To push applications to the cloud, developers only push their (web) applications, everything else – from the hardware up to the application servers – is provided by the platform. In addition to hosting applications, [Cloud Foundry vendors](https://www.cloudfoundry.org/membership/members/) also provide services like databases, caches and messaging systems that developers can leverage, again without having to set up any infrastructure. Furthermore Cloud Foundry provides scalability of applications and auto-recovery, it provides logging dashboards and more administration functionality many developers don’t want to worry about.

These application management capabilities are a key concept and benefit of Cloud Foundry, but to be fair many vendors who provide hosting capabilities for Docker support this as well. For example [IBM Containers](https://www.ng.bluemix.net/docs/containers/container_index.html) provide monitoring dashboards for logs and CPU, memory and network usage as well as auto-recoverability and scalability of containers.

**Docker – De facto Container Standard**

Docker is a [container technology](https://www.docker.com/what-docker) to package full application stacks so that these containers can easily be run in different environments. This portability is achieved by packaging not only the core applications (your own code) but also the complete underlying stack you need to run applications including application servers, Java runtimes, configuration and other dependencies. Docker uses Linux as operating system and leverages concepts like Linux namespaces to run multiple applications in sandboxes. Containers are more portable since all you need are Linux Docker environments while for Cloud Foundry packaged applications you have more prerequisites, the Cloud Foundry runtimes and services.

**Key Advantage of Cloud Foundry – Ease of Use**

The advantage of Cloud Foundry when it comes to the packaging of applications is that it is very easy for developers to use. Developers can develop their applications in their local IDEs of choice, run and test them on local application servers and simply push the applications to the cloud. Cloud Foundry is smart enough to pick the right buildpack and via the [Cloud Foundry buildpacks](https://github.com/cloudfoundry-community/cf-docs-contrib/wiki/Buildpacks) a lot of the configuration is done automatically (if not overwritten/disabled by developers explicitly). For example if a Java Liberty application uses a NoSQL service, the feature is enabled in the buildpack and the appropriate jar files are downloaded. The ease of use of the Cloud Foundry model is very valuable for rapid prototyping, simpler types of applications and developers who might have other non-development related responsibilities in their jobs.

**Key Advantage of Docker – Portability**

For more sophisticated applications though it’s often desirable to have more flexibility and configuration options. With Docker images you have basically the same benefits that virtual machines provide but Docker images are much more lightweight and easier to handle since they don’t include their own operating system. For example while not recommended you could also run more than one process per container, for example to access the container via SSH. These advanced capabilities of Docker however come at the expense of more work for developers.

**Other Differences between Cloud Foundry and Docker**

I think the key advantage of the Cloud Foundry model is ease of use and the key advantage of Docker is portability. Beyond this main difference there are more differences between Docker and the Cloud Foundry packaging model. To share state both containers and Cloud Foundry apps can use in memory caches, databases or object storage. With Docker you can additionally use persistent storage volumes (file systems) which might make deployments of existing apps to the cloud easier. Additionally Cloud Foundry supports a smaller number of opened ports for security reasons while Docker in general has no limitations (unless restricted by the cloud platform provider).

As mentioned above Cloud Foundry is more than the hosting of applications. Cloud Foundry vendors also provide services that can be used to build different types of applications. These services and user accounts are automatically provisioned when adding services to applications in order to make it as easy as possible for developers to use these services. While Docker doesn’t know these types of services out of the box, the IBM Containers in Bluemix allow Docker applications to leverage the same Cloud Foundry services.

**Closing Thoughts**

Both Cloud Foundry and Docker are open technologies. To my knowledge the de facto standard Docker will be [evolved](https://github.com/opencontainers/runc) in the new [Open Container Initiative](https://www.opencontainers.org/) to create open industry standards around containers. Both technologies have healthy and growing ecosystems. The amount of Docker images on DockerHub is outstanding and shows the momentum and popularity of Docker these days.

Personally I hope that these technologies will come even closer together so that developers can benefit from the best of both worlds. I’d also like to see better tooling support for Docker and easier and standard-based ways to orchestrate and link between multiple containers in one application.

Above I describe on a high level the differences of Cloud Foundry and Docker capabilities as they exist today from a developer point of view. If you want to learn more I recommend to read the following articles that describe Cloud Foundry’s own container technology and plans to run Docker on Cloud Foundry.  
[Cloud Foundry, Docker, OpenStack – Leading Open Source Triumvirate](http://www.slideshare.net/AnimeshSingh/cloud-foundry-docker-openstack-leading-open-source-triumvirate) ([video](https://www.youtube.com/watch?v=p48KslXmP7A))  
[Docker on Diego, Cloud Foundry’s New Elastic Runtime](http://thenewstack.io/docker-on-diego-cloud-foundrys-new-elastic-runtime/)  
[Docker Containers, Cloud Foundry, and Diego—Why Abstraction Matters](http://www.altoros.com/cflive/docker-containers-cloud-foundry-and-diego/)

A big thank you goes to [Ryan Baxter](http://ryanjbaxter.com/) who provided great input for this article.

![image](/assets/img/2015/11/cfdocker.png)

If you want to try out Cloud Foundry and Docker in Kubernetes, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff) and try these computing options.