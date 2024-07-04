---
id: 4631
title: 'Using GitOps on OpenShift'
date: '2021-05-19T07:40:28+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4631'
permalink: /article/using-gitops-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/using-gitops-on-openshift/
categories:
    - Articles
---

This article demonstrates a typical scenario how to deploy a microservice on OpenShift using the GitOps capabilities of ArgoCD.

In a previous article I described how to [install and configure ArgoCD on OpenShift]({{ "/article/deploying-argocd-on-openshift/" | relative_url }}). Let’s now look at a sample pipeline which deploys a microservice from my [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus).

The microservice is deployed to three different projects: dev, test and prod. For simplification reasons they belong to the same cluster. For each environment there is an ArgoCD application: dev, test, prod.

In order to synchronize between the ‘to be state’ in the GitOps repo and the ‘is state’ in Kubernetes, ArgoCD is used. For the deployment of my sample microservice I use the repo [nheidloff/application-modernization-javaee-quarkus-config](https://github.com/nheidloff/application-modernization-javaee-quarkus-config).

**Sample Tekton Pipeline**

The pipeline contains the following Tekton tasks and steps. The code can be found in the [scripts-openshift-argocd](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/scripts-openshift-argocd) directory.

![image](/assets/img/2021/05/argocd-3.png)

First the code is pulled from GitHub. In this case it’s a public repo, but it could also be private since it is accessed on behalf of a specific user via ssh.

In the next steps the Java code is built and static and unit tests are executed. After this the image is built and pushed to OpenShift’s internal registry.

**GitOps Functionality**

So far nothing has been specific to GitOps. You would basically use the same steps in other pipelines. In the next step though the [image is tagged](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/scripts-openshift-argocd/tasks/tag-image.yaml) with an unique id. Usually this is the Git commit id to map between a specific image version to a specific code version. Additionally the image is pushed to the three projects (or in one shared project with images).

```
script: |
  #!/usr/bin/env sh
  set -e
  source $(workspaces.app-source.path)/revision.txt
  echo REVISION: $REVISION
  echo image: $(params.image)
  echo Tagging dev image
  buildah pull --tls-verify=false docker://$(params.image)
  buildah tag docker://$(params.image) docker://$(params.image):$REVISION
  buildah push --tls-verify=false docker://$(params.image):$REVISION
```

Note that I pass in the GitHub commit id (REVISION) via a file in the workspace. I’ve tried to use Tekton input and output parameters, but it didn’t work for my OpenShift Tekton version.

After this the yaml files for the microservice version in the dev environment are [updated](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/scripts-openshift-argocd/tasks/update-gitops-repo.yaml) with the latest image tag.

```
script: |
  #!/usr/bin/env sh
  set -e
  source $(workspaces.app-source.path)/revision.txt
  echo REVISION: $REVISION
      
  cd $(workspaces.config-source.path)    
  cd service-catalog-quarkus-reactive
  cd $(params.environment)
  sed "s/<project-name>/app-mod-argocd-$(params.environment)/g" $(workspaces.app-source.path)/service-catalog-quarkus-reactive/deployment/kubernetes.yaml.template > kubernetes-temp.yaml
  sed "s/<version>/$REVISION/g" kubernetes-temp.yaml > kubernetes.yaml
  cp $(workspaces.app-source.path)/service-catalog-quarkus-reactive/deployment/openshift.yaml openshift.yaml
```

Next the changes need to be pushed to the GitOps repo.

```
script: |
  #!/usr/bin/env sh
  set -e
  eval $(ssh-agent)
  ssh-add ~/.ssh/id_*
  git config --global user.email "tekton@tekton.dev"
  git config --global user.name "Tekton Pipeline"
  git add .
  git commit --allow-empty -m "[Tekton] updating $(params.environment)"
  git push origin main
```

In the last step ArgoCD is [triggered to synchronize](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/scripts-openshift-argocd/tasks/trigger-argocd.yaml) the new ‘to be state’ with the ‘is state’ in OpenShift.

```
spec:
  params:
  - name: argo-app-name
  stepTemplate:
    envFrom:
    - secretRef:
        name: argocd-env-secret
    env:
    - name: ARGOCD_SERVER
      value: argocd-cluster-server.openshift-gitops

  steps:
  - name: wait-for-argocd-rollout
    image: argoproj/argocd:v1.7.7
    script: |
      #!/usr/bin/env sh
      set -e
      argocd app sync $(inputs.params.argo-app-name) --insecure
      argocd app wait $(inputs.params.argo-app-name) --sync --health --operation --insecure
```

If the microservice works in the dev environment, it will be deployed to the test environment and after additional tests have been made it will be deployed to production.

**ArgoCD Console**

In the ArgoCD Console you can see the status of your applications. The screenshot shows the three ArgoCD applications for the three environments.

![image](/assets/img/2021/05/argocd-5.png)

Additionally you can navigate to specific applications for details. The next screenshot shows the different Kubernetes and OpenShift resources for the microservice.

![image](/assets/img/2021/05/argocd-6.png)

**Next Steps**

To learn more about Tekton, ArgoCD and application modernization, check out my [repo](https://github.com/IBM/application-modernization-javaee-quarkus).