---
id: 4833
title: 'Importing Go Modules in Kubernetes Operators'
date: '2022-03-21T18:32:20+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4833'
permalink: /article/importing-go-modules-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/importing-go-modules-kubernetes-operators/
categories:
    - Articles
---

*When developing Kubernetes Operators with Golang, often third party modules need to be used. This article describes how to import modules and how to publish your own ones.*

Let’s take a look at the definitions of [modules and packages](https://go.dev/ref/mod#introduction).

> Modules are how Go manages dependencies. … A module is a collection of packages that are released, versioned, and distributed together. Modules may be downloaded directly from version control repositories or from module proxy servers. … Each package within a module is a collection of source files in the same directory that are compiled together.

There is an excelent video [Everything you should know about Go modules](https://www.youtube.com/watch?v=Z1VhG7cf83M) that describes modules. It’s 20 minutes long, but worth watching.

Rather than repeating everything from the video let me give an example. I’m working on a project [operator-sample-go](https://github.com/nheidloff/operator-sample-go) which demonstrates how to build Go operators. There is an operator ‘application’ and a second operator ‘database’. The application operator needs to check whether custom database resources have already been deployed. My earlier blog [Accessing third Party Custom Resources in Go Operators]({{ "/article/accessing-third-party-custom-resources-go-operators/" | relative_url }}) describes how to do this.

Since I didn’t explain how modules are used, let me do this now. The database controller in my simple sample has multiple packages, one of them contains the schema of the custom resource definition which the application controller requires. You can download the module manually via the following command. IDEs like VSCode do this automatically.

```
$ go get github.com/nheidloff/operator-sample-go/operator-database@v0.0.4
```

In the file [go.mod](https://github.com/nheidloff/operator-sample-go/blob/bb1c97b24ab4d1bcffe7b70db713d6c46ad124ee/operator-application/go.mod) the dependencies is defined.

```
module github.com/nheidloff/operator-sample-go/operator-application
go 1.17
require (
  github.com/nheidloff/operator-sample-go/operator-database v0.0.4
  golang.org/x/crypto v0.0.0-20210817164053-32db794688a5
  k8s.io/api v0.23.0
  ...
)
```

In the application [controller code](https://github.com/nheidloff/operator-sample-go/blob/bb1c97b24ab4d1bcffe7b70db713d6c46ad124ee/operator-application/controllers/application/database.go#L8) the module is referenced. Note that in order to reference a specific package in the module you can append the path.

```
package applicationcontroller
import (
  applicationsamplev1alpha1 "github.com/nheidloff/operator-sample-go/operator-application/api/v1alpha1"
  databasesamplev1alpha1 "github.com/nheidloff/operator-sample-go/operator-database/api/v1alpha1"
  metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
  ...
)
```

To create your own modules, you can push your code to GitHub. To create a version, GitHub tags are used (not releases). You can even assign versions to sub-directories which was useful in my case, since I have two operators in one repo.

```
$ git add operator-database
$ git commit -am 'database initial commit'
$ git push
$ git tag operator-database/v0.0.4
$ git push origin operator-database/v0.0.4
```

If you don’t create tags, the module is accessible under the version v0.0.0-xxxxx where xxxxx is the Git commit id.

After this the module will also be hosted on [pkg.go.dev](https://pkg.go.dev/github.com/nheidloff/operator-sample-go/operator-database), which is Go’s counterpart to Java’s Maven Central and Node’s npm.

![image](/assets/img/2022/03/Screenshot-2022-03-18-at-07.50.48.png)

This sounds pretty straight forward, but you need to be aware of a couple of things:

- Versioning is a little special. It uses [Semantic Versions](https://github.com/Masterminds/semver) which has special meanings for v0, v1 and all other versions.
- By default pkg.go.dev is used as a proxy to GitHub. This caused delays and some issues for me. Below is a command to refresh this cache and turn off the proxy.

Here are some commands that are useful when working with modules.

```
$ open https://pkg.go.dev/github.com/nheidloff/operator-sample-go/operator-database
$ go get github.com/nheidloff/operator-sample-go/operator-database@v0.0.4
$ go mod download github.com/nheidloff/operator-sample-go/operator-database
$ go list -m -versions github.com/nheidloff/operator-sample-go/operator-database/api/v1alpha1
$ go mod tidy
$ go clean -cache -modcache -i -r
$ go get ./...
$ go build
$ go env -w GO111MODULE=on
$ go env -w GOPRIVATE=github.com/nheidloff/operator-sample-go
$ export GONOPROXY="github.com/nheidloff/operator-sample-go"
$ go env | grep "GOPROXY"
$ go env | grep "GOSUMDB" 
$ curl https://sum.golang.org/lookup/github.com/nheidloff/operator-sample-go/operator-database@v0.0.4 
$ curl https://proxy.golang.org/github.com/ibm/operator-sample-go/@v/v1.0.6.info
$ git push --delete origin v2.0.0
```

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.