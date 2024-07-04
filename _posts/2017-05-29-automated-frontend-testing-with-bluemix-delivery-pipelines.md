---
id: 2290
title: 'Automated Frontend Testing with Bluemix Delivery Pipelines'
date: '2017-05-29T10:37:12+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2290'
permalink: /article/frontent-testing-devops/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/frontent-testing-devops/
dsq_thread_id:
    - '5950350136'
categories:
    - Articles
---

In order to do functional end-to-end testing of web applications, [Selenium](http://www.seleniumhq.org/) is a great tool to execute automated tests on different browsers. Below is a quick introduction how to run these tests from delivery pipelines in IBM Bluemix.

Bluemix DevOps provides [toolchains](https://www.ibm.com/devops/method/category/tools/) to build, deploy and manage applications. These toolchains can contain services provided by Bluemix as well as open source and third party tools. An example of a third party tool is [Sauce Labs](https://saucelabs.com/), which allows running Selenium based test suits as part of the delivery pipelines.

The tests can be written with the JavaScript test framework [Mocha](https://github.com/mochajs/mocha). Here is a sample snippet to test the page title. Check out the full source [code](https://github.com/nheidloff/ui-toolchain-demo-20170526054109132/blob/master/tests/sauce_actual/test-cases.js) for more details.

```
it("Have correct title", function(done) {
        browser
            .get(url)
            .title()
            .should.become("Microservices Sample")
            .nodeify(done);
    });
```

The test results are displayed directly in Bluemix. If tests fail, the next stages in the pipelines are not triggered.

![saucelab1](/assets/img/2017/05/saucelab11.png)

Another nice feature of Sauce Labs is the ability to run tests on different operating systems, browsers, with different resolutions, etc. easily from within the Sauce Labs dashboard without having to own the hardware. Here is a sample how to test a web application on an iPad.

![saucelab2](/assets/img/2017/05/saucelab2.png)

In order to try out the Sauce Labs functionality from Bluemix I suggest to follow the [microservices toolchain](https://www.ibm.com/devops/method/content/toolchains/microservices_v2_toolchain) tutorial.