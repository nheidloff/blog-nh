---
id: 2374
title: 'Reducing Deployment Risks via Policies for Jenkins Pipelines'
date: '2017-06-16T10:42:51+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2374'
permalink: /article/reducing-deployment-risks-jenkins-pipelines/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/reducing-deployment-risks-jenkins-pipelines/
dsq_thread_id:
    - '5936409422'
categories:
    - Articles
---

Earlier this year IBM [introduced](https://www.ibm.com/blogs/bluemix/2017/03/announcing-devops-insights-beta/) a new service [DevOps Insights](https://console.ng.bluemix.net/docs/services/DevOpsInsights/index.html#gettingstarted) (beta) which helps among other things to reduce deployment risks. Policies can be defined to ensure that unit tests, functional tests and other tests pass before new versions of applications are deployed.

As I [blogged]({{ "/article/reduce-deployment-risk-devops-bluemix" | relative_url }}) earlier this functionality can be used for IBM DevOps Delivery Pipelines. Additionally it can also be used for Jenkins projects since [data can be sent from Jenkins to other tools]({{ "/article/jenkins-devops-toolchains-bluemix" | relative_url }}) like IBM DevOps Insights that are in the same [toolchain](https://www.ibm.com/devops/method/category/tools/).

In the following example a [gate](https://console.ng.bluemix.net/docs/services/DevOpsInsights/risk_cd.html#integrating-with-continuous-delivery-pipeline) has been defined with a policy to enforce that all unit tests pass before the application can be deployed into production.

![jenkins-risk3](/assets/img/2017/06/jenkins-risk3.png)

For demo purposes I broke some unit tests. The following screenshot shows that in this case the gate stage fails.

![jenkins-risk7](/assets/img/2017/06/jenkins-risk7.png)

Check out the [Jenkinsfile](https://github.com/nheidloff/DemoDRA-1/blob/master/Jenkinsfile#L108-L113) how to leverage the gate.

```
stage('Gate') {
   steps {
      // use "evaluateGate" method to leverage IBM Cloud DevOps gate
      evaluateGate policy: 'Weather App Policy', forceDecision: 'true'
   }
}
```

You can also see the build and deployment status on the Deployment Risk page of the DevOps Insights service.

![jenkins-risk6](/assets/img/2017/06/jenkins-risk6.png)

In order to try this functionality yourself, you can follow these high level steps:

- Set up a local Jenkins Docker container, install the CF CLI and configure Jenkins
- Open [bluemix.net/devops](https://bluemix.net/devops) and create a new toolchain based on the sample “Deployment Risk Analytics with GitHub and Jenkins”
- Fork the GitHub project that comes with a [sample weather application](https://github.com/nheidloff/DemoDRA-1), a Jenkinsfile and various types of tests
- Replace the values of the environment variables at the top of the [Jenkinsfile](https://github.com/nheidloff/DemoDRA-1/blob/master/Jenkinsfile)
- In Jenkins create a new Pipeline project and paste the Jenkinsfile as the pipeline script
- Run the build

In order to demo a failure you can break unit tests by replacing the unit tests JavaScript [file](https://github.com/nheidloff/DemoDRA-1/blob/master/tests/server/apiv1.spec.js) with this [file](https://github.com/nheidloff/DemoDRA-1/blob/master/tests/server/apiv1.spec.js.fail).

Thanks a lot to my colleagues Eric Jodet, Xunrong Li and Vijay Jegaselvan for helping me setting this up and providing the sample application!