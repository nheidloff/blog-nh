---
id: 3750
title: 'Accessing private GitLab Repositories from OpenShift'
date: '2019-07-08T13:48:36+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3750'
permalink: /article/accessing-private-gitlab-repositories-from-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-private-gitlab-repositories-from-openshift/
categories:
    - Articles
---

One reason why [OpenShift](https://www.openshift.com/) is popular is that it comes with several functionality out-of-the-box on top of Kubernetes, for example image repositories and pipelines. However one component that is missing is source control. I assume that’s because source control management systems are often already in place.

IBM provides a managed [Red Hat OpenShift offering on the IBM Cloud](https://cloud.ibm.com/docs/containers?topic=containers-openshift_tutorial) (beta). For source control another IBM service can be used: [Git Repos and Issue Tracking](https://cloud.ibm.com/docs/services/ContinuousDelivery?topic=ContinuousDelivery-git_working) which is based on [GitLab Community Edition](https://about.gitlab.com/). The instructions below describe how to access private repositories on the IBM Cloud from OpenShift.

**1. Create a Repo in GitLab on the IBM Cloud**

IBM Cloud provides [toolchains](https://cloud.ibm.com/docs/services/ContinuousDelivery?topic=ContinuousDelivery-getting-started) with various tools to provide continues deliveries. One of these tools is [Git Repos and Issue Tracking](https://cloud.ibm.com/docs/services/ContinuousDelivery?topic=ContinuousDelivery-git_working). To try this feature, get a free [IBM Lite account](https://ibm.biz/nheidloff), [create an toolchain](https://cloud.ibm.com/devops/toolchains) based on the empty template and add the Git tool to it.

In order to try this integration, I’ve used a simple [hello world microservice]({{ "/article/how-to-develop-open-liberty-microservices-openshift/" | relative_url }}) and added the [code](https://github.com/IBM/cloud-native-starter/tree/master/authors-java-jee) to my repo. This is the GitLab user interface in the IBM Cloud.

![image](/assets/img/2019/07/ibm-gitlab-openshift1.png)

**2. Create an OpenShift cluster**

Follow the tutorial [Creating an IBM Cloud Red Hat OpenShift Container Platform cluster](https://cloud.ibm.com/docs/containers?topic=containers-openshift_tutorial) (beta) to set up your own cluster.

**3. Create a new SSH key pair**

To secure the communication between GitLab and OpenShift SSH keys are used. Read the articles [GitLab and SSH keys](https://us-south.git.cloud.ibm.com/help/ssh/README#generating-a-new-ssh-key-pair) and [Private Git Repositories: Part 2A – Repository SSH Keys](https://blog.openshift.com/private-git-repositories-part-2a-repository-ssh-keys/) to learn how create these keys.

**4. Add the public SSH key to GitLab**

The public key needs to be imported to GitLab which can be done under User Settings – SSH Keys.

![image](/assets/img/2019/07/ibm-gitlab-openshift2.png)

**5. Add the private SSH key to OpenShift**

The private SSH key needs to be added as a secret of a project. Read the article [Private Git Repositories: Part 2B – Repository SSH Keys](https://blog.openshift.com/private-git-repositories-part-2b-repository-ssh-keys/) to find out the details.

![image](/assets/img/2019/07/ibm-gitlab-openshift3.png)

**6. Test access to the private GitLab repo from OpenShift**

After you’ve created a new cluster, open the OpenShift console. From the dropdown menu in the upper right of the page, click ‘Copy Login Command’. Paste the copied command in your local terminal, for example ‘oc login https://c1-e.us-east.containers.cloud.ibm.com:23967 –token=xxxxxx’.

From the root directory of your local repo (the authors-java-jee directory of the [cloud-native-starter](https://github.com/IBM/cloud-native-starter) project), run these commands to trigger a build:

```
$ oc login ...
$ oc new-project cloud-native-starter
$ oc new-app git@us-south.git.cloud.ibm.com:niklas_heidloff/authors-java-jee.git --name authors
$ oc set build-secret --source bc/authors repo-at-gitlab-ibm
$ oc start-build authors
```

This results in a successful build. Note that there is also a way to avoid the first failed build by using [annotations](https://blog.openshift.com/private-git-repositories-part-2b-repository-ssh-keys/).

![image](/assets/img/2019/07/ibm-gitlab-openshift4.png)

Once the basic communication between OpenShift and GitLab works you can also set up weekhooks to trigger builds on OpenShift when code in GitLab repos changes.