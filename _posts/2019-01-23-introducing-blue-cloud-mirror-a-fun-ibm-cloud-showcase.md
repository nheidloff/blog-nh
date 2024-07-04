---
id: 3212
title: 'Introducing Blue Cloud Mirror, a Fun IBM Cloud Showcase'
date: '2019-01-23T16:04:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3212'
permalink: /article/introducing-blue-cloud-mirror/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7184605058'
custom_permalink:
    - article/introducing-blue-cloud-mirror/
categories:
    - Articles
---

Blue Cloud Mirror is a game where players need to show five specific emotions and do five specific poses in two levels. The faster, the better.

[Play the game.](https://blue-cloud-mirror.mybluemix.net/emotions) It only takes a minute. All you need is a webcam and a Chrome browser.

[Get the code from GitHub.](https://github.com/ibm/blue-cloud-mirror)

Here are my results:

![image](/assets/img/2019/01/game-results.png)

The game uses key technologies of the [IBM Cloud](https://cloud.ibm.com/) and has three main parts:

- Core game: Implemented as web application and via Cloud Functions since it is only used during conferences
- Users service: Implemented via IBM Cloud Private to avoid having the personal data in a public cloud
- Scores service: Implemented via Cloud Foundry Enterprise Edition to show easy theme adoptions for different conferences

The following diagram shows the key components:

![image](/assets/img/2019/01/diagram-overview.png)

I’ve built Blue Cloud Mirror together with my colleagues [Thomas Südbröcker](https://twitter.com/tsuedbroecker) and [Harald Uebele](https://twitter.com/harald_u). Over the next days, they will contribute their parts and we will write a series of blog entries about how we’ve built the application.

For now, we’d like to get your feedback. After you’ve completed both levels, you can tweet a link to the application which will include a Twitter Card with your results. Please let us know what you think.

[Try the Game!](https://blue-cloud-mirror.mybluemix.net/emotions)