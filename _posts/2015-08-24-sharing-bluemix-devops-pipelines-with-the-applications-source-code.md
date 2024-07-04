---
id: 1414
title: "Sharing Bluemix DevOps Pipelines with the Application's Source Code"
date: '2015-08-24T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/sharing-bluemix-devops-pipelines-with-the-applications-source-code/'
permalink: /article/24.08.2015090425NHEABC.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/3.html'
custom_permalink:
    - article/24.08.2015090425NHEABC.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4323293024'
categories:
    - Articles
---

 With DevOps pipelines in [IBM Bluemix](https://bluemix.net/) developers can define how to build and deploy their applications, for example applications packaged via [Docker](http://heidloff.net/nh/home.nsf/article.xsp?id=20.08.2015070835NHE82W.htm). Pipelines can be created manually via the Bluemix web experience and they can be shared as part of the application source code.

 This capability is imported when, for example, you want to allow other people to fork your project and deploy it directly to Bluemix via the [Bluemix Deploy Button](https://developer.ibm.com/devops-services/2015/02/18/share-code-new-deploy-bluemix-button/). The [documentation](https://www.ng.bluemix.net/docs/manageapps/deployingapps.html#deploy_button) describes how to generate a file that includes the pipeline definition. This file needs to be named “pipeline.yml” and put in the directory “.bluemix”.

 The screenshot below shows how to generate that file. At this point the mechanism might not be the most intuitive one. You have to append “/yaml” to your URL “hub.jazz.net/pipeline/owner/project\_name/yaml”.

 To find out more read the [documentation](https://www.ng.bluemix.net/docs/manageapps/deployingapps.html#sharetextpipelines) and the blog [Forking pipelines](http://robbieminshall.blogspot.de/2015/06/forking-pipelines.html) from my colleague Robbie Minshall. He describes how to change the generated pipeline file before you should share it by replacing hardcoded values like organization and space names. He also refers to some [Bluemix pipeline samples](https://github.com/Puquios) on GitHub that you can use to get started.

![image](/assets/img/2015/08/pipeline06.png)