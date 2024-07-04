---
id: 3529
title: 'Implementing Health Checks with MicroProfile and Istio'
date: '2019-04-09T09:06:14+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3529'
permalink: /article/implementing-health-checks-microprofile-istio/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/implementing-health-checks-microprofile-istio/
categories:
    - Articles
---

When running cloud-native applications in the orchestration framework [Kubernetes](https://kubernetes.io/) and the service mesh [Istio](https://istio.io/), microservices need to report whether they are ready and live. Kubernetes needs to know this to restart containers if necessary. Istio needs to know this information to define where to route requests to.

With the Kubernetes livenessProbe it is determined whether, as the name indicates, the pod is live. Pods that are live might not be ready though, for example when they just started and still need to load data. That’s why there is a second readinessProbe.

I’ve implemented some sample code that shows how to develop these health checks with [Eclipse MicroProfile](https://microprofile.io/).

Get the code of [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) from GitHub.

Here is the [Java code](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/src/main/java/com/ibm/articles/apis/HealthEndpoint.java) which returns for the ‘articles’ service that the microservice is ready.

```
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import javax.enterprise.context.ApplicationScoped;

@Health
@ApplicationScoped
public class HealthEndpoint implements HealthCheck {

    @Override
    public HealthCheckResponse call() {
        return HealthCheckResponse.named("articles").withData("articles", "ok").up().build();
    }
}
```

In the Kubernetes [yaml file](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/deployment/kubernetes.yaml) the URLs of the livenessProbe and the readinessProbe are defined.

```
kind: Deployment
apiVersion: apps/v1beta1
metadata:
  name: articles
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: articles
        version: v1
    spec:
      containers:
      - name: articles
        image: articles:1
        ports:
        - containerPort: 8080
        livenessProbe:
          exec:
            command: ["sh", "-c", "curl -s http://localhost:8080/"]
          initialDelaySeconds: 20
        readinessProbe:
          exec:
            command: ["sh", "-c", "curl -s http://localhost:8080/health | grep -q articles"]
          initialDelaySeconds: 40
      restartPolicy: Always
```

If you want to run this demo yourself in Minikube, get the code from GitHub and invoke these commands:

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ scripts/check-prerequisites.sh
$ scripts/deploy-articles-java-jee.sh
$ kubectl get pods --watch
$ minikube dashboard
```

To learn more about health checks, take a look at these articles:

- [Open Liberty guide: Adding health reports to microservices](https://openliberty.io/guides/microprofile-health.html)
- [MicroProfile Health](https://microprofile.io/project/eclipse/microprofile-health)
- [MicroProfile Health Check in Istio](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php#healthcheck)