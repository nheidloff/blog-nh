---
id: 4311
title: 'Step-by-Step Instructions how to use Transformation Advisor'
date: '2021-01-25T14:43:38+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4311'
permalink: /article/step-by-step-instructions-ibm-transformation-advisor/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/step-by-step-instructions-ibm-transformation-advisor/
categories:
    - Articles
---

In a previous blog [Improving operational Efficiency through Application Modernization]({{ "/article/improving-operational-efficiency-through-application-modernization/" | relative_url }}) I described how to containerize a Java application from 2010 via [IBM’s Cloud Transformation Advisor tool]({{ "/article/improving-operational-efficiency-through-application-modernization/" | relative_url }}). Transformation Advisor generates Dockerfiles and scripts so that the same applications can be run in containers without changing any code! This article describes how to gather the data for Transformation Advisor.

Here is the description of [Transformation Advisor](https://www.ibm.com/garage/method/practices/learn/ibm-transformation-advisor/) from the home page:

> IBM Cloud Transformation Advisor helps you to analyze your on-premises workloads for modernization. It determines the complexity of your applications, estimates a development cost to perform the move to the cloud, and recommends the best target environment.

**Running Transformation Advisor locally**

The easiest way to start using the tool is the [Transformation Advisor Local](https://www.ibm.com/support/knowledgecenter/en/SS5Q6W/gettingStarted/deployTALocal.html) by running everything in Docker containers.

Here are the instructions for the [sample application](https://github.com/nheidloff/application-modernization-javaee-quarkus). First clone the repo:

```
$ git clone https://github.com/nheidloff/application-modernization-javaee-quarkus.git && cd application-modernization-javaee-quarkus
$ ROOT_FOLDER=$(pwd)
```

Download [Transformation Advisor](https://www.ibm.com/support/knowledgecenter/en/SS5Q6W/gettingStarted/deployTALocal.html).

Copy ‘transformationAdvisor.zip’ to ‘${ROOT\_FOLDER}/transformation-advisor/tool’ and extract it.

Accept the licence terms, install and launch Transformation Advisor:

```
$ sh ${ROOT_FOLDER}/transformation-advisor/tool/transformationAdvisor/launchTransformationAdvisor.sh
```

Open <http://localhost:3000>.

**Collecting Data**

In the Transformation Advisor web console create a workspace ‘workspace’ and a collection ‘collection855’.

Download the data collector for Linux ‘transformationadvisor-Linux\_workspace\_collection855.tgz’ and copy it to ‘${ROOT\_FOLDER}/transformation-advisor/tool’.

Launch the WebSphere Traditional application (without database):

```
$ sh ${ROOT_FOLDER}/scripts/install-dojo.sh
$ sh ${ROOT_FOLDER}/scripts/install-was-dependencies.sh
$ sh ${ROOT_FOLDER}/scripts-docker/build-and-run-monolith-app-was855.sh
```

Next copy the data collector tool to the WebSphere container and open the container’s terminal:

```
$ docker cp ${ROOT_FOLDER}/transformation-advisor/tool/transformationadvisor-Linux_workspace_collection855.tgz storefront-was855:/tmp
$ docker exec -it storefront-was855 /bin/bash
```

Then extract the compressed data collector file:

```
$ cd /tmp
$ tar xvfz transformationadvisor-Linux_workspace_collection855.tgz
$ exit
```

After this copy the [configuration file](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/transformation-advisor/wast855-to-wast90/customCmd.properties) onto the container:

```
$ docker cp ${ROOT_FOLDER}/transformation-advisor/wast855-to-wast90/customCmd.properties storefront-was855:/tmp/transformationadvisor-2.4.0/conf
```

For this particular example it’s important to define to include the classes from the ‘org.pwte’ packages.

```
--includePackages=org.pwte
```

Once the data collector and the configuration file has been copied onto the container, the collector tool can be run:

```
$ docker exec -it storefront-was855 /bin/bash
$ cd /tmp/transformationadvisor-2.4.0
$ ./bin/transformationadvisor -w /opt/IBM/WebSphere/AppServer -p AppSrv01
$ exit
```

Usually the results are uploaded to Transformation Advisor automatically. If this doesn’t work, you can do this manually:

```
$ cd ${ROOT_FOLDER}/transformation-advisor/wast855-to-wast90
$ docker cp storefront-was855:/tmp/transformationadvisor-2.4.0/AppSrv01.zip .
```

Here is the output file [AppSrv01.zip](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/transformation-advisor/wast855-to-wast90).

**Viewing the Results**

The results can be viewed in the Transformation Advisor Web Console.

![image](/assets/img/2021/01/transformation-advisor-results-1.png)

The source options app server, Java JDK version and Java EE version, are recognized automatically.

The target option ‘WebSphere Traditional’ can be chosen in the web application.

![image](/assets/img/2021/01/transformation-advisor-results-2.png)

The target Java JDK versions and Java EE versions are set automatically by Transformation Advisor. To make modernizations as easy as possible, versions are used which cause as little code changes as possible.

In a future Transformation Advisor version it might also be possible to change these values manually to get advice how to upgrade to the latest and greatest runtime versions.