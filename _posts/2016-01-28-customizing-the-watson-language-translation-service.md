---
id: 1817
title: 'Customizing the Watson Language Translation Service'
date: '2016-01-28T08:31:03+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1817'
permalink: /article/watson-language-translation-service-customization/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/watson-language-translation-service-customization/
dsq_thread_id:
    - '4530054351'
categories:
    - Articles
---

With the [Watson Language Translation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/language-translation.html) service in [Bluemix](https://bluemix.net) you can translate from and to English, French, Portuguese, Arabic, Spanish and Egyptian. To optimize the translations you can customize the service for your own domains. Below is a simple example.

Let’s say you want to translate news about your products. You can use the out of the box translation capabilities based on the pre-defined news corpus for most text. However for your product names you often need to customize the service to teach it with the right translations or don’t translate product names at all. For example according to the Bluemix catalog the Watson service names “Concept Insights” and “Visual Recognition” are not translated in Spanish.

So when you use the out of the box translation of the Watson service or other non customized translation services you’d get something like this:

![image](/assets/img/2016/01/translation2.png)

To improve this you can create a simple glossary file and train the Watson service.

```
<?xml version="1.0" encoding="UTF-8"?>
<tmx version="1.4">
  <header creationtool="" creationtoolversion=""
	segtype="sentence" o-tmf="" adminlang="EN"
	srclang="en" datatype="rtf" o-encoding="UTF-8" />
  <body>
    <tu>
      <tuv xml:lang="en">
        <seg>Concept Insights</seg>
      </tuv>
      <tuv xml:lang="es">
        <seg>Concept Insights</seg>
      </tuv>
    </tu>
	<tu>
      <tuv xml:lang="en">
        <seg>Visual Recognition</seg>
      </tuv>
      <tuv xml:lang="es">
        <seg>Visual Recognition</seg>
      </tuv>
    </tu>
  </body>
</tmx>
```

As a result the Watson service provides now a better translation (or in this case doesn’t translate the names at all).

![image](/assets/img/2016/01/translation1.png)

To find out more read the [documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/language-translation/customizing.shtml) and the article “[Customization and languages expand in Watson Language Translation](https://developer.ibm.com/watson/blog/2015/11/10/customization-and-languages-expand-in-watson-language-translation-and-speech-services/)” or watch the video “[Getting started: IBM Watson Language Translation customization](https://www.youtube.com/watch?v=a3vj_XJPtOM)“.

The Watson translation service is also used by the [Globalization Pipeline](https://console.ng.bluemix.net/catalog/services/globalization-pipeline/) service so that you can [globalize your Bluemix Applications without recompiling them]({{ "/article/23.06.2015112704NHED4H.htm" | relative_url }}).

</body>