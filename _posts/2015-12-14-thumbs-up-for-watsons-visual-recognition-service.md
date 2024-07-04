---
id: 1726
title: "Thumbs Up for Watson's Visual Recognition Service"
date: '2015-12-14T07:32:09+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1726'
permalink: /article/ibm-watson-visual-recognition-sample-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4402146260'
custom_permalink:
    - article/ibm-watson-visual-recognition-sample-bluemix/
categories:
    - Articles
---

**Update 06/06/16**: Check out this article for [new functionality in the Watson Visual Recognition Service]({{ "/article/text-image-recognition-watson-visual" | relative_url }}).

Watson’s [Visual Recognition](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/visual-recognition.html) (beta) service on [Bluemix](https://bluemix.net) understands the contents of images. Since the beginning of this month you can [train](https://developer.ibm.com/watson/blog/2015/12/02/enabling-ibm-watson-to-see/) this service with your own classifications. Below is a simple sample how to train Watson to recognize the thumbs up gesture.

This functionality could be used for example in the [selfie drone]({{ "/article/16.07.2015100036NHEBEF.htm" | relative_url }}) scenario to steer drones using gestures and not only via web user interfaces and speech recognition. There are many more scenarios where this service could be valuable, for example damage recognition of buildings and vehicles, tourist guides or tagging of photos.

In order to [train](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/visual-recognition/customizing.shtml) the service you need to provide at least 50 images which are positive examples and 50 images which are negative examples. You can try the service [online](http://visual-recognition-demo.mybluemix.net/) and use predefined sets of images or upload your own images, in my case 100 images with hands.

![image](/assets/img/2015/12/thumbs1.png)

After 4-5 minutes the Watson service has been trained and you can upload other images to test the new classifier. I used this picture:

![image](/assets/img/2015/12/thumbs3.jpg)

Watson returned a confidence score of 85%.

![image](/assets/img/2015/12/thumbs2.png)

In order to use this functionality in your apps you need to create your own service instance on Bluemix to get your own credentials. To create classifiers you can use REST [APIs](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/visual-recognition/api/v2/), Java or Node.js APIs or simply curl commands. The positive and negative sample pictures need to be put in zip files.

```
curl -u "{username}":"{password}" -X POST -F "positive_examples=@up.zip" -F "negative_examples=@not.zip" -F "name=thumbup" "https://gateway.watsonplatform.net/visual-recognition-beta/api/v2/classifiers?version=2015-12-02"
```

![image](/assets/img/2015/12/thumbs4.png)

In order to request classifications of an image you need to provide a JSON file “classifierlist.json” with the classifier ids.

```
{
	"classifier_ids": [
		"thumbup_1207786847" 
	]
}
```

After this you can invoke this command.

```
curl -u "{username}":"{password}" -X POST -F "images_file=@thumbs3.JPG" -F "classifier_ids=<classifierlist.json" "https://gateway.watsonplatform.net/visual-recognition-beta/api/v2/classify?version=2015-12-02"
```

![image](/assets/img/2015/12/thumbs5.png)