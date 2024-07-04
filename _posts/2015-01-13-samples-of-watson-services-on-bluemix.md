---
id: 989
title: 'Samples of Watson Services on Bluemix'
date: '2015-01-13T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/samples-of-watson-services-on-bluemix/'
permalink: /article/28.10.2014160617NHEKQG.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4324233691'
custom_permalink:
    - article/28.10.2014160617NHEKQG.htm/
categories:
    - Articles
---

**Update 03/02/16:** See the newer article [Samples to get started with Cognitive Watson Services]({{ "/article/ibm-watson-samples-get-started" | relative_url }}).

 I’ve started to try some of the Watson services on Bluemix. Really impressive. Below are some samples that give some ideas what the services do and how to use them.

 For a list of available services check out the [landing page](https://ace.ng.bluemix.net/?cm_mmc=WatsonDeveloperCloud-_-LandingSite-_-x-_-UseInBluemix#/solutions/solution=watson&orgGuid=b099603f-1567-4a55-8d73-a0cce5d66983&spaceGuid=c3f6a130-f1c9-48ea-b630-4a7e607f1998) and the [documentation](https://www.ng.bluemix.net/docs/#services/services.html) on Bluemix. I like especially the user modeling service and the question and answer service.

 User Modeling Service

 The [user modeling service](https://www.ng.bluemix.net/docs/#services/UserModeling/index.html#gettingstarted) “can automatically generate portraits of individuals that reflect an individuals’ characteristics from noisy social media data …. Such derived insights can then be used to guide hyper-personalized engagements and interactions to make your products, services, campaigns, etc. better tailored to your audience.”

 You can try a simple [live sample](http://watson-um-demo.mybluemix.net/). In the Bluemix catalog there are three boilerplates (for Java, Node.js and Ruby) which come with the source code of this sample.

 A more advanced sample is the [talent manager](https://developer.ibm.com/bluemix/2014/10/17/building-java-ee-app-ibm-bluemix-using-watson-cloudant/) scenario. Talent manager is an “application that allows you to search for candidates from a pool of applicants based on how closely they resemble one of your current employees. The app uses Watson’s User Modeling API service to analyze a potential candidate’s personality based on their answers to a questionnaire.” You can download the source code from [GitHub](https://github.com/jsloyer/talent-manager/) and deploy it to Bluemix. I’ve deployed it to my Bluemix organization and you can [try it live](http://niktalent.mybluemix.net/) (type in ‘dev’ and then click on one person).

 Question and Answer Service

 The [question and answer service](https://www.ng.bluemix.net/docs/#services/QuestionAnswer/index.html#gettingstarted) “enables applications to post questions and receive responses from a corpus of information that provides domain knowledge based on a specific set of input documents and other information. … The Question and Answer service uses natural language processing and analytics to provide the unique ability to comprehend the subtle nuances of human language, sift through vast amounts of content, and provide evidence-based responses to users’ questions.” The beta version of the service on Bluemix works for healthcare and travel data.

 The service comes with a simple [sample](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/qaapi/index.html#sampleApp) for Java, Node.js and Ruby. My colleague Carl Osipov has developed another [sample for PHP](https://github.com/IBM-Bluemix/zendcon-2014-hackathon#ibm-watson-question-answering-qa-for-travel). I’ve deployed this sample to my Bluemix organization and you can [try it live](http://watson-qa-electrotypic-sublapsarianism.mybluemix.net/).

 Additionally there is another great sample, called [Watson Films](http://www.ibm.com/developerworks/cloud/library/cl-watson-films-bluemix-app/). You can watch the [video](http://youtu.be/r-HNSGt53wg) to see it in action and get the code from [JazzHub](https://hub.jazz.net/project/dimascio/WatsonFilmsDW). Note that to my knowledge this sample doesn’t work via the Bluemix service since it uses another data set that you need to define via the Watson Experience Manager (but it can be run on Bluemix).

 If you want to find out more about Watson services join the [webinar](http://ibm.biz/BuildWatsonapp-Blog) tomorrow (10/29 at 11:00 AM EDT).   
 **Update 01/09/15:**   
 There are new samples available as open source and live demos on the [Watson Developer Cloud](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/gallery.html): “Your Celebrity Match” and “People in the News”.

Another sample [Translate your Twitter feed](http://www.ibm.com/developerworks/cloud/library/cl-watson-translatetwitter-app/index.html) can be found on developerWorks.