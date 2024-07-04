---
id: 2500
title: 'Running Cloud-Native Applications On-Premises'
date: '2017-09-18T14:30:47+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2500'
permalink: /article/cloud-native-on-premises-ibm/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/cloud-native-on-premises-ibm/
dsq_thread_id:
    - '6152516890'
categories:
    - Articles
---

Cloud-native applications have a lot of advantages compared to monolithic architectures such as scalability and elasticity. Cloud-native platforms typically also provide services that developers can use without having to worry about infrastructure. These advantages are available in public clouds and now also in some private clouds which is important for companies with high data security and privacy requirements.

Recently IBM [announced](https://www.ibm.com/blogs/bluemix/2017/06/ibm-announces-kubernetes-base-ibm-cloud-private-platform/) IBM Cloud private. The [wiki](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/W1559b1be149d_43b0_881e_9783f38faaff/page/Overview%20of%20IBM%20Cloud%20private) describes the key features:

> IBM Cloud private is an application platform for developing and managing on-premises, containerized applications. It is an integrated environment for managing containers that includes the container orchestrator Kubernetes, a private image repository, a management console, and monitoring frameworks.

IBM Cloud private provides services like IBM Db2, IBM MQ, Redis, API Connect and [Microservice Builder](https://developer.ibm.com/microservice-builder/) which developers need to build workloads for traditional middleware. I hope to find time to blog more about this soon.

The following diagram explains the architecture and core components.

![image](/assets/img/2017/09/architecture_kubev3.jpg)

For developers there is a [community edition](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/install_containers_CE.html) available. You can install all nodes in one virtual machine. I run it on my MacBook Pro from 2014 with Virtual Box (ubuntu, 4 processors, 4 GB memory). I’ve followed these [instructions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/install_containers_CE.html) (with the help of my colleague Ansgar Schmidt). There is also a [GUI](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/install_containers_CE_UI.html) installer.

Here is a screenshot of the management console.

![image](/assets/img/2017/09/ibm-cloud-private.png)

To find out more, check out the [landing page](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/).