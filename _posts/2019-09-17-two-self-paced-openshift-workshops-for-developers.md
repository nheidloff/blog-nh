---
id: 3824
title: 'Two self-paced OpenShift Workshops for Developers'
date: '2019-09-17T13:47:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3824'
permalink: /article/two-self-paced-openshift-workshops-for-developers/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/two-self-paced-openshift-workshops-for-developers/
categories:
    - Articles
---

My colleagues Harald Uebele and Thomas Südbröcker and I’ve written two workshops for developers how to get started with Red Hat [OpenShift on the IBM Cloud](https://cloud.ibm.com/docs/openshift?topic=openshift-why_openshift).

The workshops are self-paced and available on [GitHub](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops). Each one takes between 60 and 90 minutes. The first one is for beginners and very easy, the second one covers more advanced topics, for example different mechanisms to deploy applications and microservices to OpenShift.

Each workshop has between six and seven labs. We have recorded videos that describe the labs and walk you through them.

**Workshop: Deploying Java Microservices to OpenShift on IBM Cloud**

This [workshop](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/tree/master/2-deploying-to-openshift#deploying-java-microservices-to-openshift-on-ibm-cloud) demonstrates how to build a microservice with Java EE and [Eclipse MicroProfile](https://microprofile.io/) and how to deploy it to OpenShift on the IBM Cloud. The microservice is kept as simple as possible, so that it can be used as a starting point for other microservices.

Duration: 60 – 90 minutes  
Difficulty: Intermediate

1. [Overview video (1:41 mins)](https://youtu.be/8361HGR_O_s)
2. Installing prerequisites: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/1-prereqs.md) and [video (2:58 mins)](https://youtu.be/c5CtqijWXL4)
3. Running the Java microservice locally: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/2-docker.md) and [video (3:51 mins)](https://youtu.be/4dT2jg6wGF4)
4. Understanding the Java implementation: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/3-java.md) and [video (9:09 mins)](https://www.youtube.com/watch?v=ugpYSPV9jAs)
5. Deploying to OpenShift via ‘oc’ CLI: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/4-openshift.md) and [video (14:32 mins)](https://youtu.be/4MDfalo2Fg0)
6. Deploying existing images to OpenShift: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/5-existing-image.md) and [video (7:09 mins)](https://youtu.be/JhxsS7l6DhA)
7. Deployments of code in GitHub repos: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/6-github.md) and [video (3:52 mins)](https://youtu.be/b3upMuZOpsY)
8. Source to Image deployments: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/2-deploying-to-openshift/documentation/7-source-to-image.md) and [video (7:06 mins)](https://youtu.be/p6lVc6MDrcM)

**Workshop: Understanding OpenShift**

In this [workshop](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/1-understanding-openshift/README.md#understanding-openshift) we will show you how to create your own OpenShift cluster on the IBM Cloud, how to use the oc CLI (command line interface) and how to use the OpenShift Web Console to deploy applications.

Duration: 60 – 90 minutes  
Audience: Beginner

1. [Overview video (3:42 mins)](https://youtu.be/cotKSI-S1Ng)
2. Introduction: [video (2:04 mins)](https://www.youtube.com/watch?v=hdwDMsDF9J8) and [video (5:45 mins)](https://www.youtube.com/watch?v=l4Vrj7mkxhQ)
3. Create an OpenShift cluster on the IBM Cloud: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/1-understanding-openshift/Part2.md) and [video (3:17 mins)](https://youtu.be/9xgqDP2B3WI)
4. Getting started with OpenShift for developers: [lab](https://learn.openshift.com/introduction/getting-started/) and [video (12:38 mins)](https://www.youtube.com/watch?v=boJOI0DgSTc&list=PL0Mrq9ES4ERfGpB0K5PHYmvl2xV60GSQz&index=4&t=0s)
5. Deploying applications from images: [lab](https://learn.openshift.com/introduction/deploying-images/) and [video (9:00 mins)](https://www.youtube.com/watch?v=v_j3TiurPQc&list=PL0Mrq9ES4ERfGpB0K5PHYmvl2xV60GSQz&index=5&t=0s)
6. Deploying applications from source: [lab](https://learn.openshift.com/introduction/deploying-python/) and [video (10:28 mins)](https://www.youtube.com/watch?v=2CtThlhgOYs&list=PL0Mrq9ES4ERfGpB0K5PHYmvl2xV60GSQz&index=6&t=0s)
7. Deploy an application on OpenShift on the IBM Cloud: [lab](https://github.com/nheidloff/openshift-on-ibm-cloud-workshops/blob/master/1-understanding-openshift/Part4.md) and [video (14:20 mins)](https://www.youtube.com/watch?v=7XBbuPjsUqU&list=PL0Mrq9ES4ERfGpB0K5PHYmvl2xV60GSQz&index=7&t=0s)

**Next Steps**

To learn more about OpenShift, the IBM Cloud and microservices, check out the following resources.

- There are many good tutorials on the Red Hat OpenShift [Interactive Learning Portal](https://learn.openshift.com/).
- The IBM Developer Website has its own section on [Red Hat OpenShift on IBM Cloud](https://developer.ibm.com/components/redhat-openshift-ibm-cloud/).
- Our [Cloud Native Starter](https://github.com/IBM/cloud-native-starter) project on GitHub has a section on [how to deploy on OpenShift](https://github.com/IBM/cloud-native-starter/blob/master/documentation/OpenShiftIKSDeployment.md#deploy-cloud-native-starter-on-openshift-on-ibm-cloud).
- Check this IBM Cloud solution tutorial: [Scalable web application on OpenShift](https://cloud.ibm.com/docs/tutorials?topic=solution-tutorials-scalable-webapp-openshift).

![image](/assets/img/2019/09/os_logo.png)