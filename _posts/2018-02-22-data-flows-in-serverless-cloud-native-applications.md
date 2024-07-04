---
id: 2834
title: 'Data Flows in Serverless Cloud-Native Applications'
date: '2018-02-22T15:15:15+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2834'
permalink: /article/serverless-data-flows/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6497432121'
custom_permalink:
    - article/serverless-data-flows/
categories:
    - Articles
---

Serverless platforms like [Apache OpenWhisk](https://openwhisk.apache.org/) are gaining more and more traction. Rather than building only single functions, developers are starting to develop cloud-native applications with many serverless functions/microservices.

The challenge when building serverless cloud-native applications is how to orchestrate the different functions and how to manage the data flows between the functions. Especially if you want loosely-coupled functions without dependencies between each other, you need a good strategy how to handle the data flows.

IBM open sourced [Composer](https://github.com/ibm-functions/composer) which is an extension to Apache OpenWhisk. With Composer applications can be defined which contain multiple functions. While the functions are stateless, the applications manage the state between the different function invocations. Read my previous [article]({{ "/article/serverless-apps-cloud-functions-composition-flows" | relative_url }}) for a short Composer introduction.

With Composer applications can be defined either declaratively via JSON or programmatically via JavaScript. Below I describe a pattern how to handle the data flows in applications programmatically.

Before I explain the pattern, let me summarize my requirements:

- Input parameters of applications need to be accessible in all functions
- Output parameters of previous functions need to be accessible in all later functions
- Functions should have well defined inputs and outputs (schemas)
- Functions get their inputs in the expected format and don’t have to parse anything first
- Not handled in this article: Applications shouldn’t break when functions have new schema versions

For my simple sample application I use two simple functions. This is the first function ‘[simple1.js](https://github.com/nheidloff/openwhisk-data-flows/blob/master/functions/simple1.js)‘:

```
let main = params => {
    let inputParameters = params.input;
    let outputParameters = {
        'output-simple1': {
            'some-parameter': 'value of some-parameter in simple1'
        }
    }
    return outputParameters;
}
```

This is the second function ‘[simple2.js](https://github.com/nheidloff/openwhisk-data-flows/blob/master/functions/simple2.js)‘:

```
let main = params => {
    let inputParameters = params.input;
    let outputParameters = {
        'output-simple2': {
            'some-parameter': 'value of some-parameter in simple2',
            'echo-input-parameters': inputParameters
        }
    }
    return outputParameters;
}
```

This is the sample application ‘[in-app-conversions.js](https://github.com/nheidloff/openwhisk-data-flows/blob/master/apps/in-app-conversions.js)‘. The application has only two functions which are executed sequentially.

```
composer.sequence(
    params => {
        params['input'] = {
            'input-param1': params['input-param1']
            // add more transformations here 
        }
        return params;
    },
    composer.task('composer-demo-nh/simple1', { merge: true }),
    params => {
        params['input'] = {
            'input-param1': params['input-param1'],
            'some-more-input-for': 'simple2 function'
            // add more transformations here 
        }
        return params;
    },
    composer.task('composer-demo-nh/simple2', { merge: true })
)
```

Before I explain the application, here is the output of the ‘fsh app invoke’ command:

```
$ fsh app invoke composer-demo-nh/in-app-conversions -p input-param1 input-param1-value
```

```
{
  input-param1: "input-param1-value",
  output-simple1: {
    some-parameter: "value of some-parameter in simple1"
  },
  input: {
    input-param1: "input-param1-value",
    some-more-input-for: "simple2 function"
  },
  output-simple2: {
    some-parameter: "value of some-parameter in simple2",
    echo-input-parameters: {
      input-param1: "input-param1-value",
      some-more-input-for: "simple2 function"
    }
  }
}
```

Let me now describe how the application works:

- In order to access all input parameters of the application (in this case ‘input-param1’) ‘[merge: true](https://github.com/ibm-functions/composer/blob/master/docs/COMPOSER.md#composertasktask-options)‘ is used which merges the inputs and outputs of functions together.
- In order to avoid naming collisions when merging, a simple naming convention is used. Each function puts it’s output in an unique ‘namespace’, for example ‘output-simple1’.
- The ‘params’ object contains the inputs of the applications and the outputs of all functions. In order to access the input of a function within a specific function, the function reads the subset of data from ‘params.input’.
- The conversions are done via JavaScript in the application directly by inserting a JavaScript [task](https://github.com/ibm-functions/composer/blob/master/docs/COMPOSER.md#composertasktask-options) between the functions.

This is the visualization of the sample application in the fsh shell:

![image](/assets/img/2018/02/data-flow-sample2.png)

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-data-flows)

In a future article [Transforming JSON Data in Serverless Applications]({{ "/article/transforming-json-serverless" | relative_url }}) I will extend this sample to demonstrate how to handle more complex scenarios and and how to do conversions between JSON via a nice open source project that supports ‘JSON schemas’.

If you want to try out OpenWhisk in the cloud, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff).