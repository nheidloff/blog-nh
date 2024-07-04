---
id: 1317
title: 'Globalize your Bluemix Applications without recompiling them'
date: '2015-06-23T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/globalize-your-bluemix-applications-without-recompiling-them/'
permalink: /article/23.06.2015112704NHED4H.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
custom_permalink:
    - article/23.06.2015112704NHED4H.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4325349998'
categories:
    - Articles
---

 Here is another short description of another awesome [Bluemix](https://bluemix.net/) service – [IBM Globalization](https://console.ng.bluemix.net/?direct=classic/#/store/cloudOEPaneId=store&fromCatalog=true&tabId=all&labs=true&serviceOfferingGuid=f6161f62-e87b-45e7-8a00-7562deaaadc6). This service provides machine translation capabilities from English to eight other languages at this point. The best feature is that you can change your strings dynamically without having to recompile and redeploy.

 The IBM Globalization service is currently in the experimental stage, but the following paragraphs should give you an idea about the functionality. With the dashboard of the service you can create globalization projects, upload the English source file and get them translated in the languages on the screenshot. The machine translated strings can then be changed in the dashboard. Read the [documentation](https://www.ng.bluemix.net/docs/#services/Globalization/index.html#globalization) to find out more.

![image](/assets/img/2015/06/global1.png)

 The machine translation functionality and the manually modified strings can be used as a stage in the Bluemix DevOps pipeline in which case the translated message files are added to the project. However in this case the translation is static and the project has to be recompiled and redeployed after changes.

![image](/assets/img/2015/06/global2.png)

 Instead of translating the strings as part of the build process the service allows accessing the strings dynamically from your app as Steven Atkin points out in his [article](http://www.ibm.com/developerworks/library/d-translate-bluemix-application-access-global-markets/index.html): “The game-changing value proposition of the IBM Globalization service is in the dynamic connection between the service itself and the target app. IBM Globalization provides several sample SDKs that you can incorporate into your app to connect the app to the IBM Globalization service in real time. You don’t need to repackage files, recompile, or re-stage your Bluemix app (as is required by traditional translation processes).”

 To leverage this capability you need to change your Java apps slightly by loading the resource bundle via a new ResourceBundleControlProvider which is included in the [gaas-java-client](https://github.com/IBM-Bluemix/gaas-java-client) library. The documentation explains two alternatives how to use it. I used the alternative where the library has be to added to the Java project and the Java code has to be changed to use the new resource bundle control. Check out this [sample code](https://github.com/IBM-Bluemix/gaas-java-client#accessing-translated-resources-from-a-bluemix-java-application). Right now the library has to be imported into the Java project but the team is also working on providing the library on Maven.

 To learn more watch the videos [Intro to Globalization Pipeline in Bluemix DevOps Services](https://www.youtube.com/watch?v=UToj7FIomCg) and [A demonstration of the Globalization Service in IBM Bluemix](https://www.youtube.com/watch?v=ICcZg8U37Z0). Also the [developerWorks article](http://www.ibm.com/developerworks/library/d-translate-bluemix-application-access-global-markets/index.html) comes with a more advanced “book club” sample where not only the static strings are translated but even the dynamic content via Watson translation. You can run this [demo](http://bookclub.mybluemix.net/form.jsp) live by simply changing the locale in your browser.