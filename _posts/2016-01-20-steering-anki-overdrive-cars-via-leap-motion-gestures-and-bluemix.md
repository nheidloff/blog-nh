---
id: 1788
title: 'Steering Anki Overdrive Cars via Leap Motion Gestures and Bluemix'
date: '2016-01-20T14:41:45+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1788'
permalink: /article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4507756878'
custom_permalink:
    - article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix/
categories:
    - Articles
---

Here is another example how to steer Anki Overdrive cars via [IBM Bluemix](https://bluemix.net). In addition to a [local controller]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }}), [Watson speech recognition]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }}) and a [Kinect]({{ "/article/anki-overdrive-cars-kinect-bluemix" | relative_url }}) I’ve added gesture recognition via [Leap Motion](https://www.leapmotion.com/product/desktop).

The sample is available as [open source](https://github.com/IBM-Bluemix/sample-leapmotion-bluemix) on GitHub. The project contains sample code that shows how to send MQTT commands to IBM Bluemix when gestures are recognized via Leap Motion.

Right now four gestures can be recognized: swipe left, swipe right, screen tap and circle. The best way to explain the functionality are pictures. Check out the pictures in the [screenshots](https://github.com/IBM-Bluemix/sample-leapmotion-bluemix/tree/master/screenshots) directory.

This is the device in front of a MacBook.

![image](/assets/img/2016/01/leapmotionpicture.jpg)

My example is basically just an HTML page with some JavaScript. One nice feature of the Leap Motion JavaScript API is the hand that shows up on the page.

![image](/assets/img/2016/01/leapmotionswipeleft.jpg)

I’ve extended the Node-RED flow to receive commands from Leap Motion and forward them to the cars.

![image](/assets/img/2016/01/leapmotionswiperight.jpg)

The project has been implemented via the [Leap Motion JavaScript SDK](https://developer.leapmotion.com/documentation/javascript/index.html). MQTT messages are sent via [Paho](https://www.eclipse.org/paho/clients/js/) to IBM Bluemix and the [Internet of Things foundation](https://console.ng.bluemix.net/catalog/internet-of-things/).

Here is the series of blog articles about the Anki Overdrive with Bluemix demos.

- [Anki Overdrive Cars with Bluemix Demo – Slides and Architecture]({{ "/article/ibm-bluemix-anki-overdrive-cars" | relative_url }})
- [Collision Prevention for Anki Overdrive Cars with Bluemix]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Speech Recognition on Bluemix]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }})
- [Steering Anki Overdrive Cars via Kinect and Bluemix]({{ "/article/anki-overdrive-cars-kinect-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Leap Motion Gestures and Bluemix]({{ "/article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix" | relative_url }})