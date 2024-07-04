---
id: 4601
title: 'Sample Tekton Pipelines for Microservices'
date: '2021-05-17T10:38:27+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4601'
permalink: /article/sample-tekton-pipelines-for-microservices/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/sample-tekton-pipelines-for-microservices/
categories:
    - Articles
---

This article describes how microservices can be deployed via Tekton on OpenShift. A sample application is used which you can try yourself.

Application modernization provides several benefits, for example more agility and cost savings. Modernizing the code is only one part of the application modernization story. Another key part is to introduce a new DevOps culture and automation through CI/CD.

My [application modernization sample](https://github.com/IBM/application-modernization-javaee-quarkus) uses nine containers to run applications, microservices and micro frontends plus additional containers to run the infrastructure components Postgres, Kafka and Db2. The containers can be deployed separately from each other which is why there are nine pipelines.

![image](/assets/img/2021/05/pipelines-tekton-1.png)

This ensures that parts can be updated, fixed or rolled back indecently from the rest of the application which is one of the reasons modern cloud-native applications allow for more agility compared to classic architectures.

There is a lot of literature about how to use continues integration, continues deliveries, pipelines, different environments, integrated security, etc. Let’s take a look at a simple sample pipeline to deploy one microservice.

![image](/assets/img/2021/05/pipelines-tekton-4.png)

Pipelines usually start by pulling code from source repositories. After this I’ve added a check whether the three infrastructure components are running.

Next some of the configuration is overwritten which is specific to the OpenShift environment, for example the image will be used from the OpenShift internal registry. Read my article [Exernalizing Configurations for OpenShift Deployments]({{ "/article/externalizing-configurations-for-openshift-deployments/" | relative_url }}) for more details.

In the next step usually static code analysis is run followed by Java builds and unit tests. In order to build the image, buildah is used.

```
- name: build-and-push-image
   taskRef:
     name: buildah
   workspaces:
   - name: source
      workspace: shared-data
   params:
   - name: IMAGE
      value: image-registry.openshift-image-registry.svc:5000/$(params.project-name)/build-service-catalog-quarkus-reactive
   - name: CONTEXT
      value: $(workspaces.source.path)/service-catalog-quarkus-reactive
   - name: TLSVERIFY
      value: "false"
    runAfter: ["build-and-unit-test"] 
```

After this the Kubernetes and OpenShift resources are applied.

```
steps:
    - name: deploy-service-catalog-quarkus-reactive
      image: image-registry.openshift-image-registry.svc:5000/openshift/cli
      script: |
        #!/bin/bash
        oc project $(params.project-name) > /dev/null 2>&1
        if [ $? != 0 ]; then 
          oc new-project $(params.project-name)
        fi
        cd $(workspaces.source.path)/service-catalog-quarkus-reactive
        oc apply -f deployment/kubernetes.yaml
        echo "Done deploying service-catalog-quarkus-reactive"
```

If the smoke test passes, the same microservice is deployed to other project in which system and integration testing is done. If these tests pass too, the service is deployed to production. In general this requires a manual approval.

In order to run this functionality yourself, check out the application modernization example. There is a section in the [documentation](https://github.com/IBM/application-modernization-javaee-quarkus#deployment-to-openshift-on-ibm-cloud-with-tekton) that describes how to run the pipelines. All you need locally is git and the oc CLI.

Also check out the complete [pipeline](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/scripts-openshift-tekton/application/tasks) of the sample above and the [tasks](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/scripts-openshift-tekton/application/tasks).