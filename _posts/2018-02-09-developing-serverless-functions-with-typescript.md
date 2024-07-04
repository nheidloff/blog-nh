---
id: 2788
title: 'Developing Serverless Functions with TypeScript'
date: '2018-02-09T10:19:19+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2788'
permalink: /article/serverless-functions-typescript-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6468494100'
custom_permalink:
    - article/serverless-functions-typescript-openwhisk/
categories:
    - Articles
---

One of the coolest capabilities of [Apache OpenWhisk](https://openwhisk.apache.org) is the ability to develop functions with Docker. This allows you to develop functions in languages which are not supported out of the box by the platform.

I’ve open sourced a sample that shows how to develop and debug functions with TypeScript. I’m a big fan of [TypeScript](https://www.typescriptlang.org/) since it adds a type system to JavaScript which makes me more productive.

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-debug-nodejs)

Here is a very simple TypeScript function. The /run endpoint is where the actual implementation of the function goes.

```
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express()
app.use(bodyParser.json());

app.post('/run', (req, res) => {
    var payload = (req.body || {}).value;

    var result = { 
        "result": {
            "echo": payload
        }
    }
    res.status(200).json(result);
});

app.post('/init', function (req, res) {
    try {
        res.status(200).send();
    }
    catch (e) {
        res.status(500).send();
    }
});

app.listen(8080, () => console.log('Listening on port 8080'))
```

Based on [this recipe](https://github.com/Microsoft/vscode-recipes/tree/master/Docker-TypeScript) I’ve also documented how you can debug TypeScript code running in a Docker container from Visual Studio Code. In order to debug TypeScript code, the same mechanism is used which I explain in this [video](https://www.youtube.com/watch?v=P9hpcOqQ3hw). A volume is used to share the files between the IDE and the container and VS Code attaches a remote debugger to the Docker container. The functions can be changed in the IDE without having to restart the container. nodemon restarts the Node application in the container automatically when files change.

This is a screenshot of the debugger in VS Code.

![image](/assets/img/2018/02/debugging-typescript.png)

If you want to try out OpenWhisk in the cloud, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff).