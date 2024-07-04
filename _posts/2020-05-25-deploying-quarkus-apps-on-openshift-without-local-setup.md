---
id: 4091
title: 'Deploying Quarkus Apps on OpenShift without local Setup'
date: '2020-05-25T13:52:52+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4091'
permalink: /article/deploying-quarkus-applications-on-openshift-without-local-setup/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/deploying-quarkus-applications-on-openshift-without-local-setup/
categories:
    - Java
---

This article explains how to deploy Quarkus applications on OpenShift as quickly as possible. All you need is an OpenShift cluster with enough memory. Everything else can be done in the browser.

In times of Corona in our team of developer advocates we do a lot of online workshops. There are great tools available to host these workshops, but they don’t replace the onsite experience. For example one thing that is difficult is that you can’t look easily over the shoulders of attendees and help them. Additionally attendees often don’t want to stay for hours.

Because of these reasons it needs to be possible for attendees to get started as quickly as possible and potential issues need to be minimised. The typical first lab where you need to set up prerequisites should be shortened or completely removed.

That’s why I’m very interested in CodeReady Workspaces which give you an IDE integrated in OpenShift. CodeReady Workspaces is based on the open source version [Eclipse Che](https://www.eclipse.org/che/) and can be installed in Kubernetes and OpenShift via operators. Check out my article [Deploying CodeReady Workspaces]({{ "/article/deploying-codeready-workspaces-on-openshift-on-ibm-cloud/" | relative_url }}) to learn how to use Workspaces either locally via CodeReady Containers or in the IBM Cloud.

Let’s take a look how Quarkus applications can be developed in the browser and deployed to OpenShift.

![image](/assets/img/2020/05/crw-q-os-01.png)

Once you have CodeReady Workspaces installed, you can create a new workspace based on the ‘Quarkus Tools’ template. This template comes with the CLIs and runtimes you need, for example Maven, Java, the oc CLI etc.

Additionally every template contains the [Eclipse Theia](https://theia-ide.org/) IDE which contains a text editor. The editor looks similar to Visual Studio Code, but is actually a different technologies. However, you can use Visual Studio Code plugins since both editors support the same plugin model. That allows for example to use the Java developer tools in the web editor.

The ‘Quarkus Tools’ workspace can be created with a Quarkus quick start sample. You can launch the application via the Maven terminal.

![image](/assets/img/2020/05/crw-q-os-02.png)

Run the command ‘./mvnw compile quarkus:dev’.

![image](/assets/img/2020/05/crw-q-os-03.png)

In order to access the application via URL an external route is generated. ‘localhost’ would obviously not work.

![image](/assets/img/2020/05/crw-q-os-04.png)

In order to deploy applications to Kubernetes and OpenShift, check out the Quarkus guides [DEPLOYING ON OPENSHIFT](https://quarkus.io/guides/deploying-to-openshift) and [KUBERNETES EXTENSION](https://quarkus.io/guides/kubernetes). In this article the OpenShift extension is used which you can install via command line or from the web editor.

![image](/assets/img/2020/05/crw-q-os-05.png)

![image](/assets/img/2020/05/crw-q-os-06.png)

With the OpenShift extension all yaml files are generated automatically. The command ‘/mvnw clean package -Dquarkus.kubernetes.deploy=true’ triggers a container image build and will apply the generated OpenShift resources, right after. The generated resources are using OpenShift’s DeploymentConfig that is configured to automatically trigger a redeployment when a change in the ImageStream is noticed. In other words, any container image build after the initial deployment will automatically trigger redeployment, without the need to delete, update or re-apply the generated resources.

![image](/assets/img/2020/05/crw-q-os-07.png)

You can check in the user interface for the build status.

![image](/assets/img/2020/05/crw-q-os-08.png)

As result your image stream shows up in addition to the s2i-java image stream which is used to build your image.

![image](/assets/img/2020/05/crw-q-os-09.png)

The pod with your container will be started automatically. The second pod in the screenshot is the pod with the web IDE which consists of five containers.

![image](/assets/img/2020/05/crw-q-os-10.png)

To access the application you can create a route via the Maven command above, you can define it the application properties file in Quarkus or do it in the OpenShift web console.

![image](/assets/img/2020/05/crw-q-os-11.png)

To find out more about Quarkus, OpenShift and reactive programming, check out the open source project [Cloud Native Starter](https://github.com/IBM/cloud-native-starter/tree/master/reactive).