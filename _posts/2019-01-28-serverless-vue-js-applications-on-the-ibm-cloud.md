---
id: 3234
title: 'Serverless Vue.js Applications on the IBM Cloud'
date: '2019-01-28T13:26:20+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3234'
permalink: /article/serverless-vuejs-ibm-cloud/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7193818122'
custom_permalink:
    - article/serverless-vuejs-ibm-cloud/
categories:
    - Articles
---

Recently I open sourced sample code that shows how to [develop entire serverless web applications](https://github.com/nheidloff/serverless-web-application-ibm-cloud) on the IBM Cloud with [Apache OpenWhisk](https://openwhisk.apache.org/). In the original sample I used an Angular application. In this article I describe how to deploy [Vue.js](https://vuejs.org/) applications on the IBM Cloud.

[Get the code from GitHub.](https://github.com/IBM/blue-cloud-mirror/tree/master/game)

The static file resources are stored on [IBM Cloud Object Storage](https://console.bluemix.net/catalog/services/cloud-object-storage). I’ve written a [script](https://github.com/IBM/blue-cloud-mirror/blob/master/scripts/object-storage-upload-files-domain.sh) that uploads a complete directory to object storage and marks all files as publically accessible. This is one of the curl commands:

```
curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: text/plain; charset=utf-8" \
          --upload-file "${root_folder}/../game/dist/${f}";
```

There are two options to [deploy web applications as serverless applications](https://github.com/IBM/blue-cloud-mirror/tree/master/game#option-2b-deployment-as-serverless-application) which have pros and cons.

**Option 1: Cloud Object Storage (only)**  
One disadvantage of this option is that the URL will be rather long, e.g. ‘https://s3.us-south.objectstorage.softlayer.net/emotions-demo-niklasheidloffdeibmcom/index.html’. Custom domains cannot be used.

Another disadvantage of this option is that you can only invoke the URL ‘https://xxxxxx/index.html’. You can not invoke ‘https://xxxxxx/home’, ‘https://xxxxxx/start’, etc. and page reloads don’t work.

The path (which is the unique bucket name) needs to be put in ‘vue.config.js’:

```
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'emotions-demo-niklasheidloffdeibmcom/'
    : '/'
}
```

**Option 2: Cloud Object Storage and Custom Domain**  
One advantage of this option is that you can use a custom domain, e.g. ‘https://www.heidloff.eu/demo/game’. Another advantage is that you can open pages like ‘https://xxx/start’ directly and page reloads work too.

In order to use a custom domain an OpenWhisk function is used to load ‘index.html’. All other files are stored in Cloud Object Storage.

The deployment of these applications requires some configuration changes. The default Vue.js build process (when using the Vue CLI to create applications) creates builds that use for different versions hashes in the file names. Additionally multiple files are generated to allow later loading of code that is initially not used. I had to change ‘[vue.config.js](https://github.com/IBM/blue-cloud-mirror/blob/master/game/vue.config.js.customdomain.template)‘ to turn off these features unfortunately.

```
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/demo/game/'
    : '/',
  filenameHashing: false,
  
  chainWebpack: config => {
    config.plugins.delete('split-vendor')
    config.optimization.splitChunks(false)
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    
  },
  productionSourceMap: false,
}
```

I’ve created another [script](https://github.com/IBM/blue-cloud-mirror/blob/master/scripts/openwhisk-create-html.sh) to create the OpenWhisk function and API. The same script also changes the URLs to point to Cloud Storage.

Additionally I had to change the [relative URLs to images](https://github.com/IBM/blue-cloud-mirror/blob/master/game/src/views/Results.vue#L413) and other resources. In order to do this I’ve defined the URL to the Cloud Object Storage bucket in store.ts and use it when accessing images, models, etc.

This is a screenshot of the sample app running on my domain.

![image](/assets/img/2019/01/custom-domain.png)