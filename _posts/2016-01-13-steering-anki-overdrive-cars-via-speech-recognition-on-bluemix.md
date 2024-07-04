---
id: 1776
title: 'Steering Anki Overdrive Cars via Speech Recognition on Bluemix'
date: '2016-01-13T08:25:58+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1776'
permalink: /article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4486692547'
custom_permalink:
    - article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson/
categories:
    - Articles
---

I’ve extended the [Anki Overdrive demo]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }}) so that you can steer the cars via voice. I’ve used a combination of the Watson [Speech to Text](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html) service and the Watson [Natural Language Classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html) service on [Bluemix](https://bluemix.net) to implement this. All of this is available as [open source](https://github.com/IBM-Bluemix/node-mqtt-for-anki-overdrive).

To convert speech to text an extended version of the Watson [Speech to Text sample](https://github.com/watson-developer-cloud/speech-to-text-nodejs) is used so that received text (which is marked as ‘final’) can be sent via MQTT to the [Internet of Things foundation](https://console.ng.bluemix.net/catalog/services/internet-of-things-foundation/).

![image](/assets/img/2016/01/anki-speech-input.jpg)

The Watson Speech to Text service has to be defined as device in the Internet of Things foundation. Check out the readme of the [project](https://github.com/IBM-Bluemix/sphero-bluemix-speech) for details.

![image](/assets/img/2016/01/anki-speech-iot.jpg)

There is a new version of the Node-RED flow which includes the speech recognition functionality. The Watson classifier is used to basically map between the text received from the speech to text service to available commands. At this point there are four commands (move, stop, turn left, turn right) that the classifier understands based on the provided [training data](https://github.com/IBM-Bluemix/node-mqtt-for-anki-overdrive/blob/master/data_train.csv). The nice thing about the classifier is that you can even say things like ‘depart’ and the classifier figures out that it belongs to the classification ‘move’ even though it was not defined in the training data.

![image](/assets/img/2016/01/anki-speech-flow.jpg)

Here is the series of blog articles about the Anki Overdrive with Bluemix demos.

- [Anki Overdrive Cars with Bluemix Demo – Slides and Architecture]({{ "/article/ibm-bluemix-anki-overdrive-cars" | relative_url }})
- [Collision Prevention for Anki Overdrive Cars with Bluemix]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Speech Recognition on Bluemix]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }})
- [Steering Anki Overdrive Cars via Kinect and Bluemix]({{ "/article/anki-overdrive-cars-kinect-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Leap Motion Gestures and Bluemix]({{ "/article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix" | relative_url }})