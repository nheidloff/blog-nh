---
id: 1143
title: 'How Docker Containers relate to Cloud Foundry in IBM Bluemix'
date: '2015-02-20T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/how-docker-containers-relate-to-cloud-foundry-in-ibm-bluemix/'
permalink: /article/20.02.2015092308NHEBUJ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/2.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323191726'
custom_permalink:
    - article/20.02.2015092308NHEBUJ.htm/
categories:
    - Articles
---

**Update 11/23/15:** [See here for an updated version of this article.]({{ "/article/developer-perspective-on-cloud-foundry-vs-docker-on-bluemix" | relative_url }})

 [IBM Bluemix](http://bluemix.net/) is based on [Cloud Foundry](http://www.cloudfoundry.org/about/index.html), an open PaaS (platform as a service) to provide customers a choice of clouds. This PaaS model allows developers to focus almost exclusively on writing code since all infrastructure including the application servers are provided. This enables developers to build applications rapidly in local IDEs and push the applications to the cloud. This ease of use however comes at the expense of having less control over the infrastructure (obviously) which is desirable in certain scenarios.

 At the end of last year IBM launched [IBM Containers Beta](https://developer.ibm.com/bluemix/2014/12/04/ibm-containers-beta-docker/). The IBM containers are based on the popular [Docker](https://www.docker.com/) containers. On a high level containers are similar to virtual machines (VMs) and have similar advantages like the fast creation of new instances. As my colleague [Carl Osipov](http://www.cloudswithcarl.com/?p=63) describes in his blog there is a significant difference though: “Instead of virtualizing the hardware (as the case with traditional virtual machines) containers virtualize the operating system” and are more lightweight than VMs.

 In difference to the Cloud Foundry model developers don’t only have to provide the applications, but essentially also the application servers/runtimes which are both included in the containers. This comes with the benefit that you can port your applications much better. Everyone in our business has probably heard the response of developers when something doesn’t work: “but it works on my machine”. This is exactly the issue containers address. As the name alludes to, containers can be ‘shipped’ very easily between different environments. For example developers can run these containers locally, other developers or quality engineers can run them on other on-premises environments, or the same containers can be run in the cloud.

 The downside of the container approach is a little more work for developers who also need to take care about building these container images. Fortunately there are many images already available provided by the community which can be used or extended. As part of Bluemix IBM provides [images](http://www.ng.bluemix.net/docs/#services/Containers/index.html#container) for Liberty and Node.

 So with these different approaches the question is when to use what. The containers are basically a new option between Softlayer’s IaaS (infrastructure as a service) and Cloud Foundry’s PaaS as described in this [deck](http://www.slideshare.net/niklasheidloff/application-development-for-ibm-connections-with-ibm-bluemix-41052648/9).

 Here is how the [redbook](http://www.redbooks.ibm.com/abstracts/redp5181.html?Open) describes the pros and cons of the different approaches.

 “Containers seemed like an optimal approach that would allow us more flexibility of what we were deploying, with the cost of a small increase in management overhead.” and “Existing applications are more likely to adopt the container model; new applications are more likely to build from scratch, using the power of the Cloud Foundry model.”

 In order to get started check out the [redbook](http://www.redbooks.ibm.com/abstracts/redp5181.html?Open), [Carl’s blog](http://www.cloudswithcarl.com/?p=63) and the [documentation](http://www.ng.bluemix.net/docs/#services/Containers/index.html#container).

 Here is the screenshot of the list of containers deployed onto Bluemix.

![image](/assets/img/2015/08/containers.png)