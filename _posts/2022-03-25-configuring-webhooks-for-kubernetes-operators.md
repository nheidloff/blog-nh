---
id: 4889
title: 'Configuring Webhooks for Kubernetes Operators'
date: '2022-03-25T07:51:49+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4889'
permalink: /article/configuring-webhooks-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/configuring-webhooks-kubernetes-operators/
categories:
    - Articles
---

*Kubernetes operators can initialize, validate and convert custom resources via webhooks. Coding the webhooks is straight forward, setting them up is a lot harder. This article summarizes the important setup steps.*

There are three types of webhooks used by operators:

1. Initialization: To set defaults when creating new resources. This webhook is a Kubernetes admission webhook.
2. Validation: To validate resources when created, updated or deleted. This webhook is a Kubernetes admission webhook.
3. Conversion: To convert between different resource definition versions in all directions. This webhook is a Kubernetes CRD conversion webhook.

As mentioned the setup of the webhooks is not trivial. There are different pieces of documentation in various articles and blogs. My colleague Vincent Hou has written a great mini series and helped me to get our [sample](https://github.com/IBM/operator-sample-go) working.

- [What is a webhook?](https://book.kubebuilder.io/reference/webhook-overview.html)
- [Deploying the cert manager](https://book.kubebuilder.io/cronjob-tutorial/cert-manager.html)
- [Deploying Admission Webhooks](https://book.kubebuilder.io/cronjob-tutorial/running-webhook.html)
- [How to create conversion webhook for my operator with operator-sdk](https://vincenthou.medium.com/how-to-create-conversion-webhook-for-my-operator-with-operator-sdk-36f5ee0170de)
- [How to use mutating webhook for the operator with operator-sdk](https://vincenthou.medium.com/how-to-use-mutating-webhook-for-the-operator-with-operator-sdk-f940bd98e10b)
- [How to create validating webhook with operator-sdk](https://vincenthou.medium.com/how-to-create-validating-webhook-with-operator-sdk-73f9c6332609)
- [Shipping an operator that includes Webhooks](https://olm.operatorframework.io/docs/advanced-tasks/adding-admission-and-conversion-webhooks/)
- [Webhook Configuration](https://book.kubebuilder.io/reference/markers/webhook.html)
- [Running and deploying the controller](https://book.kubebuilder.io/cronjob-tutorial/running.html)

Before you get started it’s important to understand that webhooks require another component that needs to be installed in Kubernetes. Webhooks are invoked by the Kubernetes API server and require authentication and authorization. That’s why components like [cert-manager](https://cert-manager.io/docs/) are required to inject the credentials. And that’s one of the reasons why running webhooks locally is very difficult (plus you need a proxy to call the local webhooks from Kubernetes).

Let’s take a look how to set up a new operator with initialization and validation webhooks. The steps are a summary from Vincent’s article above.

Create the project, api and webhook:

```
$ operator-sdk init --domain ibm.com --repo github.com/houshengbo/operator-sample-go/operator-application
$ operator-sdk create api --group application.sample --version v1beta1 --kind Application --resource --controller
$ operator-sdk create webhook --group application.sample --version v1beta1 --kind Application --defaulting --programmatic-validation --force
```

In api/v1beta1/application\_webhook.go change from admissionReviewVersions=v1 to admissionReviewVersions=v1beta1. Then change Default():

```
func (r *Application) Default() {
	applicationlog.Info(“default”, “name”, r.Name)
    r.Spec.Foo = “default”
}
```

Get the dependencies and create manifests:

```
$ go mod vendor
$ make generate
$ make manifests
```

In config/crd/kustomization.yaml, uncomment the following lines:

```
#- patches/webhook_in_memcacheds.yaml
#- patches/cainjection_in_memcacheds.yaml
```

In config/default/kustomization.yaml, uncomment the following lines:

```
#- ../webhook
#- ../certmanager
#- manager_webhook_patch.yaml
#- webhookcainjection_patch.yaml
```

In the same file uncomment all the lines below ‘vars’:

```
#- name: CERTIFICATE_NAMESPACE # namespace of the certificate CR
#  objref:
#    kind: Certificate
#    group: cert-manager.io
#    version: v1
#    name: serving-cert # this name should match the one in certificate.yaml
#  fieldref:
#    fieldpath: metadata.namespace
#- name: CERTIFICATE_NAME
#  objref:
#    kind: Certificate
#    group: cert-manager.io
#    version: v1
#    name: serving-cert # this name should match the one in certificate.yaml
#- name: SERVICE_NAMESPACE # namespace of the service
#  objref:
#    kind: Service
#    version: v1
#    name: webhook-service
#  fieldref:
#    fieldpath: metadata.namespace
#- name: SERVICE_NAME
#  objref:
#    kind: Service
#    version: v1
#    name: webhook-service
```

Change config/samples/application.sample\_v1beta1\_application.yaml into this:

```
apiVersion: v1
kind: Namespace
metadata:
  name: application-sample
---
apiVersion: application.sample.ibm.com/v1beta1
kind: Application
metadata:
  name: application-sample
  namespace: application-sample
```

Deploy the operator including the webhook to Kubernetes and run it:

```
export REGISTRY=‘docker.io’
export ORG=‘nheidloff’
export IMAGE=‘application-controller:v1’
make docker-build docker-push IMG=“$REGISTRY/$ORG/$IMAGE”
make deploy IMG=“$REGISTRY/$ORG/$IMAGE”
kubectl logs -f deploy/operator-application-controller-manager -n operator-application-system -c manager
```

Create the custom resource and check whether foo is “default”:

```
$ kubectl apply -f config/samples/application.sample_v1beta1_application.yaml
$ kubectl get Application -n application-sample -oyaml
```

Check out our [repo](https://github.com/IBM/operator-sample-go) that contains samples for all webhooks. Keep an eye on my blog. I’ll write more about other operator patterns soon.