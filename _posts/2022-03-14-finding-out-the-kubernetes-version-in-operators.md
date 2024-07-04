---
id: 4798
title: 'Finding out the Kubernetes Version in Operators'
date: '2022-03-14T09:29:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4798'
permalink: /article/finding-kubernetes-version-capabilities-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/finding-kubernetes-version-capabilities-operators/
categories:
    - Articles
---

*Kubernetes operators allow the automatic deployment and management of software. Since different Kubernetes distributions have different capabilities, operators need to handle these differences.*

In the best case operators are able to operate software on different Kubernetes based platforms. As an example let’s take the self-deployed open source Kubernetes version and the managed AWS OpenShift version (EKS). While core functionality like deployments and service are identical, OpenShift adds convenience functionality like routes for easier networking. Another example are lightweight Kubernetes distributions, for example for edge devices, which often have been reduced in terms of functionality. Yet another example are Kubernetes versions that use different or no Ingress resources. Additionally obviously newer Kubernetes verions support functionality which is not available in older versions.

That’s why the operators need to know which capabilities are available. If certain capabilities are missing, e.g. a route, it might be able to use alternate mechanisms. Note that I talk about capabilities, not versions, since this approach is more reliable and more generic which leads to less code. Read the article [Why not couple an Operator’s logic to a specific Kubernetes platform?](https://developers.redhat.com/blog/2020/01/22/why-not-couple-an-operators-logic-to-a-specific-kubernetes-platform) for more details.

I’m working on a [sample](https://github.com/nheidloff/operator-sample-go) that describes different patterns and best practices to build operators with Golang. Let’s take a look how you can find out whether or not certain capabilities are supported.

In a nutshell there is an API ‘DiscoveryClient.ServerVersion’ and more importantly another API ‘DiscoveryClient.ServerGroupsAndResources’ to get a list of all available APIs (= capabilities).

The [snippet](https://github.com/nheidloff/operator-sample-go/blob/aa9fd15605a54f712e1233423236bd152940f238/operator-application/controllers/application_controller.go#L349) shows how to check whether OpenShift routes are available.

```
var kubernetesServerVersion string
var runsOnOpenShift bool = false
...
func (reconciler *ApplicationReconciler) checkPrerequisites() bool {
	discoveryClient, err := discovery.NewDiscoveryClientForConfig(managerConfig)
	if err == nil {
		serverVersion, err := discoveryClient.ServerVersion()
		if err == nil {
			kubernetesServerVersion = serverVersion.String()
			apiGroup, _, err := discoveryClient.ServerGroupsAndResources()
			if err == nil {
				for i := 0; i < len(apiGroup); i++ {
					if apiGroup[i].Name == "route.openshift.io" {
						runsOnOpenShift = true
					}
				}
			}
		}
	}
	return true
}
```

Note that you also define the required Kubernetes versions in the manifest when you use the [Operator Lifecycle Manager](https://olm.operatorframework.io/docs/best-practices/common/).

Check out the [repo](https://github.com/nheidloff/operator-sample-go) and keep an eye on my blog. I’ll write more about other operator patterns soon.