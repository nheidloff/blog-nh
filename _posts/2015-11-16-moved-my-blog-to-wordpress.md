---
id: 1551
title: 'Moved my Blog to WordPress'
date: '2015-11-16T13:53:58+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1551'
permalink: /article/moved-my-blog-to-wordpress/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323600033'
custom_permalink:
    - article/moved-my-blog-to-wordpress/
categories:
    - Articles
---

Over the weekend I migrated my blog to WordPress. This allows me to benefit from the huge amount of themes and plugins, for example to display source code. While I still want to tune a couple of things, I’m glad I’m (almost) done since the migration wasn’t as fast as I had hoped.  
  
![image](/assets/img/2015/11/wordpressblog.png)

To move the content I used the [HTML Import 2](https://wordpress.org/plugins/import-html-pages/) plugin. The main reason I chose this plugin was because it handles images. I built a simple XPage that displays only the HTML of the core entry and saved it to disk. The title and the publication dates are also imported automatically.

Via the [Custom Permalinks](https://wordpress.org/plugins/custom-permalinks/) I could keep the exact titles of my previous blog entries including dots. This allowed me to write rewrite rules to none of the existing links broke.  
`<br></br>RewriteEngine On<br></br>RewriteCond %{QUERY_STRING} ^id=(.*)$<br></br>RewriteRule ^nh/home.nsf/article.xsp?$ article/%1? [R=301,L]<br></br>Redirect 301 /nh/home.nsf/feed.rss /feed<br></br>`