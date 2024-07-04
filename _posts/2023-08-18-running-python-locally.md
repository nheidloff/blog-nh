---
id: nh-029
title: 'Running Python locally'
date: 2023-08-18 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-029'
permalink: /article/running-python-locally/
custom_permalink:
    - article/running-python-locally/
image: /assets/img/2023/08/container.png
---

*There are several ways to run Python code locally. Often it is desired to run it in virtual environments and containers to be able to run multiple configurations in parallel and to easily remove configurations again.*

As I developer I want to run everything in containers. Data scientists, data engineers and Python developers often seem to prefer virtual environments. I guess the main reason is that creating virtual environments from Python is easy. This post describes different options.

## venv

[venv](https://docs.python.org/3/library/venv.html) is an easy option to use virtual environments.

> The venv module supports creating lightweight "virtual environments", each with their own independent set of Python packages installed in their site directories. A virtual environment is created on top of an existing Python installation

Install venv:

```shell
python -m pip install --user virtualenv
python --version
```

Activate the environment:

```shell
python -m venv my-env
source ./my-env/bin/activate
...
python3 -m pip install -r requirements.txt
```

Deactivate the environment:

```shell
deactivate
```

## Miniconda

[Miniconda](https://docs.conda.io/en/latest/miniconda.html) also includes a virtual environment.

> Miniconda is a free minimal installer for conda. It is a small bootstrap version of Anaconda that includes only conda, Python, the packages they both depend on, and a small number of other useful packages

Install Miniconda, for example via shell commands:

```shell
mkdir -p ~/miniconda3
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -o ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
~/miniconda3/bin/conda init zsh
```

Activate the environment:

```shell
conda create -n my-env
conda activate my-env
```

Deactivate the environment:

```shell
conda deactivate
vi ~/.zshrc 
```

## Containers

Execute the following command with Docker, Podman, etc.

```shell
docker run -it --name my-env -v "$PWD":/usr/src/myapp -w /usr/src/myapp python:alpine /bin/sh   
```

And to start the container again:

```shell
docker start my-env
docker exec -it my-env /bin/sh
```

## Jupyter

If you prefer to use notebooks, you can also run Anaconda in a container:

```bash
mkdir workspace && cd workspace
docker run -i -t -p 8888:8888 -v "$PWD":/home --name anaconda3 continuumio/anaconda3
```

From within the container install the dependencies and run Jupyter:

```bash
pip install transformers
pip install transformers[torch]
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cpu
conda install pytorch torchvision torchaudio cpuonly -c pytorch
jupyter lab --ip='0.0.0.0' --port=8888 --no-browser --allow-root --notebook-dir=/home
```

Open Jupyter in your browser via the link which you'll find in the terminal.

After you stop Jupyter and the container, you can restart everything:

```bash
docker start anaconda3
docker exec -it anaconda3 /bin/bash
jupyter lab --ip='0.0.0.0' --port=8888 --no-browser --allow-root --notebook-dir=/home
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.