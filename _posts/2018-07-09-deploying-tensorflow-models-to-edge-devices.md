---
id: 3032
title: 'Deploying TensorFlow Models on Edge Devices'
date: '2018-07-09T10:15:05+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3032'
permalink: /article/tensorflow-lite-ibm-watson-ios/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '6782152097'
custom_permalink:
    - article/tensorflow-lite-ibm-watson-ios/
categories:
    - Articles
---

While it has been possible to deploy TensorFlow models to mobile and embedded devices via [TensorFlow for Mobile](https://www.tensorflow.org/mobile/) for some time, Google released an experimental version of [TensorFlow Lite](https://www.tensorflow.org/mobile/tflite/index) as an evolution of TensorFlow for Mobile at the end of last year. This new functionality allows building exciting AI scenarios on edge devices and the performance of the models is amazing.

This article and my code on [GitHub](https://github.com/nheidloff/watson-deep-learning-tensorflow-lite) describes how to train models via [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio) in the cloud or locally. After the training the models are optimized so that they can be deployed to various devices, for example iOS and Android based systems.

As example I picked a Visual Recognition scenario similar to my earlier blog entry where I described how to use [TensorFlow.js]({{ "/article/tensorflowjs-ibm-watson-web-browsers-dl" | relative_url }}) in browsers. In order to train the model I’ve taken pictures from seven items: plug, soccer ball, mouse, hat, truck, banana and headphones.

Check out the [video](https://youtu.be/avMQ5VSFb3A) for a quick demo how these items can be recognized in iOS and Android apps. This is an iPhone screenshot where a banana is recognized.

![image](/assets/img/2018/07/ios-app-576x1024.png)

Google provides a nice and easy to follow [tutorial](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets-2/#0) how to train, optimize and deploy a visual recognition model to Android devices. I’ve tried to deploy the model to an iPhone and have run into some issues. Check out my project on [GitHub](https://github.com/nheidloff/watson-deep-learning-tensorflow-lite) how I’ve fixed those.

- Since TensorFlow Lite is only experimental, interfaces have changed. To follow the Google tutorial, you need to use the exact TensorFlow version 1.7 and not the later ones.
- For me it wasn’t easy to install and run the optimization tool. I ended up using a Docker image which comes with TensorFlow and the pre-compiled tools.
- The tutorial describes how to generate an optimized model without quantization, the iOS sample app however expects a quantized model.

In order to run models on edge devices efficiently, they need to be optimized in terms of model size, memory usage, battery usage, etc. To achieve this, one method is to remove dropouts from the graph. Dropouts are used during training to prevent overfitting models. At runtime, when running predictions, they are not needed.

Another method to optimize models is [quantization](https://www.tensorflow.org/performance/quantization). Weights in graphs are often defined via floats. When using integers instead however, the sizes of the models are reduced significantly while the accuracy is only affected minimally or not at all.

In order to get the [iOS camera sample](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/lite/examples/ios/camera) working with the model that is generated in the tutorial, I had to do some changes. The [integers](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/contrib/lite/examples/ios/camera/CameraExampleViewController.mm#L251-L267) had to be changed to floats when passing in an image to the graph:

```
const float input_mean = 0.0f;
const float input_std = 255.0f;

float* out = interpreter->typed_input_tensor<float>(0);
for (int y = 0; y < wanted_input_height; ++y) {
  float* out_row = out + (y * wanted_input_width * wanted_input_channels);
  for (int x = 0; x < wanted_input_width; ++x) {
    const int in_x = (y * image_width) / wanted_input_width;
    const int in_y = (x * image_height) / wanted_input_height;
    uint8_t* in_pixel = in + (in_y * image_width * image_channels) + (in_x * image_channels);
    float* out_pixel = out_row + (x * wanted_input_channels);
    for (int c = 0; c < wanted_input_channels; ++c) {
      out_pixel = (in_pixel - input_mean) / input_std;
    }
  }
}
```

After this predictions can be invoked in the Objective-C++ code like this:

```
if (interpreter->Invoke() != kTfLiteOk) {
  LOG(FATAL) << "Failed to invoke!";
}
...
float* output = interpreter->typed_output_tensor<float>(0); 
GetTopN(output, output_size, kNumResults, kThreshold, &top_results);
NSMutableDictionary* newValues = [NSMutableDictionary dictionary];
for (const auto& result : top_results) {
  const float confidence = result.first;
  const int index = result.second;
  NSString* labelObject = [NSString stringWithUTF8String:labels[index].c_str()];
  NSNumber* valueObject = [NSNumber numberWithFloat:confidence];
  [newValues setObject:valueObject forKey:labelObject];
}
```

If you want to run this example yourself, get the code from [GitHub](https://github.com/nheidloff/watson-deep-learning-tensorflow-lite) and get a free [IBM Cloud](https://ibm.biz/nheidloff) account.