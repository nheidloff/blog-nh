---
id: 1630
title: 'Deploying APIs built via Node.js to IBM Bluemix'
date: '2015-11-24T16:47:51+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1630'
permalink: /article/deploying-apis-built-via-nodejs-to-ibm-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4347318143'
custom_permalink:
    - article/deploying-apis-built-via-nodejs-to-ibm-bluemix/
categories:
    - Articles
---

In my previous article I described how to use [Swagger to document APIs in Node.js applications]({{ "/article/usage-of-swagger-in-nodejs-applications-to-document-apis" | relative_url }}) via a simple hello world sample. Below I demonstrate how to deploy the same sample to [Bluemix](https://bluemix.net) via [Docker](https://www.docker.com/) and how to use the [API Management](https://www.ng.bluemix.net/docs/services/APIManagement/index.html) service to enforce client ids and secrets when invoking the APIs so that API owners can monitor the usage of their APIs.

**Deploying Node.js Applications to IBM Bluemix as Docker Containers**

First you need to add a Dockerfile to your project’s root directory. The [documentation](https://www.ng.bluemix.net/docs/images/docker_image_ibmnode/ibmnode_starter.html) describes how to do this. Since I don’t need SSH I use a simpler Dockerfile.

```
FROM registry.ng.bluemix.net/ibmnode:latest
COPY . /node
WORKDIR /node
RUN npm install
EXPOSE 9080
CMD ["node", "/node/app.js"]
```

Since the [IBM Containers](https://www.ng.bluemix.net/docs/containers/container_index.html) (Docker hosted on Bluemix) only support specific ports I use the port 9080 instead of 10010 as in the original sample. I also had to change the port in app.js and swagger.yaml. In order to run the application locally you need to invoke the following URLs.

<http://127.0.0.1:9080/hello?name=Niklas>  
<http://127.0.0.1:9080/swagger>

To build the Docker image and to run it locally invoke the following commands from the root directory.

```
docker build -t node-swagger-hello-world .
docker run --name node-swagger-hello-world -p 80:9080 -d -t node-swagger-hello-world
```

After this you can run the sample in our local Docker environment.

<http://dockerhost/hello?name=Niklas>  
<http://dockerhost/swagger>

In order to push the image to Bluemix invoke the following commands.

```
cf login
cf ic login
docker tag node-swagger-hello-world registry.ng.bluemix.net/nheidloff/node-swagger-hello-world
docker push registry.ng.bluemix.net/nheidloff/node-swagger-hello-world
```

To run the sample on Bluemix create a Docker container group.

![image](/assets/img/2015/11/swaggerdockernode.png)

After this you can run your REST API on Bluemix.

<http://node-swagger-docker-hello-world.mybluemix.net/swagger>  
<http://node-swagger-docker-hello-world.mybluemix.net/hello?name=Niklas>

**Usage of the API Management Service**

With the [API Management](https://www.ng.bluemix.net/docs/services/APIManagement/index.html) service in Bluemix you can manage and monitor your APIs. In the next part I describe how to enforce a client id and secret when invoking the API so that you can track which applications called which APIs. The API definition can be imported via pointing to the Swagger 2.0 definition above and additional settings can be configured in the dashboard of the API Management service.

![image](/assets/img/2015/11/swaggerdockernodeapi.png)

In order to invoke APIs applications developers need to register applications.

![image](/assets/img/2015/11/swaggerdockernodeapp.png)

Applications can subscribe to plans with the APIs they are interested in and test the APIs directly from the developer portals by providing the client ids and secrets.

![image](/assets/img/2015/11/swaggerdockernodeportal.png)