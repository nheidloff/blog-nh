---
id: 3441
title: 'Replay of Blue Cloud Mirror Webinar'
date: '2019-03-26T14:55:37+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3441'
permalink: /article/replay-blue-cloud-mirror-webinar/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/replay-blue-cloud-mirror-webinar/
dsq_thread_id:
    - '7319347282'
categories:
    - Articles
---

Yesterday Harald Uebele, Thomas Südbröcker and I presented Blue Cloud Mirror in an IBM Developer webinar. Below are the slides and the recording.

Blue Cloud Mirror is a game where players need to show five specific emotions and do five specific poses in two levels. The fastest player wins. The game uses various key IBM Cloud technologies to demonstrate the value of a diverse, interconnected system, with both public and private cloud environments.

The game utilizes various key IBM Cloud technologies to demonstrate the value of the IBM Cloud. There are three main parts:

- Core game: Implemented as serverless web application since it is primarily used during conferences only
- Users service: Implemented via an Kubernetes environment on-premises to avoid storing personal data in a public cloud
- Scores service: Implemented via Cloud Foundry to highlight easy changes via the “cf push experience”

**Slides**

<iframe allowfullscreen="" frameborder="0" height="520" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/rmyQHmrkhToaf9" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="853"> </iframe>

**Video**

{% include embed/youtube.html id='Z4wU03JnEcU' %}

To find out more about Blue Cloud Mirror, follow these links:

- [Code](https://github.com/IBM/blue-cloud-mirror)
- [Live Demo](https://blue-cloud-mirror.mybluemix.net/)
- [Documentation](https://github.com/IBM/blue-cloud-mirror#documentation-and-articles)
- [Slides](https://www.slideshare.net/niklasheidloff/blue-cloud-mirror/niklasheidloff/blue-cloud-mirror)