---
id: 1365
title: 'Cheatsheet for Docker and IBM Bluemix Containers Beginners'
date: '2015-08-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/cheatsheet-for-docker-and-ibm-bluemix-containers-beginners/'
permalink: /article/17.08.2015084655NHE9YE.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/9.html'
custom_permalink:
    - article/17.08.2015084655NHE9YE.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4322995754'
categories:
    - Articles
---

 As a developer I prefer graphical tools since I often cannot remember all the different commands for various CLIs (command line interfaces). In cases where I have to use CLIs I write down my own little cheatsheets with the commands I use most often. Below is a minimal set of commands to create Docker images and containers running a Java Liberty application and deploy them to [IBM Bluemix](https://bluemix.net/).

 For more information check out the official [Docker CLI documentation](https://docs.docker.com/reference/commandline/cli/) and the [IBM Containers CLI documentation](https://www.ng.bluemix.net/docs/containers/container_cli_reference_cfic.html). To interact with Bluemix I use below the IBM Container plugin for Cloud Foundry which you need to [install](https://www.ng.bluemix.net/docs/containers/container_cli_cfic.html) in addition to Docker and the [Cloud Foundry CLI](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).

 **Docker**

 List all images:   
 docker images

 Remove image:   
 docker rmi \_image\_tag\_

 List all containers:   
 docker ps -a

 Remove container:   
 docker stop \_container\_name\_   
 docker rm \_container\_name\_

 Build image:   
 docker build -t \_image\_tag\_ .

 Run container:   
 docker run –name \_container\_name\_ -p 80:80 -p 443:443 -d -t \_image\_tag\_

 Launch application:   
 boot2docker ip   
 browser: http:// \_your\_ip\_

 **IBM Containers**

 Login:   
 cf login   
 cf ic login

 List all images:   
 cf ic images

 Remove image:   
 cf ic rmi registry.ng.bluemix.net/\_your\_namespace\_/\_image\_tag\_

 List all containers:   
 cf ic ps -a

 Remove container:   
 cf ic stop \_container\_name\_   
 cf ic rm \_container\_name\_

 Push image:   
 docker tag \_image\_tag\_ registry.ng.bluemix.net/\_your\_namespace\_/\_image\_tag\_   
 docker push registry.ng.bluemix.net/\_your\_namespace\_/\_image\_tag\_

 Run container:   
 cf ic run –name container\_name -p 80:80 -p 443:443 -d -t registry.ng.bluemix.net/\_your\_namespace\_/\_image\_tag\_

 Manage IP addresses:   
 cf ic ip request   
 cf ic ip list -a   
 cf ic ip bind \_your\_ip\_ \_container\_name\_

 Launch application:   
 browser: http:// \_your\_ip\_

 **Sample Liberty Application**

 I’ve implemented a simple [hello world Liberty application](http://heidloff.net/nh/home.nsf/article.xsp?id=07222015115210AMNHEDL7.htm). In order to deploy it to Bluemix you can use the commands above. Here is the Dockerfile which copies the server configuration and the web application.

![image](/assets/img/2015/08/Cheatsheet2.png)

 I’ve configured Liberty to use the ports 80 and 443, but you can also leave the defaults and change the port mappings in the commands above.

![image](/assets/img/2015/08/Cheatsheet1.png)

![image](/assets/img/2015/08/dockercheatsheet.png)