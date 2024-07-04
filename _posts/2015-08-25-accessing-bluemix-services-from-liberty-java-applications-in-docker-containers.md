---
id: 1415
title: 'Accessing Bluemix Services from Liberty Java Applications in Docker Containers'
date: '2015-08-25T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/accessing-bluemix-services-from-liberty-java-applications-in-docker-containers/'
permalink: /article/25.08.2015094424NHEB4C.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/4.html'
custom_permalink:
    - article/25.08.2015094424NHEB4C.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323180381'
categories:
    - Articles
---

 [IBM Bluemix](https://bluemix.net/) allows developers to host their [Docker](https://www.docker.com/) images and to run their Docker containers in the cloud. In addition to hosting Docker in the cloud, Bluemix also provides more than 100 services that developers can use to build applications. There are database services, cognitive services, analytical services, Internet of Things services, services to build mobile backends and more.

 Typically when adding these services to applications, the services are provisioned for developers and credentials are created. With these credentials the REST APIs of the services can be invoked and developers can log onto the dashboards of the services. The credentials and additional configuration of the services is put in an environment variable [VCAP\_SERVICES](https://www.ng.bluemix.net/docs/services/rules/index-gentopic2.html) in JSON format. Applications can access this information at runtime. For example Java applications can use System.getenv and JSON libraries like [org.apache.wink.json4j](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/DatabaseUtilities.java#L67).

 For [Cloud Foundry](https://www.cloudfoundry.org/) based applications services can easily be added via the Bluemix user experience or command line tools. At this point you cannot bind services directly to Docker based applications. Instead you need a Cloud Foundry [bridge app](https://www.ng.bluemix.net/docs/containers/container_binding_ov.html). After this you can use the same code to access services in both Docker and Cloud Foundry applications running on Bluemix.

 As a developer I prefer to develop code in local IDEs and test and debug it there. Here is what I typically do to access Bluemix services from local applications without having to write additional code. The sample below is an extension to the [simple Liberty application](http://heidloff.net/nh/home.nsf/article.xsp?id=20.08.2015070835NHE82W.htm).

 With Liberty you can use a [server.env](http://www-01.ibm.com/support/docview.wss?uid=swg21596484) file to define environment variables. In this file there is one entry VCAP\_SERVICES with the value that you can copy from the Bluemix user experience. In order to remove white space you can use different online [tools](http://jsonviewer.stack.hu/).

![image](/assets/img/2015/08/dockerlocal2.png)

 The file can be used by the Liberty server running in Eclipse and also by the Liberty server in the local container. Since this file is only needed when running locally a second image is created which extends the one that you can host on Bluemix. The second image simply extends the core image with Liberty and the web application and adds the environment variable to it.

![image](/assets/img/2015/08/dockerlocal1.png)

 In order to create the images and run the container locally you need to invoke these commands.   
 root directory: mvn package   
 directory ‘target’: docker build -t simple-liberty-image .   
 directory ‘dockerlocal’: docker build -t simple-liberty-image-local .   
 any directory: docker run –name simple-liberty-container-local -p 80:80 -p 443:443 -d -t simple-liberty-image-local

 Alternatively as my colleague Richard Osowski pointed out you can run something similar to this:   
 export VCAP\_SERVICES=’ (copy &amp; paste VCAP values here) ‘ note the single quotes as vcap has double quotes   
 docker run –env VCAP\_SERVICES=”${VCAP\_SERVICES}” ….

 Richard also explained in a [blog](https://developer.ibm.com/bluemix/2015/07/06/simplifying-distributed-docker-applications/) how to update a server.xml file with values from the VCAP\_SERVICES variable before the Liberty server is started.