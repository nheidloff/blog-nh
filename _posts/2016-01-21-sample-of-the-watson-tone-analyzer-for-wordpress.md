---
id: 1797
title: 'Sample of the Watson Tone Analyzer for WordPress'
date: '2016-01-21T10:45:53+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1797'
permalink: /article/watson-tone-analyzer-wordpress/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4510188867'
custom_permalink:
    - article/watson-tone-analyzer-wordpress/
categories:
    - Articles
---

With the [Watson Tone Analyzer](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html) service on [IBM Bluemix](https://bluemix.net) you can discover, understand, and revise the language tones in text before you publish, send or share it. Below is a little sample how to invoke the service from WordPress via a simple Chrome extension.

In the WordPress dashboard you can click the Watson icon in the Chrome toolbar. The triggered code of the extension injects some JavaScript in the page to read the content of the textarea and sends it to the extension.

![image](/assets/img/2016/01/tone2.jpg)

![image](/assets/img/2016/01/tone1.jpg)

Next the extension opens up the [tone analyzer sample web application](https://github.com/watson-developer-cloud/tone-analyzer-nodejs). I used this application since it comes with a nice visualization of the text and the tones. It even shows potentially better synonyms when clicking on specific words. As a shortcut I send the text from WordPress as URL parameter (there are certainly better ways to do this).

![image](/assets/img/2016/01/tone3.jpg)

To find out more read the [documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tone-analyzer/) and try the [online demo](https://tone-analyzer-demo.mybluemix.net/).