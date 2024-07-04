---
id: 1206
title: 'Host Docker Containers in the Cloud via IBM Bluemix'
date: '2015-04-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/host-docker-containers-in-the-cloud-via-ibm-bluemix/'
permalink: /article/27.04.2015105921NHECK7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/27.04.2015105921NHECK7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4334552662'
categories:
    - Articles
---

 Over the last weeks I’ve attended two bigger Java conferences in Germany – [JavaLand](http://heidloff.net/nh/home.nsf/article.xsp?id=03262015110541AMNHEDUL.htm) and [JAX](http://heidloff.net/nh/home.nsf/article.xsp?id=24.04.2015085153NHEA3G.htm). It felt like most of the sessions at these conferences were about [Docker](https://www.docker.com/) and microservices. For people who haven’t had a chance to learn more about the [open platform Docker](https://www.docker.com/whatisdocker/) I describe below on a high level what value Docker provides and how to get started with Docker when using [IBM Bluemix](http://bluemix.net/) for the hosting of the containers in the cloud. I [blogged](http://heidloff.net/nh/home.nsf/article.xsp?id=20.02.2015092308NHEBUJ.htm) about this earlier this year but since then things have evolved and new resources have become available.

 The big benefit of Docker images is that they can be ported very easily to other environments. For example developers can work locally and then hand over images to their quality engineers or host these images in the cloud. This addresses the problem that probably every professional in software development has experienced where especially new software runs only on the machine of the developer but not in other environments. When these problems are reported developers often respond with “but it works on my machine”.

 The portability of containers is especially important in the hybrid cloud model where parts of new applications are run in the cloud and other parts on premises. Another reason why Docker is so attractive is the very active and fast growing community as well as the improving tooling which makes it relative easy to build new images.

 The reason why Docker images can be ported so easily is because they don’t contain only the application but also the application server and the necessary configuration. Rather than deploying a packaged application to another application server, a new [container](http://www.slideshare.net/IBMBluemix/cloudfoundrydockermeetupv4-140911021156phpapp01/12) is created containing everything needed to run the application. So in that sense containers are similar to virtual machines. The big difference to virtual machines is that they don’t contain their own operating system and multiple containers can share the same resources which makes containers much more lightweight than classic virtual machines. IBM Research published recently an interesting document [An Updated Performance Comparison of Virtual Machines and Linux Containers](http://domino.research.ibm.com/library/cyberdig.nsf/papers/0929052195DD819C85257D2300681E7B).

 In December 2014 IBM announced a [Strategic Partnership to Deliver Enterprise Applications in the Cloud and On Prem](http://www-03.ibm.com/press/us/en/pressrelease/45597.wss?lnk=ushpls1) and the [IBM Containers Beta based on Docker](https://developer.ibm.com/bluemix/2014/12/04/ibm-containers-beta-docker/). In February at IBM InterConnect 2015 more functionality was announced in this context. In the Bluemix user interface containers show up now in their own category on the same level as CloudFoundry and OpenStack as opposed to just another integration service. At InterConnect IBM also previewed the new capability to build and deploy Docker in the cloud via [IBM DevOps pipelines](http://www.slideshare.net/DanielBerg3/3962-a-dockingdevops/15).

 IBM product manager Chris Rosen wrote some blog entries recently about Docker in IBM Bluemix that I encourage you to check out. In one of his blog he describes the [5 game-changing capabilities from IBM Containers on Bluemix](https://www.linkedin.com/pulse/5-game-changing-capabilities-from-ibm-containers-bluemix-chris-rosen). The main capability Bluemix adds here is an access controlled registry of your images and the ability to host and manage containers in the cloud.

 In order to get started with Docker on Bluemix check out the [documentation](https://www.ng.bluemix.net/docs/#starters/index-gentopic3.html), the [Docker webinar](https://developer.ibm.com/bluemix/2015/03/17/webinar-ibm-containers-bluemix-based-docker/), the [redbook](http://www.redbooks.ibm.com/abstracts/redp5181.html?Open), a [quick demo](https://www.youtube.com/watch?v=1UNMo4gTtKo) or the other blog entries from Chris Rosen ([getting started](https://www.linkedin.com/pulse/getting-started-ibm-containers-bluemix-chris-rosen), [ice tool](https://www.linkedin.com/pulse/ibm-containers-bluemix-using-cli-existing-docker-images-chris-rosen)).

 Last week Ryan Baxter and I presented at JAX how Java developers can use Bluemix. Ryan extended a sample I had done earlier to show how to run it not only via CloudFoundry but also via Docker. I don’t want to steal Ryan’s thunder since I’m sure he’ll blog about it, but essentially he used the [IBM Docker image for WebSphere Liberty](https://registry.hub.docker.com/_/websphere-liberty/) which is one of the curated images that show up by default in Bluemix. Check out the [InterConnect session](http://www.slideshare.net/davidcurrie/aai-5799libertydocker) to learn more.

![image](/assets/img/2015/04/ibm_docker.jpeg)