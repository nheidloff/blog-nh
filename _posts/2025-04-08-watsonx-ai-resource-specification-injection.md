---
id: nh-120
title: 'Resource Specifications for Custom Code in watsonx.ai'
date: 2025-04-08 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-120'
permalink: /article/watsonx-ai-resource-specification-injection/
custom_permalink:
    - article/watsonx-ai-resource-specification-injection/
image: /assets/img/2025/04/rsi-00.png
---

*Custom Python code can be deployed on IBM watsonx.ai via Python Functions and AI Services. This post describes how resources like memory can be defined for custom execution environments.*

watsonx.ai software can be installed on-premises or on clouds since it runs on OpenShift. The Python code is executed in containers. watsonx.ai comes with predefined [software specifications](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/pm_service_supported_frameworks.html?context=wx&audience=wdp) and [hardware specifications](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-hardware-configs.html?context=wx). If you need more flexibility, patches can be utilized.

With [Resource Specification Injection](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-hardware-configs.html?context=wx) (RSI) pods can be patched. Every time pods are started the patches are applied.

## Memory Increase

The following example shows how to increase the memory of Jupyter notebooks. The same mechanism works for deployed Python Functions and AI Services.

The patch is applied via the CloudPak CLI and you need admin access to your cluster.

```bash
ssh itzuser@api.xxx.eu1.xxx.ibm.com -p 40222
sudo bash
export PATH="$(pwd)/cpd-cli-linux-EE-14.1.0-1189":$PATH
source cpd_vars.sh
$OC_LOGIN
$CPDM_OC_LOGIN
cpd-cli manage restart-container
$OC_LOGIN
$CPDM_OC_LOGIN
```

The following snippet shows how to increase the memory from 2 to 4 GB.

```json
[
  {
    "op": "replace",
    "path": "/spec/containers/0/resources/requests/memory",
    "value": "4096Mi"
  },
  {
    "op": "replace",
    "path": "/spec/containers/0/resources/limits/memory",
    "value": "8192Mi"
  }
]
```

The file needs to be put in a specific directory. The /tmp/work directory maps to the cpd-cli-workspace/olm-utils-workspace/work directory.

```bash
mv custom-resources-merge-update.json cpd-cli-workspace/olm-utils-workspace/work/custom-resources-merge-update.json
chmod 777 cpd-cli-workspace/olm-utils-workspace/work/custom-resources-merge-update.json
```

Next you can apply the patch:

```bash
cpd-cli manage create-rsi-patch \ 
  --cpd_instance_ns=cpd-watsonx \ 
  --patch_name=custom-cpu-mem-merge \ 
  --patch_type=rsi_pod_spec \ 
  --spec_format=json \ 
  --patch_spec=/tmp/work/custom-resources-merge-update.json \ 
  --description="Request/limit" \ 
  --include_labels=runtimeEnvId:1a3a7b1b-2731-497a-887d-39be4407a61d \ 
  --state=active \ 
  --skip_apply=false
```

To deactivate the patch, run the following command:

```bash
cpd-cli manage create-rsi-patch \   
  --cpd_instance_ns=cpd \
  --patch_name=custom-cpu-mem-merge \
  --state=inactive   
```

## Target Pods

To define which pods should be changed, labels are used. One way to do this is to define a custom environment.

![image](/assets/img/2025/04/rsi-01.png)

Next run your notebook with the new environment.

![image](/assets/img/2025/04/rsi-02.png)

In the OpenShift console you can find the assigned ID to the environment. This ID needs to be passed in the create-rsi-patch command above.

![image](/assets/img/2025/04/rsi-03.png)

As result the increased memory is displayed in the YAML of the pod resource.

![image](/assets/img/2025/04/rsi-04.png)

## Next Steps

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.
