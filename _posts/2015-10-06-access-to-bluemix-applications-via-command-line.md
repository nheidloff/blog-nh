---
id: 1467
title: 'Access to Bluemix Applications via Command Line'
date: '2015-10-06T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/access-to-bluemix-applications-via-command-line/'
permalink: /article/06.10.2015100836NHEBKF.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
custom_permalink:
    - article/06.10.2015100836NHEBKF.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323549531'
categories:
    - Articles
---

 During the development and testing of applications it’s sometimes necessary to get access to the hosts of the running applications via command line, for example if you want to check or set certain environment variables, log files, etc. Dependent on whether you run applications as [Cloud Foundry](https://www.cloudfoundry.org/) applications or [Docker](https://www.docker.com/) containers [IBM Bluemix](https://bluemix.net/) provides different mechanisms to do this.

 Docker

 For Docker you can SSH into containers. Read the [documentation](https://www.ng.bluemix.net/docs/containers/container_optional.html#container_cli_login_ssh) for details. Essentially you need an SSH key pair and you need to add the public key to the container. This can either be done when building the images via Dockerfile or you can use the Bluemix user interface to do this for single instance containers.

![image](/assets/img/2015/10/commandline4.png)

 After this you can use SSH with your private key by invoking a command like …   
 ssh -i /Users/nheidloff/.ssh/cloud.key root@134.168.15.124

![image](/assets/img/2015/10/commandline5.png)

 Cloud Foundry

 For Cloud Foundry based applications you need to enable the debugging features. Read the [blog](https://developer.ibm.com/bluemix/2015/10/05/advanced-debugging-node-apps-bluemix/) from my colleague Sai Vennam for details. The feature is rather hidden in the web user interface. You need to set an environment variable either via the cf (Cloud Foundry) command line interface or via the user interface.

 BLUEMIX\_APP\_MGMT\_ENABLE   
 devconsole+shell+inspector+trace+proxy+hc

![image](/assets/img/2015/10/commandline1.png)

 After this you can open the management console by appending “/bluemix-debug/manage” to the URL of your app.

![image](/assets/img/2015/10/commandline2.png)

 From the management console you can open shells and restart applications.

![image](/assets/img/2015/10/commandline3.png)