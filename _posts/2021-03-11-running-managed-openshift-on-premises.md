---
id: 4490
title: 'Running Managed OpenShift On-Premises'
date: '2021-03-11T08:36:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4490'
permalink: /article/running-managed-openshift-on-premises/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/running-managed-openshift-on-premises/
categories:
    - Articles
---

This month IBM announced the [general availability of IBM Cloud Satellite](https://www.ibm.com/cloud/blog/announcements/red-hat-openshift-on-ibm-cloud-generally-available-on-ibm-cloud-satellite) as well as the general availability of OpenShift on Satellite. This offering is incredibly powerful! It allows companies to leverage benefits from the cloud, but at the same time to run their workloads and to keep their data on-premises.

Here is the definition of IBM Cloud Satellite:

> Deploy and run apps consistently across on-premises, edge computing and public cloud environments from any cloud vendor.
> 
> Consume a common set of cloud services including toolchains, databases, and AI in any location. The IBM Cloud® Satellite managed distributed cloud solution delivers cloud services, APIs, access policies, security controls and compliance.

**Setup of IBM Cloud Satellite**

There is good documentation how to set up Satellite (see below) which I don’t want to repeat here. Let me just focus on the key steps.

Satellite uses the concept of locations. Locations can be your on-premises data centers or edge environments. In the locations hardware and software is provided. The locations are connected with Satellite running in the cloud and Satellite manages the software on the local devices.

In my simple sample setup, I’ve created virtual machines. The VMs run in the IBM Cloud since this was the easiest way for me to try Satellite, but you obviously wouldn’t use such a setup in a real production environment.

The VMs run RHEL7 and require 4 vCPUs, 16GB RAM and 100GB disc space. For demonstration purposes the minimum are three nodes for the control plane in three different zones. To deploy OpenShift, you need at least three more worker nodes.

![image](/assets/img/2021/03/blog-sat-1.png)

In order to connect the VMs to Satellite, scripts are provided. After the connections have been established, Satellite provisions the VMs with the necessary software, for example to run OpenShift control planes and worker nodes.

![image](/assets/img/2021/03/blog-sat-2.png)

**Setup of OpenShift**

The setup of OpenShift is trivial. You can use the exact same user interface (or CLI) that is used to run managed OpenShift in the public IBM Cloud. The only difference is that you choose Satellite as infrastructure.

![image](/assets/img/2021/03/blog-sat-3.png)

After the creation of the cluster everything else works in the same way as if you’d use managed OpenShift offerings in public clouds. For example updates to latest OpenShift versions can be performed with a button click. Similarly you can install add-ons like Knative, Istio, etc. with just a few clicks and you can use logging and monitoring built into the IBM platform. Obviously you can also install your own software into OpenShift, for example via operators.

![image](/assets/img/2021/03/blog-sat-4.png)

**Next Steps**

Satellite provides more cool features to connect to external services and to centrally managed multiple clusters.

IBM has planned to add more services to Satellite. Another service that is available today is the AI platform Cloud Pak for Data which runs on OpenShift.

To learn more about IBM Cloud Satellite, check out these resources.

- [Home page](https://www.ibm.com/cloud/satellite)
- [Documentation](https://cloud.ibm.com/docs/satellite)
- Video: [Deploy apps and run anywhere with IBM Cloud Satellite](https://www.youtube.com/watch?v=kI62_Xw2Qgg)
- Video: [Setting up an On-Premises Satellite Location with Mini PCs](https://youtu.be/8WNjwlN5gMk)
- Video: [IBM Cloud Satellite Demo](https://youtu.be/SP1GkDQHfSY?t=188)