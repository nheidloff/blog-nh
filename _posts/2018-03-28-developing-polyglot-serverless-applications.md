---
id: 2923
title: 'Developing Polyglot Serverless Applications'
date: '2018-03-28T06:46:20+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2923'
permalink: /article/polyglot-serverless-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/polyglot-serverless-applications/
dsq_thread_id:
    - '6580960535'
categories:
    - Articles
---

As serverless platforms mature, more and more sophisticated cloud-native applications are built with serverless technologies. These applications are assembled with potentially many functions that are loosely-coupled and can be developed by different teams.

Teams might choose different languages for the following reasons:

- Reuse existing code or libraries
- Leverage available skills in the team
- Implement more efficient functions

In this article I’m not going to describe how to implement the most efficient functions and when to use which programming language, but certain languages may be better for specific requirements. Some languages might be faster to start, faster to execute code at runtime, require less memory, etc.

I’ve open sourced a sample that shows how to use JavaScript, TypeScript, Java and Kotlin together in a serverless application.

[Get the code from GitHub.](https://github.com/nheidloff/openwhisk-polyglot)

The polyglot ‘send notification’ application sends either emails or text messages to certain users, depending on the information provided in their profiles. Here is the data flow used in this sample, as visualized by [OpenWhisk Composer](https://github.com/ibm-functions/composer).

- The application is triggered with a person ID and a subject.
- The function ‘read-person-profile’ returns the profile for the specific user. The profile contains email addresses and can contain phone numbers.
- If the profile has a phone number, the function ‘send-text-message’ is invoked, otherwise the application proceeds to the ‘send-mail’ function.
- The other functions transfer the data in the format expected by the loosely coupled business logic functions.

![image](/assets/img/2018/03/flow-polyglot.png)

The sample uses [IBM Cloud Functions](https://www.ibm.com/cloud/functions) which is based on [Apache OpenWhisk](http://openwhisk.org/). While the functions are stateless, applications defined with [OpenWhisk Composer ](https://github.com/ibm-functions/composer)manage the state and are responsible for how the data flows between functions. Read my previous [article]({{ "/article/serverless-data-flows" | relative_url }}) to learn more about the data flows and function schemas.

OpenWhisk supports several different programming languages out of the box: JavaScript, Java, Python and [more](https://console.bluemix.net/docs/openwhisk/openwhisk_actions.html#openwhisk_actions). You can also use Docker to implement functions, which is what I’m using in this sample.

Docker provides some advantages that might be important for your requirements:

- You can develop and test the same Docker image locally, which is later deployed and run in the cloud. This minimizes the chance of running into issues due to different environments.
- You can choose the programming languages that your cloud functions provider does not support out of the box.
- You can use new run-time versions sooner than your cloud functions provider might support, for example use Java 9 today in OpenWhisk.

Here are links to the code how to implement OpenWhisk functions with Docker and different languages.

- [JavaScript](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/functions/docker/function.js)
- [TypeScript](https://github.com/nheidloff/openwhisk-polyglot/blob/master/functions/typescript/src/function.ts)
- [Java](https://github.com/nheidloff/openwhisk-polyglot/blob/master/functions/java/spring/src/main/java/docker/Function.java)
- [Kotlin](https://github.com/nheidloff/openwhisk-polyglot/blob/master/functions/kotlin/kotlin/src/main/kotlin/main.kt)

This is the Kotlin function used in the sample. Essentially only one ‘/run’ endpoint needs to be implemented.

```
package openwhisk

import io.javalin.Javalin
import com.fasterxml.jackson.annotation.JsonIgnoreProperties

data class InputObject(val phone: String  = "", val subject: String  = "")
@JsonIgnoreProperties(ignoreUnknown = true)
data class InputFunction(val input: InputObject = InputObject())
@JsonIgnoreProperties(ignoreUnknown = true)
data class InputBody(val value: InputFunction = InputFunction())

data class OutputObject(val phone: String = "", val subject: String = "", val ok: Boolean = true)
data class OutputFunction(val outputsendtextmessage: OutputObject = OutputObject())

fun main(args: Array&lt;String&gt;) {
    val app = Javalin.create().apply {
        port(8080)
        exception(Exception::class.java) { e, ctx -&gt; e.printStackTrace() }
    }.start()

    app.post("/init") { ctx -&gt; ctx.status(200) }

    app.post("/run") { ctx -&gt;
        val body = ctx.bodyAsClass(InputBody::class.java)
        val inputFunction = body.value
        val inputObject = inputFunction.input
        val phone = inputObject.phone
        val subject = inputObject.subject

        // real implementation goes here

        val outputObject = OutputObject(phone, subject)
        val outputFunction = OutputFunction(outputObject)

        ctx.json(outputFunction)
        ctx.status(200)
    }
}
```

Want to run this sample? Try it out on the IBM Cloud; get an account [here](https://ibm.biz/nheidloff).