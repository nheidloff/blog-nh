---
id: 4060
title: 'Deploying CodeReady Workspaces on the IBM Cloud'
date: '2020-05-12T09:52:55+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4060'
permalink: /article/deploying-codeready-workspaces-on-openshift-on-ibm-cloud/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-codeready-workspaces-on-openshift-on-ibm-cloud/
categories:
    - Articles
---

This short article describes how to deploy CodeReady Workspaces on OpenShift on IBM Cloud. The deployment is pretty straight forward with one exception which is explained below. Knowing this trick can save you some time and it makes the first time experience more enjoyable.

As stated on the home page, [Red Hat CodeReady Workspaces](https://developers.redhat.com/products/codeready-workspaces/overview) is a collaborative Kubernetes-native development solution that delivers OpenShift workspaces and in-browser IDE for rapid cloud application development.

Most of the instructions below can be used for all OpenShift installations, for example for [CodeReady Containers](https://developers.redhat.com/products/codeready-containers/overview) to run OpenShift locally. The mentioned trick is only necessary for the IBM Cloud.

To get started, create an [IBM Cloud account](http://ibm.biz/nheidloff) and create an [OpenShift](https://www.ibm.com/cloud/openshift) cluster as described in the [documentation](https://cloud.ibm.com/docs/openshift?topic=openshift-getting-started).

Once your cluster has been provisioned, open the OpenShift Web Console and create a new project.

![image](/assets/img/2020/05/crw01.png)

Give your project a name, for example ‘codereadyworkspaces’.

![image](/assets/img/2020/05/crw02.png)

On the operator hub page find the operator ‘Red Hat CodeReady Workspaces’.

![image](/assets/img/2020/05/crw03.png)

Click ‘Install’.

![image](/assets/img/2020/05/crw04.png)

Make sure your project is selected and click ‘Subscribe’.

![image](/assets/img/2020/05/crw05.png)

Wait until the status is ‘Succeeded’, then open the operator. This shouldn’t take longer than 1-2 minutes.

![image](/assets/img/2020/05/crw06.png)

On the ‘CodeReady Workspaces Cluster’ tab click on ‘Create CheCluster’.

![image](/assets/img/2020/05/crw07.png)

Keep all defaults and click ‘Create’.

![image](/assets/img/2020/05/crw08.png)

The creation of the cluster takes some time. In my case on the IBM Cloud roughly five minutes. For some reason the status on the page below stayed ‘Unknown’ even long after five minutes. Simply ignore it and open the cluster.

![image](/assets/img/2020/05/crw09.png)

Instead check for the status on the next page. Once the cluster will be ready, you’ll see the URL in the right column.

![image](/assets/img/2020/05/crw10.png)

When you open the Workspaces URL for the first time, you need to grant permisssions.

![image](/assets/img/2020/05/crw11.png)

The next dialog is the confusing part. DO NOT simply use the default name of your user. It contains special characters which will lead to issues later. This name will be used as Kubernetes namespace name which does not accept special characters.

![image](/assets/img/2020/05/crw12.png)

Instead use plain text for your user name.

![image](/assets/img/2020/05/crw13.png)

That’s it! You’ve successfully installed CodeReady Workspaces. Have fun.

![image](/assets/img/2020/05/crw14.png)