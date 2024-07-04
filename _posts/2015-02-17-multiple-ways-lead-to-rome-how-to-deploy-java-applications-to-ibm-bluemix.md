---
id: 1140
title: 'Multiple Ways lead to Rome: How to deploy Java Applications to IBM Bluemix'
date: '2015-02-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/multiple-ways-lead-to-rome-how-to-deploy-java-applications-to-ibm-bluemix/'
permalink: /article/17.02.2015131507NHEGDJ.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/1.html'
custom_permalink:
    - article/17.02.2015131507NHEGDJ.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4326091210'
categories:
    - Articles
---

 The question that I’ve been asked most often recently by Java developers is how to deploy applications to Bluemix. There is a lot of good documentation available. Below is a quick overview with pointers to more detailed information. The different approaches have pros and cons dependent on the scenarios and [personal preferences](http://ryanjbaxter.com/2014/10/01/why-i-have-started-to-embrace-the-command-line/).

 cf Tool  
 You can deploy Java applications (war and ear files) via the [cf command line interface](https://github.com/cloudfoundry/cli#downloads). This can be as easy as “cf push app\_name -p app.war” where all additional parameters are defined in an additional [manifest](https://www.ng.bluemix.net/docs/#manageapps/index-gentopic2.html#appmanifest) file. The Java code is built locally and the war file is deployed on Bluemix with the defined buildpack (Liberty by default).   
 I use this option sometimes as fallback when I have deployment issues and when I’m not sure whether it’s because of my code or potentially the other deployment tools. I can also use another cf logs command to see the logs easily during the deployment without having to go to another place.

 Cloud Foundry Maven Plugin  
 When using the cf push command you need to build your code first. Personally I use Maven for all projects right now. You can use Maven from within Eclipse which comes with the [M2Eclipse](https://www.eclipse.org/m2e/) plugin. Alternatively you can build via the [Maven command line tool](http://maven.apache.org/).   
 Additionally there is an extension to Maven called the [Cloud Foundry Maven Plugin](https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-maven-plugin) which deploys the build to Bluemix directly. Check out the samples from [Ryan Baxter](https://github.com/IBM-Bluemix/todo-apps/tree/master/java#deploying-the-app-to-bluemix) how to do this.

 Jenkins Cloud Foundry Plugin  
 If you’re using [Jenkins](http://jenkins-ci.org/) as your continuous integration server you should check out the [Jenkins Cloud Foundry Plugin](http://docs.run.pivotal.io/marketplace/integrations/cloudbees/jenkins-cloudbees-using.html) which allows you to deploy your applications to Bluemix. I haven’t tried this one yet though.

 Bluemix DevOps  
 Rather than building the code locally and then pushing the built code to Bluemix the [Bluemix DevOps service](https://hub.jazz.net/tutorials/jazzeditorjava/) can be used. In this scenario developers use Git to commit and push code to a source control repository on Bluemix or to GitHub and the code is both built and deployed on server side. In this case developers don’t have to set up and learn any additional tools which is why this option is especially interesting for short hackathons where people have little time. If you want to see this in action watch the [demo](https://www.youtube.com/watch?v=vxur_6t0hdg) I gave in a webinar recently or watch the [videos](http://www.ibm.com/developerworks/library/d-bluemix-javadevops/index.html) from Lauren Schaefer.

 Eclipse Tools  
 For many Java developers the easiest way to deploy applications to Bluemix is to use the [Eclipse plugin](https://www.ng.bluemix.net/docs/#manageapps/eclipsetools/eclipsetools.html#eclipsetools). With this tool you can not only directly deploy projects to Bluemix but also debug code remotely, push incremental changes and even push the full Liberty server if you need a custom configuration.

![image](/assets/img/2015/02/eclipseplugin.png)

 So as you can see there are many options to deploy Java applications to Bluemix. I’ll update this blog entry when more options will become available.