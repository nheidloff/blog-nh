---
id: 4902
title: 'Initialization and Validation Webhooks in Operators'
date: '2022-03-28T06:26:59+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4902'
permalink: /article/developing-initialization-validation-webhooks-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-initialization-validation-webhooks-kubernetes-operators/
categories:
    - Articles
---

*When developing custom Kubernetes resources, static defaults and simple validations for resource properties can be defined in OpenAPI/JSON schemas. For more flexible scenarios webhooks can be used to initialize and validate resources with Go code.*

In the easiest case defaults and validations can be defined via Kubebuilder annotations directly in the Go [code](https://github.com/IBM/operator-sample-go/blob/a449303076310bc99e3595c1904e6aeb6ee03b87/operator-application/api/v1beta1/application_types.go) of the custom resource definition, for example:

```
type ApplicationSpec struct {
  //+kubebuilder:default:="1.0.0"
  Version string `json:"version,omitempty"`
  //+kubebuilder:validation:Minimum=0
  //+kubebuilder:default:=1
  AmountPods int32 `json:"amountPods"`
  // +kubebuilder:default:="database"
  DatabaseName string `json:"databaseName,omitempty"`
  // +kubebuilder:default:="databaseNamespace"
  DatabaseNamespace string `json:"databaseNamespace,omitempty"`
  // +kubebuilder:default:="https://raw.githubusercontent.com/IBM/multi-tenancy/main/my.sql"
  SchemaUrl string `json:"schemaUrl,omitempty"`
  Title string `json:"title`
}
```

Read the [Kubebuilder documentation](https://book.kubebuilder.io/reference/markers/crd-validation.html) for more details.

Additionally webhooks can be implemented as part of Kubernetes operators which are executed before custom resources are created, updated and deleted. The implementation of these webhooks is straight forward. The setup of the webhooks is a little bit more tricky. Check out my earlier blog [Configuring Webhooks for Kubernetes Operators]({{ "/article/configuring-webhooks-kubernetes-operators/" | relative_url }}).

In order to develop initialization and validation webhooks, you have to implement the methods ‘Default()’, ‘ValidateCreate()’, ‘ValidateUpdate()’ and ‘ValidateDelete()’. Let’s take a look at a sample. The [sample](https://github.com/IBM/operator-sample-go) is part of a GitHub repo that demonstrates various best practises for building operators.

The Default() function sets the default of the title property read from a Go variable ([code](https://github.com/IBM/operator-sample-go/blob/a449303076310bc99e3595c1904e6aeb6ee03b87/operator-application/api/v1beta1/application_webhook.go#L28-L33)).

```
func (reconciler *Application) Default() {
  if reconciler.Spec.Title == "" {
    reconciler.Spec.Title = variables.DEFAULT_ANNOTATION_TITLE
  }
}
```

Here are some [snippets](https://github.com/IBM/operator-sample-go/blob/a449303076310bc99e3595c1904e6aeb6ee03b87/operator-application/api/v1beta1/application_webhook.go#L38-L83) how to validate two properties.

```
func (reconciler *Application) ValidateCreate() error {
  return reconciler.validate()
}
func (reconciler *Application) ValidateUpdate(old runtime.Object) error {
  return reconciler.validate()
}
func (reconciler *Application) validate() error {
  var allErrors field.ErrorList
  if err := reconciler.validateSchemaUrl(); err != nil {
    allErrors = append(allErrors, err)
  }
  if err := reconciler.validateName(); err != nil {
    allErrors = append(allErrors, err)
  }
  if len(allErrors) == 0 {
    return nil
  }
    return apierrors.NewInvalid(
      schema.GroupKind{Group: GroupVersion.Group, Kind: reconciler.Kind},
      reconciler.Name, allErrors)
}
func (reconciler *Application) validateSchemaUrl() *field.Error {
  if !strings.HasPrefix(reconciler.Spec.SchemaUrl, "http") {
    return field.Invalid(field.NewPath("spec").Child("schemaUrl"), reconciler.Name, "must start with 'http'")
  }
  return nil
}
func (reconciler *Application) validateName() *field.Error {
  // Note: Names of Kubernetes objects can only have a length is 63 characters
  // Note: Since deployment name = application name + ‘-deployment-microservice', the name cannot have more than 35 characters
  if len(reconciler.ObjectMeta.Name) > validationutils.DNS1035LabelMaxLength-24 {
    return field.Invalid(field.NewPath("metadata").Child("name"), reconciler.Name, "must be no more than 35 characters")
  }
  return nil
}
```

To learn more read the [Kubebuilder documentation](https://book.kubebuilder.io/cronjob-tutorial/webhook-implementation.html) and try the [sample](https://github.com/IBM/operator-sample-go) operator which demonstrates defaulting/validation webhooks as well as many other operator patterns.