---
id: 1858
title: 'Authorization in Node.js Applications on Bluemix'
date: '2016-02-15T09:00:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1858'
permalink: /article/authorization-nodejs-applications-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4580570577'
custom_permalink:
    - article/authorization-nodejs-applications-bluemix/
categories:
    - Articles
---

As for [authentication]({{ "/article/authentication-node-js-bluemix" | relative_url }}) there are various ways to handle authorization in Node.js applications on [Bluemix](https://bluemix.net). Below is an example how to use the Node module [acl](https://github.com/optimalbits/node_acl). With this module you can use roles for authorization, both on application and even document level.

You can download the [source code](https://github.com/IBM-Bluemix/collaboration/tree/initialversion) from GitHub and try the demo yourself. Follow the steps in the [README](https://github.com/IBM-Bluemix/collaboration/blob/initialversion/README.md) and check out the [screenshots](https://github.com/IBM-Bluemix/collaboration/tree/initialversion/screenshots).

In the sample two users log in against the Bluemix [Single Sign On](https://www.ng.bluemix.net/docs/#services/SingleSignOn/index.html) service. One user gets the role ‘admin’, the second user the role ‘user’. In the Mongo database person documents and ACLs are stored. Every authenticated user can read all person documents. Administrators get even write access to all person documents. Users however can only edit their own person documents.

Here is a simplified version of the [code](https://github.com/IBM-Bluemix/collaboration/blob/initialversion/server/authorization.js#L74) that defines the role of a user and ensures author/editor access to the person document.

```
app.get('/admin/adduser', authenticationUtils.ensureAuthenticated, function (req, res) {
  var personJson = req.user['_json'];
  var userDirectoryId = req.user['id'];
  var newDocumentId = mongodbUtils.getObjectId();
  persons.addPerson(
    req.user['id'],
    personJson.displayName,
    "http://heidloff.net/wp-content/uploads/2015/11/4Y7B9422-4.jpg",
    "Developer Advocate",
    newDocumentId,
    function(err, result) {
      var documentEditorRole =  'editor-' + newDocumentId;
      acl.addUserRoles(req.user['id'], ['user', documentEditorRole], function(err) {                
        acl.allow(['admin', documentEditorRole], newDocumentId, 'update');
        res.write('Success: User ' + req.user['id'] + ' added as user');
        res.end();  
      });
    });  
  );   
});
```

Check out the [counterpart](https://github.com/IBM-Bluemix/collaboration/blob/initialversion/server/persons.js#L71) where the access rights are checked before users can update person documents.

In order to make building user interfaces easier without having to duplicate the authorization [code](https://github.com/IBM-Bluemix/collaboration/blob/initialversion/server/persons.js#L140) the REST API that returns specific person documents/objects also returns authorization information for the currently logged in user. This allows clients, for example, to display an ‘edit’ button only if the user is actually allowed to invoke this operation.

```
var canUpdate = false;
acl.isAllowed(req.user['id'], documentId, 'update', function (err, response) { 
  if (response) {
    canUpdate = true;
  }
  var access = { canRead: true,
    canUpdate: canUpdate,
    canDelete: false};
  var output = { person: document, access: access};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(output));
```

This screenshot shows a REST call invoked by a user who updates his/her own person document. The operation is allowed since the user is authenticated and he/she has the appropriate role on document level.

![image](/assets/img/2016/02/authorization-demo-11.png)