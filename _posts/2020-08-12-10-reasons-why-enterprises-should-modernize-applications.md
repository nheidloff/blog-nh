---
id: 4157
title: '10 Reasons why Enterprises should modernize Applications'
date: '2020-08-12T07:16:07+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4157'
permalink: /article/ten-reasons-why-enterprises-should-modernize-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ten-reasons-why-enterprises-should-modernize-applications/
categories:
    - Articles
---

While cloud technologies and modern programming models like cloud-native have been around for several years, most enterprise applications are still run on-premises and/or use classic stacks and application servers.

Not all applications need to be, should be or can be modernized. However for many applications it makes a lot of sense. In this article I list my top 10 reasons why enterprise applications should be modernized.

In general the goals of modernizing applications are to reduce costs, to be more agile and to provide better user experiences.

Enterprises are often hesitant to invest in modernization, but many times these investments pay off quite soon.

**1. Reduce Resource Usages**

Most enterprise applications run in virtual machines. Running the same applications in containers instead, saves a lot of resources, especially memory. Additionally container orchestration platforms can balance workloads much better than virtual machines.

Similarly modern development libraries and tools can save resources. A great example is OpenJ9 which requires less than half of the memory compared to other JVMs. Using containers and modern libraries often don’t even require any code changes.

**2. Reduce License Costs**

Classic commercial software offerings come with licence costs. Because of the success of open source, many of these classic offerings can be replaced with open source software for which in many cases commercial support is provided. A good example is WebSphere ND vs the open source version Open Liberty.

Open source projects have also typically strong communities that provide free help and fixes.

**3. Achieve faster Time to Market and more Agility**

Deployments of new versions of monolithic applications are typically difficult, time consuming and dangerous. With containers and pipelines continuous deliveries can be achieved so that deployments can be made more frequently. For example, microservices allow updating separate parts and CI/CD allows rolling back to running versions in case of issues.

**4. Enable Developments of bigger new Features**

Many enterprise applications have grown over years and have been developed by different people which often led to technical debt. Technical debt consumes budget to keep applications up and running and it makes developments of bigger new features harder. That’s why it makes sense to refactor applications that are supposed to be significantly extended.

**5. Run mission critical Applications on a future ready Platform**

In many instances enterprises have defined and established strategies on which platforms to run business critical applications. For example the Kubernetes distribution OpenShift can be run on-premises and on different public clouds which is why a lot of enterprises have chosen it as strategic platform. Modernizing applications to run on OpenShift ensures a longer-term stable platform and ongoing support from the operation teams.

**6. Improve operational Efficiency**

When all enterprise applications run on container platforms like Kubernetes or OpenShift, they can be managed consistently. Everything is a container, no matter what programming languages and application stacks are used. This makes operations easier. But to be fair, this also requires organizational and cultural changes which take time to establish.

**7. Increase Developer Productivity and leverage Developer Workforce**

Containers increase the productivity of developers since they address the ‘works on my machine’ issue. Furthermore setting up development environments is faster. Since developers are more productive, they have more fun, which means they are more motivated and more efficient.

Via containers enterprise applications can be polyglot, since different services can be implemented with different languages. This allows employers to find more developers since not every developer knows Java or Cobol.

**8. Improve User Experiences**

Application users decide whether applications are good or not which is why good user experiences are key. Older applications have often weaknesses that can be addressed by using modern technologies. For example: new user interfaces, mobile apps, APIs, faster response times, resiliency and more.

**9. Handle expensive legacy Applications**

Sometimes legacy applications become very expensive. For example after the official support for the used platforms or servers has ended or when no developers can be found to maintain the code. In some cases these applications can be sunset. In other cases it might be possible to replace them with SaaS offerings. For instance, a 20 years old vacation planer application can be replaced by several SaaS or open source offerings.

**10. Keep Managers happy**

This is not really a good reason, but something that I’ve heard from developers. For certain applications it doesn’t make sense to modernize them. However for developers this means being able to learn new skills and don’t we all like this?

To learn more, check out my blog what IBM offers for [application modernization]({{ "/article/application-modernization-resources-on-ibm-developer/" | relative_url }}).