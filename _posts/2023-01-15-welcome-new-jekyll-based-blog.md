---
id: nh-001
title: 'Welcome to my new Jekyll-based Blog'
date: 2023-01-15 09:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-001'
permalink: /article/welcome-to-new-jekyll-based-blog/
custom_permalink:
    - article/welcome-to-new-jekyll-based-blog/
image: /assets/img/2023/01/IMG_2075.JPG
---


*When you read this, you see that my blog layout has changed. More importantly I've migrated my blog from Wordpress to a static website built with Jekyll and hosted via GitHub Pages. Read on, if you want to know my motive.*

## History

In 2005 I started blogging in shared team blogs. In 2008 I created my own blog. Since I worked in the IBM Notes/Domino development team at that time, I chose the official Notes blog template for my blog application. After this I switched to another Notes blog template provided by the community.

In 2015 I migrated to Wordpress. Unfortunately the migration was difficult and time consuming, since not everything could be automated. At this time Wordpress was the de-facto standard for blogging with a big community and many plugins. There were are also many rather cheap and different types of hosting options. 

## Wordpress Disadvantages

In general Wordpress has worked for me. However, there were a couple of things I didn't like:

* The editor was really bad and limited in terms of functionality.
* Data backup was only handled via plugins and in my case I had to do it manually.
* I couldn't easily change everything I wanted. Themes had all various limitations and I would have had to write my own Wordpress plugins or extend existing ones.
* Even though I used spam plugins, in my case I still saw a lot of spam in my SQL database.
* Since I chose a semi-managed hosting, the provider started to charge a lot at some point since I ran an unsupported PHP version.
* The Wordpress Dashboard experience is poor since people just kept adding functionality to it without a clean design.
* In my particual case it wasn't easy to add TLS.

At the end of last year the PHP version of my blog expired and an update to later versions didn't work without having to debug and fix issues. I had the choice to either fix my Wordpress blog (and didn't know how long this would take) or just migrate away from Wordpress.

## New Jekyll based Blog

Jekyll is a technology to author blog posts in Markdown which every developer is familar with. With Jeykyll static websites are generated based on the Markdown based posts and based on the underlaying Jeykll application and theme. The source for everything is managed in Git repositories.

GitHub provides free and commercial hostings of Jekyll sites via GitHub Pages. When new code or blogs posts are pushed to GitHub, GitHub Actions built the sites and the files are hosted. By default you get an URL `your-github-user.github.io/your-github-repo`for free. You can only use custom domains. In my case I only have to pay my domain provider for `heidloff.net`.

![image](/assets/img/2023/01/jekyll.png)

Here are the key technologies used for my blog:

* [Jekyll](https://jekyllrb.com/), Liquid and Ruby
* [GitHub Pages](https://pages.github.com/) and GitHub Actions
* [Chirpy Jekyll Theme](https://github.com/cotes2020/jekyll-theme-chirpy)
* [Markdown](https://en.wikipedia.org/wiki/Markdown)

## Jekyll Advantages

Jekyll addresses my Wordpress issues above:

* Authoring via Markdown
* Built-in data backup via Git
* Full control over look and feel via standard technologies
* No spam
* Hosting can be done via the free GitHub Pages offering
* Built-in HTTPS

## Jekyll Disadvantages

Of course not everything is perfect even with Jekyll. People who are not developers will probably often prefer blogging solutions that are managed and that allow them to focus on writing articles.

The main thing that I don't like is the time it takes to publish a new blog post. For my 700+ posts it takes more than four minutes to rebuilt the static website on GitHub and more than one minute to run it locally.


## Next Steps

I will blog about more details soon how I've migrated from Wordpress and some tips how to run Jykell. If you don't want to wait, check out my [repo](https://github.com/nheidloff/heidloffblog).