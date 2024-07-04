---
id: 4912
title: 'Converting Custom Resource Versions in Operators'
date: '2022-03-29T10:12:49+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4912'
permalink: /article/converting-custom-resource-versions-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/converting-custom-resource-versions-kubernetes-operators/
categories:
    - Articles
---

*Custom Kubernetes resources typically have multiple versions. Operators need to be able to convert between all different versions in all directions. This article describes how to implement this using a simple example.*

As applications evolve, custom resource definitions need to be extended. As for every API these changes need to be upwards compatible. Additionally the information from the newer versions needs also to be stored in older versions. This is why conversions need to be done in BOTH directions without loosing information.

This allows Kubernetes to provide the following functionality. See the documentation [Versions in CustomResourceDefinitions](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/) for details.

- Custom resource is requested in a different version than stored version.
- Watch is created in one version but the changed object is stored in another version.
- Custom resource PUT request is in a different version than storage version.

The best documentation I’ve found about conversion comes from Kubebuilder:

- [Hubs, spokes, and other wheel metaphors](https://book.kubebuilder.io/multiversion-tutorial/conversion-concepts.html)
- [Kubebuilder Doc – Implementing Conversion](https://book.kubebuilder.io/multiversion-tutorial/conversion.html)

Let’s look at a concrete example. I’m working on a GitHub repo that describes various [operator patterns and best practises](https://github.com/IBM/operator-sample-go). There is a custom resource ‘Application’ which has two version: The intial v1alpha1 version and the latest version v1beta1.

This is a resource using the [alpha version](https://github.com/IBM/operator-sample-go/blob/d4b54480a059a8d46443a03f02a5af0e2f3d15a2/operator-application/config/samples/application.sample_v1alpha1_application.yaml):

```
apiVersion: application.sample.ibm.com/v1alpha1
kind: Application
metadata:
  name: application
  namespace: application-alpha
spec:
  version: "1.0.0"
  amountPods: 1
  databaseName: database
  databaseNamespace: database
```

The [beta version](https://github.com/IBM/operator-sample-go/blob/d4b54480a059a8d46443a03f02a5af0e2f3d15a2/operator-application/config/samples/application.sample_v1beta1_application.yaml) has one additional property ‘title’.

```
apiVersion: application.sample.ibm.com/v1beta1
kind: Application
metadata:
  name: application
  namespace: application-beta
spec:
  version: "1.0.0"
  amountPods: 1
  databaseName: database
  databaseNamespace: database
  title: Movies
```

Once deployed, the application resource can be read via the following kubectl commands. By default the latest version is returned.

```
$ kubectl get applications/application -n application-beta -oyaml
or
$ kubectl get applications.v1beta1.application.sample.ibm.com/application -n application-beta -oyaml 
apiVersion: application.sample.ibm.com/v1beta1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: ...
...
spec:
  amountPods: 1
  databaseName: database
  databaseNamespace: database
  title: Movies
  version: 1.0.0
```

You can also request a specific version, in this case the alpha version from the application-alpha resource. In the sample the ‘title’ is missing since it wasn’t part of the resource when it was created.

```
$ kubectl get applications.v1alpha1.application.sample.ibm.com/application -n application-alpha -oyaml
apiVersion: application.sample.ibm.com/v1alpha1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: ...
...
spec:
  amountPods: 1
  databaseName: database
  databaseNamespace: database
  version: 1.0.0
```

Furthermore you can request the beta version of the application-alpha resource. In this case there is a title which has the value ‘Undefined’ since it was not set initially.

```
$ kubectl get applications.v1beta1.application.sample.ibm.com/application -n application-alpha -oyaml | grep -A6 -e "spec:" -e "apiVersion: application.sample.ibm.com/" 
apiVersion: application.sample.ibm.com/v1beta1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: ...
...
spec:
  amountPods: 1
  databaseName: database
  databaseNamespace: database
  title: Undefined
  version: 1.0.0
```

You can even request the application-beta resource in the alpha version. In this case the title can not be stored in the ‘spec’ part. The trick is to use annotations. Annotations are part of every resource in the metadata section. They are basically a ‘generic schema’ which name/values pairs.

```
$ kubectl get applications.v1alpha1.application.sample.ibm.com/application -n application-beta -oyaml | grep -A6 -e "spec:" -e "apiVersion: application.sample.ibm.com/" 
apiVersion: application.sample.ibm.com/v1alpha1
kind: Application
metadata:
  annotations:
    applications.application.sample.ibm.com/title: Movies
    kubectl.kubernetes.io/last-applied-configuration: ...
...
spec:
  amountPods: 1
  databaseName: database
  databaseNamespace: database
  version: 1.0.0
```

Next let me describe how to implement this scenario. First you need to define which of the versions should be used to store the resources in etcd via ‘+kubebuilder:storageversion’ ([code](https://github.com/IBM/operator-sample-go/blob/d4b54480a059a8d46443a03f02a5af0e2f3d15a2/operator-application/api/v1beta1/application_types.go#L31-L41)).

```
//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:storageversion
type Application struct {
  metav1.TypeMeta   `json:",inline"`
  metav1.ObjectMeta `json:"metadata,omitempty"`
  Spec   ApplicationSpec   `json:"spec,omitempty"`
  Status ApplicationStatus `json:"status,omitempty"`
}
```

Next you need to define which of the versions is your hub. All other ones are spokes. See the Kubebuilder documentation. I’ve defined the latest as hub which only contains the empty Hub() function ([code](https://github.com/IBM/operator-sample-go/blob/d4b54480a059a8d46443a03f02a5af0e2f3d15a2/operator-application/api/v1beta1/application_conversion.go)).

```
package v1beta1
func (*Application) Hub() {}
```

Next the spokes need to implement ConvertTo() and ConvertFrom(). Here is the ConvertFrom() [function](https://github.com/IBM/operator-sample-go/blob/d4b54480a059a8d46443a03f02a5af0e2f3d15a2/operator-application/api/v1alpha1/application_conversion.go#L42-L60) that converts from the latest to the initial version.

```
// convert from the hub version (src= v1beta1) to this version (dst = v1alpha1)
func (dst *Application) ConvertFrom(srcRaw conversion.Hub) error {
  src := srcRaw.(*v1beta1.Application)
  dst.ObjectMeta = src.ObjectMeta
  dst.Status.Conditions = src.Status.Conditions
  dst.Spec.AmountPods = src.Spec.AmountPods
  dst.Spec.DatabaseName = src.Spec.DatabaseName
  dst.Spec.DatabaseNamespace = src.Spec.DatabaseNamespace
  dst.Spec.SchemaUrl = src.Spec.SchemaUrl
  dst.Spec.Version = src.Spec.Version
  if dst.ObjectMeta.Annotations == nil {
    dst.ObjectMeta.Annotations = make(map[string]string)
  }
  dst.ObjectMeta.Annotations[variables.ANNOTATION_TITLE] = string(src.Spec.Title)
  return nil
}
```

And here is the ConvertTo() [function](https://github.com/IBM/operator-sample-go/blob/d4b54480a059a8d46443a03f02a5af0e2f3d15a2/operator-application/api/v1alpha1/application_conversion.go#L12-L40) that converts from the initial to the latest version.

```
// convert this version (src = v1alpha1) to the hub version (dst = v1beta1)
func (src *Application) ConvertTo(dstRaw conversion.Hub) error {
  dst := dstRaw.(*v1beta1.Application)
  dst.Spec.AmountPods = src.Spec.AmountPods
  dst.Spec.DatabaseName = src.Spec.DatabaseName
  dst.Spec.DatabaseNamespace = src.Spec.DatabaseNamespace
  dst.Spec.SchemaUrl = src.Spec.SchemaUrl
  dst.Spec.Version = src.Spec.Version
  if src.ObjectMeta.Annotations == nil {
    dst.Spec.Title = variables.DEFAULT_ANNOTATION_TITLE
  } else {
    title, annotationFound := src.ObjectMeta.Annotations[variables.ANNOTATION_TITLE]
    if annotationFound {
      dst.Spec.Title = title
    } else {
      dst.Spec.Title = variables.DEFAULT_ANNOTATION_TITLE
    }
  }
  dst.ObjectMeta = src.ObjectMeta
  dst.Status.Conditions = src.Status.Conditions
  return nil
}
```

The implementation of the conversion webhooks is rather straight forward. The setup of the webhooks is a little bit more tricky. Check out my earlier blog [Configuring Webhooks for Kubernetes Operators]({{ "/article/configuring-webhooks-kubernetes-operators/" | relative_url }}).

Try the [sample operator](https://github.com/IBM/operator-sample-go) which demonstrates the capabilities outlined above as well as many other operator patterns.