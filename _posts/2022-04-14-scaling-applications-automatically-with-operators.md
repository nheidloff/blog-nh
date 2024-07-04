---
id: 5056
title: 'Scaling Applications automatically with Operators'
date: '2022-04-14T02:33:29+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5056'
permalink: /article/scaling-applications-automatically-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/scaling-applications-automatically-operators/
categories:
    - Articles
---

*The real power or Kubernetes operators are not day 1 tasks like the initial deployments, but the automation of day 2 operations. This article describes a sample operator that scales up an application automatically based on the number of API requests.*

The complete source code from this article is available in the [ibm/operator-sample-go repo](https://github.com/IBM/operator-sample-go). The repo includes operator samples that demonstrate patterns and best practises. It also includes another day 2 sample scenario: [Automatically Archiving Data with Kubernetes Operators]({{ "/article/automatically-archiving-data-kubernetes-operators/" | relative_url }}).

The sample contains the following components:

- Prometheus: Stores metrics from various sources and provides query capabilities
- Sample microservice: Provides a /hello endpoint which exposes a counter to Prometheus
- Application operator (core): Deploys the microservice
- Application operator’s CronJob: Separate container which scales up the number of pod instances based on the amount of /hello invocations

To set up and configure Prometheus, check our my previous article [Exporting Metrics from Kubernetes Apps for Prometheus]({{ "/article/exporting-metrics-kubernetes-applications-prometheus/" | relative_url }}). Below I focus on the implementation of the auto-scaler.

The microservice has been implemented with Quarkus. It uses Eclipse MicroProfile to track the number of invocations (see [code](https://github.com/IBM/operator-sample-go/blob/f130dc768df6d9178f6395690f508f0840e0b5ef/simple-microservice/src/main/java/net/heidloff/GreetingResource.java)).

```
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.metrics.annotation.Counted;

@Path("/hello")
public class GreetingResource {
  @ConfigProperty(name = "greeting.message") 
  String message;

  @GET
  @Produces(MediaType.TEXT_PLAIN)
  @Counted(name = "countHelloEndpointInvoked", description = "How often /hello has been invoked")
  public String hello() {
    return String.format("Hello %s", message);        
  }
}
```

To allow Prometheus to scrape these metrics, a [ServiceMonitor](https://github.com/IBM/operator-sample-go/blob/f130dc768df6d9178f6395690f508f0840e0b5ef/simple-microservice/kubernetes/service-monitor.yaml) is used.

```
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  labels:
    app: myapplication
  name: myapplication-metrics-monitor
  namespace: application-beta
spec:
  endpoints:
    - path: /q/metrics
  selector:
    matchLabels:
      app: myapplication
```

With the Prometheus user interface queries to this data can be done.

![image](/assets/img/2022/04/Screenshot-2022-04-12-at-17.52.20.png)

To develop the auto-scaler, a separate image/container is used. This container is an extension to the application controller. The application controller sets up a CronJob for the auto-scaler container so that it is run on a scheduled basis. The [CronJob](https://github.com/IBM/operator-sample-go/blob/f130dc768df6d9178f6395690f508f0840e0b5ef/operator-application-scaler/kubernetes/cronjob.yaml) that is created by the controller looks like this. Note that the application name and namespace are passed in as parameter.

```
apiVersion: batch/v1
kind: CronJob
metadata:
  name: application-scaler
  namespace: operator-application-system
spec:
  schedule: "0 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: application-scale
            image: docker.io/nheidloff/operator-application-scaler:v1.0.2
            imagePullPolicy: IfNotPresent
            env:
            - name: APPLICATION_RESOURCE_NAME
              value: "application"
            - name: APPLICATION_RESOURCE_NAMESPACE
              value: "application-beta"
          restartPolicy: OnFailure
```

The [implementation](https://github.com/IBM/operator-sample-go/blob/f130dc768df6d9178f6395690f508f0840e0b5ef/operator-application-scaler/scaler/scaler.go) of the actual auto-scaler is trivial. I’ve used the [Prometheus Go client library](https://github.com/prometheus/client_golang/). Note that this library is still considered experimental. Alternatively you can use the [Prometheus HTTP API](https://prometheus.io/docs/prometheus/latest/querying/api/).

```
prometheusAddress := "http://prometheus-operated.monitoring:9090"
queryAmountHelloEndpointInvocations := "application_net_heidloff_GreetingResource_countHelloEndpointInvoked_total"
client, err := api.NewClient(api.Config{
  Address: prometheusAddress,
})
if err != nil {
  os.Exit(1)
}
v1api := v1.NewAPI(client)
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
result, warnings, err := v1api.Query(ctx, queryAmountHelloEndpointInvocations, time.Now())
if err != nil {
  os.Exit(1)
}
resultVector, conversionSuccessful := (result).(model.Vector)
if conversionSuccessful == true {
  if resultVector.Len() > 0 {
    firstElement := resultVector[0]
    if firstElement.Value > 5 {
      // Note: '5' is only used for demo purposes
      scaleUp()
    } 
  }
}
```

To learn more about operator patterns and best practices, check out the repo [operator-sample-go](https://github.com/IBM/operator-sample-go). The instructions how to run the auto-scaler demo are in the [documentation](https://github.com/IBM/operator-sample-go/blob/f130dc768df6d9178f6395690f508f0840e0b5ef/operator-application-scaler/README.md).