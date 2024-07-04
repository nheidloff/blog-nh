---
id: 2869
title: 'Developing OpenWhisk Functions with Kotlin in IntelliJ'
date: '2018-03-09T10:22:47+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2869'
permalink: /article/openwhisk-kotlin-intellij-docker/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/openwhisk-kotlin-intellij-docker/
dsq_thread_id:
    - '6533760573'
categories:
    - Articles
---

I’ve implemented some code that shows how [Apache OpenWhisk](http://openwhisk.org/) functions can be developed with [Kotlin](https://kotlinlang.org/). The Java code is built via Gradle and put into a Docker image which can be deployed to OpenWhisk cloud providers like the [IBM Cloud](https://bluemix.net/).

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-docker-kotlin)

There are different approaches to write OpenWhisk functions with Kotlin. Check out this separate [article](https://medium.com/openwhisk/serverless-kotlin-how-to-run-a-kotlin-action-on-openwhisk-3986963f2dd0) which describes how to generate a jar file which is directly deployed on OpenWhisk.

The approach taken in my sample is slightly different. Rather than deploying a jar file to the [OpenWhisk Java runtime](https://github.com/apache/incubator-openwhisk-runtime-java), a Docker image that contains the jar file is used instead. The advantage of this approach is that it allows to use different Java versions and you can develop and test the same Docker image locally which is later deployed and run in the cloud. This minimizes the chances to run into issues because of different environments.

Here is a screenshot that shows the Kotlin code in IntelliJ:

![image](/assets/img/2018/03/kotlin-openwhisk.png)

The sample function can be invoked locally via this command.

```
$ curl --request POST \
  --url http://localhost:8080/run \
  --header 'Cache-Control: no-cache' \
  --header 'Content-Type: application/json' \  
  --data '{ "value": {"parameter1":"Niklas","parameter2":"Heidloff"}}'
```

This is the response of the function:

```
{
   "param1": "value1 Niklas",
   "param2": "value2"
}
```

Let’s take a look at the [code](https://github.com/nheidloff/openwhisk-docker-kotlin/blob/master/kotlin/src/main/kotlin/main.kt):

```
import io.javalin.Javalin
import com.fasterxml.jackson.annotation.JsonIgnoreProperties

data class InputObject(val parameter1: String  = "", val parameter2: String  = "")
@JsonIgnoreProperties(ignoreUnknown = true)
data class InputBody(val value: InputObject = InputObject())
data class OutputObject(val param1: String, val param2: String)

fun main(args: Array<String>) {
    val app = Javalin.create().apply {
        port(8080)
        exception(Exception::class.java) { e, ctx -> e.printStackTrace() }
    }.start()

    app.post("/init") { ctx -> ctx.status(200) }

    app.post("/run") { ctx ->
        val body = ctx.bodyAsClass(InputBody::class.java)
        val inputObject = body.value

        val outputObject = OutputObject("value1 " + inputObject.parameter1, "value2")
        ctx.json(outputObject)
        ctx.status(200)
    }
}
```

As web framework I’ve picked [Javalin](https://javalin.io/) and I’ve implemented two endpoints ‘/init’ and ‘/run’. The actual implementation of the function goes in the run function.

The inputs and the outputs of the function are defined in data classes at the top. The mapping between classes and JSON data is done automatically by Kotlin/Jackson.

I like that the code has only 27 lines. The [same function that I developed with Java](https://github.com/nheidloff/openwhisk-debug-java) has more than 100 lines of code.

If you want to try out OpenWhisk in the cloud, you can get an account on the [IBM Cloud](http://ibm.biz/nheidloff).