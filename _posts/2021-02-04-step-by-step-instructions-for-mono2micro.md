---
id: 4396
title: 'Step-by-Step Instructions for Mono2Micro'
date: '2021-02-04T08:54:39+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4396'
permalink: /article/step-by-step-instructions-mono2micro/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/step-by-step-instructions-mono2micro/
categories:
    - Articles
---

In my previous article [Strangler Pattern Example]({{ "/article/strangler-pattern-example/" | relative_url }}) I explained why it might make sense to modernize monoliths and start using microservices. In my sample application breaking down the monolith in separate microservices adds value, since the different services can be scaled separately.

The key question is how to break down the monolith in microservices! You don’t want to create [distributed monoliths]({{ "/article/do-not-build-distributed-monoliths/" | relative_url }}).

**Mono2Micro**

IBM provides a tool ‘[Mono2Micro](http://ibm.biz/Mono2Micro)‘ which helps to define microservices candidates.

> IBM Mono2Micro \[…\] uses the power of AI to refactor Java monoliths into microservices. The added power of machine learning and AI makes the refactoring process a semi-automated one, so that you don’t have to rewrite your entire application code in order to create a microservice architecture.

Here is the diagram from the documentation that describes the flow:

![image](/assets/img/2021/02/Mono2Micro-architecture.png)  
**Step-by-Step Instructions**

To be honest, the first time I saw the diagram I felt overwhelmed. I think the best way to describe Mono2Micro is via a simple sample.

First get the code of my [sample application](https://github.com/nheidloff/application-modernization-javaee-quarkus).

```
$ git clone https://github.com/nheidloff/application-modernization-javaee-quarkus.git && cd application-modernization-javaee-quarkus
$ ROOT_FOLDER=$(pwd)
```

Download [Mono2Micro](http://ibm.biz/Mono2Micro). Put three files in ${ROOT\_FOLDER}/mono2micro/tool. Extract the two zip files.

Next the application source code is modified to contain debug information when which classes and methods are invoked.

```
$ docker run --rm -it -v ${ROOT_FOLDER}/:/var/application ibmcom/mono2micro-bluejay /var/application/monolith-open-liberty
$ cp ${ROOT_FOLDER}/monolith-open-liberty-klu/refTable.json ${ROOT_FOLDER}/mono2micro/output/tables
$ cp ${ROOT_FOLDER}/monolith-open-liberty-klu/symTable.json ${ROOT_FOLDER}/mono2micro/output/tables
```

After this you need to launch your application with the modified source code.

```
$ sh ${ROOT_FOLDER}/scripts-docker/build-and-run-monolith-db2.sh
$ sh ${ROOT_FOLDER}/scripts-docker/build-and-run-splitted-frontend-open-klu.sh
```

Open the application in a [browser](http://localhost/CustomerOrderServicesWeb).

In the next step you need to record how users typically interact with the application. Each of these flows is a ‘use case’. Here are the commands to record typical uses case of the sample e-commerce application.

```
$ cd ${ROOT_FOLDER}/mono2micro/tool/Mono2Micro-Monolith-DataCollector/Flicker
$ java -cp commons-net-3.6.jar:json-simple-1.1.jar:. Flicker -no_ntp -a context.json
Enter to start recording current context (type "Exit" to quit).
show-shop
Enter STOP to terminate the recording of the current context.
STOP

Enter to start recording current context (type "Exit" to quit).
change-category
Enter STOP to terminate the recording of the current context.
STOP

Enter to start recording current context (type "Exit" to quit).
add-to-cart
Enter STOP to terminate the recording of the current context.
STOP

Enter to start recording current context (type "Exit" to quit).
show-order
Enter STOP to terminate the recording of the current context.
STOP

Enter to start recording current context (type "Exit" to quit).
show-account
Enter STOP to terminate the recording of the current context.
STOP

Enter to start recording current context (type "Exit" to quit).
exit
```

After this the results are collected and Mono2Micro is used to generate suggestions how to split monoliths.

```
$ cp ${ROOT_FOLDER}/mono2micro/tool/Mono2Micro-Monolith-DataCollector/Flicker/context.json ${ROOT_FOLDER}/mono2micro/output/contexts
$ docker cp storefront-backend-open:/logs/messages.log .
$ cp messages.log ${ROOT_FOLDER}/mono2micro/output/logs
$ docker run --rm -it -v ${ROOT_FOLDER}/mono2micro/output:/var/application ibmcom/mono2micro-aipl
$ docker run -d -p 3000:3000 ibmcom/mono2micro-ui
```

Open the [Mono2Micro web application](http://localhost:3000) and add final\_graph.json (${ROOT\_FOLDER}/mono2micro/output/mono2micro-output/oriole/final\_graph.json) to display the suggestions.

**Results**

Mono2Micro suggests to move the catalog functionality into a separate service. This makes a lot of sense since this functionality can be scaled separately now. Users are browsing the catalog more often than actually buying items.

![image](/assets/img/2021/02/mono2mircro-3-partitions-1.png)  
The purple rectangle is essentially the catalog service (except of the missing Category class).

The green classes make up the remaining monolith (except of Address).

The red classes need to be assigned to either the catalog service of the remaining monolith dependent of class dependencies. Most of them are exceptions which weren’t covered in the use cases.

**Literature**

There are several publications to learn more about Mono2Micro.

- [Simple lab](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/m2m/)
- [Transform monolithic Java applications into microservices with the power of AI](http://ibm.biz/Sample-JEE-Refactoring-with-Mono2Micro)
- [IBM Mono2Micro: AI Driven Application Refactoring. NueriIPS Expo Talk Panel](https://slideslive.com/38942305/ai4code-at-ibm-and-red-hat)
- [Mono2Micro: An AI-based Toolchain for Evolving Monolithic Enterprise Applications to a Microservice Architecture](https://dl.acm.org/doi/abs/10.1145/3368089.3417933)
- [Evaluation of the Mono2Micro Microservice Extraction Tool](https://pheedloop.com/casconevoke2020/site/sessions/?id=SxHnqs)
- [How IBM Research is Differentiating the Company’s Hybrid Cloud Platform with AI](https://www.ibm.com/blogs/research/2020/10/hybrid-cloud-for-ai)
- [Understand the advantages of using IBM Mono2Micro to automate application refactoring](http://www.ibm.biz/Refactor-with-Mono2Micro)
- [IBM Research uses AI to automate Mono2Micro application refactoring](https://www.ibm.com/blogs/research/2020/07/ai-mono2micro-application-refactoring)
- [Automate application refactoring using AI. IBM Developer Works](http://ibm.biz/Mono2Micro-Enhanced-Beta)
- [Introducing IBM Mono2Micro](https://www.ibm.com/cloud/blog/announcements/ibm-mono2micro)

**What’s next?**

In a future article I’ll explain how to interact between the strangled catalog service and the remaining monolith.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).