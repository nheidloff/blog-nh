---
id: 1516
title: 'Deployments of Hybrid Applications as Docker Containers with IBM UrbanCode on Bluemix'
date: '2015-11-11T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/deployments-of-hybrid-applications-as-docker-containers-with-ibm-urbancode-on-bluemix/'
permalink: /article/11.11.2015100203NHECLU.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/11.11.2015100203NHECLU.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323087512'
categories:
    - Articles
---

 [IBM Bluemix](https://bluemix.net/) provides built in [DevOps](https://hub.jazz.net/docs) services to manage source code and to build, test and deploy applications to Bluemix. This works well for many scenarios, esp. when deploying single applications to Bluemix via delivery pipelines. For more complex scenarios IBM provides the [Continuous Delivery](https://developer.ibm.com/urbancode/products/solutions-continuous-delivery/) toolset [UrbanCode](https://developer.ibm.com/urbancode/) to deploy hybrid applications to the cloud and on-premises and to deploy composite applications with multiple components or microservices.

In this blog entry I focus on how to deploy hybrid applications as [Docker](https://www.docker.com/open-source) containers to Bluemix and an on-premises. My colleagues Sanjay Nayak, Noel Richard Nihill and Mike S. Samano have written an excellent article “Deploy Docker containers in hybrid clouds that use IBM UrbanCode” ([part 1](http://www.ibm.com/developerworks/library/d-deploy-docker-containers-hybrid-clouds-ibm-urbancode-1-trs-bluemix/index.html), [part 2](http://www.ibm.com/developerworks/library/d-deploy-docker-containers-hybrid-clouds-ibm-urbancode-2-trs-bluemix/index.html)) where they explain how to deploy a sample store application. The store application uses one container on Bluemix which connects via the [Secure Gateway](https://www.ng.bluemix.net/docs/#services/SecureGateway/index.html#gettingstartedsecuregateway) to three containers running in a Docker Swarm cluster on premises. Rather than repeating the article here, I focus below on, as I think, the most interesting part which is how to link between the different containers and services.

On the on-premises Swarm cluster three containers are run. A container running a Java application (hosting REST APIs) accesses the two database containers DB2 and MySQL. To define multi-container Docker applications typically [Docker Compose](https://docs.docker.com/compose/) is used and the sample store application comes with a [docker-compose.yml](https://hub.jazz.net/project/snayak/ucd-dtr/overview#https://hub.jazz.net/git/snayak%252Fucd-dtr/contents/master/store/docker-compose.yml) file. With UrbanCode you can essentially use the same information in the configuration of the containers to expose it as environment variables at runtime. The following screenshot shows the configuration of the container with the Java application.

![image](/assets/img/2015/11/urbancode1.png)

In order to deploy containers to Bluemix you need to define configuration data like the Bluemix user name, organization, password, etc.

![image](/assets/img/2015/11/urbancode3.png)

Rather than defining this data in multiple component definitions, they are defined once globally.

![image](/assets/img/2015/11/urbancode4.png)

In the configuration of the container which is deployed to Bluemix the name of the [Cloud Foundry bridge application](https://www.ng.bluemix.net/docs/containers/container_binding_ov.html) is defined so that the container can access the credentials of the secure gateway service via the environment variable VCAP\_SERVICES.

![image](/assets/img/2015/11/urbancode2.png)

To find out more about UrbanCode check out the [Developer Center](https://developer.ibm.com/urbancode/) and watch the videos [UrbanCode Deploy and Docker Containers Connect the Dots](https://www.youtube.com/watch?t=13&v=E4WyLn7TPbA), [Hybrid Deployment of Docker Containers using IBM UrbanCode Deploy](https://www.youtube.com/watch?v=HVJiR_MS1G4) and [IBM UrbanCode Deploy with IBM Bluemix](https://www.youtube.com/watch?v=2Hk2oALmIZg).