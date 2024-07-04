---
id: 264
title: 'Earn Money with your Mobile XPages Apps'
date: '2011-06-27T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/earn-money-with-your-mobile-xpages-apps/'
permalink: /article/03142011030521AMNHEABW.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/03142011030521AMNHEABW.htm/
dsq_thread_id:
    - '4316553250'
categories:
    - Articles
---

 There is a big debate going on whether you should develop native mobile apps using platform specific SDKs or via web apps. My personal preference is via web apps because I can use the same skills to build these apps for various platforms. That doesn’t necessarily mean that your apps work magically on all platforms equally well, but at least you don’t need to learn yet another development model.

 There are pros and cons for both native apps and web apps. I think the biggest disadvantages of mobile web apps at this point are the missing encrypted and managed stores. You can also not have scheduled tasks if you only have pure web apps. Frameworks like [PhoneGap](http://heidloff.net/nh/home.nsf/dx/03032011023649AMNHEAXK.htm) will hopefully address this in the future as they’ve done it for things like access to the smartphone cameras. But the majority of mobile apps don’t even need this functionality.

 Another issue that I hear from people is that there is no app store for mobile web apps. For free apps I don’t really understand this concern. There has been no app store for desktop web apps either. It’s the internet. If you want to check your flight schedule you don’t want to download an app from an app store first.

 For commercial apps that’s a little different. If you don’t want to rely on disturbing advertisement in your apps, stores for mobile web apps make sense. I’ve done some quick searching (don’t expect deep analysis) and was surprised to see so many relative new stores.

 Sarah Perez describes in her [article on ReadWriteWeb.com](http://www.readwriteweb.com/mobile/2010/12/getjar-well-postitioned-to-be-html5-web-app-store.php) an interesting extension to the [GetJar](http://www.getjar.com/) store. Sarah writes that there is a “possibility that this third-party app store could soon serve as a worthy launchpad for many more HTML5 mobile Web applications in the near future”. While I’m not into these types of games, I was impressed by the huge amount of platforms the new HTML based [Mafia Wars](http://www.getjar.com/mobile/47682/mafia-wars-/?s=phones&f=1) game in this store supports.

[AppStoreHQ](http://web.appstorehq.com/) has a store dedicated for mobile web apps that run on various platforms.

[OpenAppMkt](http://www.openappmkt.com/) is an app store for HTML5 mobile apps. Dan Moren describes in his [article on Macworld.com](http://www.macworld.com/article/153072/2010/07/openappmkt.html) that “the capabilities opened up by HTML5 make Web apps surprisingly capable, and if they are ever going to catch on, then a centralized distribution point is going to be a big help”. It also sounds like the store is adding other platforms like Android.

 Even Apple itself has a [store for mobile web apps](http://www.apple.com/webapps/). I expected this store to somehow be limited to iOS but I accessed it using my Android phone and could run the apps as well.

 Mozilla has also a new [store for web apps](https://apps.mozillalabs.com/appdir/). Ragavan Srinivasan describes in his [blog](https://mozillalabs.com/blog/2011/03/first-developer-release-of-web-apps-project/) the first release of [Mozilla’s Web Application project](https://apps.mozillalabs.com/). This project is not the store itself, but rather defines a way to define how to manage web apps (not only mobile web apps) and how to build stores.

 It sounds like Mozilla’s project is supposed to be an ‘open’ version of what Google already has with it’s [chrome web store](https://chrome.google.com/webstore) that is limited to the Chrome browser. From this store you can also install apps into your browser and as end user you get home page(s) with links to your available apps. This is basically the same concept as on the home pages of smartphones and as several people have pointed out similar to the classic workspace in Lotus Notes. Interesting things going on here.

 As XPages developers you can either use tools like PhoneGap to generate native shells for your XPages apps and put them in the ‘classic’ app stores and/or you can put them as mobile web apps in one of the stores above.

 So go ahead, use the [XPages Mobile Controls](http://mobilecontrols.openntf.org/) from OpenNTF, build your own apps, [host](http://xpages.info/host) them somewhere (e.g. [IBM Cloud](https://www-147.ibm.com/cloud/enterprise/dashboard)) and put them in the stores.

 If anyone knows a good overview and comparison of these stores please let me know.