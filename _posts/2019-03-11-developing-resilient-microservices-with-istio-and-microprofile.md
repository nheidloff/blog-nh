---
id: 3362
title: 'Developing resilient Microservices with Istio and MicroProfile'
date: '2019-03-11T11:57:25+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=3362'
permalink: /article/resiliency-microservice-microprofile-java-istio/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '7285892446'
custom_permalink:
    - article/resiliency-microservice-microprofile-java-istio/
categories:
    - Articles
---

As stated in the [reactive manifesto](https://www.reactivemanifesto.org/) cloud-native reactive applications need to be resilient:

> The system stays responsive in the face of failure. This applies not only to highly-available, mission-critical systems – any system that is not resilient will be unresponsive after a failure. Resilience is achieved by replication, containment, isolation …

In distributed systems you need to design for failure. For example microservices, which invoke other microservices, must be intelligent enough to continue to work even if some of their dependencies are currently not available.

There are several different ways to build resilient service meshes with Istio, for example via [circuit breakers](https://istio.io/docs/concepts/traffic-management/#circuit-breakers) and [retries](https://istio.io/docs/concepts/traffic-management/#timeouts-and-retries).

The Istio functionality for resilient cloud-native applications is generic and independent from the implementation of the microservices. However in some cases the handling of failures depends on the business logic of the applications which is why this needs to be implemented in the microservices.

I have open sourced a [simple sample](https://github.com/nheidloff/cloud-native-starter) that demonstrates this functionality. The application uses a Vue.js frontend that displays articles. The service ‘web-api’ implements the BFF (backend for frontend) pattern. The web application accesses the ‘web-api’ service which invokes both the ‘articles’ and ‘authors’ services.

![image](/assets/img/2019/03/blog-resiliency-resiliency-diagram-1024x714.png)

If you wan to run this [sample](https://github.com/nheidloff/cloud-native-starter), get the code from GitHub.

Make sure that you’ve set up your [development environment](https://github.com/nheidloff/cloud-native-starter/blob/master/LocalEnvironment.md) and that you have installed the [prerequisites](https://github.com/nheidloff/cloud-native-starter#deployment). After this invoke the following commands to deploy the microservices.

```
$ git clone https://github.com/nheidloff/cloud-native-starter.git
$ cd cloud-native-starter
$ scripts/deploy-articles-java-jee.sh
$ scripts/deploy-web-api-java-jee.sh
$ scripts/deploy-authors-nodejs.sh
$ scripts/deploy-web-app-vuejs.sh
$ scripts/show-urls.sh
```

After running the scripts above, you will get a list of all URLs in the terminal. The web application can be opened via ‘http://your-minikube-ip:31380. The initial page shows the five most recent articles including information about the authors.

![image](/assets/img/2019/03/blog-web-app-1024x388.png)

Now let’s delete the authors service:

```
$ scripts/delete-authors-nodejs.sh
```

When you refresh the web application, it will still display five articles, but this time without the information about the authors. While the web application cannot display the complete information anymore, in this simple scenario it still makes sense to display the titles and links of the articles.

![image](/assets/img/2019/03/blog-resiliency-web-app-no-authors-1024x388.png)

The implementation of this behavior has been done in [Service.java](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/business/Service.java#L68):

```
try {
   Author author = DataAccessManager.getAuthorsDataAccess().getAuthor(coreArticle.author);
   article.authorBlog = author.blog;
   article.authorTwitter = author.twitter;
} catch (NoConnectivity | NonexistentAuthor e) {	
   article.authorBlog = "";
   article.authorTwitter = "";
}
```

Next let’s delete the articles serivce:

```
$ scripts/delete-web-api-java-jee.sh
```

When you refresh the web application, you’ll notice that the same five articles are still displayed. That’s because in this trivial scenario the ‘web-api’ service caches the last read articles. If the ‘articles’ service is not available it simply returns the information from the cache.

I’m using the Eclipse [MicroProfile](https://microprofile.io/) [fallback](https://github.com/nheidloff/cloud-native-starter/blob/master/web-api-java-jee/src/main/java/com/ibm/webapi/business/Service.java#L45) annotation. In this case a fallback method is invoked if the original method throws an exception.

```
@Fallback(fallbackMethod = "fallbackNoArticlesService")
public List<Article> getArticles() throws NoDataAccess {
   List<CoreArticle> coreArticles = new ArrayList<CoreArticle>();	
   try {
      coreArticles = DataAccessManager.getArticlesDataAccess().getArticles(5);							
   } catch (NoConnectivity e) {
      System.err.println("com.ibm.webapi.business.getArticles: Cannot connect to articles service");
      throw new NoDataAccess(e);
   }
...
}	
...
public List<Article> fallbackNoArticlesService() {
   System.err.println("com.ibm.webapi.business.fallbackNoArticlesService: Cannot connect to articles service");
   if (lastReadArticles == null) lastReadArticles = new ArrayList<Article>();
      return lastReadArticles;
}
```

Read the article [ MicroProfile, the microservice programming model made for Istio](https://www.eclipse.org/community/eclipse_newsletter/2018/september/MicroProfile_istio.php), to learn more about how to build resilient applications with both Istio and MicroProfile.