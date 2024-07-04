---
id: 4802
title: 'Accessing third Party Custom Resources in Go Operators'
date: '2022-03-15T11:52:47+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4802'
permalink: /article/accessing-third-party-custom-resources-go-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-third-party-custom-resources-go-operators/
categories:
    - Articles
---

*Kubernetes operators allow the automatic deployment and management of software. Operators can manage core Kubernetes resources as well as custom resources, for example third parties resources.*

I’m working on a [sample](https://github.com/nheidloff/operator-sample-go) that describes different patterns and best practices to build operators with Golang. The repo demonstrates how a custom resource ‘Application’ uses internally a third party ‘Database’ resource which is managed by another controller. This is a simplified version of the typical scenario to use a managed database in the cloud.

In order to implement the application controller, the custom resource ‘Database’ needs to be accessed from the operator’s Go code. This article describes two different ways to do this.

- Quick and dirty Solution
- Clean Solution leveraging Go Packages and Types

**Quick and dirty Solution**

The fastest way to create a custom resource from a Go based operator might be to use the ‘Unstructured’ API. Essentially the custom resource is defined programmatically in Go, then serialized to yaml/json and then sent to Kubernetes. Read the entry [How to perform CRUD on 3rd-party Custom Resource for which go api is not available](https://stackoverflow.com/questions/65074930/how-to-perform-crud-on-3rd-party-custom-resource-for-which-go-api-is-not-availab) on StackOverflow or check out the snippet.

```
func newExampleCR() (*unstructured.Unstructured)
    &unstructured.Unstructured{
        Object: map[string]interface{}{
            "apiVersion": "version", //set version here
            "kind":       "ExampleCR", // set CR name here
            "metadata": map[string]interface{}{
                "name": "demo-deployment",
            },
            "spec": map[string]interface{}{
                //spec goes here
            },
        },
    }
}
```

Essentially this is the counterpart to how you would do it in Java. See my previous blog [Accessing Kubernetes Resources from Java Operators]({{ "/article/accessing-kubernetes-resources-from-java-operators" | relative_url }}).

**Clean Solution leveraging Go Packages and Types**

There is a much cleaner and more ellegant way to do this though which leverages the capabilities of the Go language. When using this mechanism, the handling of third party resources is not any different from using native Kubernetes resources!

Let’s take a look at the [code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L117) how the custom resource ‘Database’ would be used in the reconcile function.

```
database := &databasesamplev1alpha1.Database{}
databaseDefinition := reconciler.defineDatabase(application)
err = reconciler.Get(ctx, types.NamespacedName{Name: application.Spec.DatabaseName, Namespace: application.Spec.DatabaseNamespace}, database)
if err != nil {
  if errors.IsNotFound(err) {
    log.Info("Database resource " + application.Spec.DatabaseName + " not found. Creating or re-creating database")
    err = reconciler.Create(ctx, databaseDefinition)
    if err != nil {
      log.Info("Failed to create database resource. Re-running reconcile.")
      return ctrl.Result{}, err
    } else {
      // to simulate real databases, delay the next loop run since database creation can take time
      return ctrl.Result{RequeueAfter: time.Second * 1}, nil 
    }
  } else {
    log.Info("Failed to get database resource " + application.Spec.DatabaseName + ". Re-running reconcile.")
    return ctrl.Result{}, err
  }
}
```

In order to define the struct representing the database with typical properties like user, password, url and certificate, [code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L270) like this can be used. Again, this is exactly the same way you do this for native Kubernetes resources.

```
func (reconciler *ApplicationReconciler) defineDatabase(application *applicationsamplev1alpha1.Application) *databasesamplev1alpha1.Database {
  database := &databasesamplev1alpha1.Database{
    ObjectMeta: metav1.ObjectMeta{
      Name:      application.Spec.DatabaseName,
      Namespace: application.Spec.DatabaseNamespace,
    },
    Spec: databasesamplev1alpha1.DatabaseSpec{
      User:        databaseUser,
      Password:    databasePassword,
      Url:         databaseUrl,
      Certificate: databaseCertificate,
    },
  }
  ctrl.SetControllerReference(application, database, reconciler.Scheme)
  return database
}
```

For me this is one of the main reasons to use Go when building operators. It’s the same language in which Kubernetes is built and the most natural fit for Kubernetes extensions, custom controls and operators. By using it you can benefit from support of types in Go and the nice IDE features like autolookups, etc.

![image](/assets/img/2022/03/Screenshot-2022-03-11-at-12.29.00.png)

In order to write the code above, you need to do a couple of things. First you need to import the package with the custom Go types. Installing packages is not always trivial because of caching and inconsistency issues, but if everything works, you only have to import the third party package. In my sample applicationsamplev1alpha1 is the package of my own custom resource, databasesamplev1alpha1 is the package of the database resource ([code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L26)). VSCode helps you to perform the ‘go get’ command to download the code and it updates go.mod and go.sum.

```
import (
  ...
  applicationsamplev1alpha1 "github.com/nheidloff/operator-sample-go/operator-application/api/v1alpha1"
  databasesamplev1alpha1 "github.com/nheidloff/operator-sample-go/operator-database/api/v1alpha1"
)
```

In order to be recognized by the runtime, the custom schema needs to be added ([code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/main.go#L31)).

```
func init() {
  utilruntime.Must(clientgoscheme.AddToScheme(scheme))
  utilruntime.Must(databasesamplev1alpha1.AddToScheme(scheme))
  utilruntime.Must(applicationsamplev1alpha1.AddToScheme(scheme))
  //+kubebuilder:scaffold:scheme
}
```

This mechanism works nicely for operators that have been built using the Operator SDK since the SDK generates the necessary scaffolding and a default implementation for operators that can be consumed by other operators ([code](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-database/api/v1alpha1/groupversion_info.go)).

```
package v1alpha1
import (
  "k8s.io/apimachinery/pkg/runtime/schema"
  "sigs.k8s.io/controller-runtime/pkg/scheme"
)
var (
  GroupVersion = schema.GroupVersion{Group: "database.sample.third.party", Version: "v1alpha1"}
  SchemeBuilder = &scheme.Builder{GroupVersion: GroupVersion}
  AddToScheme = SchemeBuilder.AddToScheme
)
```

Note that creating third party resources from your own controllers is not always recommended for encapsulation and security reasons. Since there scenarios though where it makes sense, I’ve documented not only how to access third party resources, but also how to create them above.

To learn more, check out these articles.

- [Adding 3rd Party Resources To Your Operator](https://sdk.operatorframework.io/docs/building-operators/golang/advanced-topics/#adding-3rd-party-resources-to-your-operator)
- [How to use third-party APIs in Operator SDK projects](https://developers.redhat.com/blog/2020/02/04/how-to-use-third-party-apis-in-operator-sdk-projects)

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.