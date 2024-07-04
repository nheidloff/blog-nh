---
id: 2255
title: "My Advice: Don't use Angular 2+ without Redux"
date: '2017-04-13T06:34:57+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2255'
permalink: /article/angular-2-redux/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/angular-2-redux/
categories:
    - Articles
---

Recently I have used [Angular 2+](https://angular.io/) in one of my projects. There are many things I like about Angular like dependency injections, TypeScript, etc. One thing that gave me a hard time was to understand Angular’s change detection strategy. Below is a quick tip how to use Angular without having to worry (too much) about how to refresh your components.

One of the design goals of Angular 2 was to provide better performance than AngularJS which is why new features were added to reduce changes to the browser DOM. Read this [article](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html) or watch this [video](https://www.youtube.com/watch?v=CUxD91DWkGM) to learn more about change detection. In a nutshell Angular only refreshes the browser DOM if it detects that state has changed. There is even an optimization to tell Angular to skip change detection if you know that certain components have not changed.

My problem was that Angular did not update my components when the internal state was changed. I tried to enforce updates in [various ways](http://stackoverflow.com/questions/34827334/triggering-angular2-change-detection-manually), but that didn’t work either. The reason was that Angular checked the reference to my state object which kept identical while the data within this state object changed.

The trick is to use immutable objects/data structures. Essentially old objects are copied, then the changes are applied and the copies replace the old objects. There are libraries that help you doing this. But I’ve found it easier to use [Redux](https://github.com/angular-redux/store) for this purpose so that all of this complexity is handled in one place.

There is great documentation (e.g. this [video](https://www.youtube.com/watch?v=s4xr2avwv3s)) that describes all aspects of Redux. Here is a quote from the [getting started](https://github.com/angular-redux/store/blob/master/docs/intro-tutorial.md) guide.

> At its heart, a store in Redux is simply a JavaScript object with some data in it. However, it is immutable. That means it gets wrapped in an interface that makes it impossible to simply set fields on it like you would normally do. Instead, all changes to an application’s state are made using one or more ‘reducer’ functions.

So rather than manipulating state directly you call reducer functions. In order to read state the Redux store can be accessed from anywhere in your Angular app. Additionally there is a [select pattern](https://github.com/angular-redux/store/blob/master/docs/select-pattern.md) so that you can subscribe to state changes. In your Angular components you can then use ‘ChangeDetectionStrategy.OnPush’ as change detection strategy for your components which means that Angular relies on Redux to tell it when something has changed and it doesn’t do any other change detections.

With Redux in place you can leverage incredible tools. For example I like the [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) that displays all state changes and even allows you to travel back in time.

![angular-redux](/assets/img/2017/04/angular-redux.png)

One of Angular 2’s main criticisms is its steep learning curve. Adding Redux means you have to learn even more. If you only want to build quick prototypes this is probably overkill, but for more sophisticated apps it’s definitely worth doing. So my advice is don’t use Angular 2+ without Redux if you want to build more than prototypes. You’ll save a lot of time figuring out update problems.