---
id: 2802
title: 'Accessing Machine Learning Models via REST APIs'
date: '2018-02-15T14:10:55+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2802'
permalink: /article/machine-learning-models-rest-apis/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6481746237'
custom_permalink:
    - article/machine-learning-models-rest-apis/
categories:
    - Articles
---

[Watson Machine Learning](https://console.bluemix.net/catalog/services/machine-learning) can be used by data scientists to create models which can be managed and deployed on the IBM Cloud. Developers can access these models from applications, for example to run predictions.

I blogged about a [sample scenario]({{ "/article/watson-machine-learning-sample" | relative_url }}) to predict whether people would have survived the Titanic accident based on their age, ticket class, sex and number of siblings and spouses on board the Titanic.

The screenshot shows the endpoint developers can use to access the deployed model via HTTP. In order to protect the endpoint, the credentials of the machine learning service are needed. With these credentials a bearer token is read that is needed for the actual [prediction endpoint invocation](https://watson-ml-api.mybluemix.net/#!/Deployments/post_v3_wml_instances_instance_id_published_models_published_model_id_deployments_deployment_id_online).

![image](/assets/img/2018/02/ml-api-0.png)

While this mechanism works for smaller teams and projects I’d guess that at some point you’d want API management capabilities so that developers don’t have to have the credentials of the machine learning service and so that you can better track the REST API invocations.

That’s why I have built a little demo that shows how to use [API Connect](https://console.bluemix.net/catalog/services/api-connect) on top of the Watson Machine Learning endpoint.

First I created a new API with only one POST REST API. In the assembly of this API there are four steps. First the token is read from Watson Machine Learning. This requires the machine learning credentials. In the second step the received token as well as the original content in the body field are put in a message JSON object. This message object can be accessed in the third step where the headers for the second invocation are set. In the last step the actual prediction endpoint is invoked.

![image](/assets/img/2018/02/ml-api-1.png)

For the demo I secured the API with a client id only which developers can request via a portal. You could also use additionally secrets, OAuth and other security mechanisms.

![image](/assets/img/2018/02/ml-api-2.png)

From the portal developers invoke the APIs.

![image](/assets/img/2018/02/ml-api-3.png)

Since not everything fits on the screenshot above, here is another screenshot from a curl command.

![image](/assets/img/2018/02/ml-api-4.png)

To find out more about Watson Machine Learning check out the [IBM Data Science Experience](https://datascience.ibm.com/). More information about API Connect can be found in the [documentation](https://www.ibm.com/support/knowledgecenter/SSFS6T/com.ibm.apic.toolkit.doc/rapim_context_var.html) and the available [tutorials](https://developer.ibm.com/apiconnect/2016/11/21/api-connect-tutorial-mastering-the-api-assembly/).