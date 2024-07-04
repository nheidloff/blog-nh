---
id: 194
title: 'Unit tests for XPages'
date: '2009-04-23T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/unit-tests-for-xpages/'
permalink: /article/unit-tests-for-xpages/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/5.html'
custom_permalink:
    - article/unit-tests-for-xpages/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4317551451'
categories:
    - Articles
---

 Lorcan McDonald from the IBM XPages development in Dublin has posted a unit test framework for XPages – [see here](http://openntf.org/internal/ontfcatalog.nsf/topicThread.xsp?action=openDocument&documentId=9C66A4F3854E61BE852575A1003C6CAD).

To test functions with the framework you create an object with one or more testcase functions as properties of that object. A testcase is any function starting with the string ‘test’. A suite should also have a name property to help identify it in the test results. To run the tests you pass the function into the UnitTesting.runSuite() function (UnitTesting is defined in an external file).

Here is a simple sample test suite that tests the built-in Math.abs() function:

(function(){   
var testSuite = new function()   
{   
this.name = ‘Math Tests’;   
this.testAbs = function(unitTester)   
{   
unitTester.assertEquals(Math.abs(-1), 1, ‘Incorrect conversion’);   
}   
}   
UnitTesting.runSuite(testSuite);   
})();

Here are the sample results of the sample unit test in the NSF:   
![image](/assets/img/2009/04/1_0BB42AE00BB4266C003D75BC852575A1.gif)