---
id: nh-070
title: 'Running fine-tuned LLM Models on watsonx.ai'
date: 2024-04-25 10:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-070'
permalink: /article/watsonx-ai-byom/
custom_permalink:
    - article/watsonx-ai-byom/
image: /assets/img/2024/04/watsonx-ai-byom.png
---

*Watsonx.ai is IBM's AI platform built for business. It is provided as SaaS and as software which can be deployed on multiple clouds and on-premises. This post describes how to deploy custom fine-tuned models.*

Watsonx.ai is part of IBM Cloud Pak for Data. Since it's based on OpenShift it can run everywhere. Recently IBM added a key capability to run models from HuggingFace and your own fine-tuned models, called Bring Your Own Model (BYOM). Watsonx.ai leverages [Text Generation Inference](https://huggingface.co/docs/text-generation-inference/en/index) from HuggingFace.

## Models

The [documentation](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.8.x?topic=model-supported-hardware-architectures-performance-settings) describes the supported model architectures, for example the modern architectures used by llama, mistral, mixtral and others.

GPTQ can be used for quantization and float16 and bfloat16 as datatypes.

Models weights need to be available in the safetensors format. Models in PyTorch formats can be converted.

## Prerequisites

To deploy custom foundation models in Cloud Pak for Data, you must have NVIDIA A100 80GB or H100 80GB GPUs set up on your cluster. Via hardware specifications the required GPU and CPU resources are defined.

Example for 4-bit quantized models:
* GPU memory (number of billion parameters * 0.5) + 50 % additional memory
* Number of GPUs depends on model GPU memory requirements: 1GPU = 80 GB
* Number of CPUs is the number of GPUs + 1
* CPU memory is equal to GPU memory

Additionally, you must prepare a properly sized Persistent Volume Claim on your cluster. The disc size should be roughly two times the size of the model file size.

## Flow

The full deployment includes the following steps.

1. Set up storage
2. Upload model
3. Register the model
4. Create the model asset
5. Deploy the custom model
6. Prompt the deployed model

Check out the [documentation](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.8.x?topic=assets-deploying-foundation-model) for details. 

**Upload Model**

To upload the model, you can leverage several approaches. One option is to create a pod that mounts the PVC. From the pod you can read files from S3 or from repos via gitlfs. Alternatively, you can use 'oc' to copy files or 'oc rsync'.

The files need to be put in the root directory. Make sure the config.json, tokenizer.json and the safetensors files exist.

**Register the Model**

To register the model, edit the Watsonxaiifm custom resource.

```
apiVersion: watsonxaiifm.cpd.ibm.com/v1beta1
kind: Watsonxaiifm
metadata:
  name: watsonxaiifm-cr
...
custom_foundation_models:
- model_id: example_model_70b
    location:
      pvc_name: example_model_pvc
    tags:
    - example_model
    - 70b
    parameters:
    - name: dtype
        default: float16
        options:
        - float16
        - bfloat16
    - name: max_batch_size
        default: 256
        min: 16
        max: 512
    - name: max_concurrent_requests
        default: 64
        min: 0
        max: 128
    - name: max_sequence_length
        default: 2048
        min: 256
        max: 8192
    - name: max_new_tokens
        default: 2048
        min: 512
        max: 4096
```

**Deploy the custom Model**

After the OpenShift administrator has registered the model, the watsonx.ai user interface can be used to deploy the model so that it can be accessed via API or from the Prompt Lab - see screenshot above.

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.