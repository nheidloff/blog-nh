---
id: 4613
title: 'Debugging Tekton on OpenShift'
date: '2021-05-17T13:47:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4613'
permalink: /article/debugging-tekton-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/debugging-tekton-on-openshift/
categories:
    - Articles
---

In this blog I explain briefly how to ‘debug’ Tekton tasks.

In my previous article [Sample Tekton Pipelines for Microservices]({{ "/article/sample-tekton-pipelines-for-microservices/" | relative_url }}) I described how to deploy microservices to OpenShift using Tekton. Running pipelines can take quite some time, since tasks run in different containers and data needs to be passed between them. So it is often desirable to run only specific tasks and steps and to pass in context.

Sebastian Daschner has created a great [video](https://www.youtube.com/watch?v=AZ9z7hIasO4) about a mechanism to run basically only a specific task. The challenge though is how to pass in the right context. For example for most tasks at a minimum you need to clone the repo first.

The trick is to use a task with a step that starts a container but puts it in sleep mode:

```
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: debug-task
  labels:
    app.kubernetes.io/version: "0.3"
  annotations:
    tekton.dev/pipelines.minVersion: "0.21.0"
    tekton.dev/displayName: "debug-task"
spec:
  description: >-
    debug-task
  params:
    - name: project-name
    - name: app-git-url
  workspaces:
    - name: app-source
  steps:
    - name: debug-task
      image: alpine/git:v2.26.2
      workingDir: "$(workspaces.app-source.path)"
      command: ["sleep", "infinity"]
```

Rather than running a complete pipeline, only the task can be run:

```
apiVersion: tekton.dev/v1beta1
kind: TaskRun
metadata:
  name: debug-task-run
spec:
  taskRef:
    name: debug-task
  params:
  - name: project-name
    value: 'app-mod-tekton-dev'
  - name: app-git-url
    value: 'https://github.com/IBM/application-modernization-javaee-quarkus'
  workspaces:
  - name: app-source
    emptyDir: {}
```

The complete code is in my [application modernization repo](https://github.com/IBM/application-modernization-javaee-quarkus/tree/master/scripts-openshift-tekton/debug).

Here are the commands to redeploy the task and the task run:

```
$ oc delete -f debug/debug-task.yaml
$ oc delete -f debug/debug-task-run.yaml
$ oc apply -f debug/debug-task.yaml
$ oc apply -f debug/debug-task-run.yaml
```

In order to debug the task, you can ‘exec’ into the pod’s container:

```
POD_NAME=$(oc get pods -n app-mod-tekton-dev | awk '/debug-task-run-pod/ {print $1;exit}')
kubectl exec -t -i $POD_NAME /bin/sh
```

If you want to learn more about Tekton, ArgoCD and application modernization, check out my [repo](https://github.com/IBM/application-modernization-javaee-quarkus).