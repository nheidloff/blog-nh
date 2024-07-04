---
id: 4099
title: 'Setting up Keycloak in OpenShift'
date: '2020-07-21T08:39:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4099'
permalink: /article/setting-up-keycloak-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/setting-up-keycloak-openshift/
categories:
    - Articles
---

I’ve built a new sample that leverages [Keycloak](https://www.keycloak.org/) to do authentication and authorization in Quarkus applications. This article describes how to set up Keycloak in OpenShift, for example [Red Hat OpenShift on IBM Cloud](https://www.ibm.com/cloud/openshift).

Get the [code](https://github.com/IBM/cloud-native-starter/tree/master/security) from GitHub.

My sample contains a web application which invokes an API microservice and then one invokes a second microservice. To see the results in the web application users need to be authenticated and they need to have the role ‘user’. Here is the architecture.

![image](/assets/img/2020/07/keycloak-diagram.png)

The Keycloak [documentation](https://www.keycloak.org/getting-started/getting-started-operator-openshift) describes pretty well how to install Keycloak in OpenShift. The difficult part was the creation of the realm.

Quarkus comes with two great quides that describe how to use Keycloak in web apps and services which require different realm definitions. I’ve merged these two definitions so that they can be imported in one step.

- [Using OpenID Connect to Protect Service Applications](https://quarkus.io/guides/security-openid-connect)
- [Using OpenID Connect to Protect Web Applications](https://quarkus.io/guides/security-openid-connect-web-authentication)

The client frontend is used by the web application, the client backend-service for the two Quarkus microservices. Additionally a test user is created with the role ‘user’.

![image](/assets/img/2020/07/keycloak-clients.png)

The documentation also contains commands that you can run the get the Keycloak URLs and the credentials of the admin, so that you can log in.

{% highlight bash %}
{% raw %}
$ oc get secret credential-example-keycloak -o go-template='{{range $k,$v := .data}}{{printf "%s: " $k}}{{if not $v}}{{$v}}{{else}}{{$v | base64decode}}{{end}}{{"\n"}}{{end}}'
$ KEYCLOAK_URL=https://$(oc get route keycloak --template='{{ .spec.host }}')/auth &&
echo "" &&
echo "Keycloak:                 $KEYCLOAK_URL" &&
echo "Keycloak Admin Console:   $KEYCLOAK_URL/admin" &&
echo "Keycloak Account Console: $KEYCLOAK_URL/realms/myrealm/account" 
{% endraw %}
{% endhighlight %}

In my next article I’ll explain how to do authentication and authorization in Quarkus applications.