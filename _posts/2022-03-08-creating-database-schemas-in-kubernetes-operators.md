---
id: 4783
title: 'Creating Database Schemas in Kubernetes Operators'
date: '2022-03-08T08:28:25+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4783'
permalink: /article/creating-database-schemas-kubernetes-operators/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/creating-database-schemas-kubernetes-operators/
categories:
    - Articles
---

*Kubernetes operators are a powerful technology to deploy infrastructure and appplications and to automate day 2 operations. This article gives some ideas how to manage relational database schemas.*

Operators can be used to deploy and manage applications and services on Kubernetes which leverage databases. The databases often need to be pre-populated with sample data and relation databases require schemas.

Let’s take a look at a [simple sample](https://github.com/nheidloff/quarkus-operator-microservice-database) that creates the schema and sample data in a Postgres database. The code below is available on GitHub. This article describes how to use Quarkus to build the operator, but the same concepts apply for other languages like Golang.

My sample deploys a simple ecommerce application which uses a backend microservice which accesses a Postgres database. Check out my previous blogs, for example [Leveraging third party Operators in Kubernetes Operators]({{ "/article/leveraging-third-party-operators-in-kubernetes-operators/" | relative_url }}), for more details.

The schema and sample data is available in one [file](https://raw.githubusercontent.com/IBM/multi-tenancy/main/installapp/postgres-config/create-populate-tenant-a.sql). My custom resource refers to this file in the spec section.

![image](/assets/img/2022/03/Screenshot-2022-03-08-at-09.21.57.png)

```
apiVersion: "ecommercesample.com/v1alpha1"
kind: ECommerceSample
metadata:
  name: ecommercesample1
  namespace: tenant1
spec:
  sqlUrl: https://raw.githubusercontent.com/IBM/multi-tenancy/main/installapp/postgres-config/create-populate-tenant-a.sql
```

First in the reconcile code Postgres access information is read. To access Postgres standard Java functionality java.sql.Connection is used.

```
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
...
try {
  String sql = readSQL(resource.getSpec().getSqlUrl());
  String postgresUrlJdbc = "jdbc:postgresql://" + postgresHostname + ":" + postgresPort + "/ibmclouddb";
  Connection connection = DriverManager.getConnection(postgresUrlJdbc, postgresUserName, postgresPassword);            
  if (isSchemaDeployed(connection) == false) {
    PreparedStatement selectStatement = connection.prepareStatement(sql);
    selectStatement.execute();
  }                            
} catch (Exception e) {
  return UpdateControl.updateCustomResource(resource);
}
```

In order to avoid creating the schema more than ones and to avoid overwriting data, the operator checks whether the schema has already been created.

```
private boolean isSchemaDeployed(Connection connection) {
  boolean output = false;
  String requiredTable = "category";
  DatabaseMetaData databaseMetaData;
  try {
    databaseMetaData = connection.getMetaData();
    ResultSet resultSet = databaseMetaData.getTables(null, null, null, new String[] {"TABLE"});
    while (resultSet.next()) {
      String name = resultSet.getString("TABLE_NAME");
      if (name.equals(requiredTable)) output = true;
    }
  } catch (SQLException e) {}
  return output;
}
```

Take a look at the complete [code](https://github.com/nheidloff/quarkus-operator-microservice-database/blob/1c8689d5c9129c282b2a95e41307d582b54ffd0b/src/main/java/com/ecommercesample/ECommerceSampleController.java) and the order in which certain steps are executed.

The code above is a very simple version only which should be extended in several ways:

- The schema should be separated from the sample data.
- The isSchemaDeployed method should not only check for one table.
- In order to avoid creating new connections, the information whether the schema has already been applied needs to be cached. The state section in the custom resource could be used.
- Versioning needs to be added to handle upgrades of schemas.

The same mechanism can be used in Go based operators. Take a look at our Golang code, especially [controller.go](https://github.com/IBM/multi-tenancy/blob/add-operator/operator/ecommerceapplication/controllers/ecommerceapplication_controller.go) and [postgresHelper.go](https://github.com/IBM/multi-tenancy/blob/add-operator/operator/ecommerceapplication/postgresHelper/postgresHelper.go).