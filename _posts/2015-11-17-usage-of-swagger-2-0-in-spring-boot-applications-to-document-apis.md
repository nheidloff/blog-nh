---
id: 1560
title: 'Usage of Swagger 2.0 in Spring Boot Applications to document APIs'
date: '2015-11-17T09:32:50+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1560'
permalink: /article/usage-of-swagger-2-0-in-spring-boot-applications-to-document-apis/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4326095104'
custom_permalink:
    - article/usage-of-swagger-2-0-in-spring-boot-applications-to-document-apis/
categories:
    - Articles
---

As IBM VP Angel Diaz [stated](http://searchcloudcomputing.techtarget.com/news/4500257255/IBM-tunes-up-API-Harmony-with-cognitive-technology-for-Bluemix) in an interview on SearchCloudComputing “[Swagger](http://swagger.io/) is the way most developers describe \[REST\] APIs”. With version 2.0 many important features like extensibility have been added, there is a big community and many developers are using it by now. Additionally there is work going on to create an open governance model around the Swagger specification under the Linux Foundation as part of the [Open API Initiative](http://swagger.io/introducing-the-open-api-initiative/).

What I [like]({{ "/article/28.05.2014085106NHEA2Z.htm" | relative_url }}) most about Swagger is the ability to document APIs directly in the (Java) source code via annotations so that documentation and actual API implementations are not out of synch.

IBM uses Swagger for the API documentation of several products and services internally. Furthermore the [API management service](https://www.ng.bluemix.net/docs/services/APIManagement/index.html) in [IBM Bluemix](https://bluemix.net) can import Swagger 2.0 definitions to manage your APIs easily.

The Java [Spring](http://projects.spring.io/spring-boot/) framework has a lot of traction in the enterprise community these days. In order to use Swagger in Spring Boot applications I tried [Springfox](https://github.com/springfox/springfox) which is [not part of Swagger core](http://springfox.github.io/springfox/docs/current/#goals) but it integrates nicely in Spring and supports the core [Swagger annotations](https://github.com/swagger-api/swagger-core/wiki/Annotations-1.5.X).

Below I extended the Spring sample [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/) with Swagger annotations.

First you need to define the dependencies to the Springfox and Swagger libraries, in my case in Maven.

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>org.springframework</groupId>
	<artifactId>gs-rest-service</artifactId>
	<version>0.1.0</version>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>1.3.0.RELEASE</version>
	</parent>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>io.springfox</groupId>
			<artifactId>springfox-swagger-ui</artifactId>
			<version>2.2.2</version>
			<scope>compile</scope>
		</dependency>
		<dependency>
			<groupId>io.springfox</groupId>
			<artifactId>springfox-swagger2</artifactId>
			<version>2.2.2</version>
			<scope>compile</scope>
		</dependency>
	</dependencies>

	<properties>
		<java.version>1.8</java.version>
	</properties>
	
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

	<repositories>
		<repository>
			<id>spring-releases</id>
			<url>https://repo.spring.io/libs-release</url>
		</repository>
	</repositories>
	<pluginRepositories>
		<pluginRepository>
			<id>spring-releases</id>
			<url>https://repo.spring.io/libs-release</url>
		</pluginRepository>
	</pluginRepositories>
</project>
```

Then I enabled Swagger in the boot application.

```
package hello;

import static springfox.documentation.builders.PathSelectors.regex;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import com.google.common.base.Predicate;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@ComponentScan("hello")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public Docket newsApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("greetings")
                .apiInfo(apiInfo())
                .select()
                .paths(regex("/greeting.*"))
                .build();
    }
    
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Spring REST Sample with Swagger")
                .description("Spring REST Sample with Swagger")
                .termsOfServiceUrl("http://www-03.ibm.com/software/sla/sladb.nsf/sla/bm?Open")
                .contact("Niklas Heidloff")
                .license("Apache License Version 2.0")
                .licenseUrl("https://github.com/IBM-Bluemix/news-aggregator/blob/master/LICENSE")
                .version("2.0")
                .build();
    }
}
```

In the controller I used Swagger annotations to document the API.

```
package hello;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ResponseHeader;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @ApiOperation(value = "getGreeting", nickname = "getGreeting")
    @RequestMapping(method = RequestMethod.GET, path="/greeting", produces = "application/json")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "name", value = "User's name", required = false, dataType = "string", paramType = "query", defaultValue="Niklas")
      })
    @ApiResponses(value = { 
    		@ApiResponse(code = 200, message = "Success", response = Greeting.class),
    		@ApiResponse(code = 401, message = "Unauthorized"),
    		@ApiResponse(code = 403, message = "Forbidden"),
    		@ApiResponse(code = 404, message = "Not Found"),
    		@ApiResponse(code = 500, message = "Failure")})	
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
        		String.format(template, name));
    }
}
```

In the sample resource I documented parameters.

```
package hello;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;

public class Greeting {

    private final long id;
    private final String content;

    public Greeting(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    @JsonProperty(required = true)
    @ApiModelProperty(notes = "The name of the user", required = true)
    public String getContent() {
        return content;
    }
}
```

Here is the outcome in the API explorer.

![image](/assets/img/2015/11/swaggerspring.png)

If you want to run Spring Boot applications in the cloud, check out the [IBM Cloud](http://ibm.biz/nheidloff).