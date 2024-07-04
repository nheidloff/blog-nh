---
id: 3240
title: 'Three awesome TensorFlow.js Models for Visual Recognition'
date: '2019-01-29T07:45:08+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3240'
permalink: /article/tensorflowjs-visual-recognition/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7195746613'
custom_permalink:
    - article/tensorflowjs-visual-recognition/
categories:
    - Articles
---

Last week I open sourced a web application called [Blue Cloud Mirror](https://github.com/IBM/blue-cloud-mirror) which is a game where players need to show five specific emotions and do five specific poses in two levels. The faster, the better.

You can play the game [online](https://blue-cloud-mirror.mybluemix.net/emotions). It only takes a minute. All you need is a webcam and a Chrome browser.

The game uses three different [TensorFlow.js](https://js.tensorflow.org/) models for Visual Recognition. The code is executed in browsers to run predictions which are pretty fast.

1\) Faces: [face-api.js](https://github.com/justadudewhohacks/face-api.js)  
face-api.js can detect faces, find face similarities and detect face landmarks.

Try the [online demo](https://justadudewhohacks.github.io/face-api.js/webcam_face_tracking).

2\) Emotions: [face\_classification](https://github.com/oarriaga/face_classification)  
face\_classification predicts emotions and can identify genders. The output of face-api.js is passed into this model.

Try the [online demo](https://tupleblog.github.io/face-classification-js/webcam.html).

3\) Poses: [posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)  
posenet can detect 17 keypoints of bodies and works for single persons and multiple persons.

Try the [online demo](https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html).

**Using the Models in Vue.js**

The usage of the models in Vue.js is pretty straight forward. Here is the [code](https://github.com/IBM/blue-cloud-mirror/blob/master/game/src/components/EmotionModel.vue#L28) to load and run the emotions model.

```
<script>
import * as tf from "@tensorflow/tfjs";

export default {
  name: "emotionmodel",
  data() {
    return {
      model: {}
    };
  },
  mounted() {
    let url = "models/emotion/model.json";
    tf.loadModel(url).then(result => {
      this.model = result;
...
   var r = this.model.predict(input);
   var result = r.dataSync();
   var tresult = tf.tensor(result);
   var label_index = tf.argMax(tresult).dataSync()[0];
   var label_percent = result[label_index].toFixed(4) * 100;
...
</script>
```

If you want to run everything from your local machine, run these commands:

```
$ git clone https://github.com/IBM/blue-cloud-mirror.git
$ cd blue-cloud-mirror/game
$ yarn install
$ yarn run serve
```

This is a screenshot of the level one of the game where five different emotions need to be shown.

![image](/assets/img/2019/01/game-emotions.png)