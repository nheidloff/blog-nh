---
id: 5001
title: 'Building Databases on Kubernetes with Quarkus'
date: '2022-04-07T06:29:48+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5001'
permalink: /article/building-databases-kubernetes-quarkus/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/building-databases-kubernetes-quarkus/
categories:
    - Articles
---

*While there are plenty of examples how to write stateless applications on Kubernetes, there are relative few simple samples explaining how to write stateful applications. This article describes how to write a simple database system with Quarkus.*

The complete code of this article can be found in the [ibm/operator-sample-go](https://github.com/IBM/operator-sample-go/tree/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service) repo.

My previous article [How to build your own Database on Kubernetes]({{ "/article/how-to-build-your-own-database-on-kubernetes/" | relative_url }}) explains the concepts how stateful workloads can be run on Kubernetes. Before reading on, make sure you understand StatefulSets. To recap, here are the main components.

![image](/assets/img/2022/04/statefulsets1.png)

Let’s look at the [StatefulSet definition](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/kubernetes/statefulset.yaml) first:

```
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: database-cluster
  namespace: database
  labels:
    app: database-cluster
spec:
  serviceName: database-service
  replicas: 3
  selector:
    matchLabels:
      app: database-cluster
  template:
    metadata:
      labels:
        app: database-cluster
    spec:
      securityContext:
        fsGroup: 2000
      terminationGracePeriodSeconds: 10
      containers:
      - name: database-container
        image: nheidloff/database-service:v1.0.22
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8089
          name: api
        volumeMounts:
        - name: data-volume
          mountPath: /data
        env:
          - name: DATA_DIRECTORY
            value: /data/
          - name: POD_NAME
            valueFrom:
              fieldRef:
                apiVersion: v1
                fieldPath: metadata.name
          - name: NAMESPACE
            valueFrom:
              fieldRef:
                apiVersion: v1
                fieldPath: metadata.namespace
  volumeClaimTemplates:
  - metadata:
      name: data-volume
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: ibmc-vpc-block-5iops-tier
      resources:
        requests:
          storage: 1Mi
```

Notes about the stateful set:

- There are three replicas: One lead and two followers.
- A storage class is used to provision volumes automatically.
- Each pod/container has its own volume.
- The volume is mounted into the container.
- To allow containers to read metadata like their pod names, environment variables are used.
- The security context is set to “fsGroup: 2000” which allows file access from the Quarkus image.

To access the pods, a [service is defined](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/kubernetes/service.yaml). For example the leader can be invoked via “http://database-cluster-0.database-service.database:8089/persons”.

```
apiVersion: v1
kind: Service
metadata:
  labels:
    app: database-service
  name: database-service
  namespace: database
spec:
  clusterIP: None
  ports:
  - port: 8089
  selector:
    app: database-cluster
```

The database service uses a single [JSON file](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/data.json) for storage. For the leader the file is created when the leader is initialized. Followers [synchronize](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/src/main/java/heidloff/net/database/DataSynchronization.java#L18) the data from the leader when they are initialized.

```
public static Response synchronizeDataFromLeader(LeaderUtils leaderUtils, PersonResource personResource) {
    System.out.println("LeaderUtils.synchronizeDataFromLeader()");
    String leaderAddress = "http://database-cluster-0.database-service.database:8089/persons";
    int httpStatus = 200; 
    if (leaderUtils.isLeader() == true) {
        httpStatus = 501; // Not Implemented
    } else {
        Set<Person> persons = null;
        try {
            // Note: This follower should update from the previous follower (or leader)
            // For simplification purposes updates are only read from the leader
            URL apiUrl = new URL(leaderAddress);
            System.out.println("Leader found. URL: " + leaderAddress);
            RemoteDatabaseService customRestClient = RestClientBuilder.newBuilder().baseUrl(apiUrl).
                register(ExceptionMapper.class).build(RemoteDatabaseService.class);
            persons = customRestClient.getAll();                
        } catch (Exception e) {
            System.out.println("/persons could not be invoked");
            httpStatus = 503; // Service Unavailable
        }
        if (persons != null) {
            try {
                personResource.updateAllPersons(persons);    
            } catch (RuntimeException e) {
                System.out.println("Data could not be written");
                httpStatus = 503; // Service Unavailable
            }                
        }
    }
    return Response.status(httpStatus).build();    
}
```

Write operations are only allowed on the leader. When they are executed on the leader, the followers need to be notified to update their state (see [code](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/src/main/java/heidloff/net/database/DataSynchronization.java#L52)).

```
public static void notifyFollowers() {
    KubernetesClient client = new DefaultKubernetesClient();        
    String serviceName = "database-service";
    String namespace = System.getenv("NAMESPACE");     
    PodList podList = client.pods().inNamespace(namespace).list();
    podList.getItems().forEach(pod -> {
        if (pod.getMetadata().getName().endsWith("-0") == false) {
            String followerAddress =  pod.getMetadata().getName() + "." + serviceName + "." + namespace + ":8089";
            System.out.println("Follower found: " + pod.getMetadata().getName() + " - " + followerAddress);
            try {
                URL apiUrl = new URL("http://" + followerAddress + "/api/onleaderupdated");
                RemoteDatabaseService customRestClient = RestClientBuilder.newBuilder().
                register(ExceptionMapper.class).baseUrl(apiUrl).build(RemoteDatabaseService.class);
                customRestClient.onLeaderUpdated();              
            } catch (Exception e) { 
                System.out.println("/onleaderupdated could not be invoked");
            }
        }
    });
}
```

The next question is how the leader is determined. In this [sample](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/src/main/java/heidloff/net/database/LeaderUtils.java#L88) a simple mechanism is used which is to check whether the container’s pod name ends with “-0”.

```
public void electLeader() {     
    String podName = System.getenv("POD_NAME");
    if ((podName != null) && (podName.endsWith("-0"))) {
        setLeader(true);
    }
}
```

The state of all pods is stored on the volumes too ([podstate.json](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/podstate.json)) so that the new pods can continue with the state previous pod instances left off.

To simulate a real database system, the database application has [SQL-like APIs](https://github.com/IBM/operator-sample-go/blob/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service/src/main/java/heidloff/net/database/API.java) to execute statements and queries.

![image](/assets/img/2022/04/Screenshot-2022-04-07-at-08.18.07.png)

To learn more, check out the complete [source code](https://github.com/IBM/operator-sample-go/tree/8ce338d65d2cc9f8db437e3aa635f94a45156922/database-service).