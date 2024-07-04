---
id: 1517
title: 'Configuration of the ibmliberty Image on Bluemix to display Logs'
date: '2015-11-12T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/configuration-of-the-ibmliberty-image-on-bluemix-to-display-logs/'
permalink: /article/12.11.2015094734NHECBS.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323051749'
custom_permalink:
    - article/12.11.2015094734NHECBS.htm/
categories:
    - Articles
---

 [IBM Bluemix](https://bluemix.net/) provides a set of Docker images in the catalog to help developers to get started. Below is a short description how to configure the [ibmliberty](https://www.ng.bluemix.net/docs/images/docker_image_ibmliberty/ibmliberty_starter.html) image to see the logs in the Bluemix dashboards and the CLIs.

The ibmliberty image is an extension of the [websphere-liberty](https://hub.docker.com/_/websphere-liberty/) image on DockerHub. The ibmliberty image adds an SSH server to support remote access and it enforces compliance with the [IBM Vulnerability Advisor](https://developer.ibm.com/bluemix/2015/07/02/vulnerability-advisor/). In contrast to the base image Liberty is run via [supervisor](http://supervisord.org/).

As a result of this the logs from Liberty don’t show up by default (at this time) but only the logs of the supervisor. To fix this you can simply set an environment variable to point to additional log files. Read the [documentation](https://www.ng.bluemix.net/docs/containers/container_ml_ov.html#container_ml_logs_add) for details.

Via CLI:

cf ic run –env LOG\_LOCATIONS=/opt/ibm/wlp/usr/servers/defaultServer/logs/messages.log –name ads-liberty -P registry.ng.bluemix.net/ibmliberty

Via UI:

![image](/assets/img/2015/11/DockerLibertyLogs2.png)

After this the logs of my Java code …

![image](/assets/img/2015/11/DockerLibertyLogs1.png)

… show up in the dashboard:

![image](/assets/img/2015/11/DockerLibertyLogs3.png)

As I’ve been told another solution is to create a new Dockerfile to update the supervisord configuration to [redirect](http://veithen.github.io/2015/01/08/supervisord-redirecting-stdout.html) logs but I haven’t it yet.