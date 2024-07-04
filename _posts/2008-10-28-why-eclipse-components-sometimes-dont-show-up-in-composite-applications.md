---
id: 92
title: "Why Eclipse components sometimes don't show up in composite applications"
date: '2008-10-28T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/why-eclipse-components-sometimes-dont-show-up-in-composite-applications/'
permalink: /article/28.10.2008044636NHECB7.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/05.html'
custom_permalink:
    - article/28.10.2008044636NHECB7.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316388347'
categories:
    - Articles
---

 Sometimes when implementing composite applications the Eclipse components don’t come up correctly when the applications are opened in Lotus Notes. In this blog entry I describe why this can happen.

This screenshot shows that the Eclipse component doesn’t come up:

![image](/assets/img/2008/10/1_082B645C082B621C00305E34852574F0.gif)

In order to find out more details the blue link can be clicked to view the diagnostic report:

![image](/assets/img/2008/10/1_082B6FC4082B6D8400305E34852574F0.gif)

There are four ‘expected’ errors that can occur:

1\. Assemblers typed in manually the feature name, view part name and/or the update site URL in CAE and they used wrong names. In this case check these names in the CAE.

2\. The update site is not available when the application is opened in Lotus Notes. In this case try again once the update site is running again.

3\. Eclipse components might now show up after provisioning before you restart. In this case restart the client.

4\. Dependency (a dependent other Eclipse feature) does exist on the client. This can happen since Eclipse doesn’t resolve all dependencies automatically. Instead you need to define all features your Eclipse component needs in the CAE (not only the one feature the view part is in). Here are details:

Typically the majority of simple Eclipse components will employ a single Eclipse feature and the CAE will detect that required feature when the component is added to the palette from an update site. The sample image below shows a simple view configured with a single feature.

![image](/assets/img/2008/10/2_059A6A5C0A75108400305E34852574F0.jpeg)

 With more complex components that have multiple features it is a requirement to configure the component after it has been added to the CAE palette. Use the advanced component properties to list the additional dependant features using an underscore and incrementing digits postfixed to the id.feature, match.feature and version.feature property names. The sample below shows a configured two feature component.

![image](/assets/img/2008/10/2_059A6E080A75108400305E34852574F0.jpeg)

In order to find out whether an Eclipse component is missing you can use the console.   
The diag command lets you check whether dependencies are there:   
osgi&gt; diag com.ibm.cademo.util.comp.nav   
update@../../../Data/workspace/applications/eclipse/plugins/com.ibm.cademo.util.   
comp.nav\_8.1.20080530.jar 1427   
 Direct constraints which are unresolved:   
 Missing imported package com.ibm.rcp.topologyhandler\_0.0.0.

No other errors are expected which is why there are no suggestions to how to solve other errors if they occurred. But in the unlikely case that your Notes configuration is not correct, you might want to try to reinstall the app. To do this open the Portal Applications catalog (which includes also NSF based apps) and use the actions to uninstall and reinstall apps.

In addition to the runtime errors Eclipse components also don’t come up in CAE in one scenario: If the user has been editing the app, CAE can tell CAI provisioning to continue without a restart when installing a new feature. This is a convenience, since it allows the end user to continue editing without restarting. But, a side effect of this is that any part of the app that requires a restart will display the “not available” message.