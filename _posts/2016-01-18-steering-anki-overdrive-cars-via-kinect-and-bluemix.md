---
id: 1781
title: 'Steering Anki Overdrive Cars via Kinect and Bluemix'
date: '2016-01-18T08:08:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1781'
permalink: /article/anki-overdrive-cars-kinect-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4500982152'
custom_permalink:
    - article/anki-overdrive-cars-kinect-bluemix/
categories:
    - Articles
---

I’ve open sourced a sample showing how to steer Anki Overdrive cars via Kinect and [IBM Bluemix](https://bluemix.net). The sample requires the [Node.js controller and MQTT interface]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }}) that I had open sourced previously. The sample is another alternative showing how to send commands to the cars in addition to [Watson speech recognition]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }}).

[Check out the project on GitHub.](https://github.com/IBM-Bluemix/controller-kinect-bluemix)

The project contains sample code that shows how to send MQTT commands to IBM Bluemix when ‘buttons’ are pressed via Kinect. Buttons are pressed when, for example, you move hands over them and wait for two seconds. The project is configured so that this only works when hands are between 50 cm and 1,00 m away from the Kinect. The distance is measured via the Kinect depth sensor.

The left picture shows the depth information, the right picture is an RGB image.

![image](/assets/img/2016/01/kinect-not-pressed.jpg)

When a hand is moved above a button, the state of the button changes to ‘pressed’ and if the hand is still above the button two seconds later, the appropriate action is invoked.

![image](/assets/img/2016/01/kinect-pressed.jpg)

Here is a picture of me driving the cars via Kinect.

![image](/assets/img/2016/01/kinect-anki-demo.jpg)

Here is the series of blog articles about the Anki Overdrive with Bluemix demos.

- [Anki Overdrive Cars with Bluemix Demo – Slides and Architecture]({{ "/article/ibm-bluemix-anki-overdrive-cars" | relative_url }})
- [Collision Prevention for Anki Overdrive Cars with Bluemix]({{ "/article/collision-prevention-anki-overdrive-cars-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Speech Recognition on Bluemix]({{ "/article/steering-anki-overdrive-cars-speech-recognition-bluemix-watson" | relative_url }})
- [Steering Anki Overdrive Cars via Kinect and Bluemix]({{ "/article/anki-overdrive-cars-kinect-bluemix" | relative_url }})
- [Steering Anki Overdrive Cars via Leap Motion Gestures and Bluemix]({{ "/article/steering-anki-overdrive-cars-leap-motion-gestures-bluemix" | relative_url }})