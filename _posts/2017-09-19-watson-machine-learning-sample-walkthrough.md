---
id: 2525
title: 'Watson Machine Learning Sample for Developers'
date: '2017-09-19T15:37:34+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2525'
permalink: /article/watson-machine-learning-sample/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6155212095'
custom_permalink:
    - article/watson-machine-learning-sample/
categories:
    - Articles
---

Last month IBM [announced](https://datascience.ibm.com/blog/watson-machine-learning-general-availability/) the general availability of [Watson Machine Learning](https://console.bluemix.net/catalog/services/machine-learning) which can be used by data scientists to create models and it can be used by developers to run predictions from their applications. Below is a simple sample walkthrough.

As sample scenario I’ve chosen the Titanic dataset to predict whether people would have survived based on their age, ticket class, sex and number of siblings and spouses aboard the Titanic. I picked this dataset because it seems to be used a lot in tutorials and demos how to do machine learning.

There are different ways for data scientists to create models with Watson Machine Learning. I’ve used the simplest approach. With the Model Builder you can create models with a graphical interface without having to write code or understand machine learning.

First I created a new model.

![image](/assets/img/2017/09/wml1.png)

Next I uploaded the Titanic data set (.csv file).

![image](/assets/img/2017/09/wml2.png)

At the top of the next page the label (column to predict) is defined, in this case ‘survived’. Below the label the list of features like age and ticket class are specified. Since in this sample I want to predict ‘survived’ or ‘not survived’ I choose ‘binary classification’. Since I’m not a data scientist I didn’t know which estimators to use and selected all of them.

![image](/assets/img/2017/09/wml3.png)

After the training has been completed you can see the results of the different estimators, select the best one and save the model.

![image](/assets/img/2017/09/wml4.png)

In order to run predictions from applications, the model needs to be deployed (bottom of the screenshot).

![image](/assets/img/2017/09/wml51.png)

Once deployed an endpoint is provided to invoke POST requests with input features which returns the prediction. Check out the [API explorer](http://watson-ml-api.mybluemix.net/#!/Deployments/post_v3_wml_instances_instance_id_published_models_published_model_id_deployments_deployment_id_online) for details.

![image](/assets/img/2017/09/wml6.png)

To lean more about Watson Machine Learning open [IBM Data Science Experience](https://datascience.ibm.com/) and give it a try.