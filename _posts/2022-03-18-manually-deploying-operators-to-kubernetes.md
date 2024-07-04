---
id: 4855
title: 'Manually deploying Operators to Kubernetes'
date: '2022-03-18T12:39:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4855'
permalink: /article/manually-deploying-operators-to-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/manually-deploying-operators-to-kubernetes/
categories:
    - Articles
---

*Kubernetes operators automate the deployment and operations of Kubernetes based software. Developers can develop and run them locally pointing to resources in Kubernetes. As the next step this article describes how operators can be deployed to run directly on Kubernetes.*

I’m working on an [operator sample](https://github.com/nheidloff/operator-sample-go) implemented in Go that shows typical operator patterns. There are instructions how to [run the operator locally](https://github.com/nheidloff/operator-sample-go/blob/main/operator-application/README.md#setup-and-local-usage) and instructions how to [deploy the operator manually to Kubernetes](https://github.com/nheidloff/operator-sample-go/blob/main/operator-application/README.md#setup-and-manual-deployment). Below I highlight the important steps when deploying operators to Kubernetes.

The [Operator SDK](https://sdk.operatorframework.io/) makes it pretty simple to build and deploy the image:

```
$ export REGISTRY='docker.io'
$ export ORG='nheidloff'
$ export IMAGE='application-controller:v11'
$ make generate
$ make manifests
$ make docker-build IMG="$REGISTRY/$ORG/$IMAGE"
$ docker login $REGISTRY
$ docker push "$REGISTRY/$ORG/$IMAGE"
$ make deploy IMG="$REGISTRY/$ORG/$IMAGE"
$ export OPERATOR_NAMESPACE='operator-application-system'
$ kubectl get all -n $OPERATOR_NAMESPACE
```

**Definition of RBAC Roles**

The sample controller accesses different types of Kubernetes resources and needs access to them. With the Operator SDK (and the underlaying kubebuilder library) you can define annotations directly in the controller. By default only access to the new custom resource is defined. You need to add access rights to other resources like deployments or services ([code](https://github.com/nheidloff/operator-sample-go/blob/ca204e86e23fe166168af0eb61eac281e1f8de85/operator-application/controllers/application/controller.go#L26-L34)).

```
//+kubebuilder:rbac:groups=database.sample.third.party,resources=databases,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=application.sample.ibm.com,resources=applications,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=application.sample.ibm.com,resources=applications/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=application.sample.ibm.com,resources=applications/finalizers,verbs=update
//+kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch
//+kubebuilder:rbac:groups="",resources=secrets,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups="",resources=services,verbs=get;list;watch;create;update;patch;delete
func (reconciler *ApplicationReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
```

This works nicely when running the operator locally, but is not sufficient when deploying the operator to Kubernetes. The same access rights also need to be defined in [role.yaml](https://github.com/nheidloff/operator-sample-go/blob/ca204e86e23fe166168af0eb61eac281e1f8de85/operator-application/config/rbac/role.yaml). I’m not sure whether this is a SDK feature, issue or not implemented yet.

```
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
```

After the operator has been deployed check the logs of the manager container in the operator pod. If access rights are missing, you’ll see detailed information what needs to be added.

![image](/assets/img/2022/03/Screenshot-2022-03-18-at-13.23.27.png)

**Dockerfile Updates**

If you created your own packages under the root directoy, they are not automatically added to the [Dockerfile](https://github.com/nheidloff/operator-sample-go/blob/ca204e86e23fe166168af0eb61eac281e1f8de85/operator-application/Dockerfile#L16) of the operator. You need to add them, for example the ‘utilities’ directory.

```
FROM golang:1.17 as builder
WORKDIR /workspace
COPY go.mod go.mod
COPY go.sum go.sum
RUN go mod download
COPY main.go main.go
COPY api/ api/
COPY controllers/ controllers/
COPY utilities/ utilities/
```

**Image Creation**

By default the Makefile of the Operator SDK uses Docker. If you want to switch to Podman or Buildah, you can change this in the [Makefile](https://github.com/nheidloff/operator-sample-go/blob/ca204e86e23fe166168af0eb61eac281e1f8de85/operator-application/Makefile#L119-L125).

```
.PHONY: docker-build
docker-build: test ## Build docker image with the manager.
	docker build -t ${IMG} .

.PHONY: docker-push
docker-push: ## Push docker image with the manager.
	docker push ${IMG}
```

Unfortunately Podman doesn’t work for me on my Mac and Buildah only works on Linux. If you don’t want or are not allowed to use Docker Desktop, you need to use a Linux machine, for example a small virtual machine in the cloud.

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.