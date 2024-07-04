---
id: 3327
title: 'Debugging Microservices running in Kubernetes'
date: '2019-03-05T19:15:04+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3327'
permalink: /article/debugging-microservices-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/debugging-microservices-kubernetes/
dsq_thread_id:
    - '7273756950'
categories:
    - Articles
---

In order to learn more about microservices, container orchestration and service meshes, I’ve set up a [local development environment]({{ "/article/setup-local-development-kubernetes-istio" | relative_url }}) with Minikube, Istio and tools like Kiali and created a [sample application](https://github.com/nheidloff/cloud-native-starter). In this article I describe how to debug these services locally.

Microservices can be developed in various languages and with multiple frameworks. For the different implementation types there are specialized and established IDEs (integrated development environments) and tools to debug the single services.

The new challenge when debugging cloud-native applications is that applications often have many microservices and there is a lot of communication between them. Testing and debugging only separate services is not sufficient.

**Requirements**

Here is a list of my debugging requirements. In the optimal case I’d like to …

- Run and debug my code in my favorite IDE locally (rather than using a slow remote debugger)
- Run the single service as part of the overall application, for example invoke it from another service (rather than via unit tests and mock objects only)
- Run the code in the same container locally as in production (rather than installing application servers locally)
- Do changes in the code locally and test them immediately (rather than restarting containers)

**Telepresence**

There are several different ways to debug microservices. One great solution is to use [Telepresence](https://www.telepresence.io/), which is an open source tool for the “FAST, LOCAL DEVELOPMENT FOR KUBERNETES AND OPENSHIFT MICROSERVICES”.

Here is an example. I’m using a [simple application](https://github.com/nheidloff/cloud-native-starter) which has two microservices so far. The BFF (backend for frontend) ‘web-api’ microservice invokes another ‘articles’ microservice. I want to debug the ‘articles’ service locally and let the ‘web-api’ service invoke it which runs in a Kubernetes cluster.

I’ve implemented these services with JavaEE, OpenJ9, [Open Liberty](https://openliberty.io/) and MicroProfile within Eclipse. There is a lot of documentation available how to debug Open Liberty in Eclipse via the [Open Liberty Tools](https://github.com/OpenLiberty/open-liberty-tools). You can import the ‘articles’ service as existing Maven project. In order to run the service in the local Open Liberty server, you need to check ‘Dynamic Web Module’ in the ‘Project Facets’ settings. After this, you can start the local Open Liberty server.

In order to run the ‘articles’ service on Kubernetes, I’ve written a simple [script](https://github.com/nheidloff/cloud-native-starter/blob/master/scripts/deploy-articles-java-jee.sh) to deploy it. Here is the [yaml](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/deployment/kubernetes.yaml) file:

```
kind: Service
apiVersion: v1
metadata:
  name: articles
  labels:
    app: articles
spec:
  selector:
    app: articles
  ports:
    - port: 9080
      name: http
  type: NodePort
---

kind: Deployment
apiVersion: apps/v1beta1
metadata:
  name: articles
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: articles
        version: v1
    spec:
      containers:
      - name: articles
        image: articles:1
        ports:
        - containerPort: 9080
```

Now to the exciting part. Telepresence allows you to swap a pod running in Kubernetes with a service running locally. All requests to the pod in Kubernetes are redirected to the local URL and port.

After you have installed [Telepresense](https://www.telepresence.io/reference/install), the following command can be run:

```
telepresence --method inject-tcp --swap-deployment articles --expose 9080:9080
```

![image](/assets/img/2019/03/debugging-istio-1.png)

Once the Kubernetes remote port 9080 has been mapped to the local port 9080, the locally running service can be invoked from the ‘web-api’ service running in Kubernetes. The best part is you can also use the Eclipse debugger as if everything would run locally.

![image](/assets/img/2019/03/debugging-istio-4.png)

**Calling from local Services to Kubernetes**

With this easy setup services in Kubernetes can invoke local services. Unfortunately the other direction doesn’t work. For example a locally running service ‘web-api’ can not invoke the Kubernetes service ‘articles’ via ‘http://articles:9080’.

Fortunately Telepresense comes with a [mechanism](https://www.telepresence.io/tutorials/java) to support this as well. Essentially you can run your code in a local Docker container and debug it with a remote debugger. Telepresense can replace the Kubernetes pod with a two-way proxy that handles the traffic to your local Docker container. There is even support for ‘hot code replace’ (see documentation).

I haven’t tried the two-way communication yet, but the functionality sounds very promising and would fulfill the requirements above!

If you want to give it a try, use the [sample application](https://github.com/nheidloff/cloud-native-starter), set up a [local development environment]({{ "/article/setup-local-development-kubernetes-istio" | relative_url }}) and follow the instructions above.