---
id: 4369
title: 'Increasing Productivity for legacy Liberty Applications'
date: '2021-02-01T16:47:12+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4369'
permalink: /article/increasing-developer-productivity-for-legacy-liberty-applications/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/increasing-developer-productivity-for-legacy-liberty-applications/
categories:
    - Articles
---

The modernization of applications is done in multiple steps. The previous articles described how to convert a 10+ years old Java EE into an Open Liberty application. This article explains how to change the structure of the application to be more productive for future extensions.

This article is part of a series of articles that documents how to [modernize a sample Java EE application](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation) from 2010 with modern technologies.

The sample application is a simple e-commerce application. The original application and the source code of all subsequent modernization steps is available as [open source](https://github.com/nheidloff/application-modernization-javaee-quarkus) on GitHub.

**Developer Productivity**

These days developers are used to leverage certain functionality when writing code with modern frameworks, for example:

- Hot code replacements
- Debugging incl. debugging in containers
- IDE support like errors, warnings, auto-complete, and much more

I like that Open Liberty provides this functionality, esp. the dev mode:

- [mvn liberty:dev](https://github.com/OpenLiberty/ci.maven/blob/master/docs/dev.md#dev)
- [mvn liberty:devc](https://github.com/OpenLiberty/ci.maven/blob/master/docs/dev.md#devc-container-mode)

Unfortunately this functionality doesn’t work for several legacy projects which use [multi modules](https://github.com/OpenLiberty/guide-maven-multimodules). These projects often have multiple sub-projects generating different artifacts, for example ear, jar and war files. The sub-projects even have their own pom.xml files with dependencies between each other. For these types of projects the dev mode does not work.

**Dev Mode compatible Projects**

In order to use the productivity tools, I changed the structure of my project:

- [Original code with multiple modules](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/monolith-open-liberty)
- [Modernzsed code with one project](https://github.com/nheidloff/application-modernization-javaee-quarkus/tree/master/monolith-open-liberty-cloud-native)

In summary I had to do the following changes:

1. Create a new Open Liberty project and copy the source code from all sub-projects in it
2. Merge all pom.xml files
3. Take over the configuration files (server.xml, persistence.xml, etc.)
4. Update the paths in the Dockerfile

The project structure on the left hand side shows the original multi-modules structure, the right side the simplified new structure.

![image](/assets/img/2021/02/open-liberty-project-structure.png)

**Replacing EJBs with CDI**

To simplify the code, I also replaced the EJBs (Enterprise Java Beans) with CDI (Contexts and Dependency Injection) since all code runs in the same context now. For example this was the original EJB code:

```
@Stateless
public class ProductSearchServiceImpl implements ProductSearchService {
   ...
}
```

```
public class CategoryResource {
   @EJB ProductSearchService productSearch;
   ...	
   productSearch = (ProductSearchService) new InitialContext().lookup("java:app/CustomerOrderServices/ProductSearchServiceImpl!org.pwte.example.service.ProductSearchService");
   ...
}
```

This is the converted code using CDI:

```
@ApplicationScoped
public class ProductSearchServiceImpl implements ProductSearchService {
   ...
}
```

```
@ApplicationScoped
public class CategoryResource {
   @Inject
   ProductSearchServiceImpl productSearch;
   ...
}
```

In order to handle transactions, you can use @Transactional which is part of the Java/Jakarta EE standard Java Transaction API (JTA). In the easiest case you simply use the annotation on your method.

```
@Transactional
public void updateLineItem(String productId, String newPrice) {
   ...
}	
```

If you need more control, you can also manage the transactions manually:

```
@PersistenceContext
protected EntityManager em;

@Resource
UserTransaction utx;
	
@Transactional
public void updateLineItem(String productId, String newPrice) {
   utx.begin();
   em.persist(lineItem);
   utx.commit();
   ...
}
```

**What’s next?**

Now that the code has been simplified and it’s possible to use the modern development tools, changes are easier. In a future article I’ll explain how to add cloud-native functionality like health checks and monitoring to the Open Liberty application.

All articles of this series can be found in the [repo](https://github.com/nheidloff/application-modernization-javaee-quarkus#documentation).