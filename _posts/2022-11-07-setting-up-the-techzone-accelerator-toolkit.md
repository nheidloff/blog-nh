---
id: 5249
title: 'Setting up the TechZone Accelerator Toolkit'
date: '2022-11-07T07:36:18+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5249'
permalink: /article/setting-up-the-techzone-accelerator-toolkit/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/setting-up-the-techzone-accelerator-toolkit/
categories:
    - Articles
---

*With the TechZone Accelerator Toolkit IBM software, open source projects and custom applications can easily be deployed to various clouds. This article explains how to set up environments to use the Toolkit CLI.*

Check out my earlier blog that introduces the toolkit: [Introducing IBM’s Toolkit to handle Everything as Code]({{ "/article/introducing-ibms-toolkit-to-handle-everything-as-code/" | relative_url }}). The toolkit leverages Terrafrom and GitOps and is based on best practices from IBM projects with partners and clients.

The Accelerator Toolkit comes with a CLI called [iascable](https://github.com/cloud-native-toolkit/iascable) which converts BOMs (bill of materials/custom solution definitions) into Terraform assets. To run Terraform, additional CLIs are needed in specific versions, for example kubectl, oc, jq, git, helm, etc.

To simplify the setup of these tools, a container image is provided which comes with everything you need. Here is an example flow of commands that show how to install the CLI, how to run the container and how to run Terraform.

Setup the CLI, clone a sample repo and generate Terraform:

```
$ curl -sL https://iascable.cloudnativetoolkit.dev/install.sh | sh
$ git clone https://github.com/IBM/watson-automation
$ cd watson-deployments/roks-new-nlp 
$ iascable build -i bom.yaml
$ cd output
```

Launch the container:

```
$ ./launch.sh
```

Apply Terraform:

```
$ cd cluster-with-watson-nlp
$ ./apply.sh
```

Watch this [short video starting at 2:53 min](https://youtu.be/8lbVRAvJgy4?t=173) for a demo:

{% include embed/youtube.html id='8lbVRAvJgy4' %}

The toolkit provides two alternatives to run the image:

1. Docker
2. Multipass

There are some additional environments (Podman and Colima) that are used within the community, but these are not supported and cannot be guaranteed to work.

While Docker is easier to use, Multipass is provided as alternative if you don’t want or cannot run Docker Desktop. Here is the definition from the [Multipass](https://multipass.run/) home page.

> Ubuntu VMs on demand for any workstation. Get an instant Ubuntu VM with a single command. Multipass can launch and run virtual machines and configure them with cloud-init like a public cloud.

The following options are currently supported for recent versions of Linux, MacOS and Windows:

- Linux: Docker Engine
- MacOS: 1. Docker Desktop, 2. Multipass
- Windows: Windows Subsystem for Linux running Ubuntu image with Docker Engine installed

Follow the instructions in the Accelerator Toolkit documentation for details.

- [Supported runtime environments](https://operate.cloudnativetoolkit.dev/getting-started/setup/#supported-runtime-environments)
- [Installing the environment](https://operate.cloudnativetoolkit.dev/tutorials/1-setup/#installing-the-environment)