---
id: 3257
title: 'Blue Cloud Mirror Architecture Diagrams'
date: '2019-01-30T07:22:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3257'
permalink: /article/blue-cloud-mirror-architecture-diagrams/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/blue-cloud-mirror-architecture-diagrams/
dsq_thread_id:
    - '7198128797'
categories:
    - Articles
---

[Blue Cloud Mirror](https://github.com/IBM/blue-cloud-mirror) is a game where players need to show specific emotions and do specific poses. In this article I describe briefly the used technologies.

You can play the game [online](https://blue-cloud-mirror.mybluemix.net/emotions). All you need is a webcam and a Chrome browser.

The game uses key technologies of the [IBM Cloud](https://cloud.ibm.com/) and has three main parts:

- Core game: Implemented as serverless web application since it is primarily used during conferences only
- Users service: Implemented via IBM Cloud Private to avoid storing the personal data in a public cloud
- Scores service: Implemented via Cloud Foundry Enterprise Edition to highlight easy changes via the ‘cf push experience’ (for example theme adoptions for different conferences)

Thomas, Harald and I have planned to write more articles about the different part of the application. This articles gives a high level overview.

The first diagram gives an overview of the key components.

![image](/assets/img/2019/01/diagram-overview1.png)

Note that there are two [different versions](https://github.com/IBM/blue-cloud-mirror/tree/master/images) per diagram. One version describes what we use in the GitHub project. That version uses Minikube for the users service and Cloud Foundry Public Applications for the scores service so that even IBM Cloud users with a free Lite account can run it. The other version uses the enterprise technologies IBM Cloud Private and Cloud Foundry Enterprise Environment.

The next diagrams add more details about the three main parts.

The **core game** is a serverless application hosted on the IBM Cloud via Cloud Object Storage and IBM Cloud Functions. The users, scores and Twitter APIs are invoked via Lite API Management. With Lite API Management and App ID [user authentication and authorization](https://github.com/nheidloff/serverless-web-application-ibm-cloud) can be implemented.

![image](/assets/img/2019/01/diagram-serverless.png)

The **scores service** has been implemented via the Cloud Foundry Node.js buildpack. A second buildpack is used to host the web resources of the web application which displays the highscore list.

![image](/assets/img/2019/01/diagram-scores.png)

The **users service** has been implemented via Node.js running in Kubernetes. The data is stored in Apache CouchDB. Via Secure Gateway the service can be invoked from the public cloud.

![image](/assets/img/2019/01/diagram-users.png)

To find out more about the different services and offerings, follow these links:

- [IBM Cloud](https://cloud.ibm.com/)
- [IBM Cloud Private](https://www.ibm.com/cloud/private)
- [IBM Cloud Functions](https://cloud.ibm.com/openwhisk)
- [IBM Cloud Foundry Enterprise Edition](https://cloud.ibm.com/cfadmin/create)
- [IBM Cloud Foundry Public Applications](https://cloud.ibm.com/catalog?search=runtime)
- [IBM Cloud Object Storage](https://cloud.ibm.com/catalog/services/cloud-object-storage)
- [IBM API Connect](https://cloud.ibm.com/catalog/services/api-connect)
- [IBM Secure Gateway](https://cloud.ibm.com/catalog/services/secure-gateway)
- [IBM Watson Studio](https://dataplatform.cloud.ibm.com/)
- [IBM App ID](https://cloud.ibm.com/catalog/services/app-id)
- [IBM Cloudant](https://cloud.ibm.com/catalog/services/cloudant)
- [Apache CouchDB](https://couchdb.apache.org/)
- [TensorFlow.js](https://js.tensorflow.org)
- [Vue.js](https://vuejs.org/)
- [Minikube](https://github.com/kubernetes/minikube)