---
id: 1944
title: 'Integrating Watson Dialog into Minecraft on Bluemix'
date: '2016-03-07T06:55:40+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1944'
permalink: /article/watson-dialog-minecraft-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4640803024'
custom_permalink:
    - article/watson-dialog-minecraft-bluemix/
categories:
    - Articles
---

**Update November 2016**: The dialog service has been deprecated and replaced with the [Conversation](https://console.ng.bluemix.net/catalog/services/conversation/) service.

In an earlier [article]({{ "/article/watson-personality-insights-minecraft-bluemix" | relative_url }}) I wrote about how to use the Watson Personality Insights service in [Minecraft](https://minecraft.net/). The sample was based on the work from my colleagues Kyle Brown, Joseph Kozhaya and Srinivas Cheemalapati who had [documented](https://www.ibm.com/developerworks/cloud/library/cl-bluemix-minecraft-docker-trs-1/) how to run Minecraft servers as Docker containers on [Bluemix](https://bluemix.net/). Recently they updated their [documentation](https://www.ibm.com/developerworks/cloud/library/cl-bluemix-minecraft-watson-trs-4/) and added how to use the [Watson Dialog](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html) service.

For my Docker session at [JavaLand](http://www.javaland.eu/en/javaland-2016/) this week, I thought it would be fun to kick off the session with a Minecraft sample: [Rapid Application Development in the Cloud and On-Premises with Docker](https://www.doag.org/konferenz/konferenzplaner/konferenzplaner_details.php?id=499959&locS=0&vid=515755) (Mittwoch, 09.03.2016 12:00 – 12:40).

Minecraft players can now ask questions like “What does Minecraft have to do with Docker?”.

![image](/assets/img/2016/03/minecraft-dialog-1.jpg)

Watson returns with the answer “Minecraft servers can be hosted via Docker, for example on IBM Bluemix”.

![image](/assets/img/2016/03/minecraft-dialog-21.jpg)

Here is the deck for the session. It includes many screenshots, but in the session I’ll demo all of this live.

<iframe allowfullscreen="" frameborder="0" height="380" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/key/wHpBlS7YFLx2aa" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" width="595"></iframe>