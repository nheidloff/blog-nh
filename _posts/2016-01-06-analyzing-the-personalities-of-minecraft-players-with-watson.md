---
id: 1748
title: 'Analyzing the Personalities of Minecraft Players with Watson'
date: '2016-01-06T08:24:52+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1748'
permalink: /article/watson-personality-insights-minecraft-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/watson-personality-insights-minecraft-bluemix/
dsq_thread_id:
    - '4466039439'
categories:
    - Articles
---

Over the holidays I looked briefly into how to extend [Minecraft](https://minecraft.net/) and how to utilize [Bluemix](https://bluemix.net). In multiplayer games it might make sense to understand the personalities of competitors or to understand the personalities of players when forming teams. The Watson [Personality Insights](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights.html) service might help.

My colleagues Kyle Brown, Joseph Kozhaya and Srinivas Cheemalapati have written a great four parts series [Create cognitive plugins for Minecraft with Bluemix, Docker, and Watson](https://www.ibm.com/developerworks/cloud/library/cl-bluemix-minecraft-docker-trs-1/). Their introduction explains well the Minecraft extensibility model and success:

“What single Java program has been used more than any other Java program by a whole order of magnitude? Hint: It has sold over 70 million copies since it was first released in beta form in 2009. \[…\] An enormous development ecosystem has grown up around this program, and hundreds of thousands of people have been inspired to learn programming in Java – just so they can develop extensions for this program. As you probably guessed from the title, that program is the game Minecraft \[…\]. Minecraft has been a phenomenal success in the marketplace, and part of that is due to its unique structure: you purchase the client (the face of the game) commercially, but the servers are open for extension.”

I followed the steps in the articles to deploy a Minecraft server to Bluemix via Docker. As an example of a multiplayer game I installed the [Bedwars Reloaded](https://www.spigotmc.org/resources/bedwars-rel.6799/) plugin. The biggest problem I had were missing permissions. As a shortcut I gave myself maximal rights in the ops.json file. The following lines are the changes and extensions I had to do to the Dockerfile.

```
RUN mkdir plugins
ADD ops.json ./ops.json
ADD server.properties ./server.properties
ADD HelloWorld.jar /plugins/HelloWorld.jar
ADD BedwarsRel.jar /plugins/BedwarsRel.jar
ADD PermissionsBukkit-2.3 /plugins/PermissionsBukkit-2.3
ADD Multiverse-Core-2.4.jar /plugins/Multiverse-Core-2.4.jar
ADD KINGDOMS ./KINGDOMS
```

As [described](https://www.ibm.com/developerworks/cloud/library/cl-bluemix-minecraft-spigot-trs-3/) by my colleagues you have to turn off authentication which shouldn’t be done for production environments. Also it looks like most Minecraft plugins have not been developed as cloud native applications. Instead data and configuration is stored on disk and gets lost when Docker instances are deleted.

I followed the instructions in the articles to build my own plugin using Watson Personality Insights. When you enter “/watson showpersonality @Oprah” it displays the values of that Twitter user returned by the Watson service. To make this more useful it would be good not (only) to use Twitter but also the content of previous Minecraft chats.

![image](/assets/img/2016/01/minecraft.png)