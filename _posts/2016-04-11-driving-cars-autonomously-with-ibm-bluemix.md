---
id: 2025
title: 'Driving Cars autonomously with IBM Bluemix'
date: '2016-04-11T09:27:23+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2025'
permalink: /article/driving-cars-autonomously-ibm-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4737622528'
custom_permalink:
    - article/driving-cars-autonomously-ibm-bluemix/
categories:
    - Articles
---

At JavaLand we presented how to steer [Anki Overdrive](https://anki.com/) cars with [IBM Bluemix](https://bluemix.net) via speech and gesture recognition. Since the cars send their position data to the cloud we could also demonstrate a simple version of collision prevention.

The demo is available as [open source](https://github.com/IBM-Bluemix/node-mqtt-for-anki-overdrive) and I documented it in a series of blog entries (see below). My colleague David Barnes interviewed me and created the video [Driving Cars autonomously with IBM Bluemix](https://youtu.be/6s0Jh9tl0Eg). Thanks a lot, David!

{% include embed/youtube.html id='6s0Jh9tl0Eg' %}

Here is the high level architecture with the main components IBM Bluemix, the Internet of Things platform and MQTT.

![image](/assets/img/2016/03/ankiarch.jpg)

Here is the series of blog articles about this demo.

- [IBM Bluemix Demo with Anki Overdrive Cars]({{ "/article/ibm-bluemix-anki-overdrive-cars" | relative_url }})
- [Collision Prevention for Anki Overdrive Cars with Bluemix]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Speech Recognition on Bluemix]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }})
- [Steering Anki Overdrive Cars via Kinect and Bluemix]({{ "/article/anki-overdrive-cars-kinect-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Leap Motion Gestures and Bluemix]({{ "/article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix" | relative_url }})