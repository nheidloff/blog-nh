---
id: 133
title: 'Code control systems on OpenNTF'
date: '2009-01-25T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/code-control-systems-on-openntf/'
permalink: /article/code-control-systems-on-openntf/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/7.html'
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/code-control-systems-on-openntf/
dsq_thread_id:
    - '4316413967'
categories:
    - Articles
---

 I’d like to allow for more collaborative work on open source projects on OpenNTF.Org. I’d like to provide code control and version management including check-in/check-out, branch and merge, audit trail of code changes and rollback, etc.

 There are two different types of projects/samples. One type of projects are NSFs and NTFs which are (in this case unfortunately) not file based. The other type are Java/Eclipse projects which are file based. So it looks like we have to use two different code control systems. We have some ideas how we want to do this for NSFs and NTFs, but at this point it is too early to blog about.

 For Java sources I’d like to use [Subversion](http://en.wikipedia.org/wiki/Subversion_(software)) as version control system since as far as I know it is the most popular system these days and it is open source. For the server it seems like we have to install an Apache web server plus a [Subversion server](http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=91).

 Then I’d like to recommend that our Eclipse developers use Subclipse or Subversive in Eclipse as Aptana does this as well (see [here](http://www.aptana.com/dev/index.php/Getting_started_with_Subversion)). Only project owners have write access to the sources, other people read access.

 In addition to the Subversion infrastructure I’d also like to handle the process for smaller contributions (bug fixes) like Aptana handles [contributions for patches](http://www.aptana.com/dev/index.php/Submitting_a_Patch). People can basically send zipped code via email and the owner of a project then merges these changes in and commits to Subversion.

 I’d also like to set up a full server side build environment, posting of builds etc at some point of time. However I want to focus on content first rather than spending too much time for legal work and infrastructure. So in the first stage project owners have to create and post builds ‘manually’.

 Let me know your thoughts.