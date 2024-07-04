---
id: 2168
title: "Recognizing Text in Images with Watson's Visual Recognition API"
date: '2016-06-06T10:23:43+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2168'
permalink: /article/text-image-recognition-watson-visual/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/text-image-recognition-watson-visual/
categories:
    - Articles
---

The [Watson Visual Recognition](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/visual-recognition/) service is now generally available and a lot of new functionality has been added. The service [combines](https://developer.ibm.com/bluemix/2016/05/19/alchemy-and-watson-visual-recognition-api/) the old beta capabilities plus the Alchemy functionality and the previous Visual Insights service.

With the new service you can receive classifications of images, faces can be detected and even text is recognized. All of this can be done by simply invoking APIs without requiring deep learning skills.

With the new service you can now define and train multiple custom visual classifiers at once. Additionally it’s not longer necessary (but still possible) to upload a set of negative images for the training.

The screenshot shows a sample for the new functionality (beta) to recognize text, in this case the Bluemix slogan.

![image](/assets/img/2016/06/watsontextimage.png)

[Try the API for your own images online.](https://visual-recognition-demo.mybluemix.net/)

There are REST [APIs](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/visual-recognition/api/v3/) and language bindings for Node, Java and Python. Here are the curl commands for testing the API.

```
curl -X POST -F "images_file=@jax-16-7.jpg" "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key={api-key}&version=2016-05-20"
curl -X POST -F "images_file=@jax-16-7.jpg" "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key={api-key}&version=2016-05-20"
curl -X POST -F "images_file=@jax-16-7.jpg" "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/detect_faces?api_key={api-key}&version=2016-05-20"
```