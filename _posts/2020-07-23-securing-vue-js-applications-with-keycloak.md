---
id: 4117
title: 'Securing Vue.js Applications with Keycloak'
date: '2020-07-23T06:33:26+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4117'
permalink: /article/securing-vue-js-applications-keycloak/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/securing-vue-js-applications-keycloak/
categories:
    - Articles
---

I’ve built a new sample that leverages [Keycloak](https://www.keycloak.org/) to do authentication and authorization in [Vue.js](https://vuejs.org/) and [Quarkus](https://quarkus.io/) applications. This article describes how to authenticate users in Vue.js web applications.

Get the [code](https://github.com/IBM/cloud-native-starter/tree/master/security) from GitHub.

My sample contains a web application which invokes an API microservice and that one invokes a second microservice. To see the results in the web application, users need to be authenticated and they need to have the role ‘user’. Here is the architecture.

![image](/assets/img/2020/07/keycloak-diagram.png)

The Keycloak [documentation](https://www.keycloak.org/getting-started/getting-started-operator-openshift) describes pretty well how to install Keycloak in OpenShift. The difficult part was the creation of the realm which I’ve documented in my previous article [Setting up Keycloak in OpenShift]({{ "/article/setting-up-keycloak-openshift/" | relative_url }}).

There are several ways to use Keycloak from web applications. I’ve found the easiest option is to use the official Keycloak [JavaScript client library](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter) which I defined as dependency in [package.json](https://github.com/IBM/cloud-native-starter/blob/e49348d2849205736067dc447d9adc92cdb39b0d/security/web-app/package.json#L12).

The Vue.js application triggers the authentication directly when the application is opened. See the file [main.js](https://github.com/IBM/cloud-native-starter/blob/e49348d2849205736067dc447d9adc92cdb39b0d/security/web-app/src/main.js):

```
import Keycloak from 'keycloak-js';

let initOptions = {
  url: 'https://keycloak-default.niklas-heidloff-b3c-4x16-162e406f043e20da9b0ef0731954a894-0000.us-south.containers.appdomain.cloud/auth', 
    realm: 'quarkus', clientId: 'frontend', onLoad: 'login-required'
}

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(BootstrapVue);

let keycloak = Keycloak(initOptions);
keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  }

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')

  let payload = {
    idToken: keycloak.idToken,
    accessToken: keycloak.token
  }
  if (keycloak.token && keycloak.idToken && keycloak.token != '' && keycloak.idToken != '') {
    store.commit("login", payload);
    console.log("User has logged in: " + keycloak.subject)
  }
  else {
    store.commit("logout");
  }
```

In order to use the Keycloak API, three pieces of information are required. The Keycloak URL, the realm and the client id. In my previous [article]({{ "/article/setting-up-keycloak-openshift/" | relative_url }}) I describe how to get this information.

As you can see in the code I’m using Vuex to store the access token, id token and user name. When the tokens expire, new tokens are requested via the refresh token und the Vuex store is updated.

![image](/assets/img/2020/07/keycloak-vue.png)

Once authenticated, the Keycloak API can return the subject id, but not the actual user name. That’s why I’ve implemented an [endpoint](https://github.com/IBM/cloud-native-starter/blob/e49348d2849205736067dc447d9adc92cdb39b0d/security/web-api-secure/src/main/java/com/ibm/webapi/UserResource.java) in the Web-API service to read it. I’ve implemented this part with Quarkus. To learn more about this, check out my article [Securing Quarkus Applications with Keycloak]({{ "/article/security-quarkus-applications-keycloak/" | relative_url }}).

```
@Inject
JsonWebToken accessToken;

@GET
@Path("/user")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
public String getUserName() {
   String userName = this.accessToken.getName();
   return "{ \"userName\" : " + "\"" + userName + "\"" + " }";
}
```

Note that this endpoint can only be invoked with valid tokens that are passed in the authorization header. Here is some sample [code](https://github.com/IBM/cloud-native-starter/blob/e49348d2849205736067dc447d9adc92cdb39b0d/security/web-app/src/components/Home.vue).

```
import axios from "axios";
...
readUser() {
  const axiosService = axios.create({
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.$store.state.user.accessToken
    }
  });
  let that = this;
  axiosService.get(this.$store.state.endpoints.api + "user")
    .then(function(response) {
      let payload = {
        name: response.data.userName
      };
      that.$store.commit("setName", payload);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
```

If you want to try this functionality yourself, get the [code](https://github.com/IBM/cloud-native-starter/tree/master/security). I’ve documented how to use [Red Hat OpenShift on the IBM Cloud](https://www.ibm.com/cloud/openshift), but you can also use other Kubernetes distributions or local Docker.