---
id: 2539
title: 'Deploying MicroProfile based Apps to IBM Cloud private'
date: '2017-09-21T14:30:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2539'
permalink: /article/microprofile-ibm-cloud-private-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6160038889'
custom_permalink:
    - article/microprofile-ibm-cloud-private-kubernetes/
categories:
    - Articles
---

Eclipse [MicroProfile](http://microprofile.io/) is an open source project to optimize Enterprise Java for microservices architectures. MicroProfile based applications can be deployed to Kubernetes. This article describes how to deploy a sample application to [IBM Cloud private](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/W1559b1be149d_43b0_881e_9783f38faaff).

IBM Cloud private is a [Kubernetes based platform]({{ "/article/cloud-native-on-premises-ibm" | relative_url }}) to run cloud-native applications on-premises. It also comes with a Docker image registry. For developers there is a [community edition](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/install_containers_CE.html) available to run everything in one virtual machine.

The example I’m using is a simple conference application originally provided by the [MicroProfile developers](https://github.com/eclipse/microprofile-conference) and slightly changed by the [IBM team](https://github.com/WASdev/sample.microservicebuilder.docs) to showcase IBM technologies like WebSphere Liberty which has been [open sourced](http://www.openliberty.io/) this week. My colleagues Animesh Singh and Ishan Gulhane have [documented](https://github.com/IBM/Java-MicroProfile-on-Kubernetes) how to deploy this sample to Kubernetes on Bluemix public.

There are different approaches to deploy applications to IBM Cloud private. I’d like to blog later about the approach to use delivery pipelines. Below I describe how to deploy from a development machine via command line.

Most of the steps to deploy the sample to Bluemix public or IBM Cloud private are identical. So I only document the differences below.

The Microservice Builder Fabric can be installed via helm commands as documented or from the IBM Cloud private admin interface.

![image](/assets/img/2017/09/cloud-private-sample1.png)

Before building the images some [configuration](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/manage_images/using_docker_cli.html) needs to be done. The hosts file of the development machine needs to be changed to define the IP of the cluster. Additionally Docker needs to be configured to be able to access the Docker host on the virtual machine. This process is a little tricky, especially on Mac. In one terminal invoke these commands:

```
ssh cluster@192.168.178.36
cd /etc/docker/certs.d/mycluster\:8500/
cp ca.crt /tmp/
```

In a second terminal run these commands:

```
sudo screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
mkdir /etc/docker/certs.d/
mkdir /etc/docker/certs.d/mycluster:8500/
cd /etc/docker/certs.d/mycluster:8500/
scp cluster@192.168.178.36:/tmp/ca.crt .
```

After this you should be able to access the Docker registry on IBM Cloud private (user: admin, pw: admin):

```
docker login mycluster:8500
docker build -t mycluster:8500/admin/microservice-vote-cloudant sample.microservicebuilder.vote
docker push mycluster:8500/admin/microservice-vote-cloudant
```

There is also a script to build and push all six images. If you want to use it run “./scripts/build\_and\_push\_docker\_images.sh mycluster:8500/admin”.

After the images have been pushed you can see them also in the IBM Cloud private admin interface.

![image](/assets/img/2017/09/cloud-private-sample2.png)

Before the sample can be deployed, Kubernetes needs to be configured. Open the admin interface (e.g. https://192.168.178.36:8443) and choose ‘Configure Client’. Copy and paste these commands in your terminal. For example:

```
kubectl config set-cluster mycluster --server=https://192.168.178.36:8001 --insecure-skip-tls-verify=true
kubectl config set-context mycluster-context --cluster=mycluster
kubectl config set-credentials mycluster-user --token=eyJhbG......q_ATOQe-J2A
kubectl config set-context mycluster-context --user=mycluster-user --namespace=default
kubectl config use-context mycluster-context
```

![image](/assets/img/2017/09/cloud-private-sample3-300x278.png)

‘kubectl create -f manifests’ starts the deployment which takes a couple of minutes. After this the sample application can be accessed, e.g. via http://192.168.178.36:30056/#/speakers.

Thanks a lot, again, to Ansgar Schmidt for helping me with the setup.