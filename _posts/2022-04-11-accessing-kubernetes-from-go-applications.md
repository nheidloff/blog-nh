---
id: 5022
title: 'Accessing Kubernetes from Go Applications'
date: '2022-04-11T05:07:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5022'
permalink: /article/accessing-kubernetes-from-go-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-kubernetes-from-go-applications/
categories:
    - Articles
---

*When developing auto-pilot capabilities in Kubernetes operators, often CronJobs and Jobs are used to automate operations. This article describes how to implement such jobs with Golang.*

The complete source code from this article is available in the [ibm/operator-sample-go](https://github.com/IBM/operator-sample-go/tree/main/operator-database-backup) repo.

My previous article [Automatically Archiving Data with Kubernetes Operators]({{ "/article/automatically-archiving-data-kubernetes-operators/" | relative_url }}) describes an auto pilot sample scenario to back up data on a scheduled basis. The [code](https://github.com/IBM/operator-sample-go/blob/0b46e5ee18b892293ce2ff2eb565ea9500de298b/operator-database-backup/backup/backup.go) of the backup job is pretty straight forward. I’ve implemented a Go image with the following functionality.

- Get the database backup resource from Kubernetes
- Validate input environment variables
- Read data from the database system
- Write data to object storage
- Write status as conditions in database backup resource

**Dockerfile**

To package up the Go application, I’ve defined the following [Dockerfile](https://github.com/IBM/operator-sample-go/blob/64dac7d036ce81b9ceba3e1dd2dd1f1c83cd2968/operator-database-backup/Dockerfile). Some notes:

- Uses two stages, one for build and one for runtime
- The Go dependencies are downloaded first to cache them in an image layer
- With the parameter ‘GOOS=linux’ the application is built for Linux
- Uses Red Hat’s UBI image, for example in order to also run on OpenShift
- The compiled ‘app’ file is a program that ends after it’s done (not a web server)

```
FROM golang:1.18.0 AS builder
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY main.go ./
COPY backup ./backup/
RUN CGO_ENABLED=0 GOOS=linux go build -a -o app .

FROM registry.access.redhat.com/ubi8/ubi-micro:8.5-833
WORKDIR /
COPY --from=builder /app /
CMD ["./app"]
```

**Access to Kubernetes**

Jobs that execute work on behalf of operators usually have to access Kubernetes built-in and custom resources. For example jobs need to store the output of the jobs in the ‘status.conditions’ field of custom resources. Operators built with the Operator SDK provide convenience functionality to get an instance of the Kubernetes client to access resources in clusters. Go applications that are not operators can use the same library, but the initialization is slightly different.

Let’s take a look at the [code](https://github.com/IBM/operator-sample-go/blob/64dac7d036ce81b9ceba3e1dd2dd1f1c83cd2968/operator-database-backup/backup/backup_resource.go).

```
import (
	databaseoperatorv1alpha1 "github.com/ibm/operator-sample-go/operator-database/api/v1alpha1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/scheme"
)
func getBackupResource() error {
	config, err := rest.InClusterConfig()
	if err != nil {
		kubeconfig := filepath.Join(
			os.Getenv("HOME"), ".kube", "config",
		)
		fmt.Println("Using kubeconfig file: ", kubeconfig)
		config, err = clientcmd.BuildConfigFromFlags("", kubeconfig)
		if err != nil {
			return err
		}
	}
	var GroupVersion = schema.GroupVersion{Group: "database.sample.third.party", Version: "v1alpha1"}
	var SchemeBuilder = &scheme.Builder{GroupVersion: GroupVersion}
	var databaseOperatorScheme *runtime.Scheme
	databaseOperatorScheme, err = SchemeBuilder.Build()
  ...  
	err = databaseoperatorv1alpha1.AddToScheme(databaseOperatorScheme)
  ...
	kubernetesClient, err = client.New(config, client.Options{Scheme: databaseOperatorScheme})
  ...
	databaseBackupResource = &databaseoperatorv1alpha1.DatabaseBackup{}
	err = kubernetesClient.Get(applicationContext, types.NamespacedName{Name: backupResourceName, Namespace: namespace}, databaseBackupResource)
  ...
	return nil
}
```

To get an instance of the controller-runtime client, a rest.Config object is needed. When running in clusters, this config can be read via the API rest.InClusterConfig(). When running locally, the config can be read from the local file $Home/.kube/config.

If you want to access resource definitions defined by a controller (other image and other Go package), you can [import]({{ "/article/importing-go-modules-kubernetes-operators/" | relative_url }}) them. In the example above the custom resource definition ‘DatabaseBackup’ from the ‘operator-database’ project is used to access database backup resources.

To learn more about operator patterns and best practices, check out the repo [operator-sample-go](https://github.com/IBM/operator-sample-go).