---
id: 2474
title: 'Tool to manage all Bluemix CLIs'
date: '2017-09-01T07:33:07+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2474'
permalink: /article/tool-manage-bluemix-cli/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/tool-manage-bluemix-cli/
dsq_thread_id:
    - '6111626965'
categories:
    - Articles
---

As a [Bluemix](https://bluemix.net) developer you typically need to use several [CLIs](https://console.bluemix.net/docs/cli/index.html#cli) (command line interfaces). There is a specific [CLI for Bluemix](https://console.bluemix.net/docs/cli/reference/bluemix_cli/bx_cli.html#bluemix_cli) with multiple plugins to manage Bluemix applications and services. Additionally you can use third party CLIs like Docker, Kubernetes and Cloud Foundry against Bluemix.

Recently a new tool has been published for macOS ‘[IBM Cloud Application Tools 2](https://console.bluemix.net/docs/cli/icat.html#icat)‘ (beta). I find this tool pretty useful since you can install and update all CLIs with a few clicks. In the past I had to download new CLI versions manually, find the right install locations, set environment paths, etc.

Here is a screenshot.

![image](/assets/img/2017/09/bluemix-app-tool2.png)

If you don’t use macOS you might be interested in a [Docker image](https://ansi.23-5.eu/2017/07/docker-container-bluemix-cli-tools/) with all CLIs which my colleague Ansgar published.