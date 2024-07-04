---
id: 1758
title: 'Collision Prevention for Anki Overdrive Cars with Bluemix'
date: '2016-01-08T08:24:19+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1758'
permalink: /article/collision-prevention-anki-overdrive-cars-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4472393656'
custom_permalink:
    - article/collision-prevention-anki-overdrive-cars-bluemix/
categories:
    - Articles
---

I’ve built a demo that shows how [Anki Overdrive](https://anki.com/) cars can be controlled from [IBM Bluemix](https://bluemix.net). Commands can be sent from the cloud to the cars, for example in order to set the speed, and the messages from the cars, for example location data, are sent to the cloud, so that you can prevent the cars driving on the same lanes.

I’ve open sourced the demo on [GitHub](https://github.com/IBM-Bluemix/node-mqtt-for-anki-overdrive). In order to run the demo yourself, you need in addition to the [Anki Drive Starter Kit](https://anki.com/en-us/overdrive/starter-kit) MacBooks or notebooks to run Node.js applications using the Bluetooth Low Energy protocol. Here is a screenshot of my setup.

![image](/assets/img/2016/01/ankiphoto-small.jpg)

Check out the video to watch a short demo.

{% include embed/youtube.html id='Wo4zeQxxOOI' %}

On Bluemix the [Internet of Things Foundation](https://console.ng.bluemix.net/catalog/services/internet-of-things-foundation/) service is used and a simple Node-RED flow.

![image](/assets/img/2016/01/ankinode-red-flow.jpg)

Additionally you can control the cars locally via a command line interface.

![image](/assets/img/2016/01/ankicli.png)

For more details read the documentation of the project.

[Node.js Controller and MQTT API for Anki Overdrive](https://github.com/IBM-Bluemix/node-mqtt-for-anki-overdrive)

Here is the series of blog articles about the Anki Overdrive with Bluemix demos.

- [Anki Overdrive Cars with Bluemix Demo – Slides and Architecture]({{ "/article/ibm-bluemix-anki-overdrive-cars" | relative_url }})
- [Collision Prevention for Anki Overdrive Cars with Bluemix]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Speech Recognition on Bluemix]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }})
- [Steering Anki Overdrive Cars via Kinect and Bluemix]({{ "/article/anki-overdrive-cars-kinect-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Leap Motion Gestures and Bluemix]({{ "/article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix" | relative_url }})