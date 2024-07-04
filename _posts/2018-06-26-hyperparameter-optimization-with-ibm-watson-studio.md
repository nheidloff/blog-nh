---
id: 3014
title: 'Hyperparameter Optimization with IBM Watson Studio'
date: '2018-06-26T08:43:08+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3014'
permalink: /article/hyperparameter-optimization-ibm-watson-studio/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/hyperparameter-optimization-ibm-watson-studio/
dsq_thread_id:
    - '6755475987'
categories:
    - Articles
---

In March IBM announced [Deep Learning as a Service](https://www.ibm.com/blogs/watson/2018/03/deep-learning-service-ibm-makes-advanced-ai-accessible-users-everywhere/) (DLaaS) which is part of IBM Watson Studio. Below I describe how to use this service to train models and how to optimize hyperparameters to easily find the best quality model.

I’m not a data scientist, but have been told that finding the right hyperparameters is often a tedious task with a lot of trial and error. Here is the intro of the service from the [documentation](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas.html?audience=wdp&context=analytics):

> As a data scientist, you need to train numerous models to identify the right combination of data in conjunction with hyperparameters to optimize the performance of your neural networks. You want to perform more experiments faster. You want to train deeper networks and explore broader hyperparameters spaces. IBM Watson Machine Learning accelerates this iterative cycle by simplifying the process to train models in parallel with an on-demand GPU compute cluster.

To learn the ability to optimize hyperparameters (HPO), I’ve used [TensorFlow For Poets](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets/#6) to classify images of flowers via transfer learning. Via HPO the number of training steps is optimized.

This is a screenshot of IBM Watson Studio with a training definition and one hyperparamter ‘how\_many\_training\_steps’ with values between 100 and 2000.

![image](/assets/img/2018/06/trainingdef.png)

This is the [result](https://github.com/nheidloff/hyperparameter-optimization-ibm-watson-studio/blob/master/screenshots/result.png) of the experiment. It shows that you should use at least 700 training runs.

I’ve [open sourced the sample](https://github.com/nheidloff/hyperparameter-optimization-ibm-watson-studio) on GitHub.

Most of the code can be re-used from the original sample. There are only two things that need to be changed in the code:

- Obtaining Hyperparameter Values from Watson
- Storing Results

**Obtaining Hyperparameter Values from Watson**

The values of the hyperparameters are stored in a JSON file:

```
from random import randint
import json

test_metrics = []
how_many_training_steps = 4000
instance_id = randint(0,9999)

try:
    with open("config.json", 'r') as f:
        json_obj = json.load(f)

    how_many_training_steps = int(json_obj["how_many_training_steps"])
except:
    pass

print('how_many_training_steps: ' + str(how_many_training_steps))
```

**Storing Results**

At the end of the training run another JSON file needs to be created which contains the test metrics. For every epoch the [metrics](https://github.com/nheidloff/hyperparameter-optimization-ibm-watson-studio/blob/master/model/retrain.py#L1260) are added:

```
test_metrics.append((i, {"accuracy": float(validation_accuracy)}))
```

This is the code to save the JSON file:

```
training_out =[]
for test_metric in test_metrics:
  out = {'steps':test_metric[0]}
  for (metric,value) in test_metric[1].items():
    out[metric] = value
    training_out.append(out)

  with open('{}/val_dict_list.json'.format(os.environ['RESULT_DIR']), 'w') as f:
    json.dump(training_out, f)
```

If you want to run this example yourself, get the code from [GitHub](https://github.com/nheidloff/hyperparameter-optimization-ibm-watson-studio) and get a free [IBM Cloud account](https://ibm.biz/nheidloff). To learn more about HPO in Watson Studio, check out the [documentation](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas_hpo.html?audience=wdp&context=analytics).