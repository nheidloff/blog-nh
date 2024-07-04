---
id: 2994
title: 'Training TensorFlow.js Models with IBM Watson'
date: '2018-06-18T12:49:02+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2994'
permalink: /article/tensorflowjs-ibm-watson-web-browsers-dl/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/tensorflowjs-ibm-watson-web-browsers-dl/
dsq_thread_id:
    - '6739091640'
categories:
    - Articles
---

Recently Google introduced [TensorFlow.js](https://js.tensorflow.org/), which is a JavaScript library for training and deploying machine learning models in browsers and on Node.js. I like especially the ability to run predictions in browsers. Since running this code locally saves the remote calls to servers, the performance is amazing!

TensorFlow.js even allows the training of models in browsers via WebGL. While for smaller models the training is fast, [it doesn’t work well for larger models](https://js.tensorflow.org/faq/). That’s why I describe in this article how to use Watson Machine Learning which is part of [Watson Studio](https://www.ibm.com/cloud/watson-studio) to train models in the cloud leveraging multiple GPUs.

As example I use a web application provided by the TensorFlow.js team, called [Emoji Scavenger Hunt](https://github.com/google/emoji-scavenger-hunt). The goal of this game is to find real objects with phone cameras that look similar to certain emojis.

Try out the [live demo](https://emojiscavengerhunt.withgoogle.com/) of the original application. In order to see how fast the predictions are run, append [?debug=true](https://emojiscavengerhunt.withgoogle.com/?debug=true) to the URL. In my case the experience feels real time.

You can also try my [modified version](https://nh-hunt.mybluemix.net/) of this application on the IBM Cloud, but it will only work for you if you have items that look similar.

Check out the [video](https://youtu.be/4WTpMmqraXI) for a quick demo.

In order to train the model I’ve taken pictures from seven items: plug, soccer ball, mouse, hat, truck, banana and headphones. Here is how the emojis map to the real objects.

![image](/assets/img/2018/06/items-annotated-small.jpeg)

This is a screenshot from the app running on an iPhone where currently a hat is recognized:

![image](/assets/img/2018/06/iphone-1-small.jpeg)

Let me now explain how a model with your own pictures can be trained and how the model can be used in web applications. You can get the complete code of this example from [GitHub](https://github.com/nheidloff/watson-deep-learning-javascript).

**Training the Model**

In order to train the model I’ve used [Watson Deep Learning](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas.html) which is part of IBM Watson Studio. You can get a free [IBM Cloud account](https://ibm.biz/nheidloff) (no time restriction, no credit card required).

Watson Deep Learning supports several [machine learning frameworks](https://dataplatform.ibm.com/docs/content/analyze-data/pm_service_supported_frameworks.html). I have used TensorFlow, since TensorFlow.js can import [TensorFlow SavedModel](https://github.com/tensorflow/tfjs-converter) (in addition to Keras HDF5 models).

Before running the training, data needs to be uploaded to [Cloud Object Storage](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas_object_store.html). This includes the pictures of the objects you want to recognize as well as MobileNet. [MobileNet](https://github.com/tensorflow/models/tree/master/research/slim#Pretrained) is a pre-trained visual recognition model which is optimized for mobile devices.

In order to run the training, two things need to be provided: A yaml file with the [training configuration](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas_working_with_training_definitions.html) and a [python file](https://github.com/nheidloff/watson-deep-learning-javascript/blob/master/model/retrain.py) with the actual training code.

In the training configuration file [train.yaml](https://github.com/nheidloff/watson-deep-learning-javascript/blob/master/model/tf-train.yaml) you need to define [compute tiers](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas_gpus.html?audience=wdp&context=analytics) and the credentials to access Cloud Object Storage. In this sample I’ve used the configuration k80x2 which includes two GPUs.

In the train.yaml file you also need to define which [code](https://github.com/nheidloff/watson-deep-learning-javascript/blob/master/model/tf-train.yaml#L14) to trigger when the training is invoked. I’ve reused [code](https://github.com/tensorflow/tensorflow/blob/r1.7/tensorflow/examples/image_retraining/retrain.py) from the TensorFlow retrain example. Here is a snippet that shows how to save the model after the training. Read the [documentation](https://dataplatform.ibm.com/docs/content/analyze-data/ml_dlaas_tensorflow_deploy_score.html) to understand the prerequisites for deploying and serving TensorFlow models in IBM Watson Studio.

```
def export_model(model_info, class_count, saved_model_dir):
  sess, _, _, _, _ = build_eval_session(model_info, class_count)
  graph = sess.graph
  with graph.as_default():
    input_tensor = model_info['resized_input_tensor_name']
    in_image = sess.graph.get_tensor_by_name(input_tensor)
    inputs = {'image': tf.saved_model.utils.build_tensor_info(in_image)}

    out_classes = sess.graph.get_tensor_by_name('final_result:0')
    outputs = {
        'prediction': tf.saved_model.utils.build_tensor_info(out_classes)
    }

    signature = tf.saved_model.signature_def_utils.build_signature_def(
        inputs=inputs,
        outputs=outputs,
        method_name=tf.saved_model.signature_constants.PREDICT_METHOD_NAME)
    legacy_init_op = tf.group(tf.tables_initializer(), name='legacy_init_op')

    builder = tf.saved_model.builder.SavedModelBuilder(saved_model_dir)
    builder.add_meta_graph_and_variables(
        sess, [tf.saved_model.tag_constants.SERVING],
        signature_def_map={
            tf.saved_model.signature_constants.
            DEFAULT_SERVING_SIGNATURE_DEF_KEY:
                signature
        },
        legacy_init_op=legacy_init_op)
    builder.save()
```

Check out [README.md](https://github.com/nheidloff/watson-deep-learning-javascript) how to trigger the training and how to download the model.

**Usage of the Model in a Web Application**

Once the training is done, you can download the [saved model](https://github.com/nheidloff/watson-deep-learning-javascript/tree/master/saved-model/training-qBnjUqImR/model). Before the model can be used in a web application, it needs to be converted into a web-friendly format converted by the [TensorFlow.js converter](https://github.com/tensorflow/tfjs-converter). Since I’ve had some issues to run the converter on my Mac, I’ve created a little Docker image to do this. Again, check out the README.md for details.

The converted model needs to be copied into the [dist](https://github.com/nheidloff/watson-deep-learning-javascript/tree/master/emoji-scavenger-hunt/dist) directory of the web application. Before running predictions the model is [loaded](https://github.com/nheidloff/watson-deep-learning-javascript/blob/master/emoji-scavenger-hunt/src/js/mobilenet.ts#L26-L42), in this case from the files that are part of the web application. Alternatively the model can also be [loaded](https://js.tensorflow.org/api/0.11.6/#loadModel) from remote URLs and stored in the browser.

```
const MODEL_FILE_URL = '/model/tensorflowjs_model.pb';
const WEIGHT_MANIFEST_FILE_URL = '/model/weights_manifest.json';

export class MobileNet {
  model: FrozenModel;
  async load() {
    this.model = await loadFrozenModel(
      MODEL_FILE_URL,
      WEIGHT_MANIFEST_FILE_URL
    );
  }
```

In order to run the predictions, the [execute](https://github.com/tensorflow/tfjs-converter#step-2-loading-and-running-in-the-browser) function of the model is invoked:

```
import {loadFrozenModel, FrozenModel} from '@tensorflow/tfjs-converter';
...
model: FrozenModel;
...
const OUTPUT_NODE_NAME = 'final_result';
...
predict(input: tfc.Tensor): tfc.Tensor1D {
    const preprocessedInput = tfc.div(tfc.sub(input.asType('float32'), PREPROCESS_DIVISOR), PREPROCESS_DIVISOR);
    const reshapedInput = preprocessedInput.reshape([1, ...preprocessedInput.shape]);
    const dict: TensorMap = {};
    dict[INPUT_NODE_NAME] = reshapedInput;
    return this.model.execute(dict, OUTPUT_NODE_NAME) as tfc.Tensor1D;
  }
```

If you want to run this example yourself, get the code from [GitHub](https://github.com/nheidloff/watson-deep-learning-javascript) and get a free [IBM Cloud account](https://ibm.biz/nheidloff).