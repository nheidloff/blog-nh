---
id: 4737
title: 'Developing and Debugging Kubernetes Operators in Java'
date: '2022-03-01T11:34:38+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4737'
permalink: /article/developing-debugging-kubernetes-operators-java/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-debugging-kubernetes-operators-java/
categories:
    - Articles
    - Java
---

*Kubernetes operators are incredibly powerful to deploy applications and automate day 2 operations. While most operators are implemented in Go, there is also a Quarkus extension for Java developers. The article describes to create your first simple operator.*

There is a [Java SDK](https://javaoperatorsdk.io/) to build operators easily with Quarkus.

> Whether you want to build applications that operate themselves or provision infrastructure from Java code, Kubernetes Operators are the way to go. JAVA-OPERATOR-SDK is based on the fabric8 Kubernetes client and will make it easy for Java developers to embrace this new way of automation.

The following steps describe how to set up, develop and run your first operator in a few minutes.

**Development**

After you have installed the [Operator SDK](https://sdk.operatorframework.io/), you can invoke these two commands to set up the base project.

```
$ operator-sdk init --plugins quarkus --domain ecommercesample.com --project-name expose
$ operator-sdk create api --version v1alpha1 --kind ECommerceSample
```

The goal is to have a custom resource in this format:

```
apiVersion: "ecommercesample.com/v1alpha1"
kind: ECommerceSample
metadata:
  name: hello-quarkus
spec:
  imageRef: heidloff.net
```

In ECommerceSampleSpec.java the one variable in the spec section is defined.

```
package com.ecommercesample;
public class ECommerceSampleSpec {
  private String imageRef;
  public String getImageRef() {
    return imageRef;
  }
  public void setImageRef(String imageRef) {
    this.imageRef = imageRef;
  }
}
```

In the resource controller ECommerceSampleController.java events can be received when custom resources change.

```
package com.ecommercesample;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.javaoperatorsdk.operator.api.Context;
import io.javaoperatorsdk.operator.processing.event.EventSourceManager;
@Controller
public class ECommerceSampleController implements ResourceController<ECommerceSample> {
  private final KubernetesClient client;
  public ECommerceSampleController(KubernetesClient client) {
    this.client = client;
  }
  @Override
  public void init(EventSourceManager eventSourceManager) {
  }
  @Override
  public UpdateControl<ECommerceSample> createOrUpdateResource(
    ECommerceSample resource, Context<ECommerceSample> context) {
    System.out.println("Received " + resource.getSpec().getImageRef());
    return UpdateControl.noUpdate();
  }
}
```

In order to run the operator locally, invoke this command:

```
$ mvn clean quarkus:dev
```

To create the custom resource from above, invoke this command:

```
kubectl apply -f sample.yaml
```

After this you will see the output in the terminal.

**Debugging**

It’s also very easy to debug. Create this .vscode/launch.json file:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug (Attach)",
      "request": "attach",
      "hostName": "localhost",
      "port": 5005,
    }
  ]
}
```

In order to debug the operator locally, invoke the following command. After this attach the debugger.

```
$ mvn clean quarkus:dev -Dsuspend
```

When you change a custom resource again, the debugger will come up.

![image](/assets/img/2022/03/Screenshot-2022-03-01-at-12.09.01.png)

**What’s next?**

Check out the following resources.

- [Video tutorial](https://www.youtube.com/watch?v=s56LRtdbSB4)
- [Java Operator SDK documentation](https://javaoperatorsdk.io/docs/getting-started)
- [Operator SDK](https://sdk.operatorframework.io/)