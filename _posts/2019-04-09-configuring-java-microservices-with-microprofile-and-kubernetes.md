---
id: 3503
title: 'Configuring Microservices with MicroProfile and Kubernetes'
date: '2019-04-09T06:26:03+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3503'
permalink: /article/configuring-java-microservices-microprofile-kubernetes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/configuring-java-microservices-microprofile-kubernetes/
categories:
    - Articles
---

As defined in the [Twelve-Factor-App](https://12factor.net/config) it’s important for cloud-native applications to store configuration externally, rather than in the code since this makes it possible to deploy applications to different environments.

> An app’s config is everything that is likely to vary between deploys (staging, production, developer environments, etc). This includes: Resource handles to … backing services. Credentials to external services …

Microservices that are implemented with Java EE can leverage [MicroProfile Config](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php#configistio). The configuration can be done, for example, in Kubernetes yaml files and accessed from Java code via annotations and APIs.

Here is a simple example from the [cloud-native-starter](https://github.com/nheidloff/cloud-native-starter) repo. The ‘articles’ service uses configuration to define whether or not to create ten articles the first time it is invoked.In the [yaml](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/deployment/kubernetes.yaml) file an environment variable pointing to a ConfigMap is defined.

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
        env:
        - name: samplescreation
          valueFrom:
            configMapKeyRef:
              name: articles-config
              key: samplescreation
      restartPolicy: Always
---
kind: ConfigMap
apiVersion: v1
metadata:
  name: articles-config
data:
  samplescreation: CREATE
```

In the [Java code](https://github.com/nheidloff/cloud-native-starter/blob/master/articles-java-jee/src/main/java/com/ibm/articles/business/CoreService.java) the configuration can be accessed via @Inject and @ConfigProperty.

```
public class CoreService {
  private static final String CREATE_SAMPLES = "CREATE";
  @Inject
  @ConfigProperty(name = "samplescreation", defaultValue = "dontcreate")
  private String samplescreation;
  @PostConstruct
  private void addArticles() {
    if (samplescreation.equalsIgnoreCase(CREATE_SAMPLES))
      addSampleArticles();
    }
```

Note that you cannot access the injected variable in the constructor. Instead use the @PostConstruct annotation. Thanks to Emily Jiang for figuring this out.  
If you want to try this feature and many other MicroProfile and Istio features, get the [code](https://github.com/nheidloff/cloud-native-starter) from the cloud-native-starter repo and run these commands.

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ scripts/check-prerequisites.sh
$ scripts/deploy-articles-java-jee.sh
$ scripts/show-urls.sh
```

To learn more about MicroProfile Config, check out these resources:

- [OpenLiberty guide: Configuring microservices](https://openliberty.io/guides/microprofile-config.html#injecting-static-configuration)
- [MicroProfile Config in Istio](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php#configistio)
- [MicroProfile Configuration Feature](https://microprofile.io/project/eclipse/microprofile-config)
- [How to externalize the configuration for flexibility and easier deployment](https://www.ibm.com/blogs/bluemix/2018/10/migrate-java-microservices-from-spring-to-microprofile-p4a/)
- [Configure your app using Eclipse MicroProfile Config](https://developer.ibm.com/patterns/configure-your-app-using-eclipse-microprofile-config/)