---
id: 4444
title: 'Developing Micro Frontends with Single-Spa'
date: '2021-02-22T17:01:04+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4444'
permalink: /article/developing-micro-frontends-single-spa/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-micro-frontends-single-spa/
categories:
    - Articles
---

In the process of building new or modernizing older applications, backend functionality is often broken down in multiple microservices. Without modular frontends though, applications often don’t gain the benefits of modern cloud native architectures like continuous deliveries and the abilities to update components separately from each other.

In my previous article [Using Micro Frontends in Microservices based Architectures]({{ "/article/using-micro-frontends-microservices/" | relative_url }}) I explained how to modularize a sample e-commerce web application. This allows, for example, to add rating functionality to the catalog user experience without impacting other parts of the user interface.

The web application contains four user interface components (implemented with Vue.js) and two non-visible components.

![image](/assets/img/2021/02/app-mod-single-spa-breakdown.png)

**Single-Spa**

[Single-spa](https://single-spa.js.org/docs/getting-started-overview) (which stands for single single page application) is a nice framework to build these modular web applications using a technique called micro frontends.

JavaScript has had the ability to build [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) in the backend for a long time. Node.js developers use this capability on a daily basis. Recently modern browsers have picked up the same capability for web applications. This allows building ‘microservices’ in the frontend by pulling together modules from potentially different sources in browsers.

As always some browsers are faster than others to support new features. For browsers that don’t support JavaScript modules yet there are polyfills, for example [SystemJS](https://github.com/systemjs/systemjs) which is used by single-spa.

**Shell Component**

Single-spa is a rather lightweight framework. Let’s take a look how it works.

In the [index.html](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/shell/src/index.ejs) file three essential things are done:

- Modules of the application are loaded
- Global dependencies are loaded
- Core layout of the application is defined

```
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Electronic and Movie Depot</title>
  <meta name="importmap-type" content="systemjs-importmap" />
  <script type="systemjs-importmap">
    {
      "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.5.1/lib/system/single-spa.min.js",
        "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
        "vue-router": "https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js",
        "rxjs": "http://cdnjs.cloudflare.com/ajax/libs/rxjs/6.6.3/rxjs.umd.min.js",
        "@vue-app-mod/shell": "http://localhost:8080/vue-app-mod-shell.js",        
        "@vue-app-mod/messaging": "http://localhost:9001/vue-app-mod-messaging.js",
        "@vue-app-mod/navigator": "http://localhost:8501/js/app.js", 
        "@vue-app-mod/order": "http://localhost:8504/js/app.js",          
        "@vue-app-mod/catalog": "http://localhost:8503/js/app.js",
        "@vue-app-mod/account": "http://localhost:8502/js/app.js"                   
      }
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/import-map-overrides/dist/import-map-overrides.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/named-exports.js"></script>
  <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet">
  <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<body>
  <div style="display: flex;flex-direction: row;">
    <div id="navigator" style="order: 1;flex-grow: 2;max-width: 300px;width:300px"></div>
    <div id="catalog" style="order: 2; flex-grow: 10;left: 320px;position: fixed;"></div>
    <div id="order" style="order: 2; flex-grow: 10;left: 320px;position: fixed;"></div>
    <div id="account" style="order: 2; flex-grow: 10;left: 320px;position: fixed;"></div>
  </div>
  <script>
    System.import('@vue-app-mod/shell');
  </script>
</body>

</html>
```

Additionally the different user interface components of the application are [registered](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/shell/src/vue-app-mod-shell.js).

```
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@vue-app-mod/navigator",
  app: () => System.import("@vue-app-mod/navigator"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@vue-app-mod/order",
  app: () => System.import("@vue-app-mod/order"),
  activeWhen: ["/", "/catalog", "/order"],
});

registerApplication({
  name: "@vue-app-mod/account",
  app: () => System.import("@vue-app-mod/account"),
  activeWhen: "/account",
});

registerApplication({
  name: "@vue-app-mod/catalog",
  app: () => System.import("@vue-app-mod/catalog"),
  activeWhen: ["/", "/catalog"],
});

start();
```

**Micro Frontends**

The micro frontends can be implemented with basically all common web frameworks, vanilla JS or web components. Here is an example how the navigator micro frontend has been built with Vue.js.

Definition of the [public path](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/navigator/src/set-public-path.js):

```
import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@vue-app-mod/navigator");
```

[Main.js](https://github.com/nheidloff/application-modernization-javaee-quarkus/blob/master/frontend-single-spa/navigator/src/main.js) file of the Vue.js application:

```
import "./set-public-path";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#navigator',
    render(h) {
      return h(App, { props: { githubLink: this.githubLink } });
    },
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

**Development Tool**

Single-spa comes with a built-in development tool. By default single-spa loads all components from the location defined in the index.html file. With the tool you can also overwrite these locations.

This allows, for example, to load most parts of the application from object storage, file servers or web servers. The modules of the application developers are working on can be served locally via mechanisms like webpack.

The screenshot shows the development tool in the browser with which locations of modules can be overwritten.

![image](/assets/img/2021/02/single-spa-dev-tool.png)

**Next Steps**

In my next article I’ll describe how modules in a single-spa application can communicate via events.

To learn more about application modernization, check out my blog series in the [GitHub repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).

</body></html>