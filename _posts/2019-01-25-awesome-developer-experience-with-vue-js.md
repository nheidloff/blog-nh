---
id: 3220
title: 'Awesome Developer Experience with Vue.js'
date: '2019-01-25T10:41:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3220'
permalink: /article/awesome-developer-experience-vuejs/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7187905740'
custom_permalink:
    - article/awesome-developer-experience-vuejs/
categories:
    - Articles
---

Last month I started to work on a new demo ([Blue Cloud Mirror](https://blue-cloud-mirror.mybluemix.net/)) which highlights some of the IBM Cloud capabilities. Part of the demo is a web application. Since I had heard so many good things about [Vue.js](https://vuejs.org/), I decided to give Vue.js a try.

To summarize, Vue.js is awesome. It’s a great framework and really easy to use. I’ve been able to build in relative little time a web application which is not the most sophisticated one, but more than just a trivial application.

In this article I describe briefly my experience with Vue.js. It’s not a complete analysis of Vue.js and not a complete comparison with other frameworks. There are a lot of articles and videos that you can read and watch. The Vue.js documentation also contains a good [comparison](https://vuejs.org/v2/guide/comparison.html).

Two years ago I used Angular (2 and 4) for a complex application. I know it’s not fair to compare a two years old Angular version with the current Vue.js release, but my productivity with Vue.js has been much higher. Things like routers, builds, data bindings, dependency management etc. just work.

For Angular it took me 1-2 months until I really understood the framework, for Vue.js maybe a week or two. Again, I know it’s not a fair comparison, since a lot of what I have learned for Angular also counts for Vue.js. But I still think that even for people who haven’t used any modern web framework it would be much easier to learn Vue.js since Vue has been designed from day one to be easy to consume. Plus the documentation is pretty good.

One of my [main issues with Angular]({{ "/article/angular-2-redux" | relative_url }}) was state management and updates of components. Since I first tried to use built-in Angular functionality to handle state, I lost several weeks since I had to replace my first code with Redux. Only after this the component updates worked reliably (more or less).

With Vue.js I didn’t have any component update issues. Part of the reason is that Vue.js has a [built-in optimization strategy](https://vuejs.org/v2/guide/comparison.html#Runtime-Performance). Another reason is probably that I used [Vuex](https://github.com/vuejs/vuex) from the beginning. It was very easy to learn and works perfectly. This is a screenshot of my app with the state being displayed in the developer console.

![image](/assets/img/2019/01/myexperiencevuejs.png)

I also like that [Vue.js uses CSS and HTML](https://vuejs.org/v2/guide/comparison.html#HTML-amp-CSS) with modifiers like ‘v-on’ rather than requiring me to learn techniques like JSX. I prefer to use standard skills and try to avoid highly opinionated frameworks. Obviously opinionated frameworks can have advantages like ‘easy of use’, but since I often need and want to try new technologies, I prefer standards-based technologies.

The only downside was that I wasn’t able to use TypeScript. When I used Angular I wrote everything in TypeScript and loved it. In Vue.js I tried to use TypeScript but ran into various build errors because of missing type information. Since I didn’t have enough time to fix this, I used JavaScript instead.

Again, this is certainly not a complete analysis, but maybe my experience helps other developers to pick the right web framework. The developer experience is awesome and the learning curve is certainly much lower than for Angular and React.

Check out the [source code](https://github.com/IBM/blue-cloud-mirror) of my application (game directory).