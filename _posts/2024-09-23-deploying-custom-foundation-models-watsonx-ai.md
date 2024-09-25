---
id: nh-085
title: 'Deploying Foundation Models on watsonx.ai'
date: 2024-09-23 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-085'
permalink: /article/deploying-custom-foundation-models-watsonx-ai/
custom_permalink:
    - article/deploying-custom-foundation-models-watsonx-ai/
image: /assets/img/2024/09/import-llm-watsonx-ai-01.png
---

*Watsonx.ai is IBM’s AI platform built for business. It is provided as SaaS and as software which can be deployed on multiple clouds and on-premises. This post describes how to deploy custom models to watsonx.ai SaaS.*

It's possible to deploy models from HuggingFace and your own models to watsonx.ai:

> We’re excited to announce a new feature update to watsonx.ai that delivers an open framework. This gives users access to a catalogue of built-in models and patterns that can be seamlessly extended through a "bring your model" capability. You can now do even more with our enterprise AI studio: upload and deploy your own custom foundation models across software and SaaS environments.

The documentation describes the supported model architectures, for example the modern architectures used by llama, mistral, mixtral and others. GPTQ can be used for quantization and float16 and bfloat16 as datatypes. Model weights need to be available in the safetensors format. Models in PyTorch formats can be converted.

The following resources describe the capabilities in more detail.

* Documentation: [Deploying custom foundation models](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/deploy-custom-fm-cloud.html?context=wx&audience=wdp)
* Blog: [Bringing your own custom foundation model to IBM watsonx.ai](https://www.ibm.com/blog/announcement/bringing-your-own-custom-foundation-model-to-watsonx-ai/)
* Blog: [Running fine-tuned LLM Models on watsonx.ai Software]({{ "/article/watsonx-ai-byom/" | relative_url }})

Let's look at a simple example how to deploy [mistralai/Mistral-7B-Instruct-v0.3](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3) from HuggingFace.

## Download Model

To download Mistral the following commands can be run.

```bash
export HF_TOKEN=xxx
git lfs install
git clone https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3
ls -la
total 56631856
-rw-r--r--   1 nh        7820 Sep 11 09:42 README.md
-rw-r--r--   1 nh         601 Sep 11 09:42 config.json
-rw-r--r--   1 nh 14496078512 Sep 11 09:52 consolidated.safetensors
-rw-r--r--   1 nh         116 Sep 11 09:42 generation_config.json
-rw-r--r--   1 nh  4949453792 Sep 11 09:49 model-00001-of-00003.safetensors
-rw-r--r--   1 nh  4999819336 Sep 11 09:49 model-00002-of-00003.safetensors
-rw-r--r--   1 nh  4546807800 Sep 11 09:48 model-00003-of-00003.safetensors
-rw-r--r--   1 nh       23950 Sep 11 09:42 model.safetensors.index.json
-rwxr-xr-x   1 nh         202 Sep 11 09:42 params.json
-rw-r--r--   1 nh         414 Sep 11 09:42 special_tokens_map.json
-rw-r--r--   1 nh     1961548 Sep 11 09:42 tokenizer.json
-rw-r--r--   1 nh      587404 Sep 11 09:42 tokenizer.model
-rwxr-xr-x   1 nh      587404 Sep 11 09:42 tokenizer.model.v3
-rw-r--r--   1 nh      140874 Sep 11 09:42 tokenizer_config.json
```

## Upload Model

Next upload the model to Cloud Object Storage.

```bash
export AWS_ACCESS_KEY_ID="xxx"
export AWS_SECRET_ACCESS_KEY="xxx"
export ENDPOINT="https://s3.us-south.cloud-object-storage.appdomain.cloud"
export BUCKET_NAME="demo-custom-model"
export MODEL_DIR=/Users/niklasheidloff/Desktop/instructlab/huggingface/Mistral-7B-Instruct-v0.3
export MODEL_FOLDER=mistral7b-instructv03

aws --endpoint-url ${ENDPOINT} s3 cp ${MODEL_DIR} s3://${BUCKET_NAME}/${MODEL_FOLDER}/ --recursive --follow-symlinks
```

## Create Connection

To enable watsonx.ai to access object storage, a connection needs to be defined. 

Note 1: The credentials need to be personal, not shared credentials! Enable [Personal Credentials](https://dataplatform.cloud.ibm.com/docs/content/wsj/admin/account-settings.html?context=wx#either-personal-or-shared-credentials) in your account first.

Note 2: For deploying models in projects there is a rate limit. Deploy the model from a deployment space instead.

Note 3: After having the model promoted to the deployment space, you need to define your personal credentials in the space again.

## Create Model Asset 

The following commands show how to create a model asset programmatically.

Note: For Mistral use bfloat16 and float16 (even though only float16 is supported).

```bash
ibmcloud login --sso
ibmcloud iam oauth-tokens
export TOKEN=xxx
curl -X POST "https://us-south.ml.cloud.ibm.com/ml/v4/models?version=2024-01-29" \
-H "Authorization: Bearer $TOKEN" \
-H "content-type: application/json" \
--data '{
    "type": "custom_foundation_model_1.0",
    "framework": "custom_foundation_model",
    "version": "1.0",
    "name": "mistral7b-instructv03",
    "software_spec": {
        "name": "watsonx-cfm-caikit-1.0"
    },
    "space_id": "066d6f31-9f63-4498-aa17-cf8af695bac8",
    "foundation_model": {
        "model_id": "mistral7b-instructv03",
        "parameters": [
        {
            "name": "dtype",
            "default": "bfloat16",
            "type": "string",
            "display_name": "Data Type",
            "options": ["bfloat16"]
        },
        {
            "name": "max_batch_size",
            "default": 256,
            "type": "number",
            "display_name": "Max Batch Size"
        }],

        "model_location": {
            "type": "connection_asset",
            "connection": {
                "id": "niklas-custom-model"
            },
            "location": {
                "bucket": "demo-custom-model",
                "file_path": "mistral7b-instructv03"
            }
        }
    }
}'
```

## Deploy Model

Next the model can be deployed.

```bash
curl -X POST "https://us-south.ml.cloud.ibm.com/ml/v4/deployments?version=2024-01-29" \
-H "Authorization: Bearer $TOKEN" \
-H "content-type: application/json" \
--data '{
  "asset":{
    "id":"8835b2a4-25d9-44e1-8a6b-01eeb7bc9f15"
  },
  "online":{
    "parameters":{
      "serving_name":"test_custom_fm",
      "foundation_model": {
      }
    }
  },
  "hardware_request": {
    "size": "gpu_s",
    "num_nodes": 1
  },
  "description": "Testing deployment using custom foundation model",
  "name":"custom_fm_deployment",
  "space_id":"066d6f31-9f63-4498-aa17-cf8af695bac8"
}'
```

## Invoke Model

The model can now be invoked via REST. The watsonx.ai user interface provides the access information too.

```bash
curl -X POST "https://us-south.ml.cloud.ibm.com/ml/v1/deployments/e35de6fc-09d8-44b1-8243-2d315994fed0/text/generation?version=2024-01-29" \
-H "Authorization: Bearer $TOKEN" \
-H "content-type: application/json" \
--data '{
 "input": "Hello, what is your name",
 "parameters": {
    "max_new_tokens": 200,
    "min_new_tokens": 20
 }
}'
```

![image](/assets/img/2024/09/import-llm-watsonx-ai-02.png)

The model can be accessed from the playground in watsonx.ai, if it has been deployed to a project (not only space).

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.