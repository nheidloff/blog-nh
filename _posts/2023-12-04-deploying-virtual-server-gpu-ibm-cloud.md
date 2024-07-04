---
id: nh-058
title: 'Deploying a Virtual Server with GPU in the IBM Cloud'
date: 2023-12-04 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-058'
permalink: /article/deploying-virtual-server-gpu-ibm-cloud/
custom_permalink:
    - article/deploying-virtual-server-gpu-ibm-cloud/
image: /assets/img/2023/12/v100-ibm-cloud.png
---

*Fine-tuning Large Language Models requires GPUs. When tuning small and/or quantized models, single GPUs can be sufficient. This post explains how to leverage a Nvidia V100 GPU in the IBM Cloud.*

## Overview

The Nvidia V100 GPU has 16GB in the IBM Cloud. You can choose one or two GPUs. Virtual server instances can be deployed easily in the IBM Cloud with GPUs and storage.

* [Virtual server instances for VPC](https://cloud.ibm.com/vpc-ext/compute/vs)
* [How to Use V100-Based GPUs on IBM Cloud VPC](https://www.ibm.com/blog/how-to-use-v100-based-gpus-on-ibm-cloud-vpc/)
* [CUDA Toolkit 12.3 Update 1](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=deb_network)
* [PyTorch Setup](https://pytorch.org/get-started/locally/)

After servers have been provisioned, data can be copied on the servers or read via 'ssh' and 'scp'.

```bash
ssh -i ∼/.ssh/gpuadmin-id root@xxx.xxx.xxx.xxx
scp -i ∼/.ssh/gpuadmin-id -r ground-truth.xlsx root@xxx.xxx.xxx.xxx:/gpu-disc/
scp -i ∼/.ssh/gpuadmin-id -r root@xxx.xxx.xxx.xxx:/gpu-disc/results .
```

## Configuration

Before the GPU can be leveraged, it needs to be configured. Follow the instructions in the CUDA Toolkit documentation. Choose the 'network' option to make sure to get the latest versions and choose the 'open kernel module flavor' for the driver.

![image](/assets/img/2023/12/cuda.png)

To validate that the GPU has been configured correctly, run the following commands.

```bash
root@gpu-server:~# lspci | grep -i nvidia
04:01.0 3D controller: NVIDIA Corporation GV100GL [Tesla V100 PCIe 16GB] (rev a1)

root@gpu-server:~# lshw | grep nvidia
                configuration: driver=nvidia latency=0

root@gpu-server:~# nvidia-smi     
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 545.23.08              Driver Version: 545.23.08    CUDA Version: 12.3     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  Tesla V100-PCIE-16GB           On  | 00000000:04:01.0 Off |                    0 |
| N/A   37C    P0              45W / 250W |   5308MiB / 16384MiB |     22%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
                                                                                         
+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|    0   N/A  N/A     74161      C   python3                                    5304MiB |
+---------------------------------------------------------------------------------------+
```

After you've installed PyTorch, you can check whether the GPU is available from your Python code.

```python
import torch
device = "cuda:0" if torch.cuda.is_available() else "cpu"
print(device)
```

## Troubleshooting

When configuring everything, use the latest versions and validate that only one version is installed. The following commands might help for troubleshooting.

```bash
accelerate config
apt search nvidia-driver
apt reinstall nvidia-driver-545
apt-get --purge remove "*nvidia*" "libxnvctrl*"
apt-get autoremove
cd /etc/apt/sources.list.d
distribution=$(. /etc/os-release;echo $ID$VERSION_ID | sed -e 's/\.//g')
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.