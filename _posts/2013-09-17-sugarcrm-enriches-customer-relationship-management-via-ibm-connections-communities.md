---
id: 865
title: 'SugarCRM enriches Customer Relationship Management via IBM Connections Communities'
date: '2013-09-17T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/sugarcrm-enriches-customer-relationship-management-via-ibm-connections-communities/'
permalink: /article/16.09.2013104555NHECAR.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/6.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/16.09.2013104555NHECAR.htm/
dsq_thread_id:
    - '4491453239'
categories:
    - Articles
---

[SugarCRM](http://www.sugarcrm.com/company-overview) provides a [connector](http://www.sugarexchange.com/product_details.php?product=1278) for IBM Connections. Watch the [video](http://www.youtube.com/watch?v=5LgnKRsT6Hk) below to see the functionality in action.

There are several interesting integration points. IBM Connections is used to enrich the SugarCRM experience. Rather than re-implementing these features the Connections infrastructure is leveraged.

– An opportunity is associated with a Connections community ([screenshot](http://www.sugarexchange.com/screenshots/screenshot.php/1278/3451/fullsize/Select%20Community.jpg)). Updates to the opportunity are added to the community activity stream and can be accessed from either the IBM Connections user interface or from SugarCRM directly ([screenshot](http://www.sugarexchange.com/screenshots/screenshot.php/1278/3452/fullsize/Updates.jpg)).

– Files from the community can also be accessed from the SugarCRM user interface ([screenshot](http://www.sugarexchange.com/screenshots/screenshot.php/1278/3450/fullsize/Files.jpg)).

– Connections activities are also surfaced in SugarCRM allowing SugarCRM users to collaborate with non SugarCRM users, for example by assigning tasks to them ([screenshot](http://www.sugarexchange.com/screenshots/screenshot.php/1278/3447/fullsize/Activities.jpg)).

Technically the connector uses the Connections REST APIs from [PHP](https://github.com/sugarcrm/ibm_connections/tree/master/SugarModules/connectors/connections).

{% include embed/youtube.html id='5LgnKRsT6Hk' %}