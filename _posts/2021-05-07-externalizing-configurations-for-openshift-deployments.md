---
id: 4552
title: 'Externalizing Configurations for OpenShift Deployments'
date: '2021-05-07T08:30:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4552'
permalink: /article/externalizing-configurations-for-openshift-deployments/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/externalizing-configurations-for-openshift-deployments/
categories:
    - Articles
---

When deploying cloud native applications to different Kubernetes environments it’s important to externalize the configuration from the source code. This article lists some techniques and patterns how to do this.

**The Twelve-Factor App**

The [twelve-factor app](https://12factor.net/) is a methodology for building software-as-a-service apps. One of the 12 factors is [configuration](https://12factor.net/config):

- An app’s config is everything that is likely to vary between deploys (staging, production, developer environments, etc).
- Apps sometimes store config as constants in the code. This is a violation of twelve-factor, which requires strict separation of config from code. Config varies substantially across deploys, code does not.
- A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.

**Overview of Options**

For my sample [e-commerce application](https://github.com/IBM/application-modernization-javaee-quarkus) I need to be able to deploy the application to different environments: Kubernetes, OpenShift and Docker Desktop.

In order to achieve this, all configurations should be done outside of the source code:

- Credentials to services, for example passwords and certificates for databases
- Links between microservices and web applications
- Links to image registries and support for variable namespaces

There are multiple ways to externalize configurations:

- Environment variables
- Config maps and secrets
- Property files
- Templates

**Environment Variables**

A good and easy option is to use environment variables. This mechanism works for applications running in Kubernetes and even when running only on Docker Desktop. Additionally the same mechanism works for different programming languages and frameworks.

For web applications this option only works indirectly. Since the environment variables only exist server-side, their values need to be sent to web browsers to use them in the frontends. Another limitation of environment variables is that certain frameworks don’t support them, but require specific properties files instead.

**Kubernetes Configuration**

The standard way for Kubernetes applications to handle configurations are config maps and secrets. Simple name value pairs or complete files can be handled via these Kubernetes resources. The data can be accessed by applications running in containers in various ways. For example via environment variables or via volumes (directories).

Secrets are basically extensions to config maps which also encrypt credentials. As extension to this separate tools like HashiCorp Vault can be used to manage passwords and certificates. Yet another solution is to use managed services like IBM Certificate Manager.

**Property Files**

Frameworks often come with their own configuration options. For example Open Liberty requires a server.xml file, Vue.js requires a store.js file (for Redux), Quarkus an application.properties file, etc.

Fortunately some frameworks support ‘inheritance’ of properties. For example with [Quarkus](https://quarkus.io/guides/config-reference) properties can be overriden at runtime (in decreasing priority):

- System properties
- Environment variables
- An environment file named .env placed in the current working directory
- A configuration file placed in $PWD/config/application.properties
- An application configuration file, i.e. src/main/resources/application.properties

**Templates**

Other frameworks can only handle specific property files. And sometimes files need to be customized without being able to use variables like environment variables. In this case I often use my own simple template mechanism.

Here is an example. Let’s say you want to use the same Kubernetes Deployment file with links to different images. In this case I use a Kubernetes.yaml.template file like this:

```
containers:
- name: service-catalog-quarkus-reactive
   image: image-registry.openshift-image-registry.svc:5000/<project-name>/service-catalog-quarkus-reactive:<version>
```

In the deployment script you can invoke these commands to define the values of the variables:

```
$ cp kubernetes.yaml.template kubernetes.yaml
$ sed "s/<project-name>/$(params.project-name)/g" kubernetes.org.yaml > kubernetes.yaml    
```

When replacing URLs use this:

```
$ POSTGRES_URL=$(sed -e 's/[&\\/]/\\&/g; s/$/\\/' -e '$s/\\$//' <<< "$POSTGRES_URL")
$ sed "s%POSTGRES_URL%$POSTGRES_URL%g" application.properties.temp > application.properties
```

Additionally there are several other template mechanims. For Kubernetes helm is a popular one which you should look into.

And obviously get familiar with [Declarative Management of Kubernetes Objects Using Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/).

**What’s next?**

If you want to see these mechanisms in action, check out my [sample application](https://github.com/IBM/application-modernization-javaee-quarkus). It includes Quarkus applications, Vue.js application, Open Liberty applications and lot’s of yaml configuration files for Kubernetes resources.