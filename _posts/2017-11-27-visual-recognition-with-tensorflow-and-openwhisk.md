---
id: 2694
title: 'Visual Recognition with TensorFlow and OpenWhisk'
date: '2017-11-27T14:01:29+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2694'
permalink: /article/visual-recognition-tensorflow-openwhisk/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6313389166'
custom_permalink:
    - article/visual-recognition-tensorflow-openwhisk/
categories:
    - Articles
---

My colleague [Ansgar Schmidt](https://ansi.23-5.eu/) and I have built a new demo which uses [TensorFlow](https://www.tensorflow.org/) to predict types of flowers. The model is trained in a [Kubernetes](https://kubernetes.io/) cluster on the [IBM Cloud](https://bluemix.net). Via a web application pictures can be uploaded to initiate the prediction code which is executed as [OpenWhisk](https://www.ibm.com/cloud/functions) function.

We’d like to open source and document this demo soon. Keep an eye on our blogs. For now here is a screenshot of the web application.

![image](/assets/img/2017/11/tensorflow-openwhisk-1024x997.png)

As starting point for this demo we’ve used a codelab from Google [TensorFlow for Poets](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets/#0). The lab shows how to leverage the [transfer learning](https://www.tensorflow.org/tutorials/image_retraining) capabilities in TensorFlow. Essentially you can use predefined visual recognition models and retrain only the last layer of the neural network for your own categories. TensorFlow provides different visual recognition models. Since we wanted to run the prediction code in OpenWhisk we choose the smaller [MobileNet](https://research.googleblog.com/2017/06/mobilenets-open-source-models-for.html) model.

Over the next days we’ll blog about how to use Kubernetes and Object Storage to train and store your own models and how to use OpenWhisk to execute predictions.

If you want to experiment before this you can run the following code locally.

```
$ docker run -it --rm gcr.io/tensorflow/tensorflow /bin/bash
$ apt-get update
$ apt-get install -y git
$ git clone https://github.com/googlecodelabs/tensorflow-for-poets-2
$ cd tensorflow-for-poets-2
$ curl http://download.tensorflow.org/example_images/flower_photos.tgz | tar xz -C tf_files
$ IMAGE_SIZE=224
$ ARCHITECTURE="mobilenet_0.50_${IMAGE_SIZE}"
$ python -m scripts.retrain \
  --bottleneck_dir=tf_files/bottlenecks \
  --how_many_training_steps=500 \
  --model_dir=tf_files/models/ \
  --summaries_dir=tf_files/training_summaries/"${ARCHITECTURE}" \
  --output_graph=tf_files/retrained_graph.pb \
  --output_labels=tf_files/retrained_labels.txt \
  --architecture="${ARCHITECTURE}" \
  --image_dir=tf_files/flower_photos
```

The training takes roughly 5 minutes on my MacBook Pro. After this you can find the model in the files ‘tf\_files/retrained\_graph.pb’ and ‘tf\_files/retrained\_labels.txt’.

In order to run a prediction run the following command. Since this image has been part of the training set you might want to get (‘wget http://…’) another image first and change the image parameter.

```
$ python -m scripts.label_image \
    --graph=tf_files/retrained_graph.pb  \
    --image=tf_files/flower_photos/daisy/21652746_cc379e0eea_m.jpg
```

As result you’ll get something like this:

```
Evaluation time (1-image): 0.079s
daisy 0.979356
dandelion 0.0125334
sunflowers 0.00809442
roses 1.40769e-05
tulips 2.08439e-06
```

Update 12/01/17: Ansgar and I have blogged about this project in more detail.

- [Visual Recognition with TensorFlow and OpenWhisk]({{ "/article/visual-recognition-tensorflow-openwhisk" | relative_url }})
- [Accessing IBM Object Storage from Python](https://ansi.23-5.eu/2017/11/accessing-ibm-object-store-python/)
- [Image Recognition with Tensorflow training on Kubernetes](https://ansi.23-5.eu/2017/11/image-recognition-with-tensorflow-training-on-kubernetes/)
- [Image Recognition with Tensorflow classification on OpenWhisk](https://ansi.23-5.eu/2017/11/image-recognition-tensorflow-classification-openwhisk/)
- [Sample Application to classify Images with TensorFlow and OpenWhisk](https://heidloff.net/article/visual-recognition-tensorflow)