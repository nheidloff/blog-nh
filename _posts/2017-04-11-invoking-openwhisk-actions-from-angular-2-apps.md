---
id: 2246
title: 'Invoking OpenWhisk Actions from Angular 2 Apps'
date: '2017-04-11T14:14:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2246'
permalink: /article/openwhisk-angular-2-bluemix-serverless/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openwhisk-angular-2-bluemix-serverless/
dsq_thread_id:
    - '5936381192'
categories:
    - Articles
---

In my last blog entry I documented how to [deploy Angular 2+ apps to Bluemix]({{ "/article/angular-2-bluemix-docker-nginx" | relative_url }}) via the HTTP server nginx. All that server does it to host the static files. Below I describe how to use [OpenWhisk](https://developer.ibm.com/openwhisk/) actions for server-side business logic that can be invoked from Angular apps.

In order to avoid cross origin security errors proxy servers need to be used. Fortunately both the local web server that is installed via the Angular CLI and nginx can be configured as proxies.

I’m using the same simple app again from my last [blog]({{ "/article/angular-2-bluemix-docker-nginx" | relative_url }}) entry with one new button that triggers an OpenWhisk action.

![angular-ow2](/assets/img/2017/04/angular-ow2.png)

The [OpenWhisk](https://console.ng.bluemix.net/openwhisk/editor) action ‘ActionInvokedFromAngular’ basically echos the input:

```
function main(params) {
   return { "message": "you sent me " + params.message };
}
```

The file ‘app.component.html’ contains the button and displays the OpenWhisk result:

{% highlight html %}
{% raw %}
<button (click)="onButtonClicked()" class="btn btn-primary">Invoke OpenWhisk Action</button>
<br><br>
<div style="white-space: pre;">{{ getResult() }}</div>
{% endraw %}
{% endhighlight %}

In ‘app.component.ts’ the [OpenWhisk REST API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/openwhisk/openwhisk/master/core/controller/src/main/resources/whiskswagger.json) is invoked. You need to copy your key from [OpenWhisk](https://console.ng.bluemix.net/openwhisk/learn/cli) and paste it in the code below. Please note that you shouldn’t put the credentials in your client side code for production apps since they would be easy to discover. Via [Web Actions](https://console.ng.bluemix.net/docs/openwhisk/openwhisk_webactions.html#openwhisk_webactions) web applications can access anonymously OpenWhisk actions without requiring OpenWhisk authentication keys.

```
import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
declare const Buffer

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openWhiskResponse = '';

  constructor(private http: Http) {
  }

  onButtonClicked() {
    let openWhiskActionName: string = 'ActionInvokedFromAngular';
    let openWhiskApiKey: string = 'xxx:xxx';// copy from https://console.ng.bluemix.net/openwhisk/learn/cli

    let url = "/api/v1/namespaces/_/actions/" + openWhiskActionName + "?blocking=true";
    openWhiskApiKey = "Basic " + new Buffer(openWhiskApiKey).toString('base64');
    let headers: Headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': openWhiskApiKey });
    let options = new RequestOptions({ headers: headers });

    let payload: any = {
      message: 'some value'
    };

    this.http.post(url, payload, options)
      .map(res => res.json())
      .subscribe(
      result => {
        console.log("OpenWhisk action returned successfully");
        this.openWhiskResponse = result;
        console.log(result.response.result)
      },
      err => {
        console.warn("OpenWhisk action invocation failed", err);
      });
  }

  getResult() {
    return JSON.stringify(this.openWhiskResponse, null, 3)
  }
}
```

In order to use a [local proxy](https://github.com/angular/angular-cli/wiki/stories-proxy) change one line in ‘package.json’:

```
"start": "ng serve --proxy-config proxy.conf.json",
```

Put the proxy.conf.json in the project’s root directory so that you can run the app locally via “npm start”.

proxy.conf.json:

```
{
  "/**": {
    "target": {
        "host": "openwhisk.ng.bluemix.net",
        "protocol": "https:",
        "port": 443
      },
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

The configuration of the nginx proxy is already done in the previous [blog]({{ "/article/angular-2-bluemix-docker-nginx" | relative_url }}) entry in ‘nginx.conf’. You can deploy the app again via the following commands:

```
ng build --prod
docker build -t angular-app .
docker tag angular-app registry.ng.bluemix.net/nheidloff/angular-app
docker push registry.ng.bluemix.net/nheidloff/angular-app
bx ic run --name angular-app -p 80 -m 128 registry.ng.bluemix.net/nheidloff/angular-app
bx ic ips
bx ic ip-bind 169.46.26.176 angular-app
```