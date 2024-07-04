---
id: 1024
title: 'Configuration of Bluemix Apps via User Provided Services'
date: '2014-12-16T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/configuration-of-bluemix-apps-via-user-provided-services/'
permalink: /article/16.12.2014110019NHEDRA.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
custom_permalink:
    - article/16.12.2014110019NHEDRA.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4326350805'
categories:
    - Articles
---

 When Bluemix services are created and bound to applications, they usually provision all artifacts needed to use the services. As result of this provisioning they return information to Bluemix that is needed to the services, for example user credentials. This information is stored in the Bluemix environment variable VCAP\_SERVICES and can be accessed from applications.

Sometimes however you need additional configuration for your applications which shouldn’t be hardcoded. This can be configuration which is not associated with a particular Bluemix service or additional configuration for Bluemix services. For example the single sign on service requires a redirect URL and a client id and secret.

There are several approaches to configure Bluemix apps, for example user-defined variables which are additional environment variables. For [Bluemix.info](http://bluemix.info/) we use an [user provided service](http://docs.cloudfoundry.org/devguide/services/user-provided.html). User provided services show up in the Bluemix dashboard as other services and can include configuration parameters. They can be created via the cf command line tool and then easily be accessed.

![image](/assets/img/2014/12/cups.png)

In order to access this configuration we use classes like [ConfigUtilities](https://github.com/IBM-Bluemix/news-aggregator/blob/master/src/main/java/net/bluemix/newsaggregator/ConfigUtilities.java). This class also abstracts whether the application is run on Bluemix or locally. When running locally we store the same information in local environment variables.